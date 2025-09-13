import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const TradingPerformance = ({ portfolioData, performanceMetrics, recentTrades }) => {
  return (
    <div className="bg-white rounded-xl brand-shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-heading-semibold text-primary">
          Trading Performance
        </h2>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-success">
            <Icon name="TrendingUp" size={16} />
            <span className="text-sm font-medium">+12.5%</span>
          </div>
          <Button variant="ghost" size="sm">
            <Icon name="ExternalLink" size={16} className="mr-2" />
            View Simulator
          </Button>
        </div>
      </div>
      {/* Performance Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {performanceMetrics?.map((metric) => (
          <div key={metric?.label} className="text-center p-3 bg-muted/50 rounded-lg">
            <div className={`text-lg font-heading font-heading-bold mb-1 ${
              metric?.trend === 'up' ? 'text-success' : 
              metric?.trend === 'down' ? 'text-destructive' : 'text-primary'
            }`}>
              {metric?.value}
            </div>
            <div className="text-xs text-muted-foreground">{metric?.label}</div>
          </div>
        ))}
      </div>
      {/* Portfolio Chart */}
      <div className="mb-6">
        <h3 className="text-sm font-heading font-heading-semibold text-primary mb-3">
          Portfolio Value (Last 30 Days)
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={portfolioData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="date" 
                stroke="#64748B"
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#64748B"
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value) => [`$${value}`, 'Portfolio Value']}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#059669" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: '#059669' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Recent Trades */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-heading font-heading-semibold text-primary">
            Recent Trades
          </h3>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
        <div className="space-y-2">
          {recentTrades?.map((trade) => (
            <div key={trade?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  trade?.type === 'buy' ? 'bg-success/10' : 'bg-destructive/10'
                }`}>
                  <Icon 
                    name={trade?.type === 'buy' ? 'ArrowUp' : 'ArrowDown'} 
                    size={16} 
                    className={trade?.type === 'buy' ? 'text-success' : 'text-destructive'}
                  />
                </div>
                <div>
                  <div className="text-sm font-medium text-primary">
                    {trade?.symbol}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {trade?.quantity} shares • {trade?.time}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-primary">
                  ${trade?.price}
                </div>
                <div className={`text-xs ${
                  trade?.profit >= 0 ? 'text-success' : 'text-destructive'
                }`}>
                  {trade?.profit >= 0 ? '+' : ''}${trade?.profit}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TradingPerformance;