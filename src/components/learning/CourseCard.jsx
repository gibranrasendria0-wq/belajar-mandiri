import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, BookOpen, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import DifficultyBadge from '../ui/DifficultyBadge';
import ProgressBar from '../ui/ProgressBar';
import { LESSONS } from '../../data/lessons';
import { useGame } from '../../context/GameContext';

export default function CourseCard({ course }) {
  const { completedLessons } = useGame();

  const completedIds = new Set(
    completedLessons.map((l) => (typeof l === 'string' ? l : l.id))
  );

  // Lessons belonging to this course
  const courseLessons = LESSONS.filter((l) => l.courseId === course.id);
  const totalLessons = courseLessons.length || course.lessonsCount || 1;
  const completedInThisCourse = courseLessons.filter((l) => completedIds.has(l.id)).length;
  const progressPercent = Math.round((completedInThisCourse / totalLessons) * 100);
  const isAllCompleted = progressPercent === 100;

  // First unfinished lesson or first lesson
  const nextLesson = courseLessons.find((l) => !completedIds.has(l.id)) || courseLessons[0];
  const targetLink = nextLesson ? `/lessons/${nextLesson.id}` : `/courses`;

  return (
    <div className="group rounded-3xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] hover:border-indigo-500/40 p-6 flex flex-col justify-between shadow-sm hover:shadow-xl dark:shadow-card-dark transition-all duration-300">
      <div className="space-y-4">
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            {course.category}
          </span>
          <DifficultyBadge difficulty={course.level} />
        </div>

        {/* Title and description */}
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">
            {course.title}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
            {course.description}
          </p>
        </div>

        {/* Tags */}
        {course.tags && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {course.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-semibold px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-white/5 space-y-4">
        {/* Progress bar */}
        <ProgressBar
          progress={progressPercent}
          height="h-2"
          label={isAllCompleted ? 'Selesai Sempurna' : 'Progres Belajar'}
          detail={`${completedInThisCourse} / ${totalLessons} Materi`}
          gradient={isAllCompleted ? 'from-emerald-500 to-teal-400' : 'from-indigo-500 to-cyan-400'}
        />

        {/* Meta & Action */}
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {course.duration}
            </span>
            <span className="flex items-center gap-1 text-cyan-500 dark:text-cyan-400 font-bold">
              <Zap className="w-3.5 h-3.5 fill-current" />
              {course.totalXp} XP
            </span>
          </div>

          <Link
            to={targetLink}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              isAllCompleted
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/25'
            }`}
          >
            {isAllCompleted ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" /> Pelajari Ulang
              </>
            ) : completedInThisCourse > 0 ? (
              <>
                Lanjut Belajar <ArrowRight className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                Mulai Belajar <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
