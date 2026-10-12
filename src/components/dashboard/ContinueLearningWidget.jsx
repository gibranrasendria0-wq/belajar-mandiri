import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowRight, CheckCircle2 } from 'lucide-react';
import { COURSES } from '../../data/courses';
import { LESSONS } from '../../data/lessons';
import { useGame } from '../../context/GameContext';
import DifficultyBadge from '../ui/DifficultyBadge';
import ProgressBar from '../ui/ProgressBar';

export default function ContinueLearningWidget() {
  const { completedLessons } = useGame();

  // Find the first uncompleted lesson, or the first lesson
  const completedIds = new Set(
    completedLessons.map((l) => (typeof l === 'string' ? l : l.id))
  );

  const currentLesson = LESSONS.find((l) => !completedIds.has(l.id)) || LESSONS[0];
  const relatedCourse = COURSES.find((c) => c.id === currentLesson?.courseId) || COURSES[0];

  // Calculate course completion progress
  const courseLessons = LESSONS.filter((l) => l.courseId === relatedCourse.id);
  const finishedInCourse = courseLessons.filter((l) => completedIds.has(l.id)).length;
  const progressPercent = Math.round((finishedInCourse / Math.max(1, courseLessons.length)) * 100);

  return (
    <div className="rounded-3xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] p-6 shadow-sm dark:shadow-card-dark space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-500 dark:text-purple-400 border border-purple-500/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Lanjutkan Pembelajaran
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Materi rekomendasi berikutnya untukmu
            </p>
          </div>
        </div>

        <DifficultyBadge difficulty={currentLesson.difficulty} />
      </div>

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#131722] border border-slate-200 dark:border-[#232B3E] space-y-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400">
            {relatedCourse.title}
          </span>
          <h4 className="text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">
            {currentLesson.title}
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {currentLesson.objectives?.[0] || relatedCourse.description}
          </p>
        </div>

        <div className="space-y-1.5">
          <ProgressBar
            progress={progressPercent}
            height="h-2"
            label="Progres Kursus"
            detail={`${finishedInCourse}/${courseLessons.length} Materi Selesai`}
          />
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-white/5">
          <span className="text-xs font-semibold text-slate-500">
            Estimasi: {currentLesson.duration} • +{currentLesson.xpReward} XP
          </span>

          <Link
            to={`/lessons/${currentLesson.id}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/25 transition-all"
          >
            <span>Buka Materi</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
