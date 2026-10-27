import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Bookmark,
  BookOpen,
  HelpCircle,
  Trash2,
  ArrowRight,
  Sparkles,
  Search,
  CheckCircle2,
  Clock,
  Zap,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { LESSONS } from '../data/lessons';
import DifficultyBadge from '../components/ui/DifficultyBadge';
import EmptyState from '../components/ui/EmptyState';

export default function Bookmarks() {
  const { bookmarks, toggleBookmarkLesson, toggleBookmarkQuestion } = useGame();
  const [activeTab, setActiveTab] = useState('lessons'); // 'lessons' | 'questions'
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Saved Lessons
  const savedLessonIds = bookmarks?.lessons || [];
  const savedLessons = useMemo(() => {
    return LESSONS.filter((l) => savedLessonIds.includes(l.id));
  }, [savedLessonIds]);

  // 2. Saved Questions
  const savedQuestions = bookmarks?.questions || [];

  // Filtered Lessons
  const filteredLessons = useMemo(() => {
    if (!searchQuery.trim()) return savedLessons;
    const q = searchQuery.toLowerCase();
    return savedLessons.filter(
      (l) =>
        l.title.toLowerCase().includes(q) ||
        l.category.toLowerCase().includes(q) ||
        l.summary?.toLowerCase().includes(q)
    );
  }, [savedLessons, searchQuery]);

  // Filtered Questions
  const filteredQuestions = useMemo(() => {
    if (!searchQuery.trim()) return savedQuestions;
    const q = searchQuery.toLowerCase();
    return savedQuestions.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.explanation?.toLowerCase().includes(q)
    );
  }, [savedQuestions, searchQuery]);

  return (
    <div className="space-y-8 animate-fade-in pb-16 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#191F2D] border border-amber-500/30 p-8 sm:p-10 text-slate-900 dark:text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Bookmark className="w-3.5 h-3.5 fill-current" />
              <span>Koleksi Simpanan</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Materi & Soal Favorit
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Kumpulan materi penting dan soal menantang yang Anda tandai untuk dipelajari kembali di lain waktu.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-5 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center">
              <p className="text-xl font-black text-amber-500">{savedLessons.length}</p>
              <p className="text-[10px] uppercase font-bold text-slate-400">Materi Disimpan</p>
            </div>
            <div className="px-5 py-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-center">
              <p className="text-xl font-black text-indigo-500">{savedQuestions.length}</p>
              <p className="text-[10px] uppercase font-bold text-slate-400">Soal Disimpan</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('lessons')}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'lessons'
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Materi ({savedLessons.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('questions')}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'questions'
                ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Soal Kuis ({savedQuestions.length})</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={activeTab === 'lessons' ? 'Cari judul materi...' : 'Cari teks soal...'}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#232B3E] bg-white dark:bg-[#191F2D] text-xs text-slate-800 dark:text-white focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Content Panels */}
      {activeTab === 'lessons' ? (
        filteredLessons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="group rounded-3xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] hover:border-amber-500/40 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-200"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      {lesson.category}
                    </span>
                    <button
                      onClick={() => toggleBookmarkLesson(lesson.id)}
                      className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                      title="Hapus dari Simpanan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                    {lesson.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {lesson.summary || lesson.objectives?.[0]}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-[#232B3E] flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {lesson.duration}
                    </span>
                    <span className="flex items-center gap-1 text-cyan-500 font-bold">
                      <Zap className="w-3.5 h-3.5 fill-current" /> +{lesson.xpReward} XP
                    </span>
                  </div>

                  <Link
                    to={`/lessons/${lesson.id}`}
                    className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold text-xs hover:bg-amber-500/20 transition-colors"
                  >
                    <span>Buka Materi</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="Belum Ada Materi Disimpan"
            description="Tandai materi penting yang ingin Anda pelajari kembali dengan menekan tombol Simpan di halaman materi."
            actionText="Jelajahi Katalog Materi"
            actionLink="/courses"
          />
        )
      ) : filteredQuestions.length > 0 ? (
        <div className="space-y-4">
          {filteredQuestions.map((q, idx) => (
            <div
              key={q.id || idx}
              className="rounded-3xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] p-6 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                  {q.category}
                </span>

                <div className="flex items-center gap-2">
                  <DifficultyBadge difficulty={q.difficulty} />
                  <button
                    onClick={() => toggleBookmarkQuestion(q)}
                    className="p-1.5 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                    title="Hapus Soal dari Simpanan"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white leading-relaxed">
                {q.question}
              </h3>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {q.options?.map((opt, oIdx) => {
                  const isCorrect = oIdx === q.correctIndex;
                  return (
                    <div
                      key={oIdx}
                      className={`p-3 rounded-xl border text-xs font-semibold flex items-center gap-2.5 ${
                        isCorrect
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-400 font-bold'
                          : 'bg-slate-50 dark:bg-[#131722] border-slate-200 dark:border-[#232B3E] text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-lg bg-black/10 dark:bg-white/10 flex items-center justify-center font-black text-[10px]">
                        {['A', 'B', 'C', 'D'][oIdx]}
                      </span>
                      <span>{opt}</span>
                    </div>
                  );
                })}
              </div>

              {/* Explanation */}
              {q.explanation && (
                <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  <p className="font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                    💡 Pembahasan:
                  </p>
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="Belum Ada Soal Disimpan"
          description="Saat mengerjakan kuis, tekan ikon bookmark di sebelah atas soal untuk menyimpannya ke daftar ini."
          actionText="Mulai Kuis Sekarang"
          actionLink="/quiz"
        />
      )}
    </div>
  );
}
