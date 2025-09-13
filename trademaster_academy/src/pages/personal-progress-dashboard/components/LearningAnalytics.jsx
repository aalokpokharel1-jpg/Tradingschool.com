import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const LearningAnalytics = ({ weeklyData, studyTimeData, quizScores, recommendations }) => {
  const COLORS = ['#1E3A8A', '#059669', '#EA580C', '#EF4444', '#8B5CF6'];

  return (
    <div className="bg-white rounded-xl brand-shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-heading-semibold text-primary">
          Learning Analytics
        </h2>
        <div className="flex items-center space-x-2 text-secondary">
          <Icon name="BarChart3" size={20} />
          <span className="text-sm font-medium">This Week</span>
        </div>
      </div>
      {/* Weekly Study Time */}
      <div className="mb-6">
        <h3 className="text-sm font-heading font-heading-semibold text-primary mb-3">
          Weekly Study Time
        </h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="day" 
                stroke="#64748B"
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#64748B"
                fontSize={12}
                tickLine={false}
                tickFormatter={(value) => `${value}h`}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value) => [`${value} hours`, 'Study Time']}
              />
              <Bar 
                dataKey="hours" 
                fill="#1E3A8A"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Study Time Distribution */}
        <div>
          <h3 className="text-sm font-heading font-heading-semibold text-primary mb-3">
            Study Time by Subject
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={studyTimeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="hours"
                >
                  {studyTimeData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS?.[index % COLORS?.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value} hours`, 'Study Time']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {studyTimeData?.map((item, index) => (
              <div key={item?.subject} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{backgroundColor: COLORS?.[index % COLORS?.length]}}
                ></div>
                <span className="text-xs text-muted-foreground">{item?.subject}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quiz Performance */}
        <div>
          <h3 className="text-sm font-heading font-heading-semibold text-primary mb-3">
            Recent Quiz Scores
          </h3>
          <div className="space-y-3">
            {quizScores?.map((quiz) => (
              <div key={quiz?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    quiz?.score >= 90 ? 'bg-success/10' :
                    quiz?.score >= 70 ? 'bg-warning/10' : 'bg-destructive/10'
                  }`}>
                    <Icon 
                      name={
                        quiz?.score >= 90 ? 'CheckCircle' :
                        quiz?.score >= 70 ? 'AlertCircle' : 'XCircle'
                      }
                      size={16}
                      className={
                        quiz?.score >= 90 ? 'text-success' :
                        quiz?.score >= 70 ? 'text-warning' : 'text-destructive'
                      }
                    />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-primary">
                      {quiz?.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {quiz?.date} • {quiz?.questions} questions
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-heading font-heading-bold ${
                    quiz?.score >= 90 ? 'text-success' :
                    quiz?.score >= 70 ? 'text-warning' : 'text-destructive'
                  }`}>
                    {quiz?.score}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {quiz?.correct}/{quiz?.questions}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Recommendations */}
      <div>
        <h3 className="text-sm font-heading font-heading-semibold text-primary mb-3">
          Personalized Recommendations
        </h3>
        <div className="space-y-3">
          {recommendations?.map((rec) => (
            <div key={rec?.id} className="flex items-start space-x-3 p-3 bg-primary/5 rounded-lg border border-primary/10">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name={rec?.icon} size={16} className="text-primary" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium text-primary mb-1">
                  {rec?.title}
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  {rec?.description}
                </p>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    rec?.priority === 'high' ? 'bg-destructive/10 text-destructive' :
                    rec?.priority === 'medium' ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
                  }`}>
                    {rec?.priority} priority
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Est. {rec?.timeEstimate}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningAnalytics;