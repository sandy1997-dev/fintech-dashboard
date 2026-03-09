import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budgets from './pages/Budgets';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import SettingsPage from './pages/Settings';
import Subscription from './pages/Subscription';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Layout from './components/Layout';

export default function App() {
  // 1. SAFER INITIALIZATION: Check for "undefined" strings before parsing
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      // Only parse if it exists and isn't the literal word "undefined"
      if (savedUser && savedUser !== 'undefined') {
        return JSON.parse(savedUser);
      }
    } catch (error) {
      console.error("Failed to parse user data:", error);
    }
    return null; // Fallback to null if anything goes wrong
  });

  const [isPro, setIsPro] = useState(localStorage.getItem('pro') === 'true');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // 2. SAFER SAVING: Never let empty data poison the local storage
  const handleAuth = (userData) => {
    if (!userData) return; 
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    window.location.href = '/login'; 
  };

  const upgradePro = () => {
    setIsPro(true);
    localStorage.setItem('pro', 'true');
    alert("Upgrade Successful! You are now a PRO user.");
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login onLogin={handleAuth} />} />
        <Route path="/signup" element={user ? <Navigate to="/dashboard" /> : <Signup onSignup={handleAuth} />} />

        {/* Protected Dashboard Routes */}
        {user ? (
          <Route element={<Layout user={user} isPro={isPro} onLogout={handleLogout} />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions isPro={isPro} />} />
            <Route path="/budgets" element={<Budgets />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/profile" element={<Profile user={user} setUser={handleAuth} />} />
            <Route path="/settings" element={<SettingsPage theme={theme} setTheme={setTheme} />} />
            <Route path="/subscription" element={<Subscription isPro={isPro} onActivate={upgradePro} />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}