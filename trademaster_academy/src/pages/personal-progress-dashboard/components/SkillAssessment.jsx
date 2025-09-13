import React from 'react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SkillAssessment = ({ skillData, lastAssessment, nextAssessment }) => {
  return (
    <div className="bg-white rounded-xl brand-shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-heading-semibold text-primary">
          Skill Assessment
        </h2>
        <Button variant="outline" size="sm">
          <Icon name="RefreshCw" size={16} className="mr-2" />
          Retake Assessment
        </Button>
      </div>
      {/* Radar Chart */}
      <div className="mb-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={skillData}>
              <PolarGrid stroke="#E2E8F0" />
              <PolarAngleAxis 
                dataKey="skill" 
                tick={{ fontSize: 12, fill: '#64748B' }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ fontSize: 10, fill: '#64748B' }}
                tickCount={6}
              />
              <Radar
                name="Current Level"
                dataKey="current"
                stroke="#1E3A8A"
                fill="#1E3A8A"
                fillOpacity={0.1}
                strokeWidth={2}
              />
              <Radar
                name="Target Level"
                dataKey="target"
                stroke="#059669"
                fill="transparent"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex items-center justify-center space-x-6 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-muted-foreground">Current Level</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-1 bg-secondary rounded-full"></div>
            <span className="text-muted-foreground">Target Level</span>
          </div>
        </div>
      </div>
      {/* Skill Breakdown */}
      <div className="space-y-3 mb-6">
        {skillData?.map((skill) => (
          <div key={skill?.skill} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                skill?.current >= 80 ? 'bg-success/10' :
                skill?.current >= 60 ? 'bg-warning/10' : 'bg-destructive/10'
              }`}>
                <Icon 
                  name={
                    skill?.skill === 'Technical Analysis' ? 'LineChart' :
                    skill?.skill === 'Fundamental Analysis' ? 'TrendingUp' :
                    skill?.skill === 'Risk Management' ? 'Shield' :
                    skill?.skill === 'Trading Psychology' ? 'Brain' : 'BookOpen'
                  } 
                  size={16}
                  className={
                    skill?.current >= 80 ? 'text-success' :
                    skill?.current >= 60 ? 'text-warning' : 'text-destructive'
                  }
                />
              </div>
              <div>
                <div className="text-sm font-medium text-primary">
                  {skill?.skill}
                </div>
                <div className="text-xs text-muted-foreground">
                  Level {Math.floor(skill?.current / 20) + 1} • {skill?.current}%
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground mb-1">
                Target: {skill?.target}%
              </div>
              <div className="w-20 bg-muted rounded-full h-2">
                <div 
                  className="bg-gradient-growth h-2 rounded-full progress-fill" 
                  style={{width: `${skill?.current}%`}}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Assessment Info */}
      <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
        <div className="flex items-center space-x-3">
          <Icon name="Calendar" size={16} className="text-muted-foreground" />
          <div>
            <div className="text-sm font-medium text-primary">
              Last Assessment
            </div>
            <div className="text-xs text-muted-foreground">
              {lastAssessment}
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-primary">
            Next Assessment
          </div>
          <div className="text-xs text-muted-foreground">
            {nextAssessment}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillAssessment;