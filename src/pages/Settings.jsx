import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Clock,
  RotateCcw,
  Info,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useGame } from '../context/GameContext';
import ConfirmDialog from '../components/ui/ConfirmDialog';

export default function Settings() {
  const { theme, toggleTheme, setTheme, isDark } = useTheme();
  const { settings, updateSettings, resetAllProgress, triggerSound } = useGame();

  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);

  const handleToggleSound = () => {
    const nextVal = !settings.soundEnabled;
    updateSettings({ soundEnabled: nextVal });
    if (nextVal) {
      triggerSound('correct');
    }
  };

  const handleToggleTimer = () => {
    updateSettings({ timerEnabled: !settings.timerEnabled });
  };

  const handleConfirmReset = () => {
    resetAllProgress();
    setIsResetDialogOpen(false);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-slate-200 dark:border-[#232B3E] pb-4">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 mb-1">
          <SettingsIcon className="w-4 h-4" />
          <span>Preferensi Platform</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Pengaturan Aplikasi
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Kelola tema antarmuka, timer tantangan, audio efek, dan manajemen data lokal Anda.
        </p>
      </div>

      <div className="space-y-6">
        {/* 1. Tampilan & Tema */}
        <div className="rounded-3xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] p-6 shadow-sm dark:shadow-card-dark space-y-4">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Moon className="w-4 h-4 text-indigo-500" />
            <span>Tema Tampilan Visual</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Pilih mode visual yang nyaman bagi mata saat belajar. Pilihan tema otomatis tersimpan di penyimpanan browser lokal.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => setTheme('dark')}
              className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                isDark
                  ? 'border-indigo-500 bg-indigo-500/15 text-indigo-400 ring-2 ring-indigo-500/40'
                  : 'border-slate-200 dark:border-[#232B3E] bg-slate-50 dark:bg-[#131722] text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-slate-900 text-cyan-400 border border-slate-700">
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold">Dark Mode (Utama)</p>
                  <p className="text-xs text-slate-500">Modern Gaming Dashboard</p>
                </div>
              </div>
              {isDark && <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0" />}
            </button>

            <button
              onClick={() => setTheme('light')}
              className={`p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                !isDark
                  ? 'border-indigo-500 bg-indigo-500/15 text-indigo-600 ring-2 ring-indigo-500/40'
                  : 'border-slate-200 dark:border-[#232B3E] bg-slate-50 dark:bg-[#131722] text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-100 text-amber-600 border border-amber-200">
                  <Sun className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold">Light Mode</p>
                  <p className="text-xs text-slate-500">SaaS Bersih & Lembut</p>
                </div>
              </div>
              {!isDark && <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0" />}
            </button>
          </div>
        </div>

        {/* 2. Suara & Timer Gameplay */}
        <div className="rounded-3xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] p-6 shadow-sm dark:shadow-card-dark space-y-4">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-cyan-400" />
            <span>Pengalaman Kuis & Gamifikasi</span>
          </h2>

          <div className="space-y-3">
            {/* Sound Toggle */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-[#131722] border border-slate-200 dark:border-[#232B3E]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-500 border border-cyan-500/20">
                  {settings.soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Efek Suara Sintetis (Web Audio)</p>
                  <p className="text-xs text-slate-500">Nada interaktif saat menjawab kuis dan merayakan level up</p>
                </div>
              </div>

              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={handleToggleSound}
                className="w-5 h-5 accent-indigo-600 cursor-pointer"
              />
            </div>

            {/* Timer Toggle */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-[#131722] border border-slate-200 dark:border-[#232B3E]">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">Timer Standar Kuis (30s / Soal)</p>
                  <p className="text-xs text-slate-500">Aktifkan batas waktu berpikir saat menjawab soal kuis</p>
                </div>
              </div>

              <input
                type="checkbox"
                checked={settings.timerEnabled}
                onChange={handleToggleTimer}
                className="w-5 h-5 accent-indigo-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* 3. Manajemen & Reset Data */}
        <div className="rounded-3xl bg-white dark:bg-[#191F2D] border border-rose-500/30 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-rose-500">
            <RotateCcw className="w-4 h-4" />
            <h2 className="text-base font-extrabold">Reset Seluruh Progres Belajar</h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Menghapus seluruh akumulasi XP, riwayat level, status materi yang telah dipelajari, pencapaian badge, dan statistik kuis dari browser Anda. Data tidak dapat dipulihkan setelah direset.
          </p>

          <button
            onClick={() => setIsResetDialogOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs tracking-wide shadow-md shadow-rose-600/30 transition-all"
          >
            Reset Semua Data Progres
          </button>
        </div>

        {/* 4. Informasi EduGaming */}
        <div className="rounded-3xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] p-6 shadow-sm space-y-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
            <Info className="w-4 h-4 text-indigo-500" />
            <span>Tentang EduGaming Platform</span>
          </div>
          <p>
            EduGaming v1.0.0 — Platform pembelajaran berbasis gamifikasi offline-first. Dibangun menggunakan React, Vite, Tailwind CSS, Lucide React, Recharts, dan Web Audio API.
          </p>
          <p>
            Seluruh data progres belajar, XP, kuis, dan badge disimpan secara privat di dalam peramban lokal (localStorage) Anda tanpa memerlukan autentikasi login atau server eksternal berbayar.
          </p>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={isResetDialogOpen}
        title="Reset Seluruh Progres?"
        message="Apakah Anda yakin ingin menghapus semua XP, level, riwayat kuis, dan badge? Tindakan ini akan mengembalikan aplikasi ke kondisi awal pengguna baru."
        confirmText="Ya, Reset Total"
        cancelText="Batal"
        variant="danger"
        onConfirm={handleConfirmReset}
        onCancel={() => setIsResetDialogOpen(false)}
      />
    </div>
  );
}
