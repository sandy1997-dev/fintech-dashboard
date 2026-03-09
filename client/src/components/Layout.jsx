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
  Calendar 
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
  { to: '/transactions', icon: ArrowLeftRight, label: 'Transactions' },
  { to: '/budgets', icon: Target, label: 'Budgets' },
  { to: '/analytics', icon: BarChart3, label: 'Analytics' },
];

export default function Layout({ user, isPro, onLogout }) {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <aside style={{
        width: 220, background: 'var(--surface)', borderRight: '1px solid var(--border)',
        display: 'flex', flexDirection: 'column', padding: '24px 0', position: 'fixed',
        top: 0, left: 0, bottom: 0, zIndex: 100,
      }}>
        {/* Logo */}
        <div style={{ padding: '0 20px 32px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, background: 'var(--accent)', borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <TrendingUp size={18} color="#fff" />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em' }}>
            Fintrack
          </span>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '0 12px', display: 'flex', flexDirection: 'column', gap: 2 }}>
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 8, textDecoration: 'none',
              color: isActive ? 'var(--accent2)' : 'var(--muted)',
              background: isActive ? 'rgba(124,106,247,0.12)' : 'transparent',
              fontSize: 13, fontWeight: 500, transition: 'all 0.15s',
            })}>
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
          
          {/* Settings Nav Item */}
          <NavLink to="/settings" style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 8, textDecoration: 'none',
              color: isActive ? 'var(--accent2)' : 'var(--muted)',
              background: isActive ? 'rgba(124,106,247,0.12)' : 'transparent',
              fontSize: 13, fontWeight: 500, marginTop: 'auto'
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
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.03)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--accent), #ec4899)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, 
              color: '#ffffff', /* Hardcoded to white so it never vanishes */
              flexShrink: 0,
            }}>
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div style={{ overflow: 'hidden', flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name || 'User'}</div>
              <div 
                onClick={(e) => { e.stopPropagation(); navigate('/subscription'); }}
                style={{ fontSize: 11, color: isPro ? 'var(--green)' : 'var(--accent2)', fontWeight: 600, cursor: 'pointer' }}
              >
                {isPro ? 'Pro Plan' : 'Basic Plan'}
              </div>
            </div>
          </div>
          
          <button 
            onClick={onLogout}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', borderRadius: 8, border: 'none',
              background: 'transparent', color: '#ef4444', fontSize: 13,
              fontWeight: 500, cursor: 'pointer', marginTop: 8
            }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, marginLeft: 220, minHeight: '100vh', background: 'var(--bg)' }}>
        {/* Top bar */}
        <header style={{
          height: 56, borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
          padding: '0 28px', gap: 12, position: 'sticky', top: 0,
          background: 'var(--bg)', zIndex: 50,
        }}>
          
          <button style={{
            width: 34, height: 34, borderRadius: 8, background: 'var(--surface)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--muted)', border: '1px solid var(--border)', cursor: 'pointer'
          }}>
            <Calendar size={15} />
          </button>
          
          <button style={{
            width: 34, height: 34, borderRadius: 8, background: 'var(--surface)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--muted)', border: '1px solid var(--border)', cursor: 'pointer'
          }}>
            <Bell size={15} />
          </button>
          
          <button 
            onClick={() => navigate('/settings')}
            style={{
              width: 34, height: 34, borderRadius: 8, background: 'var(--surface)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--muted)', border: '1px solid var(--border)', cursor: 'pointer'
            }}
          >
            <Settings size={15} />
          </button>

          <div style={{ height: 24, width: 1, background: 'var(--border)' }} />
          <span style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>
            {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
          </span>
        </header>

        <div style={{ padding: '28px' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}