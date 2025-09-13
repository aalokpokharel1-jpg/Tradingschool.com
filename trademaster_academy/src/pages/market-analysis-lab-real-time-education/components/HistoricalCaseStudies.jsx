import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const HistoricalCaseStudies = () => {
  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Events' },
    { id: 'crisis', name: 'Financial Crisis' },
    { id: 'policy', name: 'Central Bank Policy' },
    { id: 'geopolitical', name: 'Geopolitical Events' },
    { id: 'pandemic', name: 'Black Swan Events' }
  ];

  const caseStudies = [
    {
      id: 1,
      title: "2008 Financial Crisis",
      category: "crisis",
      date: "September 2008",
      duration: "18 months",
      impact: "Global market collapse",
      keyInstruments: ["USD/JPY", "EUR/USD", "S&P 500", "Gold"],
      overview: `The 2008 financial crisis began with the collapse of Lehman Brothers and spread globally, causing massive deleveraging and flight to safety. Currency markets saw extreme volatility as investors sought safe-haven assets.`,
      timeline: [
        { date: "Sep 15, 2008", event: "Lehman Brothers files for bankruptcy", impact: "USD weakens sharply across all pairs" },
        { date: "Sep 16, 2008", event: "AIG bailout announced", impact: "Brief USD recovery, then continued selling" },
        { date: "Oct 2008", event: "Global coordinated rate cuts", impact: "USD/JPY falls from 110 to 90 in weeks" },
        { date: "Nov 2008", event: "Fed announces QE1", impact: "USD continues decline, risk-off sentiment dominates" }
      ],
      tradingLessons: [
        "Safe-haven currencies (JPY, CHF) outperformed during crisis",
        "Carry trades unwound rapidly, causing massive JPY strength",
        "Correlation between risk assets increased dramatically",
        "Central bank intervention became crucial market driver"
      ],
      chartData: [
        { period: "Pre-Crisis", usdJpy: 110, eurUsd: 1.60, sp500: 1400 },
        { period: "Crisis Peak", usdJpy: 87, eurUsd: 1.25, sp500: 800 },
        { period: "Recovery", usdJpy: 95, eurUsd: 1.35, sp500: 1100 }
      ],
      keyIndicators: {
        vix: "Peak at 80 (normal ~20)",
        spreads: "Credit spreads widened 500+ bps",
        correlation: "Cross-asset correlation reached 0.8+"
      }
    },
    {
      id: 2,
      title: "Brexit Referendum Shock",
      category: "geopolitical",
      date: "June 23, 2016",
      duration: "6 months",
      impact: "GBP collapse, European uncertainty",
      keyInstruments: ["GBP/USD", "EUR/GBP", "FTSE 100", "EUR/USD"],
      overview: `The unexpected Brexit vote result caused one of the largest single-day currency moves in modern history. GBP/USD fell over 1000 pips in hours as markets repriced UK's economic outlook.`,
      timeline: [
        { date: "Jun 23, 2016", event: "Brexit referendum voting", impact: "GBP/USD at 1.50, markets expect Remain win" },
        { date: "Jun 24, 2016", event: "Leave wins 52-48%", impact: "GBP/USD crashes to 1.32 in Asian session" },
        { date: "Jun 27, 2016", event: "Cameron resigns as PM", impact: "Further GBP weakness, political uncertainty" },
        { date: "Oct 2016", event: "Hard Brexit fears peak", impact: "GBP/USD hits 1.20, 30-year lows" }
      ],
      tradingLessons: [
        "Political events can cause extreme volatility",
        "Market positioning amplified the move (most were long GBP)",
        "Safe-haven flows benefited JPY and CHF",
        "Volatility remained elevated for months after the event"
      ],
      chartData: [
        { period: "Pre-Vote", gbpUsd: 1.50, eurGbp: 0.76, ftse: 6300 },
        { period: "Vote Result", gbpUsd: 1.32, eurGbp: 0.82, ftse: 6000 },
        { period: "6M Later", gbpUsd: 1.20, eurGbp: 0.88, ftse: 6800 }
      ],
      keyIndicators: {
        impliedVol: "GBP vol spiked to 40% (normal ~10%)",
        positioning: "Speculative GBP longs at record highs",
        correlation: "GBP weakness spread to EUR"
      }
    },
    {
      id: 3,
      title: "COVID-19 Market Crash",
      category: "pandemic",
      date: "March 2020",
      duration: "3 months",
      impact: "Global lockdowns, unprecedented stimulus",
      keyInstruments: ["USD/JPY", "EUR/USD", "Gold", "Oil"],
      overview: `The COVID-19 pandemic caused the fastest bear market in history, followed by unprecedented fiscal and monetary stimulus. Currency markets saw extreme dollar strength initially, then weakness as Fed cut rates to zero.`,
      timeline: [
        { date: "Mar 9, 2020", event: "WHO declares pandemic", impact: "Risk-off, USD strength begins" },
        { date: "Mar 15, 2020", event: "Fed cuts rates to zero", impact: "Initial USD weakness, then renewed strength" },
        { date: "Mar 23, 2020", event: "Fed announces unlimited QE", impact: "USD peaks, begins decline vs major currencies" },
        { date: "Apr 2020", event: "Oil goes negative", impact: "Commodity currencies collapse, USD mixed" }
      ],
      tradingLessons: [
        "Black swan events cause indiscriminate selling initially",
        "Central bank response determines medium-term trends",
        "Safe-haven demand can overwhelm fundamental factors",
        "Recovery patterns vary significantly by asset class"
      ],
      chartData: [
        { period: "Pre-COVID", usdJpy: 110, eurUsd: 1.12, gold: 1500 },
        { period: "Crisis Low", usdJpy: 102, eurUsd: 1.07, gold: 1450 },
        { period: "Stimulus Rally", usdJpy: 105, eurUsd: 1.18, gold: 2000 }
      ],
      keyIndicators: {
        vix: "Reached 82, highest since 2008",
        dollarIndex: "Peaked at 103, then fell to 89",
        yields: "10Y Treasury fell to 0.5% record low"
      }
    }
  ];

  const filteredCases = selectedCategory === 'all' 
    ? caseStudies 
    : caseStudies?.filter(study => study?.category === selectedCategory);

  const openCaseStudy = (caseStudy) => {
    setSelectedCase(caseStudy);
  };

  const closeCaseStudy = () => {
    setSelectedCase(null);
  };

  return (
    <div className="bg-white rounded-lg brand-shadow">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-trust rounded-lg flex items-center justify-center">
              <Icon name="BookOpen" size={20} color="white" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-xl font-heading font-heading-bold text-primary">
                Historical Case Studies
              </h2>
              <p className="text-sm text-muted-foreground">
                Learn from major market events and their lessons
              </p>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-muted-foreground">Category:</span>
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setSelectedCategory(category?.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {category?.name}
            </button>
          ))}
        </div>
      </div>
      {/* Case Studies Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases?.map((study) => (
            <div 
              key={study?.id} 
              className="border border-border rounded-lg p-6 hover:bg-muted/30 transition-all duration-200 cursor-pointer float-card"
              onClick={() => openCaseStudy(study)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-heading font-heading-bold text-foreground mb-2">
                    {study?.title}
                  </h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-sm text-muted-foreground">{study?.date}</span>
                    <span className="w-1 h-1 bg-muted-foreground rounded-full"></span>
                    <span className="text-sm text-muted-foreground">{study?.duration}</span>
                  </div>
                </div>
                <Icon name="ExternalLink" size={16} className="text-muted-foreground" />
              </div>

              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {study?.overview}
              </p>

              <div className="space-y-3">
                <div>
                  <span className="text-xs font-medium text-muted-foreground">Impact:</span>
                  <p className="text-sm text-foreground">{study?.impact}</p>
                </div>

                <div>
                  <span className="text-xs font-medium text-muted-foreground">Key Instruments:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {study?.keyInstruments?.slice(0, 3)?.map((instrument, index) => (
                      <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                        {instrument}
                      </span>
                    ))}
                    {study?.keyInstruments?.length > 3 && (
                      <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                        +{study?.keyInstruments?.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {study?.tradingLessons?.length} Key Lessons
                  </span>
                  <div className="flex items-center space-x-1 text-primary">
                    <span className="text-sm font-medium">Read Study</span>
                    <Icon name="ArrowRight" size={14} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCases?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="BookOpen" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-heading font-heading-semibold text-muted-foreground mb-2">
              No Case Studies Found
            </h3>
            <p className="text-sm text-muted-foreground">
              No case studies match your selected category.
            </p>
          </div>
        )}
      </div>
      {/* Case Study Modal */}
      {selectedCase && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-heading font-heading-bold text-primary mb-2">
                    {selectedCase?.title}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span>{selectedCase?.date}</span>
                    <span>Duration: {selectedCase?.duration}</span>
                    <span>Impact: {selectedCase?.impact}</span>
                  </div>
                </div>
                <button
                  onClick={closeCaseStudy}
                  className="p-2 hover:bg-muted rounded-lg transition-colors duration-200"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Overview */}
              <div>
                <h3 className="text-lg font-heading font-heading-semibold text-primary mb-3">
                  Overview
                </h3>
                <p className="text-muted-foreground">
                  {selectedCase?.overview}
                </p>
              </div>

              {/* Timeline */}
              <div>
                <h3 className="text-lg font-heading font-heading-semibold text-primary mb-3">
                  Key Timeline
                </h3>
                <div className="space-y-4">
                  {selectedCase?.timeline?.map((event, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-foreground">{event?.date}</span>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{event?.event}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{event?.impact}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Indicators */}
              <div>
                <h3 className="text-lg font-heading font-heading-semibold text-primary mb-3">
                  Key Market Indicators
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(selectedCase?.keyIndicators)?.map(([key, value]) => (
                    <div key={key} className="trust-indicator p-4 rounded-lg">
                      <div className="text-sm font-medium text-primary capitalize mb-1">
                        {key?.replace(/([A-Z])/g, ' $1')?.trim()}
                      </div>
                      <div className="text-sm text-muted-foreground">{value}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trading Lessons */}
              <div>
                <h3 className="text-lg font-heading font-heading-semibold text-primary mb-3">
                  Key Trading Lessons
                </h3>
                <div className="space-y-3">
                  {selectedCase?.tradingLessons?.map((lesson, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                      <p className="text-sm text-muted-foreground">{lesson}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3 pt-4 border-t">
                <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200">
                  <Icon name="Play" size={16} />
                  <span>Practice Scenario</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors duration-200">
                  <Icon name="Download" size={16} />
                  <span>Download Study</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors duration-200">
                  <Icon name="Share" size={16} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoricalCaseStudies;