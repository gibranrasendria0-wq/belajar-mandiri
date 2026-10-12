import React from 'react';
import { CheckCircle2, AlertCircle, Sparkles, Award, Flame, X, Trophy } from 'lucide-react';
import { useGame } from '../../context/GameContext';

export default function ToastNotification() {
  const { toasts, dismissToast } = useGame();

  if (!toasts || toasts.length === 0) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'levelup':
        return <Trophy className="w-5 h-5 text-amber-400 animate-bounce" />;
      case 'achievement':
        return <Award className="w-5 h-5 text-purple-400" />;
      case 'xp':
        return <Sparkles className="w-5 h-5 text-cyan-400 animate-spin" />;
      case 'streak':
        return <Flame className="w-5 h-5 text-rose-500 animate-pulse" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-rose-400" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
    }
  };

  const getBorderColor = (type) => {
    switch (type) {
      case 'levelup':
        return 'border-amber-500/50 shadow-amber-500/20';
      case 'achievement':
        return 'border-purple-500/50 shadow-purple-500/20';
      case 'xp':
        return 'border-cyan-500/50 shadow-cyan-500/20';
      case 'streak':
        return 'border-rose-500/50 shadow-rose-500/20';
      default:
        return 'border-indigo-500/40 shadow-indigo-500/10';
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto transform transition-all duration-300 ease-out translate-y-0 opacity-100 flex items-start gap-3 p-4 rounded-2xl bg-[#131722]/95 dark:bg-[#191F2D]/95 text-white backdrop-blur-xl border ${getBorderColor(
            toast.type
          )} shadow-xl`}
        >
          <div className="p-2 rounded-xl bg-white/5 border border-white/10 shrink-0">
            {getIcon(toast.type)}
          </div>
          <div className="flex-1 min-w-0 pt-0.5">
            <h4 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
              {toast.title}
              {toast.rewardXp && (
                <span className="text-xs font-extrabold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                  +{toast.rewardXp} XP
                </span>
              )}
            </h4>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
              {toast.message}
            </p>
          </div>
          <button
            onClick={() => dismissToast(toast.id)}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Tutup notifikasi"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
