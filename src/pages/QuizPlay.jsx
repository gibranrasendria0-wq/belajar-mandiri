import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Zap, Target, AlertTriangle } from 'lucide-react';
import { getQuizQuestions } from '../data/questions';
import { useGame } from '../context/GameContext';
import QuestionCard from '../components/quiz/QuestionCard';
import ProgressBar from '../components/ui/ProgressBar';
import ConfirmDialog from '../components/ui/ConfirmDialog';

export default function QuizPlay() {
  const location = useLocation();
  const navigate = useNavigate();
  const { triggerSound } = useGame();

  const config = location.state || {
    category: 'all',
    difficulty: 'all',
    count: 10,
    timerEnabled: true,
  };

  // 1. Initialize questions once per session
  const [questions] = useState(() => {
    return getQuizQuestions({
      category: config.category,
      difficulty: config.difficulty,
      count: config.count || 10,
      shuffleChoices: true,
    });
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [answersReview, setAnswersReview] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [totalSecondsSpent, setTotalSecondsSpent] = useState(0);
  const [isExitDialogOpen, setIsExitDialogOpen] = useState(false);

  // Overall session metrics
  const [currentScore, setCurrentScore] = useState(0);
  const [earnedXp, setEarnedXp] = useState(0);

  const currentQ = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;

  // Question XP calculation
  const getQuestionXp = (diff) => {
    const d = (diff || '').toLowerCase();
    if (d === 'hard') return 30;
    if (d === 'medium') return 20;
    return 10;
  };

  // Timer countdown
  useEffect(() => {
    if (!config.timerEnabled || isConfirmed) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Time expired for this question -> auto confirm as unanswered or timeout
          handleConfirmAnswer(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [config.timerEnabled, isConfirmed, currentIndex]);

  // Overall time counter
  useEffect(() => {
    const totalTimer = setInterval(() => {
      setTotalSecondsSpent((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(totalTimer);
  }, []);

  const handleSelectOption = (idx) => {
    if (isConfirmed) return;
    setSelectedOption(idx);
    triggerSound('select');
  };

  const handleConfirmAnswer = (isTimeout = false) => {
    if (isConfirmed || !currentQ) return;

    const chosen = isTimeout ? selectedOption : selectedOption;
    const isCorrect = chosen !== null && chosen === currentQ.correctIndex;
    const qXp = isCorrect ? getQuestionXp(currentQ.difficulty) : 0;

    setIsConfirmed(true);

    if (isCorrect) {
      setCurrentScore((s) => s + 100);
      setEarnedXp((x) => x + qXp);
      triggerSound('correct');
    } else {
      triggerSound('wrong');
    }

    // Save answer review
    setAnswersReview((prev) => [
      ...prev,
      {
        question: currentQ,
        userSelectedIndex: chosen,
        isCorrect,
        xpEarned: qXp,
      },
    ]);
  };

  const handleNextQuestion = () => {
    if (isLast) {
      // Quiz Finished!
      // Add completion bonus of 10 XP
      const totalSessionXp = earnedXp + 10;
      const correctCount = answersReview.filter((a) => a.isCorrect).length;
      const accuracy = Math.round((correctCount / Math.max(1, questions.length)) * 100);

      const resultPayload = {
        sessionId: 'quiz-' + Date.now(),
        category: config.category,
        difficulty: config.difficulty,
        totalQuestions: questions.length,
        correctCount,
        accuracy,
        score: currentScore,
        xpEarned: totalSessionXp,
        timeSpentSeconds: totalSecondsSpent,
        answersReview,
        originalConfig: config,
      };

      navigate('/quiz/result', { state: { result: resultPayload }, replace: true });
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsConfirmed(false);
      setTimeRemaining(30);
    }
  };

  if (!questions || questions.length === 0) {
    return (
      <div className="py-16 text-center space-y-4">
        <h3 className="text-xl font-bold">Tidak ada soal tersedia untuk filter ini.</h3>
        <button
          onClick={() => navigate('/quiz')}
          className="px-6 py-2.5 rounded-xl bg-indigo-600 text-white font-bold"
        >
          Kembali ke Quiz Center
        </button>
      </div>
    );
  }

  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E]">
        <button
          onClick={() => setIsExitDialogOpen(true)}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-rose-500 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Keluar Kuis
        </button>

        {/* Question Counter */}
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Soal
          </span>
          <p className="text-base font-black text-slate-900 dark:text-white">
            {currentIndex + 1}{' '}
            <span className="text-slate-400 text-xs">/ {questions.length}</span>
          </p>
        </div>

        {/* Timer or Score */}
        {config.timerEnabled ? (
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-xs border ${
              timeRemaining <= 7
                ? 'bg-rose-500/10 text-rose-500 border-rose-500/30 animate-pulse'
                : 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{timeRemaining}s</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-xs font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1.5 rounded-xl">
            <Zap className="w-4 h-4" />
            <span>+{earnedXp} XP</span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <ProgressBar
        progress={progressPercent}
        height="h-2"
        showLabel={false}
        gradient="from-indigo-500 via-purple-500 to-cyan-400"
      />

      {/* Current Question Card */}
      <QuestionCard
        question={currentQ}
        selectedIndex={selectedOption}
        isConfirmed={isConfirmed}
        onSelectOption={handleSelectOption}
        onConfirmAnswer={() => handleConfirmAnswer(false)}
        onNextQuestion={handleNextQuestion}
        isLastQuestion={isLast}
      />

      {/* Exit Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isExitDialogOpen}
        title="Keluar dari Kuis?"
        message="Jika Anda keluar sekarang, progres sesi kuis ini tidak akan disimpan dan tidak ada XP yang diperoleh."
        confirmText="Ya, Keluar"
        cancelText="Lanjutkan Kuis"
        variant="danger"
        onConfirm={() => navigate('/quiz')}
        onCancel={() => setIsExitDialogOpen(false)}
      />
    </div>
  );
}
