import React from 'react';
import Icon from '../../../components/AppIcon';

const CommunityStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Active Members',
      value: stats?.activeMembers,
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Discussions Today',
      value: stats?.discussionsToday,
      icon: 'MessageSquare',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      label: 'Live Sessions',
      value: stats?.liveSessions,
      icon: 'Video',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10'
    },
    {
      label: 'Study Groups',
      value: stats?.studyGroups,
      icon: 'BookOpen',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      label: 'Mentors Online',
      value: stats?.mentorsOnline,
      icon: 'Award',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Success Stories',
      value: stats?.successStories,
      icon: 'Trophy',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  return (
    <div className="bg-white rounded-lg border brand-shadow p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-trust rounded-lg flex items-center justify-center">
          <Icon name="BarChart3" size={20} color="white" strokeWidth={2.5} />
        </div>
        <div>
          <h3 className="font-heading font-heading-semibold text-primary">
            Community Stats
          </h3>
          <p className="text-sm text-muted-foreground">
            Real-time community activity
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {statItems?.map((item, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200"
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item?.bgColor}`}>
              <Icon name={item?.icon} size={18} className={item?.color} strokeWidth={2} />
            </div>
            <div>
              <div className={`font-heading font-heading-bold text-lg ${item?.color}`}>
                {item?.value?.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">
                {item?.label}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Additional Stats */}
      <div className="mt-6 pt-6 border-t">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="font-heading font-heading-bold text-2xl text-primary mb-1">
              {stats?.totalPosts?.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Posts</div>
            <div className="text-xs text-success mt-1">
              +{stats?.postsGrowth}% this week
            </div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="font-heading font-heading-bold text-2xl text-secondary mb-1">
              {stats?.helpfulAnswers?.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Helpful Answers</div>
            <div className="text-xs text-success mt-1">
              {stats?.helpfulnessRate}% helpful rate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityStats;