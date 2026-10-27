import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { GameProvider } from './context/GameContext';
import AppLayout from './components/layout/AppLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ToastNotification from './components/ui/ToastNotification';

// Pages
import Dashboard from './pages/Dashboard';
import Courses from './pages/Courses';
import LessonDetail from './pages/LessonDetail';
import QuizCenter from './pages/QuizCenter';
import QuizPlay from './pages/QuizPlay';
import QuizResult from './pages/QuizResult';
import Achievements from './pages/Achievements';
import Leaderboard from './pages/Leaderboard';
import Bookmarks from './pages/Bookmarks';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <ThemeProvider>
      <GameProvider>
        <BrowserRouter>
          <Routes>
            {/* Halaman Login Wajib di Awal (Standalone) */}
            <Route path="/login" element={<Login />} />

            {/* Halaman Terproteksi: Wajib Login Sebelum Masuk */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="courses" element={<Courses />} />
              <Route path="lessons/:lessonId" element={<LessonDetail />} />
              <Route path="quiz" element={<QuizCenter />} />
              <Route path="quiz/play" element={<QuizPlay />} />
              <Route path="quiz/result" element={<QuizResult />} />
              <Route path="leaderboard" element={<Leaderboard />} />
              <Route path="bookmarks" element={<Bookmarks />} />
              <Route path="achievements" element={<Achievements />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>

          {/* Notifikasi toast global */}
          <ToastNotification />
        </BrowserRouter>
      </GameProvider>
    </ThemeProvider>
  );
}
