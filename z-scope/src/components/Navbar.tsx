import { Shield } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="border-b border-white/5 bg-darkBg/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-neonGreen blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <Shield className="w-8 h-8 text-neonGreen relative z-10" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight font-['Outfit']">
                Z-Scope
              </h1>
              <p className="text-xs text-gray-400 -mt-1 tracking-wider uppercase">
                Quantifying Surveillance
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center space-x-8">
            <a
              href="#calculator"
              className="text-sm font-medium text-gray-300 hover:text-neonGreen transition-colors tracking-wide uppercase"
            >
              Calculator
            </a>
            <a
              href="#analytics"
              className="text-sm font-medium text-gray-300 hover:text-neonGreen transition-colors tracking-wide uppercase"
            >
              Analytics
            </a>
            <a
              href="#whale-watch"
              className="text-sm font-medium text-gray-300 hover:text-neonGreen transition-colors tracking-wide uppercase"
            >
              Whale Watch
            </a>
          </div>

          <button className="px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-lg font-semibold border border-white/10 hover:border-neonGreen/50 transition-all duration-300 backdrop-blur-sm">
            Connect Wallet
          </button>
        </div>
      </div>
    </nav>
  );
}