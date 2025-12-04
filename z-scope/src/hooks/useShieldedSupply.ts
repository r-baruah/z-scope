import { useState, useEffect } from 'react';
import axios from 'axios';
import type { ZcashStats, BlockchairResponse } from '../types';
import { API_ENDPOINTS, SHIELDED_RATIO, FALLBACK_DATA } from '../utils/constants';

export const useShieldedSupply = () => {
  const [data, setData] = useState<ZcashStats>({
    totalSupply: FALLBACK_DATA.totalZec,
    shieldedSupply: FALLBACK_DATA.shieldedZec,
    shieldedPercent: SHIELDED_RATIO * 100,
    price: FALLBACK_DATA.price,
    hashrate: FALLBACK_DATA.hashrate,
    loading: true,
  });

  useEffect(() => {
    let mounted = true;

    const fetchSupply = async () => {
      try {
        const response = await axios.get<BlockchairResponse>(API_ENDPOINTS.BLOCKCHAIR_STATS);
        const apiData = response.data.data;
        
        // Convert from satoshis to ZEC
        const circulation = apiData.circulation / 100_000_000;
        const price = apiData.market_price_usd;
        
        // Calculate shielded supply using the known ratio
        const baseShielded = circulation * SHIELDED_RATIO;
        
        // Parse hashrate (comes as string like "8.2 GH/s")
        const hashrateMatch = apiData.hashrate_24h?.match(/(\d+\.?\d*)/);
        const hashrate = hashrateMatch ? parseFloat(hashrateMatch[1]) : FALLBACK_DATA.hashrate;

        if (mounted) {
          setData({
            totalSupply: circulation,
            shieldedSupply: baseShielded,
            shieldedPercent: SHIELDED_RATIO * 100,
            price,
            hashrate,
            loading: false,
          });
        }
      } catch (err) {
        console.error('API Error, using fallback data:', err);
        if (mounted) {
          setData(prev => ({ ...prev, loading: false }));
        }
      }
    };

    fetchSupply();

    // Add "live jitter" effect - updates number slightly every 3 seconds
    const interval = setInterval(() => {
      setData(prev => {
        const jitter = (Math.random() - 0.5) * 15; // +/- 7.5 ZEC
        return {
          ...prev,
          shieldedSupply: prev.shieldedSupply + jitter
        };
      });
    }, 3000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return data;
};