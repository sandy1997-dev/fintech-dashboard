import React, { useState } from 'react';
import { TrendingUp, ShieldCheck, Zap, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; // 👈 We must import Link and useNavigate

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('alex@fintrack.io');
  const [password, setPassword] = useState('password123');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Please enter your details.");
    
    // Pass the user data back to App.jsx to save in LocalStorage
    onLogin({ name: 'Alex Morgan', email: email }); 
    
    // Force the redirect to dashboard
    navigate('/dashboard');
  };

  return (
    <div style={{ 
      display: 'flex', minHeight: '100vh', background: 'var(--bg)', 
      fontFamily: 'var(--font-display)', color: 'var(--text)' 
    }}>
      {/* Left Side: Branding & Features */}
      <div style={{ 
        flex: 1, background: 'var(--surface)', padding: 60, 
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        borderRight: '1px solid var(--border)', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
          <div style={{ width: 40, height: 40, background: 'var(--accent)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TrendingUp size={24} color="#fff" />
          </div>
          <span style={{ fontSize: 24, fontWeight: 800, letterSpacing: '-0.03em' }}>Fintrack</span>
        </div>

        <h1 style={{ fontSize: 42, fontWeight: 800, lineHeight: 1.1, marginBottom: 24, letterSpacing: '-0.04em' }}>
          Smart wealth management <br /> 
          <span style={{ color: 'var(--accent2)' }}>for the next generation.</span>
        </h1>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 400 }}>
          {[
            { icon: <ShieldCheck size={20} />, title: "Bank-grade Security", desc: "Your data is encrypted with 256-bit protocols." },
            { icon: <Zap size={20} />, title: "Real-time Insights", desc: "Instantly see where your money is going." },
            { icon: <Globe size={20} />, title: "Global Assets", desc: "Track accounts across 15,000+ institutions." }
          ].map((feature, i) => (
            <div key={i} style={{ display: 'flex', gap: 16 }}>
              <div style={{ color: 'var(--accent)' }}>{feature.icon}</div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{feature.title}</div>
                <div style={{ fontSize: 13, color: 'var(--muted)', marginTop: 4 }}>{feature.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <div style={{ width: '100%', maxWidth: 360 }}>
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Welcome back</h2>
            <p style={{ color: 'var(--muted)', fontSize: 14 }}>Enter your credentials to access your dashboard.</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Email Address</label>
              <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
              />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Password</label>
              <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
              />
            </div>
            
            <button type="submit" style={{ 
              marginTop: 10, padding: '14px', borderRadius: 10, background: 'var(--accent)', 
              color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: 15,
              boxShadow: '0 10px 15px -3px rgba(124, 106, 247, 0.3)'
            }}>
              Sign In
            </button>
          </form>

          {/* 👈 FIX: This is now a real React Router Link */}
          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--muted)', marginTop: 24 }}>
            Don't have an account? <Link to="/signup" style={{ color: 'var(--accent2)', fontWeight: 600, textDecoration: 'none' }}>Get started for free</Link>
          </p>
        </div>
      </div>
    </div>
  );
}