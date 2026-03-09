import { useState } from 'react';
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
  // Logic to handle user state and Pro status
  const [user, setUser] = useState({ name: 'Alex Morgan', email: 'alex@fintrack.io' });
  const [isPro, setIsPro] = useState(false);

  const handleLogout = () => setUser(null);
  const handleLogin = () => setUser({ name: 'Alex Morgan', email: 'alex@fintrack.io' });
  const togglePro = () => setIsPro(true);

  return (
    <BrowserRouter>
      <Routes>
        {!user ? (
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        ) : (
          <Route element={<Layout user={user} isPro={isPro} onLogout={handleLogout} />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/budgets" element={<Budgets />} />
            <Route path="/analytics" element={<Analytics />} />
            
            {/* Real Interactive Pages */}
            <Route path="/profile" element={<Profile user={user} setUser={setUser} />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/subscription" element={<Subscription isPro={isPro} onUpgrade={togglePro} />} />
            
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}