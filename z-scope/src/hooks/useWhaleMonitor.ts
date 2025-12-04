import { useState, useEffect } from 'react';
import axios from 'axios';
import type { WhaleTransaction, BlockchairTransactionResponse } from '../types';
import { API_ENDPOINTS, WHALE_THRESHOLD } from '../utils/constants';

export const useWhaleMonitor = () => {
  const [lastWhale, setLastWhale] = useState<WhaleTransaction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkWhales = async () => {
      try {
        const response = await axios.get<BlockchairTransactionResponse>(
          `${API_ENDPOINTS.BLOCKCHAIR_TRANSACTIONS}?q=input_total_usd(gt${WHALE_THRESHOLD})&s=time(desc)&limit=1`
        );
        
        if (response.data.data && response.data.data.length > 0 && mounted) {
          const whale = response.data.data[0];
          setLastWhale(whale);
          
          // Trigger browser notification if permission granted
          if (window.Notification && Notification.permission === "granted") {
            new Notification("🐳 Zcash Whale Alert!", {
              body: `$${whale.input_total_usd.toLocaleString()} moved publicly!`,
              icon: '/favicon.ico',
            });
          }
        }
        
        if (mounted) {
          setLoading(false);
        }
      } catch (err) {
        console.error("Whale monitor error:", err);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    // Request notification permission on mount
    if (window.Notification && Notification.permission === "default") {
      Notification.requestPermission();
    }

    // Initial check
    checkWhales();

    // Poll every 30 seconds
    const interval = setInterval(checkWhales, 30000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return { lastWhale, loading };
};