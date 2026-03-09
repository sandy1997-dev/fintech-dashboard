import { useState } from 'react';
import { Plus, Target } from 'lucide-react';
import { MOCK_BUDGETS, MOCK_CATEGORIES } from '../data/mockData';
import BudgetBar from '../components/BudgetBar';
import { fmt } from '../utils/format';

export default function Budgets() {
  const [budgets, setBudgets] = useState(MOCK_BUDGETS);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ category_id: 1, amount: '' });

  const totalBudgeted = budgets.reduce((s, b) => s + +b.amount, 0);
  const totalSpent = budgets.reduce((s, b) => s + +b.spent, 0);
  const remaining = totalBudgeted - totalSpent;

  const inputStyle = { background: 'var(--surface2)', border: '1px solid var(--border2)', color: 'var(--text)', borderRadius: 8, padding: '8px 12px', fontSize: 12, width: '100%' };

  const addBudget = () => {
    if (!form.amount) return;
    const cat = MOCK_CATEGORIES.find(c => c.id === +form.category_id);
    const nb = { id: Date.now(), category_id: +form.category_id, category_name: cat?.name, icon: cat?.icon, color: cat?.color, amount: +form.amount, spent: 0 };
    setBudgets([...budgets, nb]);
    setShowAdd(false);
    setForm({ category_id: 1, amount: '' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>Budgets</h1>
          <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 2 }}>January 2024 · {budgets.length} budget categories</p>
        </div>
        <button onClick={() => setShowAdd(!showAdd)} style={{ background: 'var(--accent)', color: '#fff', borderRadius: 8, padding: '8px 14px', fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Plus size={14} /> New Budget
        </button>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        {[
          { label: 'Total Budgeted', val: fmt(totalBudgeted), color: 'var(--accent)' },
          { label: 'Total Spent', val: fmt(totalSpent), color: 'var(--red)' },
          { label: 'Remaining', val: fmt(remaining), color: remaining >= 0 ? 'var(--green)' : 'var(--red)' },
        ].map(item => (
          <div key={item.label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '18px 22px' }}>
            <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{item.label}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 24, fontWeight: 500, color: item.color }}>{item.val}</div>
          </div>
        ))}
      </div>

      {/* Overall progress */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <span style={{ fontSize: 13, fontWeight: 600 }}>Overall Budget Usage</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--muted)' }}>{Math.round((totalSpent / totalBudgeted) * 100)}%</span>
        </div>
        <div style={{ height: 8, background: 'var(--border)', borderRadius: 4, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${Math.min((totalSpent / totalBudgeted) * 100, 100)}%`, background: 'var(--accent)', borderRadius: 4, transition: 'width 0.8s ease' }} />
        </div>
      </div>

      {/* Add form */}
      {showAdd && (
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 20 }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600, marginBottom: 14 }}>New Budget</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
            <div><label style={{ fontSize: 10, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>CATEGORY</label>
              <select style={inputStyle} value={form.category_id} onChange={e => setForm({ ...form, category_id: e.target.value })}>
                {MOCK_CATEGORIES.filter(c => c.type === 'expense').map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select></div>
            <div><label style={{ fontSize: 10, color: 'var(--muted)', display: 'block', marginBottom: 4 }}>MONTHLY LIMIT ($)</label>
              <input style={inputStyle} type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} placeholder="500" /></div>
          </div>
          <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button onClick={() => setShowAdd(false)} style={{ padding: '7px 14px', borderRadius: 7, background: 'var(--surface2)', color: 'var(--muted)', fontSize: 12 }}>Cancel</button>
            <button onClick={addBudget} style={{ padding: '7px 14px', borderRadius: 7, background: 'var(--accent)', color: '#fff', fontSize: 12, fontWeight: 600 }}>Create</button>
          </div>
        </div>
      )}

      {/* Budget list */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
        {budgets.map(b => (
          <div key={b.id} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '18px 20px' }}>
            <BudgetBar budget={b} />
          </div>
        ))}
      </div>
    </div>
  );
}
