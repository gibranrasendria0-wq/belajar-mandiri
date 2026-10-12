import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  HelpCircle,
  Play,
  Trophy,
  Target,
  Zap,
  Clock,
  Sparkles,
  BarChart3,
  Layers,
  Flame,
} from 'lucide-react';
import { QUESTION_CATEGORIES, QUESTION_COUNTS, ALL_QUESTIONS } from '../data/questions';
import { useGame } from '../context/GameContext';
import StatCard from '../components/ui/StatCard';

export default function QuizCenter() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { quizHistory, triggerSound } = useGame();

  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [difficulty, setDifficulty] = useState(searchParams.get('difficulty') || 'all');
  const [questionCount, setQuestionCount] = useState(10);
  const [timerEnabled, setTimerEnabled] = useState(true);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setCategory(cat);
    const diff = searchParams.get('difficulty');
    if (diff) setDifficulty(diff);
  }, [searchParams]);

  // Available questions in selected configuration
  const availableCount = useMemo(() => {
    let pool = [...ALL_QUESTIONS];
    if (category !== 'all') {
      pool = pool.filter((q) => q.category === category);
    }
    if (difficulty !== 'all') {
      pool = pool.filter((q) => q.difficulty.toLowerCase() === difficulty.toLowerCase());
    }
    return pool.length;
  }, [category, difficulty]);

  // Calculate potential XP
  const estimatedXp = useMemo(() => {
    let xpPerQuestion = 15;
    if (difficulty === 'easy') xpPerQuestion = 10;
    else if (difficulty === 'medium') xpPerQuestion = 20;
    else if (difficulty === 'hard') xpPerQuestion = 30;

    const actualCount = Math.min(questionCount, availableCount);
    return actualCount * xpPerQuestion + 10; // includes 10 XP completion bonus
  }, [difficulty, questionCount, availableCount]);

  // History stats
  const totalQuizzes = quizHistory.length;
  const avgAccuracy =
    totalQuizzes > 0
      ? Math.round(quizHistory.reduce((acc, q) => acc + (q.accuracy || 0), 0) / totalQuizzes)
      : 0;
  const highestScore =
    totalQuizzes > 0 ? Math.max(...quizHistory.map((q) => q.score || 0)) : 0;

  const handleStartQuiz = () => {
    triggerSound('select');
    navigate('/quiz/play', {
      state: {
        category,
        difficulty,
        count: Math.min(questionCount, availableCount),
        timerEnabled,
      },
    });
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-500 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Interactive Arena</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          Quiz Center
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Uji pemahamanmu dengan bank soal akademik pilihan. Kumpulkan skor tertinggi, pertahankan akurasi, dan raih XP untuk naik level!
        </p>
      </div>

      {/* Historical Performance Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={BarChart3}
          title="Kuis Selesai"
          value={`${totalQuizzes} Sesi`}
          subtext="Total seluruh sesi latihan"
          badgeColor="indigo"
          colorClass="from-indigo-500/20 to-purple-500/10 text-indigo-400"
        />
        <StatCard
          icon={Target}
          title="Rata-rata Akurasi"
          value={`${avgAccuracy}%`}
          subtext="Persentase jawaban tepat"
          badgeColor="cyan"
          colorClass="from-cyan-500/20 to-blue-500/10 text-cyan-400"
        />
        <StatCard
          icon={Trophy}
          title="Skor Tertinggi"
          value={`${highestScore} Poin`}
          subtext="Rekor poin terbaik"
          badgeColor="amber"
          colorClass="from-amber-500/20 to-rose-500/10 text-amber-400"
        />
      </div>

      {/* Configuration Panel */}
      <div className="rounded-3xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] p-6 sm:p-10 shadow-xl dark:shadow-card-dark space-y-8">
        <div className="border-b border-slate-200 dark:border-white/5 pb-4">
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Konfigurasi Sesi Kuis
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Sesuaikan kategori mata pelajaran, tingkat kesulitan, dan jumlah pertanyaan
          </p>
        </div>

        {/* 1. Category Selection */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            1. Pilih Kategori Pembelajaran
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {QUESTION_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`p-3 rounded-2xl border text-xs font-bold transition-all text-left flex items-center justify-between ${
                  category === cat.id
                    ? 'border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'border-slate-200 dark:border-[#232B3E] bg-slate-50 dark:bg-[#131722] text-slate-700 dark:text-slate-300 hover:border-indigo-400'
                }`}
              >
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Difficulty Selection */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            2. Tingkat Kesulitan
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'all', label: 'Campuran', desc: 'Variasi acak semua level' },
              { id: 'easy', label: 'Easy (Mudah)', desc: '10 XP / jawaban benar' },
              { id: 'medium', label: 'Medium (Menengah)', desc: '20 XP / jawaban benar' },
              { id: 'hard', label: 'Hard (Sulit)', desc: '30 XP / jawaban benar' },
            ].map((diff) => (
              <button
                key={diff.id}
                type="button"
                onClick={() => setDifficulty(diff.id)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  difficulty === diff.id
                    ? 'border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'border-slate-200 dark:border-[#232B3E] bg-slate-50 dark:bg-[#131722] text-slate-700 dark:text-slate-300 hover:border-indigo-400'
                }`}
              >
                <p className="font-extrabold text-sm">{diff.label}</p>
                <p className={`text-[11px] mt-1 ${difficulty === diff.id ? 'text-indigo-100' : 'text-slate-500'}`}>
                  {diff.desc}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Number of Questions & Timer Toggle */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              3. Jumlah Soal
            </label>
            <div className="flex flex-wrap gap-2">
              {QUESTION_COUNTS.map((cnt) => {
                const isSelected = questionCount === cnt;
                return (
                  <button
                    key={cnt}
                    type="button"
                    onClick={() => setQuestionCount(cnt)}
                    className={`w-12 h-12 rounded-2xl font-black text-sm transition-all flex items-center justify-center ${
                      isSelected
                        ? 'bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white shadow-md shadow-indigo-600/30 scale-105'
                        : 'border border-slate-200 dark:border-[#232B3E] bg-slate-50 dark:bg-[#131722] text-slate-700 dark:text-slate-300 hover:border-indigo-400'
                    }`}
                  >
                    {cnt}
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Tersedia {availableCount} soal dalam bank soal untuk filter ini.
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              4. Mode Timer Tantangan
            </label>
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-[#131722] border border-slate-200 dark:border-[#232B3E]">
              <Clock className="w-5 h-5 text-indigo-500" />
              <div className="flex-1 text-xs">
                <p className="font-bold text-slate-900 dark:text-white">Timer 30 Detik / Soal</p>
                <p className="text-slate-500">Merasakan tensi tantangan kuis sesungguhnya</p>
              </div>
              <input
                type="checkbox"
                checked={timerEnabled}
                onChange={(e) => setTimerEnabled(e.target.checked)}
                className="w-5 h-5 accent-indigo-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Summary Banner & Start Button */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-purple-950/30 to-cyan-950/40 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> Potensi Hadiah Kuis
            </span>
            <p className="text-2xl font-black text-white">
              Hingga +{estimatedXp} XP
            </p>
            <p className="text-xs text-slate-400">
              Mengerjakan {Math.min(questionCount, availableCount)} soal tanpa pengulangan
            </p>
          </div>

          <button
            onClick={handleStartQuiz}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-extrabold text-base tracking-wide shadow-xl shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Play className="w-5 h-5 fill-white" />
            <span>Mulai Sesi Kuis</span>
          </button>
        </div>
      </div>
    </div>
  );
}
