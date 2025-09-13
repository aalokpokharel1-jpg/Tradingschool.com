import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import ProgressOverview from './components/ProgressOverview';
import CurrentCourses from './components/CurrentCourses';
import TradingPerformance from './components/TradingPerformance';
import SkillAssessment from './components/SkillAssessment';
import AchievementSystem from './components/AchievementSystem';
import LearningAnalytics from './components/LearningAnalytics';
import GoalSetting from './components/GoalSetting';
import UpcomingEvents from './components/UpcomingEvents';

const PersonalProgressDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [goals, setGoals] = useState([]);

  // Mock data for progress overview
  const progressData = {
    overallProgress: 68,
    currentStreak: 7,
    totalCourses: 12,
    completedCourses: 8
  };

  // Mock data for current courses
  const currentCourses = [
    {
      id: 1,
      title: "Advanced Technical Analysis",
      description: "Master chart patterns, indicators, and trading signals for better market timing.",
      progress: 75,
      timeRemaining: "2 weeks left",
      studentsCount: 1247,
      rating: 4.8,
      status: "active"
    },
    {
      id: 2,
      title: "Risk Management Fundamentals",
      description: "Learn essential risk management strategies to protect your trading capital.",
      progress: 45,
      timeRemaining: "1 month left",
      studentsCount: 892,
      rating: 4.9,
      status: "active"
    },
    {
      id: 3,
      title: "Trading Psychology Mastery",
      description: "Develop the mental discipline required for consistent trading success.",
      progress: 20,
      timeRemaining: "6 weeks left",
      studentsCount: 654,
      rating: 4.7,
      status: "paused"
    }
  ];

  // Mock data for trading performance
  const portfolioData = [
    { date: 'Dec 1', value: 10000 },
    { date: 'Dec 5', value: 10250 },
    { date: 'Dec 10', value: 10180 },
    { date: 'Dec 15', value: 10420 },
    { date: 'Dec 20', value: 10380 },
    { date: 'Dec 25', value: 10650 },
    { date: 'Dec 30', value: 10850 },
    { date: 'Jan 4', value: 11200 },
    { date: 'Jan 9', value: 11125 }
  ];

  const performanceMetrics = [
    { label: 'Total Return', value: '+12.5%', trend: 'up' },
    { label: 'Win Rate', value: '68%', trend: 'up' },
    { label: 'Avg. Trade', value: '+$45', trend: 'up' },
    { label: 'Max Drawdown', value: '-3.2%', trend: 'neutral' }
  ];

  const recentTrades = [
    {
      id: 1,
      symbol: 'AAPL',
      type: 'buy',
      quantity: 10,
      price: '175.50',
      profit: 125,
      time: '2 hours ago'
    },
    {
      id: 2,
      symbol: 'TSLA',
      type: 'sell',
      quantity: 5,
      price: '245.80',
      profit: -45,
      time: '1 day ago'
    },
    {
      id: 3,
      symbol: 'MSFT',
      type: 'buy',
      quantity: 15,
      price: '380.25',
      profit: 89,
      time: '2 days ago'
    }
  ];

  // Mock data for skill assessment
  const skillData = [
    { skill: 'Technical Analysis', current: 75, target: 90 },
    { skill: 'Fundamental Analysis', current: 60, target: 80 },
    { skill: 'Risk Management', current: 85, target: 95 },
    { skill: 'Trading Psychology', current: 55, target: 85 },
    { skill: 'Market Knowledge', current: 70, target: 85 }
  ];

  // Mock data for achievements
  const achievements = [
    {
      category: 'Learning Milestones',
      icon: 'BookOpen',
      completed: 8,
      total: 12,
      badges: [
        { id: 1, title: 'First Course', icon: 'Play', earned: true, points: 50 },
        { id: 2, title: 'Quiz Master', icon: 'Brain', earned: true, points: 100 },
        { id: 3, title: 'Speed Learner', icon: 'Zap', earned: false, points: 150 }
      ]
    },
    {
      category: 'Trading Achievements',
      icon: 'TrendingUp',
      completed: 5,
      total: 10,
      badges: [
        { id: 4, title: 'First Profit', icon: 'DollarSign', earned: true, points: 100 },
        { id: 5, title: 'Streak Trader', icon: 'Flame', earned: true, points: 200 },
        { id: 6, title: 'Risk Manager', icon: 'Shield', earned: false, points: 250 }
      ]
    }
  ];

  const recentBadges = [
    { id: 1, title: 'Week Warrior', icon: 'Calendar', date: 'Today' },
    { id: 2, title: 'Quiz Champion', icon: 'Trophy', date: 'Yesterday' },
    { id: 3, title: 'Community Helper', icon: 'Heart', date: '2 days ago' },
    { id: 4, title: 'Early Bird', icon: 'Sun', date: '3 days ago' }
  ];

  // Mock data for learning analytics
  const weeklyData = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 1.8 },
    { day: 'Wed', hours: 3.2 },
    { day: 'Thu', hours: 2.1 },
    { day: 'Fri', hours: 2.8 },
    { day: 'Sat', hours: 4.1 },
    { day: 'Sun', hours: 1.5 }
  ];

  const studyTimeData = [
    { subject: 'Technical Analysis', hours: 8.5 },
    { subject: 'Risk Management', hours: 6.2 },
    { subject: 'Trading Psychology', hours: 4.8 },
    { subject: 'Market Fundamentals', hours: 3.1 },
    { subject: 'Strategy Development', hours: 2.4 }
  ];

  const quizScores = [
    {
      id: 1,
      title: 'Chart Patterns Quiz',
      score: 92,
      correct: 23,
      questions: 25,
      date: 'Jan 8, 2025'
    },
    {
      id: 2,
      title: 'Risk Management Assessment',
      score: 88,
      correct: 22,
      questions: 25,
      date: 'Jan 6, 2025'
    },
    {
      id: 3,
      title: 'Market Psychology Test',
      score: 76,
      correct: 19,
      questions: 25,
      date: 'Jan 4, 2025'
    }
  ];

  const recommendations = [
    {
      id: 1,
      title: 'Focus on Fundamental Analysis',
      description: 'Your fundamental analysis skills need improvement. Consider taking the "Market Fundamentals" course.',
      icon: 'TrendingUp',
      priority: 'high',
      timeEstimate: '2 weeks'
    },
    {
      id: 2,
      title: 'Practice Trading Psychology',
      description: 'Complete more psychology exercises to improve emotional discipline in trading.',
      icon: 'Brain',
      priority: 'medium',
      timeEstimate: '1 week'
    },
    {
      id: 3,
      title: 'Join Study Group',
      description: 'Connect with peers studying similar topics to enhance your learning experience.',
      icon: 'Users',
      priority: 'low',
      timeEstimate: '30 minutes'
    }
  ];

  // Mock data for upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: 'Live Trading Session: Market Analysis',
      description: 'Join our expert traders for real-time market analysis and trading strategies.',
      type: 'live-session',
      dateTime: '2025-01-12T14:00:00',
      time: '2:00 PM EST',
      location: 'Online',
      attendees: 234,
      registered: false,
      instructor: {
        name: 'Sarah Johnson',
        title: 'Senior Market Analyst',
        rating: 4.9
      },
      isLive: false
    },
    {
      id: 2,
      title: 'Webinar: Advanced Options Strategies',
      description: 'Learn sophisticated options trading strategies for income generation and risk management.',
      type: 'webinar',
      dateTime: '2025-01-15T19:00:00',
      time: '7:00 PM EST',
      location: 'Zoom',
      attendees: 156,
      registered: true,
      instructor: {
        name: 'Michael Chen',
        title: 'Options Trading Specialist',
        rating: 4.8
      },
      prerequisites: 'Basic options knowledge required'
    },
    {
      id: 3,
      title: 'Community Trading Challenge',
      description: 'Participate in our monthly trading challenge and compete with fellow traders.',
      type: 'community',
      dateTime: '2025-01-20T10:00:00',
      time: '10:00 AM EST',
      location: 'Trading Simulator',
      attendees: 89,
      registered: false
    }
  ];

  // Initialize goals with mock data
  useEffect(() => {
    setGoals([
      {
        id: 1,
        title: 'Complete Technical Analysis Course',
        description: 'Master chart patterns and technical indicators for better trading decisions.',
        deadline: '2025-02-15',
        category: 'learning',
        progress: 75,
        status: 'in-progress',
        createdAt: '2025-01-01',
        milestones: { completed: 6, total: 8 }
      },
      {
        id: 2,
        title: 'Achieve 70% Win Rate',
        description: 'Improve trading consistency and achieve a 70% win rate in simulator.',
        deadline: '2025-01-31',
        category: 'trading',
        progress: 45,
        status: 'in-progress',
        createdAt: '2024-12-15',
        milestones: { completed: 3, total: 5 }
      },
      {
        id: 3,
        title: 'Earn Trading Certification',
        description: 'Complete all required courses and pass the final certification exam.',
        deadline: '2025-03-30',
        category: 'certification',
        progress: 100,
        status: 'completed',
        createdAt: '2024-11-01',
        milestones: { completed: 10, total: 10 }
      }
    ]);
  }, []);

  const handleAddGoal = (newGoal) => {
    setGoals([...goals, newGoal]);
  };

  const handleUpdateGoal = (goalId, updates) => {
    setGoals(goals?.map(goal => 
      goal?.id === goalId ? { ...goal, ...updates } : goal
    ));
  };

  const handleEventRegister = (eventId) => {
    console.log(`Registering for event: ${eventId}`);
    // Implementation for event registration
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'learning', label: 'Learning', icon: 'BookOpen' },
    { id: 'trading', label: 'Trading', icon: 'TrendingUp' },
    { id: 'goals', label: 'Goals', icon: 'Target' },
    { id: 'events', label: 'Events', icon: 'Calendar' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <main className={`transition-all duration-300 pt-16 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="p-4 lg:p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-heading font-heading-bold text-primary mb-2">
                  Personal Progress Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Track your learning journey, trading performance, and skill development across TradeMaster Academy.
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm">
                  <Icon name="Download" size={16} className="mr-2" />
                  Export Report
                </Button>
                <Button variant="default" size="sm">
                  <Icon name="Settings" size={16} className="mr-2" />
                  Customize
                </Button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center space-x-1 bg-white rounded-lg p-1 brand-shadow">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    activeTab === tab?.id
                      ? 'bg-primary text-primary-foreground shadow-interactive'
                      : 'text-muted-foreground hover:text-primary hover:bg-muted'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} strokeWidth={2} />
                  <span className="hidden sm:inline">{tab?.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <ProgressOverview {...progressData} />
                <CurrentCourses courses={currentCourses} />
                <LearningAnalytics 
                  weeklyData={weeklyData}
                  studyTimeData={studyTimeData}
                  quizScores={quizScores}
                  recommendations={recommendations}
                />
              </div>
              <div className="space-y-6">
                <TradingPerformance 
                  portfolioData={portfolioData}
                  performanceMetrics={performanceMetrics}
                  recentTrades={recentTrades}
                />
                <AchievementSystem 
                  achievements={achievements}
                  recentBadges={recentBadges}
                  totalPoints={1250}
                />
              </div>
            </div>
          )}

          {activeTab === 'learning' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CurrentCourses courses={currentCourses} />
              <SkillAssessment 
                skillData={skillData}
                lastAssessment="Dec 28, 2024"
                nextAssessment="Jan 28, 2025"
              />
              <div className="lg:col-span-2">
                <LearningAnalytics 
                  weeklyData={weeklyData}
                  studyTimeData={studyTimeData}
                  quizScores={quizScores}
                  recommendations={recommendations}
                />
              </div>
            </div>
          )}

          {activeTab === 'trading' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="lg:col-span-2">
                <TradingPerformance 
                  portfolioData={portfolioData}
                  performanceMetrics={performanceMetrics}
                  recentTrades={recentTrades}
                />
              </div>
              <SkillAssessment 
                skillData={skillData}
                lastAssessment="Dec 28, 2024"
                nextAssessment="Jan 28, 2025"
              />
              <AchievementSystem 
                achievements={achievements?.filter(a => a?.category === 'Trading Achievements')}
                recentBadges={recentBadges?.filter(b => ['First Profit', 'Streak Trader']?.includes(b?.title))}
                totalPoints={650}
              />
            </div>
          )}

          {activeTab === 'goals' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <GoalSetting 
                  goals={goals}
                  onAddGoal={handleAddGoal}
                  onUpdateGoal={handleUpdateGoal}
                />
              </div>
              <div className="space-y-6">
                <ProgressOverview {...progressData} />
                <AchievementSystem 
                  achievements={achievements}
                  recentBadges={recentBadges}
                  totalPoints={1250}
                />
              </div>
            </div>
          )}

          {activeTab === 'events' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <UpcomingEvents 
                  events={upcomingEvents}
                  onRegister={handleEventRegister}
                />
              </div>
              <div className="space-y-6">
                <CurrentCourses courses={currentCourses?.slice(0, 2)} />
                <div className="bg-white rounded-xl brand-shadow p-6">
                  <h3 className="text-lg font-heading font-heading-semibold text-primary mb-4">
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <Button variant="outline" fullWidth>
                      <Icon name="Calendar" size={16} className="mr-2" />
                      View Full Calendar
                    </Button>
                    <Button variant="outline" fullWidth>
                      <Icon name="Bell" size={16} className="mr-2" />
                      Notification Settings
                    </Button>
                    <Button variant="default" fullWidth>
                      <Icon name="Plus" size={16} className="mr-2" />
                      Create Event Reminder
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Quick Navigation */}
          <div className="mt-12 bg-white rounded-xl brand-shadow p-6">
            <h2 className="text-xl font-heading font-heading-semibold text-primary mb-4">
              Continue Your Journey
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link 
                to="/course-library-interactive-learning"
                className="flex items-center space-x-3 p-4 bg-primary/5 rounded-lg border border-primary/10 hover:bg-primary/10 transition-all duration-200"
              >
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="BookOpen" size={20} className="text-primary" />
                </div>
                <div>
                  <div className="font-heading font-heading-semibold text-primary">
                    Browse Courses
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Discover new learning paths
                  </div>
                </div>
              </Link>

              <Link 
                to="/trading-simulator-platform"
                className="flex items-center space-x-3 p-4 bg-success/5 rounded-lg border border-success/10 hover:bg-success/10 transition-all duration-200"
              >
                <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="TrendingUp" size={20} className="text-success" />
                </div>
                <div>
                  <div className="font-heading font-heading-semibold text-primary">
                    Practice Trading
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Use the simulator
                  </div>
                </div>
              </Link>

              <Link 
                to="/community-hub-social-learning"
                className="flex items-center space-x-3 p-4 bg-secondary/5 rounded-lg border border-secondary/10 hover:bg-secondary/10 transition-all duration-200"
              >
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Users" size={20} className="text-secondary" />
                </div>
                <div>
                  <div className="font-heading font-heading-semibold text-primary">
                    Join Community
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Connect with peers
                  </div>
                </div>
              </Link>

              <Link 
                to="/market-analysis-lab-real-time-education"
                className="flex items-center space-x-3 p-4 bg-accent/5 rounded-lg border border-accent/10 hover:bg-accent/10 transition-all duration-200"
              >
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="LineChart" size={20} className="text-accent" />
                </div>
                <div>
                  <div className="font-heading font-heading-semibold text-primary">
                    Market Lab
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Real-time analysis
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PersonalProgressDashboard;