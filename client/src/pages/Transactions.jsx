import { useState } from 'react';
import { Search, Plus, Filter, ArrowUpDown, Trash2, Edit2 } from 'lucide-react';
import { MOCK_TRANSACTIONS, MOCK_CATEGORIES } from '../data/mockData';
import { fmtFull, fmtDate } from '../utils/format';

export default function Transactions() {
  const [txns, setTxns] = useState(MOCK_TRANSACTIONS);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ description: '', merchant: '', amount: '', type: 'expense', category_id: 1, date: new Date().toISOString().split('T')[0] });

  const filtered = txns.filter(t => {
    const matchSearch = t.description.toLowerCase().includes(search.toLowerCase()) || t.merchant.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || t.type === filter;
    return matchSearch && matchFilter;
  });

  const addTxn = () => {
    if (!form.amount || !form.description) return;
    const cat = MOCK_CATEGORIES.find(c => c.id === +form.category_id);
    const newT = { ...form, id: Date.now(), amount: +form.amount, category_id: +form.category_id, category_name: cat?.name, color: cat?.color, icon: cat?.icon };
    setTxns([newT, ...txns]);
    setShowAdd(false);
    setForm({ description: '', merchant: '', amount: '', type: 'expense', category_id: 1, date: new Date().toISOString().split('T')[0] });
  };

  const del = (id) => setTxns(txns.filter(t => t.id !== id));

  const inputStyle = {
    background: 'var(--surface2)', border: '1px solid var(--border2)',
    color: 'var(--text)', borderRadius: 8, padding: '8px 12px',
    fontSize: 12, width: '100%',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>Transactions</h1>
          <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 2 }}>{filtered.length} transactions found</p>
        </div>
        <button onClick={() => setShowAdd(!showAdd)} style={{
          background: 'var(--accent)', color: '#fff', borderRadius: 8,
          padding: '8px 14px', fontSize: 12, fontWeight: 600,
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <Plus size={14} /> Add Transaction
        </button>
      </div>

      {/* Add Form */}
      {showAdd && (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600, marginBottom: 14 }}>New Transaction</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 10 }}>
            <div><label style={{ fontSize: 10, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>DESCRIPTION</label>
              <input style={inputStyle} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="e.g. Grocery shopping" /></div>
            <div><label style={{ fontSize: 10, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>MERCHANT</label>
              <input style={inputStyle} value={form.merchant} onChange={e => setForm({ ...form, merchant: e.target.value })} placeholder="e.g. Whole Foods" /></div>
            <div><label style={{ fontSize: 10, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>AMOUNT ($)</label>
              <input style={inputStyle} type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} placeholder="0.00" /></div>
            <div><label style={{ fontSize: 10, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>TYPE</label>
              <select style={inputStyle} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select></div>
            <div><label style={{ fontSize: 10, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>CATEGORY</label>
              <select style={inputStyle} value={form.category_id} onChange={e => setForm({ ...form, category_id: e.target.value })}>
                {MOCK_CATEGORIES.filter(c => c.type === form.type).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select></div>
            <div><label style={{ fontSize: 10, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>DATE</label>
              <input style={inputStyle} type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} /></div>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button onClick={() => setShowAdd(false)} style={{ padding: '7px 14px', borderRadius: 7, background: 'var(--surface2)', color: 'var(--muted)', fontSize: 12 }}>Cancel</button>
            <button onClick={addTxn} style={{ padding: '7px 14px', borderRadius: 7, background: 'var(--accent)', color: '#fff', fontSize: 12, fontWeight: 600 }}>Add</button>
          </div>
        </div>
      )}

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10 }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search transactions..." style={{
            width: '100%', background: 'var(--surface)', border: '1px solid var(--border)',
            color: 'var(--text)', borderRadius: 8, padding: '8px 12px 8px 32px', fontSize: 12,
          }} />
        </div>
        {['all', 'income', 'expense'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '7px 14px', borderRadius: 8, fontSize: 12, fontWeight: 500, textTransform: 'capitalize',
            background: filter === f ? 'var(--accent)' : 'var(--surface)',
            color: filter === f ? '#fff' : 'var(--muted)',
            border: `1px solid ${filter === f ? 'transparent' : 'var(--border)'}`,
          }}>{f}</button>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              {['Date', 'Description', 'Category', 'Merchant', 'Amount', ''].map(h => (
                <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((t, i) => (
              <tr key={t.id} style={{ borderTop: i > 0 ? '1px solid var(--border)' : 'none' }}>
                <td style={{ padding: '11px 16px', fontSize: 11, color: 'var(--muted)', fontFamily: 'var(--font-mono)', whiteSpace: 'nowrap' }}>{fmtDate(t.date)}</td>
                <td style={{ padding: '11px 16px', fontSize: 12, fontWeight: 500 }}>{t.description}</td>
                <td style={{ padding: '11px 16px' }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    padding: '3px 8px', borderRadius: 5,
                    background: `${t.color}20`, fontSize: 10, color: t.color, fontWeight: 500,
                  }}>
                    <span style={{ width: 5, height: 5, borderRadius: 1, background: t.color }} />
                    {t.category_name}
                  </span>
                </td>
                <td style={{ padding: '11px 16px', fontSize: 11, color: 'var(--muted)' }}>{t.merchant}</td>
                <td style={{ padding: '11px 16px', fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500, color: t.type === 'income' ? 'var(--green)' : 'var(--text)', whiteSpace: 'nowrap' }}>
                  {t.type === 'income' ? '+' : '-'}{fmtFull(t.amount)}
                </td>
                <td style={{ padding: '11px 16px' }}>
                  <button onClick={() => del(t.id)} style={{ background: 'transparent', color: 'var(--muted)', padding: 4, borderRadius: 5, display: 'flex', alignItems: 'center' }}>
                    <Trash2 size={12} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div style={{ padding: 32, textAlign: 'center', color: 'var(--muted)', fontSize: 12 }}>No transactions found</div>
        )}
      </div>
    </div>
  );
}
