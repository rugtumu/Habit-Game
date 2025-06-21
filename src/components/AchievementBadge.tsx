'use client';

import { Achievement } from '../types/game';

interface AchievementBadgeProps {
  achievement: Achievement;
}

export default function AchievementBadge({ achievement }: AchievementBadgeProps) {
  return (
    <div className={`
      p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105
      ${achievement.unlocked 
        ? 'bg-gradient-to-br from-yellow-600 to-orange-600 border-yellow-400' 
        : 'bg-gray-800 border-gray-600 opacity-60'
      }
    `}>
      <div className="text-center space-y-2">
        <div className="text-4xl mb-2">{achievement.icon}</div>
        <h3 className={`font-bold text-lg ${achievement.unlocked ? 'text-white' : 'text-gray-400'}`}>
          {achievement.title}
        </h3>
        <p className={`text-sm ${achievement.unlocked ? 'text-yellow-100' : 'text-gray-500'}`}>
          {achievement.description}
        </p>
        
        {achievement.unlocked && achievement.unlockedAt && (
          <div className="text-xs text-yellow-200 mt-2">
            Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
          </div>
        )}
        
        {!achievement.unlocked && (
          <div className="text-xs text-gray-400 mt-2">
            {achievement.requirement.type === 'streak' && `Reach ${achievement.requirement.value}-day streak`}
            {achievement.requirement.type === 'level' && `Reach Level ${achievement.requirement.value}`}
            {achievement.requirement.type === 'quests' && `Complete ${achievement.requirement.value} quests`}
            {achievement.requirement.type === 'boss' && `Complete ${achievement.requirement.value} boss battle${achievement.requirement.value > 1 ? 's' : ''}`}
          </div>
        )}
      </div>
    </div>
  );
} 