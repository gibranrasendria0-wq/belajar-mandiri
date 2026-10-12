import React from 'react';

export default function StatCard({
  icon: Icon,
  title,
  value,
  subtext,
  badgeText,
  badgeColor = 'indigo',
  colorClass = 'from-indigo-500/20 to-purple-500/10 text-indigo-400',
}) {
  return (
    <div className="relative group overflow-hidden rounded-2xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] p-5 shadow-sm hover:shadow-md dark:shadow-card-dark transition-all duration-300 hover:border-indigo-500/40">
      {/* Background glow hover effect */}
      <div className="absolute -top-12 -right-12 w-28 h-28 bg-indigo-500/10 dark:bg-indigo-500/15 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {value}
            </h3>
            {badgeText && (
              <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${
                badgeColor === 'emerald'
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                  : badgeColor === 'amber'
                  ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                  : 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20'
              }`}>
                {badgeText}
              </span>
            )}
          </div>
          {subtext && (
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {subtext}
            </p>
          )}
        </div>

        {Icon && (
          <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClass} border border-slate-200/50 dark:border-white/5 shadow-inner`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>
    </div>
  );
}
