import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CommunitySection = () => {
  const [activeTab, setActiveTab] = useState('discussions');
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const recentDiscussions = [
    {
      id: 1,
      title: "Best strategies for volatile markets?",
      author: "TradingNewbie23",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      replies: 24,
      likes: 18,
      timeAgo: "2 hours ago",
      category: "Strategy Discussion",
      isHot: true,
      preview: "I\'ve been struggling with the recent market volatility. What strategies work best when markets are unpredictable?"
    },
    {
      id: 2,
      title: "EUR/USD analysis - bullish trend continues?",
      author: "MarketAnalyst_Pro",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      replies: 31,
      likes: 45,
      timeAgo: "4 hours ago",
      category: "Market Analysis",
      isHot: true,
      preview: "Looking at the technical indicators, EUR/USD seems to be maintaining its bullish momentum. Thoughts?"
    },
    {
      id: 3,
      title: "Risk management tips for beginners",
      author: "SafeTrader_101",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      replies: 19,
      likes: 32,
      timeAgo: "6 hours ago",
      category: "Education",
      isHot: false,
      preview: "New to trading? Here are some essential risk management principles that saved my account multiple times."
    },
    {
      id: 4,
      title: "Crypto vs Forex - which is better for beginners?",
      author: "CuriousLearner",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      replies: 42,
      likes: 28,
      timeAgo: "8 hours ago",
      category: "General Discussion",
      isHot: false,
      preview: "I\'m torn between starting with cryptocurrency trading or traditional forex. What are the pros and cons?"
    }
  ];

  const successStories = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Marketing Manager → Part-time Trader",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
      achievement: "127% Portfolio Growth",
      timeframe: "6 months",
      story: `Started with zero trading knowledge and $1,000 practice account. Through TradeMaster's structured program, I learned risk management and technical analysis. Now I consistently profit $500-800 monthly while keeping my day job.`,
      metrics: {
        winRate: "73%",
        avgReturn: "12%",
        trades: "156"
      },
      badges: ["Risk Management Expert", "Technical Analysis Certified", "Community Mentor"]
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Software Engineer → Active Trader",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
      achievement: "Consistent Monthly Profits",
      timeframe: "8 months",
      story: `The algorithmic thinking from my programming background helped, but TradeMaster taught me market psychology and emotional control. I've been profitable for 5 consecutive months now.`,
      metrics: {
        winRate: "68%",
        avgReturn: "15%",
        trades: "203"
      },
      badges: ["Algorithm Trading", "Psychology Master", "Advanced Strategies"]
    },
    {
      id: 3,
      name: "Jennifer Park",
      role: "Teacher → Trading Enthusiast",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
      achievement: "Advanced Trader Certification",
      timeframe: "4 months",
      story: `Teaching skills helped me learn trading concepts quickly, but the community support was invaluable. I love helping other beginners now while growing my own portfolio.`,
      metrics: {
        winRate: "71%",
        avgReturn: "18%",
        trades: "89"
      },
      badges: ["Certified Advanced Trader", "Community Leader", "Mentor Program"]
    }
  ];

  const communityStats = [
    { label: "Active Members", value: "12,847", icon: "Users" },
    { label: "Daily Discussions", value: "340+", icon: "MessageSquare" },
    { label: "Success Stories", value: "2,156", icon: "Trophy" },
    { label: "Mentorship Pairs", value: "1,890", icon: "UserCheck" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStoryIndex((prev) => (prev + 1) % successStories?.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [successStories?.length]);

  const currentStory = successStories?.[currentStoryIndex];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-secondary/10 rounded-full px-4 py-2 mb-6">
            <Icon name="Users" size={16} className="text-secondary" />
            <span className="text-sm font-medium text-secondary">Community Hub</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-heading font-heading-bold text-foreground mb-6">
            Learn Together, Succeed Together
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Join thousands of traders sharing strategies, celebrating wins, and supporting each other 
            on the journey to trading mastery.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {communityStats?.map((stat, index) => (
            <div key={index} className="text-center p-6 bg-card rounded-xl border brand-shadow">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name={stat?.icon} size={24} className="text-secondary" />
              </div>
              <div className="text-3xl font-heading font-heading-bold text-foreground mb-2">
                {stat?.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat?.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Community Activity */}
          <div>
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-muted rounded-lg p-1 mb-6">
              <button
                onClick={() => setActiveTab('discussions')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === 'discussions' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name="MessageSquare" size={16} className="inline mr-2" />
                Recent Discussions
              </button>
              <button
                onClick={() => setActiveTab('achievements')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                  activeTab === 'achievements' ?'bg-card text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name="Award" size={16} className="inline mr-2" />
                Achievements
              </button>
            </div>

            {/* Discussions Tab */}
            {activeTab === 'discussions' && (
              <div className="space-y-4">
                {recentDiscussions?.map((discussion) => (
                  <div key={discussion?.id} className="bg-card rounded-xl border p-6 hover:brand-shadow transition-all duration-200">
                    <div className="flex items-start space-x-4">
                      <img
                        src={discussion?.avatar}
                        alt={discussion?.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                            {discussion?.category}
                          </span>
                          {discussion?.isHot && (
                            <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full font-medium flex items-center">
                              <Icon name="Flame" size={10} className="mr-1" />
                              Hot
                            </span>
                          )}
                        </div>
                        
                        <h3 className="font-heading font-heading-semibold text-foreground mb-2 hover:text-primary cursor-pointer">
                          {discussion?.title}
                        </h3>
                        
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {discussion?.preview}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center space-x-4">
                            <span>by {discussion?.author}</span>
                            <span>{discussion?.timeAgo}</span>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center space-x-1">
                              <Icon name="MessageCircle" size={12} />
                              <span>{discussion?.replies}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Icon name="Heart" size={12} />
                              <span>{discussion?.likes}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <Link to="/community-hub-social-learning">
                  <Button variant="outline" fullWidth iconName="ArrowRight" iconPosition="right">
                    View All Discussions
                  </Button>
                </Link>
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <div className="space-y-4">
                <div className="bg-card rounded-xl border p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                      <Icon name="Trophy" size={20} className="text-success" />
                    </div>
                    <div>
                      <h3 className="font-heading font-heading-semibold text-foreground">
                        Weekly Challenge Winner
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Best risk-adjusted returns
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Congratulations to <span className="font-medium text-foreground">@TradingPro_Alex</span> for achieving 
                    18.5% returns with only 2.1% drawdown this week!
                  </div>
                </div>

                <div className="bg-card rounded-xl border p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="GraduationCap" size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-heading-semibold text-foreground">
                        New Certifications
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Advanced Technical Analysis
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    15 members earned their Advanced Technical Analysis certification this week. 
                    Join the next cohort starting Monday!
                  </div>
                </div>

                <div className="bg-card rounded-xl border p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <Icon name="Users" size={20} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-heading font-heading-semibold text-foreground">
                        Community Milestone
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        12,000+ active members
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    We've reached 12,000 active community members! Thank you for making 
                    TradeMaster Academy the best place to learn trading.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Success Story Spotlight */}
          <div>
            <div className="bg-gradient-growth text-white rounded-2xl p-8 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v-40c11.046 0 20 8.954 20 20zM0 0v40c11.046 0 20-8.954 20-20S11.046 0 0 0z'/%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
              </div>

              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-heading font-heading-semibold">
                    Success Story Spotlight
                  </h3>
                  
                  <div className="flex space-x-2">
                    {successStories?.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentStoryIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          index === currentStoryIndex ? 'bg-white' : 'bg-white/40'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={currentStory?.avatar}
                    alt={currentStory?.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-white/20"
                  />
                  
                  <div>
                    <h4 className="text-xl font-heading font-heading-bold">
                      {currentStory?.name}
                    </h4>
                    <p className="text-white/80 text-sm">
                      {currentStory?.role}
                    </p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Icon name="Trophy" size={14} />
                      <span className="text-sm font-medium">
                        {currentStory?.achievement}
                      </span>
                    </div>
                  </div>
                </div>

                <blockquote className="text-white/90 mb-6 leading-relaxed">
                  "{currentStory?.story}"
                </blockquote>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-heading font-heading-bold">
                      {currentStory?.metrics?.winRate}
                    </div>
                    <div className="text-xs text-white/70">Win Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-heading font-heading-bold">
                      {currentStory?.metrics?.avgReturn}
                    </div>
                    <div className="text-xs text-white/70">Avg Return</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-heading font-heading-bold">
                      {currentStory?.metrics?.trades}
                    </div>
                    <div className="text-xs text-white/70">Total Trades</div>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {currentStory?.badges?.map((badge, index) => (
                    <span
                      key={index}
                      className="text-xs bg-white/20 text-white px-2 py-1 rounded-full"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                <Link to="/community-hub-social-learning">
                  <Button 
                    variant="outline" 
                    className="border-white/30 text-white hover:bg-white/10"
                    iconName="Users"
                    iconPosition="left"
                  >
                    Join Our Community
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;