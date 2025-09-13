import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MentorCard = ({ mentor, onConnect, onViewProfile }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSpecialtyColor = (specialty) => {
    const colors = {
      'Day Trading': 'bg-red-100 text-red-800',
      'Swing Trading': 'bg-blue-100 text-blue-800',
      'Options': 'bg-purple-100 text-purple-800',
      'Forex': 'bg-emerald-100 text-emerald-800',
      'Crypto': 'bg-orange-100 text-orange-800',
      'Technical Analysis': 'bg-indigo-100 text-indigo-800',
      'Risk Management': 'bg-yellow-100 text-yellow-800'
    };
    return colors?.[specialty] || 'bg-gray-100 text-gray-800';
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={index < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg border brand-shadow hover:brand-shadow-lg transition-all duration-200 overflow-hidden">
      <div className="p-6">
        {/* Mentor Header */}
        <div className="flex items-start space-x-4 mb-4">
          <div className="relative">
            <Image
              src={mentor?.avatar}
              alt={mentor?.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${
              mentor?.isOnline ? 'bg-success' : 'bg-gray-400'
            }`}>
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-heading font-heading-semibold text-primary">
                {mentor?.name}
              </h3>
              {mentor?.isVerified && (
                <Icon name="BadgeCheck" size={16} className="text-success" />
              )}
              <span className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs font-medium">
                Mentor
              </span>
            </div>

            <p className="text-sm text-muted-foreground mb-2">{mentor?.title}</p>

            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-1">
                {renderStars(mentor?.rating)}
                <span className="text-muted-foreground ml-1">
                  {mentor?.rating} ({mentor?.reviews} reviews)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-muted rounded-lg">
          <div className="text-center">
            <div className="font-heading font-heading-bold text-lg text-primary">
              {mentor?.experience}
            </div>
            <div className="text-xs text-muted-foreground">Years Trading</div>
          </div>
          <div className="text-center">
            <div className="font-heading font-heading-bold text-lg text-secondary">
              {mentor?.students}
            </div>
            <div className="text-xs text-muted-foreground">Students Mentored</div>
          </div>
          <div className="text-center">
            <div className="font-heading font-heading-bold text-lg text-success">
              {mentor?.successRate}%
            </div>
            <div className="text-xs text-muted-foreground">Success Rate</div>
          </div>
        </div>

        {/* Specialties */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground mb-2">Specialties:</h4>
          <div className="flex flex-wrap gap-2">
            {mentor?.specialties?.map((specialty, index) => (
              <span
                key={index}
                className={`px-2 py-1 rounded-full text-xs font-medium ${getSpecialtyColor(specialty)}`}
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div className="mb-4">
          <p className={`text-sm text-muted-foreground ${!isExpanded ? 'line-clamp-3' : ''}`}>
            {mentor?.bio}
          </p>
          {mentor?.bio?.length > 150 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary hover:text-primary/80 text-sm font-medium mt-1"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>

        {/* Availability */}
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-medium text-blue-900 flex items-center">
              <Icon name="Calendar" size={16} className="mr-2" />
              Availability
            </h4>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              mentor?.isAvailable 
                ? 'bg-success/20 text-success' :'bg-gray-200 text-gray-600'
            }`}>
              {mentor?.isAvailable ? 'Available' : 'Busy'}
            </span>
          </div>
          <div className="text-sm text-blue-800">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Clock" size={14} />
              <span>{mentor?.timezone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="MessageSquare" size={14} />
              <span>Responds within {mentor?.responseTime}</span>
            </div>
          </div>
        </div>

        {/* Recent Achievement */}
        {mentor?.recentAchievement && (
          <div className="mb-4 p-3 bg-success/10 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Trophy" size={16} className="text-success" />
              <span className="text-sm font-medium text-success">Recent Achievement</span>
            </div>
            <p className="text-sm text-success/80 mt-1">{mentor?.recentAchievement}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="default"
              onClick={() => onConnect(mentor?.id)}
              iconName="UserPlus"
              iconPosition="left"
              disabled={!mentor?.isAvailable}
            >
              Connect
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewProfile(mentor?.id)}
              iconName="Eye"
              iconPosition="left"
            >
              View Profile
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-colors duration-200">
              <Icon name="MessageCircle" size={16} />
            </button>
            <button className="p-2 rounded-lg text-muted-foreground hover:text-accent hover:bg-accent/10 transition-colors duration-200">
              <Icon name="Bookmark" size={16} />
            </button>
          </div>
        </div>

        {/* Pricing */}
        {mentor?.pricing && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm text-muted-foreground">Starting from</span>
                <div className="font-heading font-heading-bold text-lg text-primary">
                  ${mentor?.pricing?.hourly}/hour
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm text-muted-foreground">Package deals available</span>
                <div className="text-sm text-success">Save up to 20%</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentorCard;