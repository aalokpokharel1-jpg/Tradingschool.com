import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressOverview = ({ overallProgress, currentStreak, totalCourses, completedCourses }) => {
  return (
    <div className="bg-white rounded-xl brand-shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-heading-semibold text-primary">
          Learning Overview
        </h2>
        <div className="flex items-center space-x-2 text-success">
          <Icon name="TrendingUp" size={20} />
          <span className="text-sm font-medium">On Track</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-growth rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="Target" size={24} color="white" strokeWidth={2.5} />
          </div>
          <div className="text-2xl font-heading font-heading-bold text-primary mb-1">
            {overallProgress}%
          </div>
          <div className="text-sm text-muted-foreground">Overall Progress</div>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-trust rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="Flame" size={24} color="white" strokeWidth={2.5} />
          </div>
          <div className="text-2xl font-heading font-heading-bold text-primary mb-1">
            {currentStreak}
          </div>
          <div className="text-sm text-muted-foreground">Day Streak</div>
        </div>

        <div className="text-center">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon name="BookOpen" size={24} color="white" strokeWidth={2.5} />
          </div>
          <div className="text-2xl font-heading font-heading-bold text-primary mb-1">
            {completedCourses}/{totalCourses}
          </div>
          <div className="text-sm text-muted-foreground">Courses Done</div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Overall Progress</span>
          <span className="font-medium text-primary">{overallProgress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3">
          <div 
            className="bg-gradient-growth h-3 rounded-full progress-fill transition-all duration-1000" 
            style={{width: `${overallProgress}%`}}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProgressOverview;