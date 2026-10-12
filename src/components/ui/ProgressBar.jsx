import React from 'react';

export default function ProgressBar({
  progress = 0,
  height = 'h-2.5',
  gradient = 'from-indigo-500 via-purple-500 to-cyan-400',
  showLabel = false,
  label = '',
  detail = '',
  className = '',
}) {
  const safeProgress = Math.min(100, Math.max(0, Math.round(progress || 0)));

  return (
    <div className={`w-full space-y-1.5 ${className}`}>
      {(showLabel || label || detail) && (
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-700 dark:text-slate-300">{label}</span>
          <span className="text-slate-500 dark:text-slate-400">
            {detail || `${safeProgress}%`}
          </span>
        </div>
      )}
      <div className={`w-full ${height} bg-slate-200 dark:bg-[#131722] rounded-full overflow-hidden p-0.5 border border-slate-300/40 dark:border-white/5`}>
        <div
          className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-500 ease-out shadow-sm`}
          style={{ width: `${safeProgress}%` }}
        />
      </div>
    </div>
  );
}
