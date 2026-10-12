import React from 'react';
import { Target, CheckCircle2, Gift, Sparkles, Brain, BookOpen } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import ProgressBar from '../ui/ProgressBar';

export default function DailyQuestsWidget() {
  const { dailyQuests, claimQuestReward } = useGame();

  const quests = dailyQuests?.quests || [];

  const getIcon = (id) => {
    switch (id) {
      case 'quest_complete_quiz':
        return <Brain className="w-5 h-5 text-indigo-400" />;
      case 'quest_answer_questions':
        return <CheckCircle2 className="w-5 h-5 text-cyan-400" />;
      case 'quest_complete_lesson':
        return <BookOpen className="w-5 h-5 text-emerald-400" />;
      default:
        return <Target className="w-5 h-5 text-amber-400" />;
    }
  };

  const completedCount = quests.filter((q) => q.completed).length;

  return (
    <div className="rounded-3xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] p-6 shadow-sm dark:shadow-card-dark space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 border border-indigo-500/20">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Daily Quests (Misi Harian)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Reset otomatis setiap hari pukul 00:00
            </p>
          </div>
        </div>

        <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
          {completedCount} / {quests.length} Selesai
        </span>
      </div>

      <div className="space-y-3">
        {quests.map((quest) => {
          const progressPercent = Math.min(100, Math.round((quest.progress / quest.target) * 100));
          const canClaim = quest.completed && !quest.claimed;

          return (
            <div
              key={quest.id}
              className={`p-4 rounded-2xl border transition-all ${
                quest.claimed
                  ? 'bg-slate-50/50 dark:bg-[#131722]/50 border-slate-200 dark:border-white/5 opacity-70'
                  : quest.completed
                  ? 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-500/40 shadow-sm'
                  : 'bg-white dark:bg-[#131722] border-slate-200 dark:border-[#232B3E]'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-white/5 shrink-0 mt-0.5">
                    {getIcon(quest.id)}
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {quest.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {quest.description}
                    </p>
                  </div>
                </div>

                {/* Claim / Status Button */}
                <div className="shrink-0">
                  {quest.claimed ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Diklaim
                    </span>
                  ) : canClaim ? (
                    <button
                      onClick={() => claimQuestReward(quest.id)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-indigo-600 text-white font-bold text-xs tracking-wide shadow-md shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all animate-pulse"
                    >
                      <Gift className="w-3.5 h-3.5" /> Klaim +{quest.rewardXp} XP
                    </button>
                  ) : (
                    <span className="inline-flex items-center text-xs font-bold text-slate-400 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded-xl">
                      +{quest.rewardXp} XP
                    </span>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-3">
                <ProgressBar
                  progress={progressPercent}
                  height="h-1.5"
                  label=""
                  detail={`${quest.progress} / ${quest.target}`}
                  gradient={quest.completed ? 'from-emerald-500 to-teal-400' : 'from-indigo-500 to-cyan-400'}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
