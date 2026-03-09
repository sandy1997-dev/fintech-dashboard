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
import Signup from './pages/Signup'; // 👈 Added
import Layout from './components/Layout';

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [isPro, setIsPro] = useState(localStorage.getItem('pro') === 'true');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleAuth = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    window.location.href = '/login'; // 👈 Hard redirect to clear URL state
  };

  const upgradePro = () => {
    setIsPro(true);
    localStorage.setItem('pro', 'true');
    // We don't want to "stuck" here, so we show a success toast or alert
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