import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LearningPathsSection = () => {
  const [selectedPath, setSelectedPath] = useState(null);

  const learningPaths = [
    {
      id: 'beginner',
      title: 'Beginner Foundations',
      subtitle: 'Perfect for complete newcomers',
      description: 'Start from zero and build solid trading fundamentals with our comprehensive beginner program.',
      duration: '4-6 weeks',
      completionRate: 96,
      studentsEnrolled: 8420,
      modules: 12,
      level: 'Beginner',
      color: 'success',
      icon: 'GraduationCap',
      features: [
        'Trading basics and terminology',
        'Risk management fundamentals', 
        'Market analysis introduction',
        'Practice with virtual money'
      ],
      testimonial: {
        text: "Perfect starting point! I went from knowing nothing to making my first profitable trade in 5 weeks.",
        author: "Alex Thompson",
        role: "Complete Beginner → Confident Trader"
      },
      nextSteps: ['Paper trading certification', 'Community mentorship', 'Intermediate path unlock']
    },
    {
      id: 'intermediate',
      title: 'Intermediate Strategies',
      subtitle: 'Build on your foundation',
      description: 'Develop advanced trading strategies and learn to analyze market trends with confidence.',
      duration: '6-8 weeks', 
      completionRate: 89,
      studentsEnrolled: 5230,
      modules: 16,
      level: 'Intermediate',
      color: 'primary',
      icon: 'TrendingUp',
      features: [
        'Technical analysis mastery',
        'Chart patterns recognition',
        'Advanced risk strategies',
        'Portfolio diversification'
      ],
      testimonial: {
        text: "The strategy modules transformed my trading approach. My win rate improved from 60% to 78%.",
        author: "Maria Santos",
        role: "Intermediate Trader → Strategy Expert"
      },
      nextSteps: ['Advanced certification', 'Mentor program eligibility', 'Live trading sessions']
    },
    {
      id: 'advanced',
      title: 'Advanced Techniques',
      subtitle: 'Master professional trading',
      description: 'Learn sophisticated trading techniques used by professional traders and institutions.',
      duration: '8-12 weeks',
      completionRate: 82,
      studentsEnrolled: 2840,
      modules: 20,
      level: 'Advanced',
      color: 'accent',
      icon: 'Target',
      features: [
        'Algorithmic trading basics',
        'Options and derivatives',
        'Market psychology mastery',
        'Professional risk management'
      ],
      testimonial: {
        text: "These advanced techniques helped me transition to full-time trading with consistent profits.",
        author: "David Kim",
        role: "Advanced Student → Professional Trader"
      },
      nextSteps: ['Professional certification', 'Trading mentor role', 'Advanced community access']
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      success: {
        bg: 'bg-success',
        text: 'text-success',
        border: 'border-success',
        hover: 'hover:bg-success/5'
      },
      primary: {
        bg: 'bg-primary',
        text: 'text-primary', 
        border: 'border-primary',
        hover: 'hover:bg-primary/5'
      },
      accent: {
        bg: 'bg-accent',
        text: 'text-accent',
        border: 'border-accent', 
        hover: 'hover:bg-accent/5'
      }
    };
    return colorMap?.[color];
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-muted rounded-full px-4 py-2 mb-6">
            <Icon name="Map" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">Learning Pathways</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-heading font-heading-bold text-foreground mb-6">
            Choose Your Trading Journey
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Structured learning paths designed to take you from beginner to expert trader, 
            with proven methodologies and real-world application.
          </p>
        </div>

        {/* Learning Paths Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {learningPaths?.map((path) => {
            const colors = getColorClasses(path?.color);
            const isSelected = selectedPath === path?.id;
            
            return (
              <div
                key={path?.id}
                className={`relative bg-card rounded-2xl border-2 transition-all duration-300 cursor-pointer float-card ${
                  isSelected 
                    ? `${colors?.border} brand-shadow-lg scale-105` 
                    : `border-border ${colors?.hover} hover:border-border/60`
                }`}
                onClick={() => setSelectedPath(isSelected ? null : path?.id)}
              >
                {/* Path Header */}
                <div className="p-8 pb-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-16 h-16 ${colors?.bg} rounded-2xl flex items-center justify-center`}>
                      <Icon name={path?.icon} size={28} color="white" strokeWidth={2} />
                    </div>
                    
                    <div className="text-right">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${colors?.text} bg-current/10`}>
                        {path?.level}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-heading font-heading-bold text-foreground mb-2">
                    {path?.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4">
                    {path?.subtitle}
                  </p>
                  
                  <p className="text-foreground leading-relaxed mb-6">
                    {path?.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-heading font-heading-bold text-foreground">
                        {path?.completionRate}%
                      </div>
                      <div className="text-xs text-muted-foreground">Completion Rate</div>
                    </div>
                    
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-heading font-heading-bold text-foreground">
                        {path?.studentsEnrolled?.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">Students</div>
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-6">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} />
                      <span>{path?.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="BookOpen" size={14} />
                      <span>{path?.modules} modules</span>
                    </div>
                  </div>
                </div>
                {/* Expandable Content */}
                <div className={`overflow-hidden transition-all duration-300 ${
                  isSelected ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  <div className="px-8 pb-8">
                    {/* Features */}
                    <div className="mb-6">
                      <h4 className="font-heading font-heading-semibold text-foreground mb-3">
                        What You'll Learn:
                      </h4>
                      <div className="space-y-2">
                        {path?.features?.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <div className={`w-5 h-5 ${colors?.bg} rounded-full flex items-center justify-center flex-shrink-0`}>
                              <Icon name="Check" size={12} color="white" strokeWidth={3} />
                            </div>
                            <span className="text-sm text-foreground">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Testimonial */}
                    <div className="bg-muted rounded-lg p-4 mb-6">
                      <blockquote className="text-sm text-foreground mb-3 italic">
                        "{path?.testimonial?.text}"
                      </blockquote>
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 ${colors?.bg} rounded-full flex items-center justify-center`}>
                          <Icon name="User" size={14} color="white" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground text-sm">
                            {path?.testimonial?.author}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {path?.testimonial?.role}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <Link to="/course-library-interactive-learning">
                      <Button 
                        variant="default" 
                        fullWidth 
                        className={`${colors?.bg} hover:opacity-90`}
                        iconName="ArrowRight"
                        iconPosition="right"
                      >
                        Start {path?.title}
                      </Button>
                    </Link>
                  </div>
                </div>
                {/* Expand Indicator */}
                <div className="absolute bottom-4 right-4">
                  <div className={`w-8 h-8 ${colors?.bg}/10 rounded-full flex items-center justify-center transition-transform duration-200 ${
                    isSelected ? 'rotate-180' : ''
                  }`}>
                    <Icon name="ChevronDown" size={16} className={colors?.text} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-muted-foreground mb-6">
            Not sure which path is right for you?
          </p>
          <Link to="/course-library-interactive-learning">
            <Button 
              variant="outline" 
              size="lg"
              iconName="Brain"
              iconPosition="left"
            >
              Take Our Free Assessment
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LearningPathsSection;