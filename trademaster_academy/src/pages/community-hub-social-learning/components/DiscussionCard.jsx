import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DiscussionCard = ({ discussion, onLike, onReply, onBookmark }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const getLevelBadge = (level) => {
    const badges = {
      beginner: { color: 'bg-blue-100 text-blue-800', icon: 'GraduationCap' },
      intermediate: { color: 'bg-emerald-100 text-emerald-800', icon: 'TrendingUp' },
      advanced: { color: 'bg-purple-100 text-purple-800', icon: 'Target' },
      expert: { color: 'bg-orange-100 text-orange-800', icon: 'Crown' }
    };
    return badges?.[level] || badges?.beginner;
  };

  const badge = getLevelBadge(discussion?.author?.level);

  return (
    <div className="bg-white rounded-lg border brand-shadow hover:brand-shadow-lg transition-all duration-200">
      {/* Discussion Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-3">
            <Image
              src={discussion?.author?.avatar}
              alt={discussion?.author?.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-heading font-heading-semibold text-primary">
                  {discussion?.author?.name}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge?.color}`}>
                  <Icon name={badge?.icon} size={12} className="inline mr-1" />
                  {discussion?.author?.level}
                </span>
                {discussion?.author?.isMentor && (
                  <span className="px-2 py-1 bg-success/10 text-success rounded-full text-xs font-medium">
                    <Icon name="Award" size={12} className="inline mr-1" />
                    Mentor
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <span>{formatTimeAgo(discussion?.timestamp)}</span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Icon name="Tag" size={14} />
                  <span>{discussion?.category}</span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {discussion?.isPinned && (
              <Icon name="Pin" size={16} className="text-accent" />
            )}
            <button
              onClick={() => onBookmark(discussion?.id)}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                discussion?.isBookmarked
                  ? 'text-accent bg-accent/10' :'text-muted-foreground hover:text-accent hover:bg-accent/10'
              }`}
            >
              <Icon name="Bookmark" size={16} />
            </button>
          </div>
        </div>

        {/* Discussion Title */}
        <h2 className="text-lg font-heading font-heading-semibold text-foreground mb-3">
          {discussion?.title}
        </h2>

        {/* Discussion Content */}
        <div className="text-muted-foreground mb-4">
          <p className={`${!isExpanded && discussion?.content?.length > 200 ? 'line-clamp-3' : ''}`}>
            {discussion?.content}
          </p>
          {discussion?.content?.length > 200 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-primary hover:text-primary/80 text-sm font-medium mt-2"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>

        {/* Tags */}
        {discussion?.tags && discussion?.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {discussion?.tags?.map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Attachments */}
        {discussion?.attachments && discussion?.attachments?.length > 0 && (
          <div className="mb-4">
            {discussion?.attachments?.map((attachment, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 bg-muted rounded-lg">
                <Icon name="Paperclip" size={16} className="text-muted-foreground" />
                <span className="text-sm text-foreground">{attachment?.name}</span>
                <span className="text-xs text-muted-foreground">({attachment?.size})</span>
              </div>
            ))}
          </div>
        )}

        {/* Action Bar */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onLike(discussion?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                discussion?.isLiked
                  ? 'text-success bg-success/10' :'text-muted-foreground hover:text-success hover:bg-success/10'
              }`}
            >
              <Icon name="ThumbsUp" size={16} />
              <span className="text-sm font-medium">{discussion?.likes}</span>
            </button>

            <button
              onClick={() => setShowReplies(!showReplies)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-all duration-200"
            >
              <Icon name="MessageSquare" size={16} />
              <span className="text-sm font-medium">{discussion?.replies}</span>
            </button>

            <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-all duration-200">
              <Icon name="Share" size={16} />
              <span className="text-sm font-medium">Share</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground">
              {discussion?.views} views
            </span>
          </div>
        </div>
      </div>
      {/* Replies Section */}
      {showReplies && discussion?.recentReplies && (
        <div className="border-t bg-muted/30">
          <div className="p-6">
            <h4 className="font-heading font-heading-semibold text-foreground mb-4">
              Recent Replies ({discussion?.replies})
            </h4>
            <div className="space-y-4">
              {discussion?.recentReplies?.map((reply, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <Image
                    src={reply?.author?.avatar}
                    alt={reply?.author?.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium text-sm text-foreground">
                        {reply?.author?.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatTimeAgo(reply?.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{reply?.content}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onReply(discussion?.id)}
                iconName="Reply"
                iconPosition="left"
              >
                Reply to Discussion
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscussionCard;