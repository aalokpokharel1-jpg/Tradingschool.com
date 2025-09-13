import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const [userType, setUserType] = useState('newcomer'); // newcomer, returning
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroContent = {
    newcomer: {
      title: "Start Your Trading Journey Today",
      subtitle: "Transform from curious beginner to confident trader with our proven step-by-step system",
      ctaText: "Take Free Assessment",
      ctaLink: "/course-library-interactive-learning",
      features: [
        "No prior experience needed",
        "Risk-free practice environment", 
        "Expert guidance every step"
      ]
    },
    returning: {
      title: "Welcome Back, Future Trader!",
      subtitle: "Continue building your trading expertise with personalized recommendations",
      ctaText: "Continue Learning",
      ctaLink: "/personal-progress-dashboard",
      features: [
        "Pick up where you left off",
        "New advanced strategies available",
        "Community achievements unlocked"
      ]
    }
  };

  const testimonialSlides = [
    {
      quote: "From zero knowledge to profitable trades in 3 months. The structured approach made all the difference.",
      author: "Sarah Chen",
      role: "Marketing Manager → Part-time Trader",
      achievement: "127% portfolio growth"
    },
    {
      quote: "The simulator gave me confidence before risking real money. Now I trade with a clear strategy.",
      author: "Michael Rodriguez",
      role: "Software Engineer → Active Trader", 
      achievement: "Consistent monthly profits"
    },
    {
      quote: "The community support and mentorship program accelerated my learning beyond expectations.",
      author: "Jennifer Park",
      role: "Teacher → Trading Enthusiast",
      achievement: "Certified Advanced Trader"
    }
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonialSlides?.length);
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [testimonialSlides?.length]);

  const content = heroContent?.[userType];

  return (
    <section className="relative bg-gradient-hero text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* User Type Toggle (Demo) */}
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full p-1 mb-8">
              <button
                onClick={() => setUserType('newcomer')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  userType === 'newcomer' ?'bg-white text-primary shadow-lg' :'text-white/80 hover:text-white'
                }`}
              >
                New Visitor
              </button>
              <button
                onClick={() => setUserType('returning')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  userType === 'returning' 
                    ? 'bg-white text-primary shadow-lg' :'text-white/80 hover:text-white'
                }`}
              >
                Returning User
              </button>
            </div>

            <h1 className="text-4xl lg:text-6xl font-heading font-heading-bold mb-6 leading-tight">
              {content?.title}
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
              {content?.subtitle}
            </p>

            {/* Feature List */}
            <div className="space-y-3 mb-10">
              {content?.features?.map((feature, index) => (
                <div key={index} className="flex items-center justify-center lg:justify-start space-x-3">
                  <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Check" size={14} color="white" strokeWidth={3} />
                  </div>
                  <span className="text-white/90 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to={content?.ctaLink}>
                <Button 
                  variant="default" 
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90 conversion-pulse font-cta"
                  iconName="Rocket"
                  iconPosition="left"
                >
                  {content?.ctaText}
                </Button>
              </Link>
              
              <Link to="/trading-simulator-platform">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/30 text-white hover:bg-white/10 font-cta"
                  iconName="Play"
                  iconPosition="left"
                >
                  Try Demo Trading
                </Button>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 mt-12 text-white/70">
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={20} />
                <span className="text-sm font-medium">10,000+ Graduates</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={20} />
                <span className="text-sm font-medium">94% Completion Rate</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={20} />
                <span className="text-sm font-medium">Fully Regulated</span>
              </div>
            </div>
          </div>

          {/* Right Content - Testimonial Carousel */}
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-heading font-heading-semibold text-white">
                  Success Stories
                </h3>
                <div className="flex space-x-2">
                  {testimonialSlides?.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentSlide ? 'bg-white' : 'bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="relative overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {testimonialSlides?.map((testimonial, index) => (
                    <div key={index} className="w-full flex-shrink-0">
                      <blockquote className="text-white/90 text-lg mb-6 leading-relaxed">
                        "{testimonial?.quote}"
                      </blockquote>
                      
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-growth rounded-full flex items-center justify-center">
                          <Icon name="User" size={20} color="white" />
                        </div>
                        <div>
                          <div className="font-heading font-heading-semibold text-white">
                            {testimonial?.author}
                          </div>
                          <div className="text-white/70 text-sm">
                            {testimonial?.role}
                          </div>
                          <div className="text-success text-sm font-medium">
                            {testimonial?.achievement}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-success/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-accent/20 rounded-full blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;