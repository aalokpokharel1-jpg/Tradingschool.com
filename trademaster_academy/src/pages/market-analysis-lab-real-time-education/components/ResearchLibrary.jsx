import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ResearchLibrary = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const categories = [
    { id: 'all', name: 'All Research', icon: 'FileText' },
    { id: 'fundamental', name: 'Fundamental Analysis', icon: 'BarChart3' },
    { id: 'technical', name: 'Technical Analysis', icon: 'TrendingUp' },
    { id: 'market-reports', name: 'Market Reports', icon: 'Newspaper' },
    { id: 'earnings', name: 'Earnings Analysis', icon: 'DollarSign' },
    { id: 'sector', name: 'Sector Rotation', icon: 'PieChart' }
  ];

  const sortOptions = [
    { id: 'newest', name: 'Newest First' },
    { id: 'oldest', name: 'Oldest First' },
    { id: 'popular', name: 'Most Popular' },
    { id: 'rating', name: 'Highest Rated' }
  ];

  const researchItems = [
    {
      id: 1,
      title: "Federal Reserve Policy Impact on Currency Markets",
      category: "fundamental",
      type: "Research Report",
      author: "Dr. Sarah Mitchell",
      publishDate: "2025-01-08",
      readTime: "12 min",
      rating: 4.8,
      downloads: 2847,
      tags: ["Fed Policy", "USD", "Interest Rates", "Central Banking"],
      summary: "Comprehensive analysis of how Federal Reserve policy decisions impact major currency pairs, with historical data and forward-looking scenarios.",
      keyInsights: [
        "Rate hikes typically strengthen USD in the short term",
        "Forward guidance often more impactful than actual rate changes",
        "Market positioning amplifies policy impact"
      ],
      difficulty: "Intermediate",
      isPremium: false
    },
    {
      id: 2,
      title: "Technical Analysis: Support and Resistance Mastery",
      category: "technical",
      type: "Educational Guide",
      author: "Mark Thompson, CFA",
      publishDate: "2025-01-05",
      readTime: "18 min",
      rating: 4.9,
      downloads: 3521,
      tags: ["Support", "Resistance", "Price Action", "Chart Patterns"],
      summary: "Complete guide to identifying and trading support and resistance levels across different timeframes and market conditions.",
      keyInsights: [
        "Confluence of multiple timeframes increases reliability",
        "Volume confirmation essential for breakouts",
        "Psychological levels often act as strong S/R"
      ],
      difficulty: "Beginner",
      isPremium: false
    },
    {
      id: 3,
      title: "Q4 2024 Earnings Season: Technology Sector Deep Dive",
      category: "earnings",
      type: "Sector Analysis",
      author: "TradeMaster Research Team",
      publishDate: "2025-01-03",
      readTime: "25 min",
      rating: 4.7,
      downloads: 1892,
      tags: ["Earnings", "Technology", "FAANG", "Growth Stocks"],
      summary: "Detailed analysis of Q4 2024 technology earnings with implications for sector rotation and individual stock opportunities.",
      keyInsights: [
        "AI spending driving cloud revenue growth",
        "Margin pressure from increased competition",
        "Guidance more important than historical results"
      ],
      difficulty: "Advanced",
      isPremium: true
    },
    {
      id: 4,
      title: "Global Market Outlook: Navigating 2025 Uncertainties",
      category: "market-reports",
      type: "Market Outlook",
      author: "Global Research Division",
      publishDate: "2024-12-28",
      readTime: "30 min",
      rating: 4.6,
      downloads: 4156,
      tags: ["Market Outlook", "Global Economy", "Risk Assessment", "2025"],
      summary: "Comprehensive outlook for 2025 covering major themes, risks, and opportunities across asset classes and regions.",
      keyInsights: [
        "Central bank policy divergence creating opportunities",
        "Geopolitical risks remain elevated",
        "Emerging markets showing relative strength"
      ],
      difficulty: "Intermediate",
      isPremium: false
    },
    {
      id: 5,
      title: "Sector Rotation Strategies: From Defense to Growth",
      category: "sector",
      type: "Strategy Guide",
      author: "Portfolio Strategy Team",
      publishDate: "2024-12-20",
      readTime: "15 min",
      rating: 4.5,
      downloads: 2234,
      tags: ["Sector Rotation", "Portfolio Strategy", "Economic Cycles", "Asset Allocation"],
      summary: "Guide to identifying and capitalizing on sector rotation patterns throughout different economic cycles and market conditions.",
      keyInsights: [
        "Economic indicators predict sector performance",
        "Timing sector rotation requires patience",
        "Diversification remains key to risk management"
      ],
      difficulty: "Intermediate",
      isPremium: true
    },
    {
      id: 6,
      title: "Cryptocurrency Market Analysis: Institutional Adoption Trends",
      category: "fundamental",
      type: "Market Analysis",
      author: "Digital Assets Team",
      publishDate: "2024-12-15",
      readTime: "20 min",
      rating: 4.4,
      downloads: 1567,
      tags: ["Cryptocurrency", "Bitcoin", "Institutional", "Digital Assets"],
      summary: "Analysis of institutional cryptocurrency adoption trends and their impact on traditional financial markets and trading strategies.",
      keyInsights: [
        "ETF approvals driving institutional interest",
        "Correlation with traditional assets increasing",
        "Regulatory clarity improving market structure"
      ],
      difficulty: "Advanced",
      isPremium: true
    }
  ];

  const filteredItems = researchItems?.filter(item => selectedCategory === 'all' || item?.category === selectedCategory)?.filter(item => 
      searchQuery === '' || 
      item?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      item?.tags?.some(tag => tag?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
    )?.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.publishDate) - new Date(a.publishDate);
        case 'oldest':
          return new Date(a.publishDate) - new Date(b.publishDate);
        case 'popular':
          return b?.downloads - a?.downloads;
        case 'rating':
          return b?.rating - a?.rating;
        default:
          return 0;
      }
    });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-success bg-success/10';
      case 'Intermediate': return 'text-warning bg-warning/10';
      case 'Advanced': return 'text-destructive bg-destructive/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg brand-shadow">
      {/* Header */}
      <div className="p-6 border-b">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-trust rounded-lg flex items-center justify-center">
              <Icon name="Library" size={20} color="white" strokeWidth={2.5} />
            </div>
            <div>
              <h2 className="text-xl font-heading font-heading-bold text-primary">
                Research Library
              </h2>
              <p className="text-sm text-muted-foreground">
                Professional market research and educational resources
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search research..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e?.target?.value)}
                className="pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-64"
              />
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e?.target?.value)}
              className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              {sortOptions?.map((option) => (
                <option key={option?.id} value={option?.id}>
                  {option?.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setSelectedCategory(category?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors duration-200 ${
                selectedCategory === category?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name={category?.icon} size={16} />
              <span>{category?.name}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Research Items */}
      <div className="p-6">
        <div className="space-y-6">
          {filteredItems?.map((item) => (
            <div key={item?.id} className="border border-border rounded-lg p-6 hover:bg-muted/30 transition-colors duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-heading font-heading-bold text-foreground">
                      {item?.title}
                    </h3>
                    {item?.isPremium && (
                      <div className="flex items-center space-x-1 px-2 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                        <Icon name="Crown" size={12} />
                        <span>Premium</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                    <span>{item?.type}</span>
                    <span>•</span>
                    <span>By {item?.author}</span>
                    <span>•</span>
                    <span>{formatDate(item?.publishDate)}</span>
                    <span>•</span>
                    <span>{item?.readTime} read</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {item?.summary}
                  </p>
                </div>
                
                <div className="flex flex-col items-end space-y-2 ml-6">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(item?.difficulty)}`}>
                    {item?.difficulty}
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Icon name="Star" size={14} className="text-warning fill-current" />
                    <span>{item?.rating}</span>
                  </div>
                </div>
              </div>

              {/* Key Insights */}
              <div className="mb-4">
                <h4 className="text-sm font-heading font-heading-semibold text-primary mb-2">
                  Key Insights
                </h4>
                <div className="space-y-1">
                  {item?.keyInsights?.map((insight, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <Icon name="ArrowRight" size={14} className="text-primary mt-0.5" />
                      <span className="text-sm text-muted-foreground">{insight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {item?.tags?.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Download" size={14} />
                    <span>{item?.downloads?.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Eye" size={14} />
                    <span>View</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors duration-200">
                    <Icon name="BookOpen" size={16} />
                    <span>Read</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200">
                    <Icon name="Download" size={16} />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems?.length === 0 && (
          <div className="text-center py-12">
            <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-heading font-heading-semibold text-muted-foreground mb-2">
              No Research Found
            </h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search terms or category filters.
            </p>
          </div>
        )}
      </div>
      {/* Footer */}
      <div className="p-6 border-t bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-sm text-muted-foreground">
              Showing {filteredItems?.length} of {researchItems?.length} research items
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors duration-200">
              <Icon name="Bell" size={16} />
              <span>Get Alerts</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors duration-200">
              <Icon name="Plus" size={16} />
              <span>Request Research</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResearchLibrary;