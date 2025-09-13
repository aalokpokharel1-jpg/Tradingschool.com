import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CurrentCourses = ({ courses }) => {
  return (
    <div className="bg-white rounded-xl brand-shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-heading-semibold text-primary">
          Current Courses
        </h2>
        <Button variant="ghost" size="sm">
          <Icon name="Plus" size={16} className="mr-2" />
          Add Course
        </Button>
      </div>
      <div className="space-y-4">
        {courses?.map((course) => (
          <div key={course?.id} className="border rounded-lg p-4 hover:brand-shadow-lg transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-heading font-heading-semibold text-primary mb-1">
                  {course?.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {course?.description}
                </p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span className="flex items-center">
                    <Icon name="Clock" size={14} className="mr-1" />
                    {course?.timeRemaining}
                  </span>
                  <span className="flex items-center">
                    <Icon name="Users" size={14} className="mr-1" />
                    {course?.studentsCount} students
                  </span>
                  <span className="flex items-center">
                    <Icon name="Star" size={14} className="mr-1" />
                    {course?.rating}
                  </span>
                </div>
              </div>
              <div className="ml-4 text-right">
                <div className="text-sm font-medium text-primary mb-1">
                  {course?.progress}%
                </div>
                <div className="w-20 bg-muted rounded-full h-2">
                  <div 
                    className="bg-gradient-growth h-2 rounded-full progress-fill" 
                    style={{width: `${course?.progress}%`}}
                  ></div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  course?.status === 'active' ? 'bg-success' : 
                  course?.status === 'paused' ? 'bg-warning' : 'bg-muted-foreground'
                }`}></div>
                <span className="text-xs text-muted-foreground capitalize">
                  {course?.status}
                </span>
              </div>
              <Button variant="outline" size="sm">
                Continue Learning
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentCourses;