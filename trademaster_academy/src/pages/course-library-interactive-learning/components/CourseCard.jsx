import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CourseCard = ({ course, onEnroll, onPreview }) => {
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

  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  return (
    <div className="bg-card rounded-lg brand-shadow hover:brand-shadow-lg transition-all duration-300 overflow-hidden group float-card">
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={course?.image}
          alt={course?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(course?.level)}`}>
            {course?.level}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          {course?.isPremium && (
            <div className="bg-accent text-accent-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center">
              <Icon name="Crown" size={12} className="mr-1" />
              Premium
            </div>
          )}
        </div>
        <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
          {formatDuration(course?.duration)}
        </div>
      </div>
      {/* Course Content */}
      <div className="p-6">
        {/* Course Category */}
        <div className="flex items-center space-x-2 mb-2">
          <Icon name={course?.categoryIcon} size={16} className="text-primary" />
          <span className="text-sm text-muted-foreground">{course?.category}</span>
        </div>

        {/* Course Title */}
        <h3 className="font-heading font-heading-semibold text-lg text-foreground mb-2 line-clamp-2">
          {course?.title}
        </h3>

        {/* Course Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {course?.description}
        </p>

        {/* Instructor Info */}
        <div className="flex items-center space-x-3 mb-4">
          <Image
            src={course?.instructor?.avatar}
            alt={course?.instructor?.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-medium text-foreground">{course?.instructor?.name}</p>
            <p className="text-xs text-muted-foreground">{course?.instructor?.title}</p>
          </div>
        </div>

        {/* Course Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} className="text-warning fill-current" />
              <span className="text-sm font-medium">{course?.rating}</span>
              <span className="text-xs text-muted-foreground">({course?.reviews})</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={14} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">{course?.students}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="BookOpen" size={14} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{course?.lessons} lessons</span>
          </div>
        </div>

        {/* Learning Outcomes */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground mb-2">You'll learn:</h4>
          <ul className="space-y-1">
            {course?.outcomes?.slice(0, 3)?.map((outcome, index) => (
              <li key={index} className="flex items-start space-x-2 text-xs text-muted-foreground">
                <Icon name="Check" size={12} className="text-success mt-0.5 flex-shrink-0" />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Progress Bar (if enrolled) */}
        {course?.progress !== undefined && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Progress</span>
              <span className="text-xs font-medium text-primary">{course?.progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-gradient-growth h-2 rounded-full progress-fill" 
                style={{width: `${course?.progress}%`}}
              ></div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPreview(course)}
            className="flex-1"
          >
            <Icon name="Play" size={16} className="mr-2" />
            Preview
          </Button>
          <Button
            variant={course?.progress !== undefined ? "secondary" : "default"}
            size="sm"
            onClick={() => onEnroll(course)}
            className="flex-1"
          >
            <Icon 
              name={course?.progress !== undefined ? "BookOpen" : "Plus"} 
              size={16} 
              className="mr-2" 
            />
            {course?.progress !== undefined ? "Continue" : "Enroll"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;