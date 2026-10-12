// Achievements system for EduGaming

export const ALL_ACHIEVEMENTS = [
  {
    id: 'first_step',
    title: 'First Step',
    description: 'Selesaikan kuis pertamamu di EduGaming.',
    icon: 'Footprints',
    category: 'quiz',
    xpReward: 50,
    check: (stats) => (stats.quizzesCompleted || 0) >= 1,
    getProgress: (stats) => ({ current: Math.min(1, stats.quizzesCompleted || 0), max: 1 }),
  },
  {
    id: 'quick_learner',
    title: 'Quick Learner',
    description: 'Selesaikan 5 sesi kuis latihan.',
    icon: 'Zap',
    category: 'quiz',
    xpReward: 100,
    check: (stats) => (stats.quizzesCompleted || 0) >= 5,
    getProgress: (stats) => ({ current: Math.min(5, stats.quizzesCompleted || 0), max: 5 }),
  },
  {
    id: 'perfect_score',
    title: 'Perfect Score',
    description: 'Raih nilai 100% pada sesi kuis berdurasi minimal 5 soal.',
    icon: 'Crown',
    category: 'quiz',
    xpReward: 150,
    check: (stats) => (stats.hasPerfectScore || false) === true,
    getProgress: (stats) => ({ current: stats.hasPerfectScore ? 1 : 0, max: 1 }),
  },
  {
    id: 'knowledge_hunter',
    title: 'Knowledge Hunter',
    description: 'Pelajari dan selesaikan 10 materi pembelajaran.',
    icon: 'Compass',
    category: 'learning',
    xpReward: 200,
    check: (stats) => (stats.lessonsCompletedCount || 0) >= 10,
    getProgress: (stats) => ({ current: Math.min(10, stats.lessonsCompletedCount || 0), max: 10 }),
  },
  {
    id: 'consistency',
    title: 'Consistency Champion',
    description: 'Pertahankan learning streak selama 7 hari berturut-turut.',
    icon: 'Flame',
    category: 'streak',
    xpReward: 250,
    check: (stats) => (stats.longestStreak || 0) >= 7,
    getProgress: (stats) => ({ current: Math.min(7, stats.longestStreak || 0), max: 7 }),
  },
  {
    id: 'rising_star',
    title: 'Rising Star',
    description: 'Capai Level 5 dalam petualangan belajarmu.',
    icon: 'Award',
    category: 'level',
    xpReward: 150,
    check: (stats) => (stats.level || 1) >= 5,
    getProgress: (stats) => ({ current: Math.min(5, stats.level || 1), max: 5 }),
  },
  {
    id: 'century_club',
    title: 'Century Club',
    description: 'Jawab total 100 soal dalam seluruh sesi kuis.',
    icon: 'Target',
    category: 'quiz',
    xpReward: 200,
    check: (stats) => (stats.totalQuestionsAnswered || 0) >= 100,
    getProgress: (stats) => ({ current: Math.min(100, stats.totalQuestionsAnswered || 0), max: 100 }),
  },
  {
    id: 'polymath',
    title: 'The Polymath',
    description: 'Selesaikan materi dari minimal 4 kategori yang berbeda.',
    icon: 'Sparkles',
    category: 'learning',
    xpReward: 180,
    check: (stats) => (stats.distinctCategoriesLearned || 0) >= 4,
    getProgress: (stats) => ({ current: Math.min(4, stats.distinctCategoriesLearned || 0), max: 4 }),
  },
];

/**
 * Checks which achievements should be unlocked.
 * @param {Object} stats
 * @param {Array<string>} alreadyUnlockedIds
 * @returns {Array<Object>} list of newly unlocked achievements
 */
export function evaluateAchievements(stats, alreadyUnlockedIds = []) {
  const unlockedSet = new Set(alreadyUnlockedIds);
  const newlyUnlocked = [];

  for (const ach of ALL_ACHIEVEMENTS) {
    if (!unlockedSet.has(ach.id) && ach.check(stats)) {
      newlyUnlocked.push(ach);
    }
  }

  return newlyUnlocked;
}
