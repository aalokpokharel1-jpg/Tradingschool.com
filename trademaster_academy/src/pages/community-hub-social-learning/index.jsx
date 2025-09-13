import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import CommunityHeader from './components/CommunityHeader';
import DiscussionCard from './components/DiscussionCard';
import LiveSessionCard from './components/LiveSessionCard';
import MentorCard from './components/MentorCard';
import StudyGroupCard from './components/StudyGroupCard';
import CommunityStats from './components/CommunityStats';
import CreatePostModal from './components/CreatePostModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CommunityHubSocialLearning = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);
  const [discussions, setDiscussions] = useState([]);
  const [liveSessions, setLiveSessions] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [studyGroups, setStudyGroups] = useState([]);
  const [communityStats, setCommunityStats] = useState({});

  // Mock data initialization
  useEffect(() => {
    const mockDiscussions = [
      {
        id: 1,
        title: "Best strategies for beginners in volatile markets?",
        content: `I've been trading for about 3 months now and I'm struggling with the current market volatility. Every time I think I have a good entry point, the market seems to move against me.\n\nI've been focusing on technical analysis but I'm wondering if I should incorporate more fundamental analysis into my strategy. What approaches have worked best for other beginners during volatile periods?\n\nAny specific indicators or risk management techniques you'd recommend?`,
        author: {
          name: "Sarah Chen",
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
          level: "beginner",
          isMentor: false
        },
        category: "Strategy Discussion",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        likes: 24,
        replies: 18,
        views: 156,
        isLiked: false,
        isBookmarked: false,
        isPinned: false,
        tags: ["volatility", "beginner", "risk-management", "technical-analysis"],
        recentReplies: [
          {
            author: {
              name: "Mike Rodriguez",
              avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
            },
            content: "Start with position sizing - never risk more than 2% per trade. In volatile markets, consider reducing to 1%.",
            timestamp: new Date(Date.now() - 30 * 60 * 1000)
          },
          {
            author: {
              name: "Emma Thompson",
              avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
            },
            content: "I\'d recommend focusing on support and resistance levels during volatile times. They tend to be more reliable.",
            timestamp: new Date(Date.now() - 15 * 60 * 1000)
          }
        ]
      },
      {
        id: 2,
        title: "My first profitable month - lessons learned",
        content: `After 8 months of learning and practicing, I finally had my first consistently profitable month! Here's what made the difference:\n\n1. Strict risk management - I never risk more than 1.5% per trade\n2. Keeping a detailed trading journal\n3. Focusing on just 2-3 currency pairs instead of trying to trade everything\n4. Having a clear exit strategy before entering any trade\n\nThe biggest game-changer was joining a study group here on the platform. Having accountability partners made all the difference.`,
        author: {
          name: "David Park",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
          level: "intermediate",
          isMentor: false
        },
        category: "Success Stories",
        timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
        likes: 89,
        replies: 32,
        views: 423,
        isLiked: true,
        isBookmarked: true,
        isPinned: true,
        tags: ["success-story", "risk-management", "journal", "study-group"],
        recentReplies: [
          {
            author: {
              name: "Lisa Wang",
              avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"
            },
            content: "Congratulations! Your point about focusing on fewer pairs is so important. Quality over quantity.",
            timestamp: new Date(Date.now() - 45 * 60 * 1000)
          }
        ]
      },
      {
        id: 3,
        title: "Understanding market psychology during earnings season",
        content: `I've been analyzing how market sentiment shifts during earnings announcements and I'm seeing some interesting patterns.\n\nThe key seems to be understanding not just what the earnings report says, but how the market interprets it relative to expectations. Sometimes great earnings can lead to sell-offs if expectations were even higher.\n\nHas anyone else noticed this? How do you factor market psychology into your trading decisions during earnings season?`,
        author: {
          name: "Jennifer Martinez",
          avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150",
          level: "advanced",
          isMentor: true
        },
        category: "Market Analysis",
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
        likes: 67,
        replies: 28,
        views: 234,
        isLiked: false,
        isBookmarked: false,
        isPinned: false,
        tags: ["psychology", "earnings", "market-sentiment", "analysis"]
      }
    ];

    const mockLiveSessions = [
      {
        id: 1,
        title: "Live Market Analysis: Fed Decision Impact",
        description: `Join us for a comprehensive analysis of how the Federal Reserve's latest decision is impacting major currency pairs and stock indices. We'll cover:\n\n• Real-time chart analysis\n• Trading opportunities in the current environment\n• Risk management strategies for volatile periods\n• Q&A session with live trading examples`,
        host: {
          name: "Robert Chen",
          avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150",
          title: "Senior Market Analyst",
          isVerified: true
        },
        startTime: new Date(Date.now() + 2 * 60 * 60 * 1000)?.toISOString(),
        endTime: new Date(Date.now() + 3.5 * 60 * 60 * 1000)?.toISOString(),
        duration: 90,
        attendees: 234,
        level: "intermediate",
        rating: 4.8,
        topics: ["Fed Policy", "Currency Analysis", "Risk Management", "Live Trading"],
        prerequisites: [
          "Basic understanding of forex markets",
          "Familiarity with technical analysis",
          "Trading platform setup recommended"
        ]
      },
      {
        id: 2,
        title: "Beginner\'s Guide to Options Trading",
        description: `A comprehensive introduction to options trading for beginners. This session will cover the fundamentals of options, basic strategies, and risk management techniques specifically designed for new traders.`,
        host: {
          name: "Amanda Foster",
          avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
          title: "Options Trading Specialist",
          isVerified: true
        },
        startTime: new Date(Date.now() + 24 * 60 * 60 * 1000)?.toISOString(),
        endTime: new Date(Date.now() + 25.5 * 60 * 60 * 1000)?.toISOString(),
        duration: 90,
        attendees: 156,
        level: "beginner",
        rating: 4.9,
        topics: ["Options Basics", "Call & Put Options", "Basic Strategies", "Risk Management"]
      }
    ];

    const mockMentors = [
      {
        id: 1,
        name: "Michael Thompson",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        title: "Professional Day Trader & Educator",
        bio: `With over 12 years of trading experience, I specialize in helping new traders develop disciplined approaches to day trading. My focus is on risk management, psychology, and building sustainable trading habits.\n\nI've mentored over 200 students and have a proven track record of helping beginners become consistently profitable traders. My approach emphasizes practical application over theory.`,
        experience: 12,
        students: 247,
        successRate: 78,
        rating: 4.9,
        reviews: 156,
        specialties: ["Day Trading", "Risk Management", "Trading Psychology", "Technical Analysis"],
        isOnline: true,
        isAvailable: true,
        isVerified: true,
        timezone: "EST (UTC-5)",
        responseTime: "2 hours",
        pricing: {
          hourly: 85,
          package: 320
        },
        recentAchievement: "Helped 15 students achieve profitability in Q4 2024"
      },
      {
        id: 2,
        name: "Sarah Kim",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
        title: "Forex & Crypto Specialist",
        bio: `Specializing in forex and cryptocurrency markets with 8 years of professional trading experience. I help traders understand market dynamics, develop effective strategies, and manage risk in volatile markets.`,
        experience: 8,
        students: 189,
        successRate: 82,
        rating: 4.8,
        reviews: 134,
        specialties: ["Forex", "Crypto", "Swing Trading", "Market Analysis"],
        isOnline: false,
        isAvailable: true,
        isVerified: true,
        timezone: "PST (UTC-8)",
        responseTime: "4 hours",
        pricing: {
          hourly: 75,
          package: 280
        }
      }
    ];

    const mockStudyGroups = [
      {
        id: 1,
        name: "Forex Fundamentals Study Circle",
        description: "Weekly study sessions focusing on forex market fundamentals, economic indicators, and currency analysis.",
        level: "beginner",
        status: "recruiting",
        maxMembers: 12,
        meetingsPerWeek: 2,
        completionRate: 89,
        avgRating: 4.7,
        focusAreas: ["Currency Analysis", "Economic Indicators", "Fundamental Analysis", "Risk Management"],
        nextMeeting: {
          date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)?.toISOString(),
          topic: "Understanding Central Bank Policies"
        },
        members: [
          {
            name: "Alex Johnson",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
            role: "Active Participant",
            isLeader: true,
            isOnline: true
          },
          {
            name: "Maria Garcia",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
            role: "Study Coordinator",
            isLeader: false,
            isOnline: true
          },
          {
            name: "James Wilson",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
            role: "Participant",
            isLeader: false,
            isOnline: false
          }
        ],
        recentActivity: "Completed analysis of EUR/USD trends - great insights from the group!",
        requirements: [
          "Basic understanding of forex markets",
          "Commitment to attend weekly sessions",
          "Willingness to participate in discussions"
        ]
      },
      {
        id: 2,
        name: "Advanced Options Strategies",
        description: "Deep dive into complex options strategies, risk management, and portfolio optimization techniques.",
        level: "advanced",
        status: "active",
        maxMembers: 8,
        meetingsPerWeek: 1,
        completionRate: 94,
        avgRating: 4.9,
        focusAreas: ["Options Strategies", "Portfolio Management", "Risk Analysis", "Advanced Trading"],
        nextMeeting: {
          date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)?.toISOString(),
          topic: "Iron Condor Strategy Implementation"
        },
        members: [
          {
            name: "Dr. Patricia Lee",
            avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
            role: "Group Leader",
            isLeader: true,
            isOnline: true
          },
          {
            name: "Robert Zhang",
            avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150",
            role: "Senior Member",
            isLeader: false,
            isOnline: false
          }
        ],
        requirements: [
          "Minimum 2 years options trading experience",
          "Understanding of Greeks and volatility",
          "Active trading account required"
        ]
      }
    ];

    const mockStats = {
      activeMembers: 12847,
      discussionsToday: 89,
      liveSessions: 5,
      studyGroups: 34,
      mentorsOnline: 23,
      successStories: 156,
      totalPosts: 45623,
      postsGrowth: 12,
      helpfulAnswers: 8934,
      helpfulnessRate: 87
    };

    setDiscussions(mockDiscussions);
    setLiveSessions(mockLiveSessions);
    setMentors(mockMentors);
    setStudyGroups(mockStudyGroups);
    setCommunityStats(mockStats);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleCreatePost = () => {
    setIsCreatePostModalOpen(true);
  };

  const handlePostSubmit = (postData) => {
    console.log('New post submitted:', postData);
    // Add the new post to discussions
    const newPost = {
      id: discussions?.length + 1,
      ...postData,
      author: {
        name: "Current User",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
        level: "intermediate",
        isMentor: false
      },
      likes: 0,
      replies: 0,
      views: 1,
      isLiked: false,
      isBookmarked: false,
      isPinned: false,
      recentReplies: []
    };
    setDiscussions(prev => [newPost, ...prev]);
  };

  const handleLike = (discussionId) => {
    setDiscussions(prev => prev?.map(discussion => 
      discussion?.id === discussionId 
        ? { 
            ...discussion, 
            isLiked: !discussion?.isLiked,
            likes: discussion?.isLiked ? discussion?.likes - 1 : discussion?.likes + 1
          }
        : discussion
    ));
  };

  const handleBookmark = (discussionId) => {
    setDiscussions(prev => prev?.map(discussion => 
      discussion?.id === discussionId 
        ? { ...discussion, isBookmarked: !discussion?.isBookmarked }
        : discussion
    ));
  };

  const handleReply = (discussionId) => {
    console.log('Reply to discussion:', discussionId);
  };

  const handleJoinSession = (sessionId) => {
    console.log('Join session:', sessionId);
  };

  const handleSetReminder = (sessionId) => {
    console.log('Set reminder for session:', sessionId);
  };

  const handleConnectMentor = (mentorId) => {
    console.log('Connect with mentor:', mentorId);
  };

  const handleViewMentorProfile = (mentorId) => {
    console.log('View mentor profile:', mentorId);
  };

  const handleJoinStudyGroup = (groupId) => {
    console.log('Join study group:', groupId);
  };

  const handleViewGroupDetails = (groupId) => {
    console.log('View group details:', groupId);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'all':
        return (
          <div className="space-y-8">
            {/* Featured Live Sessions */}
            {liveSessions?.length > 0 && (
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-heading font-heading-semibold text-primary">
                    Live Sessions
                  </h2>
                  <Button variant="ghost" size="sm" iconName="ArrowRight" iconPosition="right">
                    View All
                  </Button>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {liveSessions?.slice(0, 2)?.map(session => (
                    <LiveSessionCard
                      key={session?.id}
                      session={session}
                      onJoin={handleJoinSession}
                      onReminder={handleSetReminder}
                    />
                  ))}
                </div>
              </section>
            )}
            {/* Recent Discussions */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading font-heading-semibold text-primary">
                  Recent Discussions
                </h2>
              </div>
              <div className="space-y-6">
                {discussions?.map(discussion => (
                  <DiscussionCard
                    key={discussion?.id}
                    discussion={discussion}
                    onLike={handleLike}
                    onReply={handleReply}
                    onBookmark={handleBookmark}
                  />
                ))}
              </div>
            </section>
          </div>
        );

      case 'mentorship':
        return (
          <div className="space-y-8">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading font-heading-semibold text-primary">
                  Available Mentors
                </h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {mentors?.map(mentor => (
                  <MentorCard
                    key={mentor?.id}
                    mentor={mentor}
                    onConnect={handleConnectMentor}
                    onViewProfile={handleViewMentorProfile}
                  />
                ))}
              </div>
            </section>
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading font-heading-semibold text-primary">
                  Study Groups
                </h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {studyGroups?.map(group => (
                  <StudyGroupCard
                    key={group?.id}
                    group={group}
                    onJoin={handleJoinStudyGroup}
                    onViewDetails={handleViewGroupDetails}
                  />
                ))}
              </div>
            </section>
          </div>
        );

      case 'live':
        return (
          <div className="space-y-8">
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading font-heading-semibold text-primary">
                  Live Trading Sessions
                </h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {liveSessions?.map(session => (
                  <LiveSessionCard
                    key={session?.id}
                    session={session}
                    onJoin={handleJoinSession}
                    onReminder={handleSetReminder}
                  />
                ))}
              </div>
            </section>
          </div>
        );

      default:
        const filteredDiscussions = discussions?.filter(discussion => {
          if (activeTab === 'all') return true;
          return discussion?.author?.level === activeTab;
        });

        return (
          <div className="space-y-6">
            {filteredDiscussions?.map(discussion => (
              <DiscussionCard
                key={discussion?.id}
                discussion={discussion}
                onLike={handleLike}
                onReply={handleReply}
                onBookmark={handleBookmark}
              />
            ))}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CommunityHeader
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onCreatePost={handleCreatePost}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <CommunityStats stats={communityStats} />

            {/* Quick Actions */}
            <div className="bg-white rounded-lg border brand-shadow p-6">
              <h3 className="font-heading font-heading-semibold text-primary mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Plus"
                  iconPosition="left"
                  onClick={handleCreatePost}
                >
                  Create Post
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Users"
                  iconPosition="left"
                >
                  Find Study Group
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  iconName="UserPlus"
                  iconPosition="left"
                >
                  Find Mentor
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Calendar"
                  iconPosition="left"
                >
                  Join Live Session
                </Button>
              </div>
            </div>

            {/* Community Guidelines */}
            <div className="bg-white rounded-lg border brand-shadow p-6">
              <h3 className="font-heading font-heading-semibold text-primary mb-4 flex items-center">
                <Icon name="Shield" size={20} className="mr-2" />
                Community Guidelines
              </h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-start">
                  <Icon name="Check" size={14} className="mr-2 mt-0.5 text-success" />
                  Be respectful and constructive
                </li>
                <li className="flex items-start">
                  <Icon name="Check" size={14} className="mr-2 mt-0.5 text-success" />
                  Share knowledge and insights
                </li>
                <li className="flex items-start">
                  <Icon name="Check" size={14} className="mr-2 mt-0.5 text-success" />
                  No promotional content
                </li>
                <li className="flex items-start">
                  <Icon name="Check" size={14} className="mr-2 mt-0.5 text-success" />
                  Use appropriate tags
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <CreatePostModal
        isOpen={isCreatePostModalOpen}
        onClose={() => setIsCreatePostModalOpen(false)}
        onSubmit={handlePostSubmit}
      />
    </div>
  );
};

export default CommunityHubSocialLearning;