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
  const getBadgeStyle = () => {
    switch (badgeColor) {
      case 'emerald':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'amber':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'cyan':
      case 'blue':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      default:
        return 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20';
    }
  };

  return (
    <div className="relative group flex flex-col justify-between overflow-hidden rounded-2xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] p-5 shadow-sm hover:shadow-md dark:shadow-card-dark transition-all duration-300 hover:border-blue-500/40 min-h-[140px]">
      {/* Top Header: Title & Icon */}
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 truncate">
          {title}
        </p>

        {Icon && (
          <div className={`p-2 rounded-xl ${colorClass} border border-slate-200/50 dark:border-white/5 shrink-0`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>

      {/* Center: Value & Badge */}
      <div className="my-2 flex flex-wrap items-center gap-2">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight whitespace-nowrap">
          {value}
        </h3>

        {badgeText && (
          <span className={`inline-flex items-center text-[11px] font-bold px-2 py-0.5 rounded-lg border whitespace-nowrap ${getBadgeStyle()}`}>
            {badgeText}
          </span>
        )}
      </div>

      {/* Bottom: Subtext */}
      {subtext && (
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
          {subtext}
        </p>
      )}
    </div>
  );
}
