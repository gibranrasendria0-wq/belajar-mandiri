import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Menu,
  Search,
  Flame,
  Zap,
  LogIn,
  LogOut,
  Users,
  User,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react';
import { useGame } from '../../context/GameContext';
import ThemeToggle from '../ui/ThemeToggle';
import UserAvatar from '../ui/UserAvatar';

export default function Topbar({ onOpenMobileMenu }) {
  const { profile, levelInfo, streak, isLoggedIn, logoutUser } = useGame();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-20 h-20 px-4 sm:px-8 flex items-center justify-between border-b border-slate-200 dark:border-[#232B3E] bg-white/80 dark:bg-[#0B0D12]/80 backdrop-blur-xl">
      {/* Left: Mobile hamburger & Search bar */}
      <div className="flex items-center gap-4 flex-1 max-w-lg">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2.5 rounded-xl border border-slate-200 dark:border-[#232B3E] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#191F2D] transition-colors"
          aria-label="Buka Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <form onSubmit={handleSearchSubmit} className="relative flex-1 hidden sm:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari materi atau topik (Matematika, Koding, Fisika)..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-slate-100 dark:bg-[#131722] border border-slate-200 dark:border-[#232B3E] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
          />
        </form>
      </div>

      {/* Right: Gamification Badges, Theme Toggle, Profile */}
      <div className="flex items-center gap-2 sm:gap-3.5">
        {/* Streak Badge */}
        <div
          title={`Learning Streak: ${streak.count} hari berturut-turut`}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-500 font-bold text-xs shadow-sm cursor-default"
        >
          <Flame className="w-4 h-4 fill-amber-500 animate-pulse" />
          <span>{streak.count} Hari</span>
        </div>

        {/* Level & XP Pill */}
        <Link
          to="/profile"
          className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/25 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/20 transition-colors"
          title={`Total XP: ${levelInfo.totalXp} XP`}
        >
          <Zap className="w-4 h-4 fill-indigo-500 text-indigo-500" />
          <span className="font-extrabold text-xs">Lvl {levelInfo.level}</span>
          <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">|</span>
          <span className="font-bold text-xs text-cyan-500 dark:text-cyan-400">{levelInfo.totalXp} XP</span>
        </Link>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* If guest, show prominent Login button */}
        {!isLoggedIn && (
          <Link
            to="/login"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm shadow-blue-600/25 transition-all"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Masuk</span>
          </Link>
        )}

        {/* User Avatar with Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-2 p-1 rounded-2xl hover:bg-slate-100 dark:hover:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] transition-all"
            title="Menu Akun"
          >
            <UserAvatar
              avatarUrl={profile.avatarUrl}
              avatarId={profile.avatarId}
              name={profile.name}
              size="sm"
            />
            <span className="hidden md:inline text-xs font-bold text-slate-800 dark:text-white pr-0.5 truncate max-w-[100px]">
              {profile.name}
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 mr-1 hidden sm:block" />
          </button>

          {/* User Account Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] shadow-xl p-2 z-50 animate-scale-in">
              <div className="px-3 py-2 border-b border-slate-100 dark:border-white/5 mb-1.5">
                <p className="text-xs font-extrabold text-slate-900 dark:text-white truncate">
                  {profile.name}
                </p>
                {profile.email ? (
                  <p className="text-[11px] text-slate-400 truncate flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="w-3 h-3 text-emerald-500 shrink-0" />
                    <span className="truncate">{profile.email}</span>
                  </p>
                ) : (
                  <p className="text-[10px] text-amber-500 font-bold mt-0.5">
                    Profil Tamu (Lokal)
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Link
                  to="/profile"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#131722] hover:text-indigo-500 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Profil & Statistik</span>
                </Link>

                <Link
                  to="/login"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-[#131722] hover:text-indigo-500 transition-colors"
                >
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span>{isLoggedIn ? 'Ganti / Tambah Akun' : 'Masuk / Daftar Email'}</span>
                </Link>

                {isLoggedIn && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      logoutUser();
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-rose-500 hover:bg-rose-500/10 transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Keluar dari Akun</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
