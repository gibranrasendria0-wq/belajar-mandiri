import { getTodayDateString } from './streak';

export const INITIAL_DAILY_QUESTS_CONFIG = [
  {
    id: 'quest_complete_quiz',
    title: 'Penakluk Kuis',
    description: 'Selesaikan minimal 1 sesi kuis hari ini',
    icon: 'Brain',
    target: 1,
    rewardXp: 25,
  },
  {
    id: 'quest_answer_questions',
    title: 'Latihan Intensif',
    description: 'Jawab minimal 10 soal di kuis apa pun',
    icon: 'CheckCircle2',
    target: 10,
    rewardXp: 20,
  },
  {
    id: 'quest_complete_lesson',
    title: 'Pembelajar Sejati',
    description: 'Selesaikan 1 materi pembelajaran baru hari ini',
    icon: 'BookOpen',
    target: 1,
    rewardXp: 30,
  },
  {
    id: 'quest_high_accuracy',
    title: 'Fokus Tajam',
    description: 'Dapatkan akurasi 80% atau lebih pada 1 sesi kuis',
    icon: 'Target',
    target: 1,
    rewardXp: 25,
  },
];

/**
 * Ensures daily quests match today's date.
 * If date changed, reset quest progress and claim status.
 */
export function ensureDailyQuests(storedData) {
  const today = getTodayDateString();

  if (!storedData || storedData.date !== today || !Array.isArray(storedData.quests)) {
    return {
      date: today,
      quests: INITIAL_DAILY_QUESTS_CONFIG.map((q) => ({
        ...q,
        progress: 0,
        completed: false,
        claimed: false,
      })),
    };
  }

  // Merge with any newly added quest schema
  const existingMap = new Map(storedData.quests.map((q) => [q.id, q]));
  const merged = INITIAL_DAILY_QUESTS_CONFIG.map((base) => {
    const existing = existingMap.get(base.id);
    if (existing) {
      return {
        ...base,
        progress: existing.progress || 0,
        completed: (existing.progress || 0) >= base.target,
        claimed: !!existing.claimed,
      };
    }
    return {
      ...base,
      progress: 0,
      completed: false,
      claimed: false,
    };
  });

  return {
    date: today,
    quests: merged,
  };
}

/**
 * Updates quests based on events:
 * - { type: 'quiz_completed', questionCount: number, accuracy: number }
 * - { type: 'lesson_completed' }
 */
export function processQuestProgress(currentQuestsData, event) {
  const safeData = ensureDailyQuests(currentQuestsData);
  let hasChanges = false;

  const updatedQuests = safeData.quests.map((quest) => {
    let newProgress = quest.progress;

    if (event.type === 'quiz_completed') {
      if (quest.id === 'quest_complete_quiz') {
        newProgress = Math.min(quest.target, quest.progress + 1);
      } else if (quest.id === 'quest_answer_questions') {
        newProgress = Math.min(quest.target, quest.progress + (event.questionCount || 0));
      } else if (quest.id === 'quest_high_accuracy' && (event.accuracy || 0) >= 80) {
        newProgress = Math.min(quest.target, quest.progress + 1);
      }
    } else if (event.type === 'lesson_completed') {
      if (quest.id === 'quest_complete_lesson') {
        newProgress = Math.min(quest.target, quest.progress + 1);
      }
    }

    if (newProgress !== quest.progress) {
      hasChanges = true;
    }

    return {
      ...quest,
      progress: newProgress,
      completed: newProgress >= quest.target,
    };
  });

  return {
    date: safeData.date,
    quests: updatedQuests,
    hasChanges,
  };
}
