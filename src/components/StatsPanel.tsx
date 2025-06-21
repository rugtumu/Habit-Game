'use client';

import { GameState } from '../types/game';

interface StatsPanelProps {
  gameState: GameState;
}

export default function StatsPanel({ gameState }: StatsPanelProps) {
  const { player, dailyQuests, weeklyQuests, microHabits, achievements } = gameState;
  
  const totalQuests = dailyQuests.length + weeklyQuests.length + microHabits.length;
  const completedQuests = [...dailyQuests, ...weeklyQuests, ...microHabits]
    .filter(q => q.completed).length;
  
  const bossesDefeated = weeklyQuests.filter(q => q.isBoss && q.completed).length;
  const totalBosses = weeklyQuests.filter(q => q.isBoss).length;
  
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;
  
  const averageXpPerQuest = player.totalQuestsCompleted > 0 
    ? Math.round(player.totalXpEarned / player.totalQuestsCompleted) 
    : 0;

  const longestStreak = Math.max(
    ...dailyQuests.map(q => q.maxStreak),
    ...weeklyQuests.map(q => q.maxStreak),
    ...microHabits.map(q => q.maxStreak),
    0
  );

  const activeStreaks = [...dailyQuests, ...microHabits]
    .filter(q => q.streak > 0);

  const memberSince = new Date(player.createdAt).toLocaleDateString();
  const daysSinceStart = Math.floor(
    (new Date().getTime() - new Date(player.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );

  const purchasedRewards = gameState.rewards.filter(r => r.purchased).length;
  const totalGpSpent = gameState.rewards
    .filter(r => r.purchased)
    .reduce((sum, r) => sum + r.cost, 0);

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">📊 Player Statistics</h1>
        <p className="text-gray-300">Your journey in numbers</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-6 rounded-lg border border-blue-700 text-center">
          <div className="text-3xl mb-2">⭐</div>
          <div className="text-2xl font-bold text-white">{player.level}</div>
          <div className="text-blue-300 text-sm">Current Level</div>
        </div>
        
        <div className="bg-gradient-to-br from-yellow-900 to-yellow-800 p-6 rounded-lg border border-yellow-700 text-center">
          <div className="text-3xl mb-2">⚡</div>
          <div className="text-2xl font-bold text-white">{player.totalXpEarned.toLocaleString()}</div>
          <div className="text-yellow-300 text-sm">Total XP Earned</div>
        </div>
        
        <div className="bg-gradient-to-br from-green-900 to-green-800 p-6 rounded-lg border border-green-700 text-center">
          <div className="text-3xl mb-2">💰</div>
          <div className="text-2xl font-bold text-white">{player.goldPoints}</div>
          <div className="text-green-300 text-sm">Current Gold</div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-900 to-purple-800 p-6 rounded-lg border border-purple-700 text-center">
          <div className="text-3xl mb-2">🏆</div>
          <div className="text-2xl font-bold text-white">{player.totalQuestsCompleted}</div>
          <div className="text-purple-300 text-sm">Quests Completed</div>
        </div>
      </div>

      {/* Quest Statistics */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">🎯 Quest Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-blue-400">Daily Quests</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Completed Today</span>
                <span className="text-white">{dailyQuests.filter(q => q.completed).length}/{dailyQuests.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Best Streak</span>
                <span className="text-orange-400">{Math.max(...dailyQuests.map(q => q.maxStreak), 0)} days</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-red-400">Boss Battles</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Bosses Defeated</span>
                <span className="text-white">{bossesDefeated}/{totalBosses}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Success Rate</span>
                <span className="text-red-400">{totalBosses > 0 ? Math.round((bossesDefeated / totalBosses) * 100) : 0}%</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-green-400">Micro Habits</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-300">Completed Today</span>
                <span className="text-white">{microHabits.filter(q => q.completed).length}/{microHabits.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Active Streaks</span>
                <span className="text-green-400">{microHabits.filter(q => q.streak > 0).length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Streak Analysis */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">🔥 Streak Analysis</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-orange-400 mb-3">Current Streaks</h3>
            {activeStreaks.length > 0 ? (
              <div className="space-y-2">
                {activeStreaks.map((quest) => (
                  <div key={quest.id} className="flex justify-between items-center p-2 bg-black bg-opacity-30 rounded">
                    <span className="text-gray-300 text-sm">{quest.title}</span>
                    <span className="text-orange-400 font-bold">{quest.streak} days</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-4">No active streaks yet</p>
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-yellow-400 mb-3">Streak Records</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Longest Streak</span>
                <span className="text-yellow-400 font-bold text-xl">{longestStreak} days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Total Active</span>
                <span className="text-orange-400 font-bold">{activeStreaks.length}</span>
              </div>
              <div className="mt-4 p-3 bg-black bg-opacity-30 rounded">
                <p className="text-xs text-gray-400">
                  Consistency is key! Keep completing quests daily to build powerful streaks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements & Rewards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">🎖️ Achievements</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Unlocked</span>
              <span className="text-yellow-400 font-bold text-xl">{unlockedAchievements}/{achievements.length}</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="h-3 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full transition-all duration-500"
                style={{ width: `${(unlockedAchievements / achievements.length) * 100}%` }}
              ></div>
            </div>
            <div className="text-center text-sm text-gray-400">
              {Math.round((unlockedAchievements / achievements.length) * 100)}% Complete
            </div>
          </div>
        </div>
        
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-white mb-4">🛍️ Rewards</h2>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Rewards Claimed</span>
              <span className="text-green-400 font-bold">{purchasedRewards}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Total GP Spent</span>
              <span className="text-yellow-400 font-bold">{totalGpSpent}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Avg XP per Quest</span>
              <span className="text-blue-400 font-bold">{averageXpPerQuest}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Journey Summary */}
      <div className="bg-gradient-to-r from-indigo-900 to-purple-900 border border-indigo-700 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-4">🚀 Your Journey</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl mb-2">📅</div>
            <div className="text-xl font-bold text-white">{daysSinceStart}</div>
            <div className="text-indigo-300 text-sm">Days on Journey</div>
          </div>
          <div>
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-xl font-bold text-white">{daysSinceStart > 0 ? (player.totalQuestsCompleted / daysSinceStart).toFixed(1) : '0'}</div>
            <div className="text-indigo-300 text-sm">Avg Quests/Day</div>
          </div>
          <div>
            <div className="text-3xl mb-2">📈</div>
            <div className="text-xl font-bold text-white">{daysSinceStart > 0 ? Math.round(player.totalXpEarned / daysSinceStart) : 0}</div>
            <div className="text-indigo-300 text-sm">Avg XP/Day</div>
          </div>
        </div>
        <div className="mt-4 text-center">
          <p className="text-indigo-200 text-sm">Member since {memberSince}</p>
        </div>
      </div>
    </div>
  );
} 