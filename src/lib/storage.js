// LocalStorage manager for EduGaming with safe fallback and schemas

export const STORAGE_KEYS = {
  USERS: 'edugaming_users_v1',
  ACTIVE_USER_EMAIL: 'edugaming_active_email_v1',
  PROFILE: 'edugaming_profile_v1',
  XP: 'edugaming_xp_v1',
  STREAK: 'edugaming_streak_v1',
  QUESTS: 'edugaming_quests_v1',
  COMPLETED_LESSONS: 'edugaming_completed_lessons_v1',
  LESSON_PROGRESS: 'edugaming_lesson_progress_v1',
  QUIZ_HISTORY: 'edugaming_quiz_history_v1',
  ACHIEVEMENTS: 'edugaming_achievements_v1',
  SETTINGS: 'edugaming_settings_v1',
  RECENT_ACTIVITY: 'edugaming_activity_v1',
  BOOKMARKS: 'edugaming_bookmarks_v1',
};

export const DEFAULT_AVATARS = [
  { id: 'cyber-ninja', name: 'Cyber Ninja', icon: 'Bot', bg: 'from-indigo-500 to-purple-600' },
  { id: 'astro-scholar', name: 'Astro Scholar', icon: 'Rocket', bg: 'from-cyan-500 to-blue-600' },
  { id: 'dragon-mage', name: 'Dragon Mage', icon: 'Flame', bg: 'from-amber-500 to-rose-600' },
  { id: 'pixel-hero', name: 'Pixel Hero', icon: 'Gamepad2', bg: 'from-emerald-500 to-teal-600' },
  { id: 'quantum-owl', name: 'Quantum Owl', icon: 'Brain', bg: 'from-purple-500 to-pink-600' },
  { id: 'zen-master', name: 'Zen Master', icon: 'Compass', bg: 'from-blue-500 to-indigo-600' },
];

export const DEFAULT_PROFILE = {
  email: null,
  name: 'Player One',
  avatarId: 'cyber-ninja',
  avatarUrl: null, // Data URL from user gallery image
  bio: 'Siap menaklukkan pengetahuan dan naik level setiap hari!',
  joinedDate: new Date().toISOString(),
};

export const DEFAULT_SETTINGS = {
  theme: 'dark',
  soundEnabled: true,
  timerEnabled: true,
  defaultQuestionCount: 10,
  timerDurationSeconds: 30, // seconds per question
};

export function getFromStorage(key, fallbackValue) {
  if (typeof window === 'undefined') return fallbackValue;
  try {
    const raw = localStorage.getItem(key);
    if (raw === null || raw === undefined) return fallbackValue;
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`[EduGaming Storage] Failed reading key "${key}":`, err);
    return fallbackValue;
  }
}

export function saveToStorage(key, value) {
  if (typeof window === 'undefined') return false;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.warn(`[EduGaming Storage] Failed writing key "${key}":`, err);
    return false;
  }
}

// User accounts management (multi-account persistence)
export function getAllUsers() {
  return getFromStorage(STORAGE_KEYS.USERS, {});
}

export function getUserByEmail(email) {
  if (!email) return null;
  const users = getAllUsers();
  return users[email.trim().toLowerCase()] || null;
}

export function saveUserRecord(user) {
  if (!user || !user.email) return false;
  const normalizedEmail = user.email.trim().toLowerCase();
  const users = getAllUsers();
  users[normalizedEmail] = {
    ...users[normalizedEmail],
    ...user,
    email: normalizedEmail,
    lastActiveAt: new Date().toISOString(),
  };
  return saveToStorage(STORAGE_KEYS.USERS, users);
}

export function deleteUserRecord(email) {
  if (!email) return false;
  const normalizedEmail = email.trim().toLowerCase();
  const users = getAllUsers();
  if (users[normalizedEmail]) {
    delete users[normalizedEmail];
    saveToStorage(STORAGE_KEYS.USERS, users);
    return true;
  }
  return false;
}

export function getActiveUserEmail() {
  return getFromStorage(STORAGE_KEYS.ACTIVE_USER_EMAIL, null);
}

export function setActiveUserEmail(email) {
  if (!email) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_USER_EMAIL);
    }
    return;
  }
  saveToStorage(STORAGE_KEYS.ACTIVE_USER_EMAIL, email.trim().toLowerCase());
}

export function resetAllStorage() {
  if (typeof window === 'undefined') return;
  try {
    Object.values(STORAGE_KEYS).forEach((k) => {
      localStorage.removeItem(k);
    });
    return true;
  } catch (err) {
    console.error('[EduGaming Storage] Failed resetting storage:', err);
    return false;
  }
}
