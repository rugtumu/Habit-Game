export interface Player {
  id: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  goldPoints: number;
  totalXpEarned: number;
  totalQuestsCompleted: number;
  createdAt: string;
  lastLoginDate: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  category: 'daily' | 'weekly' | 'micro';
  xpReward: number;
  gpReward: number;
  completed: boolean;
  completedAt?: string;
  streak: number;
  maxStreak: number;
  isBoss?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  requirement: {
    type: 'streak' | 'level' | 'quests' | 'boss';
    value: number;
    questId?: string;
  };
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  cost: number;
  category: 'low' | 'medium' | 'high';
  purchased: boolean;
  purchasedAt?: string;
}

export interface GameState {
  player: Player;
  dailyQuests: Quest[];
  weeklyQuests: Quest[];
  microHabits: Quest[];
  achievements: Achievement[];
  rewards: Reward[];
  lastResetDate: string;
  settings: {
    soundEnabled: boolean;
    darkMode: boolean;
  };
}

export interface TabType {
  id: 'dashboard' | 'daily' | 'weekly' | 'habits' | 'achievements' | 'shop' | 'stats';
  name: string;
  icon: string;
} 