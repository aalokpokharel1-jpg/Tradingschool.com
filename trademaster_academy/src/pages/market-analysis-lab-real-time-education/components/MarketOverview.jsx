import React from 'react';
import Icon from '../../../components/AppIcon';

const MarketOverview = () => {
  const marketData = [
    {
      id: 1,
      symbol: "EUR/USD",
      name: "Euro / US Dollar",
      price: "1.0892",
      change: "+0.0023",
      changePercent: "+0.21%",
      trend: "up",
      volume: "2.4B",
      analysis: "Bullish momentum following ECB dovish stance"
    },
    {
      id: 2,
      symbol: "GBP/USD",
      name: "British Pound / US Dollar",
      price: "1.2745",
      change: "-0.0018",
      changePercent: "-0.14%",
      trend: "down",
      volume: "1.8B",
      analysis: "Consolidating after BoE rate decision"
    },
    {
      id: 3,
      symbol: "USD/JPY",
      name: "US Dollar / Japanese Yen",
      price: "149.82",
      change: "+0.45",
      changePercent: "+0.30%",
      trend: "up",
      volume: "3.1B",
      analysis: "Testing resistance near 150.00 level"
    },
    {
      id: 4,
      symbol: "AAPL",
      name: "Apple Inc.",
      price: "$178.92",
      change: "+2.15",
      changePercent: "+1.22%",
      trend: "up",
      volume: "45.2M",
      analysis: "Strong earnings momentum continues"
    }
  ];

  const marketSentiment = {
    overall: "Cautiously Optimistic",
    fearGreedIndex: 68,
    vixLevel: 18.4,
    dollarIndex: 103.2
  };

  return (
    <div className="bg-white rounded-lg brand-shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-trust rounded-lg flex items-center justify-center">
            <Icon name="TrendingUp" size={20} color="white" strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="text-xl font-heading font-heading-bold text-primary">
              Live Market Overview
            </h2>
            <p className="text-sm text-muted-foreground">
              Real-time data with educational insights
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span>Live Data</span>
        </div>
      </div>
      {/* Market Sentiment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="trust-indicator p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Activity" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Market Sentiment</span>
          </div>
          <div className="text-lg font-heading font-heading-semibold text-foreground">
            {marketSentiment?.overall}
          </div>
        </div>
        
        <div className="trust-indicator p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Gauge" size={16} className="text-secondary" />
            <span className="text-sm font-medium text-primary">Fear & Greed</span>
          </div>
          <div className="text-lg font-heading font-heading-semibold text-foreground">
            {marketSentiment?.fearGreedIndex}
          </div>
        </div>
        
        <div className="trust-indicator p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Zap" size={16} className="text-warning" />
            <span className="text-sm font-medium text-primary">VIX Level</span>
          </div>
          <div className="text-lg font-heading font-heading-semibold text-foreground">
            {marketSentiment?.vixLevel}
          </div>
        </div>
        
        <div className="trust-indicator p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="DollarSign" size={16} className="text-accent" />
            <span className="text-sm font-medium text-primary">DXY Index</span>
          </div>
          <div className="text-lg font-heading font-heading-semibold text-foreground">
            {marketSentiment?.dollarIndex}
          </div>
        </div>
      </div>
      {/* Live Market Data */}
      <div className="space-y-3">
        <h3 className="text-lg font-heading font-heading-semibold text-primary mb-4">
          Major Instruments
        </h3>
        
        {marketData?.map((instrument) => (
          <div key={instrument?.id} className="flex items-center justify-between p-4 hover:bg-muted rounded-lg transition-colors duration-200">
            <div className="flex items-center space-x-4">
              <div className={`w-3 h-3 rounded-full ${
                instrument?.trend === 'up' ? 'bg-success' : 'bg-destructive'
              }`}></div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-heading font-heading-semibold text-foreground">
                    {instrument?.symbol}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {instrument?.name}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {instrument?.analysis}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <div className="flex items-center space-x-3">
                <div>
                  <div className="font-heading font-heading-semibold text-foreground">
                    {instrument?.price}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Vol: {instrument?.volume}
                  </div>
                </div>
                <div className={`text-right ${
                  instrument?.trend === 'up' ? 'text-success' : 'text-destructive'
                }`}>
                  <div className="flex items-center space-x-1">
                    <Icon 
                      name={instrument?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                      size={14} 
                    />
                    <span className="text-sm font-medium">
                      {instrument?.changePercent}
                    </span>
                  </div>
                  <div className="text-xs">
                    {instrument?.change}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Clock" size={14} />
            <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
          </div>
          <button className="text-sm text-primary hover:text-primary/80 transition-colors duration-200">
            View Full Market Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;