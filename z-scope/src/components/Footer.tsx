import { Github, Twitter, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 bg-cardBg mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-3">Z-Scope</h3>
            <p className="text-gray-400 text-sm mb-4">
              Quantifying Surveillance. Visualizing Freedom.
            </p>
            <p className="text-gray-500 text-xs">
              Built for Zcash Hackathon 2024
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://z.cash" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neonGreen transition-colors">
                  Zcash Official
                </a>
              </li>
              <li>
                <a href="https://api.blockchair.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neonGreen transition-colors">
                  Blockchair API
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-neonGreen transition-colors">
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Connect</h4>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-lg hover:bg-neonGreen/20 hover:text-neonGreen transition-all"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-lg hover:bg-neonBlue/20 hover:text-neonBlue transition-all"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://z.cash" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-800 p-2 rounded-lg hover:bg-neonPink/20 hover:text-neonPink transition-all"
              >
                <Globe className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-4 text-xs text-gray-500">
              <p>Deployed on Vercel</p>
              <p className="mt-1">IPFS backup available</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            © 2024 Z-Scope. Built with React, TypeScript, and Tremor. Data from Blockchair API.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            Privacy is Normal 🛡️
          </p>
        </div>
      </div>
    </footer>
  );
}