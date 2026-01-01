import React, { useState, useEffect } from "react";
import HabitTracker from "./pages/HabitTracker";
import Navbar from "./components/HabitTracker/navbar";
import AuthPage from "./components/auth/AuthPage";

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(() => {
    try {
      return !!localStorage.getItem('focuslab_current_user');
    } catch (e) {
      return false;
    }
  });

  // keep state in sync if another tab changes auth
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'focuslab_current_user') {
        setLoggedIn(!!localStorage.getItem('focuslab_current_user'));
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem('focuslab_current_user');
    } catch (e) {
      /* ignore */
    }
    setLoggedIn(false);
    // navigate to root / refresh so pages like AuthPage can render
    window.location.href = '/';
  };

  return (
    <div className="flex flex-col w-full min-h-screen">
      {loggedIn ? (
        <AuthPage />
      ) : (
        <>
          <Navbar onLogout={handleLogout} />
          <div className="flex-1">
            <HabitTracker />
          </div>
        </>
      )}
    </div>
  );
}

export default App;