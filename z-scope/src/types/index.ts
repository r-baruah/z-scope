export interface ZcashStats {
  price: number;
  shieldedSupply: number;
  shieldedPercent: number;
  totalSupply: number;
  hashrate: number;
  loading: boolean;
}

export interface WhaleTransaction {
  hash: string;
  time: string;
  input_total_usd: number;
  input_total: number;
}

export interface PrivacyScore {
  monthlyTransactions: number;
  annualLeakage: number;
  percentile: number;
}

export interface BlockchairResponse {
  data: {
    circulation: number;
    market_price_usd: number;
    hashrate_24h: string;
    blocks_24h: number;
    transactions_24h: number;
    suggested_transaction_fee: number;
  };
}

export interface BlockchairTransactionResponse {
  data: WhaleTransaction[];
}