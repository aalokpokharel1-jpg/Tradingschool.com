import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CommunityHeader = ({ activeTab, onTabChange, onCreatePost }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'all', name: 'All Discussions', icon: 'MessageSquare', count: 1247 },
    { id: 'beginner', name: 'Beginner', icon: 'GraduationCap', count: 423 },
    { id: 'intermediate', name: 'Intermediate', icon: 'TrendingUp', count: 512 },
    { id: 'advanced', name: 'Advanced', icon: 'Target', count: 312 },
    { id: 'mentorship', name: 'Mentorship', icon: 'Users', count: 89 },
    { id: 'live', name: 'Live Sessions', icon: 'Video', count: 12 }
  ];

  const handleSearch = (e) => {
    e?.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="bg-white border-b sticky top-16 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-growth rounded-xl flex items-center justify-center">
                <Icon name="Users" size={24} color="white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-heading-bold text-primary">
                  Community Hub
                </h1>
                <p className="text-muted-foreground">
                  Connect, learn, and grow with fellow traders
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <form onSubmit={handleSearch} className="relative">
                <Icon 
                  name="Search" 
                  size={20} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="text"
                  placeholder="Search discussions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e?.target?.value)}
                  className="pl-10 pr-4 py-2 w-full sm:w-80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </form>
              <Button 
                variant="default" 
                onClick={onCreatePost}
                iconName="Plus"
                iconPosition="left"
              >
                New Post
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex overflow-x-auto scrollbar-hide">
          <nav className="flex space-x-1 min-w-max">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => onTabChange(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-t-lg text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  activeTab === tab?.id
                    ? 'bg-primary text-primary-foreground border-b-2 border-primary'
                    : 'text-muted-foreground hover:text-primary hover:bg-muted'
                }`}
              >
                <Icon name={tab?.icon} size={16} strokeWidth={2} />
                <span>{tab?.name}</span>
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab?.id
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {tab?.count}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default CommunityHeader;