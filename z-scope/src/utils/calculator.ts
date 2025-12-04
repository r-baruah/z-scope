import { TRACKERS_PER_TRANSACTION } from './constants';

export const calculateLeakage = (monthlyTransactions: number): number => {
  return monthlyTransactions * TRACKERS_PER_TRANSACTION * 12;
};

export const calculatePercentile = (leakage: number): number => {
  // Fake percentile calculation for gamification
  // Logic: Higher leakage = higher percentile (you're worse than more people)
  const percentile = Math.min(99, Math.floor((leakage / 5000) * 100));
  return percentile;
};

export const savePrivacyScore = (leakage: number): number => {
  localStorage.setItem('myLeakScore', leakage.toString());
  localStorage.setItem('lastCalculated', new Date().toISOString());
  return calculatePercentile(leakage);
};

export const getStoredScore = (): number | null => {
  const stored = localStorage.getItem('myLeakScore');
  return stored ? parseInt(stored, 10) : null;
};