import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const StrategyLab = () => {
  const [selectedStrategy, setSelectedStrategy] = useState('');
  const [backtestPeriod, setBacktestPeriod] = useState('1month');
  const [isRunning, setIsRunning] = useState(false);

  const strategyOptions = [
    { value: 'sma-crossover', label: 'SMA Crossover Strategy' },
    { value: 'rsi-oversold', label: 'RSI Oversold/Overbought' },
    { value: 'bollinger-bands', label: 'Bollinger Bands Squeeze' },
    { value: 'macd-divergence', label: 'MACD Divergence' },
    { value: 'support-resistance', label: 'Support & Resistance' },
    { value: 'custom', label: 'Custom Strategy' }
  ];

  const periodOptions = [
    { value: '1week', label: '1 Week' },
    { value: '1month', label: '1 Month' },
    { value: '3months', label: '3 Months' },
    { value: '6months', label: '6 Months' },
    { value: '1year', label: '1 Year' }
  ];

  const mockBacktestResults = {
    totalTrades: 45,
    winningTrades: 32,
    losingTrades: 13,
    winRate: 71.1,
    totalProfit: 1250.75,
    totalLoss: -485.20,
    netProfit: 765.55,
    profitFactor: 2.58,
    maxDrawdown: -125.30,
    averageWin: 39.09,
    averageLoss: -37.32,
    largestWin: 125.50,
    largestLoss: -89.75,
    sharpeRatio: 1.85
  };

  const handleRunBacktest = () => {
    setIsRunning(true);
    // Simulate backtest running
    setTimeout(() => {
      setIsRunning(false);
    }, 3000);
  };

  const strategyTemplates = [
    {
      name: 'Moving Average Crossover',
      description: 'Buy when fast MA crosses above slow MA, sell when it crosses below',
      parameters: ['Fast MA: 10', 'Slow MA: 20', 'Stop Loss: 2%', 'Take Profit: 4%'],
      winRate: 68.5,
      profitFactor: 2.1
    },
    {
      name: 'RSI Mean Reversion',
      description: 'Buy when RSI is oversold (<30), sell when overbought (>70)',
      parameters: ['RSI Period: 14', 'Oversold: 30', 'Overbought: 70', 'Stop Loss: 1.5%'],
      winRate: 72.3,
      profitFactor: 1.9
    },
    {
      name: 'Bollinger Band Breakout',
      description: 'Trade breakouts from Bollinger Band squeeze conditions',
      parameters: ['BB Period: 20', 'Std Dev: 2', 'Squeeze Threshold: 0.1', 'Stop Loss: 1%'],
      winRate: 65.8,
      profitFactor: 2.4
    }
  ];

  return (
    <div className="bg-white rounded-lg border p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-heading-semibold text-lg text-primary">
          Strategy Lab
        </h3>
        <div className="flex items-center space-x-2">
          <Icon name="FlaskConical" size={20} className="text-secondary" />
          <span className="text-sm text-muted-foreground">Backtest & Optimize</span>
        </div>
      </div>
      {/* Strategy Selection */}
      <div className="grid grid-cols-2 gap-3">
        <Select
          label="Strategy"
          options={strategyOptions}
          value={selectedStrategy}
          onChange={setSelectedStrategy}
          placeholder="Choose a strategy"
        />
        <Select
          label="Backtest Period"
          options={periodOptions}
          value={backtestPeriod}
          onChange={setBacktestPeriod}
        />
      </div>
      {/* Strategy Parameters */}
      {selectedStrategy && (
        <div className="space-y-3">
          <h4 className="font-heading font-heading-semibold text-sm text-primary">
            Strategy Parameters
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Stop Loss (%)"
              type="number"
              placeholder="2.0"
              step="0.1"
            />
            <Input
              label="Take Profit (%)"
              type="number"
              placeholder="4.0"
              step="0.1"
            />
            <Input
              label="Position Size (%)"
              type="number"
              placeholder="2.0"
              step="0.1"
            />
            <Input
              label="Max Positions"
              type="number"
              placeholder="3"
            />
          </div>
        </div>
      )}
      {/* Run Backtest Button */}
      <Button
        variant="secondary"
        fullWidth
        onClick={handleRunBacktest}
        loading={isRunning}
        disabled={!selectedStrategy}
      >
        <Icon name="Play" size={16} className="mr-2" />
        {isRunning ? 'Running Backtest...' : 'Run Backtest'}
      </Button>
      {/* Backtest Results */}
      {!isRunning && selectedStrategy && (
        <div className="space-y-4">
          <h4 className="font-heading font-heading-semibold text-sm text-primary">
            Backtest Results
          </h4>
          
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg border bg-card">
              <div className="text-xs text-muted-foreground mb-1">Net Profit</div>
              <div className="font-mono font-semibold text-sm text-success">
                +${mockBacktestResults?.netProfit?.toFixed(2)}
              </div>
            </div>
            <div className="p-3 rounded-lg border bg-card">
              <div className="text-xs text-muted-foreground mb-1">Win Rate</div>
              <div className="font-mono font-semibold text-sm text-primary">
                {mockBacktestResults?.winRate}%
              </div>
            </div>
            <div className="p-3 rounded-lg border bg-card">
              <div className="text-xs text-muted-foreground mb-1">Profit Factor</div>
              <div className="font-mono font-semibold text-sm text-secondary">
                {mockBacktestResults?.profitFactor}
              </div>
            </div>
            <div className="p-3 rounded-lg border bg-card">
              <div className="text-xs text-muted-foreground mb-1">Max Drawdown</div>
              <div className="font-mono font-semibold text-sm text-destructive">
                ${mockBacktestResults?.maxDrawdown?.toFixed(2)}
              </div>
            </div>
          </div>

          {/* Detailed Stats */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Trades:</span>
              <span className="font-mono">{mockBacktestResults?.totalTrades}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Winning Trades:</span>
              <span className="font-mono text-success">{mockBacktestResults?.winningTrades}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Losing Trades:</span>
              <span className="font-mono text-destructive">{mockBacktestResults?.losingTrades}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Average Win:</span>
              <span className="font-mono text-success">${mockBacktestResults?.averageWin?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Average Loss:</span>
              <span className="font-mono text-destructive">${mockBacktestResults?.averageLoss?.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sharpe Ratio:</span>
              <span className="font-mono">{mockBacktestResults?.sharpeRatio}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Icon name="Download" size={14} className="mr-1" />
              Export
            </Button>
            <Button variant="secondary" size="sm" className="flex-1">
              <Icon name="Save" size={14} className="mr-1" />
              Save Strategy
            </Button>
          </div>
        </div>
      )}
      {/* Strategy Templates */}
      <div className="space-y-3">
        <h4 className="font-heading font-heading-semibold text-sm text-primary">
          Popular Strategies
        </h4>
        <div className="space-y-2">
          {strategyTemplates?.map((template, index) => (
            <div key={index} className="p-3 rounded-lg border hover:bg-muted/50 transition-colors duration-200 cursor-pointer">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h5 className="font-heading font-heading-semibold text-sm text-primary">
                    {template?.name}
                  </h5>
                  <p className="text-xs text-muted-foreground">
                    {template?.description}
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  <Icon name="Copy" size={14} />
                </Button>
              </div>
              
              <div className="flex items-center justify-between text-xs">
                <div className="flex space-x-4">
                  <span className="text-muted-foreground">
                    Win Rate: <span className="text-success">{template?.winRate}%</span>
                  </span>
                  <span className="text-muted-foreground">
                    Profit Factor: <span className="text-secondary">{template?.profitFactor}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StrategyLab;