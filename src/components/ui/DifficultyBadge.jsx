import React from 'react';

export default function DifficultyBadge({ difficulty = 'Easy', size = 'sm' }) {
  const norm = (difficulty || '').toLowerCase();

  let style = 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
  let label = 'Easy';

  if (norm === 'medium') {
    style = 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
    label = 'Medium';
  } else if (norm === 'hard') {
    style = 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
    label = 'Hard';
  }

  const padding = size === 'xs' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  return (
    <span
      className={`inline-flex items-center font-bold uppercase tracking-wider rounded-full border ${padding} ${style}`}
    >
      <span className="w-1.5 h-1.5 rounded-full mr-1.5 bg-current animate-pulse" />
      {label}
    </span>
  );
}
