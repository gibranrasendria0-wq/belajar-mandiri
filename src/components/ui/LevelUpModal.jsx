import React from 'react';
import { Trophy, Sparkles, ArrowRight, X } from 'lucide-react';
import { useGame } from '../../context/GameContext';

export default function LevelUpModal() {
  const { levelUpData, dismissLevelUpModal } = useGame();

  if (!levelUpData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-[#131722] border-2 border-indigo-500/60 p-8 text-center text-white shadow-2xl shadow-indigo-500/30">
        {/* Glow ambient circles */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-cyan-500/30 rounded-full blur-3xl pointer-events-none" />

        <button
          onClick={dismissLevelUpModal}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Trophy icon */}
        <div className="mx-auto w-24 h-24 rounded-3xl bg-gradient-to-tr from-amber-500 via-indigo-600 to-cyan-400 p-1 shadow-glow-primary animate-bounce">
          <div className="w-full h-full rounded-[22px] bg-[#0B0D12] flex items-center justify-center">
            <Trophy className="w-12 h-12 text-amber-400" />
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-wider border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5" /> Level Up Celebration
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-cyan-300 bg-clip-text text-transparent">
            LEVEL {levelUpData.newLevel} TERCAPAI!
          </h2>
          <p className="text-base font-semibold text-indigo-300">
            {levelUpData.title}
          </p>
          <p className="text-xs text-slate-400 max-w-xs mx-auto pt-1">
            Pengetahuanmu bertambah luas! Terus pertahankan ritme belajar dan selesaikan tantangan berikutnya.
          </p>
        </div>

        {/* Level Progression Comparison */}
        <div className="mt-6 flex items-center justify-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
          <div className="text-center">
            <span className="text-[10px] uppercase tracking-wider text-slate-400">Sebelumnya</span>
            <p className="text-xl font-black text-slate-300">Level {levelUpData.oldLevel}</p>
          </div>
          <ArrowRight className="w-5 h-5 text-indigo-400 shrink-0" />
          <div className="text-center">
            <span className="text-[10px] uppercase tracking-wider text-cyan-400 font-bold">Sekarang</span>
            <p className="text-2xl font-black text-cyan-300">Level {levelUpData.newLevel}</p>
          </div>
        </div>

        <button
          onClick={dismissLevelUpModal}
          className="mt-6 w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-sm tracking-wide shadow-lg shadow-indigo-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          Klaim & Lanjutkan Belajar
        </button>
      </div>
    </div>
  );
}
