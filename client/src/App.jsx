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
import Layout from './components/Layout';

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('fintrack_user')));
  const [isPro, setIsPro] = useState(localStorage.getItem('fintrack_pro') === 'true');
  const [theme, setTheme] = useState(localStorage.getItem('fintrack_theme') || 'dark');

  // Handle Theme Switching
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('fintrack_theme', theme);
  }, [theme]);

  const handleLogin = (userData) => {
    const data = userData || { name: 'Alex Morgan', email: 'alex@fintrack.io' };
    setUser(data);
    localStorage.setItem('fintrack_user', JSON.stringify(data));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('fintrack_user');
  };

  const togglePro = () => {
    setIsPro(true);
    localStorage.setItem('fintrack_pro', 'true');
  };

  return (
    <BrowserRouter>
      <Routes>
        {!user ? (
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        ) : (
          <Route element={<Layout user={user} isPro={isPro} onLogout={handleLogout} />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions isPro={isPro} />} />
            <Route path="/budgets" element={<Budgets />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/profile" element={<Profile user={user} setUser={handleLogin} />} />
            <Route path="/settings" element={<SettingsPage theme={theme} setTheme={setTheme} />} />
            <Route path="/subscription" element={<Subscription isPro={isPro} onActivate={togglePro} />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}