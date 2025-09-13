import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SearchHeader = ({ 
  searchQuery, 
  onSearchChange, 
  sortBy, 
  onSortChange, 
  viewMode, 
  onViewModeChange,
  totalCourses,
  filteredCourses 
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant', icon: 'Target' },
    { value: 'rating', label: 'Highest Rated', icon: 'Star' },
    { value: 'popular', label: 'Most Popular', icon: 'TrendingUp' },
    { value: 'newest', label: 'Newest First', icon: 'Clock' },
    { value: 'duration', label: 'Shortest First', icon: 'Timer' },
    { value: 'alphabetical', label: 'A to Z', icon: 'ArrowUpAZ' }
  ];

  const viewModes = [
    { value: 'grid', icon: 'Grid3X3', tooltip: 'Grid View' },
    { value: 'list', icon: 'List', tooltip: 'List View' }
  ];

  const popularSearches = [
    'Technical Analysis',
    'Risk Management',
    'Forex Trading',
    'Cryptocurrency',
    'Options Trading',
    'Day Trading'
  ];

  return (
    <div className="bg-card border-b">
      <div className="p-6">
        {/* Main Search Section */}
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <div className="relative">
                <Icon 
                  name="Search" 
                  size={20} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                />
                <Input
                  type="search"
                  placeholder="Search courses, topics, or instructors..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e?.target?.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                  className="pl-10 pr-4 py-3 text-base"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <Icon name="X" size={16} />
                  </button>
                )}
              </div>

              {/* Search Suggestions */}
              {isSearchFocused && !searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-lg brand-shadow z-50">
                  <div className="p-4">
                    <h4 className="text-sm font-medium text-foreground mb-3">Popular Searches</h4>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches?.map((search) => (
                        <button
                          key={search}
                          onClick={() => onSearchChange(search)}
                          className="px-3 py-1.5 bg-muted hover:bg-primary hover:text-primary-foreground rounded-full text-sm transition-colors duration-200"
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Advanced Search Button */}
            <Button variant="outline">
              <Icon name="SlidersHorizontal" size={16} className="mr-2" />
              Advanced
            </Button>
          </div>
        </div>

        {/* Results and Controls */}
        <div className="flex items-center justify-between">
          {/* Results Count */}
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-sm text-muted-foreground">
                Showing <span className="font-medium text-foreground">{filteredCourses}</span> of{' '}
                <span className="font-medium text-foreground">{totalCourses}</span> courses
              </p>
            </div>
            
            {searchQuery && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">for</span>
                <div className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium">
                  "{searchQuery}"
                </div>
                <button
                  onClick={() => onSearchChange('')}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Icon name="X" size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Sort and View Controls */}
          <div className="flex items-center space-x-4">
            {/* Sort Dropdown */}
            <div className="relative group">
              <Button variant="outline" size="sm">
                <Icon name="ArrowUpDown" size={16} className="mr-2" />
                Sort by: {sortOptions?.find(opt => opt?.value === sortBy)?.label}
                <Icon name="ChevronDown" size={16} className="ml-2" />
              </Button>
              
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border rounded-lg brand-shadow opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-40">
                <div className="py-2">
                  {sortOptions?.map((option) => (
                    <button
                      key={option?.value}
                      onClick={() => onSortChange(option?.value)}
                      className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-muted transition-colors duration-200 ${
                        sortBy === option?.value ? 'bg-primary text-primary-foreground' : 'text-foreground'
                      }`}
                    >
                      <Icon name={option?.icon} size={16} />
                      <span>{option?.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-muted rounded-lg p-1">
              {viewModes?.map((mode) => (
                <button
                  key={mode?.value}
                  onClick={() => onViewModeChange(mode?.value)}
                  className={`p-2 rounded transition-all duration-200 relative group ${
                    viewMode === mode?.value 
                      ? 'bg-white text-primary shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  title={mode?.tooltip}
                >
                  <Icon name={mode?.icon} size={16} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;