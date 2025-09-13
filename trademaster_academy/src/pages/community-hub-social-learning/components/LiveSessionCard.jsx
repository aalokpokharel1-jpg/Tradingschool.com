import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const LiveSessionCard = ({ session, onJoin, onReminder }) => {
  const [timeUntilStart, setTimeUntilStart] = useState('');
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const startTime = new Date(session.startTime);
      const endTime = new Date(session.endTime);
      
      if (now >= startTime && now <= endTime) {
        setIsLive(true);
        setTimeUntilStart('LIVE NOW');
      } else if (now < startTime) {
        const diff = startTime - now;
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        
        if (hours > 0) {
          setTimeUntilStart(`Starts in ${hours}h ${minutes}m`);
        } else {
          setTimeUntilStart(`Starts in ${minutes}m`);
        }
        setIsLive(false);
      } else {
        setTimeUntilStart('Session ended');
        setIsLive(false);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, [session?.startTime, session?.endTime]);

  const formatTime = (dateString) => {
    return new Date(dateString)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getDifficultyColor = (level) => {
    const colors = {
      beginner: 'bg-blue-100 text-blue-800',
      intermediate: 'bg-emerald-100 text-emerald-800',
      advanced: 'bg-purple-100 text-purple-800'
    };
    return colors?.[level] || colors?.beginner;
  };

  return (
    <div className="bg-white rounded-lg border brand-shadow hover:brand-shadow-lg transition-all duration-200 overflow-hidden">
      {/* Live Indicator */}
      {isLive && (
        <div className="bg-destructive text-destructive-foreground px-4 py-2 text-center">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-destructive-foreground rounded-full animate-pulse"></div>
            <span className="font-medium text-sm">LIVE SESSION IN PROGRESS</span>
          </div>
        </div>
      )}
      <div className="p-6">
        {/* Session Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            <Image
              src={session?.host?.avatar}
              alt={session?.host?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-heading font-heading-semibold text-primary">
                {session?.host?.name}
              </h3>
              <p className="text-sm text-muted-foreground">{session?.host?.title}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(session?.level)}`}>
                  {session?.level}
                </span>
                {session?.host?.isVerified && (
                  <Icon name="BadgeCheck" size={16} className="text-success" />
                )}
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className={`text-sm font-medium ${isLive ? 'text-destructive' : 'text-muted-foreground'}`}>
              {timeUntilStart}
            </div>
            <div className="text-xs text-muted-foreground">
              {formatTime(session?.startTime)} - {formatTime(session?.endTime)}
            </div>
          </div>
        </div>

        {/* Session Title and Description */}
        <h2 className="text-lg font-heading font-heading-semibold text-foreground mb-2">
          {session?.title}
        </h2>
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {session?.description}
        </p>

        {/* Session Topics */}
        {session?.topics && session?.topics?.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-foreground mb-2">Topics Covered:</h4>
            <div className="flex flex-wrap gap-2">
              {session?.topics?.map((topic, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Session Stats */}
        <div className="flex items-center justify-between mb-4 p-3 bg-muted rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">{session?.attendees}</span>
              <span className="text-xs text-muted-foreground">attending</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">{session?.duration}</span>
              <span className="text-xs text-muted-foreground">mins</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">{session?.rating}</span>
              <span className="text-xs text-muted-foreground">rating</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {isLive ? (
              <Button
                variant="destructive"
                onClick={() => onJoin(session?.id)}
                iconName="Video"
                iconPosition="left"
                className="animate-pulse"
              >
                Join Live Session
              </Button>
            ) : (
              <Button
                variant="default"
                onClick={() => onJoin(session?.id)}
                iconName="Calendar"
                iconPosition="left"
              >
                Register
              </Button>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() => onReminder(session?.id)}
              iconName="Bell"
              iconPosition="left"
            >
              Remind Me
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

        {/* Prerequisites */}
        {session?.prerequisites && session?.prerequisites?.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-blue-900 mb-2 flex items-center">
              <Icon name="Info" size={16} className="mr-2" />
              Prerequisites
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              {session?.prerequisites?.map((prereq, index) => (
                <li key={index} className="flex items-start">
                  <Icon name="Check" size={14} className="mr-2 mt-0.5 text-blue-600" />
                  {prereq}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveSessionCard;