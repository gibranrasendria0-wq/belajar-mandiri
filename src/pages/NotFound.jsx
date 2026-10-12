import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="py-20 flex flex-col items-center justify-center text-center px-4 animate-fade-in">
      <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center border border-indigo-500/20 mb-6">
        <AlertCircle className="w-10 h-10" />
      </div>

      <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
        404
      </h1>
      <h2 className="mt-2 text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200">
        Halaman Tidak Ditemukan
      </h2>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-md">
        Halaman yang Anda tuju mungkin telah dipindahkan, dihapus, atau alamat URL yang dimasukkan keliru.
      </p>

      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 transition-all"
      >
        <Home className="w-4 h-4" />
        <span>Kembali ke Dashboard</span>
      </Link>
    </div>
  );
}
