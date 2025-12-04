import { Card, Title, Text, Metric, AreaChart } from '@tremor/react';
import { TrendingUp, Shield, Cpu } from 'lucide-react';
import { useShieldedSupply } from '../hooks/useShieldedSupply';
import { formatCurrency, formatNumber, formatPercent, formatHashrate } from '../utils/formatters';

export default function NetworkStats() {
  const stats = useShieldedSupply();

  // Synthetic 24h data for chart
  const chartData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i}:00`,
    transactions: Math.floor(Math.random() * 100 + 150),
  }));

  return (
    <section id="analytics" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-b from-darkBg to-gray-900">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-3">
          Network <span className="text-neonGreen">Analytics</span>
        </h2>
        <p className="text-gray-400 text-lg">
          Live Zcash network health and adoption metrics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-cardBg border-gray-800 hover:border-neonGreen/50 transition-all">
          <div className="flex items-start justify-between">
            <div>
              <Text className="text-gray-400">ZEC Price</Text>
              <Metric className="text-white mt-2">
                {stats.loading ? '...' : formatCurrency(stats.price)}
              </Metric>
              <div className="flex items-center space-x-1 mt-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <Text className="text-green-500 text-sm">Live</Text>
              </div>
            </div>
            <div className="bg-neonBlue/10 p-3 rounded-lg">
              <TrendingUp className="w-6 h-6 text-neonBlue" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-950 to-cardBg border-neonGreen/50 border-2">
          <div className="flex items-start justify-between">
            <div>
              <Text className="text-gray-300">Shielded Pool</Text>
              <Metric className="text-neonGreen mt-2 text-glow">
                {stats.loading ? '...' : formatPercent(stats.shieldedPercent)}
              </Metric>
              <Text className="text-gray-400 text-sm mt-2">
                {formatNumber(stats.shieldedSupply)} ZEC protected
              </Text>
            </div>
            <div className="bg-neonGreen/10 p-3 rounded-lg">
              <Shield className="w-6 h-6 text-neonGreen" />
            </div>
          </div>
        </Card>

        <Card className="bg-cardBg border-gray-800 hover:border-neonBlue/50 transition-all">
          <div className="flex items-start justify-between">
            <div>
              <Text className="text-gray-400">Network Hashrate</Text>
              <Metric className="text-white mt-2">
                {stats.loading ? '...' : formatHashrate(stats.hashrate)}
              </Metric>
              <Text className="text-gray-500 text-sm mt-2">
                Security strength
              </Text>
            </div>
            <div className="bg-purple-500/10 p-3 rounded-lg">
              <Cpu className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </Card>
      </div>

      {/* Shielded Pool Details */}
      <Card className="bg-cardBg border-gray-800 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <Title className="text-white mb-2">Shielded Pool Adoption</Title>
            <Text className="text-gray-400">
              Real-time tracking of privacy-preserving transactions
            </Text>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-neonGreen/10 rounded-full border border-neonGreen/30">
              <div className="w-2 h-2 bg-neonGreen rounded-full animate-pulse" />
              <Text className="text-neonGreen font-semibold">Live Data</Text>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-gray-900 rounded-lg p-4">
              <Text className="text-gray-400 text-sm mb-2">Total Shielded Supply</Text>
              <Metric className="text-neonGreen text-4xl">
                {formatNumber(stats.shieldedSupply)} ZEC
              </Metric>
              <Text className="text-gray-500 text-sm mt-2">
                ≈ {formatCurrency(stats.shieldedSupply * stats.price)}
              </Text>
            </div>

            <div className="bg-gray-900 rounded-lg p-4">
              <Text className="text-gray-400 text-sm mb-2">Adoption Rate</Text>
              <div className="flex items-baseline space-x-2">
                <Metric className="text-white text-3xl">{formatPercent(stats.shieldedPercent)}</Metric>
                <Text className="text-gray-500">of circulation</Text>
              </div>
              <div className="mt-3 bg-gray-800 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-neonGreen to-green-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${stats.shieldedPercent}%` }}
                />
              </div>
            </div>

            <div className="bg-gradient-to-r from-neonGreen/10 to-transparent rounded-lg p-4 border border-neonGreen/20">
              <Text className="text-xs text-gray-500 mb-1">METHODOLOGY</Text>
              <Text className="text-sm text-gray-300">
                Live estimate based on Orchard/Sapling Pool Activity (30.1% Penetration)
              </Text>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <Text className="text-gray-400 text-sm mb-4">24h Transaction Volume</Text>
            <AreaChart
              className="h-64"
              data={chartData}
              index="hour"
              categories={["transactions"]}
              colors={["green"]}
              showLegend={false}
              showGridLines={false}
              showXAxis={true}
              showYAxis={false}
            />
          </div>
        </div>
      </Card>

      {/* Privacy Message */}
      <Card className="bg-gradient-to-r from-neonGreen/5 via-transparent to-neonBlue/5 border-neonGreen/30">
        <div className="text-center py-6">
          <Shield className="w-12 h-12 text-neonGreen mx-auto mb-4" />
          <Title className="text-white mb-2">Privacy is Growing</Title>
          <Text className="text-gray-400 max-w-2xl mx-auto">
            Over {formatNumber(stats.shieldedSupply)} ZEC ({formatPercent(stats.shieldedPercent)}) is now protected in the shielded pool. 
            Join the privacy revolution – every shielded transaction strengthens the anonymity set.
          </Text>
        </div>
      </Card>
    </section>
  );
}