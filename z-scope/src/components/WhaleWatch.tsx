import { Bell, ExternalLink, AlertTriangle, Activity } from 'lucide-react';
import { useWhaleMonitor } from '../hooks/useWhaleMonitor';
import { formatDate, formatLargeCurrency } from '../utils/formatters';

export default function WhaleWatch() {
  const { lastWhale, loading } = useWhaleMonitor();

  return (
    <section id="whale-watch" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neonPink/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="text-center mb-12 relative z-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-neonPink/10 border border-neonPink/20 mb-4">
          <Activity className="w-4 h-4 text-neonPink animate-pulse" />
          <span className="text-neonPink text-xs font-bold tracking-wider uppercase">Live Monitoring</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Whale <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonPink to-purple-500 text-glow">Watcher</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Real-time monitoring of large transparent Zcash transactions. See the data that others can see.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 relative z-10">
        {/* Whale Alert Card */}
        <div className="glass-card rounded-3xl p-1 border-t border-white/10">
          <div className="bg-black/40 rounded-[22px] p-6 h-full">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Live Whale Monitor</h3>
                <p className="text-gray-400 text-sm">Tracking transactions &gt; $100k</p>
              </div>
              <div className="flex items-center space-x-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="text-red-400 text-xs font-bold uppercase tracking-wider">Live</span>
              </div>
            </div>

            {loading ? (
              <div className="py-12 text-center">
                <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-neonPink mb-4"></div>
                <p className="text-gray-400 animate-pulse">Scanning mempool...</p>
              </div>
            ) : lastWhale ? (
              <div className="space-y-6">
                <div className="bg-white/5 rounded-xl p-6 font-mono border border-white/5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-neonPink/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="flex justify-between items-center mb-4 relative z-10">
                    <span className="text-gray-500 text-xs uppercase tracking-wider">Time</span>
                    <span className="text-white font-medium">{formatDate(lastWhale.time)}</span>
                  </div>

                  <div className="flex justify-between items-center mb-4 relative z-10">
                    <span className="text-gray-500 text-xs uppercase tracking-wider">Amount</span>
                    <span className="text-3xl font-bold text-neonPink text-glow">
                      {formatLargeCurrency(lastWhale.input_total_usd)}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-white/10 relative z-10">
                    <span className="text-gray-500 text-xs uppercase tracking-wider block mb-2">Transaction Hash</span>
                    <div className="flex items-center justify-between bg-black/30 rounded-lg p-2">
                      <code className="text-gray-300 text-sm truncate mr-2">
                        {lastWhale.hash}
                      </code>
                      <a
                        href={`https://blockchair.com/zcash/transaction/${lastWhale.hash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors text-neonBlue"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-neonPink/5 border border-neonPink/20 rounded-xl p-4 flex items-start space-x-4">
                  <div className="p-2 bg-neonPink/10 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-neonPink" />
                  </div>
                  <div>
                    <h4 className="text-neonPink font-bold text-sm mb-1">Transparent Transaction</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Anyone can see the amount, sender, and recipient. With Zcash Shielded,
                      this would be completely private.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-gray-600" />
                </div>
                <p className="text-gray-300 font-medium">No recent whale activity</p>
                <p className="text-gray-500 text-sm mt-2">
                  Monitoring for transactions &gt; $100,000 USD
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Telegram Alert Setup */}
        <div className="glass-card rounded-3xl p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-start space-x-4 mb-8">
              <div className="p-3 bg-neonBlue/10 rounded-xl border border-neonBlue/20">
                <Bell className="w-6 h-6 text-neonBlue" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Get Instant Alerts</h3>
                <p className="text-gray-400 text-sm">Never miss a whale transaction</p>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-6 mb-8 border border-white/5">
              <h4 className="text-white font-semibold mb-4 flex items-center">
                <span className="w-2 h-2 bg-neonGreen rounded-full mr-2 animate-pulse"></span>
                Real-time Telegram notifications
              </h4>
              <ul className="space-y-3">
                {[
                  'Instant push notifications',
                  'Transaction details & links',
                  'Privacy education on every alert'
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3 text-sm text-gray-400">
                    <div className="w-1 h-1 bg-gray-500 rounded-full" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <a
              href="https://t.me/zscope_alerts"
              target="_blank"
              rel="noopener noreferrer"
              className="group block w-full relative overflow-hidden rounded-xl bg-gradient-to-r from-neonBlue to-blue-600 p-[1px]"
            >
              <div className="relative bg-black/20 backdrop-blur-sm rounded-xl py-4 px-6 transition-all group-hover:bg-transparent">
                <div className="flex items-center justify-center space-x-2 text-white font-bold">
                  <Bell className="w-5 h-5" />
                  <span>Join Telegram Channel</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>

            <div className="border-t border-white/10 pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white font-medium text-sm">Browser Notifications</span>
                <span className="px-2 py-0.5 bg-green-500/10 border border-green-500/20 text-green-400 text-xs rounded-full font-medium">Enabled</span>
              </div>
              <p className="text-gray-500 text-xs mb-3">
                Receive notifications when whales are detected
              </p>
              {window.Notification && Notification.permission !== "granted" && (
                <button
                  onClick={() => Notification.requestPermission()}
                  className="text-xs text-neonBlue hover:text-blue-400 transition-colors flex items-center"
                >
                  Enable browser notifications <span className="ml-1">→</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}