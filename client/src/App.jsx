import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budgets from './pages/Budgets';
import Analytics from './pages/Analytics';
import Layout from './components/Layout';

// Mock components for the missing pages
const Profile = () => <div style={{ color: 'var(--text)' }}><h2>Profile Settings</h2><p>Manage your personal information here.</p></div>;
const SettingsPage = () => <div style={{ color: 'var(--text)' }}><h2>System Settings</h2><p>Configure your dashboard preferences.</p></div>;
const Subscription = () => <div style={{ color: 'var(--text)' }}><h2>Subscription Plan</h2><p>You are currently on the <strong>Pro Plan</strong>.</p></div>;
const Login = ({ onLogin }) => (
  <div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
    <button 
      onClick={onLogin}
      style={{ padding: '12px 24px', background: 'var(--accent)', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600 }}
    >
      Login to Fintrack (Demo Mode)
    </button>
  </div>
);

export default function App() {
  const [user, setUser] = useState({ name: 'Alex Morgan', email: 'alex@fintrack.io' });

  const handleLogout = () => {
    setUser(null); // This "logs out" the user
  };

  const handleLogin = () => {
    setUser({ name: 'Alex Morgan', email: 'alex@fintrack.io' }); // This "logs in" the user
  };

  return (
    <BrowserRouter>
      <Routes>
        {/* If user is NOT logged in, show Login page */}
        {!user ? (
          <>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        ) : (
          /* If user IS logged in, show the Dashboard Layout */
          <Route element={<Layout user={user} onLogout={handleLogout} />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/budgets" element={<Budgets />} />
            <Route path="/analytics" element={<Analytics />} />
            
            {/* New Routes for the buttons we just added */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/subscription" element={<Subscription />} />
            
            {/* Redirect any unknown logged-in paths to dashboard */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}