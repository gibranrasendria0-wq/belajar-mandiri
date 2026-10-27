import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  getFromStorage,
  saveToStorage,
  resetAllStorage,
  STORAGE_KEYS,
  DEFAULT_PROFILE,
  DEFAULT_SETTINGS,
  getAllUsers,
  getUserByEmail,
  saveUserRecord,
  deleteUserRecord,
  getActiveUserEmail,
  setActiveUserEmail,
} from '../lib/storage';
import { calculateLevelInfo, XP_RULES } from '../lib/xp';
import { recordStreakActivity } from '../lib/streak';
import { ensureDailyQuests, processQuestProgress } from '../lib/quests';
import { ALL_ACHIEVEMENTS, evaluateAchievements } from '../lib/achievements';
import { playSound } from '../lib/sound';

const GameContext = createContext();

export function GameProvider({ children }) {
  // Check active user session on boot
  const initialActiveEmail = getActiveUserEmail();
  const initialUserRecord = initialActiveEmail ? getUserByEmail(initialActiveEmail) : null;

  // 1. Core Profile
  const [profile, setProfileState] = useState(() => {
    if (initialUserRecord?.profile) {
      return { ...DEFAULT_PROFILE, ...initialUserRecord.profile, email: initialActiveEmail };
    }
    const saved = getFromStorage(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE);
    return { ...DEFAULT_PROFILE, ...saved };
  });

  // 2. XP & Level
  const [totalXp, setTotalXpState] = useState(() => {
    if (initialUserRecord?.totalXp !== undefined) return initialUserRecord.totalXp;
    return getFromStorage(STORAGE_KEYS.XP, 0);
  });

  // 3. Learning Streak
  const [streak, setStreakState] = useState(() => {
    if (initialUserRecord?.streak) return initialUserRecord.streak;
    return getFromStorage(STORAGE_KEYS.STREAK, { count: 0, lastActiveDate: null, longestStreak: 0 });
  });

  // 4. Daily Quests
  const [dailyQuests, setDailyQuestsState] = useState(() => {
    const raw = initialUserRecord?.quests || getFromStorage(STORAGE_KEYS.QUESTS, null);
    return ensureDailyQuests(raw);
  });

  // 5. Completed Lessons
  const [completedLessons, setCompletedLessonsState] = useState(() => {
    if (initialUserRecord?.completedLessons) return initialUserRecord.completedLessons;
    return getFromStorage(STORAGE_KEYS.COMPLETED_LESSONS, []);
  });

  // 6. Quiz History
  const [quizHistory, setQuizHistoryState] = useState(() => {
    if (initialUserRecord?.quizHistory) return initialUserRecord.quizHistory;
    return getFromStorage(STORAGE_KEYS.QUIZ_HISTORY, []);
  });

  // 7. Achievements
  const [unlockedAchievements, setUnlockedAchievementsState] = useState(() => {
    if (initialUserRecord?.achievements) return initialUserRecord.achievements;
    return getFromStorage(STORAGE_KEYS.ACHIEVEMENTS, []);
  });

  // 8. Settings
  const [settings, setSettingsState] = useState(() => {
    if (initialUserRecord?.settings) return initialUserRecord.settings;
    return getFromStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  });

  // 9. Bookmarks (Saved Lessons & Questions)
  const [bookmarks, setBookmarksState] = useState(() => {
    if (initialUserRecord?.bookmarks) return initialUserRecord.bookmarks;
    return getFromStorage(STORAGE_KEYS.BOOKMARKS, { lessons: [], questions: [] });
  });

  // 10. All saved accounts on this device
  const [savedAccounts, setSavedAccounts] = useState(() => getAllUsers());

  // 11. UI Toasts & Level Up Modal
  const [toasts, setToasts] = useState([]);
  const [levelUpData, setLevelUpData] = useState(null);

  // Sync saved accounts list from storage
  const refreshSavedAccounts = useCallback(() => {
    setSavedAccounts(getAllUsers());
  }, []);

  // Save changes to current storage keys and account record
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.PROFILE, profile);
    if (profile?.email) {
      saveUserRecord({
        email: profile.email,
        profile: {
          name: profile.name,
          avatarId: profile.avatarId,
          avatarUrl: profile.avatarUrl,
          bio: profile.bio,
          joinedDate: profile.joinedDate,
        },
        totalXp,
        streak,
        quests: dailyQuests,
        completedLessons,
        quizHistory,
        achievements: unlockedAchievements,
        settings,
        bookmarks,
      });
    }
  }, [profile, totalXp, streak, dailyQuests, completedLessons, quizHistory, unlockedAchievements, settings, bookmarks]);

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

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.BOOKMARKS, bookmarks);
  }, [bookmarks]);

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

  // Update Profile (name, bio, avatarId, avatarUrl)
  const updateProfile = useCallback((updates) => {
    setProfileState((prev) => {
      const next = { ...prev, ...updates };
      // Save directly to user record if email is tied
      if (next.email) {
        saveUserRecord({
          email: next.email,
          profile: next,
        });
      }
      return next;
    });
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

  // Toggle Bookmark Lesson
  const toggleBookmarkLesson = useCallback((lessonId) => {
    if (!lessonId) return false;
    let isAdded = false;
    setBookmarksState((prev) => {
      const prevLessons = prev?.lessons || [];
      const exists = prevLessons.includes(lessonId);
      isAdded = !exists;
      return {
        ...prev,
        lessons: exists ? prevLessons.filter((id) => id !== lessonId) : [...prevLessons, lessonId],
      };
    });
    addToast({
      type: isAdded ? 'success' : 'info',
      title: isAdded ? 'Materi Disimpan' : 'Bookmark Dihapus',
      message: isAdded ? 'Materi berhasil ditambahkan ke daftar simpanan.' : 'Materi dihapus dari simpanan.',
    });
    triggerSound('select');
    return isAdded;
  }, [addToast, triggerSound]);

  // Toggle Bookmark Question
  const toggleBookmarkQuestion = useCallback((question) => {
    if (!question || !question.id) return false;
    let isAdded = false;
    setBookmarksState((prev) => {
      const prevQuestions = prev?.questions || [];
      const exists = prevQuestions.some((q) => q.id === question.id);
      isAdded = !exists;
      return {
        ...prev,
        questions: exists ? prevQuestions.filter((q) => q.id !== question.id) : [...prevQuestions, question],
      };
    });
    addToast({
      type: isAdded ? 'success' : 'info',
      title: isAdded ? 'Soal Disimpan' : 'Bookmark Soal Dihapus',
      message: isAdded ? 'Soal berhasil disimpan untuk dipelajari kembali.' : 'Soal dihapus dari bookmark.',
    });
    triggerSound('select');
    return isAdded;
  }, [addToast, triggerSound]);

  // Export User Progress Data as JSON
  const exportUserData = useCallback(() => {
    const data = {
      exportVersion: '1.0',
      exportedAt: new Date().toISOString(),
      profile,
      totalXp,
      streak,
      dailyQuests,
      completedLessons,
      quizHistory,
      unlockedAchievements,
      settings,
      bookmarks,
    };
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeName = (profile.name || 'player').replace(/[^a-zA-Z0-9_-]/g, '_');
    link.href = url;
    link.download = `edugaming_backup_${safeName}_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    addToast({
      type: 'success',
      title: 'Progres Berhasil Diekspor',
      message: 'Berkas cadangan JSON berhasil diunduh ke perangkat Anda.',
    });
    triggerSound('correct');
  }, [profile, totalXp, streak, dailyQuests, completedLessons, quizHistory, unlockedAchievements, settings, bookmarks, addToast, triggerSound]);

  // Import User Progress Data from JSON
  const importUserData = useCallback((jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object') {
        throw new Error('Format berkas tidak valid.');
      }

      if (parsed.profile) setProfileState(parsed.profile);
      if (typeof parsed.totalXp === 'number') setTotalXpState(parsed.totalXp);
      if (parsed.streak) setStreakState(parsed.streak);
      if (parsed.dailyQuests) setDailyQuestsState(ensureDailyQuests(parsed.dailyQuests));
      if (Array.isArray(parsed.completedLessons)) setCompletedLessonsState(parsed.completedLessons);
      if (Array.isArray(parsed.quizHistory)) setQuizHistoryState(parsed.quizHistory);
      if (Array.isArray(parsed.unlockedAchievements)) setUnlockedAchievementsState(parsed.unlockedAchievements);
      if (parsed.settings) setSettingsState(parsed.settings);
      if (parsed.bookmarks) setBookmarksState(parsed.bookmarks);

      addToast({
        type: 'success',
        title: 'Pemulihan Berhasil!',
        message: 'Semua data progres belajar Anda telah berhasil dipulihkan.',
      });
      triggerSound('levelup');
      triggerConfetti();
      return true;
    } catch (err) {
      console.error('[EduGaming] Import error:', err);
      addToast({
        type: 'error',
        title: 'Gagal Memuat Berkas',
        message: 'Format berkas JSON tidak sesuai atau rusak. Pastikan berkas berasal dari ekspor EduGaming.',
      });
      return false;
    }
  }, [addToast, triggerSound, triggerConfetti]);

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
    setSavedAccounts({});
    setToasts([]);
    setLevelUpData(null);

    addToast({
      type: 'info',
      title: 'Progres Direset',
      message: 'Semua riwayat dan data telah dikembalikan ke kondisi awal.',
    });
  }, [addToast]);

  // -------------------------------------------------------------
  // Authentication & Multi-Account Functions
  // -------------------------------------------------------------

  /**
   * Login or Register with email
   * isRegister = false: Login (cek apakah akun ada, cek password cocok)
   * isRegister = true: Register (buat akun baru, cek apakah email sudah dipakai)
   */
  const loginWithEmail = useCallback((email, { name = '', password = '', avatarUrl = null, avatarId = 'cyber-ninja', bio = '', isRegister = false } = {}) => {
    if (!email || !email.trim()) {
      addToast({
        type: 'error',
        title: 'Email Wajib Diisi',
        message: 'Silakan masukkan alamat email Anda.',
      });
      return { success: false, message: 'Email wajib diisi' };
    }

    const cleanEmail = email.trim().toLowerCase();
    // Validasi format email sederhana dan terpercaya
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      addToast({
        type: 'error',
        title: 'Format Email Tidak Valid',
        message: 'Gunakan format email yang benar (contoh: user@example.com).',
      });
      return { success: false, message: 'Format email tidak valid' };
    }

    const existing = getUserByEmail(cleanEmail);

    // MODE REGISTER
    if (isRegister) {
      if (existing) {
        addToast({
          type: 'error',
          title: 'Email Sudah Terdaftar',
          message: 'Akun dengan email ini sudah ada. Silakan masuk menggunakan kata sandi Anda.',
        });
        return { success: false, message: 'Email sudah terdaftar' };
      }

      if (!password || !password.trim()) {
        addToast({
          type: 'error',
          title: 'Kata Sandi Wajib Diisi',
          message: 'Silakan buat kata sandi untuk mengamankan akun Anda.',
        });
        return { success: false, message: 'Kata sandi wajib diisi' };
      }

      if (password.length < 4) {
        addToast({
          type: 'error',
          title: 'Kata Sandi Terlalu Pendek',
          message: 'Kata sandi minimal terdiri dari 4 karakter.',
        });
        return { success: false, message: 'Kata sandi terlalu pendek' };
      }

      // Buat akun baru
      const defaultName = name.trim() || cleanEmail.split('@')[0];
      const newUserRecord = {
        email: cleanEmail,
        password: password,
        profile: {
          email: cleanEmail,
          name: defaultName,
          avatarId: avatarId || 'cyber-ninja',
          avatarUrl: avatarUrl || null,
          bio: bio.trim() || 'Siap menaklukkan pengetahuan dan naik level setiap hari!',
          joinedDate: new Date().toISOString(),
        },
        totalXp: 0,
        streak: { count: 0, lastActiveDate: null, longestStreak: 0 },
        quests: ensureDailyQuests(null),
        completedLessons: [],
        quizHistory: [],
        achievements: [],
        settings: DEFAULT_SETTINGS,
        lastActiveAt: new Date().toISOString(),
      };

      saveUserRecord(newUserRecord);
      setActiveUserEmail(cleanEmail);

      setProfileState(newUserRecord.profile);
      setTotalXpState(0);
      setStreakState(newUserRecord.streak);
      setDailyQuestsState(newUserRecord.quests);
      setCompletedLessonsState([]);
      setQuizHistoryState([]);
      setUnlockedAchievementsState([]);
      setSettingsState(DEFAULT_SETTINGS);

      refreshSavedAccounts();

      addToast({
        type: 'success',
        title: 'Akun Baru Dibuat!',
        message: `Akun Anda berhasil disimpan dengan email ${cleanEmail}. Selamat belajar!`,
      });
      triggerSound('levelup');
      triggerConfetti();

      return { success: true, isNew: true, user: newUserRecord };
    }

    // MODE LOGIN
    if (!existing) {
      addToast({
        type: 'error',
        title: 'Akun Tidak Ditemukan',
        message: 'Email belum terdaftar. Silakan buat akun baru di tab "Daftar Baru".',
      });
      return { success: false, message: 'Akun tidak ditemukan' };
    }

    if (!password || !password.trim()) {
      addToast({
        type: 'error',
        title: 'Kata Sandi Wajib Diisi',
        message: 'Silakan masukkan kata sandi akun Anda.',
      });
      return { success: false, message: 'Kata sandi wajib diisi' };
    }

    // Cek kecocokan password
    const userPass = existing.password || '';
    if (userPass && userPass !== password) {
      addToast({
        type: 'error',
        title: 'Kata Sandi Salah',
        message: 'Kata sandi yang Anda masukkan tidak sesuai. Coba periksa kembali.',
      });
      return { success: false, message: 'Kata sandi salah' };
    }

    // Jika akun lama belum punya password tersimpan, perbarui passwordnya
    if (!userPass && password) {
      existing.password = password;
      saveUserRecord(existing);
    }

    // Existing user valid & password cocok -> Load user state
    const userProfile = {
      ...DEFAULT_PROFILE,
      ...(existing.profile || {}),
      email: cleanEmail,
    };

    setProfileState(userProfile);
    setTotalXpState(existing.totalXp || 0);
    setStreakState(existing.streak || { count: 0, lastActiveDate: null, longestStreak: 0 });
    setDailyQuestsState(ensureDailyQuests(existing.quests || null));
    setCompletedLessonsState(existing.completedLessons || []);
    setQuizHistoryState(existing.quizHistory || []);
    setUnlockedAchievementsState(existing.achievements || []);
    setSettingsState(existing.settings || DEFAULT_SETTINGS);

    setActiveUserEmail(cleanEmail);
    refreshSavedAccounts();

    addToast({
      type: 'success',
      title: 'Selamat Datang Kembali!',
      message: `Berhasil login sebagai ${userProfile.name} (${cleanEmail})`,
    });
    triggerSound('correct');

    return { success: true, isNew: false, user: existing };
  }, [addToast, triggerSound, triggerConfetti, refreshSavedAccounts]);

  /**
   * Switch directly to another saved account
   */
  const switchAccount = useCallback((targetEmail) => {
    if (!targetEmail) return false;
    const cleanEmail = targetEmail.trim().toLowerCase();
    const targetUser = getUserByEmail(cleanEmail);

    if (!targetUser) {
      addToast({
        type: 'error',
        title: 'Akun Tidak Ditemukan',
        message: 'Akun yang dipilih tidak ada di penyimpanan perangkat.',
      });
      return false;
    }

    // 1. Save current active user first
    if (profile?.email) {
      saveUserRecord({
        email: profile.email,
        profile,
        totalXp,
        streak,
        quests: dailyQuests,
        completedLessons,
        quizHistory,
        achievements: unlockedAchievements,
        settings,
      });
    }

    // 2. Load target user state
    const userProfile = {
      ...DEFAULT_PROFILE,
      ...(targetUser.profile || {}),
      email: cleanEmail,
    };

    setProfileState(userProfile);
    setTotalXpState(targetUser.totalXp || 0);
    setStreakState(targetUser.streak || { count: 0, lastActiveDate: null, longestStreak: 0 });
    setDailyQuestsState(ensureDailyQuests(targetUser.quests || null));
    setCompletedLessonsState(targetUser.completedLessons || []);
    setQuizHistoryState(targetUser.quizHistory || []);
    setUnlockedAchievementsState(targetUser.achievements || []);
    setSettingsState(targetUser.settings || DEFAULT_SETTINGS);

    setActiveUserEmail(cleanEmail);
    refreshSavedAccounts();

    addToast({
      type: 'success',
      title: 'Akun Dialihkan',
      message: `Sekarang masuk sebagai ${userProfile.name}`,
    });
    triggerSound('select');

    return true;
  }, [profile, totalXp, streak, dailyQuests, completedLessons, quizHistory, unlockedAchievements, settings, addToast, triggerSound, refreshSavedAccounts]);

  /**
   * Logout from current account (reverts to guest session)
   */
  const logoutUser = useCallback(() => {
    // 1. Save current active user progress
    if (profile?.email) {
      saveUserRecord({
        email: profile.email,
        profile,
        totalXp,
        streak,
        quests: dailyQuests,
        completedLessons,
        quizHistory,
        achievements: unlockedAchievements,
        settings,
      });
    }

    // 2. Clear active email
    setActiveUserEmail(null);

    // 3. Reset to Guest profile
    setProfileState(DEFAULT_PROFILE);
    setTotalXpState(0);
    setStreakState({ count: 0, lastActiveDate: null, longestStreak: 0 });
    setDailyQuestsState(ensureDailyQuests(null));
    setCompletedLessonsState([]);
    setQuizHistoryState([]);
    setUnlockedAchievementsState([]);
    setSettingsState(DEFAULT_SETTINGS);

    refreshSavedAccounts();

    addToast({
      type: 'info',
      title: 'Berhasil Keluar',
      message: 'Anda telah keluar dari akun. Data Anda tetap tersimpan di perangkat ini.',
    });
    triggerSound('select');
  }, [profile, totalXp, streak, dailyQuests, completedLessons, quizHistory, unlockedAchievements, settings, addToast, triggerSound, refreshSavedAccounts]);

  /**
   * Delete an account from saved accounts
   */
  const removeSavedAccount = useCallback((emailToRemove) => {
    if (!emailToRemove) return false;
    const cleanEmail = emailToRemove.trim().toLowerCase();

    const isCurrentActive = profile?.email && profile.email.toLowerCase() === cleanEmail;
    deleteUserRecord(cleanEmail);
    refreshSavedAccounts();

    if (isCurrentActive) {
      setActiveUserEmail(null);
      setProfileState(DEFAULT_PROFILE);
      setTotalXpState(0);
      setStreakState({ count: 0, lastActiveDate: null, longestStreak: 0 });
      setDailyQuestsState(ensureDailyQuests(null));
      setCompletedLessonsState([]);
      setQuizHistoryState([]);
      setUnlockedAchievementsState([]);
      setSettingsState(DEFAULT_SETTINGS);
    }

    addToast({
      type: 'info',
      title: 'Akun Dihapus',
      message: `Akun ${cleanEmail} telah dihapus dari perangkat ini.`,
    });

    return true;
  }, [profile?.email, addToast, refreshSavedAccounts]);

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
        bookmarks,
        toasts,
        levelUpData,
        savedAccounts,
        isLoggedIn: Boolean(profile?.email),
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
        // Bookmark & Backup actions
        toggleBookmarkLesson,
        toggleBookmarkQuestion,
        exportUserData,
        importUserData,
        // Auth actions
        loginWithEmail,
        switchAccount,
        logoutUser,
        removeSavedAccount,
        refreshSavedAccounts,
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
