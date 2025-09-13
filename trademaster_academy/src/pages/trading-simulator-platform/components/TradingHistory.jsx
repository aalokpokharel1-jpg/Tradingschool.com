import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const TradingHistory = () => {
  const [filterPeriod, setFilterPeriod] = useState('today');
  const [filterType, setFilterType] = useState('all');

  const periodOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'all', label: 'All Time' }
  ];

  const typeOptions = [
    { value: 'all', label: 'All Trades' },
    { value: 'buy', label: 'Buy Orders' },
    { value: 'sell', label: 'Sell Orders' },
    { value: 'profitable', label: 'Profitable Only' },
    { value: 'losses', label: 'Losses Only' }
  ];

  const mockHistory = [
    {
      id: 'trade_001',
      symbol: 'EUR/USD',
      type: 'buy',
      volume: 1000,
      openPrice: 1.0840,
      closePrice: 1.0855,
      profit: 15.00,
      pips: 1.5,
      openTime: '2025-01-11 09:15:00',
      closeTime: '2025-01-11 10:30:00',
      duration: '1h 15m',
      commission: 0.00,
      swap: -0.15
    },
    {
      id: 'trade_002',
      symbol: 'GBP/USD',
      type: 'sell',
      volume: 1500,
      openPrice: 1.2190,
      closePrice: 1.2175,
      profit: 22.50,
      pips: 1.5,
      openTime: '2025-01-11 08:30:00',
      closeTime: '2025-01-11 09:45:00',
      duration: '1h 15m',
      commission: 0.00,
      swap: 0.10
    },
    {
      id: 'trade_003',
      symbol: 'USD/JPY',
      type: 'buy',
      volume: 2000,
      openPrice: 149.85,
      closePrice: 149.70,
      profit: -30.00,
      pips: -15.0,
      openTime: '2025-01-11 07:00:00',
      closeTime: '2025-01-11 08:15:00',
      duration: '1h 15m',
      commission: 0.00,
      swap: -0.25
    },
    {
      id: 'trade_004',
      symbol: 'AUD/USD',
      type: 'buy',
      volume: 1200,
      openPrice: 0.6415,
      closePrice: 0.6425,
      profit: 12.00,
      pips: 1.0,
      openTime: '2025-01-10 16:20:00',
      closeTime: '2025-01-10 17:45:00',
      duration: '1h 25m',
      commission: 0.00,
      swap: -0.05
    },
    {
      id: 'trade_005',
      symbol: 'USD/CAD',
      type: 'sell',
      volume: 1800,
      openPrice: 1.3660,
      closePrice: 1.3645,
      profit: 27.00,
      pips: 1.5,
      openTime: '2025-01-10 14:10:00',
      closeTime: '2025-01-10 15:30:00',
      duration: '1h 20m',
      commission: 0.00,
      swap: 0.20
    }
  ];

  const filteredHistory = mockHistory?.filter(trade => {
    if (filterType === 'buy' && trade?.type !== 'buy') return false;
    if (filterType === 'sell' && trade?.type !== 'sell') return false;
    if (filterType === 'profitable' && trade?.profit <= 0) return false;
    if (filterType === 'losses' && trade?.profit >= 0) return false;
    return true;
  });

  const totalProfit = filteredHistory?.reduce((sum, trade) => sum + trade?.profit, 0);
  const totalTrades = filteredHistory?.length;
  const winningTrades = filteredHistory?.filter(trade => trade?.profit > 0)?.length;
  const winRate = totalTrades > 0 ? ((winningTrades / totalTrades) * 100)?.toFixed(1) : 0;

  const formatTime = (timeString) => {
    return new Date(timeString)?.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg border">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-heading-semibold text-lg text-primary">
            Trading History
          </h3>
          <Button variant="outline" size="sm">
            <Icon name="Download" size={16} className="mr-2" />
            Export
          </Button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Period"
            options={periodOptions}
            value={filterPeriod}
            onChange={setFilterPeriod}
          />
          <Select
            label="Type"
            options={typeOptions}
            value={filterType}
            onChange={setFilterType}
          />
        </div>
      </div>
      {/* Summary Stats */}
      <div className="p-4 border-b bg-muted/50">
        <div className="grid grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">Total Trades</div>
            <div className="font-heading font-heading-semibold text-sm text-primary">
              {totalTrades}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">Win Rate</div>
            <div className={`font-heading font-heading-semibold text-sm ${
              parseFloat(winRate) >= 50 ? 'text-success' : 'text-destructive'
            }`}>
              {winRate}%
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">Total P&L</div>
            <div className={`font-mono font-semibold text-sm ${
              totalProfit >= 0 ? 'text-success' : 'text-destructive'
            }`}>
              {totalProfit >= 0 ? '+' : ''}${totalProfit?.toFixed(2)}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground mb-1">Avg Trade</div>
            <div className={`font-mono font-semibold text-sm ${
              totalTrades > 0 && (totalProfit / totalTrades) >= 0 ? 'text-success' : 'text-destructive'
            }`}>
              {totalTrades > 0 ? 
                `${(totalProfit / totalTrades) >= 0 ? '+' : ''}$${(totalProfit / totalTrades)?.toFixed(2)}` : 
                '$0.00'
              }
            </div>
          </div>
        </div>
      </div>
      {/* History List */}
      <div className="max-h-80 overflow-y-auto">
        {filteredHistory?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="History" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="font-heading font-heading-semibold text-lg text-primary mb-2">
              No Trading History
            </h4>
            <p className="text-muted-foreground">
              Your completed trades will appear here
            </p>
          </div>
        ) : (
          filteredHistory?.map((trade) => (
            <div key={trade?.id} className="p-4 border-b hover:bg-muted/50 transition-colors duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    trade?.type === 'buy' ? 'bg-success/10' : 'bg-destructive/10'
                  }`}>
                    <Icon 
                      name={trade?.type === 'buy' ? 'TrendingUp' : 'TrendingDown'} 
                      size={16} 
                      className={trade?.type === 'buy' ? 'text-success' : 'text-destructive'}
                    />
                  </div>
                  <div>
                    <div className="font-heading font-heading-semibold text-sm text-primary">
                      {trade?.symbol}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {trade?.type?.toUpperCase()} {trade?.volume?.toLocaleString()} units
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`font-mono font-semibold text-sm ${
                    trade?.profit >= 0 ? 'text-success' : 'text-destructive'
                  }`}>
                    {trade?.profit >= 0 ? '+' : ''}${trade?.profit?.toFixed(2)}
                  </div>
                  <div className={`text-xs ${
                    trade?.profit >= 0 ? 'text-success' : 'text-destructive'
                  }`}>
                    {trade?.pips >= 0 ? '+' : ''}{trade?.pips} pips
                  </div>
                </div>
              </div>

              {/* Trade Details */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Open:</span>
                    <span className="font-mono">{trade?.openPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Close:</span>
                    <span className="font-mono">{trade?.closePrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Duration:</span>
                    <span className="font-mono">{trade?.duration}</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Open Time:</span>
                    <span className="font-mono">{formatTime(trade?.openTime)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Close Time:</span>
                    <span className="font-mono">{formatTime(trade?.closeTime)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Swap:</span>
                    <span className={`font-mono ${trade?.swap >= 0 ? 'text-success' : 'text-destructive'}`}>
                      ${trade?.swap?.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Footer */}
      {filteredHistory?.length > 0 && (
        <div className="p-4 border-t bg-muted/50">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Showing {filteredHistory?.length} trades</span>
            <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TradingHistory;