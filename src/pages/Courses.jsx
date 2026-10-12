import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, BookOpen, Layers } from 'lucide-react';
import { COURSES, CATEGORIES } from '../data/courses';
import { LESSONS } from '../data/lessons';
import { useGame } from '../context/GameContext';
import CourseCard from '../components/learning/CourseCard';
import EmptyState from '../components/ui/EmptyState';

export default function Courses() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { completedLessons } = useGame();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Sync search param from topbar
  useEffect(() => {
    const query = searchParams.get('search');
    if (query !== null) {
      setSearch(query);
    }
  }, [searchParams]);

  const completedIds = useMemo(() => {
    return new Set(completedLessons.map((l) => (typeof l === 'string' ? l : l.id)));
  }, [completedLessons]);

  const filteredCourses = useMemo(() => {
    return COURSES.filter((course) => {
      // 1. Search Query
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesTitle = course.title.toLowerCase().includes(q);
        const matchesDesc = course.description.toLowerCase().includes(q);
        const matchesCategory = course.category.toLowerCase().includes(q);
        const matchesTag = course.tags?.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesCategory && !matchesTag) {
          return false;
        }
      }

      // 2. Category
      if (selectedCategory !== 'all' && course.category !== selectedCategory) {
        return false;
      }

      // 3. Difficulty
      if (
        selectedDifficulty !== 'all' &&
        course.level.toLowerCase() !== selectedDifficulty.toLowerCase()
      ) {
        return false;
      }

      // 4. Status
      if (selectedStatus !== 'all') {
        const courseLessons = LESSONS.filter((l) => l.courseId === course.id);
        const completedCount = courseLessons.filter((l) => completedIds.has(l.id)).length;

        if (selectedStatus === 'not_started' && completedCount > 0) return false;
        if (
          selectedStatus === 'in_progress' &&
          (completedCount === 0 || completedCount === courseLessons.length)
        )
          return false;
        if (selectedStatus === 'completed' && completedCount < courseLessons.length) return false;
      }

      return true;
    });
  }, [search, selectedCategory, selectedDifficulty, selectedStatus, completedIds]);

  const resetFilters = () => {
    setSearch('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSelectedStatus('all');
    setSearchParams({});
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200 dark:border-[#232B3E]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Katalog Pembelajaran Akademik</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Eksplorasi Modul & Kurikulum
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            Pilih mata pelajaran sekolah menengah yang ingin kamu kuasai. Selesaikan submateri untuk memperoleh XP dan klaim badge eksklusif.
          </p>
        </div>

        <span className="text-xs font-bold text-slate-500 px-3 py-1.5 rounded-xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] self-start md:self-auto">
          Menampilkan {filteredCourses.length} dari {COURSES.length} Modul
        </span>
      </div>

      {/* Filter and Search Controls */}
      <div className="space-y-4">
        {/* Top Controls: Search, Difficulty, Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Search bar */}
          <div className="relative lg:col-span-2">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari materi berdasarkan judul atau kata kunci..."
              className="w-full pl-10 pr-4 py-2.5 text-sm rounded-2xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-sm"
            />
          </div>

          {/* Difficulty Dropdown */}
          <div>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-2xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-all shadow-sm cursor-pointer"
            >
              <option value="all">Semua Kesulitan</option>
              <option value="easy">Easy (Mudah)</option>
              <option value="medium">Medium (Menengah)</option>
              <option value="hard">Hard (Sulit)</option>
            </select>
          </div>

          {/* Status Dropdown */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm rounded-2xl bg-white dark:bg-[#191F2D] border border-slate-200 dark:border-[#232B3E] text-slate-900 dark:text-white focus:outline-none focus:border-indigo-500 transition-all shadow-sm cursor-pointer"
            >
              <option value="all">Semua Status</option>
              <option value="not_started">Belum Dimulai</option>
              <option value="in_progress">Sedang Dipelajari</option>
              <option value="completed">Sudah Selesai</option>
            </select>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/25'
                    : 'bg-white dark:bg-[#191F2D] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#232B3E] hover:border-indigo-400 dark:hover:border-indigo-500/40'
                }`}
              >
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <EmptyState
          icon={Layers}
          title="Tidak Ada Materi Ditemukan"
          description="Coba ubah kata kunci pencarian atau sesuaikan filter kategori dan kesulitan."
          actionText="Reset Filter"
          onAction={resetFilters}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
