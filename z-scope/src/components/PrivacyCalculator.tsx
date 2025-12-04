import { useState, useEffect } from 'react';
import { Eye, EyeOff, ShieldAlert, ShieldCheck } from 'lucide-react';
import { usePrivacyScore } from '../hooks/usePrivacyScore';
import { formatNumber } from '../utils/formatters';

export default function PrivacyCalculator() {
  const { score, updateScore } = usePrivacyScore();
  const [sliderValue, setSliderValue] = useState(score.monthlyTransactions);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    setSliderValue(score.monthlyTransactions);
  }, [score.monthlyTransactions]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setSliderValue(value);
    updateScore(value);
  };

  return (
    <section id="calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Your Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonPink to-purple-500 text-glow">Surveillance</span> Score
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Discover how much data you leak every year through traditional payments
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Left: Calculator */}
        <div className="glass-card rounded-3xl p-8">
          <h3 className="text-2xl font-bold text-white mb-8">Monthly Transactions</h3>

          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-300 font-medium">
                  How many digital transactions do you make per month?
                </p>
                <span className="text-3xl font-bold text-neonGreen text-glow">{sliderValue}</span>
              </div>

              <div className="relative h-12 flex items-center">
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={sliderValue}
                  onChange={handleSliderChange}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider z-10 relative"
                  style={{
                    background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${(sliderValue / 500) * 100}%, #374151 ${(sliderValue / 500) * 100}%, #374151 100%)`
                  }}
                />
                <div className="absolute inset-0 pointer-events-none">
                  <div
                    className="absolute h-6 w-6 bg-white rounded-full shadow-[0_0_15px_rgba(236,72,153,0.8)] top-1/2 -translate-y-1/2 -ml-3 transition-all duration-75"
                    style={{ left: `${(sliderValue / 500) * 100}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between text-sm text-gray-500 mt-2 font-mono">
                <span>0</span>
                <span>250</span>
                <span>500+</span>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10">
              <div className="flex items-center justify-between mb-3">
                <p className="text-gray-400">Trackers per Transaction</p>
                <p className="text-white font-bold text-xl">4</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Bank', 'Merchant', 'Ad Network', 'Device OS'].map((tracker) => (
                  <span key={tracker} className="px-2 py-1 bg-white/5 rounded text-xs text-gray-400 border border-white/5">
                    {tracker}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full py-3 flex items-center justify-center space-x-2 text-neonBlue hover:text-blue-400 transition-colors bg-neonBlue/5 hover:bg-neonBlue/10 rounded-xl border border-neonBlue/20"
            >
              {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showDetails ? 'Hide' : 'Show'} Calculation Details</span>
            </button>

            {showDetails && (
              <div className="bg-black/40 rounded-xl p-6 space-y-3 text-sm animate-in fade-in slide-in-from-top-4 duration-300 border border-white/5">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Monthly Leakage:</span>
                  <span className="text-white font-mono bg-white/5 px-2 py-1 rounded">{sliderValue * 4} points</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Annual Leakage:</span>
                  <span className="text-neonPink font-mono font-bold bg-neonPink/10 px-2 py-1 rounded border border-neonPink/20">
                    {formatNumber(score.annualLeakage)} points
                  </span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-white/10">
                  <span className="text-gray-400">With Zcash Shielded:</span>
                  <span className="text-neonGreen font-mono font-bold bg-neonGreen/10 px-2 py-1 rounded border border-neonGreen/20">0 points</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Results */}
        <div className="space-y-6">
          <div className="glass-card rounded-3xl p-1 bg-gradient-to-br from-neonPink/20 to-transparent border-neonPink/30">
            <div className="bg-black/40 backdrop-blur-xl rounded-[22px] p-8 text-center h-full">
              <p className="text-gray-300 mb-4 font-medium uppercase tracking-wide text-sm">Annual Data Points Leaked</p>
              <div className="text-7xl font-bold text-neonPink text-glow mb-6 animate-count font-['Outfit']">
                {formatNumber(score.annualLeakage)}
              </div>
              <div className="flex items-center justify-center space-x-2 text-red-400 bg-red-500/10 py-2 px-4 rounded-full inline-flex border border-red-500/20">
                <ShieldAlert className="w-5 h-5" />
                <span className="font-semibold">Your financial privacy is at risk</span>
              </div>
            </div>
          </div>

          <div className="glass-card rounded-3xl p-8">
            <h3 className="text-xl font-bold text-white mb-6">Privacy Leaderboard</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                <div>
                  <p className="text-gray-300 font-medium">Your Ranking</p>
                  <p className="text-sm text-gray-500">Compared to global average</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold text-neonPink">{score.percentile}%</span>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">percentile</p>
                </div>
              </div>

              <div className="bg-black/20 rounded-xl p-6 border border-white/5">
                <p className="text-white mb-4 leading-relaxed">
                  You leak more data than <span className="text-neonPink font-bold text-lg">{score.percentile}%</span> of users monitored.
                </p>
                <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-neonGreen via-yellow-500 to-neonPink h-full rounded-full transition-all duration-1000 ease-out relative"
                    style={{ width: `${score.percentile}%` }}
                  >
                    <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/50"></div>
                  </div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-2">
                  <span>Private</span>
                  <span>Exposed</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-neonGreen/10 to-transparent rounded-xl p-5 border border-neonGreen/20 flex items-start space-x-4">
                <div className="p-2 bg-neonGreen/20 rounded-lg text-neonGreen">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-neonGreen font-bold mb-1">
                    Target: 0 Points
                  </p>
                  <p className="text-sm text-gray-400">
                    Use Zcash Shielded transactions to eliminate tracking completely.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}