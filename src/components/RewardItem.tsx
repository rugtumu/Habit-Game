'use client';

import { Reward } from '../types/game';

interface RewardItemProps {
  reward: Reward;
  onPurchase: () => void;
  canAfford: boolean;
  disabled?: boolean;
}

export default function RewardItem({ reward, onPurchase, canAfford, disabled }: RewardItemProps) {
  const getCategoryColor = () => {
    switch (reward.category) {
      case 'low':
        return 'from-green-600 to-teal-600';
      case 'medium':
        return 'from-blue-600 to-purple-600';
      case 'high':
        return 'from-purple-600 to-pink-600';
      default:
        return 'from-gray-600 to-gray-700';
    }
  };

  const getCategoryBorder = () => {
    switch (reward.category) {
      case 'low':
        return 'border-green-500';
      case 'medium':
        return 'border-blue-500';
      case 'high':
        return 'border-purple-500';
      default:
        return 'border-gray-500';
    }
  };

  const getCategoryEmoji = () => {
    switch (reward.category) {
      case 'low':
        return '🎁';
      case 'medium':
        return '🏆';
      case 'high':
        return '💎';
      default:
        return '📦';
    }
  };

  return (
    <div className={`
      relative p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105
      ${reward.purchased 
        ? 'bg-gray-800 border-gray-600 opacity-50' 
        : `bg-gradient-to-br ${getCategoryColor()} ${getCategoryBorder()}`
      }
    `}>
      {reward.purchased && (
        <div className="absolute -top-2 -left-2 bg-green-500 text-white text-lg w-8 h-8 rounded-full flex items-center justify-center">
          ✓
        </div>
      )}

      <div className="space-y-3">
        <div className="text-center">
          <div className="text-3xl mb-2">{getCategoryEmoji()}</div>
          <h3 className="text-white font-bold text-lg">{reward.title}</h3>
          <p className="text-gray-300 text-sm">{reward.description}</p>
        </div>

        <div className="text-center">
          <div className="text-yellow-400 font-bold text-xl mb-2">
            💰 {reward.cost}
          </div>
        </div>

        {!reward.purchased && (
          <button
            onClick={onPurchase}
            disabled={disabled || !canAfford}
            className={`w-full font-bold py-2 px-4 rounded-lg transition-colors duration-200 
              ${canAfford && !disabled
                ? 'bg-white text-gray-900 hover:bg-gray-100' 
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
          >
            {canAfford ? 'Purchase' : 'Insufficient GP'}
          </button>
        )}
      </div>
    </div>
  );
} 