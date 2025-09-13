import React from 'react';
import Icon from '../../../components/AppIcon';

const PortfolioSummary = ({ portfolio }) => {
  const mockPortfolio = {
    balance: 10000.00,
    equity: 10245.50,
    margin: 1250.00,
    freeMargin: 8995.50,
    marginLevel: 819.64,
    profit: 245.50,
    profitPercent: 2.46,
    openPositions: 3,
    todayTrades: 7,
    winRate: 71.4
  };

  const data = portfolio || mockPortfolio;

  const summaryCards = [
    {
      title: 'Account Balance',
      value: `$${data?.balance?.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: 'Wallet',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      title: 'Current Equity',
      value: `$${data?.equity?.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: 'TrendingUp',
      color: data?.equity >= data?.balance ? 'text-success' : 'text-destructive',
      bgColor: data?.equity >= data?.balance ? 'bg-success/10' : 'bg-destructive/10'
    },
    {
      title: 'Used Margin',
      value: `$${data?.margin?.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: 'Lock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Free Margin',
      value: `$${data?.freeMargin?.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: 'Unlock',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    }
  ];

  const performanceMetrics = [
    {
      label: 'Today\'s P&L',
      value: `${data?.profit >= 0 ? '+' : ''}$${Math.abs(data?.profit)?.toFixed(2)}`,
      percentage: `${data?.profitPercent >= 0 ? '+' : ''}${data?.profitPercent}%`,
      isPositive: data?.profit >= 0
    },
    {
      label: 'Open Positions',
      value: data?.openPositions?.toString(),
      percentage: null,
      isPositive: true
    },
    {
      label: 'Today\'s Trades',
      value: data?.todayTrades?.toString(),
      percentage: null,
      isPositive: true
    },
    {
      label: 'Win Rate',
      value: `${data?.winRate}%`,
      percentage: null,
      isPositive: data?.winRate >= 50
    }
  ];

  return (
    <div className="bg-white rounded-lg border p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-heading-semibold text-lg text-primary">
          Portfolio Summary
        </h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-xs text-muted-foreground">Live</span>
        </div>
      </div>
      {/* Balance Cards */}
      <div className="grid grid-cols-2 gap-3">
        {summaryCards?.map((card, index) => (
          <div key={index} className="p-3 rounded-lg border bg-card">
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg ${card?.bgColor}`}>
                <Icon name={card?.icon} size={16} className={card?.color} />
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">{card?.title}</p>
              <p className={`font-mono font-semibold text-sm ${card?.color}`}>
                {card?.value}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Margin Level Indicator */}
      <div className="p-3 rounded-lg border bg-card">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-primary">Margin Level</span>
          <span className={`font-mono font-semibold text-sm ${
            data?.marginLevel >= 200 ? 'text-success' : 
            data?.marginLevel >= 100 ? 'text-warning' : 'text-destructive'
          }`}>
            {data?.marginLevel?.toFixed(2)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              data?.marginLevel >= 200 ? 'bg-success' : 
              data?.marginLevel >= 100 ? 'bg-warning' : 'bg-destructive'
            }`}
            style={{ width: `${Math.min(data?.marginLevel / 10, 100)}%` }}
          ></div>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {data?.marginLevel >= 200 ? 'Safe' : 
           data?.marginLevel >= 100 ? 'Caution' : 'Margin Call Risk'}
        </p>
      </div>
      {/* Performance Metrics */}
      <div className="space-y-3">
        <h4 className="font-heading font-heading-semibold text-sm text-primary">
          Performance Metrics
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {performanceMetrics?.map((metric, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
              <span className="text-xs text-muted-foreground">{metric?.label}</span>
              <div className="text-right">
                <span className={`font-mono font-semibold text-sm ${
                  metric?.isPositive ? 'text-success' : 'text-destructive'
                }`}>
                  {metric?.value}
                </span>
                {metric?.percentage && (
                  <span className={`text-xs ml-1 ${
                    metric?.isPositive ? 'text-success' : 'text-destructive'
                  }`}>
                    {metric?.percentage}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Risk Warning */}
      <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
        <div className="flex items-start space-x-2">
          <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
          <div>
            <h5 className="font-heading font-heading-semibold text-sm text-warning mb-1">
              Risk Notice
            </h5>
            <p className="text-xs text-muted-foreground">
              This is a demo account with virtual funds. Real trading involves significant risk of loss.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioSummary;