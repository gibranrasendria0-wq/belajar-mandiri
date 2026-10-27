import React, { useState, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Sparkles,
  LogIn,
  UserPlus,
  Users,
  Image as ImageIcon,
  Upload,
  X,
  Trash2,
  CheckCircle2,
  Zap,
  Flame,
  LayoutDashboard,
  ShieldAlert,
} from 'lucide-react';
import { useGame } from '../context/GameContext';
import { DEFAULT_AVATARS } from '../lib/storage';
import { processImageFile } from '../lib/imageUtils';
import UserAvatar from '../components/ui/UserAvatar';
import ThemeToggle from '../components/ui/ThemeToggle';

export default function Login() {
  const {
    profile,
    isLoggedIn,
    loginWithEmail,
    switchAccount,
    logoutUser,
    removeSavedAccount,
    savedAccounts,
  } = useGame();

  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);

  // Determine redirect destination
  const from = location.state?.from?.pathname || '/';

  // Tab: 'login' | 'register' | 'saved'
  const savedAccountList = Object.values(savedAccounts || {});
  const [activeTab, setActiveTab] = useState(
    savedAccountList.length > 0 && !isLoggedIn ? 'saved' : 'login'
  );

  // Form states - Login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Form states - Register
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerBio, setRegisterBio] = useState('');
  const [registerAvatarId, setRegisterAvatarId] = useState('cyber-ninja');
  const [registerAvatarUrl, setRegisterAvatarUrl] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const [isProcessingImg, setIsProcessingImg] = useState(false);

  // Handle image upload from gallery
  const handleGalleryFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError('');
    setIsProcessingImg(true);

    try {
      const result = await processImageFile(file, { maxSize: 300, quality: 0.85 });
      setRegisterAvatarUrl(result.dataUrl);
    } catch (err) {
      setUploadError(err.message || 'Gagal memproses gambar');
    } finally {
      setIsProcessingImg(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!loginEmail.trim()) return;

    const res = loginWithEmail(loginEmail, { password: loginPassword, isRegister: false });
    if (res.success) {
      navigate(from, { replace: true });
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!registerEmail.trim()) return;

    const res = loginWithEmail(registerEmail, {
      name: registerName,
      password: registerPassword,
      avatarUrl: registerAvatarUrl,
      avatarId: registerAvatarId,
      bio: registerBio,
      isRegister: true,
    });

    if (res.success) {
      navigate(from, { replace: true });
    }
  };

  const handleSwitchToAccount = (targetEmail) => {
    const success = switchAccount(targetEmail);
    if (success) {
      navigate('/', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0D12] text-slate-900 dark:text-slate-100 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      {/* Top Bar inside Login Page */}
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-xl text-slate-900 dark:text-white tracking-tight leading-none">
              Belajar Mandiri
            </span>
            <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Autentikasi Pembelajaran
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          {isLoggedIn && (
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md shadow-blue-600/30 transition-all"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Masuk Dashboard</span>
            </Link>
          )}
        </div>
      </div>

      <div className="max-w-4xl w-full mx-auto space-y-8 animate-fade-in">
        {/* If redirected due to auth guard */}
        {!isLoggedIn && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-center gap-3 text-amber-500 text-xs font-bold">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <span>
              Akses Dibatasi: Silakan masuk atau daftarkan akun email Anda terlebih dahulu untuk membuka dashboard dan seluruh materi belajar.
            </span>
          </div>
        )}

        {/* Hero Header Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-[#191F2D] border border-blue-500/30 p-6 sm:p-8 backdrop-blur-xl">
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-600 dark:text-blue-400 text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Belajar Mandiri Account Portal</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Masuk Sebelum Memulai Belajar
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Semua progres pembelajaran, perolehan XP, level gamifikasi, dan lencana tersimpan aman di akun email Anda. Siapapun yang login akan tersimpan otomatis di browser ini!
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex p-1.5 rounded-2xl bg-slate-100 dark:bg-[#131722] border border-slate-200 dark:border-[#232B3E] max-w-md mx-auto">
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'login'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Masuk</span>
          </button>

          <button
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'register'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Daftar Baru</span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-extrabold flex items-center justify-center gap-2 transition-all relative ${
              activeTab === 'saved'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Tersimpan</span>
            {savedAccountList.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-cyan-400 text-slate-900 text-[10px] font-black flex items-center justify-center ml-0.5">
                {savedAccountList.length}
              </span>
            )}
          </button>
        </div>

        {/* TAB 1: LOGIN FORM */}
        {activeTab === 'login' && (
          <div className="rounded-3xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] p-6 sm:p-8 shadow-sm dark:shadow-card-dark max-w-lg mx-auto space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Masuk dengan Email
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Masukkan email Anda. Seluruh progres belajar Anda akan langsung dimuat secara otomatis.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Alamat Email</span>
                </label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#131722] border border-slate-200 dark:border-[#232B3E] text-slate-900 dark:text-white text-sm focus:outline-none focus:border-indigo-500 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Kata Sandi</span>
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Masukkan kata sandi akun"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-[#131722] border border-slate-200 dark:border-[#232B3E] text-slate-900 dark:text-white text-sm focus:outline-none focus:border-indigo-500 transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 transition-all group"
              >
                <span>Masuk Sekarang</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>

            <div className="pt-4 border-t border-slate-200 dark:border-white/5 text-center">
              <p className="text-xs text-slate-500">
                Belum punya akun terdaftar?{' '}
                <button
                  type="button"
                  onClick={() => setActiveTab('register')}
                  className="font-bold text-indigo-500 hover:underline"
                >
                  Daftar Akun Baru
                </button>
              </p>
            </div>
          </div>
        )}

        {/* TAB 2: REGISTER FORM */}
        {activeTab === 'register' && (
          <div className="rounded-3xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] p-6 sm:p-8 shadow-sm dark:shadow-card-dark max-w-xl mx-auto space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                Buat Profil Akun Baru
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Lengkapi nama, email, dan pilih foto dari galeri HP/laptop Anda untuk avatar profil.
              </p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-5">
              {/* Gallery Photo Upload Section */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#131722] border border-slate-200 dark:border-[#232B3E] space-y-3">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-cyan-400" />
                  <span>Foto Profil dari Galeri Perangkat</span>
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Avatar Preview */}
                  <div className="relative">
                    <UserAvatar
                      avatarUrl={registerAvatarUrl}
                      avatarId={registerAvatarId}
                      name={registerName || 'Preview'}
                      size="xl"
                      showGlow
                    />
                    {registerAvatarUrl && (
                      <button
                        type="button"
                        onClick={() => setRegisterAvatarUrl(null)}
                        className="absolute -top-1 -right-1 p-1 rounded-full bg-rose-500 text-white shadow hover:bg-rose-600 transition-colors"
                        title="Hapus foto galeri"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="flex-1 space-y-2 text-center sm:text-left">
                    <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-start">
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleGalleryFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                      <button
                        type="button"
                        disabled={isProcessingImg}
                        onClick={() => fileInputRef.current?.click()}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>{isProcessingImg ? 'Memproses...' : 'Pilih dari Galeri'}</span>
                      </button>

                      {registerAvatarUrl && (
                        <span className="text-[11px] font-bold text-emerald-500 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Foto Galeri Aktif
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Mendukung JPG, PNG, atau WebP. Gambar otomatis disesuaikan secara optimal.
                    </p>
                    {uploadError && (
                      <p className="text-xs text-rose-500 font-medium">{uploadError}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Nama Lengkap / Panggilan</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    placeholder="Misal: Budi Santoso"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#131722] border border-slate-200 dark:border-[#232B3E] text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Alamat Email</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    placeholder="nama@email.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#131722] border border-slate-200 dark:border-[#232B3E] text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Kata Sandi</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="password"
                    required
                    minLength={4}
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    placeholder="Minimal 4 karakter"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#131722] border border-slate-200 dark:border-[#232B3E] text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Motto / Bio Belajar
                  </label>
                  <input
                    type="text"
                    value={registerBio}
                    onChange={(e) => setRegisterBio(e.target.value)}
                    placeholder="Motto belajar Anda"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#131722] border border-slate-200 dark:border-[#232B3E] text-slate-900 dark:text-white text-xs font-semibold focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              {/* Preset Avatar Selection (if no gallery photo) */}
              {!registerAvatarUrl && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Atau Pilih Karakter Avatar Awal
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {DEFAULT_AVATARS.map((av) => (
                      <button
                        key={av.id}
                        type="button"
                        onClick={() => setRegisterAvatarId(av.id)}
                        className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                          registerAvatarId === av.id
                            ? 'border-indigo-500 bg-indigo-500/15 text-indigo-400 ring-2 ring-indigo-500/30'
                            : 'border-slate-200 dark:border-[#232B3E] bg-slate-50 dark:bg-[#131722] text-slate-400 hover:border-slate-400'
                        }`}
                      >
                        <UserAvatar avatarId={av.id} size="sm" />
                        <span className="text-[10px] font-bold truncate max-w-full">
                          {av.name.split(' ')[0]}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 transition-all"
              >
                <UserPlus className="w-4 h-4" />
                <span>Daftarkan Akun & Mulai Belajar</span>
              </button>
            </form>
          </div>
        )}

        {/* TAB 3: SAVED ACCOUNTS LIST */}
        {activeTab === 'saved' && (
          <div className="rounded-3xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] p-6 sm:p-8 shadow-sm dark:shadow-card-dark max-w-2xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-500" />
                  <span>Akun Tersimpan di Perangkat Ini</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Semua akun yang pernah login otomatis tersimpan di sini. Klik untuk langsung masuk.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('login')}
                className="px-3.5 py-1.5 rounded-xl border border-indigo-500/30 text-indigo-500 hover:bg-indigo-500/10 text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Login Email Lain</span>
              </button>
            </div>

            {savedAccountList.length === 0 ? (
              <div className="text-center py-12 px-4 rounded-2xl bg-slate-50 dark:bg-[#131722] border border-dashed border-slate-300 dark:border-slate-800 space-y-3">
                <Users className="w-10 h-10 text-slate-400 mx-auto opacity-50" />
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Belum Ada Akun Tersimpan
                </p>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Silakan masuk atau daftarkan akun baru dengan email Anda untuk mulai belajar.
                </p>
                <button
                  onClick={() => setActiveTab('register')}
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
                >
                  Buat Akun Sekarang
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {savedAccountList.map((acc) => {
                  const isCurrent =
                    isLoggedIn && profile.email?.toLowerCase() === acc.email?.toLowerCase();
                  const accLevel = Math.floor(Math.sqrt((acc.totalXp || 0) / 100)) + 1;

                  return (
                    <div
                      key={acc.email}
                      className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                        isCurrent
                          ? 'border-indigo-500 bg-indigo-500/10 ring-1 ring-indigo-500/30'
                          : 'border-slate-200 dark:border-[#232B3E] bg-slate-50 dark:bg-[#131722] hover:border-slate-400 dark:hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <UserAvatar
                          avatarUrl={acc.profile?.avatarUrl}
                          avatarId={acc.profile?.avatarId}
                          name={acc.profile?.name || acc.email}
                          size="md"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                              {acc.profile?.name || 'User'}
                            </h3>
                            {isCurrent && (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-500 text-[10px] font-black border border-emerald-500/30">
                                Aktif Sekarang
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                            {acc.email}
                          </p>
                          <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                            <span className="flex items-center gap-1 text-indigo-400 font-bold">
                              <Zap className="w-3 h-3 fill-current" /> Lvl {accLevel}
                            </span>
                            <span>•</span>
                            <span className="text-cyan-400 font-bold">
                              {acc.totalXp || 0} XP
                            </span>
                            {acc.streak?.count > 0 && (
                              <>
                                <span>•</span>
                                <span className="flex items-center gap-0.5 text-amber-400 font-bold">
                                  <Flame className="w-3 h-3 fill-current" /> {acc.streak.count}d
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-auto w-full sm:w-auto justify-end">
                        {!isCurrent ? (
                          <button
                            type="button"
                            onClick={() => handleSwitchToAccount(acc.email)}
                            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-sm transition-all"
                          >
                            Masuk dengan Akun Ini
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={logoutUser}
                            className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 hover:border-rose-500 text-slate-600 dark:text-slate-300 hover:text-rose-500 text-xs font-bold transition-all"
                          >
                            Keluar
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() => removeSavedAccount(acc.email)}
                          className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                          title="Hapus akun dari perangkat"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
