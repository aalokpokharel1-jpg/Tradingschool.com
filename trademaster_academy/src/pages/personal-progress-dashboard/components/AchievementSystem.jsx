import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AchievementSystem = ({ achievements, recentBadges, totalPoints }) => {
  return (
    <div className="bg-white rounded-xl brand-shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-heading-semibold text-primary">
          Achievements
        </h2>
        <div className="flex items-center space-x-2 text-accent">
          <Icon name="Trophy" size={20} />
          <span className="text-sm font-medium">{totalPoints} Points</span>
        </div>
      </div>
      {/* Recent Badges */}
      <div className="mb-6">
        <h3 className="text-sm font-heading font-heading-semibold text-primary mb-3">
          Recent Achievements
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {recentBadges?.map((badge) => (
            <div 
              key={badge?.id} 
              className="text-center p-3 bg-gradient-to-br from-success/5 to-secondary/5 rounded-lg border border-success/20 achievement-glow"
            >
              <div className="w-12 h-12 bg-gradient-growth rounded-full flex items-center justify-center mx-auto mb-2">
                <Icon name={badge?.icon} size={20} color="white" strokeWidth={2.5} />
              </div>
              <div className="text-xs font-medium text-primary mb-1">
                {badge?.title}
              </div>
              <div className="text-xs text-muted-foreground">
                {badge?.date}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Achievement Categories */}
      <div className="space-y-4">
        {achievements?.map((category) => (
          <div key={category?.category} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={category?.icon} size={16} className="text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-heading font-heading-semibold text-primary">
                    {category?.category}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {category?.completed}/{category?.total} completed
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-primary">
                  {Math.round((category?.completed / category?.total) * 100)}%
                </div>
                <div className="w-16 bg-muted rounded-full h-2 mt-1">
                  <div 
                    className="bg-gradient-growth h-2 rounded-full progress-fill" 
                    style={{width: `${(category?.completed / category?.total) * 100}%`}}
                  ></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {category?.badges?.map((badge) => (
                <div 
                  key={badge?.id}
                  className={`text-center p-2 rounded-lg border transition-all duration-200 ${
                    badge?.earned 
                      ? 'bg-success/5 border-success/20 hover:bg-success/10' :'bg-muted/30 border-muted hover:bg-muted/50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-1 ${
                    badge?.earned 
                      ? 'bg-gradient-growth' :'bg-muted-foreground/20'
                  }`}>
                    <Icon 
                      name={badge?.icon} 
                      size={14} 
                      color={badge?.earned ? "white" : "#64748B"}
                      strokeWidth={2}
                    />
                  </div>
                  <div className={`text-xs font-medium ${
                    badge?.earned ? 'text-primary' : 'text-muted-foreground'
                  }`}>
                    {badge?.title}
                  </div>
                  {badge?.earned && (
                    <div className="text-xs text-success mt-1">
                      +{badge?.points} pts
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* View All Button */}
      <div className="mt-6 text-center">
        <Button variant="outline" fullWidth>
          <Icon name="Award" size={16} className="mr-2" />
          View All Achievements
        </Button>
      </div>
    </div>
  );
};

export default AchievementSystem;