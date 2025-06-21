'use client';

import { useState } from 'react';
import { useGameState } from '../hooks/useGameState';
import { TabType } from '../types/game';
import TabNavigation from './TabNavigation';
import Dashboard from './Dashboard';
import QuestCard from './QuestCard';
import AchievementBadge from './AchievementBadge';
import RewardItem from './RewardItem';
import StatsPanel from './StatsPanel';

const TABS: TabType[] = [
  { id: 'dashboard', name: 'Dashboard', icon: '🏠' },
  { id: 'daily', name: 'Daily', icon: '📋' },
  { id: 'weekly', name: 'Bosses', icon: '⚔️' },
  { id: 'habits', name: 'Habits', icon: '💚' },
  { id: 'achievements', name: 'Achievements', icon: '🏆' },
  { id: 'shop', name: 'Shop', icon: '🛍️' },
  { id: 'stats', name: 'Stats', icon: '📊' }
];

export default function HabitGame() {
  const { gameState, isLoading, completeQuest, purchaseReward } = useGameState();
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">⚡</div>
          <div className="text-white text-xl font-bold">Loading...</div>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard gameState={gameState} />;
        
      case 'daily':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-2">📋 Daily Quests</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gameState.dailyQuests.map((quest) => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  onComplete={() => completeQuest(quest.id, 'daily')}
                />
              ))}
            </div>
          </div>
        );
        
      case 'weekly':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-2">⚔️ Boss Battles</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gameState.weeklyQuests.map((quest) => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  onComplete={() => completeQuest(quest.id, 'weekly')}
                />
              ))}
            </div>
          </div>
        );
        
      case 'habits':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-2">💚 Habits</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gameState.microHabits.map((quest) => (
                <QuestCard
                  key={quest.id}
                  quest={quest}
                  onComplete={() => completeQuest(quest.id, 'micro')}
                />
              ))}
            </div>
          </div>
        );
        
      case 'achievements':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-2">🏆 Achievements</h1>
              <div className="mt-4">
                <span className="text-yellow-400 font-bold text-lg">
                  {gameState.achievements.filter(a => a.unlocked).length} / {gameState.achievements.length}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {gameState.achievements.map((achievement) => (
                <AchievementBadge key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </div>
        );
        
      case 'shop':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-2">🛍️ Shop</h1>
              <div className="mt-4">
                <span className="text-yellow-400 font-bold text-xl">
                  💰 {gameState.player.goldPoints}
                </span>
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-green-400 mb-4">🎁 Quick (10-30)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {gameState.rewards.filter(r => r.category === 'low').map((reward) => (
                  <RewardItem
                    key={reward.id}
                    reward={reward}
                    onPurchase={() => purchaseReward(reward.id)}
                    canAfford={gameState.player.goldPoints >= reward.cost}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-blue-400 mb-4">🏆 Special (40-75)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {gameState.rewards.filter(r => r.category === 'medium').map((reward) => (
                  <RewardItem
                    key={reward.id}
                    reward={reward}
                    onPurchase={() => purchaseReward(reward.id)}
                    canAfford={gameState.player.goldPoints >= reward.cost}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="text-xl font-bold text-purple-400 mb-4">💎 Premium (100+)</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {gameState.rewards.filter(r => r.category === 'high').map((reward) => (
                  <RewardItem
                    key={reward.id}
                    reward={reward}
                    onPurchase={() => purchaseReward(reward.id)}
                    canAfford={gameState.player.goldPoints >= reward.cost}
                  />
                ))}
              </div>
            </div>
          </div>
        );
        
      case 'stats':
        return <StatsPanel gameState={gameState} />;
        
      default:
        return <Dashboard gameState={gameState} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <TabNavigation 
        tabs={TABS} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
      <div className="p-6">
        {renderContent()}
      </div>
    </div>
  );
} 