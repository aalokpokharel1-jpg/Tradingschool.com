import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CoursePreviewModal = ({ course, isOpen, onClose, onEnroll }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [currentLesson, setCurrentLesson] = useState(0);

  if (!isOpen || !course) return null;

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'Eye' },
    { id: 'curriculum', name: 'Curriculum', icon: 'BookOpen' },
    { id: 'instructor', name: 'Instructor', icon: 'User' },
    { id: 'reviews', name: 'Reviews', icon: 'Star' }
  ];

  const sampleLessons = [
    {
      id: 1,
      title: "Introduction to Trading Fundamentals",
      duration: 15,
      type: "video",
      isPreview: true,
      description: "Learn the basic concepts and terminology of trading"
    },
    {
      id: 2,
      title: "Understanding Market Structure",
      duration: 22,
      type: "interactive",
      isPreview: false,
      description: "Explore how markets work and key participants"
    },
    {
      id: 3,
      title: "Reading Price Charts",
      duration: 18,
      type: "video",
      isPreview: true,
      description: "Master the art of chart analysis and pattern recognition"
    },
    {
      id: 4,
      title: "Risk Management Basics",
      duration: 25,
      type: "quiz",
      isPreview: false,
      description: "Essential risk management principles for new traders"
    }
  ];

  const sampleReviews = [
    {
      id: 1,
      user: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      rating: 5,
      date: "2025-01-08",
      comment: "Excellent course! The instructor explains complex concepts in a very understandable way. The interactive exercises really helped solidify my understanding."
    },
    {
      id: 2,
      user: "Michael Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      rating: 4,
      date: "2025-01-05",
      comment: "Great content and well-structured lessons. I wish there were more real-world examples, but overall very satisfied with the course."
    },
    {
      id: 3,
      user: "Emily Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      rating: 5,
      date: "2025-01-03",
      comment: "This course transformed my understanding of trading. The step-by-step approach and practical exercises made learning enjoyable and effective."
    }
  ];

  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={14}
        className={i < rating ? "text-warning fill-current" : "text-muted-foreground"}
      />
    ));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden brand-shadow-lg">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-trust rounded-lg flex items-center justify-center">
              <Icon name={course?.categoryIcon} size={24} color="white" />
            </div>
            <div>
              <h2 className="font-heading font-heading-semibold text-xl text-foreground">
                {course?.title}
              </h2>
              <p className="text-sm text-muted-foreground">{course?.category}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
          >
            <Icon name="X" size={24} className="text-muted-foreground" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex h-[calc(90vh-200px)]">
          {/* Video Preview Section */}
          <div className="flex-1 bg-black flex items-center justify-center">
            <div className="text-center text-white">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Play" size={32} />
              </div>
              <h3 className="text-lg font-medium mb-2">Course Preview</h3>
              <p className="text-white/80 mb-4">
                Watch a sample lesson to get a feel for the course content
              </p>
              <Button variant="secondary">
                <Icon name="Play" size={16} className="mr-2" />
                Play Preview
              </Button>
            </div>
          </div>

          {/* Content Panel */}
          <div className="w-96 bg-card border-l flex flex-col">
            {/* Tabs */}
            <div className="border-b">
              <div className="flex">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm font-medium transition-colors duration-200 ${
                      activeTab === tab?.id
                        ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span className="hidden sm:inline">{tab?.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Course Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">{course?.rating}</div>
                      <div className="text-xs text-muted-foreground">Rating</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">{course?.students}</div>
                      <div className="text-xs text-muted-foreground">Students</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">{course?.lessons}</div>
                      <div className="text-xs text-muted-foreground">Lessons</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold text-primary">{formatDuration(course?.duration)}</div>
                      <div className="text-xs text-muted-foreground">Duration</div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h4 className="font-medium text-foreground mb-2">About this course</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {course?.description}
                    </p>
                  </div>

                  {/* Learning Outcomes */}
                  <div>
                    <h4 className="font-medium text-foreground mb-3">What you'll learn</h4>
                    <ul className="space-y-2">
                      {course?.outcomes?.map((outcome, index) => (
                        <li key={index} className="flex items-start space-x-2 text-sm">
                          <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h4 className="font-medium text-foreground mb-3">Requirements</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Basic understanding of financial markets</li>
                      <li>• Computer with internet connection</li>
                      <li>• Willingness to practice with virtual money</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'curriculum' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground">Course Content</h4>
                    <span className="text-sm text-muted-foreground">
                      {sampleLessons?.length} lessons • {formatDuration(course?.duration)}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    {sampleLessons?.map((lesson, index) => (
                      <div
                        key={lesson?.id}
                        className={`p-3 rounded-lg border transition-colors duration-200 ${
                          currentLesson === index ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <Icon 
                              name={lesson?.type === 'video' ? 'Video' : lesson?.type === 'quiz' ? 'HelpCircle' : 'MousePointer'} 
                              size={16} 
                              className="text-primary" 
                            />
                            <span className="font-medium text-sm">{lesson?.title}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            {lesson?.isPreview && (
                              <span className="text-xs bg-success text-success-foreground px-2 py-1 rounded">
                                Preview
                              </span>
                            )}
                            <span className="text-xs text-muted-foreground">
                              {formatDuration(lesson?.duration)}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground">{lesson?.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'instructor' && (
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Image
                      src={course?.instructor?.avatar}
                      alt={course?.instructor?.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-foreground">{course?.instructor?.name}</h4>
                      <p className="text-sm text-muted-foreground">{course?.instructor?.title}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1">
                          <Icon name="Star" size={14} className="text-warning" />
                          <span className="text-sm">4.8 rating</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Users" size={14} className="text-muted-foreground" />
                          <span className="text-sm">12,450 students</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-foreground mb-2">About the Instructor</h5>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      With over 15 years of experience in financial markets, our instructor has worked at top-tier investment banks and hedge funds. They specialize in technical analysis and risk management, having trained thousands of successful traders worldwide.
                    </p>
                  </div>

                  <div>
                    <h5 className="font-medium text-foreground mb-2">Expertise</h5>
                    <div className="flex flex-wrap gap-2">
                      {['Technical Analysis', 'Risk Management', 'Options Trading', 'Market Psychology']?.map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-foreground">Student Reviews</h4>
                    <div className="flex items-center space-x-2">
                      <div className="flex">{renderStars(course?.rating)}</div>
                      <span className="text-sm font-medium">{course?.rating}</span>
                      <span className="text-sm text-muted-foreground">({course?.reviews} reviews)</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {sampleReviews?.map((review) => (
                      <div key={review?.id} className="p-4 border rounded-lg">
                        <div className="flex items-center space-x-3 mb-3">
                          <Image
                            src={review?.avatar}
                            alt={review?.user}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h6 className="font-medium text-sm">{review?.user}</h6>
                              <span className="text-xs text-muted-foreground">{review?.date}</span>
                            </div>
                            <div className="flex mt-1">{renderStars(review?.rating)}</div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {review?.comment}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="p-6 border-t">
              <div className="space-y-3">
                <Button
                  variant="default"
                  fullWidth
                  onClick={() => onEnroll(course)}
                  className="conversion-pulse"
                >
                  <Icon name="BookOpen" size={16} className="mr-2" />
                  Enroll in Course
                </Button>
                <Button variant="outline" fullWidth>
                  <Icon name="Heart" size={16} className="mr-2" />
                  Add to Wishlist
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursePreviewModal;