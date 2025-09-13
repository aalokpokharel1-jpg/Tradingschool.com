import React from 'react';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const LearningPathCard = ({ path, onStart, onContinue }) => {
  const getDifficultyColor = (level) => {
    switch (level) {
      case 'Beginner':
        return 'bg-success text-success-foreground';
      case 'Intermediate':
        return 'bg-warning text-warning-foreground';
      case 'Advanced':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatDuration = (hours) => {
    return hours > 1 ? `${hours} hours` : `${hours} hour`;
  };

  return (
    <div className="bg-card rounded-lg brand-shadow hover:brand-shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Path Header */}
      <div className="relative h-32 bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative p-4 h-full flex items-center">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Icon name={path?.icon} size={24} color="white" strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="font-heading font-heading-semibold text-lg text-white">
                {path?.title}
              </h3>
              <p className="text-white/80 text-sm">{path?.subtitle}</p>
            </div>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(path?.level)}`}>
            {path?.level}
          </span>
        </div>
      </div>
      {/* Path Content */}
      <div className="p-6">
        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {path?.description}
        </p>

        {/* Path Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{path?.courses}</div>
            <div className="text-xs text-muted-foreground">Courses</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{formatDuration(path?.duration)}</div>
            <div className="text-xs text-muted-foreground">Duration</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-primary">{path?.students}</div>
            <div className="text-xs text-muted-foreground">Students</div>
          </div>
        </div>

        {/* Progress Bar (if started) */}
        {path?.progress !== undefined && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Progress</span>
              <span className="text-sm font-medium text-primary">{path?.progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-growth h-2 rounded-full progress-fill" 
                style={{width: `${path?.progress}%`}}
              ></div>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-xs text-muted-foreground">
                {Math.round((path?.progress / 100) * path?.courses)} of {path?.courses} courses completed
              </span>
              <span className="text-xs text-muted-foreground">
                {Math.round(((100 - path?.progress) / 100) * path?.duration)} hours left
              </span>
            </div>
          </div>
        )}

        {/* Skills You'll Learn */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground mb-2">Skills you'll learn:</h4>
          <div className="flex flex-wrap gap-2">
            {path?.skills?.slice(0, 4)?.map((skill, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary text-xs rounded"
              >
                {skill}
              </span>
            ))}
            {path?.skills?.length > 4 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                +{path?.skills?.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Prerequisites */}
        {path?.prerequisites && path?.prerequisites?.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-foreground mb-2">Prerequisites:</h4>
            <ul className="space-y-1">
              {path?.prerequisites?.slice(0, 2)?.map((prereq, index) => (
                <li key={index} className="flex items-start space-x-2 text-xs text-muted-foreground">
                  <Icon name="Check" size={12} className="text-success mt-0.5 flex-shrink-0" />
                  <span>{prereq}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Button */}
        <Button
          variant={path?.progress !== undefined ? "secondary" : "default"}
          fullWidth
          onClick={() => path?.progress !== undefined ? onContinue(path) : onStart(path)}
          className={path?.progress === undefined ? "conversion-pulse" : ""}
        >
          <Icon 
            name={path?.progress !== undefined ? "Play" : "Rocket"} 
            size={16} 
            className="mr-2" 
          />
          {path?.progress !== undefined ? "Continue Learning" : "Start Learning Path"}
        </Button>

        {/* Additional Info */}
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Award" size={12} />
              <span>Certificate included</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Smartphone" size={12} />
              <span>Mobile friendly</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Download" size={12} />
              <span>Offline access</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPathCard;