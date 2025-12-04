import { Shield } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="border-b border-gray-800 bg-cardBg/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-neonGreen" strokeWidth={2.5} />
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">
                Z-Scope
              </h1>
              <p className="text-xs text-gray-400 -mt-1">
                Quantifying Surveillance
              </p>
            </div>
          </div>
          
          <div className="hidden sm:flex items-center space-x-6">
            <a 
              href="#calculator" 
              className="text-gray-300 hover:text-neonGreen transition-colors"
            >
              Calculator
            </a>
            <a 
              href="#analytics" 
              className="text-gray-300 hover:text-neonGreen transition-colors"
            >
              Analytics
            </a>
            <a 
              href="#whale-watch" 
              className="text-gray-300 hover:text-neonGreen transition-colors"
            >
              Whale Watch
            </a>
          </div>

          <button className="px-4 py-2 bg-gradient-to-r from-neonGreen to-green-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-neonGreen/50 transition-all">
            Connect Wallet
          </button>
        </div>
      </div>
    </nav>
  );
}