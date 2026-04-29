import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HabitTracker from '../pages/HabitTracker';
import ProfilePage from '../pages/profile';
import LoginPage from '../pages/Login';
import SignupPage from '../pages/Signup';
import Navbar from '../components/HabitTracker/navbar';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '../context/AuthContext';

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar userName={user?.name} onLogout={logout} />
      <div className="flex-1">{children}</div>
    </div>
  );
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <HabitTracker />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProtectedLayout>
              <ProfilePage />
            </ProtectedLayout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
