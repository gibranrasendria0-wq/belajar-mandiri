// EduGaming Gamification XP & Level Calculator

export const XP_RULES = {
  EASY_QUESTION: 10,
  MEDIUM_QUESTION: 20,
  HARD_QUESTION: 30,
  COMPLETE_LESSON: 25,
  QUIZ_COMPLETION_BONUS: 10,
  PERFECT_QUIZ_BONUS: 35,
  CLAIM_DAILY_QUEST: 15,
};

/**
 * Level progression formula:
 * Level 1 starts at 0 XP.
 * Threshold to reach Level L is quadratic: 100 * (L - 1)^1.4 approx, or clean geometric buckets:
 * L1: 0 - 100 XP (needs 100)
 * L2: 100 - 250 XP (needs 150)
 * L3: 250 - 450 XP (needs 200)
 * L4: 450 - 700 XP (needs 250)
 * L5: 700 - 1000 XP (needs 300)
 * ...
 * For level L >= 1, XP required for that single level = 100 + (L - 1) * 50
 */
export function getLevelThresholds(maxLevel = 50) {
  const thresholds = [0];
  let accumulated = 0;
  for (let l = 1; l <= maxLevel; l++) {
    const xpNeededForThisLevel = 100 + (l - 1) * 50;
    accumulated += xpNeededForThisLevel;
    thresholds.push(accumulated);
  }
  return thresholds;
}

const THRESHOLDS = getLevelThresholds(60);

export function calculateLevelInfo(totalXp = 0) {
  const safeXp = Math.max(0, Math.floor(Number(totalXp) || 0));

  let currentLevel = 1;
  while (currentLevel < THRESHOLDS.length && safeXp >= THRESHOLDS[currentLevel]) {
    currentLevel++;
  }

  const prevThreshold = THRESHOLDS[currentLevel - 1]; // XP needed to enter current level
  const nextThreshold = THRESHOLDS[currentLevel];     // XP needed to enter next level
  const xpInCurrentLevel = safeXp - prevThreshold;
  const xpNeededForNext = nextThreshold - prevThreshold;
  const progressPercent = Math.min(100, Math.max(0, Math.round((xpInCurrentLevel / xpNeededForNext) * 100)));

  return {
    level: currentLevel,
    totalXp: safeXp,
    xpInCurrentLevel,
    xpNeededForNext,
    nextLevelTotalXp: nextThreshold,
    progressPercent,
    title: getRankTitle(currentLevel),
  };
}

export function getRankTitle(level) {
  if (level >= 30) return 'Grandmaster Scholar';
  if (level >= 25) return 'Master Prodigy';
  if (level >= 20) return 'Archmage Thinker';
  if (level >= 15) return 'Senior Strategist';
  if (level >= 10) return 'Academic Adept';
  if (level >= 7) return 'Skillful Pioneer';
  if (level >= 4) return 'Rising Scholar';
  if (level >= 2) return 'Eager Apprentice';
  return 'Novice Explorer';
}
