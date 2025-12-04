/**
 * Z-Scope Whale Monitor - Cloudflare Worker
 * Monitors Zcash blockchain for large transparent transactions
 * Sends alerts to Telegram channel
 */

/// <reference types="@cloudflare/workers-types" />

// Types
interface Env {
  WHALE_TRACKER: KVNamespace;
  TELEGRAM_BOT_TOKEN: string;
  TELEGRAM_CHANNEL_ID: string;
}

interface Transaction {
  hash: string;
  amount: number;
  timestamp: number;
  isShielded: boolean;
}

interface WhaleAlert {
  hash: string;
  amount: number;
  amountUSD: number;
  timestamp: string;
  type: 'transparent' | 'shielded';
}

// Constants
const WHALE_THRESHOLD_USD = 100000; // $100k
const ZEC_PRICE_URL = 'https://api.coingecko.com/api/v3/simple/price?ids=zcash&vs_currencies=usd';
const ZCASH_EXPLORER_API = 'https://api.zcha.in/v2/mainnet';

/**
 * Fetch current ZEC price in USD
 */
async function getZecPrice(): Promise<number> {
  try {
    const response = await fetch(ZEC_PRICE_URL);
    const data: any = await response.json();
    return data.zcash.usd;
  } catch (error) {
    console.error('Error fetching ZEC price:', error);
    return 43; // Fallback approximate price
  }
}

/**
 * Fetch recent transactions from Zcash blockchain
 */
async function fetchRecentTransactions(): Promise<Transaction[]> {
  try {
    // Note: This is a simplified version. In production, you'd need to:
    // 1. Use proper Zcash RPC node or explorer API
    // 2. Parse transaction data correctly
    // 3. Distinguish between transparent and shielded
    
    const response = await fetch(`${ZCASH_EXPLORER_API}/transactions?limit=50&sort=timestamp&direction=descending`);
    const data: any = await response.json();
    
    // Transform API response to our Transaction format
    return data.map((tx: any) => ({
      hash: tx.hash,
      amount: tx.value / 100000000, // Convert zatoshi to ZEC
      timestamp: tx.timestamp,
      isShielded: tx.shielded || false
    }));
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return [];
  }
}

/**
 * Check if transaction was already processed
 */
async function isTransactionProcessed(kv: KVNamespace, txHash: string): Promise<boolean> {
  const processed = await kv.get(`tx:${txHash}`);
  return processed !== null;
}

/**
 * Mark transaction as processed
 */
async function markTransactionProcessed(kv: KVNamespace, txHash: string): Promise<void> {
  // Store for 30 days
  await kv.put(`tx:${txHash}`, Date.now().toString(), { expirationTtl: 30 * 24 * 60 * 60 });
}

/**
 * Format whale alert message for Telegram
 */
function formatWhaleAlert(alert: WhaleAlert): string {
  const emoji = alert.type === 'transparent' ? '🐳' : '🛡️';
  const typeLabel = alert.type === 'transparent' ? 'TRANSPARENT' : 'SHIELDED';
  const privacyWarning = alert.type === 'transparent' 
    ? '\n\n⚠️ This transaction is TRANSPARENT - visible to everyone.\n✅ With Zcash Shielded, this would be private.'
    : '\n\n✅ This transaction used Zcash Shielded technology.\n🔒 Amount and participants are private.';

  return `${emoji} WHALE ALERT

💰 Amount: $${alert.amountUSD.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
📊 Type: ${typeLabel}
⏰ Time: ${alert.timestamp}
🔗 Hash: ${alert.hash.substring(0, 16)}...
${privacyWarning}

#Privacy #Zcash #WhaleAlert`;
}

/**
 * Send alert to Telegram channel
 */
async function sendTelegramAlert(env: Env, alert: WhaleAlert): Promise<boolean> {
  const message = formatWhaleAlert(alert);
  const url = `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHANNEL_ID,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true
      })
    });

    const result: any = await response.json();
    
    if (!result.ok) {
      console.error('Telegram API error:', result);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error sending Telegram message:', error);
    return false;
  }
}

/**
 * Process transactions and send alerts for whales
 */
async function processTransactions(env: Env): Promise<number> {
  const zecPrice = await getZecPrice();
  const transactions = await fetchRecentTransactions();
  let alertsSent = 0;

  for (const tx of transactions) {
    // Skip if already processed
    if (await isTransactionProcessed(env.WHALE_TRACKER, tx.hash)) {
      continue;
    }

    const amountUSD = tx.amount * zecPrice;

    // Check if it's a whale transaction
    if (amountUSD >= WHALE_THRESHOLD_USD) {
      const alert: WhaleAlert = {
        hash: tx.hash,
        amount: tx.amount,
        amountUSD,
        timestamp: new Date(tx.timestamp * 1000).toUTCString(),
        type: tx.isShielded ? 'shielded' : 'transparent'
      };

      // Send alert
      const sent = await sendTelegramAlert(env, alert);
      
      if (sent) {
        alertsSent++;
        await markTransactionProcessed(env.WHALE_TRACKER, tx.hash);
        console.log(`Alert sent for transaction ${tx.hash}`);
      }
    } else {
      // Mark as processed even if not a whale to avoid checking again
      await markTransactionProcessed(env.WHALE_TRACKER, tx.hash);
    }
  }

  return alertsSent;
}

/**
 * Generate test whale alert
 */
async function sendTestAlert(env: Env): Promise<Response> {
  const testAlert: WhaleAlert = {
    hash: 'test' + Date.now().toString(16),
    amount: 3500,
    amountUSD: 150500,
    timestamp: new Date().toUTCString(),
    type: 'transparent'
  };

  const sent = await sendTelegramAlert(env, testAlert);
  
  return new Response(
    JSON.stringify({ 
      success: sent, 
      message: sent ? 'Test alert sent successfully' : 'Failed to send test alert',
      alert: testAlert
    }),
    { 
      headers: { 'Content-Type': 'application/json' },
      status: sent ? 200 : 500
    }
  );
}

/**
 * Main worker handler
 */
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // Handle test endpoint
    if (url.pathname === '/test' && request.method === 'POST') {
      return sendTestAlert(env);
    }

    // Health check
    if (url.pathname === '/health') {
      return new Response(
        JSON.stringify({ 
          status: 'healthy', 
          timestamp: new Date().toISOString(),
          service: 'Z-Scope Whale Monitor'
        }),
        { headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ 
        error: 'Not found',
        endpoints: {
          'POST /test': 'Send test whale alert',
          'GET /health': 'Health check'
        }
      }),
      { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  },

  /**
   * Scheduled cron handler - runs every 5 minutes
   */
  async scheduled(event: ScheduledEvent, env: Env, ctx: ExecutionContext): Promise<void> {
    console.log('Cron triggered at:', new Date(event.scheduledTime).toISOString());
    
    try {
      const alertsSent = await processTransactions(env);
      console.log(`Processed transactions. Alerts sent: ${alertsSent}`);
    } catch (error) {
      console.error('Error in scheduled task:', error);
    }
  }
};