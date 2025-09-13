import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const EconomicCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date()?.toISOString()?.split('T')?.[0]);
  const [selectedImpact, setSelectedImpact] = useState('all');

  const economicEvents = [
    {
      id: 1,
      time: "08:30",
      currency: "USD",
      event: "Non-Farm Payrolls",
      impact: "high",
      forecast: "180K",
      previous: "175K",
      actual: null,
      description: "Monthly change in employment excluding farm workers. Strong job growth typically strengthens the dollar as it indicates economic health.",
      tradingTip: "Watch for deviations &gt;20K from forecast. Positive surprise often leads to USD strength across all pairs."
    },
    {
      id: 2,
      time: "10:00",
      currency: "EUR",
      event: "ECB Interest Rate Decision",
      impact: "high",
      forecast: "4.50%",
      previous: "4.50%",
      actual: null,
      description: "European Central Bank\'s benchmark interest rate decision. Rate changes directly affect EUR strength and eurozone economic outlook.",
      tradingTip: "Focus on the press conference 45 minutes after. Hawkish tone can boost EUR even with unchanged rates."
    },
    {
      id: 3,
      time: "12:30",
      currency: "GBP",
      event: "GDP Growth Rate QoQ",
      impact: "medium",
      forecast: "0.2%",
      previous: "0.1%",
      actual: null,
      description: "Quarterly change in the value of goods and services produced. Indicates overall economic health and growth trajectory.",
      tradingTip: "GDP surprises often have delayed impact. Combine with employment data for stronger trading signals."
    },
    {
      id: 4,
      time: "14:00",
      currency: "USD",
      event: "Consumer Price Index",
      impact: "high",
      forecast: "3.2%",
      previous: "3.4%",
      actual: null,
      description: "Measures inflation by tracking price changes in consumer goods and services. Key metric for Federal Reserve policy decisions.",
      tradingTip: "Core CPI (excluding food/energy) often more important. Higher than expected typically strengthens USD."
    },
    {
      id: 5,
      time: "16:00",
      currency: "CAD",
      event: "Bank of Canada Rate Decision",
      impact: "medium",
      forecast: "5.00%",
      previous: "5.00%",
      actual: "5.00%",
      description: "Bank of Canada\'s overnight rate decision. Affects CAD strength and reflects central bank\'s economic outlook.",
      tradingTip: "Watch for forward guidance changes. Oil prices also heavily influence CAD alongside rate decisions."
    }
  ];

  const impactLevels = [
    { id: 'all', name: 'All Events', color: 'muted' },
    { id: 'high', name: 'High Impact', color: 'destructive' },
    { id: 'medium', name: 'Medium Impact', color: 'warning' },
    { id: 'low', name: 'Low Impact', color: 'success' }
  ];

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return 'text-destructive bg-destructive/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getImpactIcon = (impact) => {
    switch (impact) {
      case 'high': return 'AlertTriangle';
      case 'medium': return 'AlertCircle';
      case 'low': return 'Info';
      default: return 'Circle';
    }
  };

  const filteredEvents = selectedImpact === 'all' 
    ? economicEvents 
    : economicEvents?.filter(event => event?.impact === selectedImpact);

  return (
    <div className="bg-white rounded-lg brand-shadow">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
              <Icon name="Calendar" size={20} color="white" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-xl font-heading font-heading-bold text-primary">
                Economic Calendar
              </h2>
              <p className="text-sm text-muted-foreground">
                Upcoming events with educational context
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e?.target?.value)}
              className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Impact Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-muted-foreground">Filter by impact:</span>
          {impactLevels?.map((level) => (
            <button
              key={level?.id}
              onClick={() => setSelectedImpact(level?.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                selectedImpact === level?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {level?.name}
            </button>
          ))}
        </div>
      </div>
      {/* Events List */}
      <div className="p-6">
        <div className="space-y-4">
          {filteredEvents?.map((event) => (
            <div key={event?.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-heading font-heading-semibold text-foreground">
                      {event?.time}
                    </span>
                    <div className={`w-8 h-6 rounded flex items-center justify-center text-xs font-bold text-white ${
                      event?.currency === 'USD' ? 'bg-blue-600' :
                      event?.currency === 'EUR' ? 'bg-blue-500' :
                      event?.currency === 'GBP' ? 'bg-red-600' :
                      event?.currency === 'CAD' ? 'bg-red-500' : 'bg-gray-500'
                    }`}>
                      {event?.currency}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-heading font-heading-semibold text-foreground">
                        {event?.event}
                      </h3>
                      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(event?.impact)}`}>
                        <Icon name={getImpactIcon(event?.impact)} size={12} />
                        <span className="capitalize">{event?.impact}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {event?.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Event Data */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="trust-indicator p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Forecast</div>
                  <div className="text-sm font-heading font-heading-semibold text-foreground">
                    {event?.forecast}
                  </div>
                </div>
                <div className="trust-indicator p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Previous</div>
                  <div className="text-sm font-heading font-heading-semibold text-foreground">
                    {event?.previous}
                  </div>
                </div>
                <div className="trust-indicator p-3 rounded-lg">
                  <div className="text-xs text-muted-foreground mb-1">Actual</div>
                  <div className="text-sm font-heading font-heading-semibold text-foreground">
                    {event?.actual || 'Pending'}
                  </div>
                </div>
              </div>

              {/* Trading Tip */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
                  <div>
                    <h4 className="text-sm font-heading font-heading-semibold text-primary mb-1">
                      Trading Insight
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {event?.tradingTip}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredEvents?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-heading font-heading-semibold text-muted-foreground mb-2">
              No Events Found
            </h3>
            <p className="text-sm text-muted-foreground">
              No economic events match your selected filters for this date.
            </p>
          </div>
        )}
      </div>
      {/* Educational Footer */}
      <div className="p-6 border-t bg-muted/30">
        <div className="flex items-start space-x-3">
          <Icon name="BookOpen" size={20} className="text-primary mt-1" />
          <div>
            <h4 className="font-heading font-heading-semibold text-primary mb-2">
              How to Use Economic Calendar
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <strong>Before Events:</strong> Plan your trades around high-impact events. Avoid trading 30 minutes before major announcements.
              </div>
              <div>
                <strong>During Events:</strong> Watch for immediate price reactions. High volatility can create both opportunities and risks.
              </div>
              <div>
                <strong>After Events:</strong> Analyze how markets reacted vs. expectations. This builds your understanding of market psychology.
              </div>
              <div>
                <strong>Risk Management:</strong> Use smaller position sizes during news events. Spreads often widen during high volatility.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EconomicCalendar;