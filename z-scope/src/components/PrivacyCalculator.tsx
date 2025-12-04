import { useState, useEffect } from 'react';
import { Card, Title, Text, Metric } from '@tremor/react';
import { Eye, EyeOff, TrendingUp } from 'lucide-react';
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
    <section id="calculator" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-3">
          Your Privacy <span className="text-neonPink">Surveillance</span> Score
        </h2>
        <p className="text-gray-400 text-lg">
          Discover how much data you leak every year through traditional payments
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left: Calculator */}
        <Card className="bg-cardBg border-gray-800">
          <Title className="text-white mb-6">Monthly Transactions</Title>
          
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <Text className="text-gray-300">
                  How many digital transactions do you make per month?
                </Text>
                <Metric className="text-neonGreen">{sliderValue}</Metric>
              </div>
              
              <input
                type="range"
                min="0"
                max="500"
                value={sliderValue}
                onChange={handleSliderChange}
                className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #ec4899 0%, #ec4899 ${(sliderValue / 500) * 100}%, #374151 ${(sliderValue / 500) * 100}%, #374151 100%)`
                }}
              />
              
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>0</span>
                <span>250</span>
                <span>500</span>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <Text className="text-gray-400">Trackers per Transaction</Text>
                <Text className="text-white font-semibold">4</Text>
              </div>
              <Text className="text-xs text-gray-500">
                Bank • Merchant • Ad Network • Device OS
              </Text>
            </div>

            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full py-2 flex items-center justify-center space-x-2 text-neonBlue hover:text-blue-400 transition-colors"
            >
              {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{showDetails ? 'Hide' : 'Show'} Details</span>
            </button>

            {showDetails && (
              <div className="bg-gray-900 rounded-lg p-4 space-y-2 text-sm animate-in">
                <div className="flex justify-between">
                  <span className="text-gray-400">Monthly Leakage:</span>
                  <span className="text-white font-mono">{sliderValue * 4} points</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Annual Leakage:</span>
                  <span className="text-neonPink font-mono font-bold">
                    {formatNumber(score.annualLeakage)} points
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-gray-800">
                  <span className="text-gray-400">With Zcash Shielded:</span>
                  <span className="text-neonGreen font-mono font-bold">0 points</span>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Right: Results */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-red-950 to-cardBg border-neonPink/50 border-2">
            <div className="text-center">
              <Text className="text-gray-300 mb-2">Annual Data Points Leaked</Text>
              <Metric className="text-6xl font-bold text-neonPink text-glow mb-4 animate-count">
                {formatNumber(score.annualLeakage)}
              </Metric>
              <div className="flex items-center justify-center space-x-2 text-red-400">
                <TrendingUp className="w-5 h-5" />
                <Text className="font-semibold">Every transaction is tracked</Text>
              </div>
            </div>
          </Card>

          <Card className="bg-cardBg border-gray-800">
            <Title className="text-white mb-4">Privacy Leaderboard</Title>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-900 rounded-lg">
                <div>
                  <Text className="text-gray-300">Your Ranking</Text>
                  <p className="text-sm text-gray-500">Compared to other visitors</p>
                </div>
                <div className="text-right">
                  <Metric className="text-neonPink">{score.percentile}%</Metric>
                  <Text className="text-xs text-gray-500">percentile</Text>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-4">
                <Text className="text-white mb-2">
                  You leak more data than <span className="text-neonPink font-bold">{score.percentile}%</span> of users
                </Text>
                <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                  <div 
                    className="bg-gradient-to-r from-neonGreen via-yellow-500 to-neonPink h-2 rounded-full transition-all duration-500"
                    style={{ width: `${score.percentile}%` }}
                  />
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-950 to-cardBg rounded-lg p-4 border border-neonGreen/30">
                <Text className="text-neonGreen font-semibold mb-2">
                  🎯 Challenge: Get Below 500 Points
                </Text>
                <Text className="text-xs text-gray-400">
                  Use Zcash Shielded transactions to eliminate tracking
                </Text>
              </div>
            </div>
          </Card>

          <div className="text-center p-6 bg-gradient-to-r from-neonGreen/10 to-transparent rounded-lg border border-neonGreen/20">
            <Text className="text-white text-lg font-semibold mb-2">
              Ready to stop the leak?
            </Text>
            <Text className="text-gray-400 text-sm">
              Scroll down to see how Zcash protects your privacy
            </Text>
          </div>
        </div>
      </div>
    </section>
  );
}