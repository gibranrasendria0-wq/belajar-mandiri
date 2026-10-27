import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Flame,
  Zap,
  Target,
  BookOpen,
  Edit2,
  Check,
  Image as ImageIcon,
  Upload,
  X,
  Mail,
  ShieldCheck,
  LogIn,
  Users,
  LogOut,
  Camera,
  CheckCircle2,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { DEFAULT_AVATARS } from '../lib/storage';
import { processImageFile } from '../lib/imageUtils';
import StatCard from '../components/ui/StatCard';
import ProgressBar from '../components/ui/ProgressBar';
import UserAvatar from '../components/ui/UserAvatar';

export default function Profile() {
  const {
    profile,
    updateProfile,
    levelInfo,
    totalXp,
    streak,
    quizHistory,
    completedLessons,
    isLoggedIn,
    logoutUser,
  } = useGame();

  const fileInputRef = useRef(null);

  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(profile.name || 'Player One');
  const [bioInput, setBioInput] = useState(profile.bio || '');
  const [selectedAvatarId, setSelectedAvatarId] = useState(profile.avatarId || 'cyber-ninja');
  const [customAvatarUrl, setCustomAvatarUrl] = useState(profile.avatarUrl || null);
  const [isUploading, setIsUploading] = useState(false);
  const [imageError, setImageError] = useState('');

  // Handle uploading image from user gallery
  const handleGalleryUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageError('');
    setIsUploading(true);

    try {
      const result = await processImageFile(file, { maxSize: 300, quality: 0.85 });
      setCustomAvatarUrl(result.dataUrl);

      // Save directly to profile so user gets immediate visual update
      updateProfile({
        avatarUrl: result.dataUrl,
      });
    } catch (err) {
      setImageError(err.message || 'Gagal memproses gambar dari galeri.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveCustomAvatar = () => {
    setCustomAvatarUrl(null);
    updateProfile({
      avatarUrl: null,
    });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      name: nameInput.trim() || 'Player One',
      bio: bioInput.trim(),
      avatarId: selectedAvatarId,
      avatarUrl: customAvatarUrl,
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
      {/* Account Status / Login Banner */}
      {!isLoggedIn ? (
        <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#191F2D] border border-blue-500/30 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400 shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                Simpan Progres Belajar dengan Email
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Saat ini Anda menggunakan akun tamu. Masuk dengan email agar level, XP, dan badge Anda tersimpan permanen.
              </p>
            </div>
          </div>

          <Link
            to="/login"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-md shadow-blue-600/30 flex items-center gap-2 shrink-0 self-stretch sm:self-auto justify-center transition-all"
          >
            <LogIn className="w-4 h-4" />
            <span>Masuk / Daftar Akun</span>
          </Link>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-slate-500 dark:text-slate-400">Akun Tersimpan: </span>
              <span className="font-extrabold text-slate-900 dark:text-white">{profile.email}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Link
              to="/login"
              className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-indigo-500 text-slate-700 dark:text-slate-300 hover:text-indigo-400 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Ganti / Tambah Akun</span>
            </Link>

            <button
              onClick={logoutUser}
              className="px-3 py-1.5 rounded-xl border border-rose-500/30 hover:bg-rose-500/10 text-rose-500 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      )}

      {/* Profile Header Card */}
      <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] p-6 sm:p-8 shadow-sm dark:shadow-card-dark">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar Visual with Gallery Upload Button */}
          <div className="relative group shrink-0">
            <UserAvatar
              avatarUrl={profile.avatarUrl}
              avatarId={profile.avatarId}
              name={profile.name}
              size="2xl"
              showGlow
            />

            {/* Quick Upload Button directly over Avatar */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleGalleryUpload}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="absolute -bottom-2 -right-2 p-2 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/40 border-2 border-white dark:border-[#191F2D] transition-transform hover:scale-110 active:scale-95"
              title="Unggah Foto dari Galeri"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>

          {/* User Details */}
          <div className="flex-1 text-center sm:text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white flex items-center justify-center sm:justify-start gap-2">
                  <span>{profile.name}</span>
                  {profile.avatarUrl && (
                    <span
                      title="Menggunakan Foto Profil dari Galeri"
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-500 text-[10px] font-bold"
                    >
                      <ImageIcon className="w-3 h-3" /> Galeri
                    </span>
                  )}
                </h1>
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 mt-0.5">
                  {levelInfo.title} • Level {levelInfo.level}
                </p>
              </div>

              <div className="flex items-center gap-2 self-center sm:self-auto">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-cyan-500/30 hover:border-cyan-400 bg-cyan-500/10 text-xs font-bold text-cyan-500 dark:text-cyan-400 transition-all"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isUploading ? 'Memproses...' : 'Foto dari Galeri'}</span>
                </button>

                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-[#232B3E] hover:border-indigo-500 bg-slate-50 dark:bg-[#131722] text-xs font-bold text-slate-700 dark:text-slate-300 transition-all"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>{isEditing ? 'Tutup Edit' : 'Edit Profil'}</span>
                </button>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
              {profile.bio || 'Siap menaklukkan pengetahuan dan naik level setiap hari!'}
            </p>

            {imageError && (
              <p className="text-xs text-rose-500 font-semibold">{imageError}</p>
            )}

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
            className="mt-6 pt-6 border-t border-slate-200 dark:border-white/5 space-y-5 animate-fade-in"
          >
            {/* Gallery Avatar Control in Form */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#131722] border border-slate-200 dark:border-[#232B3E] space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-cyan-400" />
                  <span>Foto Profil dari Galeri Sendiri</span>
                </label>
                {customAvatarUrl && (
                  <button
                    type="button"
                    onClick={handleRemoveCustomAvatar}
                    className="text-[11px] font-bold text-rose-500 hover:underline flex items-center gap-1"
                  >
                    <X className="w-3 h-3" /> Hapus Foto Galeri
                  </button>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <UserAvatar
                  avatarUrl={customAvatarUrl}
                  avatarId={selectedAvatarId}
                  name={nameInput}
                  size="lg"
                />

                <div className="flex-1 space-y-1.5 text-center sm:text-left">
                  <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                    <button
                      type="button"
                      disabled={isUploading}
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{isUploading ? 'Memproses...' : 'Pilih Foto dari Galeri'}</span>
                    </button>

                    {customAvatarUrl ? (
                      <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Foto Galeri Aktif
                      </span>
                    ) : (
                      <span className="text-xs text-slate-400">
                        Belum ada foto galeri dipilih (menggunakan avatar 3D)
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Bisa memilih foto selfie atau gambar dari memori galeri ponsel / laptop Anda.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Nama Tampilan
                </label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#131722] border border-slate-200 dark:border-[#232B3E] text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-indigo-500"
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
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#131722] border border-slate-200 dark:border-[#232B3E] text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-indigo-500"
                  placeholder="Motto belajar Anda"
                />
              </div>
            </div>

            {/* Avatar Selector (fallback when no custom photo is used) */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Pilih Karakter Avatar Cadangan
              </label>
              <div className="flex flex-wrap gap-2.5">
                {DEFAULT_AVATARS.map((av) => {
                  const isSelected = selectedAvatarId === av.id;

                  return (
                    <button
                      key={av.id}
                      type="button"
                      onClick={() => setSelectedAvatarId(av.id)}
                      className={`p-2.5 rounded-2xl border flex items-center gap-2 transition-all ${
                        isSelected
                          ? 'border-indigo-500 bg-indigo-500/15 text-indigo-400 ring-2 ring-indigo-500/40'
                          : 'border-slate-200 dark:border-[#232B3E] bg-slate-50 dark:bg-[#131722] text-slate-400 hover:border-slate-400'
                      }`}
                    >
                      <UserAvatar avatarId={av.id} size="sm" />
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
          colorClass="bg-blue-600/15 text-blue-500 dark:text-blue-400"
        />
        <StatCard
          icon={Target}
          title="Akurasi Rata-rata"
          value={`${overallAccuracy}%`}
          subtext={`${totalQuizzes} sesi kuis`}
          badgeColor="emerald"
          colorClass="bg-emerald-600/15 text-emerald-500 dark:text-emerald-400"
        />
        <StatCard
          icon={BookOpen}
          title="Materi Selesai"
          value={`${completedLessons.length}`}
          subtext="Modul pembelajaran"
          badgeColor="indigo"
          colorClass="bg-indigo-600/15 text-indigo-500 dark:text-indigo-400"
        />
        <StatCard
          icon={Flame}
          title="Streak Tertinggi"
          value={`${streak.longestStreak} Hari`}
          subtext={`Aktif: ${streak.count} hari`}
          badgeColor="amber"
          colorClass="bg-amber-600/15 text-amber-500 dark:text-amber-400"
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
                color="bg-blue-600"
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
