import Navbar from './components/Navbar';
import PrivacyCalculator from './components/PrivacyCalculator';
import NetworkStats from './components/NetworkStats';
import WhaleWatch from './components/WhaleWatch';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-darkBg">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-neonGreen/5 to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
              Quantifying <span className="text-neonPink">Surveillance</span>.
              <br />
              Visualizing <span className="text-neonGreen">Freedom</span>.
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Discover how much financial data you leak daily, and see why Zcash's 
              privacy-preserving technology is the solution.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a 
                href="#calculator"
                className="px-8 py-4 bg-gradient-to-r from-neonPink to-pink-600 text-white rounded-lg font-bold hover:shadow-lg hover:shadow-neonPink/50 transition-all"
              >
                Calculate Your Leakage
              </a>
              <a 
                href="#analytics"
                className="px-8 py-4 bg-gray-800 text-white rounded-lg font-bold hover:bg-gray-700 transition-all border border-gray-700"
              >
                View Network Stats
              </a>
            </div>

            {/* Stats Bar */}
            <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
              <div className="bg-cardBg/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
                <div className="text-3xl font-bold text-neonGreen mb-2">4.92M</div>
                <div className="text-gray-400 text-sm">ZEC Protected</div>
              </div>
              <div className="bg-cardBg/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
                <div className="text-3xl font-bold text-neonBlue mb-2">30.15%</div>
                <div className="text-gray-400 text-sm">Adoption Rate</div>
              </div>
              <div className="bg-cardBg/50 backdrop-blur-sm border border-gray-800 rounded-lg p-6">
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-gray-400 text-sm">Whale Monitoring</div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <PrivacyCalculator />
        <NetworkStats />
        <WhaleWatch />
      </main>

      <Footer />
    </div>
  );
}

export default App;
