import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Home', path: '/homepage-trading-education-platform', icon: 'Home' },
    { name: 'Simulator', path: '/trading-simulator-platform', icon: 'TrendingUp' },
    { name: 'Courses', path: '/course-library-interactive-learning', icon: 'BookOpen' },
    { name: 'Community', path: '/community-hub-social-learning', icon: 'Users' },
    { name: 'Dashboard', path: '/personal-progress-dashboard', icon: 'BarChart3' }
  ];

  const secondaryItems = [
    { name: 'Market Lab', path: '/market-analysis-lab-real-time-education', icon: 'LineChart' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md brand-shadow' : 'bg-white'
    }`}>
      <div className="w-full">
        <div className="flex items-center justify-between h-16 px-4 lg:px-6">
          {/* Logo */}
          <Link 
            to="/homepage-trading-education-platform" 
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-200"
            onClick={closeMobileMenu}
          >
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-trust rounded-lg flex items-center justify-center">
                <Icon name="TrendingUp" size={24} color="white" strokeWidth={2.5} />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="GraduationCap" size={10} color="white" strokeWidth={3} />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-heading-bold text-lg text-primary leading-tight">
                TradeMaster
              </span>
              <span className="font-heading font-heading-normal text-xs text-secondary leading-tight">
                Academy
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-interactive'
                    : 'text-muted-foreground hover:text-primary hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} strokeWidth={2} />
                <span>{item?.name}</span>
              </Link>
            ))}
            
            {/* More Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted transition-all duration-200">
                <Icon name="MoreHorizontal" size={18} strokeWidth={2} />
                <span>More</span>
              </button>
              
              {/* Dropdown */}
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg brand-shadow border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                <div className="py-2">
                  {secondaryItems?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      className={`flex items-center space-x-3 px-4 py-2 text-sm transition-colors duration-200 ${
                        isActivePath(item?.path)
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-primary hover:bg-muted'
                      }`}
                    >
                      <Icon name={item?.icon} size={16} strokeWidth={2} />
                      <span>{item?.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              <Icon name="LogIn" size={16} className="mr-2" />
              Sign In
            </Button>
            <Button variant="default" size="sm" className="conversion-pulse">
              <Icon name="Rocket" size={16} className="mr-2" />
              Start Learning
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-colors duration-200"
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} strokeWidth={2} />
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 ease-brand ${
          isMobileMenuOpen 
            ? 'max-h-screen opacity-100 visible' :'max-h-0 opacity-0 invisible overflow-hidden'
        }`}>
          <div className="px-4 py-4 bg-white border-t">
            <nav className="space-y-2">
              {[...navigationItems, ...secondaryItems]?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground shadow-interactive'
                      : 'text-muted-foreground hover:text-primary hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} strokeWidth={2} />
                  <span>{item?.name}</span>
                </Link>
              ))}
            </nav>
            
            {/* Mobile CTA Buttons */}
            <div className="mt-6 space-y-3">
              <Button variant="outline" fullWidth onClick={closeMobileMenu}>
                <Icon name="LogIn" size={16} className="mr-2" />
                Sign In
              </Button>
              <Button variant="default" fullWidth onClick={closeMobileMenu} className="conversion-pulse">
                <Icon name="Rocket" size={16} className="mr-2" />
                Start Learning
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;