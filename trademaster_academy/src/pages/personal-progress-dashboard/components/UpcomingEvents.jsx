import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UpcomingEvents = ({ events, onRegister }) => {
  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'webinar': return 'Video';
      case 'live-session': return 'Users';
      case 'workshop': return 'Wrench';
      case 'assessment': return 'FileText';
      case 'community': return 'MessageCircle';
      default: return 'Calendar';
    }
  };

  const getEventTypeColor = (type) => {
    switch (type) {
      case 'webinar': return 'text-primary bg-primary/10 border-primary/20';
      case 'live-session': return 'text-success bg-success/10 border-success/20';
      case 'workshop': return 'text-accent bg-accent/10 border-accent/20';
      case 'assessment': return 'text-warning bg-warning/10 border-warning/20';
      case 'community': return 'text-secondary bg-secondary/10 border-secondary/20';
      default: return 'text-muted-foreground bg-muted/10 border-muted/20';
    }
  };

  const formatEventTime = (dateTime) => {
    const date = new Date(dateTime);
    const now = new Date();
    const diffTime = date - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `In ${diffDays} days`;
    return date?.toLocaleDateString();
  };

  return (
    <div className="bg-white rounded-xl brand-shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-heading-semibold text-primary">
          Upcoming Events
        </h2>
        <Button variant="ghost" size="sm">
          <Icon name="Calendar" size={16} className="mr-2" />
          View Calendar
        </Button>
      </div>
      <div className="space-y-4">
        {events?.map((event) => (
          <div key={event?.id} className="border rounded-lg p-4 hover:brand-shadow-lg transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3 flex-1">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${getEventTypeColor(event?.type)}`}>
                  <Icon name={getEventTypeIcon(event?.type)} size={20} strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-heading font-heading-semibold text-primary">
                      {event?.title}
                    </h3>
                    {event?.isLive && (
                      <span className="px-2 py-0.5 bg-destructive text-destructive-foreground text-xs rounded-full font-medium">
                        LIVE
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {event?.description}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center">
                      <Icon name="Clock" size={14} className="mr-1" />
                      {formatEventTime(event?.dateTime)} • {event?.time}
                    </span>
                    <span className="flex items-center">
                      <Icon name="MapPin" size={14} className="mr-1" />
                      {event?.location}
                    </span>
                    {event?.attendees && (
                      <span className="flex items-center">
                        <Icon name="Users" size={14} className="mr-1" />
                        {event?.attendees} attending
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                {event?.registered ? (
                  <div className="flex items-center space-x-1 text-success text-sm">
                    <Icon name="CheckCircle" size={16} />
                    <span>Registered</span>
                  </div>
                ) : (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => onRegister(event?.id)}
                  >
                    Register
                  </Button>
                )}
              </div>
            </div>

            {/* Event Details */}
            {event?.instructor && (
              <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
                <div className="w-8 h-8 bg-gradient-trust rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" strokeWidth={2} />
                </div>
                <div>
                  <div className="text-sm font-medium text-primary">
                    {event?.instructor?.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {event?.instructor?.title}
                  </div>
                </div>
                {event?.instructor?.rating && (
                  <div className="ml-auto flex items-center space-x-1 text-warning">
                    <Icon name="Star" size={14} />
                    <span className="text-xs font-medium">{event?.instructor?.rating}</span>
                  </div>
                )}
              </div>
            )}

            {/* Prerequisites or Requirements */}
            {event?.prerequisites && (
              <div className="mt-3 p-3 bg-warning/5 border border-warning/20 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-warning mb-1">
                      Prerequisites Required
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {event?.prerequisites}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {events?.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Calendar" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-sm font-heading font-heading-semibold text-primary mb-2">
            No Upcoming Events
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Check back later for new webinars, workshops, and live sessions.
          </p>
          <Button variant="outline">
            <Icon name="Bell" size={16} className="mr-2" />
            Enable Notifications
          </Button>
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;