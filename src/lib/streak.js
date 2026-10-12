// Learning Streak management

export function getTodayDateString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function parseDate(dateStr) {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split('-').map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

export function getDayDifference(dateStr1, dateStr2) {
  const d1 = parseDate(dateStr1);
  const d2 = parseDate(dateStr2);
  if (!d1 || !d2) return Infinity;

  // normalize to UTC midnight
  const utc1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate());
  const utc2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate());
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.floor((utc2 - utc1) / msPerDay);
}

/**
 * Updates streak based on an activity recorded today.
 * @param {Object} currentStreakData { count: number, lastActiveDate: string, longestStreak: number }
 * @returns {Object} { count, lastActiveDate, longestStreak, streakIncreased: boolean }
 */
export function recordStreakActivity(currentStreakData = { count: 0, lastActiveDate: null, longestStreak: 0 }) {
  const today = getTodayDateString();
  const count = Number(currentStreakData?.count) || 0;
  const longest = Number(currentStreakData?.longestStreak) || 0;
  const lastActive = currentStreakData?.lastActiveDate;

  if (!lastActive) {
    // First ever activity
    return {
      count: 1,
      lastActiveDate: today,
      longestStreak: Math.max(1, longest),
      streakIncreased: true,
    };
  }

  const diff = getDayDifference(lastActive, today);

  if (diff === 0) {
    // Already active today, maintain streak without incrementing
    return {
      count,
      lastActiveDate: today,
      longestStreak: Math.max(count, longest),
      streakIncreased: false,
    };
  }

  if (diff === 1) {
    // Consecutive day! Streak increases
    const newCount = count + 1;
    return {
      count: newCount,
      lastActiveDate: today,
      longestStreak: Math.max(newCount, longest),
      streakIncreased: true,
    };
  }

  // Missed one or more days, start new streak with 1
  return {
    count: 1,
    lastActiveDate: today,
    longestStreak: Math.max(1, longest),
    streakIncreased: true,
  };
}
