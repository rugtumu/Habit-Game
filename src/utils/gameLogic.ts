import { Player, Quest, Achievement, GameState } from '../types/game';

export function calculateXpForLevel(level: number): number {
  // Each level requires ~20% more XP than the previous
  const baseXp = 100;
  return Math.floor(baseXp * Math.pow(1.2, level - 1));
}

export function calculateLevelFromXp(totalXp: number): { level: number; currentLevelXp: number; xpToNextLevel: number } {
  let level = 1;
  let xpUsed = 0;
  
  while (true) {
    const xpForCurrentLevel = calculateXpForLevel(level);
    if (xpUsed + xpForCurrentLevel > totalXp) {
      const currentLevelXp = totalXp - xpUsed;
      const xpToNextLevel = xpForCurrentLevel - currentLevelXp;
      return { level, currentLevelXp, xpToNextLevel };
    }
    xpUsed += xpForCurrentLevel;
    level++;
  }
}

export function addXpToPlayer(player: Player, xpGained: number): Player {
  const newTotalXp = player.totalXpEarned + xpGained;
  const { level, currentLevelXp, xpToNextLevel } = calculateLevelFromXp(newTotalXp);
  
  return {
    ...player,
    xp: currentLevelXp,
    level,
    xpToNextLevel,
    totalXpEarned: newTotalXp
  };
}

export function completeQuest(quest: Quest): Quest {
  const now = new Date().toISOString();
  const completed = {
    ...quest,
    completed: true,
    completedAt: now
  };

  // Update streak logic
  const lastCompleted = quest.completedAt ? new Date(quest.completedAt) : null;
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (!lastCompleted || isSameDay(lastCompleted, yesterday)) {
    completed.streak = quest.streak + 1;
    completed.maxStreak = Math.max(completed.streak, quest.maxStreak);
  } else if (!isSameDay(lastCompleted, today)) {
    completed.streak = 1;
  }

  return completed;
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
}

export function shouldResetDaily(lastResetDate: string): boolean {
  const lastReset = new Date(lastResetDate);
  const now = new Date();
  return !isSameDay(lastReset, now);
}

export function resetDailyQuests(quests: Quest[]): Quest[] {
  return quests.map(quest => ({
    ...quest,
    completed: false,
    completedAt: undefined
  }));
}

export function checkAchievements(gameState: GameState): Achievement[] {
  const unlockedAchievements: Achievement[] = [];
  
  gameState.achievements.forEach(achievement => {
    if (achievement.unlocked) return;
    
    let shouldUnlock = false;
    
    switch (achievement.requirement.type) {
      case 'level':
        shouldUnlock = gameState.player.level >= achievement.requirement.value;
        break;
      case 'quests':
        shouldUnlock = gameState.player.totalQuestsCompleted >= achievement.requirement.value;
        break;
      case 'streak':
        const maxStreak = Math.max(
          ...gameState.dailyQuests.map(q => q.maxStreak),
          ...gameState.weeklyQuests.map(q => q.maxStreak),
          ...gameState.microHabits.map(q => q.maxStreak)
        );
        shouldUnlock = maxStreak >= achievement.requirement.value;
        break;
      case 'boss':
        const bossCompletions = [...gameState.weeklyQuests]
          .filter(q => q.isBoss && q.completed).length;
        shouldUnlock = bossCompletions >= achievement.requirement.value;
        break;
    }
    
    if (shouldUnlock) {
      achievement.unlocked = true;
      achievement.unlockedAt = new Date().toISOString();
      unlockedAchievements.push(achievement);
    }
  });
  
  return unlockedAchievements;
}

export function generateQuestId(): string {
  return Math.random().toString(36).substr(2, 9);
}

export function getQuestsByCategory(gameState: GameState, category: 'daily' | 'weekly' | 'micro'): Quest[] {
  switch (category) {
    case 'daily':
      return gameState.dailyQuests;
    case 'weekly':
      return gameState.weeklyQuests;
    case 'micro':
      return gameState.microHabits;
    default:
      return [];
  }
}

export function calculateCompletionRate(quests: Quest[]): number {
  if (quests.length === 0) return 0;
  const completed = quests.filter(q => q.completed).length;
  return Math.round((completed / quests.length) * 100);
} 