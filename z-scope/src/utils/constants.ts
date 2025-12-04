export const API_ENDPOINTS = {
  BLOCKCHAIR_STATS: 'https://api.blockchair.com/zcash/stats',
  BLOCKCHAIR_TRANSACTIONS: 'https://api.blockchair.com/zcash/transactions',
  ZCHAIN_NETWORK: 'https://api.zcha.in/v2/mainnet/network',
} as const;

export const WHALE_THRESHOLD = 100000; // $100k USD

export const TRACKERS_PER_TRANSACTION = 4; // Bank, Merchant, Ad Network, OS

export const SHIELDED_RATIO = 0.3015; // ~30.15% of ZEC is shielded (Nov 2024)

export const COLORS = {
  neonGreen: '#22c55e',
  neonPink: '#ec4899',
  neonBlue: '#3b82f6',
  darkBg: '#0a0a0a',
  cardBg: '#1a1a1a',
} as const;

export const FALLBACK_DATA = {
  totalZec: 16420000,
  shieldedZec: 4926000,
  price: 42.50,
  hashrate: 8.2,
} as const;