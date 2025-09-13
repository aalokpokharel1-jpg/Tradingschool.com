import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickAccessTools = ({ onToolSelect }) => {
  const [activeCategory, setActiveCategory] = useState('calculators');

  const toolCategories = {
    calculators: {
      name: 'Calculators',
      icon: 'Calculator',
      tools: [
        {
          id: 'position-size',
          name: 'Position Size Calculator',
          description: 'Calculate optimal position sizes based on risk tolerance',
          icon: 'Target',
          color: 'text-primary'
        },
        {
          id: 'risk-reward',
          name: 'Risk/Reward Ratio',
          description: 'Analyze potential profit vs risk for trades',
          icon: 'Scale',
          color: 'text-secondary'
        },
        {
          id: 'pip-calculator',
          name: 'Pip Value Calculator',
          description: 'Calculate pip values for different currency pairs',
          icon: 'DollarSign',
          color: 'text-accent'
        },
        {
          id: 'compound-interest',
          name: 'Compound Interest',
          description: 'Project account growth with compound returns',
          icon: 'TrendingUp',
          color: 'text-success'
        }
      ]
    },
    calendar: {
      name: 'Economic Calendar',
      icon: 'Calendar',
      tools: [
        {
          id: 'economic-events',
          name: 'Economic Events',
          description: 'Track important economic announcements',
          icon: 'Calendar',
          color: 'text-primary'
        },
        {
          id: 'earnings-calendar',
          name: 'Earnings Calendar',
          description: 'Monitor company earnings releases',
          icon: 'Building2',
          color: 'text-secondary'
        },
        {
          id: 'market-hours',
          name: 'Market Hours',
          description: 'Global market opening and closing times',
          icon: 'Clock',
          color: 'text-accent'
        }
      ]
    },
    glossary: {
      name: 'Learning Resources',
      icon: 'BookOpen',
      tools: [
        {
          id: 'trading-glossary',
          name: 'Trading Glossary',
          description: 'Comprehensive dictionary of trading terms',
          icon: 'Book',
          color: 'text-primary'
        },
        {
          id: 'pattern-library',
          name: 'Chart Patterns',
          description: 'Visual guide to common chart patterns',
          icon: 'BarChart3',
          color: 'text-secondary'
        },
        {
          id: 'strategy-guide',
          name: 'Strategy Guide',
          description: 'Collection of proven trading strategies',
          icon: 'Map',
          color: 'text-accent'
        },
        {
          id: 'market-analysis',
          name: 'Market Analysis',
          description: 'Daily market insights and analysis',
          icon: 'LineChart',
          color: 'text-success'
        }
      ]
    }
  };

  const handleToolClick = (tool) => {
    onToolSelect(tool);
  };

  return (
    <div className="bg-card rounded-lg brand-shadow">
      <div className="p-6 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-growth rounded-lg flex items-center justify-center">
            <Icon name="Wrench" size={20} color="white" strokeWidth={2.5} />
          </div>
          <div>
            <h2 className="font-heading font-heading-semibold text-lg text-foreground">
              Learning Lab
            </h2>
            <p className="text-sm text-muted-foreground">
              Essential tools for your trading education
            </p>
          </div>
        </div>
      </div>
      <div className="p-6">
        {/* Category Tabs */}
        <div className="flex space-x-1 mb-6 bg-muted rounded-lg p-1">
          {Object.entries(toolCategories)?.map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 px-3 rounded transition-all duration-200 ${
                activeCategory === key
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={category?.icon} size={16} />
              <span className="text-sm font-medium hidden sm:inline">{category?.name}</span>
            </button>
          ))}
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {toolCategories?.[activeCategory]?.tools?.map((tool) => (
            <div
              key={tool?.id}
              className="p-4 border rounded-lg hover:border-primary/50 transition-all duration-200 cursor-pointer group"
              onClick={() => handleToolClick(tool)}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors duration-200`}>
                  <Icon name={tool?.icon} size={20} className={`${tool?.color} group-hover:text-primary`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground mb-1 group-hover:text-primary transition-colors duration-200">
                    {tool?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {tool?.description}
                  </p>
                </div>
                <Icon 
                  name="ArrowRight" 
                  size={16} 
                  className="text-muted-foreground group-hover:text-primary transition-colors duration-200" 
                />
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-6 pt-6 border-t">
          <h3 className="font-medium text-foreground mb-3">Quick Actions</h3>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Icon name="Download" size={14} className="mr-2" />
              Download Guides
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Bookmark" size={14} className="mr-2" />
              Saved Tools
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Share" size={14} className="mr-2" />
              Share Tools
            </Button>
          </div>
        </div>

        {/* Featured Tool */}
        <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/20">
          <div className="flex items-center space-x-3 mb-3">
            <Icon name="Sparkles" size={20} className="text-primary" />
            <h3 className="font-medium text-foreground">Featured Tool</h3>
          </div>
          <h4 className="font-medium text-foreground mb-2">Advanced Risk Calculator</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Calculate complex risk scenarios with multiple positions and correlations.
          </p>
          <Button variant="default" size="sm">
            <Icon name="Rocket" size={14} className="mr-2" />
            Try Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickAccessTools;