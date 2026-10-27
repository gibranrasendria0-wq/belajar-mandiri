import React, { useState, useMemo } from 'react';
import {
  Trophy,
  Flame,
  Zap,
  Medal,
  Crown,
  Sparkles,
  TrendingUp,
  Shield,
  Search,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import UserAvatar from '../components/ui/UserAvatar';

// Daftar rival pelajar virtual realistis untuk gamifikasi
const MOCK_LEADERBOARD = [
  { id: 'rival-1', name: 'Nadia Putri', avatarId: 'quantum-owl', level: 12, xp: 4850, streak: 14, rank: 1, title: 'Archmage' },
  { id: 'rival-2', name: 'Rian Pratama', avatarId: 'dragon-mage', level: 11, xp: 4220, streak: 9, rank: 2, title: 'Master' },
  { id: 'rival-3', name: 'Fajar Nugraha', avatarId: 'cyber-ninja', level: 10, xp: 3780, streak: 12, rank: 3, title: 'Expert' },
  { id: 'rival-4', name: 'Aisyah Zahra', avatarId: 'astro-scholar', level: 8, xp: 2950, streak: 7, rank: 4, title: 'Cendekiawan' },
  { id: 'rival-5', name: 'Budi Santoso', avatarId: 'zen-master', level: 7, xp: 2310, streak: 5, rank: 5, title: 'Penjelajah' },
  { id: 'rival-6', name: 'Siti Rahma', avatarId: 'pixel-hero', level: 6, xp: 1840, streak: 4, rank: 6, title: 'Pelajar Mandiri' },
  { id: 'rival-7', name: 'Dimas Anggara', avatarId: 'quantum-owl', level: 5, xp: 1420, streak: 3, rank: 7, title: 'Pelajar Mandiri' },
  { id: 'rival-8', name: 'Kevin Wijaya', avatarId: 'cyber-ninja', level: 4, xp: 980, streak: 2, rank: 8, title: 'Novis' },
  { id: 'rival-9', name: 'Clara Bella', avatarId: 'dragon-mage', level: 3, xp: 620, streak: 1, rank: 9, title: 'Novis' },
];

export default function Leaderboard() {
  const { profile, totalXp, levelInfo, streak } = useGame();
  const [activeTab, setActiveTab] = useState('all-time'); // 'all-time' | 'weekly'
  const [searchQuery, setSearchQuery] = useState('');

  // Masukkan pemain asli ke dalam leaderboard dan hitung urutan peringkat
  const allRankings = useMemo(() => {
    const userEntry = {
      id: 'current-user',
      isCurrentUser: true,
      name: profile?.name || 'Player One',
      avatarId: profile?.avatarId || 'cyber-ninja',
      avatarUrl: profile?.avatarUrl || null,
      level: levelInfo.level,
      xp: activeTab === 'weekly' ? Math.round(totalXp * 0.45) : totalXp,
      streak: streak.count,
      title: levelInfo.title,
    };

    const simulatedRivals = MOCK_LEADERBOARD.map((r) => ({
      ...r,
      xp: activeTab === 'weekly' ? Math.round(r.xp * 0.4) : r.xp,
    }));

    const combined = [...simulatedRivals, userEntry];
    combined.sort((a, b) => b.xp - a.xp);

    return combined.map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));
  }, [profile, totalXp, levelInfo, streak, activeTab]);

  const userRank = allRankings.find((r) => r.isCurrentUser)?.rank || 1;

  const filteredRankings = useMemo(() => {
    if (!searchQuery.trim()) return allRankings;
    return allRankings.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );
  }, [allRankings, searchQuery]);

  // Top 3 Podium
  const topThree = allRankings.slice(0, 3);

  return (
    <div className="space-y-8 animate-fade-in pb-16 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#191F2D] border border-blue-500/30 p-8 sm:p-10 text-slate-900 dark:text-white shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Liga Pelajar Nasional</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
              Papan Peringkat (Leaderboard)
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Tingkatkan XP dengan menyelesaikan modul materi dan kuis untuk meraih podium peringkat tertinggi!
            </p>
          </div>

          {/* User Rank Quick Badge */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#131722] border border-slate-200 dark:border-[#232B3E] flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 font-black text-xl flex items-center justify-center shadow-md">
              #{userRank}
            </div>
            <div>
              <p className="text-xs uppercase font-bold text-slate-400">Peringkat Anda</p>
              <p className="text-sm font-black text-slate-900 dark:text-white">{levelInfo.title}</p>
              <p className="text-[11px] text-blue-500 font-bold">{totalXp.toLocaleString()} Total XP</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {/* Silver (Rank 2) */}
        {topThree[1] && (
          <div className="order-2 md:order-1 rounded-3xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] p-6 flex flex-col items-center text-center shadow-md relative overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-black text-sm flex items-center justify-center mb-3 border border-slate-300 dark:border-slate-600">
              2
            </div>
            <UserAvatar
              avatarUrl={topThree[1].avatarUrl}
              avatarId={topThree[1].avatarId}
              name={topThree[1].name}
              size="lg"
            />
            <h3 className="mt-3 font-extrabold text-slate-900 dark:text-white text-base">
              {topThree[1].name}
            </h3>
            <span className="text-xs text-indigo-500 font-semibold">{topThree[1].title}</span>
            <div className="mt-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#131722] text-xs font-bold text-cyan-500">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>{topThree[1].xp.toLocaleString()} XP</span>
            </div>
          </div>
        )}

        {/* Gold (Rank 1) */}
        {topThree[0] && (
          <div className="order-1 md:order-2 rounded-3xl bg-white dark:bg-[#191F2D] border-2 border-amber-400 p-6 sm:p-8 flex flex-col items-center text-center shadow-xl relative overflow-hidden transform md:-translate-y-2">
            <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 font-black text-base flex items-center justify-center mb-3 shadow-md shadow-amber-400/40">
              <Crown className="w-5 h-5 fill-current text-slate-950" />
            </div>
            <UserAvatar
              avatarUrl={topThree[0].avatarUrl}
              avatarId={topThree[0].avatarId}
              name={topThree[0].name}
              size="xl"
            />
            <h3 className="mt-3 font-black text-slate-900 dark:text-white text-lg">
              {topThree[0].name}
            </h3>
            <span className="text-xs text-amber-500 font-bold">{topThree[0].title}</span>
            <div className="mt-4 flex items-center gap-2 px-4 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-xs font-black text-amber-500 dark:text-amber-400">
              <Zap className="w-4 h-4 fill-current" />
              <span>{topThree[0].xp.toLocaleString()} XP</span>
            </div>
          </div>
        )}

        {/* Bronze (Rank 3) */}
        {topThree[2] && (
          <div className="order-3 md:order-3 rounded-3xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] p-6 flex flex-col items-center text-center shadow-md relative overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-amber-700/20 text-amber-700 dark:text-amber-500 font-black text-sm flex items-center justify-center mb-3 border border-amber-700/30">
              3
            </div>
            <UserAvatar
              avatarUrl={topThree[2].avatarUrl}
              avatarId={topThree[2].avatarId}
              name={topThree[2].name}
              size="lg"
            />
            <h3 className="mt-3 font-extrabold text-slate-900 dark:text-white text-base">
              {topThree[2].name}
            </h3>
            <span className="text-xs text-indigo-500 font-semibold">{topThree[2].title}</span>
            <div className="mt-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#131722] text-xs font-bold text-cyan-500">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>{topThree[2].xp.toLocaleString()} XP</span>
            </div>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Period Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('all-time')}
            className={`flex-1 sm:flex-initial px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'all-time'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Sepanjang Masa
          </button>
          <button
            onClick={() => setActiveTab('weekly')}
            className={`flex-1 sm:flex-initial px-5 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'weekly'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Minggu Ini
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama pelajar..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 dark:border-[#232B3E] bg-white dark:bg-[#191F2D] text-xs text-slate-800 dark:text-white focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="rounded-3xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] overflow-hidden shadow-sm">
        <div className="divide-y divide-slate-100 dark:divide-[#232B3E]">
          {filteredRankings.map((item) => {
            const isUser = item.isCurrentUser;

            return (
              <div
                key={item.id}
                className={`p-4 sm:p-5 flex items-center justify-between gap-4 transition-colors ${
                  isUser
                    ? 'bg-indigo-500/10 dark:bg-indigo-600/15 border-l-4 border-l-indigo-600 font-bold'
                    : 'hover:bg-slate-50 dark:hover:bg-[#131722]/50'
                }`}
              >
                {/* Left: Rank & Avatar & Name */}
                <div className="flex items-center gap-3 sm:gap-4 truncate">
                  <div className="w-8 text-center font-black text-sm text-slate-500 dark:text-slate-400 shrink-0">
                    {item.rank === 1 ? '🥇' : item.rank === 2 ? '🥈' : item.rank === 3 ? '🥉' : `#${item.rank}`}
                  </div>

                  <UserAvatar
                    avatarUrl={item.avatarUrl}
                    avatarId={item.avatarId}
                    name={item.name}
                    size="md"
                  />

                  <div className="truncate">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                        {item.name}
                      </p>
                      {isUser && (
                        <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-indigo-500 text-white shrink-0">
                          Anda
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Lvl {item.level} • {item.title}
                    </p>
                  </div>
                </div>

                {/* Right: Streak & XP */}
                <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                  <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-xl">
                    <Flame className="w-3.5 h-3.5 fill-current" />
                    <span>{item.streak}h</span>
                  </div>

                  <div className="text-right">
                    <p className="text-sm sm:text-base font-black text-cyan-600 dark:text-cyan-400 flex items-center gap-1 justify-end">
                      <Zap className="w-4 h-4 fill-current" />
                      <span>{item.xp.toLocaleString()}</span>
                    </p>
                    <span className="text-[10px] uppercase font-bold text-slate-400">XP</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}