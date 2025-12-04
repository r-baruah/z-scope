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
        <section className="relative overflow-hidden min-h-[90vh] flex items-center justify-center">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-neonGreen/5 via-transparent to-transparent pointer-events-none" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center relative z-10">
            <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-neonGreen/30 bg-neonGreen/10 backdrop-blur-md">
              <span className="text-neonGreen text-sm font-semibold tracking-wide uppercase">Privacy Analytics Platform</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 tracking-tight leading-tight">
              Quantifying <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonPink to-purple-500 text-glow">Surveillance</span>.
              <br />
              Visualizing <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonGreen to-emerald-500 text-glow">Freedom</span>.
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 font-light leading-relaxed">
              Discover how much financial data you leak daily, and see why Zcash's 
              privacy-preserving technology is the solution.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a 
                href="#calculator"
                className="group relative px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
              >
                Calculate Leakage
                <span className="absolute inset-0 rounded-full bg-white blur opacity-20 group-hover:opacity-40 transition-opacity"></span>
              </a>
              <a 
                href="#analytics"
                className="px-8 py-4 glass-panel text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all border border-white/10 hover:border-white/20"
              >
                View Network Stats
              </a>
            </div>

            {/* Stats Bar */}
            <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-5xl mx-auto">
              <div className="glass-card rounded-2xl p-8 hover:transform hover:-translate-y-1 transition-transform duration-300">
                <div className="text-4xl font-bold text-neonGreen mb-2 text-glow">4.92M</div>
                <div className="text-gray-400 font-medium tracking-wide uppercase text-sm">ZEC Protected</div>
              </div>
              <div className="glass-card rounded-2xl p-8 hover:transform hover:-translate-y-1 transition-transform duration-300">
                <div className="text-4xl font-bold text-neonBlue mb-2 text-glow">30.15%</div>
                <div className="text-gray-400 font-medium tracking-wide uppercase text-sm">Adoption Rate</div>
              </div>
              <div className="glass-card rounded-2xl p-8 hover:transform hover:-translate-y-1 transition-transform duration-300">
                <div className="text-4xl font-bold text-white mb-2 text-glow">24/7</div>
                <div className="text-gray-400 font-medium tracking-wide uppercase text-sm">Whale Monitoring</div>
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
