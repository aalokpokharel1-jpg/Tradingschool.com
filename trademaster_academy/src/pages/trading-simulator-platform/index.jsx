import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';

// Import all components
import TradingChart from './components/TradingChart';
import OrderPanel from './components/OrderPanel';
import AssetSelector from './components/AssetSelector';
import PortfolioSummary from './components/PortfolioSummary';
import OpenPositions from './components/OpenPositions';
import TradingHistory from './components/TradingHistory';
import LeaderboardPanel from './components/LeaderboardPanel';
import StrategyLab from './components/StrategyLab';

const TradingSimulatorPlatform = () => {
  const [selectedAsset, setSelectedAsset] = useState({
    symbol: 'EUR/USD',
    name: 'Euro / US Dollar',
    price: 1.0850,
    change: +0.0012,
    changePercent: +0.11
  });
  const [timeframe, setTimeframe] = useState('15m');
  const [activeIndicators, setActiveIndicators] = useState(['sma']);
  const [activeTab, setActiveTab] = useState('positions');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(1.2170);

  // Add mock data for positions and portfolio
  const [positions] = useState([
    {
      id: 1,
      symbol: 'EUR/USD',
      type: 'buy',
      size: 10000,
      openPrice: 1.2150,
      currentPrice: 1.2170,
      pnl: 20,
      timestamp: new Date().toISOString()
    },
    {
      id: 2,
      symbol: 'GBP/USD',
      type: 'sell',
      size: 5000,
      openPrice: 1.2680,
      currentPrice: 1.2665,
      pnl: 7.5,
      timestamp: new Date().toISOString()
    }
  ]);

  const [portfolio] = useState({
    balance: 10000,
    equity: 10027.5,
    margin: 150,
    freeMargin: 9877.5,
    marginLevel: 6685,
    totalPnl: 27.5
  });

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice(prev => {
        const change = (Math.random() - 0.5) * 0.0010;
        return Math.max(0, prev + change);
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleAssetSelect = (asset) => {
    setSelectedAsset(asset);
    setCurrentPrice(asset?.price);
  };

  const handleIndicatorToggle = (indicatorId) => {
    setActiveIndicators(prev => 
      prev?.includes(indicatorId) 
        ? prev?.filter(id => id !== indicatorId)
        : [...prev, indicatorId]
    );
  };

  const handlePlaceOrder = (orderData) => {
    console.log('Order placed:', orderData);
    // In a real app, this would send the order to the backend
  };

  const handleClosePosition = (positionId) => {
    console.log('Closing position:', positionId);
    // In a real app, this would close the position
  };

  const handleModifyPosition = (positionId, modifications) => {
    console.log('Modifying position:', positionId, modifications);
    // In a real app, this would modify the position
  };

  const bottomTabs = [
    { id: 'positions', label: 'Positions', icon: 'TrendingUp', count: 3 },
    { id: 'history', label: 'History', icon: 'History', count: null },
    { id: 'leaderboard', label: 'Leaderboard', icon: 'Trophy', count: null },
    { id: 'strategy', label: 'Strategy Lab', icon: 'FlaskConical', count: null }
  ];

  const renderBottomContent = () => {
    switch (activeTab) {
      case 'positions':
        return (
          <OpenPositions
            positions={positions}
            onClosePosition={handleClosePosition}
            onModifyPosition={handleModifyPosition}
          />
        );
      case 'history':
        return <TradingHistory />;
      case 'leaderboard':
        return <LeaderboardPanel />;
      case 'strategy':
        return <StrategyLab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        {/* Main Trading Interface */}
        <div className="container mx-auto px-4 py-6">
          {/* Top Section - Chart and Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            {/* Asset Selector */}
            <div className="lg:col-span-1">
              <AssetSelector
                selectedAsset={selectedAsset}
                onAssetSelect={handleAssetSelect}
              />
            </div>

            {/* Trading Chart */}
            <div className="lg:col-span-2">
              <TradingChart
                selectedAsset={selectedAsset}
                timeframe={timeframe}
                onIndicatorToggle={handleIndicatorToggle}
                activeIndicators={activeIndicators}
              />
            </div>

            {/* Order Panel */}
            <div className="lg:col-span-1">
              <OrderPanel
                selectedAsset={selectedAsset}
                onPlaceOrder={handlePlaceOrder}
                currentPrice={currentPrice}
              />
            </div>
          </div>

          {/* Middle Section - Portfolio Summary */}
          <div className="mb-6">
            <PortfolioSummary portfolio={portfolio} />
          </div>

          {/* Bottom Section - Tabbed Content */}
          <div className="space-y-4">
            {/* Tab Navigation */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-1 bg-muted rounded-lg p-1">
                {bottomTabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      activeTab === tab?.id
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-muted-foreground hover:text-primary'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                    {tab?.count && (
                      <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                        {tab?.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Icon name="Settings" size={16} className="mr-2" />
                  Settings
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Download" size={16} className="mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Tab Content */}
            <div>
              {renderBottomContent()}
            </div>
          </div>
        </div>

        {/* Floating Chat Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-secondary text-secondary-foreground rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-40"
        >
          <Icon name={isChatOpen ? "X" : "MessageCircle"} size={24} />
        </button>

        {/* Chat Panel */}
        {isChatOpen && (
          <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg border shadow-xl z-40">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <Icon name="Bot" size={16} className="text-secondary-foreground" />
                  </div>
                  <div>
                    <h4 className="font-heading font-heading-semibold text-sm text-primary">
                      Trading Mentor
                    </h4>
                    <div className="flex items-center space-x-1 text-xs text-success">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <span>Online</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="p-1 hover:bg-muted rounded transition-colors duration-200"
                >
                  <Icon name="X" size={16} className="text-muted-foreground" />
                </button>
              </div>
            </div>

            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              <div className="bg-muted rounded-lg p-3">
                <p className="text-sm text-muted-foreground">
                  👋 Welcome to the Trading Simulator! I'm here to help you learn. 
                  What would you like to know about your current trades?
                </p>
              </div>
              
              <div className="space-y-2">
                <Button variant="outline" size="sm" fullWidth className="justify-start">
                  <Icon name="HelpCircle" size={14} className="mr-2" />
                  Explain my current position
                </Button>
                <Button variant="outline" size="sm" fullWidth className="justify-start">
                  <Icon name="TrendingUp" size={14} className="mr-2" />
                  Market analysis tips
                </Button>
                <Button variant="outline" size="sm" fullWidth className="justify-start">
                  <Icon name="Shield" size={14} className="mr-2" />
                  Risk management advice
                </Button>
              </div>
            </div>

            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Ask me anything..."
                  className="flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button size="sm">
                  <Icon name="Send" size={14} />
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Educational Overlay */}
        <div className="fixed top-20 left-6 max-w-xs bg-white/95 backdrop-blur-sm rounded-lg p-4 brand-shadow z-30">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="GraduationCap" size={16} className="text-accent" />
            </div>
            <div>
              <h4 className="font-heading font-heading-semibold text-sm text-primary mb-2">
                Learning Mode Active
              </h4>
              <p className="text-xs text-muted-foreground mb-3">
                Practice with virtual $10,000. All trades are risk-free and educational.
              </p>
              <div className="flex space-x-2">
                <Link to="/course-library-interactive-learning">
                  <Button variant="outline" size="sm">
                    <Icon name="BookOpen" size={12} className="mr-1" />
                    Courses
                  </Button>
                </Link>
                <Link to="/personal-progress-dashboard">
                  <Button variant="secondary" size="sm">
                    <Icon name="BarChart3" size={12} className="mr-1" />
                    Progress
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Market Status Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-2 z-20">
          <div className="container mx-auto flex items-center justify-between text-xs">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-muted-foreground">Markets Open</span>
              </div>
              <span className="text-muted-foreground">
                Server Time: {new Date()?.toLocaleTimeString()}
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-muted-foreground">
                Spread: <span className="font-mono">0.8 pips</span>
              </span>
              <span className="text-muted-foreground">
                Latency: <span className="font-mono text-success">12ms</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingSimulatorPlatform;