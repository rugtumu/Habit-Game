'use client';

import { useState, useEffect, useCallback } from 'react';
import { GameState, Player, Quest, Achievement, Reward } from '../types/game';
import { 
  DEFAULT_DAILY_QUESTS, 
  DEFAULT_WEEKLY_QUESTS, 
  DEFAULT_MICRO_HABITS, 
  DEFAULT_ACHIEVEMENTS, 
  DEFAULT_REWARDS 
} from '../utils/gameData';
import { 
  addXpToPlayer, 
  completeQuest, 
  shouldResetDaily, 
  resetDailyQuests, 
  checkAchievements, 
  generateQuestId 
} from '../utils/gameLogic';

const STORAGE_KEY = 'habit-game-state';

function createInitialGameState(): GameState {
  const now = new Date().toISOString();
  
  const player: Player = {
    id: generateQuestId(),
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    goldPoints: 0,
    totalXpEarned: 0,
    totalQuestsCompleted: 0,
    createdAt: now,
    lastLoginDate: now
  };

  const dailyQuests: Quest[] = DEFAULT_DAILY_QUESTS.map(quest => ({
    ...quest,
    id: generateQuestId(),
    completed: false,
    streak: 0,
    maxStreak: 0
  }));

  const weeklyQuests: Quest[] = DEFAULT_WEEKLY_QUESTS.map(quest => ({
    ...quest,
    id: generateQuestId(),
    completed: false,
    streak: 0,
    maxStreak: 0
  }));

  const microHabits: Quest[] = DEFAULT_MICRO_HABITS.map(quest => ({
    ...quest,
    id: generateQuestId(),
    completed: false,
    streak: 0,
    maxStreak: 0
  }));

  const achievements: Achievement[] = DEFAULT_ACHIEVEMENTS.map(achievement => ({
    ...achievement,
    unlocked: false
  }));

  const rewards: Reward[] = DEFAULT_REWARDS.map(reward => ({
    ...reward,
    purchased: false
  }));

  return {
    player,
    dailyQuests,
    weeklyQuests,
    microHabits,
    achievements,
    rewards,
    lastResetDate: now,
    settings: {
      soundEnabled: true,
      darkMode: true
    }
  };
}

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(() => createInitialGameState());
  const [isLoading, setIsLoading] = useState(true);

  // Load game state from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setGameState(parsed);
      }
    } catch (error) {
      console.error('Failed to load game state:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save game state to localStorage
  const saveGameState = useCallback((state: GameState) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error('Failed to save game state:', error);
    }
  }, []);

  // Check for daily reset
  useEffect(() => {
    if (isLoading) return;

    const checkDailyReset = () => {
      if (shouldResetDaily(gameState.lastResetDate)) {
        setGameState(prevState => {
          const newState = {
            ...prevState,
            dailyQuests: resetDailyQuests(prevState.dailyQuests),
            microHabits: resetDailyQuests(prevState.microHabits),
            lastResetDate: new Date().toISOString(),
            player: {
              ...prevState.player,
              lastLoginDate: new Date().toISOString()
            }
          };
          saveGameState(newState);
          return newState;
        });
      }
    };

    checkDailyReset();
  }, [gameState.lastResetDate, isLoading, saveGameState]);

  const completeQuestById = useCallback((questId: string, category: 'daily' | 'weekly' | 'micro') => {
    setGameState(prevState => {
      const questArray = category === 'daily' ? 'dailyQuests' : 
                        category === 'weekly' ? 'weeklyQuests' : 'microHabits';
      
      const questIndex = prevState[questArray].findIndex(q => q.id === questId);
      if (questIndex === -1 || prevState[questArray][questIndex].completed) {
        return prevState;
      }

      const quest = prevState[questArray][questIndex];
      const completedQuest = completeQuest(quest);
      
      // Update player stats
      const updatedPlayer = addXpToPlayer(prevState.player, quest.xpReward);
      updatedPlayer.goldPoints += quest.gpReward;
      updatedPlayer.totalQuestsCompleted += 1;

      const newQuests = [...prevState[questArray]];
      newQuests[questIndex] = completedQuest;

      const newState = {
        ...prevState,
        [questArray]: newQuests,
        player: updatedPlayer
      };

      // Check for new achievements
      const newAchievements = checkAchievements(newState);
      if (newAchievements.length > 0) {
        // Could trigger notification here
        console.log('New achievements unlocked:', newAchievements);
      }

      saveGameState(newState);
      return newState;
    });
  }, [saveGameState]);

  const purchaseReward = useCallback((rewardId: string) => {
    setGameState(prevState => {
      const rewardIndex = prevState.rewards.findIndex(r => r.id === rewardId);
      if (rewardIndex === -1) return prevState;

      const reward = prevState.rewards[rewardIndex];
      if (reward.purchased || prevState.player.goldPoints < reward.cost) {
        return prevState;
      }

      const updatedRewards = [...prevState.rewards];
      updatedRewards[rewardIndex] = {
        ...reward,
        purchased: true,
        purchasedAt: new Date().toISOString()
      };

      const newState = {
        ...prevState,
        rewards: updatedRewards,
        player: {
          ...prevState.player,
          goldPoints: prevState.player.goldPoints - reward.cost
        }
      };

      saveGameState(newState);
      return newState;
    });
  }, [saveGameState]);

  const updateSettings = useCallback((settings: Partial<GameState['settings']>) => {
    setGameState(prevState => {
      const newState = {
        ...prevState,
        settings: {
          ...prevState.settings,
          ...settings
        }
      };
      saveGameState(newState);
      return newState;
    });
  }, [saveGameState]);

  const resetGame = useCallback(() => {
    const newState = createInitialGameState();
    setGameState(newState);
    saveGameState(newState);
  }, [saveGameState]);

  return {
    gameState,
    isLoading,
    completeQuest: completeQuestById,
    purchaseReward,
    updateSettings,
    resetGame
  };
} 