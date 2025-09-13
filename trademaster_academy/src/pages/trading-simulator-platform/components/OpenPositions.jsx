import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OpenPositions = ({ positions, onClosePosition, onModifyPosition }) => {
  const [selectedPosition, setSelectedPosition] = useState(null);

  const mockPositions = [
    {
      id: 'pos_001',
      symbol: 'EUR/USD',
      type: 'buy',
      volume: 1000,
      openPrice: 1.0845,
      currentPrice: 1.0850,
      stopLoss: 1.0820,
      takeProfit: 1.0880,
      profit: 5.00,
      profitPercent: 0.05,
      openTime: '2025-01-11 09:15:00',
      commission: 0.00,
      swap: -0.25
    },
    {
      id: 'pos_002',
      symbol: 'GBP/USD',
      type: 'sell',
      volume: 1500,
      openPrice: 1.2180,
      currentPrice: 1.2170,
      stopLoss: 1.2200,
      takeProfit: 1.2140,
      profit: 15.00,
      profitPercent: 0.82,
      openTime: '2025-01-11 08:45:00',
      commission: 0.00,
      swap: 0.15
    },
    {
      id: 'pos_003',
      symbol: 'USD/JPY',
      type: 'buy',
      volume: 2000,
      openPrice: 149.90,
      currentPrice: 149.85,
      stopLoss: 149.50,
      takeProfit: 150.30,
      profit: -10.00,
      profitPercent: -0.03,
      openTime: '2025-01-11 07:30:00',
      commission: 0.00,
      swap: -0.50
    }
  ];

  const data = positions || mockPositions;

  const formatTime = (timeString) => {
    return new Date(timeString)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculatePips = (position) => {
    const priceDiff = position?.currentPrice - position?.openPrice;
    const pips = position?.type === 'buy' ? priceDiff : -priceDiff;
    const pipValue = position?.symbol?.includes('JPY') ? pips * 100 : pips * 10000;
    return pipValue?.toFixed(1);
  };

  const handleClosePosition = (positionId) => {
    if (onClosePosition) {
      onClosePosition(positionId);
    }
  };

  const handleModifyPosition = (positionId, modifications) => {
    if (onModifyPosition) {
      onModifyPosition(positionId, modifications);
    }
  };

  return (
    <div className="bg-white rounded-lg border">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-heading-semibold text-lg text-primary">
            Open Positions
          </h3>
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-muted-foreground">Total P&L:</span>
            <span className={`font-mono font-semibold ${
              data?.reduce((sum, pos) => sum + pos?.profit, 0) >= 0 ? 'text-success' : 'text-destructive'
            }`}>
              {data?.reduce((sum, pos) => sum + pos?.profit, 0) >= 0 ? '+' : ''}
              ${data?.reduce((sum, pos) => sum + pos?.profit, 0)?.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      {/* Positions List */}
      <div className="max-h-80 overflow-y-auto">
        {data?.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="TrendingUp" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h4 className="font-heading font-heading-semibold text-lg text-primary mb-2">
              No Open Positions
            </h4>
            <p className="text-muted-foreground">
              Start trading to see your positions here
            </p>
          </div>
        ) : (
          data?.map((position) => (
            <div key={position?.id} className="p-4 border-b hover:bg-muted/50 transition-colors duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    position?.type === 'buy' ? 'bg-success/10' : 'bg-destructive/10'
                  }`}>
                    <Icon 
                      name={position?.type === 'buy' ? 'TrendingUp' : 'TrendingDown'} 
                      size={16} 
                      className={position?.type === 'buy' ? 'text-success' : 'text-destructive'}
                    />
                  </div>
                  <div>
                    <div className="font-heading font-heading-semibold text-sm text-primary">
                      {position?.symbol}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {position?.type?.toUpperCase()} {position?.volume?.toLocaleString()} units
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className={`font-mono font-semibold text-sm ${
                    position?.profit >= 0 ? 'text-success' : 'text-destructive'
                  }`}>
                    {position?.profit >= 0 ? '+' : ''}${position?.profit?.toFixed(2)}
                  </div>
                  <div className={`text-xs ${
                    position?.profit >= 0 ? 'text-success' : 'text-destructive'
                  }`}>
                    {calculatePips(position)} pips
                  </div>
                </div>
              </div>

              {/* Position Details */}
              <div className="grid grid-cols-2 gap-4 mb-3 text-xs">
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Open Price:</span>
                    <span className="font-mono">{position?.openPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Current Price:</span>
                    <span className="font-mono">{position?.currentPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Open Time:</span>
                    <span className="font-mono">{formatTime(position?.openTime)}</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stop Loss:</span>
                    <span className="font-mono">{position?.stopLoss || 'None'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Take Profit:</span>
                    <span className="font-mono">{position?.takeProfit || 'None'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Swap:</span>
                    <span className={`font-mono ${position?.swap >= 0 ? 'text-success' : 'text-destructive'}`}>
                      ${position?.swap?.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedPosition(position?.id)}
                >
                  <Icon name="Edit" size={14} className="mr-1" />
                  Modify
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleClosePosition(position?.id)}
                >
                  <Icon name="X" size={14} className="mr-1" />
                  Close
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
      {/* Quick Actions */}
      {data?.length > 0 && (
        <div className="p-4 border-t bg-muted/50">
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              {data?.length} position{data?.length !== 1 ? 's' : ''} open
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Icon name="Download" size={14} className="mr-1" />
                Export
              </Button>
              <Button variant="destructive" size="sm">
                <Icon name="XCircle" size={14} className="mr-1" />
                Close All
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OpenPositions;