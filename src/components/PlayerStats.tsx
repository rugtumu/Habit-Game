'use client';

import { Player } from '../types/game';

interface PlayerStatsProps {
  player: Player;
}

export default function PlayerStats({ player }: PlayerStatsProps) {
  const xpPercentage = (player.xp / (player.xp + player.xpToNextLevel)) * 100;

  return (
    <div className="bg-gradient-to-r from-indigo-900 to-purple-900 p-6 rounded-lg border border-indigo-700">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">Level {player.level}</h2>
        </div>
        <div className="text-right">
          <div className="text-yellow-400 font-bold text-lg">💰 {player.goldPoints}</div>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm text-gray-300 mb-1">
            <span>XP</span>
            <span>{player.xp} / {player.xp + player.xpToNextLevel}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500 ease-out"
              style={{ width: `${xpPercentage}%` }}
            >
              <div className="h-full bg-white bg-opacity-20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 