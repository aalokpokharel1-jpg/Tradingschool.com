import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const InteractiveChart = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('1H');
  const [selectedTool, setSelectedTool] = useState('cursor');
  const [showIndicators, setShowIndicators] = useState({
    sma: true,
    rsi: false,
    macd: false,
    bollinger: false
  });

  const timeframes = ['5M', '15M', '30M', '1H', '4H', '1D', '1W'];
  
  const tools = [
    { id: 'cursor', name: 'Cursor', icon: 'MousePointer' },
    { id: 'line', name: 'Trend Line', icon: 'Minus' },
    { id: 'rectangle', name: 'Rectangle', icon: 'Square' },
    { id: 'fibonacci', name: 'Fibonacci', icon: 'GitBranch' }
  ];

  // Mock chart data
  const chartData = [
    { time: '09:00', price: 1.0850, volume: 1200, sma: 1.0845 },
    { time: '10:00', price: 1.0865, volume: 1450, sma: 1.0852 },
    { time: '11:00', price: 1.0878, volume: 1680, sma: 1.0858 },
    { time: '12:00', price: 1.0892, volume: 1890, sma: 1.0865 },
    { time: '13:00', price: 1.0885, volume: 1750, sma: 1.0870 },
    { time: '14:00', price: 1.0901, volume: 2100, sma: 1.0875 },
    { time: '15:00', price: 1.0918, volume: 2350, sma: 1.0882 },
    { time: '16:00', price: 1.0905, volume: 2180, sma: 1.0888 }
  ];

  const indicators = [
    { id: 'sma', name: 'Simple Moving Average', description: 'Shows average price over time period' },
    { id: 'rsi', name: 'RSI (14)', description: 'Measures overbought/oversold conditions' },
    { id: 'macd', name: 'MACD', description: 'Shows momentum and trend changes' },
    { id: 'bollinger', name: 'Bollinger Bands', description: 'Shows volatility and potential reversal points' }
  ];

  const educationalNotes = [
    {
      id: 1,
      title: "Support & Resistance",
      content: "Notice how price bounces off the 1.0850 level - this is acting as support. When price repeatedly fails to break below a level, it becomes significant.",
      position: { x: 20, y: 30 }
    },
    {
      id: 2,
      title: "Volume Confirmation",
      content: "Higher volume during the upward move at 14:00 confirms buyer interest. Volume should increase in the direction of the trend.",
      position: { x: 60, y: 70 }
    }
  ];

  const toggleIndicator = (indicatorId) => {
    setShowIndicators(prev => ({
      ...prev,
      [indicatorId]: !prev?.[indicatorId]
    }));
  };

  return (
    <div className="bg-white rounded-lg brand-shadow">
      {/* Chart Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-growth rounded-lg flex items-center justify-center">
              <Icon name="LineChart" size={20} color="white" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-xl font-heading font-heading-bold text-primary">
                Interactive Chart Analysis
              </h2>
              <p className="text-sm text-muted-foreground">
                EUR/USD - Practice technical analysis with real-time data
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="text-right">
              <div className="text-lg font-heading font-heading-bold text-success">
                1.0905
              </div>
              <div className="text-sm text-success">
                +0.0055 (+0.51%)
              </div>
            </div>
          </div>
        </div>

        {/* Timeframe Selection */}
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-sm font-medium text-muted-foreground">Timeframe:</span>
          {timeframes?.map((tf) => (
            <button
              key={tf}
              onClick={() => setSelectedTimeframe(tf)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors duration-200 ${
                selectedTimeframe === tf
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* Drawing Tools */}
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-muted-foreground">Tools:</span>
          <div className="flex items-center space-x-2">
            {tools?.map((tool) => (
              <button
                key={tool?.id}
                onClick={() => setSelectedTool(tool?.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  selectedTool === tool?.id
                    ? 'bg-secondary text-secondary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
                title={tool?.name}
              >
                <Icon name={tool?.icon} size={16} />
                <span className="hidden md:inline">{tool?.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Chart Area */}
      <div className="p-6">
        <div className="relative">
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  dataKey="time" 
                  stroke="#64748B"
                  fontSize={12}
                />
                <YAxis 
                  domain={['dataMin - 0.001', 'dataMax + 0.001']}
                  stroke="#64748B"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 20px rgba(30, 58, 138, 0.1)'
                  }}
                />
                
                {/* Price Line */}
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#1E3A8A"
                  strokeWidth={2}
                  dot={{ fill: '#1E3A8A', strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, stroke: '#1E3A8A', strokeWidth: 2 }}
                />
                
                {/* SMA Line */}
                {showIndicators?.sma && (
                  <Line
                    type="monotone"
                    dataKey="sma"
                    stroke="#059669"
                    strokeWidth={1}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                )}
                
                {/* Support Level */}
                <ReferenceLine y={1.0850} stroke="#EF4444" strokeDasharray="3 3" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Educational Overlays */}
          {educationalNotes?.map((note) => (
            <div
              key={note?.id}
              className="absolute bg-white border border-primary/20 rounded-lg p-3 max-w-xs shadow-lg"
              style={{ 
                left: `${note?.position?.x}%`, 
                top: `${note?.position?.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="flex items-start space-x-2">
                <Icon name="Info" size={16} className="text-primary mt-0.5" />
                <div>
                  <h4 className="text-sm font-heading font-heading-semibold text-primary mb-1">
                    {note?.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {note?.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Indicators Panel */}
      <div className="p-6 border-t">
        <h3 className="text-lg font-heading font-heading-semibold text-primary mb-4">
          Technical Indicators
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {indicators?.map((indicator) => (
            <div key={indicator?.id} className="trust-indicator p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-primary">
                  {indicator?.name}
                </span>
                <button
                  onClick={() => toggleIndicator(indicator?.id)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors duration-200 ${
                    showIndicators?.[indicator?.id]
                      ? 'bg-primary border-primary' :'border-muted-foreground'
                  }`}
                >
                  {showIndicators?.[indicator?.id] && (
                    <Icon name="Check" size={12} color="white" strokeWidth={3} />
                  )}
                </button>
              </div>
              <p className="text-xs text-muted-foreground">
                {indicator?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveChart;