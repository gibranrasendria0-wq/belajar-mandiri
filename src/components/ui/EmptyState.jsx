import React from 'react';
import { Search, Compass } from 'lucide-react';

export default function EmptyState({
  icon: Icon = Compass,
  title = 'Tidak Ada Data',
  description = 'Belum ada data yang cocok dengan kriteria pencarian atau filter Anda.',
  actionText,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center rounded-3xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E]">
      <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-500 dark:text-indigo-400 flex items-center justify-center mb-4 border border-indigo-500/20">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
        {title}
      </h3>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="mt-5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
