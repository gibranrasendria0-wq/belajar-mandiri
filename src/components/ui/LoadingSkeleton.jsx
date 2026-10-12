import React from 'react';

export default function LoadingSkeleton({ count = 3, type = 'card' }) {
  const items = Array.from({ length: count });

  if (type === 'card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((_, i) => (
          <div
            key={i}
            className="rounded-3xl p-6 bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] animate-pulse space-y-4"
          >
            <div className="h-6 w-1/3 bg-slate-200 dark:bg-slate-700 rounded-lg" />
            <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="h-4 w-1/2 bg-slate-200 dark:bg-slate-700 rounded" />
            <div className="pt-4 flex justify-between items-center">
              <div className="h-8 w-20 bg-slate-200 dark:bg-slate-700 rounded-lg" />
              <div className="h-8 w-24 bg-slate-200 dark:bg-slate-700 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((_, i) => (
        <div
          key={i}
          className="h-16 w-full rounded-2xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] animate-pulse"
        />
      ))}
    </div>
  );
}
