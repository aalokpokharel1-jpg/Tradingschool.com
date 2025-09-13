import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const TradeIdeaGenerator = () => {
  const [selectedStrategy, setSelectedStrategy] = useState('all');
  const [riskLevel, setRiskLevel] = useState('medium');

  const strategies = [
    { id: 'all', name: 'All Strategies' },
    { id: 'trend', name: 'Trend Following' },
    { id: 'reversal', name: 'Mean Reversion' },
    { id: 'breakout', name: 'Breakout' },
    { id: 'scalping', name: 'Scalping' }
  ];

  const riskLevels = [
    { id: 'low', name: 'Conservative', color: 'success' },
    { id: 'medium', name: 'Moderate', color: 'warning' },
    { id: 'high', name: 'Aggressive', color: 'destructive' }
  ];

  const tradeIdeas = [
    {
      id: 1,
      instrument: "EUR/USD",
      strategy: "trend",
      direction: "long",
      confidence: 85,
      riskLevel: "medium",
      entry: "1.0890",
      stopLoss: "1.0850",
      takeProfit: "1.0950",
      riskReward: "1:1.5",
      timeframe: "4H",
      reasoning: `EUR/USD is showing strong bullish momentum after breaking above the 1.0880 resistance level. The 20-period moving average is providing dynamic support, and RSI indicates continued upward momentum without being overbought.`,
      keyLevels: {
        support: ["1.0850", "1.0820"],
        resistance: ["1.0920", "1.0950"]
      },
      marketContext: "ECB dovish stance and USD weakness creating favorable conditions for EUR strength.",
      educationalNote: "This setup demonstrates a classic trend continuation pattern. Notice how we\'re buying after a breakout with confirmation from multiple indicators."
    },
    {
      id: 2,
      instrument: "GBP/JPY",
      strategy: "breakout",
      direction: "short",
      confidence: 78,
      riskLevel: "high",
      entry: "185.20",
      stopLoss: "186.00",
      takeProfit: "183.50",
      riskReward: "1:2.1",
      timeframe: "1H",
      reasoning: `GBP/JPY has been consolidating in a tight range between 185.00-186.00. A break below 185.00 could trigger significant selling pressure as stop losses are triggered below this psychological level.`,
      keyLevels: {
        support: ["184.50", "183.50"],
        resistance: ["186.00", "186.50"]
      },
      marketContext: "BoJ intervention concerns and UK economic uncertainty creating volatility.",
      educationalNote: "Range breakouts can be powerful but require quick execution. Always wait for confirmation before entering."
    },
    {
      id: 3,
      instrument: "AAPL",
      strategy: "reversal",
      direction: "long",
      confidence: 72,
      riskLevel: "low",
      entry: "$177.50",
      stopLoss: "$175.00",
      takeProfit: "$182.00",
      riskReward: "1:1.8",
      timeframe: "Daily",
      reasoning: `Apple has pulled back to a key support level at $177.50, which coincides with the 50-day moving average. The stock is oversold on RSI and showing bullish divergence, suggesting a potential bounce.`,
      keyLevels: {
        support: ["$175.00", "$172.50"],
        resistance: ["$180.00", "$182.00"]
      },
      marketContext: "Tech sector rotation and earnings season approaching, creating opportunities in quality names.",
      educationalNote: "Mean reversion strategies work well when price reaches extreme levels. Look for confluence of technical factors."
    }
  ];

  const filteredIdeas = selectedStrategy === 'all' 
    ? tradeIdeas?.filter(idea => idea?.riskLevel === riskLevel)
    : tradeIdeas?.filter(idea => idea?.strategy === selectedStrategy && idea?.riskLevel === riskLevel);

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-success bg-success/10';
    if (confidence >= 70) return 'text-warning bg-warning/10';
    return 'text-destructive bg-destructive/10';
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low': return 'text-success bg-success/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'high': return 'text-destructive bg-destructive/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-white rounded-lg brand-shadow">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-growth rounded-lg flex items-center justify-center">
              <Icon name="Zap" size={20} color="white" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-xl font-heading font-heading-bold text-primary">
                AI Trade Idea Generator
              </h2>
              <p className="text-sm text-muted-foreground">
                Educational trade setups with detailed analysis
              </p>
            </div>
          </div>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200">
            <Icon name="RefreshCw" size={16} />
            <span>Generate New Ideas</span>
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Strategy Type
            </label>
            <div className="flex flex-wrap gap-2">
              {strategies?.map((strategy) => (
                <button
                  key={strategy?.id}
                  onClick={() => setSelectedStrategy(strategy?.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedStrategy === strategy?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {strategy?.name}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-muted-foreground mb-2 block">
              Risk Level
            </label>
            <div className="flex flex-wrap gap-2">
              {riskLevels?.map((level) => (
                <button
                  key={level?.id}
                  onClick={() => setRiskLevel(level?.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                    riskLevel === level?.id
                      ? 'bg-secondary text-secondary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {level?.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Trade Ideas */}
      <div className="p-6">
        <div className="space-y-6">
          {filteredIdeas?.map((idea) => (
            <div key={idea?.id} className="border border-border rounded-lg p-6 hover:bg-muted/30 transition-colors duration-200">
              {/* Trade Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xl font-heading font-heading-bold text-foreground">
                      {idea?.instrument}
                    </h3>
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${
                      idea?.direction === 'long' ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                    }`}>
                      <Icon name={idea?.direction === 'long' ? 'TrendingUp' : 'TrendingDown'} size={14} />
                      <span className="text-sm font-medium capitalize">{idea?.direction}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(idea?.confidence)}`}>
                      {idea?.confidence}% Confidence
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(idea?.riskLevel)}`}>
                      {riskLevels?.find(r => r?.id === idea?.riskLevel)?.name} Risk
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {idea?.timeframe}
                    </div>
                  </div>
                </div>
              </div>

              {/* Trade Levels */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                <div className="trust-indicator p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Entry</div>
                  <div className="text-lg font-heading font-heading-bold text-foreground">
                    {idea?.entry}
                  </div>
                </div>
                <div className="trust-indicator p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Stop Loss</div>
                  <div className="text-lg font-heading font-heading-bold text-destructive">
                    {idea?.stopLoss}
                  </div>
                </div>
                <div className="trust-indicator p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Take Profit</div>
                  <div className="text-lg font-heading font-heading-bold text-success">
                    {idea?.takeProfit}
                  </div>
                </div>
                <div className="trust-indicator p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Risk:Reward</div>
                  <div className="text-lg font-heading font-heading-bold text-primary">
                    {idea?.riskReward}
                  </div>
                </div>
              </div>

              {/* Analysis */}
              <div className="space-y-4">
                <div>
                  <h4 className="font-heading font-heading-semibold text-primary mb-2">
                    Trade Reasoning
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {idea?.reasoning}
                  </p>
                </div>

                <div>
                  <h4 className="font-heading font-heading-semibold text-primary mb-2">
                    Market Context
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {idea?.marketContext}
                  </p>
                </div>

                {/* Key Levels */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-sm font-medium text-muted-foreground mb-2">Support Levels</h5>
                    <div className="flex flex-wrap gap-2">
                      {idea?.keyLevels?.support?.map((level, index) => (
                        <span key={index} className="px-2 py-1 bg-success/10 text-success text-xs rounded">
                          {level}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium text-muted-foreground mb-2">Resistance Levels</h5>
                    <div className="flex flex-wrap gap-2">
                      {idea?.keyLevels?.resistance?.map((level, index) => (
                        <span key={index} className="px-2 py-1 bg-destructive/10 text-destructive text-xs rounded">
                          {level}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Educational Note */}
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <Icon name="GraduationCap" size={16} className="text-primary mt-0.5" />
                    <div>
                      <h4 className="text-sm font-heading font-heading-semibold text-primary mb-1">
                        Learning Point
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {idea?.educationalNote}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3 pt-2">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors duration-200">
                    <Icon name="Play" size={16} />
                    <span>Practice in Simulator</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors duration-200">
                    <Icon name="BookOpen" size={16} />
                    <span>Learn Strategy</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors duration-200">
                    <Icon name="Share" size={16} />
                    <span>Share Idea</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredIdeas?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Zap" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-heading font-heading-semibold text-muted-foreground mb-2">
              No Trade Ideas Available
            </h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters or generate new ideas.
            </p>
          </div>
        )}
      </div>
      {/* Disclaimer */}
      <div className="p-6 border-t bg-warning/5">
        <div className="flex items-start space-x-2">
          <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <strong>Educational Purpose Only:</strong> These trade ideas are for learning and practice. Always conduct your own analysis and never risk more than you can afford to lose. Past performance does not guarantee future results.
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeIdeaGenerator;