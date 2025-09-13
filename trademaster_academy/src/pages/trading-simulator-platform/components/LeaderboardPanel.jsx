import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const LeaderboardPanel = () => {
  const [activeTab, setActiveTab] = useState('weekly');

  const tabs = [
    { id: 'weekly', label: 'Weekly', icon: 'Calendar' },
    { id: 'monthly', label: 'Monthly', icon: 'CalendarDays' },
    { id: 'overall', label: 'All Time', icon: 'Trophy' }
  ];

  const mockLeaderboard = {
    weekly: [
      {
        rank: 1,
        username: 'TradingPro2024',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        profit: 2450.75,
        profitPercent: 24.51,
        trades: 47,
        winRate: 89.4,
        badge: 'gold'
      },
      {
        rank: 2,
        username: 'MarketMaster',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        profit: 1875.20,
        profitPercent: 18.75,
        trades: 32,
        winRate: 84.4,
        badge: 'silver'
      },
      {
        rank: 3,
        username: 'ForexQueen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        profit: 1650.90,
        profitPercent: 16.51,
        trades: 38,
        winRate: 78.9,
        badge: 'bronze'
      },
      {
        rank: 4,
        username: 'CryptoKing',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        profit: 1420.30,
        profitPercent: 14.20,
        trades: 29,
        winRate: 75.9,
        badge: null
      },
      {
        rank: 5,
        username: 'PipHunter',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        profit: 1285.60,
        profitPercent: 12.86,
        trades: 41,
        winRate: 73.2,
        badge: null
      },
      {
        rank: 6,
        username: 'TrendFollower',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        profit: 1150.45,
        profitPercent: 11.50,
        trades: 35,
        winRate: 71.4,
        badge: null
      },
      {
        rank: 7,
        username: 'RiskManager',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        profit: 980.25,
        profitPercent: 9.80,
        trades: 28,
        winRate: 67.9,
        badge: null
      },
      {
        rank: 8,
        username: 'SwingTrader',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        profit: 875.80,
        profitPercent: 8.76,
        trades: 22,
        winRate: 68.2,
        badge: null
      }
    ]
  };

  const currentUserRank = {
    rank: 15,
    username: 'You',
    profit: 245.50,
    profitPercent: 2.46,
    trades: 7,
    winRate: 71.4
  };

  const getBadgeIcon = (badge) => {
    switch (badge) {
      case 'gold': return 'Crown';
      case 'silver': return 'Medal';
      case 'bronze': return 'Award';
      default: return null;
    }
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'gold': return 'text-yellow-500';
      case 'silver': return 'text-gray-400';
      case 'bronze': return 'text-orange-600';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-white rounded-lg border h-96 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading font-heading-semibold text-lg text-primary">
            Leaderboard
          </h3>
          <Icon name="Trophy" size={20} className="text-accent" />
        </div>

        {/* Tabs */}
        <div className="flex space-x-1">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-primary hover:bg-muted'
              }`}
            >
              <Icon name={tab?.icon} size={14} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Leaderboard List */}
      <div className="flex-1 overflow-y-auto">
        {mockLeaderboard?.[activeTab]?.map((trader) => (
          <div key={trader?.rank} className="p-3 border-b hover:bg-muted/50 transition-colors duration-200">
            <div className="flex items-center space-x-3">
              {/* Rank */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                trader?.rank <= 3 ? 'bg-gradient-trust text-white' : 'bg-muted text-muted-foreground'
              }`}>
                {trader?.rank <= 3 && trader?.badge ? (
                  <Icon name={getBadgeIcon(trader?.badge)} size={14} className={getBadgeColor(trader?.badge)} />
                ) : (
                  trader?.rank
                )}
              </div>

              {/* Avatar */}
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src={trader?.avatar}
                  alt={trader?.username}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Trader Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-heading font-heading-semibold text-sm text-primary">
                      {trader?.username}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {trader?.trades} trades • {trader?.winRate}% win rate
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className={`font-mono font-semibold text-sm ${
                      trader?.profit >= 0 ? 'text-success' : 'text-destructive'
                    }`}>
                      +${trader?.profit?.toFixed(2)}
                    </div>
                    <div className="text-xs text-success">
                      +{trader?.profitPercent}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Current User Position */}
      <div className="p-4 border-t bg-primary/5">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
            {currentUserRank?.rank}
          </div>
          
          <div className="w-10 h-10 rounded-full bg-gradient-trust flex items-center justify-center">
            <Icon name="User" size={16} className="text-white" />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-heading font-heading-semibold text-sm text-primary">
                  Your Position
                </div>
                <div className="text-xs text-muted-foreground">
                  {currentUserRank?.trades} trades • {currentUserRank?.winRate}% win rate
                </div>
              </div>
              
              <div className="text-right">
                <div className={`font-mono font-semibold text-sm ${
                  currentUserRank?.profit >= 0 ? 'text-success' : 'text-destructive'
                }`}>
                  +${currentUserRank?.profit?.toFixed(2)}
                </div>
                <div className="text-xs text-success">
                  +{currentUserRank?.profitPercent}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Challenge CTA */}
      <div className="p-4 border-t">
        <Button variant="outline" fullWidth size="sm">
          <Icon name="Zap" size={16} className="mr-2" />
          Join Trading Challenge
        </Button>
      </div>
    </div>
  );
};

export default LeaderboardPanel;