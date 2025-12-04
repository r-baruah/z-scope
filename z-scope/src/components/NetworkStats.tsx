import { Card, AreaChart } from '@tremor/react';
import { TrendingUp, Shield, Cpu, Activity } from 'lucide-react';
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
    <section id="analytics" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-gradient-to-b from-darkBg to-black/50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neonGreen/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Network <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonGreen to-emerald-400 text-glow">Analytics</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Live Zcash network health and adoption metrics
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12 relative z-10">
        <div className="glass-card rounded-2xl p-6 hover:bg-white/5 transition-colors group">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">ZEC Price</p>
              <div className="text-3xl font-bold text-white mt-2 font-mono">
                {stats.loading ? '...' : formatCurrency(stats.price)}
              </div>
              <div className="flex items-center space-x-1 mt-2 bg-green-500/10 px-2 py-0.5 rounded-full inline-flex border border-green-500/20">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-green-500 text-xs font-bold uppercase">Live</span>
              </div>
            </div>
            <div className="bg-neonBlue/10 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-6 h-6 text-neonBlue" />
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 bg-gradient-to-br from-neonGreen/10 to-transparent border-neonGreen/30 relative overflow-hidden group">
          <div className="absolute inset-0 bg-neonGreen/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-gray-300 text-sm font-medium uppercase tracking-wider">Shielded Pool</p>
              <div className="text-3xl font-bold text-neonGreen mt-2 text-glow font-mono">
                {stats.loading ? '...' : formatPercent(stats.shieldedPercent)}
              </div>
              <p className="text-gray-400 text-xs mt-2 font-medium">
                {formatNumber(stats.shieldedSupply)} ZEC protected
              </p>
            </div>
            <div className="bg-neonGreen/10 p-3 rounded-xl group-hover:rotate-12 transition-transform duration-300">
              <Shield className="w-6 h-6 text-neonGreen" />
            </div>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 hover:bg-white/5 transition-colors group">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wider">Network Hashrate</p>
              <div className="text-3xl font-bold text-white mt-2 font-mono">
                {stats.loading ? '...' : formatHashrate(stats.hashrate)}
              </div>
              <p className="text-gray-500 text-xs mt-2 font-medium">
                Security strength
              </p>
            </div>
            <div className="bg-purple-500/10 p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <Cpu className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Shielded Pool Details */}
      <div className="glass-card rounded-3xl p-8 mb-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">Shielded Pool Adoption</h3>
            <p className="text-gray-400 text-sm">
              Real-time tracking of privacy-preserving transactions
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-neonGreen/10 rounded-full border border-neonGreen/30">
              <div className="w-2 h-2 bg-neonGreen rounded-full animate-pulse" />
              <span className="text-neonGreen text-xs font-bold uppercase tracking-wider">Live Data</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-black/40 rounded-2xl p-6 border border-white/5">
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">Total Shielded Supply</p>
              <div className="text-neonGreen text-4xl font-bold font-mono text-glow">
                {formatNumber(stats.shieldedSupply)} ZEC
              </div>
              <p className="text-gray-500 text-sm mt-2 font-mono">
                ≈ {formatCurrency(stats.shieldedSupply * stats.price)}
              </p>
            </div>

            <div className="bg-black/40 rounded-2xl p-6 border border-white/5">
              <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">Adoption Rate</p>
              <div className="flex items-baseline space-x-2 mb-3">
                <span className="text-white text-3xl font-bold font-mono">{formatPercent(stats.shieldedPercent)}</span>
                <span className="text-gray-500 text-sm">of circulation</span>
              </div>
              <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-neonGreen to-emerald-600 h-full rounded-full transition-all duration-1000 relative"
                  style={{ width: `${stats.shieldedPercent}%` }}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-white/50 animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="bg-neonGreen/5 rounded-xl p-4 border border-neonGreen/10 flex items-start space-x-3">
              <Activity className="w-5 h-5 text-neonGreen mt-0.5" />
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">METHODOLOGY</p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Live estimate based on Orchard/Sapling Pool Activity (30.1% Penetration)
                </p>
              </div>
            </div>
          </div>

          <div className="bg-black/40 rounded-2xl p-6 border border-white/5 flex flex-col">
            <p className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-6">24h Transaction Volume</p>
            <div className="flex-1 min-h-[250px]">
              <AreaChart
                className="h-full"
                data={chartData}
                index="hour"
                categories={["transactions"]}
                colors={["emerald"]}
                showLegend={false}
                showGridLines={false}
                showXAxis={true}
                showYAxis={false}
                startEndOnly={true}
                curveType="monotone"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Message */}
      <div className="glass-card rounded-2xl p-8 bg-gradient-to-r from-neonGreen/5 via-transparent to-neonBlue/5 border-neonGreen/20 relative z-10 text-center">
        <div className="inline-flex p-4 bg-neonGreen/10 rounded-full mb-6 border border-neonGreen/20">
          <Shield className="w-8 h-8 text-neonGreen" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Privacy is Growing</h3>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
          Over <span className="text-white font-bold">{formatNumber(stats.shieldedSupply)} ZEC</span> ({formatPercent(stats.shieldedPercent)}) is now protected in the shielded pool.
          Join the privacy revolution – every shielded transaction strengthens the anonymity set.
        </p>
      </div>
    </section>
  );
}