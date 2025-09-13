import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import MarketOverview from './components/MarketOverview';
import InteractiveChart from './components/InteractiveChart';
import EconomicCalendar from './components/EconomicCalendar';
import TradeIdeaGenerator from './components/TradeIdeaGenerator';
import HistoricalCaseStudies from './components/HistoricalCaseStudies';
import ResearchLibrary from './components/ResearchLibrary';
import Icon from '../../components/AppIcon';

const MarketAnalysisLab = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Market Overview', icon: 'TrendingUp' },
    { id: 'chart', name: 'Interactive Chart', icon: 'LineChart' },
    { id: 'calendar', name: 'Economic Calendar', icon: 'Calendar' },
    { id: 'ideas', name: 'Trade Ideas', icon: 'Zap' },
    { id: 'studies', name: 'Case Studies', icon: 'BookOpen' },
    { id: 'research', name: 'Research Library', icon: 'Library' }
  ];

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'overview':
        return <MarketOverview />;
      case 'chart':
        return <InteractiveChart />;
      case 'calendar':
        return <EconomicCalendar />;
      case 'ideas':
        return <TradeIdeaGenerator />;
      case 'studies':
        return <HistoricalCaseStudies />;
      case 'research':
        return <ResearchLibrary />;
      default:
        return <MarketOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={toggleSidebar} />
      <main className={`pt-16 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center">
                <Icon name="BarChart3" size={24} color="white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-3xl font-heading font-heading-bold text-primary">
                  Market Analysis Lab
                </h1>
                <p className="text-lg text-muted-foreground">
                  Real-time market education and professional analysis tools
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="trust-indicator p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Activity" size={16} className="text-success" />
                  <span className="text-sm font-medium text-primary">Live Data</span>
                </div>
                <div className="text-2xl font-heading font-heading-bold text-foreground">
                  24/7
                </div>
                <div className="text-xs text-muted-foreground">
                  Real-time market feeds
                </div>
              </div>
              
              <div className="trust-indicator p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="BookOpen" size={16} className="text-primary" />
                  <span className="text-sm font-medium text-primary">Case Studies</span>
                </div>
                <div className="text-2xl font-heading font-heading-bold text-foreground">
                  50+
                </div>
                <div className="text-xs text-muted-foreground">
                  Historical market events
                </div>
              </div>
              
              <div className="trust-indicator p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Zap" size={16} className="text-warning" />
                  <span className="text-sm font-medium text-primary">Trade Ideas</span>
                </div>
                <div className="text-2xl font-heading font-heading-bold text-foreground">
                  Daily
                </div>
                <div className="text-xs text-muted-foreground">
                  AI-generated setups
                </div>
              </div>
              
              <div className="trust-indicator p-4 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Users" size={16} className="text-secondary" />
                  <span className="text-sm font-medium text-primary">Active Users</span>
                </div>
                <div className="text-2xl font-heading font-heading-bold text-foreground">
                  12.5K
                </div>
                <div className="text-xs text-muted-foreground">
                  Learning together
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-primary hover:border-muted'
                    }`}
                  >
                    <Icon name={tab?.icon} size={18} strokeWidth={2} />
                    <span>{tab?.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Active Component */}
          <div className="space-y-6">
            {renderActiveComponent()}
          </div>

          {/* Educational Footer */}
          <div className="mt-12 bg-primary/5 border border-primary/20 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <Icon name="GraduationCap" size={24} className="text-primary mt-1" />
              <div>
                <h3 className="text-lg font-heading font-heading-semibold text-primary mb-2">
                  Master Market Analysis Through Practice
                </h3>
                <p className="text-muted-foreground mb-4">
                  The Market Analysis Lab combines real-time data with educational insights to help you develop professional-level market analysis skills. Each tool is designed to teach while you explore, ensuring you understand not just what's happening, but why it matters for trading decisions.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                    <div>
                      <strong>Real-Time Learning:</strong> Live market data with educational context and explanations
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                    <div>
                      <strong>Historical Perspective:</strong> Learn from major market events and their lessons
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
                    <div>
                      <strong>Practical Application:</strong> Immediately practice concepts in the trading simulator
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MarketAnalysisLab;