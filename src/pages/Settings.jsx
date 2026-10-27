import React, { useState, useRef } from 'react';
import {
  Settings as SettingsIcon,
  Volume2,
  VolumeX,
  Clock,
  RotateCcw,
  Info,
  Download,
  Upload,
  HardDrive,
  FileCheck,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import ConfirmDialog from '../components/ui/ConfirmDialog';

export default function Settings() {
  const {
    settings,
    updateSettings,
    resetAllProgress,
    triggerSound,
    exportUserData,
    importUserData,
  } = useGame();

  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const fileInputRef = useRef(null);

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

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        importUserData(content);
      }
    };
    reader.readAsText(file);
    // Reset file input value so user can upload again if needed
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
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
          Sesuaikan efek audio, batas timer pengerjaan kuis, dan kelola data progres belajar mandiri.
        </p>
      </div>

      <div className="space-y-6">
        {/* 1. Suara & Timer Gameplay */}
        <div className="rounded-3xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] p-6 shadow-sm dark:shadow-card-dark space-y-4">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-cyan-400" />
            <span>Pengalaman Kuis & Gamifikasi</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Kustomisasi umpan balik interaktif saat menjawab kuis dan menyelesaikan modul materi.
          </p>

          <div className="space-y-3 pt-1">
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

        {/* 2. Backup & Pemulihan Data (Export / Import JSON) */}
        <div className="rounded-3xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] p-6 shadow-sm dark:shadow-card-dark space-y-4">
          <div className="flex items-center gap-2 text-indigo-500">
            <HardDrive className="w-5 h-5" />
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Cadangan & Pemulihan Data (Backup JSON)</h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Semua progres belajar Anda tersimpan secara lokal. Unduh file cadangan data (JSON) untuk mengamankan riwayat XP, level, badge, dan kuis Anda, atau pulihkan data saat berpindah perangkat/browser.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {/* Export Button */}
            <button
              onClick={exportUserData}
              className="flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs tracking-wide shadow-md shadow-indigo-600/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Download className="w-4 h-4" />
              <span>Ekspor Data Progres (JSON)</span>
            </button>

            {/* Import Button */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json,application/json"
                onChange={handleFileUpload}
                className="hidden"
                id="import-backup-file"
              />
              <label
                htmlFor="import-backup-file"
                className="flex items-center justify-center gap-2.5 px-5 py-3 rounded-2xl border border-slate-200 dark:border-[#232B3E] bg-slate-50 dark:bg-[#131722] hover:bg-slate-100 dark:hover:bg-[#1f2638] text-slate-700 dark:text-slate-200 font-bold text-xs tracking-wide cursor-pointer transition-all transform hover:-translate-y-0.5 active:translate-y-0 text-center"
              >
                <Upload className="w-4 h-4 text-cyan-400" />
                <span>Impor & Pulihkan Data (JSON)</span>
              </label>
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

        {/* 3. Informasi Platform */}
        <div className="rounded-3xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] p-6 shadow-sm space-y-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
            <Info className="w-4 h-4 text-indigo-500" />
            <span>Tentang Belajar Mandiri</span>
          </div>
          <p>
            Belajar Mandiri — Platform pembelajaran interaktif berbasis gamifikasi offline-first. Dirancang untuk meningkatkan pemahaman materi akademik secara mandiri dan terstruktur.
          </p>
          <p>
            Data pengguna tersimpan di dalam memori browser lokal (localStorage) Anda tanpa biaya atau server pihak ketiga, menjaga privasi penuh Anda.
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
