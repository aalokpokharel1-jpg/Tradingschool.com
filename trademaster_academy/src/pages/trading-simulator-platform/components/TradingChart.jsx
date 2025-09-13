import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TradingChart = ({ selectedAsset, timeframe, onIndicatorToggle, activeIndicators }) => {
  const [chartType, setChartType] = useState('candlestick');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Mock candlestick data
  const mockCandlestickData = [
    { time: '09:00', open: 1.2150, high: 1.2180, low: 1.2140, close: 1.2170, volume: 1250 },
    { time: '09:15', open: 1.2170, high: 1.2190, low: 1.2160, close: 1.2185, volume: 1380 },
    { time: '09:30', open: 1.2185, high: 1.2200, low: 1.2175, close: 1.2195, volume: 1420 },
    { time: '09:45', open: 1.2195, high: 1.2210, low: 1.2180, close: 1.2205, volume: 1150 },
    { time: '10:00', open: 1.2205, high: 1.2225, low: 1.2190, close: 1.2220, volume: 1680 },
    { time: '10:15', open: 1.2220, high: 1.2235, low: 1.2210, close: 1.2230, volume: 1320 },
    { time: '10:30', open: 1.2230, high: 1.2245, low: 1.2215, close: 1.2240, volume: 1450 },
    { time: '10:45', open: 1.2240, high: 1.2255, low: 1.2225, close: 1.2250, volume: 1280 },
    { time: '11:00', open: 1.2250, high: 1.2265, low: 1.2235, close: 1.2260, volume: 1520 },
    { time: '11:15', open: 1.2260, high: 1.2275, low: 1.2245, close: 1.2270, volume: 1380 }
  ];

  const lineData = mockCandlestickData?.map(item => ({
    time: item?.time,
    price: item?.close,
    volume: item?.volume
  }));

  const indicators = [
    { id: 'sma', name: 'SMA (20)', icon: 'TrendingUp', color: '#059669' },
    { id: 'ema', name: 'EMA (12)', icon: 'Activity', color: '#EA580C' },
    { id: 'rsi', name: 'RSI (14)', icon: 'BarChart3', color: '#DC2626' },
    { id: 'macd', name: 'MACD', icon: 'LineChart', color: '#7C3AED' },
    { id: 'bollinger', name: 'Bollinger Bands', icon: 'GitBranch', color: '#0891B2' }
  ];

  const timeframes = [
    { value: '1m', label: '1M' },
    { value: '5m', label: '5M' },
    { value: '15m', label: '15M' },
    { value: '1h', label: '1H' },
    { value: '4h', label: '4H' },
    { value: '1d', label: '1D' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-white p-3 rounded-lg brand-shadow border">
          <p className="font-medium text-sm text-primary mb-2">{label}</p>
          {chartType === 'candlestick' ? (
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Open:</span>
                <span className="font-mono">{data?.open}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">High:</span>
                <span className="font-mono text-success">{data?.high}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Low:</span>
                <span className="font-mono text-destructive">{data?.low}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Close:</span>
                <span className="font-mono">{data?.close}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Volume:</span>
                <span className="font-mono">{data?.volume}</span>
              </div>
            </div>
          ) : (
            <div className="space-y-1 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price:</span>
                <span className="font-mono">{data?.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Volume:</span>
                <span className="font-mono">{data?.volume}</span>
              </div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`bg-white rounded-lg border ${isFullscreen ? 'fixed inset-4 z-50' : 'h-96'}`}>
      {/* Chart Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <h3 className="font-heading font-heading-semibold text-lg text-primary">
              {selectedAsset?.symbol}
            </h3>
            <span className="text-sm text-muted-foreground">
              {selectedAsset?.name}
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            {timeframes?.map((tf) => (
              <button
                key={tf?.value}
                className={`px-2 py-1 text-xs rounded transition-colors duration-200 ${
                  timeframe === tf?.value
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-primary hover:bg-muted'
                }`}
              >
                {tf?.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Chart Type Toggle */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            <button
              onClick={() => setChartType('line')}
              className={`p-1.5 rounded transition-colors duration-200 ${
                chartType === 'line' ?'bg-white text-primary shadow-sm' :'text-muted-foreground hover:text-primary'
              }`}
            >
              <Icon name="TrendingUp" size={16} />
            </button>
            <button
              onClick={() => setChartType('candlestick')}
              className={`p-1.5 rounded transition-colors duration-200 ${
                chartType === 'candlestick' ?'bg-white text-primary shadow-sm' :'text-muted-foreground hover:text-primary'
              }`}
            >
              <Icon name="BarChart3" size={16} />
            </button>
          </div>

          {/* Indicators Dropdown */}
          <div className="relative group">
            <Button variant="outline" size="sm">
              <Icon name="Settings" size={16} className="mr-2" />
              Indicators
            </Button>
            
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg brand-shadow border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-10">
              <div className="p-2">
                {indicators?.map((indicator) => (
                  <button
                    key={indicator?.id}
                    onClick={() => onIndicatorToggle(indicator?.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded transition-colors duration-200 ${
                      activeIndicators?.includes(indicator?.id)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-primary hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Icon name={indicator?.icon} size={16} />
                      <span>{indicator?.name}</span>
                    </div>
                    {activeIndicators?.includes(indicator?.id) && (
                      <Icon name="Check" size={14} />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Fullscreen Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            <Icon name={isFullscreen ? "Minimize2" : "Maximize2"} size={16} />
          </Button>
        </div>
      </div>
      {/* Chart Area */}
      <div className={`${isFullscreen ? 'h-[calc(100%-4rem)]' : 'h-80'} p-4`}>
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="time" 
                stroke="#64748B"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#64748B"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={['dataMin - 0.001', 'dataMax + 0.001']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#1E3A8A" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: '#1E3A8A' }}
              />
              
              {/* Conditional Indicator Lines */}
              {activeIndicators?.includes('sma') && (
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#059669" 
                  strokeWidth={1}
                  strokeDasharray="5 5"
                  dot={false}
                />
              )}
              {activeIndicators?.includes('ema') && (
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#EA580C" 
                  strokeWidth={1}
                  strokeDasharray="3 3"
                  dot={false}
                />
              )}
            </LineChart>
          ) : (
            <LineChart data={mockCandlestickData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="time" 
                stroke="#64748B"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                stroke="#64748B"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                domain={['dataMin - 0.001', 'dataMax + 0.001']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="close" 
                stroke="#1E3A8A" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
      {/* Educational Overlay */}
      <div className="absolute top-20 right-6 bg-white/95 backdrop-blur-sm rounded-lg p-3 brand-shadow max-w-xs">
        <div className="flex items-start space-x-2">
          <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
          <div>
            <h4 className="font-heading font-heading-semibold text-sm text-primary mb-1">
              Trading Tip
            </h4>
            <p className="text-xs text-muted-foreground">
              Watch for breakout patterns above resistance levels. Current price is testing key support at 1.2150.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingChart;