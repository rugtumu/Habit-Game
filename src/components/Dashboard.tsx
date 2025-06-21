'use client';

import { GameState } from '../types/game';
import { calculateCompletionRate } from '../utils/gameLogic';
import PlayerStats from './PlayerStats';

interface DashboardProps {
  gameState: GameState;
}

export default function Dashboard({ gameState }: DashboardProps) {
  const dailyCompletion = calculateCompletionRate(gameState.dailyQuests);
  const weeklyCompletion = calculateCompletionRate(gameState.weeklyQuests);
  const microCompletion = calculateCompletionRate(gameState.microHabits);
  
  const recentAchievements = gameState.achievements
    .filter(a => a.unlocked)
    .sort((a, b) => new Date(b.unlockedAt || 0).getTime() - new Date(a.unlockedAt || 0).getTime())
    .slice(0, 3);

  const totalActiveStreaks = [...gameState.dailyQuests, ...gameState.microHabits]
    .filter(q => q.streak > 0).length;

  const bestStreak = Math.max(
    ...gameState.dailyQuests.map(q => q.maxStreak),
    ...gameState.weeklyQuests.map(q => q.maxStreak),
    ...gameState.microHabits.map(q => q.maxStreak),
    0
  );

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white mb-1">
          Welcome Back! 🎮
        </h1>
      </div>

      <PlayerStats player={gameState.player} />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-6 rounded-lg border border-blue-700">
          <div className="text-center">
            <div className="text-3xl mb-2">📅</div>
            <h3 className="text-white font-bold text-lg mb-2">Daily</h3>
            <div className="text-4xl font-bold text-blue-300 mb-2">{dailyCompletion}%</div>
            <div className="w-full bg-blue-900 rounded-full h-2">
              <div 
                className="h-2 bg-blue-400 rounded-full transition-all duration-500"
                style={{ width: `${dailyCompletion}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-900 to-red-800 p-6 rounded-lg border border-red-700">
          <div className="text-center">
            <div className="text-3xl mb-2">👑</div>
            <h3 className="text-white font-bold text-lg mb-2">Bosses</h3>
            <div className="text-4xl font-bold text-red-300 mb-2">{weeklyCompletion}%</div>
            <div className="w-full bg-red-900 rounded-full h-2">
              <div 
                className="h-2 bg-red-400 rounded-full transition-all duration-500"
                style={{ width: `${weeklyCompletion}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-900 to-green-800 p-6 rounded-lg border border-green-700">
          <div className="text-center">
            <div className="text-3xl mb-2">💚</div>
            <h3 className="text-white font-bold text-lg mb-2">Habits</h3>
            <div className="text-4xl font-bold text-green-300 mb-2">{microCompletion}%</div>
            <div className="w-full bg-green-900 rounded-full h-2">
              <div 
                className="h-2 bg-green-400 rounded-full transition-all duration-500"
                style={{ width: `${microCompletion}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-purple-900 to-indigo-900 p-6 rounded-lg border border-purple-700">
          <h3 className="text-white font-bold text-xl mb-4">
            🔥 Streaks
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Active</span>
              <span className="text-orange-400 font-bold text-xl">{totalActiveStreaks}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Best</span>
              <span className="text-yellow-400 font-bold text-xl">{bestStreak}</span>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-900 to-orange-900 p-6 rounded-lg border border-yellow-700">
          <h3 className="text-white font-bold text-xl mb-4">
            🏆 Recent
          </h3>
          {recentAchievements.length > 0 ? (
            <div className="space-y-3">
              {recentAchievements.map((achievement) => (
                <div key={achievement.id} className="flex items-center space-x-3 p-2 bg-black bg-opacity-30 rounded">
                  <span className="text-2xl">{achievement.icon}</span>
                  <div>
                    <div className="text-white font-semibold">{achievement.title}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-4">
              <div className="text-4xl mb-2">🎯</div>
              <p className="text-gray-400">Complete quests to unlock!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 