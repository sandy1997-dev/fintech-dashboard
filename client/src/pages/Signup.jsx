import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TrendingUp } from 'lucide-react';

export default function Signup({ onSignup }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) return alert("Please fill in all fields");
    onSignup(form);
    navigate('/dashboard');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg)', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: 400, padding: 40, background: 'var(--surface)', borderRadius: 20, border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 32, justifyContent: 'center' }}>
          <TrendingUp size={28} color="var(--accent)" />
          <span style={{ fontSize: 22, fontWeight: 800 }}>Fintrack</span>
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, textAlign: 'center' }}>Create Account</h2>
        <p style={{ color: 'var(--muted)', fontSize: 13, textAlign: 'center', marginBottom: 24 }}>Start tracking your wealth today.</p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <input placeholder="Full Name" style={{ padding: 12, borderRadius: 10, background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }} 
            onChange={e => setForm({...form, name: e.target.value})} />
          <input placeholder="Email Address" type="email" style={{ padding: 12, borderRadius: 10, background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }} 
            onChange={e => setForm({...form, email: e.target.value})} />
          <input placeholder="Password" type="password" style={{ padding: 12, borderRadius: 10, background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }} 
            onChange={e => setForm({...form, password: e.target.value})} />
          
          <button type="submit" style={{ padding: 14, borderRadius: 10, background: 'var(--accent)', color: '#fff', fontWeight: 700, marginTop: 10 }}>Sign Up</button>
        </form>
        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--muted)', marginTop: 20 }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 600 }}>Log In</Link>
        </p>
      </div>
    </div>
  );
}