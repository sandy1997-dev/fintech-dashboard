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
  // 1. SAFER INITIALIZATION
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      if (savedUser && savedUser !== 'undefined') {
        return JSON.parse(savedUser);
      }
    } catch (error) {
      console.error("Failed to parse user data:", error);
    }
    return null;
  });

  const [isPro, setIsPro] = useState(localStorage.getItem('pro') === 'true');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // 2. SAFER SAVING
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

  // 3. NEW: CANCEL PRO PLAN LOGIC
  const cancelPro = () => {
    setIsPro(false);
    localStorage.setItem('pro', 'false');
    alert("Your Pro plan has been canceled. You are now on the Basic plan.");
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
            
            {/* 👈 FIX: Added onCancel={cancelPro} to the Subscription route */}
            <Route path="/subscription" element={<Subscription isPro={isPro} onActivate={upgradePro} onCancel={cancelPro} />} />
            
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Route>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}