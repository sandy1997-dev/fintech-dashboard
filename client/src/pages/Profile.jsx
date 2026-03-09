import { useState } from 'react';
import { User, Mail, Camera } from 'lucide-react';

export default function Profile({ user, setUser }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const save = () => {
    setUser({ ...user, name, email });
    alert("Profile Updated!");
  };

  return (
    <div style={{ maxWidth: 600 }}>
      <h2 style={{ marginBottom: 24 }}>Profile Settings</h2>
      <div style={{ background: 'var(--surface)', padding: 32, borderRadius: 16, border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
          <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, color: '#fff', fontWeight: 800 }}>
            {name[0]}
          </div>
          <button style={{ fontSize: 12, background: 'var(--bg)', border: '1px solid var(--border)', padding: '8px 12px', borderRadius: 8, color: 'var(--text)' }}>Change Photo</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div>
            <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 8 }}>FULL NAME</label>
            <input value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text)' }} />
          </div>
          <div>
            <label style={{ fontSize: 11, color: 'var(--muted)', display: 'block', marginBottom: 8 }}>EMAIL ADDRESS</label>
            <input value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '12px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--text)' }} />
          </div>
          <button onClick={save} style={{ background: 'var(--accent)', color: '#fff', padding: '12px', borderRadius: 10, border: 'none', fontWeight: 600, marginTop: 10 }}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}