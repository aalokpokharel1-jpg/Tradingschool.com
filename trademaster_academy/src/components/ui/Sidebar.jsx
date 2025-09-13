import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('main');
  const location = useLocation();

  const mainNavigation = [
    { 
      name: 'Home', 
      path: '/homepage-trading-education-platform', 
      icon: 'Home',
      description: 'Dashboard overview'
    },
    { 
      name: 'Trading Simulator', 
      path: '/trading-simulator-platform', 
      icon: 'TrendingUp',
      description: 'Practice trading'
    },
    { 
      name: 'Course Library', 
      path: '/course-library-interactive-learning', 
      icon: 'BookOpen',
      description: 'Interactive lessons'
    },
    { 
      name: 'Community Hub', 
      path: '/community-hub-social-learning', 
      icon: 'Users',
      description: 'Connect & learn'
    },
    { 
      name: 'Progress Dashboard', 
      path: '/personal-progress-dashboard', 
      icon: 'BarChart3',
      description: 'Track achievements'
    }
  ];

  const advancedNavigation = [
    { 
      name: 'Market Analysis Lab', 
      path: '/market-analysis-lab-real-time-education', 
      icon: 'LineChart',
      description: 'Real-time education'
    }
  ];

  const quickActions = [
    { name: 'Start Quiz', icon: 'Brain', action: 'quiz' },
    { name: 'Join Live Session', icon: 'Video', action: 'live' },
    { name: 'View Achievements', icon: 'Award', action: 'achievements' }
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  const handleQuickAction = (action) => {
    console.log(`Quick action: ${action}`);
    // Implement quick action handlers
  };

  const toggleMobile = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleMobile}
        className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-white rounded-lg brand-shadow"
      >
        <Icon name="PanelLeft" size={20} />
      </button>
      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r z-40
        transition-all duration-300 ease-brand brand-shadow-lg
        ${isCollapsed ? 'w-16' : 'w-64'}
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              {!isCollapsed && (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-growth rounded-lg flex items-center justify-center">
                    <Icon name="GraduationCap" size={16} color="white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="font-heading font-heading-semibold text-sm text-primary">
                      Learning Hub
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Your progress center
                    </p>
                  </div>
                </div>
              )}
              
              {onToggle && (
                <button
                  onClick={onToggle}
                  className="hidden lg:flex p-1.5 rounded-md hover:bg-muted transition-colors duration-200"
                >
                  <Icon 
                    name={isCollapsed ? "PanelLeftOpen" : "PanelLeftClose"} 
                    size={16} 
                    className="text-muted-foreground"
                  />
                </button>
              )}
            </div>
          </div>

          {/* Navigation Sections */}
          <div className="flex-1 overflow-y-auto py-4">
            {/* Main Navigation */}
            <div className="px-3 mb-6">
              {!isCollapsed && (
                <h4 className="px-3 mb-3 text-xs font-heading font-heading-semibold text-muted-foreground uppercase tracking-wider">
                  Main Navigation
                </h4>
              )}
              <nav className="space-y-1">
                {mainNavigation?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    className={`
                      flex items-center px-3 py-2.5 rounded-lg text-sm font-medium
                      transition-all duration-200 group relative
                      ${isActivePath(item?.path)
                        ? 'bg-primary text-primary-foreground shadow-interactive'
                        : 'text-muted-foreground hover:text-primary hover:bg-muted'
                      }
                    `}
                    title={isCollapsed ? item?.name : ''}
                  >
                    <Icon 
                      name={item?.icon} 
                      size={20} 
                      strokeWidth={2}
                      className={isActivePath(item?.path) ? 'text-primary-foreground' : ''}
                    />
                    {!isCollapsed && (
                      <div className="ml-3 flex-1">
                        <div className="font-medium">{item?.name}</div>
                        <div className={`text-xs ${
                          isActivePath(item?.path) 
                            ? 'text-primary-foreground/80' 
                            : 'text-muted-foreground'
                        }`}>
                          {item?.description}
                        </div>
                      </div>
                    )}
                    
                    {/* Tooltip for collapsed state */}
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-trust text-trust-foreground text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                        {item?.name}
                      </div>
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Advanced Tools */}
            <div className="px-3 mb-6">
              {!isCollapsed && (
                <h4 className="px-3 mb-3 text-xs font-heading font-heading-semibold text-muted-foreground uppercase tracking-wider">
                  Advanced Tools
                </h4>
              )}
              <nav className="space-y-1">
                {advancedNavigation?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    className={`
                      flex items-center px-3 py-2.5 rounded-lg text-sm font-medium
                      transition-all duration-200 group relative
                      ${isActivePath(item?.path)
                        ? 'bg-secondary text-secondary-foreground shadow-interactive'
                        : 'text-muted-foreground hover:text-secondary hover:bg-muted'
                      }
                    `}
                    title={isCollapsed ? item?.name : ''}
                  >
                    <Icon 
                      name={item?.icon} 
                      size={20} 
                      strokeWidth={2}
                      className={isActivePath(item?.path) ? 'text-secondary-foreground' : ''}
                    />
                    {!isCollapsed && (
                      <div className="ml-3 flex-1">
                        <div className="font-medium">{item?.name}</div>
                        <div className={`text-xs ${
                          isActivePath(item?.path) 
                            ? 'text-secondary-foreground/80' 
                            : 'text-muted-foreground'
                        }`}>
                          {item?.description}
                        </div>
                      </div>
                    )}
                    
                    {/* Tooltip for collapsed state */}
                    {isCollapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-trust text-trust-foreground text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                        {item?.name}
                      </div>
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Quick Actions */}
            {!isCollapsed && (
              <div className="px-3">
                <h4 className="px-3 mb-3 text-xs font-heading font-heading-semibold text-muted-foreground uppercase tracking-wider">
                  Quick Actions
                </h4>
                <div className="space-y-2">
                  {quickActions?.map((action) => (
                    <button
                      key={action?.action}
                      onClick={() => handleQuickAction(action?.action)}
                      className="w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-accent hover:bg-muted transition-all duration-200"
                    >
                      <Icon name={action?.icon} size={18} strokeWidth={2} />
                      <span className="ml-3">{action?.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t">
            {!isCollapsed ? (
              <div className="space-y-3">
                <div className="trust-indicator p-3 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Trophy" size={16} className="text-success" />
                    <span className="text-sm font-heading font-heading-semibold text-primary">
                      Progress Streak
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">
                    7 days learning streak!
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-gradient-growth h-2 rounded-full progress-fill" style={{width: '70%'}}></div>
                  </div>
                </div>
                
                <Button variant="outline" size="sm" fullWidth>
                  <Icon name="Settings" size={16} className="mr-2" />
                  Settings
                </Button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2">
                <button className="p-2 rounded-lg hover:bg-muted transition-colors duration-200 group relative">
                  <Icon name="Trophy" size={20} className="text-success" />
                  <div className="absolute left-full ml-2 px-2 py-1 bg-trust text-trust-foreground text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                    Progress Streak
                  </div>
                </button>
                <button className="p-2 rounded-lg hover:bg-muted transition-colors duration-200 group relative">
                  <Icon name="Settings" size={20} className="text-muted-foreground" />
                  <div className="absolute left-full ml-2 px-2 py-1 bg-trust text-trust-foreground text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
                    Settings
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;