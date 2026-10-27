import React from 'react';
import {
  Footprints,
  Zap,
  Crown,
  Compass,
  Flame,
  Award,
  Target,
  Sparkles,
  Lock,
  CheckCircle2,
} from 'lucide-react';
import ProgressBar from '../ui/ProgressBar';

export default function AchievementCard({ achievement, isUnlocked, unlockedAt, progress }) {
  const iconMap = {
    Footprints,
    Zap,
    Crown,
    Compass,
    Flame,
    Award,
    Target,
    Sparkles,
  };

  const IconComponent = iconMap[achievement.icon] || Award;
  const progressPercent = progress ? Math.round((progress.current / progress.max) * 100) : 0;

  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-6 border transition-all duration-300 ${
        isUnlocked
          ? 'bg-white dark:bg-[#191F2D] border-blue-500/40 shadow-lg dark:shadow-card-dark'
          : 'bg-white/60 dark:bg-[#191F2D]/60 border-slate-200 dark:border-[#232B3E] opacity-75'
      }`}
    >
      {/* Background ambient glow if unlocked */}
      {isUnlocked && (
        <div className="absolute -top-12 -right-12 w-28 h-28 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />
      )}

      <div className="flex items-start gap-4">
        {/* Badge Icon */}
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border shadow-inner ${
            isUnlocked
              ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/30'
              : 'bg-slate-100 dark:bg-[#131722] text-slate-400 dark:text-slate-600 border-slate-200 dark:border-white/5'
          }`}
        >
          {isUnlocked ? (
            <IconComponent className="w-7 h-7" />
          ) : (
            <Lock className="w-6 h-6 text-slate-400 dark:text-slate-500" />
          )}
        </div>

        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-base font-extrabold text-slate-900 dark:text-white truncate">
              {achievement.title}
            </h4>
            <span
              className={`shrink-0 text-xs font-black px-2.5 py-0.5 rounded-full border ${
                isUnlocked
                  ? 'bg-cyan-500/10 text-cyan-500 border-cyan-500/20'
                  : 'bg-slate-100 dark:bg-white/5 text-slate-400 border-slate-200 dark:border-white/10'
              }`}
            >
              +{achievement.xpReward} XP
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            {achievement.description}
          </p>

          {/* Progress or Unlock Timestamp */}
          <div className="pt-3">
            {isUnlocked ? (
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Terbuka {unlockedAt ? `pada ${new Date(unlockedAt).toLocaleDateString('id-ID')}` : ''}</span>
              </div>
            ) : progress ? (
              <div className="space-y-1">
                <ProgressBar
                  progress={progressPercent}
                  height="h-1.5"
                  label=""
                  detail={`${progress.current} / ${progress.max}`}
                  gradient="from-indigo-500 to-purple-500"
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
