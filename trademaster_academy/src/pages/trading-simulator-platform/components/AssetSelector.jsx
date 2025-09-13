import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const AssetSelector = ({ selectedAsset, onAssetSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('forex');

  const assetCategories = [
    { id: 'forex', name: 'Forex', icon: 'DollarSign' },
    { id: 'stocks', name: 'Stocks', icon: 'TrendingUp' },
    { id: 'crypto', name: 'Crypto', icon: 'Bitcoin' },
    { id: 'commodities', name: 'Commodities', icon: 'Zap' }
  ];

  const mockAssets = {
    forex: [
      { symbol: 'EUR/USD', name: 'Euro / US Dollar', price: 1.0850, change: +0.0012, changePercent: +0.11, volume: '2.1M' },
      { symbol: 'GBP/USD', name: 'British Pound / US Dollar', price: 1.2170, change: +0.0025, changePercent: +0.21, volume: '1.8M' },
      { symbol: 'USD/JPY', name: 'US Dollar / Japanese Yen', price: 149.85, change: -0.45, changePercent: -0.30, volume: '1.9M' },
      { symbol: 'AUD/USD', name: 'Australian Dollar / US Dollar', price: 0.6420, change: +0.0008, changePercent: +0.12, volume: '1.2M' },
      { symbol: 'USD/CAD', name: 'US Dollar / Canadian Dollar', price: 1.3650, change: -0.0015, changePercent: -0.11, volume: '980K' },
      { symbol: 'EUR/GBP', name: 'Euro / British Pound', price: 0.8915, change: +0.0005, changePercent: +0.06, volume: '750K' }
    ],
    stocks: [
      { symbol: 'AAPL', name: 'Apple Inc.', price: 178.25, change: +2.15, changePercent: +1.22, volume: '45.2M' },
      { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.80, change: -1.25, changePercent: -0.87, volume: '28.1M' },
      { symbol: 'MSFT', name: 'Microsoft Corporation', price: 415.30, change: +3.80, changePercent: +0.92, volume: '32.5M' },
      { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.50, change: -5.20, changePercent: -2.05, volume: '89.3M' },
      { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 145.75, change: +1.95, changePercent: +1.36, volume: '41.8M' },
      { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 875.20, change: +12.45, changePercent: +1.44, volume: '52.1M' }
    ],
    crypto: [
      { symbol: 'BTC/USD', name: 'Bitcoin', price: 43250.00, change: +850.00, changePercent: +2.00, volume: '15.2B' },
      { symbol: 'ETH/USD', name: 'Ethereum', price: 2580.50, change: +45.20, changePercent: +1.78, volume: '8.5B' },
      { symbol: 'BNB/USD', name: 'Binance Coin', price: 315.80, change: -8.50, changePercent: -2.62, volume: '1.2B' },
      { symbol: 'ADA/USD', name: 'Cardano', price: 0.4850, change: +0.0125, changePercent: +2.64, volume: '450M' },
      { symbol: 'SOL/USD', name: 'Solana', price: 98.75, change: +3.25, changePercent: +3.40, volume: '2.1B' },
      { symbol: 'DOT/USD', name: 'Polkadot', price: 6.85, change: -0.15, changePercent: -2.14, volume: '180M' }
    ],
    commodities: [
      { symbol: 'GOLD', name: 'Gold Spot', price: 2045.50, change: +12.80, changePercent: +0.63, volume: '125K' },
      { symbol: 'SILVER', name: 'Silver Spot', price: 24.85, change: -0.35, changePercent: -1.39, volume: '85K' },
      { symbol: 'OIL', name: 'Crude Oil WTI', price: 78.25, change: +1.15, changePercent: +1.49, volume: '280K' },
      { symbol: 'NATGAS', name: 'Natural Gas', price: 2.85, change: -0.08, changePercent: -2.73, volume: '95K' },
      { symbol: 'COPPER', name: 'Copper', price: 3.82, change: +0.05, changePercent: +1.33, volume: '45K' },
      { symbol: 'WHEAT', name: 'Wheat', price: 6.15, change: -0.12, changePercent: -1.91, volume: '32K' }
    ]
  };

  const filteredAssets = mockAssets?.[activeCategory]?.filter(asset =>
    asset?.symbol?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    asset?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg border h-96 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <h3 className="font-heading font-heading-semibold text-lg text-primary mb-3">
          Select Asset
        </h3>
        
        {/* Search */}
        <Input
          type="search"
          placeholder="Search assets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          className="mb-3"
        />

        {/* Category Tabs */}
        <div className="flex space-x-1">
          {assetCategories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setActiveCategory(category?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                activeCategory === category?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-primary hover:bg-muted'
              }`}
            >
              <Icon name={category?.icon} size={16} />
              <span>{category?.name}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Asset List */}
      <div className="flex-1 overflow-y-auto">
        {filteredAssets?.map((asset) => (
          <button
            key={asset?.symbol}
            onClick={() => onAssetSelect(asset)}
            className={`w-full p-3 border-b hover:bg-muted transition-colors duration-200 ${
              selectedAsset?.symbol === asset?.symbol ? 'bg-primary/5 border-primary/20' : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-left">
                <div className="font-heading font-heading-semibold text-sm text-primary">
                  {asset?.symbol}
                </div>
                <div className="text-xs text-muted-foreground">
                  {asset?.name}
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-mono text-sm font-semibold text-primary">
                  {asset?.price?.toLocaleString()}
                </div>
                <div className={`flex items-center space-x-1 text-xs ${
                  asset?.change >= 0 ? 'text-success' : 'text-destructive'
                }`}>
                  <Icon 
                    name={asset?.change >= 0 ? 'TrendingUp' : 'TrendingDown'} 
                    size={12} 
                  />
                  <span>{asset?.change >= 0 ? '+' : ''}{asset?.change}</span>
                  <span>({asset?.changePercent >= 0 ? '+' : ''}{asset?.changePercent}%)</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
              <span>Volume: {asset?.volume}</span>
              {selectedAsset?.symbol === asset?.symbol && (
                <div className="flex items-center space-x-1 text-primary">
                  <Icon name="Check" size={12} />
                  <span>Selected</span>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
      {/* Market Status */}
      <div className="p-3 border-t bg-muted/50">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-muted-foreground">Market Open</span>
          </div>
          <span className="text-muted-foreground">
            Last updated: {new Date()?.toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AssetSelector;