import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const StudyGroupCard = ({ group, onJoin, onViewDetails }) => {
  const [showMembers, setShowMembers] = useState(false);

  const getStatusColor = (status) => {
    const colors = {
      active: 'bg-success/20 text-success',
      recruiting: 'bg-blue-100 text-blue-800',
      full: 'bg-gray-200 text-gray-600',
      archived: 'bg-gray-100 text-gray-500'
    };
    return colors?.[status] || colors?.active;
  };

  const getDifficultyColor = (level) => {
    const colors = {
      beginner: 'bg-blue-100 text-blue-800',
      intermediate: 'bg-emerald-100 text-emerald-800',
      advanced: 'bg-purple-100 text-purple-800',
      mixed: 'bg-orange-100 text-orange-800'
    };
    return colors?.[level] || colors?.beginner;
  };

  const formatNextMeeting = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `In ${diffDays} days`;
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <div className="bg-white rounded-lg border brand-shadow hover:brand-shadow-lg transition-all duration-200 overflow-hidden">
      <div className="p-6">
        {/* Group Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 bg-gradient-growth rounded-lg flex items-center justify-center">
              <Icon name="Users" size={20} color="white" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-heading font-heading-semibold text-primary text-lg">
                {group?.name}
              </h3>
              <p className="text-sm text-muted-foreground">{group?.description}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(group?.status)}`}>
              {group?.status}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(group?.level)}`}>
              {group?.level}
            </span>
          </div>
        </div>

        {/* Group Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 p-3 bg-muted rounded-lg">
          <div className="text-center">
            <div className="font-heading font-heading-bold text-lg text-primary">
              {group?.members?.length}/{group?.maxMembers}
            </div>
            <div className="text-xs text-muted-foreground">Members</div>
          </div>
          <div className="text-center">
            <div className="font-heading font-heading-bold text-lg text-secondary">
              {group?.meetingsPerWeek}
            </div>
            <div className="text-xs text-muted-foreground">Meetings/Week</div>
          </div>
          <div className="text-center">
            <div className="font-heading font-heading-bold text-lg text-success">
              {group?.completionRate}%
            </div>
            <div className="text-xs text-muted-foreground">Completion</div>
          </div>
          <div className="text-center">
            <div className="font-heading font-heading-bold text-lg text-accent">
              {group?.avgRating}
            </div>
            <div className="text-xs text-muted-foreground">Rating</div>
          </div>
        </div>

        {/* Focus Areas */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground mb-2">Focus Areas:</h4>
          <div className="flex flex-wrap gap-2">
            {group?.focusAreas?.map((area, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* Next Meeting */}
        {group?.nextMeeting && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-blue-900 flex items-center">
                  <Icon name="Calendar" size={16} className="mr-2" />
                  Next Meeting
                </h4>
                <p className="text-sm text-blue-800 mt-1">{group?.nextMeeting?.topic}</p>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-blue-900">
                  {formatNextMeeting(group?.nextMeeting?.date)}
                </div>
                <div className="text-xs text-blue-700">
                  {new Date(group.nextMeeting.date)?.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Members Preview */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-foreground">Members</h4>
            <button
              onClick={() => setShowMembers(!showMembers)}
              className="text-xs text-primary hover:text-primary/80"
            >
              {showMembers ? 'Hide' : 'Show all'}
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex -space-x-2">
              {group?.members?.slice(0, 5)?.map((member, index) => (
                <Image
                  key={index}
                  src={member?.avatar}
                  alt={member?.name}
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                />
              ))}
              {group?.members?.length > 5 && (
                <div className="w-8 h-8 rounded-full bg-muted border-2 border-white flex items-center justify-center">
                  <span className="text-xs font-medium text-muted-foreground">
                    +{group?.members?.length - 5}
                  </span>
                </div>
              )}
            </div>
            
            {group?.members?.length < group?.maxMembers && (
              <div className="w-8 h-8 rounded-full border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                <Icon name="Plus" size={14} className="text-muted-foreground" />
              </div>
            )}
          </div>

          {showMembers && (
            <div className="mt-3 space-y-2">
              {group?.members?.map((member, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 bg-muted rounded-lg">
                  <Image
                    src={member?.avatar}
                    alt={member?.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-foreground">{member?.name}</span>
                      {member?.isLeader && (
                        <span className="px-1.5 py-0.5 bg-accent/20 text-accent rounded text-xs">
                          Leader
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">{member?.role}</div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    member?.isOnline ? 'bg-success' : 'bg-gray-400'
                  }`}></div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Activity */}
        {group?.recentActivity && (
          <div className="mb-4 p-3 bg-success/10 rounded-lg">
            <h4 className="text-sm font-medium text-success mb-2 flex items-center">
              <Icon name="Activity" size={16} className="mr-2" />
              Recent Activity
            </h4>
            <p className="text-sm text-success/80">{group?.recentActivity}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {group?.status === 'recruiting' && group?.members?.length < group?.maxMembers ? (
              <Button
                variant="default"
                onClick={() => onJoin(group?.id)}
                iconName="UserPlus"
                iconPosition="left"
              >
                Join Group
              </Button>
            ) : group?.status === 'full' ? (
              <Button
                variant="outline"
                disabled
                iconName="Users"
                iconPosition="left"
              >
                Group Full
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => onViewDetails(group?.id)}
                iconName="Eye"
                iconPosition="left"
              >
                View Details
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              onClick={() => onViewDetails(group?.id)}
              iconName="MessageSquare"
              iconPosition="left"
            >
              Discussion
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-colors duration-200">
              <Icon name="Share" size={16} />
            </button>
            <button className="p-2 rounded-lg text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors duration-200">
              <Icon name="Bookmark" size={16} />
            </button>
          </div>
        </div>

        {/* Requirements */}
        {group?.requirements && group?.requirements?.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <h4 className="text-sm font-medium text-foreground mb-2">Requirements:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              {group?.requirements?.map((requirement, index) => (
                <li key={index} className="flex items-start">
                  <Icon name="Check" size={14} className="mr-2 mt-0.5 text-success" />
                  {requirement}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyGroupCard;