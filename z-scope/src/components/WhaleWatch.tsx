import { Card, Title, Text, Metric, Badge } from '@tremor/react';
import { Bell, ExternalLink, AlertTriangle } from 'lucide-react';
import { useWhaleMonitor } from '../hooks/useWhaleMonitor';
import { formatDate, formatLargeCurrency } from '../utils/formatters';

export default function WhaleWatch() {
  const { lastWhale, loading } = useWhaleMonitor();

  return (
    <section id="whale-watch" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-3">
          Whale <span className="text-neonPink">Watcher</span> 🐳
        </h2>
        <p className="text-gray-400 text-lg">
          Real-time monitoring of large transparent Zcash transactions
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Whale Alert Card */}
        <Card className="bg-gradient-to-br from-pink-950 to-cardBg border-neonPink/50 border-2">
          <div className="flex justify-between items-start mb-4">
            <div>
              <Title className="text-white">Live Whale Monitor</Title>
              <Text className="text-gray-400">Tracking transactions &gt; $100k</Text>
            </div>
            <Badge color="red" icon={Bell} className="animate-pulse">
              Live
            </Badge>
          </div>

          {loading ? (
            <div className="py-8 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-neonPink"></div>
              <Text className="text-gray-400 mt-4">Scanning mempool...</Text>
            </div>
          ) : lastWhale ? (
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm">
                <div className="flex justify-between items-center mb-2">
                  <Text className="text-gray-500">TIME</Text>
                  <Text className="text-white">{formatDate(lastWhale.time)}</Text>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <Text className="text-gray-500">AMOUNT</Text>
                  <Metric className="text-neonPink text-2xl">
                    {formatLargeCurrency(lastWhale.input_total_usd)}
                  </Metric>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-800">
                  <Text className="text-gray-500 text-xs mb-1">HASH</Text>
                  <div className="flex items-center justify-between">
                    <Text className="text-gray-400 truncate mr-2">
                      {lastWhale.hash.substring(0, 24)}...
                    </Text>
                    <a
                      href={`https://blockchair.com/zcash/transaction/${lastWhale.hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neonBlue hover:text-blue-400 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-neonPink/10 border border-neonPink/30 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-neonPink flex-shrink-0 mt-0.5" />
                  <div>
                    <Text className="text-neonPink font-semibold mb-1">
                      This transaction is TRANSPARENT
                    </Text>
                    <Text className="text-gray-400 text-sm">
                      Anyone can see the amount, sender, and recipient. With Zcash Shielded, 
                      this would be completely private.
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center">
              <Text className="text-gray-400">No recent whale activity detected</Text>
              <Text className="text-gray-600 text-sm mt-2">
                Monitoring for transactions &gt; $100,000 USD
              </Text>
            </div>
          )}
        </Card>

        {/* Telegram Alert Setup */}
        <Card className="bg-cardBg border-gray-800">
          <div className="flex items-start space-x-3 mb-6">
            <div className="bg-neonBlue/10 p-3 rounded-lg">
              <Bell className="w-6 h-6 text-neonBlue" />
            </div>
            <div>
              <Title className="text-white">Get Instant Alerts</Title>
              <Text className="text-gray-400">
                Never miss a whale transaction
              </Text>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-900 rounded-lg p-4">
              <Text className="text-white font-semibold mb-3">
                Real-time Telegram notifications
              </Text>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-neonGreen rounded-full" />
                  <span>Instant push notifications</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-neonGreen rounded-full" />
                  <span>Transaction details & links</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-neonGreen rounded-full" />
                  <span>Privacy education on every alert</span>
                </li>
              </ul>
            </div>

            <a
              href="https://t.me/zscope_alerts"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-gradient-to-r from-neonBlue to-blue-600 text-white py-4 rounded-lg font-bold hover:shadow-lg hover:shadow-neonBlue/50 transition-all group"
            >
              <div className="flex items-center justify-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>Join Telegram Channel</span>
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </a>

            <div className="text-center">
              <Text className="text-gray-500 text-xs">
                Updates every 5 minutes via Cloudflare Workers
              </Text>
            </div>
          </div>

          {/* Browser Notifications */}
          <div className="mt-6 pt-6 border-t border-gray-800">
            <div className="flex items-center justify-between mb-3">
              <Text className="text-white font-semibold">Browser Notifications</Text>
              <Badge color="green" size="sm">Enabled</Badge>
            </div>
            <Text className="text-gray-400 text-sm mb-3">
              You'll also receive browser notifications when whales are detected (check your browser settings if not seeing them)
            </Text>
            {window.Notification && Notification.permission !== "granted" && (
              <button
                onClick={() => Notification.requestPermission()}
                className="text-sm text-neonBlue hover:text-blue-400 transition-colors"
              >
                Enable browser notifications →
              </button>
            )}
          </div>
        </Card>
      </div>

      {/* Why It Matters */}
      <Card className="mt-6 bg-gradient-to-r from-neonPink/5 to-transparent border-neonPink/30">
        <div className="text-center py-4">
          <Title className="text-white mb-2">Why Whale Watching Matters</Title>
          <Text className="text-gray-400 max-w-3xl mx-auto">
            Every transparent whale transaction proves why privacy matters. These large movements are visible to 
            everyone – competitors, hackers, and data brokers. With Zcash's shielded pool, whale transactions 
            remain completely private while maintaining full security and compliance capabilities.
          </Text>
        </div>
      </Card>
    </section>
  );
}