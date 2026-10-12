import React, { useState } from 'react';
import {
  User,
  Bot,
  Rocket,
  Flame,
  Gamepad2,
  Brain,
  Compass,
  Trophy,
  Zap,
  Target,
  BookOpen,
  Calendar,
  Edit2,
  Check,
  History,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { DEFAULT_AVATARS } from '../lib/storage';
import StatCard from '../components/ui/StatCard';
import ProgressBar from '../components/ui/ProgressBar';

export default function Profile() {
  const {
    profile,
    updateProfile,
    levelInfo,
    totalXp,
    streak,
    quizHistory,
    completedLessons,
  } = useGame();

  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(profile.name || 'Player One');
  const [bioInput, setBioInput] = useState(profile.bio || '');
  const [selectedAvatarId, setSelectedAvatarId] = useState(profile.avatarId || 'cyber-ninja');

  const avatarIcons = {
    Bot,
    Rocket,
    Flame,
    Gamepad2,
    Brain,
    Compass,
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      name: nameInput.trim() || 'Player One',
      bio: bioInput.trim(),
      avatarId: selectedAvatarId,
    });
    setIsEditing(false);
  };

  // Performance breakdown by category
  const categoryStats = [
    { id: 'matematika', label: 'Matematika' },
    { id: 'informatika', label: 'Informatika' },
    { id: 'ipa', label: 'IPA (Sains)' },
    { id: 'bahasa-indonesia', label: 'Bahasa Indonesia' },
    { id: 'bahasa-inggris', label: 'Bahasa Inggris' },
    { id: 'ips', label: 'IPS (Sosial)' },
    { id: 'pengetahuan-umum', label: 'Pengetahuan Umum' },
  ].map((cat) => {
    const categoryQuizzes = quizHistory.filter((q) => q.category === cat.id);
    const categoryLessons = completedLessons.filter((l) => l.category === cat.id);
    const quizzesCount = categoryQuizzes.length;
    const avgAcc =
      quizzesCount > 0
        ? Math.round(categoryQuizzes.reduce((acc, q) => acc + (q.accuracy || 0), 0) / quizzesCount)
        : 0;

    return {
      ...cat,
      quizzesCount,
      lessonsCount: categoryLessons.length,
      avgAccuracy: avgAcc,
    };
  });

  const totalQuizzes = quizHistory.length;
  const overallAccuracy =
    totalQuizzes > 0
      ? Math.round(quizHistory.reduce((acc, q) => acc + (q.accuracy || 0), 0) / totalQuizzes)
      : 0;

  return (
    <div className="space-y-8 animate-fade-in pb-16 max-w-5xl mx-auto">
      {/* Profile Header Card */}
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] p-6 sm:p-8 shadow-sm dark:shadow-card-dark">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar Visual */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 p-1 shadow-glow-primary shrink-0">
            <div className="w-full h-full rounded-[22px] bg-[#131722] flex items-center justify-center text-white">
              {(() => {
                const currentAvatar = DEFAULT_AVATARS.find((a) => a.id === profile.avatarId);
                const IconComp = avatarIcons[currentAvatar?.icon] || Bot;
                return <IconComp className="w-12 h-12 text-cyan-400" />;
              })()}
            </div>
          </div>

          {/* User Details */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                  {profile.name}
                </h1>
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 mt-0.5">
                  {levelInfo.title} • Level {levelInfo.level}
                </p>
              </div>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="self-center sm:self-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-[#232B3E] hover:border-indigo-500 bg-slate-50 dark:bg-[#131722] text-xs font-bold text-slate-700 dark:text-slate-300 transition-all"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>{isEditing ? 'Tutup Edit' : 'Edit Profil'}</span>
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
              {profile.bio || 'Siap menaklukkan pengetahuan dan naik level setiap hari!'}
            </p>

            <div className="pt-3 max-w-md">
              <ProgressBar
                progress={levelInfo.progressPercent}
                height="h-2"
                label={`Progres ke Level ${levelInfo.level + 1}`}
                detail={`${levelInfo.xpInCurrentLevel} / ${levelInfo.xpNeededForNext} XP`}
              />
            </div>
          </div>
        </div>

        {/* Inline Profile Editing Form */}
        {isEditing && (
          <form
            onSubmit={handleSaveProfile}
            className="mt-6 pt-6 border-t border-slate-200 dark:border-white/5 space-y-4 animate-fade-in"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Nama Tampilan
                </label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-[#131722] border border-slate-200 dark:border-[#232B3E] text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-indigo-500"
                  placeholder="Masukkan nama pengguna"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Bio / Motto Belajar
                </label>
                <input
                  type="text"
                  value={bioInput}
                  onChange={(e) => setBioInput(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-[#131722] border border-slate-200 dark:border-[#232B3E] text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-indigo-500"
                  placeholder="Motto belajar Anda"
                />
              </div>
            </div>

            {/* Avatar Selector */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Pilih Karakter Avatar
              </label>
              <div className="flex flex-wrap gap-3">
                {DEFAULT_AVATARS.map((av) => {
                  const IconComp = avatarIcons[av.icon] || Bot;
                  const isSelected = selectedAvatarId === av.id;

                  return (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => setSelectedAvatarId(av.id)}
                      className={`p-3 rounded-2xl border flex items-center gap-2 transition-all ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-500/15 text-indigo-400 ring-2 ring-indigo-500/40'
                          : 'border-slate-200 dark:border-[#232B3E] bg-slate-50 dark:bg-[#131722] text-slate-400 hover:border-slate-400'
                      }`}
                    >
                      <IconComp className="w-5 h-5 text-indigo-400" />
                      <span className="text-xs font-bold">{av.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-bold"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-600/30 flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" /> Simpan Profil
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          icon={Zap}
          title="Total XP"
          value={`${totalXp}`}
          subtext="Seluruh perolehan"
          badgeColor="cyan"
          colorClass="from-cyan-500/20 to-blue-500/10 text-cyan-400"
        />
        <StatCard
          icon={Target}
          title="Akurasi Rata-rata"
          value={`${overallAccuracy}%`}
          subtext={`${totalQuizzes} sesi kuis`}
          badgeColor="emerald"
          colorClass="from-emerald-500/20 to-teal-500/10 text-emerald-400"
        />
        <StatCard
          icon={BookOpen}
          title="Materi Selesai"
          value={`${completedLessons.length}`}
          subtext="Modul pembelajaran"
          badgeColor="indigo"
          colorClass="from-indigo-500/20 to-purple-500/10 text-indigo-400"
        />
        <StatCard
          icon={Flame}
          title="Streak Tertinggi"
          value={`${streak.longestStreak} Hari`}
          subtext={`Aktif: ${streak.count} hari`}
          badgeColor="amber"
          colorClass="from-amber-500/20 to-orange-500/10 text-amber-400"
        />
      </div>

      {/* Category Performance Breakdown */}
      <div className="rounded-3xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] p-6 sm:p-8 shadow-sm dark:shadow-card-dark space-y-6">
        <div>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
            Statistik Pembelajaran per Kategori
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Performa penguasaan materi dan kuis berdasarkan mata pelajaran
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categoryStats.map((cat) => (
            <div
              key={cat.id}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-[#131722] border border-slate-200 dark:border-[#232B3E] space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  {cat.label}
                </span>
                <span className="text-xs font-extrabold text-cyan-500 dark:text-cyan-400">
                  {cat.avgAccuracy}% Akurasi
                </span>
              </div>
              <ProgressBar
                progress={cat.avgAccuracy}
                height="h-1.5"
                gradient="from-indigo-500 to-cyan-400"
              />
              <div className="flex justify-between text-[11px] text-slate-500 pt-1">
                <span>{cat.lessonsCount} Modul Selesai</span>
                <span>{cat.quizzesCount} Kuis Dikerjakan</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
