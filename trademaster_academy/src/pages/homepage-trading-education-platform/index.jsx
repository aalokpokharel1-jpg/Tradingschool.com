import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import LiveMarketTicker from './components/LiveMarketTicker';
import HeroSection from './components/HeroSection';
import LearningPathsSection from './components/LearningPathsSection';
import TradingSimulatorPreview from './components/TradingSimulatorPreview';
import CommunitySection from './components/CommunitySection';
import TrustIndicatorsSection from './components/TrustIndicatorsSection';

const HomepageTradingEducationPlatform = () => {
  return (
    <>
      <Helmet>
        <title>TradeMaster Academy - Transform Your Trading Journey Today</title>
        <meta name="description" content="Start your trading journey with TradeMaster Academy. Learn from zero to expert with our proven step-by-step system, risk-free practice environment, and supportive community of 10,000+ successful graduates." />
        <meta name="keywords" content="trading education, learn trading, trading courses, forex education, trading simulator, financial education, trading academy" />
        <meta property="og:title" content="TradeMaster Academy - Transform Your Trading Journey Today" />
        <meta property="og:description" content="Join thousands of successful traders who started their journey with TradeMaster Academy. 94% completion rate, expert guidance, and risk-free practice environment." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/homepage-trading-education-platform" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header />

        {/* Live Market Ticker */}
        <div className="pt-16">
          <LiveMarketTicker />
        </div>

        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <HeroSection />

          {/* Learning Paths Section */}
          <LearningPathsSection />

          {/* Trading Simulator Preview */}
          <TradingSimulatorPreview />

          {/* Community Section */}
          <CommunitySection />

          {/* Trust Indicators Section */}
          <TrustIndicatorsSection />
        </main>

        {/* Footer */}
        <footer className="bg-trust text-trust-foreground py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-growth rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">T</span>
                  </div>
                  <div>
                    <div className="font-heading font-heading-bold text-xl text-white">
                      TradeMaster Academy
                    </div>
                    <div className="text-white/70 text-sm">
                      Your Path to Trading Mastery
                    </div>
                  </div>
                </div>
                
                <p className="text-white/80 mb-6 leading-relaxed">
                  Empowering traders worldwide with comprehensive education, 
                  practical tools, and supportive community. Transform your 
                  financial future with proven trading strategies.
                </p>
                
                <div className="flex space-x-4">
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                    <span className="text-white text-sm font-bold">f</span>
                  </div>
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                    <span className="text-white text-sm font-bold">t</span>
                  </div>
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                    <span className="text-white text-sm font-bold">in</span>
                  </div>
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                    <span className="text-white text-sm font-bold">yt</span>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="font-heading font-heading-semibold text-white mb-4">
                  Quick Links
                </h3>
                <ul className="space-y-2 text-white/70">
                  <li><a href="/course-library-interactive-learning" className="hover:text-white transition-colors">Courses</a></li>
                  <li><a href="/trading-simulator-platform" className="hover:text-white transition-colors">Simulator</a></li>
                  <li><a href="/community-hub-social-learning" className="hover:text-white transition-colors">Community</a></li>
                  <li><a href="/personal-progress-dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
                  <li><a href="/market-analysis-lab-real-time-education" className="hover:text-white transition-colors">Market Lab</a></li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="font-heading font-heading-semibold text-white mb-4">
                  Support
                </h3>
                <ul className="space-y-2 text-white/70">
                  <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="text-white/60 text-sm">
                © {new Date()?.getFullYear()} TradeMaster Academy. All rights reserved.
              </div>
              
              <div className="flex items-center space-x-6 mt-4 md:mt-0 text-white/60 text-sm">
                <span>🔒 SSL Secured</span>
                <span>🛡️ GDPR Compliant</span>
                <span>⭐ A+ BBB Rating</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default HomepageTradingEducationPlatform;