import { useState, useEffect } from 'react';
import type { PrivacyScore } from '../types';
import { calculateLeakage, calculatePercentile, savePrivacyScore, getStoredScore } from '../utils/calculator';

export const usePrivacyScore = () => {
  const [score, setScore] = useState<PrivacyScore>({
    monthlyTransactions: 50,
    annualLeakage: 2400,
    percentile: 48,
  });

  useEffect(() => {
    // Load stored score on mount
    const stored = getStoredScore();
    if (stored) {
      const percentile = calculatePercentile(stored);
      setScore({
        monthlyTransactions: stored / (4 * 12),
        annualLeakage: stored,
        percentile,
      });
    }
  }, []);

  const updateScore = (monthlyTx: number) => {
    const leakage = calculateLeakage(monthlyTx);
    const percentile = savePrivacyScore(leakage);
    
    setScore({
      monthlyTransactions: monthlyTx,
      annualLeakage: leakage,
      percentile,
    });
  };

  return { score, updateScore };
};