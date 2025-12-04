import { Github, Twitter, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-black/40 backdrop-blur-lg mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-white font-bold text-xl mb-4 font-['Outfit']">Z-Scope</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Quantifying Surveillance. Visualizing Freedom.
              <br />
              We believe privacy is a fundamental human right.
            </p>
            <div className="inline-flex items-center px-3 py-1 bg-white/5 rounded-full border border-white/10">
              <span className="w-2 h-2 bg-neonGreen rounded-full mr-2 animate-pulse"></span>
              <p className="text-gray-400 text-xs font-medium">
                Built for Zypherpunks Hackathon 2025
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="https://z.cash" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neonGreen transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2 group-hover:bg-neonGreen transition-colors"></span>
                  Zcash Official
                </a>
              </li>
              <li>
                <a href="https://api.blockchair.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neonGreen transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2 group-hover:bg-neonGreen transition-colors"></span>
                  Blockchair API
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neonGreen transition-colors flex items-center group">
                  <span className="w-1 h-1 bg-gray-600 rounded-full mr-2 group-hover:bg-neonGreen transition-colors"></span>
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 p-3 rounded-xl hover:bg-neonGreen/20 hover:text-neonGreen transition-all border border-white/5 hover:border-neonGreen/30 hover:-translate-y-1"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 p-3 rounded-xl hover:bg-neonBlue/20 hover:text-neonBlue transition-all border border-white/5 hover:border-neonBlue/30 hover:-translate-y-1"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://z.cash"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/5 p-3 rounded-xl hover:bg-neonPink/20 hover:text-neonPink transition-all border border-white/5 hover:border-neonPink/30 hover:-translate-y-1"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-6 text-xs text-gray-500 space-y-1 font-mono">
              <p>Deployed on Vercel</p>
              <p>IPFS backup available</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Z-Scope. Built with React, TypeScript, and Tremor. Data from Blockchair API.
          </p>
          <p className="text-gray-600 text-xs mt-3 font-medium tracking-wide">
            PRIVACY IS NORMAL 🛡️
          </p>
        </div>
      </div>
    </footer>
  );
}