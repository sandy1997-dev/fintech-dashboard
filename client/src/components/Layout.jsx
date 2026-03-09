import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  Target, 
  BarChart3, 
  Bell, 
  Settings, 
  TrendingUp, 
  LogOut,
  Calendar,
  Clock
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { to: '/transactions', icon: ArrowLeftRight, label: 'Transactions' },
  { to: '/budgets', icon: Target, label: 'Budgets' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
];

export default function Layout({ user, isPro, onLogout }) {
  const navigate = useNavigate();
  
  // Live Clock State
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  const formattedTime = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Sidebar */}
      <aside style={{
        width: 220, background: 'var(--surface)', borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column', padding: '24px 0', position: 'fixed',
        top: 0, left: 0, bottom: 0, zIndex: 100, transition: 'background 0.3s, border 0.3s'
      }}>
        {/* Logo */}
        <div style={{ padding: '0 20px 32px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, background: 'var(--accent)', borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <TrendingUp size={18} color="#ffffff" />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--text)' }}>
            Fintrack
          </span>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 8, textDecoration: 'none',
              color: isActive ? 'var(--accent)' : 'var(--text)', 
              background: isActive ? 'rgba(124,106,247,0.12)' : 'transparent',
              fontSize: 13, fontWeight: 600, transition: 'all 0.15s',
              opacity: isActive ? 1 : 0.7
            })}>
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
          
          {/* Settings Nav Item */}
          <NavLink to="/settings" style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 8, textDecoration: 'none',
              color: isActive ? 'var(--accent)' : 'var(--text)',
              background: isActive ? 'rgba(124,106,247,0.12)' : 'transparent',
              fontSize: 13, fontWeight: 600, marginTop: 'auto',
              opacity: isActive ? 1 : 0.7
            })}>
              <Settings size={16} />
              Settings
          </NavLink>
        </nav>

        {/* User Section & Logout */}
        <div style={{ padding: '16px 12px', borderTop: '1px solid var(--border)' }}>
          <div 
            onClick={() => navigate('/profile')}
            style={{ 
              display: 'flex', alignItems: 'center', gap: 10, padding: '8px', 
              cursor: 'pointer', borderRadius: 8, transition: 'background 0.2s' 
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(124,106,247,0.08)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent), #ec4899)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 14, fontWeight: 800, 
              color: '#ffffff', // FORCED PURE WHITE
              textShadow: '0px 2px 4px rgba(0,0,0,0.6)', // STRONG SHADOW
              flexShrink: 0,
            }}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div style={{ overflow: 'hidden', flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name || 'User'}</div>
              <div 
                onClick={(e) => { e.stopPropagation(); navigate('/subscription'); }}
                style={{ fontSize: 11, color: isPro ? 'var(--green)' : 'var(--accent)', fontWeight: 700, cursor: 'pointer' }}
              >
                {isPro ? 'Pro Plan' : 'Basic Plan'}
              </div>
            </div>
          </div>
          
          {/* FIXED LOGOUT BUTTON */}
          <button 
            onClick={onLogout}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 8, border: '1px solid rgba(239, 68, 68, 0.2)',
              background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontSize: 13,
              fontWeight: 700, cursor: 'pointer', marginTop: 12, transition: '0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, marginLeft: 220, minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Top bar */}
        <header style={{
          height: 64, borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
          padding: '0 28px', gap: 16, position: 'sticky', top: 0,
          background: 'var(--bg)', zIndex: 50, transition: 'background 0.3s, border 0.3s'
        }}>
          
          {/* LIVE DIGITAL CLOCK & DATE */}
          <div style={{ 
            display: 'flex', alignItems: 'center', gap: 16, 
            background: 'var(--surface)', padding: '8px 16px', 
            borderRadius: 12, border: '1px solid var(--border)' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text)', fontSize: 12, fontWeight: 600 }}>
              <Calendar size={14} color="var(--accent)" />
              {formattedDate}
            </div>
            <div style={{ width: 1, height: 14, background: 'var(--border)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text)', fontSize: 13, fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
              <Clock size={14} color="var(--accent)" />
              {formattedTime}
            </div>
          </div>
          
          {/* Bell Button */}
          <button 
            onClick={() => alert("You have 0 new notifications.")}
            style={{
              width: 38, height: 38, borderRadius: 10, background: 'var(--surface)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text)', border: '1px solid var(--border)', cursor: 'pointer',
              transition: '0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Bell size={16} />
          </button>
          
          {/* Settings Button */}
          <button 
            onClick={() => navigate('/settings')}
            style={{
              width: 38, height: 38, borderRadius: 10, background: 'var(--surface)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--text)', border: '1px solid var(--border)', cursor: 'pointer',
              transition: '0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Settings size={16} />
          </button>
        </header>

        <div style={{ padding: '32px', flex: 1 }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}