'use client';

import { Quest } from '../types/game';

interface QuestCardProps {
  quest: Quest;
  onComplete: () => void;
  disabled?: boolean;
}

export default function QuestCard({ quest, onComplete, disabled }: QuestCardProps) {
  const getCategoryColor = () => {
    switch (quest.category) {
      case 'daily':
        return quest.isBoss ? 'from-red-600 to-orange-600' : 'from-blue-600 to-purple-600';
      case 'weekly':
        return 'from-red-600 to-orange-600';
      case 'micro':
        return 'from-green-600 to-teal-600';
      default:
        return 'from-gray-600 to-gray-700';
    }
  };

  const getBorderColor = () => {
    switch (quest.category) {
      case 'daily':
        return quest.isBoss ? 'border-red-500' : 'border-blue-500';
      case 'weekly':
        return 'border-red-500';
      case 'micro':
        return 'border-green-500';
      default:
        return 'border-gray-500';
    }
  };

  return (
    <div className={`
      relative p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105
      ${quest.completed 
        ? 'bg-gray-800 border-green-500 opacity-75' 
        : `bg-gradient-to-br ${getCategoryColor()} ${getBorderColor()}`
      }
      ${quest.isBoss ? 'ring-2 ring-orange-400 ring-opacity-50' : ''}
    `}>
      {quest.isBoss && (
        <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          👑 BOSS
        </div>
      )}
      
      {quest.completed && (
        <div className="absolute -top-2 -left-2 bg-green-500 text-white text-lg w-8 h-8 rounded-full flex items-center justify-center">
          ✓
        </div>
      )}

      <div className="space-y-3">
        <div>
          <h3 className="text-white font-bold text-lg">{quest.title}</h3>
          <p className="text-gray-300 text-sm">{quest.description}</p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex space-x-4 text-sm">
            <span className="text-yellow-400 font-semibold">
              ⚡ {quest.xpReward}
            </span>
            <span className="text-yellow-300 font-semibold">
              💰 {quest.gpReward}
            </span>
          </div>
          
          {quest.streak > 0 && (
            <div className="text-orange-400 text-sm font-semibold">
              🔥 {quest.streak}
            </div>
          )}
        </div>

        {!quest.completed && (
          <button
            onClick={onComplete}
            disabled={disabled}
            className="w-full bg-white text-gray-900 font-bold py-2 px-4 rounded-lg 
                     hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50
                     disabled:cursor-not-allowed"
          >
            Complete
          </button>
        )}
      </div>
    </div>
  );
} 