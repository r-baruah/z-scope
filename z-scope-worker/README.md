# 🐳 Z-Scope Whale Monitor - Cloudflare Worker

Automated whale transaction monitoring for Zcash blockchain with Telegram alerts.

## 🎯 Features

- 🔍 Monitors Zcash blockchain for large transactions (>$100k)
- 📢 Sends real-time alerts to Telegram channel
- 🔒 Distinguishes between transparent and shielded transactions
- ⚡ Runs on Cloudflare Workers (serverless)
- 🔄 Automated checks every 5 minutes
- 💾 KV storage to prevent duplicate alerts

---

## 📋 Prerequisites

Before you begin, ensure you have:

- [x] Telegram account
- [x] Cloudflare account (free tier works!)
- [x] Node.js 18+ installed
- [x] Terminal access

---

## 🚀 Quick Setup Guide

### Part 1: Telegram Bot Setup (10 minutes)

#### Step 1: Create Your Bot

1. Open Telegram and search for **@BotFather**
2. Send command: `/newbot`
3. Choose a name: `Z-Scope Whale Alerts`
4. Choose a username: `zscope_whale_bot` (must end with 'bot')
5. **SAVE YOUR TOKEN** - looks like: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`

#### Step 2: Create Public Channel

1. In Telegram, create a new **Channel** (not group)
2. Name it: `Z-Scope Whale Alerts`
3. Make it **PUBLIC**
4. Set username: `@zscope_alerts` (or your preferred name)
5. Add description:
   ```
   🐳 Real-time monitoring of large transparent Zcash transactions
   
   See why privacy matters - live whale alerts when >$100k moves publicly.
   
   Built for Zcash Hackathon 2024
   ```

#### Step 3: Add Bot as Administrator

1. Go to your channel → Settings → Administrators
2. Click "Add Administrator"
3. Search for your bot (`@zscope_whale_bot`)
4. Enable "Post Messages" permission
5. Save

#### Step 4: Test Your Bot

```bash
# Replace with your actual values
curl -X POST "https://api.telegram.org/bot<YOUR_TOKEN>/sendMessage" \
  -H "Content-Type: application/json" \
  -d '{"chat_id":"@your_channel_name","text":"🎉 Bot test successful!"}'
```

If you see the message in your channel, you're ready to proceed!

---

### Part 2: Cloudflare Worker Setup (15 minutes)

#### Step 1: Install Dependencies

```bash
# Navigate to worker directory
cd z-scope-worker

# Install Wrangler CLI globally
npm install -g wrangler

# Login to Cloudflare
wrangler login
```

This will open your browser for authentication.

#### Step 2: Install Project Dependencies

```bash
# Install packages
npm install
```

#### Step 3: Create KV Namespace

```bash
# Create the KV namespace for tracking processed transactions
wrangler kv:namespace create "WHALE_TRACKER"
```

**Important:** Copy the ID from the output. It looks like:
```
{ binding = "WHALE_TRACKER", id = "abc123def456..." }
```

#### Step 4: Update Configuration

Edit `wrangler.toml` and replace `YOUR_KV_NAMESPACE_ID` with the ID you just copied:

```toml
[[kv_namespaces]]
binding = "WHALE_TRACKER"
id = "abc123def456..."  # <- Your actual ID here
```

#### Step 5: Set Secrets

```bash
# Set your Telegram bot token
wrangler secret put TELEGRAM_BOT_TOKEN
# When prompted, paste: 123456789:ABCdefGHIjklMNOpqrsTUVwxyz

# Set your channel ID
wrangler secret put TELEGRAM_CHANNEL_ID  
# When prompted, type: @zscope_alerts (or your channel username)
```

#### Step 6: Deploy Worker

```bash
# Deploy to Cloudflare
wrangler deploy
```

You'll get a URL like:
```
https://z-scope-whale-monitor.your-subdomain.workers.dev
```

#### Step 7: Test Your Worker

```bash
# Send a test alert
curl -X POST https://your-worker-url.workers.dev/test
```

Check your Telegram channel - you should see a whale alert! 🐳

#### Step 8: Verify Scheduled Runs

```bash
# Watch live logs
wrangler tail
```

Wait 5 minutes and you should see scheduled execution logs.

---

## 🧪 Testing

### Manual Test
```bash
curl -X POST https://your-worker-url.workers.dev/test
```

### Health Check
```bash
curl https://your-worker-url.workers.dev/health
```

### View Logs
```bash
wrangler tail
```

---

## 📁 Project Structure

```
z-scope-worker/
├── whale-monitor.ts     # Main worker code
├── wrangler.toml        # Cloudflare configuration
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── .env.example         # Environment variables template
├── .gitignore          # Git ignore rules
└── README.md           # This file
```

---

## 🔧 Configuration

### Environment Variables

Set using `wrangler secret put`:

- `TELEGRAM_BOT_TOKEN` - Your bot token from @BotFather
- `TELEGRAM_CHANNEL_ID` - Your channel username (e.g., @zscope_alerts)

### KV Namespace

- `WHALE_TRACKER` - Stores processed transaction hashes (30-day TTL)

### Cron Schedule

Runs every 5 minutes: `*/5 * * * *`

To change frequency, edit `wrangler.toml`:
```toml
[triggers]
crons = ["*/5 * * * *"]  # Every 5 minutes
# crons = ["*/15 * * * *"]  # Every 15 minutes
# crons = ["0 * * * *"]     # Every hour
```

---

## 🐛 Troubleshooting

### Bot Can't Send Messages

**Problem:** `Chat not found` or `Forbidden` error

**Solutions:**
- Ensure bot is added as administrator to channel
- Channel must be PUBLIC
- Use `@channel_name` format (with @ symbol)
- Verify bot has "Post Messages" permission

### Worker Deploy Fails

**Problem:** Authentication or deployment errors

**Solutions:**
```bash
# Re-authenticate
wrangler logout
wrangler login

# Verify wrangler.toml syntax
cat wrangler.toml

# Check KV namespace exists
wrangler kv:namespace list
```

### No Cron Executions

**Problem:** Scheduled tasks not running

**Solutions:**
- Verify `[triggers]` section in wrangler.toml
- Check syntax: `crons = ["*/5 * * * *"]`
- View logs: `wrangler tail`
- Wait 5-10 minutes after deployment

### TypeScript Errors

**Problem:** `Cannot find name 'KVNamespace'`

**Solution:**
```bash
# Install types
npm install --save-dev @cloudflare/workers-types

# Verify tsconfig.json has:
# "types": ["@cloudflare/workers-types"]
```

---

## 📊 API Endpoints

### POST /test
Send a test whale alert to verify setup.

**Example:**
```bash
curl -X POST https://your-worker.workers.dev/test
```

### GET /health
Health check endpoint.

**Example:**
```bash
curl https://your-worker.workers.dev/health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-12-04T16:30:00.000Z",
  "service": "Z-Scope Whale Monitor"
}
```

---

## 🔐 Security

- ✅ Secrets stored in Cloudflare (not in code)
- ✅ KV namespace for tracking (prevents spam)
- ✅ Rate limiting via cron schedule
- ✅ No sensitive data in logs

---

## 📈 Monitoring

### View Logs
```bash
wrangler tail
```

### Check Analytics
Visit: https://dash.cloudflare.com → Workers & Pages → Analytics

---

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production
```bash
npm run deploy
```

### View Logs
```bash
npm run tail
```

---

## 🔄 Updates

To update the worker:

1. Make changes to `whale-monitor.ts`
2. Test locally: `wrangler dev`
3. Deploy: `wrangler deploy`

---

## 📝 Notes

- **Whale Threshold:** Currently set to $100,000 USD
- **Check Frequency:** Every 5 minutes (configurable)
- **Transaction Storage:** 30-day TTL in KV
- **API Used:** Zcash explorer API (zcha.in)

---

## 🤝 Contributing

This worker is part of the Z-Scope project for Zcash Hackathon 2024.

---

## 📄 License

MIT License - See main project for details

---

## 🆘 Need Help?

1. Check troubleshooting section above
2. View logs: `wrangler tail`
3. Test manually: `POST /test` endpoint
4. Verify secrets: `wrangler secret list`

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Bot sends test message to channel
- [ ] Channel is public with demo alert posted
- [ ] Worker deployed without errors
- [ ] Secrets set (bot token + channel ID)
- [ ] KV namespace created and ID in wrangler.toml
- [ ] Manual test trigger sends alert to Telegram
- [ ] Cron logs show scheduled runs every 5 minutes
- [ ] Health endpoint returns 200 OK

---

**Built with ❤️ for Zcash Hackathon 2024**