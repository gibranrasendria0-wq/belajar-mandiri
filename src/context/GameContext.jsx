import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  getFromStorage,
  saveToStorage,
  resetAllStorage,
  STORAGE_KEYS,
  DEFAULT_PROFILE,
  DEFAULT_SETTINGS,
} from '../lib/storage';
import { calculateLevelInfo, XP_RULES } from '../lib/xp';
import { recordStreakActivity } from '../lib/streak';
import { ensureDailyQuests, processQuestProgress } from '../lib/quests';
import { ALL_ACHIEVEMENTS, evaluateAchievements } from '../lib/achievements';
import { playSound } from '../lib/sound';

const GameContext = createContext();

export function GameProvider({ children }) {
  // 1. Core Profile
  const [profile, setProfileState] = useState(() =>
    getFromStorage(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE)
  );

  // 2. XP & Level
  const [totalXp, setTotalXpState] = useState(() =>
    getFromStorage(STORAGE_KEYS.XP, 0)
  );

  // 3. Learning Streak
  const [streak, setStreakState] = useState(() =>
    getFromStorage(STORAGE_KEYS.STREAK, { count: 0, lastActiveDate: null, longestStreak: 0 })
  );

  // 4. Daily Quests
  const [dailyQuests, setDailyQuestsState] = useState(() => {
    const raw = getFromStorage(STORAGE_KEYS.QUESTS, null);
    return ensureDailyQuests(raw);
  });

  // 5. Completed Lessons
  const [completedLessons, setCompletedLessonsState] = useState(() =>
    getFromStorage(STORAGE_KEYS.COMPLETED_LESSONS, [])
  );

  // 6. Quiz History
  const [quizHistory, setQuizHistoryState] = useState(() =>
    getFromStorage(STORAGE_KEYS.QUIZ_HISTORY, [])
  );

  // 7. Achievements
  const [unlockedAchievements, setUnlockedAchievementsState] = useState(() =>
    getFromStorage(STORAGE_KEYS.ACHIEVEMENTS, [])
  );

  // 8. Settings
  const [settings, setSettingsState] = useState(() =>
    getFromStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS)
  );

  // 9. UI Toasts & Level Up Modal
  const [toasts, setToasts] = useState([]);
  const [levelUpData, setLevelUpData] = useState(null);

  // Save changes to storage
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.PROFILE, profile);
  }, [profile]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.XP, totalXp);
  }, [totalXp]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.STREAK, streak);
  }, [streak]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.QUESTS, dailyQuests);
  }, [dailyQuests]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.COMPLETED_LESSONS, completedLessons);
  }, [completedLessons]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.QUIZ_HISTORY, quizHistory);
  }, [quizHistory]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.ACHIEVEMENTS, unlockedAchievements);
  }, [unlockedAchievements]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.SETTINGS, settings);
  }, [settings]);

  // Derived level calculation
  const levelInfo = useMemo(() => calculateLevelInfo(totalXp), [totalXp]);

  // Toast helper
  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    const newToast = { id, ...toast };
    setToasts((prev) => [newToast, ...prev].slice(0, 5));

    // Auto dismiss after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Play audio safely
  const triggerSound = useCallback((type) => {
    if (settings?.soundEnabled) {
      playSound(type, true);
    }
  }, [settings?.soundEnabled]);

  // Trigger celebration confetti
  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366F1', '#06B6D4', '#10B981', '#F59E0B'],
      });
    } catch {
      // Confetti fallback
    }
  }, []);

  // Achievement evaluator
  const checkAchievements = useCallback((statsOverride = {}) => {
    const stats = {
      level: levelInfo.level,
      totalXp,
      quizzesCompleted: quizHistory.length,
      lessonsCompletedCount: completedLessons.length,
      longestStreak: streak.longestStreak,
      hasPerfectScore: quizHistory.some((q) => q.accuracy === 100),
      totalQuestionsAnswered: quizHistory.reduce((acc, q) => acc + (q.totalQuestions || 0), 0),
      distinctCategoriesLearned: new Set(completedLessons.map((l) => l.category || 'general')).size,
      ...statsOverride,
    };

    const alreadyUnlockedIds = unlockedAchievements.map((a) => a.id);
    const newlyUnlocked = evaluateAchievements(stats, alreadyUnlockedIds);

    if (newlyUnlocked.length > 0) {
      const now = new Date().toISOString();
      const records = newlyUnlocked.map((ach) => ({
        id: ach.id,
        unlockedAt: now,
      }));

      setUnlockedAchievementsState((prev) => [...prev, ...records]);

      newlyUnlocked.forEach((ach) => {
        addToast({
          type: 'achievement',
          title: 'Badge Baru Terbuka!',
          message: `${ach.title} — ${ach.description}`,
          rewardXp: ach.xpReward,
        });
        if (ach.xpReward) {
          setTotalXpState((xp) => xp + ach.xpReward);
        }
      });

      triggerSound('levelup');
      triggerConfetti();
    }
  }, [levelInfo.level, totalXp, quizHistory, completedLessons, streak.longestStreak, unlockedAchievements, addToast, triggerSound, triggerConfetti]);

  // Add XP with automatic Level Up check
  const addXp = useCallback((amount, reason = '') => {
    if (!amount || amount <= 0) return;

    setTotalXpState((prevXp) => {
      const nextXp = prevXp + amount;
      const prevLvl = calculateLevelInfo(prevXp).level;
      const nextLvl = calculateLevelInfo(nextXp).level;

      if (nextLvl > prevLvl) {
        // Level up event!
        setLevelUpData({
          oldLevel: prevLvl,
          newLevel: nextLvl,
          title: calculateLevelInfo(nextXp).title,
        });
        triggerSound('levelup');
        triggerConfetti();
        addToast({
          type: 'levelup',
          title: 'LEVEL UP!',
          message: `Selamat! Kamu berhasil naik ke Level ${nextLvl}!`,
        });
      } else {
        triggerSound('click');
      }

      addToast({
        type: 'xp',
        title: `+${amount} XP`,
        message: reason || 'Aktivitas pembelajaran selesai!',
      });

      return nextXp;
    });
  }, [triggerSound, triggerConfetti, addToast]);

  // Mark Lesson as Completed
  const completeLesson = useCallback((lessonId, category = 'matematika', title = 'Materi') => {
    const isAlreadyCompleted = completedLessons.some((item) =>
      typeof item === 'string' ? item === lessonId : item.id === lessonId
    );

    if (isAlreadyCompleted) {
      addToast({
        type: 'info',
        title: 'Materi Telah Dipelajari',
        message: 'Materi ini sudah ditandai selesai sebelumnya.',
      });
      return false;
    }

    const lessonRecord = {
      id: lessonId,
      category,
      title,
      completedAt: new Date().toISOString(),
    };

    setCompletedLessonsState((prev) => [...prev, lessonRecord]);

    // Update streak
    setStreakState((prev) => {
      const updated = recordStreakActivity(prev);
      if (updated.streakIncreased) {
        addToast({
          type: 'streak',
          title: 'Streak Belajar Diperbarui!',
          message: `🔥 Streak aktif: ${updated.count} hari berturut-turut!`,
        });
      }
      return updated;
    });

    // Update daily quests
    setDailyQuestsState((prev) => {
      const res = processQuestProgress(prev, { type: 'lesson_completed' });
      return res;
    });

    // Award XP
    addXp(XP_RULES.COMPLETE_LESSON, `Menyelesaikan materi: ${title}`);

    // Check achievements
    setTimeout(() => {
      checkAchievements({
        lessonsCompletedCount: completedLessons.length + 1,
      });
    }, 200);

    triggerSound('complete');
    return true;
  }, [completedLessons, addToast, addXp, checkAchievements, triggerSound]);

  // Record Quiz Result (Called once per quiz completion session)
  const recordQuizResult = useCallback((quizResult) => {
    const sessionRecord = {
      id: quizResult.sessionId || 'quiz-' + Date.now(),
      category: quizResult.category,
      difficulty: quizResult.difficulty,
      totalQuestions: quizResult.totalQuestions,
      correctCount: quizResult.correctCount,
      accuracy: quizResult.accuracy,
      score: quizResult.score,
      xpEarned: quizResult.xpEarned,
      timeSpentSeconds: quizResult.timeSpentSeconds || 0,
      completedAt: new Date().toISOString(),
    };

    setQuizHistoryState((prev) => [sessionRecord, ...prev]);

    // Update streak
    setStreakState((prev) => {
      const updated = recordStreakActivity(prev);
      if (updated.streakIncreased) {
        addToast({
          type: 'streak',
          title: 'Streak Diperbarui!',
          message: `🔥 ${updated.count} hari streak aktif!`,
        });
      }
      return updated;
    });

    // Update quests
    setDailyQuestsState((prev) => {
      return processQuestProgress(prev, {
        type: 'quiz_completed',
        questionCount: quizResult.totalQuestions,
        accuracy: quizResult.accuracy,
      });
    });

    // Add XP earned from this specific quiz session
    if (quizResult.xpEarned > 0) {
      addXp(quizResult.xpEarned, `Kuis ${quizResult.category} (${quizResult.accuracy}% akurat)`);
    }

    // Check achievements
    setTimeout(() => {
      checkAchievements({
        quizzesCompleted: quizHistory.length + 1,
        hasPerfectScore: quizResult.accuracy === 100 || quizHistory.some((q) => q.accuracy === 100),
        totalQuestionsAnswered: quizHistory.reduce((acc, q) => acc + (q.totalQuestions || 0), 0) + quizResult.totalQuestions,
      });
    }, 300);

    triggerSound('complete');
    if (quizResult.accuracy >= 80) {
      triggerConfetti();
    }
  }, [quizHistory, addToast, addXp, checkAchievements, triggerSound, triggerConfetti]);

  // Claim Daily Quest Reward
  const claimQuestReward = useCallback((questId) => {
    setDailyQuestsState((prev) => {
      const safe = ensureDailyQuests(prev);
      const targetQuest = safe.quests.find((q) => q.id === questId);

      if (!targetQuest || targetQuest.claimed || !targetQuest.completed) {
        return safe;
      }

      const updatedQuests = safe.quests.map((q) => {
        if (q.id === questId) {
          return { ...q, claimed: true };
        }
        return q;
      });

      addXp(targetQuest.rewardXp, `Misi Harian: ${targetQuest.title}`);
      triggerSound('correct');

      return {
        date: safe.date,
        quests: updatedQuests,
      };
    });
  }, [addXp, triggerSound]);

  // Update Profile
  const updateProfile = useCallback((updates) => {
    setProfileState((prev) => ({ ...prev, ...updates }));
    addToast({
      type: 'success',
      title: 'Profil Diperbarui',
      message: 'Perubahan profil berhasil disimpan.',
    });
    triggerSound('select');
  }, [addToast, triggerSound]);

  // Update Settings
  const updateSettings = useCallback((updates) => {
    setSettingsState((prev) => ({ ...prev, ...updates }));
    addToast({
      type: 'success',
      title: 'Pengaturan Disimpan',
      message: 'Preferensi berhasil diperbarui.',
    });
    triggerSound('select');
  }, [addToast, triggerSound]);

  // Reset Progress
  const resetAllProgress = useCallback(() => {
    resetAllStorage();
    setProfileState(DEFAULT_PROFILE);
    setTotalXpState(0);
    setStreakState({ count: 0, lastActiveDate: null, longestStreak: 0 });
    setDailyQuestsState(ensureDailyQuests(null));
    setCompletedLessonsState([]);
    setQuizHistoryState([]);
    setUnlockedAchievementsState([]);
    setSettingsState(DEFAULT_SETTINGS);
    setToasts([]);
    setLevelUpData(null);

    addToast({
      type: 'info',
      title: 'Progres Direset',
      message: 'Semua riwayat dan data telah dikembalikan ke kondisi awal.',
    });
  }, [addToast]);

  return (
    <GameContext.Provider
      value={{
        profile,
        totalXp,
        levelInfo,
        streak,
        dailyQuests,
        completedLessons,
        quizHistory,
        unlockedAchievements,
        allAchievements: ALL_ACHIEVEMENTS,
        settings,
        toasts,
        levelUpData,
        // Actions
        addXp,
        completeLesson,
        recordQuizResult,
        claimQuestReward,
        updateProfile,
        updateSettings,
        resetAllProgress,
        dismissToast,
        dismissLevelUpModal: () => setLevelUpData(null),
        triggerSound,
        triggerConfetti,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}
