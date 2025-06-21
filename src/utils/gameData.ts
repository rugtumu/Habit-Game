import { Quest, Achievement, Reward } from '../types/game';

export const DEFAULT_DAILY_QUESTS: Omit<Quest, 'id' | 'completed' | 'completedAt' | 'streak' | 'maxStreak'>[] = [
  {
    title: "Morning Routine",
    description: "Complete your morning routine (shower, breakfast, etc.)",
    category: 'daily',
    xpReward: 5,
    gpReward: 3
  },
  {
    title: "Focused Work Block",
    description: "Complete a focused work session (1+ hours)",
    category: 'daily',
    xpReward: 7,
    gpReward: 4
  },
  {
    title: "Physical Exercise",
    description: "Complete at least 30 minutes of physical activity",
    category: 'daily',
    xpReward: 6,
    gpReward: 4
  },
  {
    title: "Healthy Meal Prep",
    description: "Prepare or cook a healthy meal",
    category: 'daily',
    xpReward: 4,
    gpReward: 2
  },
  {
    title: "Learning Time",
    description: "Spend 30+ minutes learning something new",
    category: 'daily',
    xpReward: 5,
    gpReward: 3
  },
  {
    title: "Digital Detox",
    description: "1 hour without social media or entertainment",
    category: 'daily',
    xpReward: 6,
    gpReward: 4
  },
  {
    title: "Organization Task",
    description: "Clean or organize part of your space",
    category: 'daily',
    xpReward: 4,
    gpReward: 2
  }
];

export const DEFAULT_WEEKLY_QUESTS: Omit<Quest, 'id' | 'completed' | 'completedAt' | 'streak' | 'maxStreak'>[] = [
  {
    title: "Project Milestone Boss",
    description: "Complete a major project milestone or deliverable",
    category: 'weekly',
    xpReward: 20,
    gpReward: 15,
    isBoss: true
  },
  {
    title: "Skill Development Boss",
    description: "Make significant progress on a skill you're developing",
    category: 'weekly',
    xpReward: 18,
    gpReward: 12,
    isBoss: true
  },
  {
    title: "Long-term Goal Boss",
    description: "Take meaningful action toward a long-term goal",
    category: 'weekly',
    xpReward: 22,
    gpReward: 18,
    isBoss: true
  },
  {
    title: "Weekly Planning Boss",
    description: "Complete weekly review and plan for next week",
    category: 'weekly',
    xpReward: 15,
    gpReward: 10,
    isBoss: true
  }
];

export const DEFAULT_MICRO_HABITS: Omit<Quest, 'id' | 'completed' | 'completedAt' | 'streak' | 'maxStreak'>[] = [
  {
    title: "Hydration Check",
    description: "Drink at least 8 glasses of water",
    category: 'micro',
    xpReward: 2,
    gpReward: 1
  },
  {
    title: "Vitamins & Supplements",
    description: "Take your daily vitamins or supplements",
    category: 'micro',
    xpReward: 1,
    gpReward: 1
  },
  {
    title: "Gratitude Journal",
    description: "Write down 3 things you're grateful for",
    category: 'micro',
    xpReward: 3,
    gpReward: 2
  },
  {
    title: "Step Goal",
    description: "Reach your daily step count goal",
    category: 'micro',
    xpReward: 2,
    gpReward: 1
  },
  {
    title: "Sleep Schedule",
    description: "Go to bed and wake up at consistent times",
    category: 'micro',
    xpReward: 3,
    gpReward: 2
  },
  {
    title: "Meditation",
    description: "Complete a brief meditation session (5+ min)",
    category: 'micro',
    xpReward: 3,
    gpReward: 2
  }
];

export const DEFAULT_ACHIEVEMENTS: Omit<Achievement, 'unlocked' | 'unlockedAt'>[] = [
  {
    id: 'first-quest',
    title: 'First Steps',
    description: 'Complete your first quest',
    icon: '🎯',
    requirement: { type: 'quests', value: 1 }
  },
  {
    id: 'week-warrior',
    title: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    requirement: { type: 'streak', value: 7 }
  },
  {
    id: 'month-master',
    title: 'Month Master',
    description: 'Maintain a 30-day streak',
    icon: '💪',
    requirement: { type: 'streak', value: 30 }
  },
  {
    id: 'century-champion',
    title: 'Century Champion',
    description: 'Maintain a 100-day streak',
    icon: '👑',
    requirement: { type: 'streak', value: 100 }
  },
  {
    id: 'level-5',
    title: 'Rising Star',
    description: 'Reach Level 5',
    icon: '⭐',
    requirement: { type: 'level', value: 5 }
  },
  {
    id: 'level-10',
    title: 'Experienced',
    description: 'Reach Level 10',
    icon: '🌟',
    requirement: { type: 'level', value: 10 }
  },
  {
    id: 'level-20',
    title: 'Master',
    description: 'Reach Level 20',
    icon: '💫',
    requirement: { type: 'level', value: 20 }
  },
  {
    id: 'boss-slayer',
    title: 'Boss Slayer',
    description: 'Complete your first boss battle',
    icon: '⚔️',
    requirement: { type: 'boss', value: 1 }
  },
  {
    id: 'quest-master',
    title: 'Quest Master',
    description: 'Complete 100 total quests',
    icon: '🏆',
    requirement: { type: 'quests', value: 100 }
  }
];

export const DEFAULT_REWARDS: Omit<Reward, 'purchased' | 'purchasedAt'>[] = [
  // Low-cost rewards (10-30 GP)
  {
    id: 'snack-treat',
    title: 'Favorite Snack',
    description: 'Treat yourself to your favorite snack',
    cost: 15,
    category: 'low'
  },
  {
    id: 'entertainment-time',
    title: 'Extra Entertainment',
    description: '2 hours of guilt-free entertainment',
    cost: 20,
    category: 'low'
  },
  {
    id: 'small-purchase',
    title: 'Small Purchase',
    description: 'Buy something small you\'ve been wanting',
    cost: 25,
    category: 'low'
  },
  {
    id: 'coffee-treat',
    title: 'Premium Coffee',
    description: 'Get your favorite coffee or drink',
    cost: 12,
    category: 'low'
  },
  
  // Medium rewards (40-75 GP)
  {
    id: 'movie-night',
    title: 'Movie Night Out',
    description: 'Go to the movies or have a special movie night',
    cost: 45,
    category: 'medium'
  },
  {
    id: 'hobby-time',
    title: 'Hobby Session',
    description: 'Dedicated time for your favorite hobby',
    cost: 40,
    category: 'medium'
  },
  {
    id: 'restaurant-meal',
    title: 'Restaurant Meal',
    description: 'Enjoy a meal at your favorite restaurant',
    cost: 60,
    category: 'medium'
  },
  {
    id: 'book-purchase',
    title: 'New Book/Game',
    description: 'Buy a book, game, or similar item you want',
    cost: 50,
    category: 'medium'
  },
  
  // High-value rewards (100+ GP)
  {
    id: 'big-purchase',
    title: 'Significant Purchase',
    description: 'Buy something meaningful you\'ve been saving for',
    cost: 150,
    category: 'high'
  },
  {
    id: 'day-off',
    title: 'Full Day Off',
    description: 'Take a complete day off from responsibilities',
    cost: 120,
    category: 'high'
  },
  {
    id: 'experience',
    title: 'Special Experience',
    description: 'Concert, event, or special activity',
    cost: 200,
    category: 'high'
  },
  {
    id: 'weekend-getaway',
    title: 'Weekend Adventure',
    description: 'Plan a weekend trip or special outing',
    cost: 300,
    category: 'high'
  }
]; 