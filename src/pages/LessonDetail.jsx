import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  BookOpen,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Zap,
  HelpCircle,
  Lightbulb,
  ListOrdered,
  FileText,
  Bookmark,
  Share2,
} from 'lucide-react';
import { LESSONS } from '../data/lessons';
import { COURSES } from '../data/courses';
import { useGame } from '../context/GameContext';
import DifficultyBadge from '../components/ui/DifficultyBadge';
import ProgressBar from '../components/ui/ProgressBar';

export default function LessonDetail() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { completedLessons, completeLesson, bookmarks, toggleBookmarkLesson } = useGame();

  // Find active lesson
  const currentLesson = useMemo(() => {
    return LESSONS.find((l) => l.id === lessonId) || LESSONS[0];
  }, [lessonId]);

  // Related course
  const parentCourse = useMemo(() => {
    return COURSES.find((c) => c.id === currentLesson?.courseId) || COURSES[0];
  }, [currentLesson]);

  // All lessons for this course
  const courseLessons = useMemo(() => {
    return LESSONS.filter((l) => l.courseId === parentCourse.id);
  }, [parentCourse]);

  // Next and Prev lessons
  const currentIndex = courseLessons.findIndex((l) => l.id === currentLesson.id);
  const prevLesson = currentIndex > 0 ? courseLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex >= 0 && currentIndex < courseLessons.length - 1
      ? courseLessons[currentIndex + 1]
      : null;

  // Completion check
  const isCompleted = useMemo(() => {
    return completedLessons.some((l) =>
      typeof l === 'string' ? l === currentLesson.id : l.id === currentLesson.id
    );
  }, [completedLessons, currentLesson.id]);

  // Bookmark check
  const isBookmarked = useMemo(() => {
    return (bookmarks?.lessons || []).includes(currentLesson.id);
  }, [bookmarks, currentLesson.id]);

  const handleMarkComplete = () => {
    completeLesson(currentLesson.id, currentLesson.category, currentLesson.title);
  };

  const handleStartRelatedQuiz = () => {
    navigate(`/quiz/play?category=${currentLesson.category}&difficulty=${currentLesson.difficulty.toLowerCase()}&count=5`);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Breadcrumb & Navigation Topbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-[#232B3E]">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <Link to="/courses" className="hover:text-indigo-500 transition-colors">
            Katalog Materi
          </Link>
          <span>/</span>
          <span className="text-slate-700 dark:text-slate-300">{parentCourse.title}</span>
          <span>/</span>
          <span className="text-indigo-600 dark:text-indigo-400 font-bold truncate max-w-[200px]">
            {currentLesson.title}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {prevLesson && (
            <Link
              to={`/lessons/${prevLesson.id}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#232B3E] bg-white dark:bg-[#191F2D] text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-indigo-500 transition-all"
            >
              <ChevronLeft className="w-4 h-4" /> Materi Sebelumnya
            </Link>
          )}
          {nextLesson && (
            <Link
              to={`/lessons/${nextLesson.id}`}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-[#232B3E] bg-white dark:bg-[#191F2D] text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-indigo-500 transition-all"
            >
              Materi Berikutnya <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      {/* Main Grid: Content (Left 2 cols) & Submaterials/Progress (Right 1 col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hero Header */}
          <div className="rounded-3xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] p-6 sm:p-8 shadow-sm dark:shadow-card-dark space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                {currentLesson.category}
              </span>
              <DifficultyBadge difficulty={currentLesson.difficulty} />
              <span className="flex items-center gap-1 text-xs font-semibold text-slate-500">
                <Clock className="w-3.5 h-3.5" /> {currentLesson.duration}
              </span>
              <span className="flex items-center gap-1 text-xs font-bold text-cyan-500 dark:text-cyan-400">
                <Zap className="w-3.5 h-3.5 fill-current" /> +{currentLesson.xpReward} XP
              </span>

              {/* Bookmark Toggle */}
              <button
                onClick={() => toggleBookmarkLesson(currentLesson.id)}
                className={`ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                  isBookmarked
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-500 dark:text-amber-400 shadow-sm'
                    : 'bg-slate-50 dark:bg-[#131722] border-slate-200 dark:border-[#232B3E] text-slate-500 hover:text-slate-800 dark:hover:text-white'
                }`}
                title={isBookmarked ? 'Hapus dari Simpanan' : 'Simpan Materi Ini'}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-current' : ''}`} />
                <span>{isBookmarked ? 'Tersimpan' : 'Simpan'}</span>
              </button>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {currentLesson.title}
            </h1>

            {/* Objectives */}
            {currentLesson.objectives && (
              <div className="pt-4 border-t border-slate-100 dark:border-white/5 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Tujuan Pembelajaran:
                </h4>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  {currentLesson.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Structured Content Sections */}
          <div className="rounded-3xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] p-6 sm:p-8 shadow-sm dark:shadow-card-dark space-y-8">
            {currentLesson.contentSections?.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                  {section.heading}
                </h3>
                <div className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line font-normal">
                  {section.body}
                </div>
                {section.callout && (
                  <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-[#131722] border-l-4 border-indigo-500 text-xs sm:text-sm text-slate-800 dark:text-indigo-200 leading-relaxed font-medium mt-3">
                    {section.callout}
                  </div>
                )}
              </div>
            ))}

            {/* Sample Problem & Solution */}
            {currentLesson.sampleProblem && (
              <div className="mt-8 p-6 rounded-2xl bg-slate-50 dark:bg-[#131722] border border-slate-200 dark:border-[#232B3E] space-y-4">
                <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-extrabold text-sm sm:text-base">
                  <Lightbulb className="w-5 h-5 text-amber-400" />
                  <span>Contoh Soal & Langkah Pembahasan:</span>
                </div>

                <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  {currentLesson.sampleProblem.question}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-white/5">
                  {currentLesson.sampleProblem.steps?.map((step, sIdx) => (
                    <p key={sIdx} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {step}
                    </p>
                  ))}
                </div>

                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-400">
                  {currentLesson.sampleProblem.answer}
                </div>
              </div>
            )}

            {/* Key Summary */}
            {currentLesson.summary && (
              <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/30 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Rangkuman Inti Materi:
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                  {currentLesson.summary}
                </p>
              </div>
            )}
          </div>

          {/* Action Bar: Complete Button & Quiz Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-3xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E]">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {isCompleted ? (
                <div className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" /> Materi Sudah Selesai (+25 XP)
                </div>
              ) : (
                <button
                  onClick={handleMarkComplete}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                >
                  <CheckCircle2 className="w-4 h-4" /> Tandai Selesai (+25 XP)
                </button>
              )}
            </div>

            <button
              onClick={handleStartRelatedQuiz}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-md shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <HelpCircle className="w-4 h-4 text-cyan-300" /> Kuis Evaluasi Materi (5 Soal)
            </button>
          </div>
        </div>

        {/* Sidebar: Submaterials & Course Lessons List */}
        <div className="space-y-6">
          <div className="rounded-3xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] p-6 shadow-sm dark:shadow-card-dark space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <ListOrdered className="w-4 h-4 text-indigo-500" />
              <span>Daftar Submateri</span>
            </h3>

            <div className="space-y-2">
              {currentLesson.submaterials?.map((sub) => (
                <div
                  key={sub.id}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-[#131722] border border-slate-200 dark:border-[#232B3E] text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  {sub.title}
                </div>
              ))}
            </div>
          </div>

          {/* Other lessons in this course */}
          <div className="rounded-3xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] p-6 shadow-sm dark:shadow-card-dark space-y-4">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Modul dalam Kursus Ini</span>
            </h3>

            <div className="space-y-2.5">
              {courseLessons.map((les, i) => {
                const isLesDone = completedLessons.some((l) =>
                  typeof l === 'string' ? l === les.id : l.id === les.id
                );
                const isCurrent = les.id === currentLesson.id;

                return (
                  <Link
                    key={les.id}
                    to={`/lessons/${les.id}`}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      isCurrent
                        ? 'bg-indigo-500/10 border-indigo-500 text-indigo-600 dark:text-indigo-400 font-bold'
                        : 'bg-slate-50 dark:bg-[#131722] border-slate-200 dark:border-[#232B3E] text-slate-700 dark:text-slate-300 hover:border-indigo-400'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-xs font-mono">{i + 1}.</span>
                      <span className="text-xs truncate">{les.title}</span>
                    </div>

                    {isLesDone && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
