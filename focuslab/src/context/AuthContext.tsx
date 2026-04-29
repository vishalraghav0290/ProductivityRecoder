/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';
import {
  getCurrentUser,
  isAuthenticated,
  loginUser,
  logoutUser,
  registerUser,
  type PublicUser
} from '../utils/auth';

type AuthContextValue = {
  user: PublicUser | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => { ok: boolean; message?: string };
  signup: (name: string, email: string, password: string) => { ok: boolean; message?: string };
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<PublicUser | null>(() => getCurrentUser());
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => isAuthenticated());

  const login = (email: string, password: string) => {
    const res = loginUser(email, password);
    if (res.ok && res.user) {
      setUser(res.user);
      setIsLoggedIn(true);
      return { ok: true };
    }
    return { ok: false, message: res.message };
  };

  const signup = (name: string, email: string, password: string) => {
    const res = registerUser({ name, email, password });
    return { ok: res.ok, message: res.message };
  };

  const logout = () => {
    logoutUser();
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
