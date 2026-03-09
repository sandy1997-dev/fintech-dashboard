import { fmt } from '../utils/format';

export default function BudgetBar({ budget }) {
  const pct = Math.min((budget.spent / budget.amount) * 100, 100);
  const over = budget.spent > budget.amount;
  const barColor = over ? 'var(--red)' : pct > 75 ? 'var(--yellow)' : budget.color;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: 2, background: budget.color }} />
          <span style={{ fontSize: 12, color: 'var(--text)', fontWeight: 500 }}>{budget.category_name}</span>
        </div>
        <div style={{ display: 'flex', gap: 6, alignItems: 'baseline' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: over ? 'var(--red)' : 'var(--text)' }}>{fmt(budget.spent)}</span>
          <span style={{ fontSize: 11, color: 'var(--muted)' }}>/ {fmt(budget.amount)}</span>
        </div>
      </div>
      <div style={{ height: 5, background: 'var(--border)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${pct}%`, background: barColor,
          borderRadius: 3, transition: 'width 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }} />
      </div>
      <div style={{ fontSize: 10, color: over ? 'var(--red)' : 'var(--muted)', textAlign: 'right' }}>
        {over ? `${fmt(budget.spent - budget.amount)} over budget` : `${fmt(budget.amount - budget.spent)} remaining`}
      </div>
    </div>
  );
}
 