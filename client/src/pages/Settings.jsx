import React, { useState } from 'react';
import { Moon, Sun, Bell, Shield, Eye, Smartphone } from 'lucide-react';

export default function SettingsPage() {
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    alerts: true
  });

  const toggleNotif = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const sectionStyle = {
    background: 'var(--surface)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '24px',
    marginBottom: '20px'
  };

  const rowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 0',
    borderBottom: '1px solid var(--border)'
  };

  return (
    <div style={{ maxWidth: 800 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em' }}>Settings</h1>
        <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 4 }}>Configure your dashboard preferences and security.</p>
      </div>

      {/* Appearance Section */}
      <h3 style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Appearance</h3>
      <div style={sectionStyle}>
        <div style={{ ...rowStyle, borderBottom: 'none' }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {theme === 'light' ? <Sun size={20} color="var(--yellow)" /> : <Moon size={20} color="var(--accent)" />}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Interface Theme</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>Select how Fintrack looks on your screen.</div>
            </div>
          </div>
          <div style={{ display: 'flex', background: 'var(--bg)', padding: 4, borderRadius: 10, border: '1px solid var(--border)' }}>
            <button 
              onClick={() => setTheme('light')}
              style={{ padding: '6px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, background: theme === 'light' ? 'var(--surface)' : 'transparent', color: theme === 'light' ? 'var(--text)' : 'var(--muted)', boxShadow: theme === 'light' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none' }}>
              Light
            </button>
            <button 
              onClick={() => setTheme('dark')}
              style={{ padding: '6px 16px', borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 12, fontWeight: 600, background: theme === 'dark' ? 'var(--surface)' : 'transparent', color: theme === 'dark' ? 'var(--text)' : 'var(--muted)', boxShadow: theme === 'dark' ? '0 2px 4px rgba(0,0,0,0.05)' : 'none' }}>
              Dark
            </button>
          </div>
        </div>
      </div>

      {/* Notifications Section */}
      <h3 style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Notifications</h3>
      <div style={sectionStyle}>
        {[
          { key: 'email', label: 'Email Notifications', desc: 'Get weekly summaries of your spending.', icon: <Bell size={18} /> },
          { key: 'push', label: 'Push Notifications', desc: 'Alerts for large transactions or low budgets.', icon: <Smartphone size={18} /> },
          { key: 'alerts', label: 'Security Alerts', desc: 'Notifications about new logins or changes.', icon: <Shield size={18} /> }
        ].map((item, i, arr) => (
          <div key={item.key} style={{ ...rowStyle, borderBottom: i === arr.length - 1 ? 'none' : rowStyle.borderBottom }}>
            <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ color: 'var(--muted)' }}>{item.icon}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{item.label}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{item.desc}</div>
              </div>
            </div>
            <div 
              onClick={() => toggleNotif(item.key)}
              style={{ 
                width: 42, height: 22, borderRadius: 12, 
                background: notifications[item.key] ? 'var(--green)' : 'var(--border)', 
                position: 'relative', cursor: 'pointer', transition: '0.2s' 
              }}>
              <div style={{ 
                width: 16, height: 16, borderRadius: '50%', background: '#fff', 
                position: 'absolute', top: 3, left: notifications[item.key] ? 23 : 3, 
                transition: '0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' 
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Security Section */}
      <h3 style={{ fontSize: 12, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Privacy & Security</h3>
      <div style={sectionStyle}>
        <div style={{ ...rowStyle, borderBottom: 'none' }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{ color: 'var(--muted)' }}><Eye size={18} /></div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>Incognito Mode</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>Hide balances from the dashboard overview.</div>
            </div>
          </div>
          <button style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border)', background: 'var(--bg)', color: 'var(--text)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
            Enable
          </button>
        </div>
      </div>
    </div>
  );
}