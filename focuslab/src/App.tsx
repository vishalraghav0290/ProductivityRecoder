import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom';
import HabitTracker from "./pages/HabitTracker";
import Navbar from "./components/HabitTracker/navbar";
import AuthPage from "./components/auth/AuthPage";
import ProfilePage from "./pages/profile";
import { isAuthenticated, logoutUser } from './utils/auth';

// Use auth utilities (isAuthenticated) from `src/utils/auth` which checks the stored
// JWT for expiry. For strict server-side validation call `/api/auth/me` instead.

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Protect the route by checking for a valid token stored in localStorage.
  // This performs a local check (expiry); for strict validation the app
  // should call the server `/api/auth/me` endpoint to verify the token.
  return isAuthenticated() ? <>{children}</> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  const handleLogout = () => {
    // Clear stored auth information and navigate to login page
    logoutUser();
    window.location.href = '/login';
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />

        <Route
          path="/"
          element={
            <RequireAuth>
              <div className="flex flex-col min-h-screen">
                <Navbar onLogout={handleLogout} />
                <div className="flex-1">
                  <HabitTracker />
                </div>
              </div>
            </RequireAuth>
          }
        />

        <Route
          path="/profile"
          element={
            <RequireAuth>
              <div className="flex flex-col min-h-screen">
                <Navbar onLogout={handleLogout} />
                <div className="flex-1">
                  <ProfilePage />
                </div>
              </div>
            </RequireAuth>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;