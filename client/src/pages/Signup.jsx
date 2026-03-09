import React, { useState } from 'react';
import { TrendingUp, ShieldCheck, Zap, Globe } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup({ onSignup }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return alert("Please fill in all fields");
    onSignup(form); // Saves to local storage in App.jsx
    navigate('/dashboard'); // Redirects to app
  };

  return (
    <div style={{ 
      display: 'flex', minHeight: '100vh', background: 'var(--bg)', 
      fontFamily: 'var(--font-display)', color: 'var(--text)' 
    }}>
      {/* Left Side: Branding */}
      <div style={{ 
        flex: 1, background: 'var(--surface)', padding: 60, 
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        borderRight: '1px solid var(--border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
          <div style={{ width: 40, height: 40, background: 'var(--accent)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TrendingUp size={24} color="#ffffff" />
          </div>
          <span style={{ fontSize: 24, fontWeight: 800 }}>Fintrack</span>
        </div>
        <h1 style={{ fontSize: 42, fontWeight: 800, lineHeight: 1.1, marginBottom: 24 }}>
          Join the future of <br /> <span style={{ color: 'var(--accent2)' }}>wealth management.</span>
        </h1>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, maxWidth: 400 }}>
          {[
            { icon: <ShieldCheck size={20} />, title: "Bank-grade Security", desc: "Your data is encrypted with 256-bit protocols." },
            { icon: <Zap size={20} />, title: "Real-time Insights", desc: "Instantly see where your money is going." }
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

      {/* Right Side: Form */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
        <div style={{ width: '100%', maxWidth: 360 }}>
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Create Account</h2>
            <p style={{ color: 'var(--muted)', fontSize: 14 }}>Start tracking your wealth today.</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Full Name</label>
              <input type="text" onChange={(e) => setForm({...form, name: e.target.value})} style={{ width: '100%', padding: '12px 16px', borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Email Address</label>
              <input type="email" onChange={(e) => setForm({...form, email: e.target.value})} style={{ width: '100%', padding: '12px 16px', borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', marginBottom: 8, display: 'block' }}>Password</label>
              <input type="password" onChange={(e) => setForm({...form, password: e.target.value})} style={{ width: '100%', padding: '12px 16px', borderRadius: 10, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }} />
            </div>
            
            <button type="submit" style={{ marginTop: 10, padding: '14px', borderRadius: 10, background: 'var(--accent)', color: '#ffffff', border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: 15 }}>
              Sign Up
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--muted)', marginTop: 24 }}>
            Already have an account? <Link to="/login" style={{ color: 'var(--accent2)', fontWeight: 600, textDecoration: 'none' }}>Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}