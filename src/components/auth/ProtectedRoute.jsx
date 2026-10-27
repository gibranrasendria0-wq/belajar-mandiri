import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useGame } from '../../context/GameContext';

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useGame();
  const location = useLocation();

  if (!isLoggedIn) {
    // Redirect unauthenticated users to the login page before accessing any content
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
