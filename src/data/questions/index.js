import { matematikaQuestions } from './matematika';
import { informatikaQuestions } from './informatika';
import { ipaQuestions } from './ipa';
import { bahasaIndonesiaQuestions } from './bahasaIndonesia';
import { bahasaInggrisQuestions } from './bahasaInggris';
import { ipsQuestions } from './ips';
import { pengetahuanUmumQuestions } from './pengetahuanUmum';

export const ALL_QUESTIONS = [
  ...matematikaQuestions,
  ...informatikaQuestions,
  ...ipaQuestions,
  ...bahasaIndonesiaQuestions,
  ...bahasaInggrisQuestions,
  ...ipsQuestions,
  ...pengetahuanUmumQuestions,
];

export const QUESTION_CATEGORIES = [
  { id: 'all', name: 'Semua Kategori' },
  { id: 'matematika', name: 'Matematika' },
  { id: 'informatika', name: 'Informatika' },
  { id: 'ipa', name: 'IPA (Sains)' },
  { id: 'bahasa-indonesia', name: 'Bahasa Indonesia' },
  { id: 'bahasa-inggris', name: 'Bahasa Inggris' },
  { id: 'ips', name: 'IPS (Sosial)' },
  { id: 'pengetahuan-umum', name: 'Pengetahuan Umum' },
];

export const QUESTION_COUNTS = [5, 10, 15, 20, 25, 30];

/**
 * Fisher-Yates array shuffle (pure, non-mutating)
 */
export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Shuffles question choices while correctly keeping track of the new correctIndex.
 */
export function shuffleQuestionOptions(q) {
  const originalCorrectAnswerText = q.options[q.correctIndex];
  const indexedOptions = q.options.map((text, idx) => ({ text, isCorrect: idx === q.correctIndex }));
  const shuffled = shuffleArray(indexedOptions);
  const newCorrectIndex = shuffled.findIndex((item) => item.isCorrect);

  return {
    ...q,
    options: shuffled.map((item) => item.text),
    correctIndex: newCorrectIndex >= 0 ? newCorrectIndex : 0,
    originalCorrectAnswerText,
  };
}

/**
 * Filters and samples questions without repetition for a quiz session.
 */
export function getQuizQuestions({ category = 'all', difficulty = 'all', count = 10, shuffleChoices = true }) {
  let pool = [...ALL_QUESTIONS];

  if (category && category !== 'all') {
    pool = pool.filter((q) => q.category === category);
  }

  if (difficulty && difficulty !== 'all') {
    pool = pool.filter((q) => q.difficulty.toLowerCase() === difficulty.toLowerCase());
  }

  // Shuffle the pool to ensure varied sessions
  const shuffledPool = shuffleArray(pool);

  // Take up to requested count or available pool size
  const selected = shuffledPool.slice(0, Math.min(count, shuffledPool.length));

  if (!shuffleChoices) {
    return selected;
  }

  return selected.map(shuffleQuestionOptions);
}
