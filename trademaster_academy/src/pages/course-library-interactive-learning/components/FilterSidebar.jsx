import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ filters, onFilterChange, onClearFilters, isCollapsed, onToggle }) => {
  const categories = [
    { id: 'basics', name: 'Trading Basics', icon: 'BookOpen', count: 45 },
    { id: 'technical', name: 'Technical Analysis', icon: 'TrendingUp', count: 38 },
    { id: 'fundamental', name: 'Fundamental Analysis', icon: 'BarChart3', count: 22 },
    { id: 'psychology', name: 'Trading Psychology', icon: 'Brain', count: 18 },
    { id: 'risk', name: 'Risk Management', icon: 'Shield', count: 25 },
    { id: 'strategies', name: 'Trading Strategies', icon: 'Target', count: 32 },
    { id: 'crypto', name: 'Cryptocurrency', icon: 'Bitcoin', count: 28 },
    { id: 'forex', name: 'Forex Trading', icon: 'DollarSign', count: 35 }
  ];

  const levels = [
    { id: 'beginner', name: 'Beginner', count: 89 },
    { id: 'intermediate', name: 'Intermediate', count: 67 },
    { id: 'advanced', name: 'Advanced', count: 34 }
  ];

  const durations = [
    { id: 'short', name: 'Under 1 hour', count: 45 },
    { id: 'medium', name: '1-3 hours', count: 78 },
    { id: 'long', name: '3+ hours', count: 67 }
  ];

  const formats = [
    { id: 'video', name: 'Video Lessons', icon: 'Video', count: 156 },
    { id: 'interactive', name: 'Interactive', icon: 'MousePointer', count: 89 },
    { id: 'text', name: 'Text-based', icon: 'FileText', count: 34 },
    { id: 'quiz', name: 'Quiz & Tests', icon: 'HelpCircle', count: 67 }
  ];

  const handleCategoryChange = (categoryId, checked) => {
    const newCategories = checked 
      ? [...filters?.categories, categoryId]
      : filters?.categories?.filter(id => id !== categoryId);
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handleLevelChange = (levelId, checked) => {
    const newLevels = checked 
      ? [...filters?.levels, levelId]
      : filters?.levels?.filter(id => id !== levelId);
    onFilterChange({ ...filters, levels: newLevels });
  };

  const handleDurationChange = (durationId, checked) => {
    const newDurations = checked 
      ? [...filters?.durations, durationId]
      : filters?.durations?.filter(id => id !== durationId);
    onFilterChange({ ...filters, durations: newDurations });
  };

  const handleFormatChange = (formatId, checked) => {
    const newFormats = checked 
      ? [...filters?.formats, formatId]
      : filters?.formats?.filter(id => id !== formatId);
    onFilterChange({ ...filters, formats: newFormats });
  };

  const getActiveFiltersCount = () => {
    return filters?.categories?.length + filters?.levels?.length + 
           filters?.durations?.length + filters?.formats?.length;
  };

  return (
    <div className={`bg-card border-r transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-80'
    }`}>
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div>
              <h2 className="font-heading font-heading-semibold text-lg text-foreground">
                Filters
              </h2>
              <p className="text-sm text-muted-foreground">
                Refine your course search
              </p>
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
          >
            <Icon 
              name={isCollapsed ? "PanelLeftOpen" : "PanelLeftClose"} 
              size={20} 
              className="text-muted-foreground"
            />
          </button>
        </div>
      </div>
      {!isCollapsed && (
        <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-200px)]">
          {/* Active Filters Summary */}
          {getActiveFiltersCount() > 0 && (
            <div className="trust-indicator p-3 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-primary">
                  Active Filters ({getActiveFiltersCount()})
                </span>
                <Button
                  variant="ghost"
                  size="xs"
                  onClick={onClearFilters}
                >
                  Clear All
                </Button>
              </div>
            </div>
          )}

          {/* Categories */}
          <div>
            <h3 className="font-heading font-heading-semibold text-sm text-foreground mb-3 flex items-center">
              <Icon name="Grid3X3" size={16} className="mr-2 text-primary" />
              Categories
            </h3>
            <div className="space-y-2">
              {categories?.map((category) => (
                <div key={category?.id} className="flex items-center justify-between">
                  <Checkbox
                    label={
                      <div className="flex items-center space-x-2">
                        <Icon name={category?.icon} size={14} className="text-muted-foreground" />
                        <span className="text-sm">{category?.name}</span>
                      </div>
                    }
                    checked={filters?.categories?.includes(category?.id)}
                    onChange={(e) => handleCategoryChange(category?.id, e?.target?.checked)}
                  />
                  <span className="text-xs text-muted-foreground">
                    {category?.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Level */}
          <div>
            <h3 className="font-heading font-heading-semibold text-sm text-foreground mb-3 flex items-center">
              <Icon name="BarChart3" size={16} className="mr-2 text-primary" />
              Skill Level
            </h3>
            <div className="space-y-2">
              {levels?.map((level) => (
                <div key={level?.id} className="flex items-center justify-between">
                  <Checkbox
                    label={level?.name}
                    checked={filters?.levels?.includes(level?.id)}
                    onChange={(e) => handleLevelChange(level?.id, e?.target?.checked)}
                  />
                  <span className="text-xs text-muted-foreground">
                    {level?.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div>
            <h3 className="font-heading font-heading-semibold text-sm text-foreground mb-3 flex items-center">
              <Icon name="Clock" size={16} className="mr-2 text-primary" />
              Duration
            </h3>
            <div className="space-y-2">
              {durations?.map((duration) => (
                <div key={duration?.id} className="flex items-center justify-between">
                  <Checkbox
                    label={duration?.name}
                    checked={filters?.durations?.includes(duration?.id)}
                    onChange={(e) => handleDurationChange(duration?.id, e?.target?.checked)}
                  />
                  <span className="text-xs text-muted-foreground">
                    {duration?.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Format */}
          <div>
            <h3 className="font-heading font-heading-semibold text-sm text-foreground mb-3 flex items-center">
              <Icon name="Layout" size={16} className="mr-2 text-primary" />
              Format
            </h3>
            <div className="space-y-2">
              {formats?.map((format) => (
                <div key={format?.id} className="flex items-center justify-between">
                  <Checkbox
                    label={
                      <div className="flex items-center space-x-2">
                        <Icon name={format?.icon} size={14} className="text-muted-foreground" />
                        <span className="text-sm">{format?.name}</span>
                      </div>
                    }
                    checked={filters?.formats?.includes(format?.id)}
                    onChange={(e) => handleFormatChange(format?.id, e?.target?.checked)}
                  />
                  <span className="text-xs text-muted-foreground">
                    {format?.count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Premium Filter */}
          <div>
            <h3 className="font-heading font-heading-semibold text-sm text-foreground mb-3 flex items-center">
              <Icon name="Crown" size={16} className="mr-2 text-accent" />
              Access
            </h3>
            <div className="space-y-2">
              <Checkbox
                label="Free Courses Only"
                checked={filters?.freeOnly}
                onChange={(e) => onFilterChange({ ...filters, freeOnly: e?.target?.checked })}
              />
              <Checkbox
                label="Premium Courses"
                checked={filters?.premiumOnly}
                onChange={(e) => onFilterChange({ ...filters, premiumOnly: e?.target?.checked })}
              />
            </div>
          </div>
        </div>
      )}
      {/* Collapsed State */}
      {isCollapsed && (
        <div className="p-2 space-y-2">
          <div className="relative group">
            <button className="w-full p-2 rounded-lg hover:bg-muted transition-colors duration-200">
              <Icon name="Filter" size={20} className="text-muted-foreground" />
            </button>
            <div className="absolute left-full ml-2 px-2 py-1 bg-trust text-trust-foreground text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
              Filters ({getActiveFiltersCount()})
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;