import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Budgets from './pages/Budgets';
import Analytics from './pages/Analytics';
import Layout from './components/Layout';

// Demo mode — no auth needed for job portfolio showcase
export default function App() {
  const [user] = useState({ name: 'Alex Morgan', email: 'alex@fintrack.io' });
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout user={user} />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/budgets" element={<Budgets />} />
          <Route path="/analytics" element={<Analytics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
