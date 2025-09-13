import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const LiveMarketTicker = () => {
  const [marketData, setMarketData] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  // Mock market data that updates periodically
  const generateMarketData = () => {
    const symbols = [
      { symbol: 'EUR/USD', name: 'Euro/US Dollar' },
      { symbol: 'GBP/USD', name: 'British Pound/US Dollar' },
      { symbol: 'USD/JPY', name: 'US Dollar/Japanese Yen' },
      { symbol: 'AUD/USD', name: 'Australian Dollar/US Dollar' },
      { symbol: 'USD/CAD', name: 'US Dollar/Canadian Dollar' },
      { symbol: 'USD/CHF', name: 'US Dollar/Swiss Franc' },
      { symbol: 'NZD/USD', name: 'New Zealand Dollar/US Dollar' },
      { symbol: 'BTC/USD', name: 'Bitcoin/US Dollar' },
      { symbol: 'ETH/USD', name: 'Ethereum/US Dollar' },
      { symbol: 'AAPL', name: 'Apple Inc.' },
      { symbol: 'GOOGL', name: 'Alphabet Inc.' },
      { symbol: 'TSLA', name: 'Tesla Inc.' }
    ];

    return symbols?.map(item => {
      const basePrice = Math.random() * 100 + 50;
      const change = (Math.random() - 0.5) * 5;
      const changePercent = (change / basePrice) * 100;
      
      return {
        ...item,
        price: basePrice?.toFixed(item?.symbol?.includes('/') ? 5 : 2),
        change: change?.toFixed(2),
        changePercent: changePercent?.toFixed(2),
        isPositive: change >= 0,
        volume: Math.floor(Math.random() * 1000000) + 100000
      };
    });
  };

  useEffect(() => {
    // Initialize market data
    setMarketData(generateMarketData());

    // Update market data every 3 seconds
    const interval = setInterval(() => {
      setMarketData(generateMarketData());
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="bg-trust text-trust-foreground border-b border-white/10 relative overflow-hidden">
      {/* Close Button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-4 z-10 p-1 rounded hover:bg-white/10 transition-colors duration-200"
        aria-label="Close market ticker"
      >
        <Icon name="X" size={16} color="white" />
      </button>
      {/* Market Status */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Markets Open</span>
          </div>
          <div className="text-sm text-white/70">
            Live data • Updated every 3 seconds
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-4 text-sm text-white/70">
          <span>NYSE: Open</span>
          <span>NASDAQ: Open</span>
          <span>FOREX: 24/7</span>
        </div>
      </div>
      {/* Scrolling Ticker */}
      <div className="relative overflow-hidden py-3">
        <div className="flex animate-scroll whitespace-nowrap">
          {/* First set of data */}
          {marketData?.map((item, index) => (
            <div key={`first-${index}`} className="inline-flex items-center space-x-6 mx-8">
              <div className="flex items-center space-x-3">
                <div className="font-mono font-bold text-white">
                  {item?.symbol}
                </div>
                <div className="font-mono text-white">
                  {item?.price}
                </div>
                <div className={`flex items-center space-x-1 font-mono text-sm ${
                  item?.isPositive ? 'text-success' : 'text-destructive'
                }`}>
                  <Icon 
                    name={item?.isPositive ? "TrendingUp" : "TrendingDown"} 
                    size={14} 
                  />
                  <span>{item?.isPositive ? '+' : ''}{item?.change}</span>
                  <span>({item?.isPositive ? '+' : ''}{item?.changePercent}%)</span>
                </div>
              </div>
            </div>
          ))}
          
          {/* Duplicate set for seamless scrolling */}
          {marketData?.map((item, index) => (
            <div key={`second-${index}`} className="inline-flex items-center space-x-6 mx-8">
              <div className="flex items-center space-x-3">
                <div className="font-mono font-bold text-white">
                  {item?.symbol}
                </div>
                <div className="font-mono text-white">
                  {item?.price}
                </div>
                <div className={`flex items-center space-x-1 font-mono text-sm ${
                  item?.isPositive ? 'text-success' : 'text-destructive'
                }`}>
                  <Icon 
                    name={item?.isPositive ? "TrendingUp" : "TrendingDown"} 
                    size={14} 
                  />
                  <span>{item?.isPositive ? '+' : ''}{item?.change}</span>
                  <span>({item?.isPositive ? '+' : ''}{item?.changePercent}%)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Educational Note */}
      <div className="px-4 py-2 bg-white/5 text-center">
        <p className="text-xs text-white/60">
          <Icon name="Info" size={12} className="inline mr-1" />
          Live market data for educational purposes • Learn to read market movements with our courses
        </p>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default LiveMarketTicker;