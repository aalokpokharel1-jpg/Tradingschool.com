import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustIndicatorsSection = () => {
  const trustMetrics = [
    {
      value: "10,000+",
      label: "Successful Graduates",
      description: "Students who completed our programs and achieved trading proficiency",
      icon: "GraduationCap",
      color: "success"
    },
    {
      value: "94%",
      label: "Course Completion Rate",
      description: "Industry-leading completion rate thanks to our engaging curriculum",
      icon: "Target",
      color: "primary"
    },
    {
      value: "4.9/5",
      label: "Student Satisfaction",
      description: "Average rating from over 8,000 student reviews and testimonials",
      icon: "Star",
      color: "accent"
    },
    {
      value: "24/7",
      label: "Community Support",
      description: "Round-the-clock peer support and mentor guidance available",
      icon: "Users",
      color: "secondary"
    }
  ];

  const securityBadges = [
    {
      name: "SSL Secured",
      description: "256-bit SSL encryption protects all data transmission",
      icon: "Shield",
      verified: true
    },
    {
      name: "GDPR Compliant",
      description: "Full compliance with European data protection regulations",
      icon: "Lock",
      verified: true
    },
    {
      name: "SOC 2 Certified",
      description: "Independently audited security and availability controls",
      icon: "Award",
      verified: true
    },
    {
      name: "PCI DSS Level 1",
      description: "Highest level of payment card industry security standards",
      icon: "CreditCard",
      verified: true
    }
  ];

  const regulatoryCompliance = [
    {
      name: "Financial Education Standards",
      authority: "National Financial Educators Council",
      description: "Certified educational content meeting industry standards",
      icon: "BookOpen",
      status: "Certified"
    },
    {
      name: "Consumer Protection",
      authority: "Better Business Bureau",
      description: "A+ rating with zero unresolved complaints",
      icon: "ShieldCheck",
      status: "A+ Rating"
    },
    {
      name: "Educational Compliance",
      authority: "International Association of Financial Education",
      description: "Member institution with verified educational practices",
      icon: "Building",
      status: "Member"
    }
  ];

  const partnerLogos = [
    {
      name: "TradingView",
      description: "Official charting partner",
      logo: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=120&h=60&fit=crop"
    },
    {
      name: "MetaTrader",
      description: "Platform integration partner",
      logo: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=120&h=60&fit=crop"
    },
    {
      name: "Financial Times",
      description: "Educational content partner",
      logo: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=120&h=60&fit=crop"
    },
    {
      name: "Reuters",
      description: "Market data provider",
      logo: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=120&h=60&fit=crop"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      success: 'text-success bg-success/10',
      primary: 'text-primary bg-primary/10',
      accent: 'text-accent bg-accent/10',
      secondary: 'text-secondary bg-secondary/10'
    };
    return colorMap?.[color] || colorMap?.primary;
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-trust/10 rounded-full px-4 py-2 mb-6">
            <Icon name="ShieldCheck" size={16} className="text-trust" />
            <span className="text-sm font-medium text-trust">Trust & Security</span>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-heading font-heading-bold text-foreground mb-6">
            Trusted by Thousands of Traders
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Your success and security are our top priorities. We maintain the highest standards 
            of educational excellence and data protection.
          </p>
        </div>

        {/* Trust Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trustMetrics?.map((metric, index) => (
            <div key={index} className="text-center">
              <div className={`w-16 h-16 ${getColorClasses(metric?.color)} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                <Icon name={metric?.icon} size={28} className={`text-${metric?.color}`} strokeWidth={2} />
              </div>
              
              <div className="text-4xl font-heading font-heading-bold text-foreground mb-2">
                {metric?.value}
              </div>
              
              <h3 className="text-lg font-heading font-heading-semibold text-foreground mb-2">
                {metric?.label}
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed">
                {metric?.description}
              </p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Security & Compliance */}
          <div>
            <h3 className="text-2xl font-heading font-heading-bold text-foreground mb-8">
              Security & Data Protection
            </h3>
            
            <div className="space-y-4">
              {securityBadges?.map((badge, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-card rounded-xl border">
                  <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name={badge?.icon} size={20} className="text-success" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-heading font-heading-semibold text-foreground">
                        {badge?.name}
                      </h4>
                      {badge?.verified && (
                        <div className="flex items-center space-x-1 text-success">
                          <Icon name="CheckCircle" size={14} />
                          <span className="text-xs font-medium">Verified</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {badge?.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Regulatory Compliance */}
          <div>
            <h3 className="text-2xl font-heading font-heading-bold text-foreground mb-8">
              Regulatory Compliance
            </h3>
            
            <div className="space-y-4">
              {regulatoryCompliance?.map((item, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-card rounded-xl border">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name={item?.icon} size={20} className="text-primary" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-heading font-heading-semibold text-foreground">
                        {item?.name}
                      </h4>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                        {item?.status}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {item?.authority}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item?.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Partner Ecosystem */}
        <div className="text-center">
          <h3 className="text-2xl font-heading font-heading-bold text-foreground mb-8">
            Trusted Partner Ecosystem
          </h3>
          
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            We partner with industry leaders to provide you with the best tools, 
            data, and educational resources available.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partnerLogos?.map((partner, index) => (
              <div key={index} className="group">
                <div className="bg-card rounded-xl border p-6 hover:brand-shadow transition-all duration-200 group-hover:scale-105">
                  <div className="w-full h-12 bg-muted rounded-lg mb-4 flex items-center justify-center">
                    <span className="text-sm font-medium text-muted-foreground">
                      {partner?.name}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {partner?.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Trust Statement */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-trust text-white rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='9' cy='9' r='9'/%3E%3Ccircle cx='51' cy='9' r='9'/%3E%3Ccircle cx='9' cy='51' r='9'/%3E%3Ccircle cx='51' cy='51' r='9'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}></div>
            </div>
            
            <div className="relative">
              <Icon name="Shield" size={48} className="mx-auto mb-6 text-white/80" />
              
              <h3 className="text-2xl font-heading font-heading-bold mb-4">
                Your Success, Our Commitment
              </h3>
              
              <p className="text-white/90 max-w-2xl mx-auto leading-relaxed">
                We're committed to providing you with the highest quality trading education 
                in a secure, supportive environment. Your trust drives our continuous improvement 
                and innovation in financial education.
              </p>
              
              <div className="flex items-center justify-center space-x-6 mt-8 text-white/70">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} />
                  <span className="text-sm">24/7 Support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="RefreshCw" size={16} />
                  <span className="text-sm">30-Day Guarantee</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={16} />
                  <span className="text-sm">Community Driven</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicatorsSection;