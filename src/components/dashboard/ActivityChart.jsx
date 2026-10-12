import React, { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { TrendingUp, BarChart2 } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { useTheme } from '../../context/ThemeContext';

export default function ActivityChart() {
  const { quizHistory, completedLessons } = useGame();
  const { isDark } = useTheme();

  // Aggregate activity across past 7 days
  const chartData = useMemo(() => {
    const days = [];
    const today = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('id-ID', { weekday: 'short' });

      // Count XP from quiz completed on dateStr
      let xp = 0;
      let quizzes = 0;

      quizHistory.forEach((q) => {
        if (q.completedAt && q.completedAt.startsWith(dateStr)) {
          xp += q.xpEarned || 0;
          quizzes++;
        }
      });

      // Count XP from completed lessons on dateStr (25 XP each)
      completedLessons.forEach((l) => {
        if (l.completedAt && l.completedAt.startsWith(dateStr)) {
          xp += 25;
        }
      });

      days.push({
        date: dayName,
        fullDate: dateStr,
        xp,
        quizzes,
      });
    }

    return days;
  }, [quizHistory, completedLessons]);

  const totalWeekXp = chartData.reduce((acc, cur) => acc + cur.xp, 0);

  return (
    <div className="rounded-3xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] p-6 shadow-sm dark:shadow-card-dark space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-500 dark:text-cyan-400 border border-cyan-500/20">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Aktivitas Belajar 7 Hari Terakhir
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Perkembangan akumulasi XP harian
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-semibold text-slate-400">Total Minggu Ini</span>
          <p className="text-lg font-black text-indigo-600 dark:text-indigo-400">
            +{totalWeekXp} XP
          </p>
        </div>
      </div>

      <div className="h-56 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
            <defs>
              <linearGradient id="xpGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stop-color="#6366F1" stopOpacity={0.4} />
                <stop offset="95%" stop-color="#06B6D4" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={isDark ? '#232B3E' : '#E2E8F0'}
            />
            <XAxis
              dataKey="date"
              stroke={isDark ? '#64748B' : '#94A3B8'}
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke={isDark ? '#64748B' : '#94A3B8'}
              fontSize={11}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="p-3 rounded-xl bg-[#131722] border border-white/10 text-white shadow-xl text-xs space-y-1">
                      <p className="font-bold text-indigo-300">{data.fullDate}</p>
                      <p className="text-cyan-400 font-extrabold">{data.xp} XP Diperoleh</p>
                      <p className="text-slate-400">{data.quizzes} Sesi Kuis Selesai</p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="xp"
              stroke="#6366F1"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#xpGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
