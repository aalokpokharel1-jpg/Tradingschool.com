import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const GoalSetting = ({ goals, onAddGoal, onUpdateGoal }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    deadline: '',
    category: 'learning'
  });

  const handleAddGoal = () => {
    if (newGoal?.title && newGoal?.deadline) {
      onAddGoal({
        ...newGoal,
        id: Date.now(),
        progress: 0,
        createdAt: new Date()?.toISOString()?.split('T')?.[0]
      });
      setNewGoal({ title: '', description: '', deadline: '', category: 'learning' });
      setShowAddForm(false);
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'learning': return 'BookOpen';
      case 'trading': return 'TrendingUp';
      case 'community': return 'Users';
      case 'certification': return 'Award';
      default: return 'Target';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'learning': return 'text-primary bg-primary/10';
      case 'trading': return 'text-success bg-success/10';
      case 'community': return 'text-secondary bg-secondary/10';
      case 'certification': return 'text-accent bg-accent/10';
      default: return 'text-muted-foreground bg-muted/10';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success bg-success/10 border-success/20';
      case 'in-progress': return 'text-warning bg-warning/10 border-warning/20';
      case 'overdue': return 'text-destructive bg-destructive/10 border-destructive/20';
      default: return 'text-muted-foreground bg-muted/10 border-muted/20';
    }
  };

  return (
    <div className="bg-white rounded-xl brand-shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-heading font-heading-semibold text-primary">
          Learning Goals
        </h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Icon name="Plus" size={16} className="mr-2" />
          Add Goal
        </Button>
      </div>
      {/* Add Goal Form */}
      {showAddForm && (
        <div className="mb-6 p-4 bg-muted/30 rounded-lg border">
          <h3 className="text-sm font-heading font-heading-semibold text-primary mb-3">
            Create New Goal
          </h3>
          <div className="space-y-3">
            <Input
              label="Goal Title"
              type="text"
              placeholder="e.g., Complete Technical Analysis Course"
              value={newGoal?.title}
              onChange={(e) => setNewGoal({...newGoal, title: e?.target?.value})}
            />
            <Input
              label="Description"
              type="text"
              placeholder="Brief description of your goal"
              value={newGoal?.description}
              onChange={(e) => setNewGoal({...newGoal, description: e?.target?.value})}
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Deadline"
                type="date"
                value={newGoal?.deadline}
                onChange={(e) => setNewGoal({...newGoal, deadline: e?.target?.value})}
              />
              <div>
                <label className="block text-sm font-medium text-primary mb-1">
                  Category
                </label>
                <select
                  value={newGoal?.category}
                  onChange={(e) => setNewGoal({...newGoal, category: e?.target?.value})}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="learning">Learning</option>
                  <option value="trading">Trading</option>
                  <option value="community">Community</option>
                  <option value="certification">Certification</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="default" size="sm" onClick={handleAddGoal}>
                Create Goal
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Goals List */}
      <div className="space-y-4">
        {goals?.map((goal) => (
          <div key={goal?.id} className="border rounded-lg p-4 hover:brand-shadow-lg transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3 flex-1">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getCategoryColor(goal?.category)}`}>
                  <Icon name={getCategoryIcon(goal?.category)} size={20} strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <h3 className="font-heading font-heading-semibold text-primary mb-1">
                    {goal?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {goal?.description}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center">
                      <Icon name="Calendar" size={14} className="mr-1" />
                      Due: {new Date(goal.deadline)?.toLocaleDateString()}
                    </span>
                    <span className="flex items-center">
                      <Icon name="Clock" size={14} className="mr-1" />
                      Created: {new Date(goal.createdAt)?.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(goal?.status)}`}>
                {goal?.status?.replace('-', ' ')}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-3">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium text-primary">{goal?.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full progress-fill transition-all duration-1000 ${
                    goal?.status === 'completed' ? 'bg-gradient-growth' :
                    goal?.status === 'overdue' ? 'bg-destructive' : 'bg-gradient-trust'
                  }`}
                  style={{width: `${goal?.progress}%`}}
                ></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {goal?.milestones && (
                  <span className="text-xs text-muted-foreground">
                    {goal?.milestones?.completed}/{goal?.milestones?.total} milestones
                  </span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Icon name="Edit" size={14} className="mr-1" />
                  Edit
                </Button>
                {goal?.status !== 'completed' && (
                  <Button variant="outline" size="sm">
                    <Icon name="Play" size={14} className="mr-1" />
                    Continue
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {goals?.length === 0 && !showAddForm && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Target" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-sm font-heading font-heading-semibold text-primary mb-2">
            No Goals Set Yet
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Set learning goals to track your progress and stay motivated.
          </p>
          <Button variant="default" onClick={() => setShowAddForm(true)}>
            <Icon name="Plus" size={16} className="mr-2" />
            Create Your First Goal
          </Button>
        </div>
      )}
    </div>
  );
};

export default GoalSetting;