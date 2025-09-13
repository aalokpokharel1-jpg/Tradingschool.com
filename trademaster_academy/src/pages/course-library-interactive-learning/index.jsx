import React, { useState, useEffect } from 'react';

import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import CourseCard from './components/CourseCard';
import FilterSidebar from './components/FilterSidebar';
import SearchHeader from './components/SearchHeader';
import CoursePreviewModal from './components/CoursePreviewModal';
import LearningPathCard from './components/LearningPathCard';
import QuickAccessTools from './components/QuickAccessTools';

const CourseLibraryInteractiveLearning = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('courses');
  const [filters, setFilters] = useState({
    categories: [],
    levels: [],
    durations: [],
    formats: [],
    freeOnly: false,
    premiumOnly: false
  });

  // Mock data for courses
  const mockCourses = [
    {
      id: 1,
      title: "Complete Trading Fundamentals for Beginners",
      description: "Master the basics of trading with comprehensive lessons covering market analysis, risk management, and trading psychology. Perfect for absolute beginners.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400",
      category: "Trading Basics",
      categoryIcon: "BookOpen",
      level: "Beginner",
      duration: 180,
      lessons: 24,
      rating: 4.8,
      reviews: 1247,
      students: "12.5k",
      isPremium: false,
      progress: undefined,
      instructor: {
        name: "Sarah Johnson",
        title: "Senior Trading Educator",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150"
      },
      outcomes: [
        "Understand market structure and key participants",
        "Read and analyze price charts effectively",
        "Implement proper risk management techniques",
        "Develop a systematic trading approach",
        "Master trading psychology fundamentals"
      ]
    },
    {
      id: 2,
      title: "Advanced Technical Analysis Mastery",
      description: "Deep dive into advanced chart patterns, indicators, and technical analysis techniques used by professional traders.",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400",
      category: "Technical Analysis",
      categoryIcon: "TrendingUp",
      level: "Advanced",
      duration: 320,
      lessons: 42,
      rating: 4.9,
      reviews: 892,
      students: "8.3k",
      isPremium: true,
      progress: 65,
      instructor: {
        name: "Michael Chen",
        title: "Professional Trader & Analyst",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
      },
      outcomes: [
        "Master complex chart patterns and formations",
        "Use advanced technical indicators effectively",
        "Develop multi-timeframe analysis skills",
        "Create custom trading strategies",
        "Understand market sentiment analysis"
      ]
    },
    {
      id: 3,
      title: "Cryptocurrency Trading Essentials",
      description: "Learn to trade cryptocurrencies safely and profitably with insights into blockchain technology and crypto market dynamics.",
      image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=400",
      category: "Cryptocurrency",
      categoryIcon: "Bitcoin",
      level: "Intermediate",
      duration: 240,
      lessons: 32,
      rating: 4.7,
      reviews: 1156,
      students: "15.2k",
      isPremium: false,
      progress: undefined,
      instructor: {
        name: "Alex Rodriguez",
        title: "Crypto Trading Specialist",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
      },
      outcomes: [
        "Understand blockchain and cryptocurrency fundamentals",
        "Navigate crypto exchanges safely",
        "Analyze crypto market trends and patterns",
        "Implement crypto-specific risk management",
        "Build a diversified crypto portfolio"
      ]
    },
    {
      id: 4,
      title: "Risk Management & Position Sizing",
      description: "Master the art of risk management with proven techniques for position sizing, stop losses, and portfolio protection.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400",
      category: "Risk Management",
      categoryIcon: "Shield",
      level: "Intermediate",
      duration: 150,
      lessons: 18,
      rating: 4.9,
      reviews: 743,
      students: "9.1k",
      isPremium: true,
      progress: 25,
      instructor: {
        name: "Emily Davis",
        title: "Risk Management Expert",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
      },
      outcomes: [
        "Calculate optimal position sizes",
        "Set effective stop losses and take profits",
        "Manage portfolio risk across multiple positions",
        "Understand risk-reward ratios",
        "Develop personal risk management rules"
      ]
    },
    {
      id: 5,
      title: "Forex Trading Strategies",
      description: "Comprehensive guide to forex trading with proven strategies for major, minor, and exotic currency pairs.",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400",
      category: "Forex Trading",
      categoryIcon: "DollarSign",
      level: "Intermediate",
      duration: 280,
      lessons: 36,
      rating: 4.6,
      reviews: 967,
      students: "11.8k",
      isPremium: false,
      progress: undefined,
      instructor: {
        name: "James Wilson",
        title: "Forex Trading Veteran",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
      },
      outcomes: [
        "Understand forex market structure",
        "Trade major and exotic currency pairs",
        "Use fundamental analysis for forex",
        "Implement carry trade strategies",
        "Master forex-specific risk management"
      ]
    },
    {
      id: 6,
      title: "Trading Psychology Mastery",
      description: "Overcome emotional trading barriers and develop the mental discipline required for consistent trading success.",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=400",
      category: "Trading Psychology",
      categoryIcon: "Brain",
      level: "Beginner",
      duration: 120,
      lessons: 16,
      rating: 4.8,
      reviews: 1334,
      students: "18.7k",
      isPremium: false,
      progress: 80,
      instructor: {
        name: "Dr. Lisa Thompson",
        title: "Trading Psychologist",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150"
      },
      outcomes: [
        "Control emotions while trading",
        "Develop trading discipline",
        "Overcome fear and greed",
        "Build confidence in trading decisions",
        "Create sustainable trading habits"
      ]
    }
  ];

  // Mock data for learning paths
  const mockLearningPaths = [
    {
      id: 1,
      title: "Complete Beginner to Trader",
      subtitle: "Zero to Hero Trading Journey",
      description: "A comprehensive learning path that takes you from complete beginner to confident trader with structured lessons and hands-on practice.",
      icon: "Rocket",
      level: "Beginner",
      courses: 8,
      duration: 40,
      students: "25.3k",
      progress: undefined,
      skills: ["Market Analysis", "Risk Management", "Chart Reading", "Trading Psychology", "Position Sizing"],
      prerequisites: ["Basic computer skills", "Willingness to learn"]
    },
    {
      id: 2,
      title: "Advanced Trading Strategies",
      subtitle: "Professional Trading Techniques",
      description: "Master advanced trading strategies used by professional traders and institutional investors.",
      icon: "Target",
      level: "Advanced",
      courses: 12,
      duration: 60,
      students: "8.9k",
      progress: 45,
      skills: ["Advanced TA", "Algorithmic Trading", "Options Strategies", "Portfolio Management"],
      prerequisites: ["Basic trading knowledge", "Understanding of financial markets"]
    },
    {
      id: 3,
      title: "Cryptocurrency Specialist",
      subtitle: "Digital Asset Trading Expert",
      description: "Become a cryptocurrency trading specialist with deep knowledge of blockchain technology and crypto markets.",
      icon: "Bitcoin",
      level: "Intermediate",
      courses: 10,
      duration: 35,
      students: "12.1k",
      progress: undefined,
      skills: ["Blockchain Technology", "DeFi Trading", "NFT Markets", "Crypto Analysis"],
      prerequisites: ["Basic trading concepts", "Interest in technology"]
    }
  ];

  const tabs = [
    { id: 'courses', name: 'All Courses', icon: 'BookOpen', count: mockCourses?.length },
    { id: 'paths', name: 'Learning Paths', icon: 'Map', count: mockLearningPaths?.length },
    { id: 'tools', name: 'Learning Lab', icon: 'Wrench', count: 12 }
  ];

  // Filter courses based on search and filters
  const filteredCourses = mockCourses?.filter(course => {
    const matchesSearch = course?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         course?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         course?.category?.toLowerCase()?.includes(searchQuery?.toLowerCase());

    const matchesCategory = filters?.categories?.length === 0 || 
                           filters?.categories?.some(cat => course?.category?.toLowerCase()?.includes(cat));

    const matchesLevel = filters?.levels?.length === 0 || 
                        filters?.levels?.includes(course?.level?.toLowerCase());

    const matchesDuration = filters?.durations?.length === 0 || 
                           filters?.durations?.some(dur => {
                             if (dur === 'short') return course?.duration < 60;
                             if (dur === 'medium') return course?.duration >= 60 && course?.duration <= 180;
                             if (dur === 'long') return course?.duration > 180;
                             return true;
                           });

    const matchesPremium = (!filters?.freeOnly && !filters?.premiumOnly) ||
                          (filters?.freeOnly && !course?.isPremium) ||
                          (filters?.premiumOnly && course?.isPremium);

    return matchesSearch && matchesCategory && matchesLevel && matchesDuration && matchesPremium;
  });

  // Sort courses
  const sortedCourses = [...filteredCourses]?.sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b?.rating - a?.rating;
      case 'popular':
        return parseInt(b?.students?.replace('k', '')) - parseInt(a?.students?.replace('k', ''));
      case 'newest':
        return b?.id - a?.id;
      case 'duration':
        return a?.duration - b?.duration;
      case 'alphabetical':
        return a?.title?.localeCompare(b?.title);
      default:
        return 0;
    }
  });

  const handleCourseEnroll = (course) => {
    console.log('Enrolling in course:', course?.title);
    // Implement enrollment logic
  };

  const handleCoursePreview = (course) => {
    setSelectedCourse(course);
    setIsPreviewOpen(true);
  };

  const handlePathStart = (path) => {
    console.log('Starting learning path:', path?.title);
    // Implement path start logic
  };

  const handlePathContinue = (path) => {
    console.log('Continuing learning path:', path?.title);
    // Implement path continue logic
  };

  const handleToolSelect = (tool) => {
    console.log('Selected tool:', tool?.name);
    // Implement tool selection logic
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      levels: [],
      durations: [],
      formats: [],
      freeOnly: false,
      premiumOnly: false
    });
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="flex">
          {/* Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            onClearFilters={clearFilters}
            isCollapsed={isFilterCollapsed}
            onToggle={() => setIsFilterCollapsed(!isFilterCollapsed)}
          />

          {/* Main Content */}
          <div className={`flex-1 transition-all duration-300 ${
            isFilterCollapsed ? 'ml-16' : 'ml-80'
          }`}>
            {/* Search Header */}
            <SearchHeader
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              sortBy={sortBy}
              onSortChange={setSortBy}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              totalCourses={mockCourses?.length}
              filteredCourses={filteredCourses?.length}
            />

            {/* Content Tabs */}
            <div className="border-b bg-card">
              <div className="px-6">
                <div className="flex space-x-8">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex items-center space-x-2 py-4 border-b-2 transition-colors duration-200 ${
                        activeTab === tab?.id
                          ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      <Icon name={tab?.icon} size={18} />
                      <span className="font-medium">{tab?.name}</span>
                      <span className="bg-muted text-muted-foreground px-2 py-1 rounded-full text-xs">
                        {tab?.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'courses' && (
                <div>
                  {/* Featured Section */}
                  {searchQuery === '' && filters?.categories?.length === 0 && (
                    <div className="mb-8">
                      <div className="bg-gradient-hero rounded-lg p-8 text-white mb-6">
                        <div className="max-w-2xl">
                          <h1 className="font-heading font-heading-bold text-3xl mb-4">
                            Master Trading with Expert-Led Courses
                          </h1>
                          <p className="text-white/90 text-lg mb-6">
                            Join over 50,000 students learning from industry professionals. 
                            Start with fundamentals or advance your existing skills.
                          </p>
                          <div className="flex items-center space-x-4">
                            <Button variant="secondary" size="lg">
                              <Icon name="Play" size={20} className="mr-2" />
                              Start Free Course
                            </Button>
                            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
                              <Icon name="BookOpen" size={20} className="mr-2" />
                              Browse All Courses
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="text-center p-4 bg-card rounded-lg brand-shadow">
                          <div className="text-2xl font-bold text-primary mb-1">200+</div>
                          <div className="text-sm text-muted-foreground">Expert Courses</div>
                        </div>
                        <div className="text-center p-4 bg-card rounded-lg brand-shadow">
                          <div className="text-2xl font-bold text-secondary mb-1">50k+</div>
                          <div className="text-sm text-muted-foreground">Active Students</div>
                        </div>
                        <div className="text-center p-4 bg-card rounded-lg brand-shadow">
                          <div className="text-2xl font-bold text-accent mb-1">95%</div>
                          <div className="text-sm text-muted-foreground">Completion Rate</div>
                        </div>
                        <div className="text-center p-4 bg-card rounded-lg brand-shadow">
                          <div className="text-2xl font-bold text-success mb-1">4.8</div>
                          <div className="text-sm text-muted-foreground">Average Rating</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Courses Grid/List */}
                  {sortedCourses?.length > 0 ? (
                    <div className={`grid gap-6 ${
                      viewMode === 'grid' ?'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :'grid-cols-1'
                    }`}>
                      {sortedCourses?.map((course) => (
                        <CourseCard
                          key={course?.id}
                          course={course}
                          onEnroll={handleCourseEnroll}
                          onPreview={handleCoursePreview}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                      <h3 className="font-heading font-heading-semibold text-lg text-foreground mb-2">
                        No courses found
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your search criteria or filters
                      </p>
                      <Button variant="outline" onClick={clearFilters}>
                        <Icon name="RotateCcw" size={16} className="mr-2" />
                        Clear All Filters
                      </Button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'paths' && (
                <div>
                  <div className="mb-8">
                    <h2 className="font-heading font-heading-semibold text-2xl text-foreground mb-2">
                      Structured Learning Paths
                    </h2>
                    <p className="text-muted-foreground">
                      Follow curated learning journeys designed to take you from beginner to expert
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockLearningPaths?.map((path) => (
                      <LearningPathCard
                        key={path?.id}
                        path={path}
                        onStart={handlePathStart}
                        onContinue={handlePathContinue}
                      />
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'tools' && (
                <div>
                  <div className="mb-8">
                    <h2 className="font-heading font-heading-semibold text-2xl text-foreground mb-2">
                      Learning Lab & Tools
                    </h2>
                    <p className="text-muted-foreground">
                      Essential calculators, resources, and tools to enhance your trading education
                    </p>
                  </div>

                  <QuickAccessTools onToolSelect={handleToolSelect} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Course Preview Modal */}
      <CoursePreviewModal
        course={selectedCourse}
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onEnroll={handleCourseEnroll}
      />
    </div>
  );
};

export default CourseLibraryInteractiveLearning;