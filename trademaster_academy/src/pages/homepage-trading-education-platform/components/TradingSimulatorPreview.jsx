import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TradingSimulatorPreview = () => {
  const [selectedAsset, setSelectedAsset] = useState('EUR/USD');
  const [tradeType, setTradeType] = useState('buy');
  const [amount, setAmount] = useState(100);
  const [currentPrice, setCurrentPrice] = useState(1.0845);
  const [priceHistory, setPriceHistory] = useState([]);
  const [isTradeActive, setIsTradeActive] = useState(false);
  const [tradeResult, setTradeResult] = useState(null);

  const assets = [
    { symbol: 'EUR/USD', name: 'Euro/US Dollar', price: 1.0845, change: 0.0023 },
    { symbol: 'GBP/USD', name: 'British Pound/US Dollar', price: 1.2634, change: -0.0012 },
    { symbol: 'USD/JPY', name: 'US Dollar/Japanese Yen', price: 149.85, change: 0.45 },
    { symbol: 'BTC/USD', name: 'Bitcoin/US Dollar', price: 43250.00, change: 1250.00 }
  ];

  // Simulate price movements
  useEffect(() => {
    const interval = setInterval(() => {
      const asset = assets?.find(a => a?.symbol === selectedAsset);
      if (asset) {
        const volatility = 0.0001;
        const change = (Math.random() - 0.5) * volatility;
        const newPrice = currentPrice + change;
        setCurrentPrice(newPrice);
        
        setPriceHistory(prev => {
          const newHistory = [...prev, newPrice]?.slice(-20);
          return newHistory;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentPrice, selectedAsset]);

  // Initialize price history
  useEffect(() => {
    const asset = assets?.find(a => a?.symbol === selectedAsset);
    if (asset) {
      setCurrentPrice(asset?.price);
      // Generate initial price history
      const history = [];
      let price = asset?.price;
      for (let i = 0; i < 20; i++) {
        const change = (Math.random() - 0.5) * 0.0001;
        price += change;
        history?.push(price);
      }
      setPriceHistory(history);
    }
  }, [selectedAsset]);

  const handleTrade = () => {
    if (isTradeActive) return;
    
    setIsTradeActive(true);
    const entryPrice = currentPrice;
    
    // Simulate trade for 5 seconds
    setTimeout(() => {
      const exitPrice = currentPrice;
      const priceDiff = tradeType === 'buy' ? exitPrice - entryPrice : entryPrice - exitPrice;
      const profit = (priceDiff / entryPrice) * amount;
      
      setTradeResult({
        profit: profit,
        isProfit: profit > 0,
        entryPrice,
        exitPrice
      });
      setIsTradeActive(false);
    }, 5000);
  };

  const resetDemo = () => {
    setTradeResult(null);
    setIsTradeActive(false);
  };

  const selectedAssetData = assets?.find(a => a?.symbol === selectedAsset);

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center space-x-2 bg-primary/10 rounded-full px-4 py-2 mb-6">
              <Icon name="Play" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Try It Now</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-heading font-heading-bold text-foreground mb-6">
              Practice Risk-Free Trading
            </h2>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Experience real market conditions without risking your money. Our advanced simulator 
              uses live market data to give you authentic trading practice.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                  <Icon name="Shield" size={20} className="text-success" />
                </div>
                <div>
                  <h3 className="font-heading font-heading-semibold text-foreground">
                    100% Risk-Free
                  </h3>
                  <p className="text-muted-foreground">
                    Practice with virtual money, learn without losses
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="BarChart3" size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-heading-semibold text-foreground">
                    Real Market Data
                  </h3>
                  <p className="text-muted-foreground">
                    Live prices and authentic market conditions
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <Icon name="Users" size={20} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-heading font-heading-semibold text-foreground">
                    Community Learning
                  </h3>
                  <p className="text-muted-foreground">
                    Share strategies and learn from other traders
                  </p>
                </div>
              </div>
            </div>

            <Link to="/trading-simulator-platform">
              <Button 
                variant="default" 
                size="lg"
                iconName="Rocket"
                iconPosition="left"
                className="conversion-pulse"
              >
                Access Full Simulator
              </Button>
            </Link>
          </div>

          {/* Right Content - Trading Interface */}
          <div className="bg-card rounded-2xl border brand-shadow-lg overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-trust text-white p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-heading font-heading-semibold">
                  Demo Trading Platform
                </h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm">Live Demo</span>
                </div>
              </div>
              
              <div className="text-sm text-white/80">
                Virtual Balance: <span className="font-mono font-bold">$10,000.00</span>
              </div>
            </div>

            {/* Asset Selection */}
            <div className="p-6 border-b">
              <label className="block text-sm font-medium text-foreground mb-3">
                Select Asset
              </label>
              <div className="grid grid-cols-2 gap-2">
                {assets?.map((asset) => (
                  <button
                    key={asset?.symbol}
                    onClick={() => setSelectedAsset(asset?.symbol)}
                    className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                      selectedAsset === asset?.symbol
                        ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-border/60 text-foreground'
                    }`}
                  >
                    <div className="font-mono font-bold text-sm">
                      {asset?.symbol}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {asset?.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Chart */}
            <div className="p-6 border-b">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-2xl font-mono font-bold text-foreground">
                    {currentPrice?.toFixed(selectedAsset?.includes('JPY') ? 2 : 4)}
                  </div>
                  <div className={`text-sm flex items-center space-x-1 ${
                    selectedAssetData?.change >= 0 ? 'text-success' : 'text-destructive'
                  }`}>
                    <Icon 
                      name={selectedAssetData?.change >= 0 ? "TrendingUp" : "TrendingDown"} 
                      size={14} 
                    />
                    <span>
                      {selectedAssetData?.change >= 0 ? '+' : ''}{selectedAssetData?.change?.toFixed(4)}
                    </span>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Last 20 ticks</div>
                </div>
              </div>

              {/* Simple Price Chart */}
              <div className="h-24 bg-muted/50 rounded-lg p-4 relative overflow-hidden">
                <svg width="100%" height="100%" className="absolute inset-0">
                  {priceHistory?.length > 1 && (
                    <polyline
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-primary"
                      points={priceHistory?.map((price, index) => {
                        const x = (index / (priceHistory?.length - 1)) * 100;
                        const minPrice = Math.min(...priceHistory);
                        const maxPrice = Math.max(...priceHistory);
                        const y = 100 - ((price - minPrice) / (maxPrice - minPrice)) * 100;
                        return `${x},${y}`;
                      })?.join(' ')}
                    />
                  )}
                </svg>
              </div>
            </div>

            {/* Trading Controls */}
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <button
                  onClick={() => setTradeType('buy')}
                  className={`p-3 rounded-lg border font-medium transition-all duration-200 ${
                    tradeType === 'buy' ?'border-success bg-success text-white' :'border-border text-foreground hover:border-success/50'
                  }`}
                >
                  <Icon name="TrendingUp" size={16} className="mx-auto mb-1" />
                  BUY
                </button>
                
                <button
                  onClick={() => setTradeType('sell')}
                  className={`p-3 rounded-lg border font-medium transition-all duration-200 ${
                    tradeType === 'sell' ?'border-destructive bg-destructive text-white' :'border-border text-foreground hover:border-destructive/50'
                  }`}
                >
                  <Icon name="TrendingDown" size={16} className="mx-auto mb-1" />
                  SELL
                </button>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Investment Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e?.target?.value))}
                    className="w-full pl-8 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    min="10"
                    max="1000"
                  />
                </div>
              </div>

              {/* Trade Button */}
              <Button
                variant={tradeType === 'buy' ? 'default' : 'destructive'}
                fullWidth
                onClick={handleTrade}
                disabled={isTradeActive}
                loading={isTradeActive}
                iconName={isTradeActive ? undefined : (tradeType === 'buy' ? 'TrendingUp' : 'TrendingDown')}
                iconPosition="left"
              >
                {isTradeActive ? 'Trade Active...' : `${tradeType?.toUpperCase()} $${amount}`}
              </Button>

              {/* Trade Result */}
              {tradeResult && (
                <div className={`mt-4 p-4 rounded-lg border ${
                  tradeResult?.isProfit 
                    ? 'border-success bg-success/5 text-success' :'border-destructive bg-destructive/5 text-destructive'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Trade Result</span>
                    <Icon name={tradeResult?.isProfit ? "TrendingUp" : "TrendingDown"} size={16} />
                  </div>
                  <div className="text-2xl font-mono font-bold mb-2">
                    {tradeResult?.isProfit ? '+' : ''}${tradeResult?.profit?.toFixed(2)}
                  </div>
                  <div className="text-sm opacity-80">
                    Entry: {tradeResult?.entryPrice?.toFixed(4)} → Exit: {tradeResult?.exitPrice?.toFixed(4)}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetDemo}
                    className="mt-3"
                    iconName="RotateCcw"
                    iconPosition="left"
                  >
                    Try Another Trade
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TradingSimulatorPreview;