import { TrendingUp, TrendingDown, Wallet, Activity, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom'; // Added this
import { MOCK_SUMMARY, MOCK_TREND, MOCK_BY_CATEGORY, MOCK_TRANSACTIONS, MOCK_BUDGETS } from '../data/mockData';
import StatCard from '../components/StatCard';
import TrendChart from '../components/TrendChart';
import DonutChart from '../components/DonutChart';
import BudgetBar from '../components/BudgetBar';
import { fmt, fmtFull, fmtDate } from '../utils/format';

const card = (children, style = {}) => (
  <div style={{
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)', ...style,
  }}>
    {children}
  </div>
);

export default function Dashboard() {
  const s = MOCK_SUMMARY;
  const savings = s.total_income - s.total_expenses;
  const savingsRate = ((savings / s.total_income) * 100).toFixed(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Header */}
      <div className="fade-up fade-up-1">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 4 }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>
              Good morning, Alex 👋
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 2 }}>Here's your financial overview for March 2026</p>
          </div>
          <div style={{
            background: 'rgba(124,106,247,0.1)', border: '1px solid rgba(124,106,247,0.25)',
            borderRadius: 8, padding: '6px 12px',
            fontSize: 11, color: 'var(--accent2)', fontFamily: 'var(--font-mono)',
          }}>
            💡 On track — saving {savingsRate}% of income
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="fade-up fade-up-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        <StatCard label="Total Income" value={fmt(s.total_income)} sub="↑ 14% vs last month" trend="up" color="var(--green)" icon={<TrendingUp size={14} color="var(--green)" />} />
        <StatCard label="Total Expenses" value={fmt(s.total_expenses)} sub="↓ 8% vs last month" trend="up" color="var(--red)" icon={<TrendingDown size={14} color="var(--red)" />} />
        <StatCard label="Net Savings" value={fmt(savings)} sub={`${savingsRate}% savings rate`} color="var(--accent)" icon={<Wallet size={14} color="var(--accent)" />} />
        <StatCard label="Transactions" value={s.transaction_count} sub="10 this month" color="var(--yellow)" icon={<Activity size={14} color="var(--yellow)" />} />
      </div>

      {/* Charts Row */}
      <div className="fade-up fade-up-3" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 14 }}>
        {card(
          <>
            <div style={{ padding: '18px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600 }}>Income vs Expenses</h2>
              <span style={{ fontSize: 10, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>Last 6 months</span>
            </div>
            <div style={{ padding: '12px 20px 18px' }}>
              <TrendChart data={MOCK_TREND} />
            </div>
          </>
        )}
        {card(
          <>
            <div style={{ padding: '18px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600 }}>Spending by Category</h2>
            </div>
            <div style={{ padding: '16px 20px 18px' }}>
              <DonutChart data={MOCK_BY_CATEGORY} />
            </div>
          </>
        )}
      </div>

      {/* Bottom Row */}
      <div className="fade-up fade-up-4" style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 14 }}>
        {/* Recent Transactions */}
        {card(
          <>
            <div style={{ padding: '18px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600 }}>Recent Transactions</h2>
              {/* Changed <a> to <Link> */}
              <Link to="/transactions" style={{ fontSize: 11, color: 'var(--accent2)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 3, fontWeight: 600 }}>
                View all <ArrowUpRight size={11} />
              </Link>
            </div>
            <div>
              {MOCK_TRANSACTIONS.slice(0, 6).map((t, i) => (
                <div key={t.id} style={{
                  display: 'flex', alignItems: 'center', padding: '10px 20px',
                  borderTop: i > 0 ? '1px solid var(--border)' : 'none',
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 8,
                    background: `${t.color}20`, display: 'flex', alignItems: 'center',
                    justifyContent: 'center', marginRight: 12, flexShrink: 0,
                  }}>
                    <div style={{ width: 8, height: 8, borderRadius: 2, background: t.color }} />
                  </div>
                  <div style={{ flex: 1, overflow: 'hidden' }}>
                    <div style={{ fontSize: 12, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{t.description}</div>
                    <div style={{ fontSize: 10, color: 'var(--muted)', marginTop: 1 }}>{t.merchant} · {fmtDate(t.date)}</div>
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500,
                    color: t.type === 'income' ? 'var(--green)' : 'var(--text)',
                  }}>
                    {t.type === 'income' ? '+' : '-'}{fmtFull(t.amount)}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Budget Snapshot */}
        {card(
          <>
            <div style={{ padding: '18px 20px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600 }}>Budget Progress</h2>
              {/* Changed <a> to <Link> */}
              <Link to="/budgets" style={{ fontSize: 11, color: 'var(--accent2)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 3, fontWeight: 600 }}>
                Manage <ArrowUpRight size={11} />
              </Link>
            </div>
            <div style={{ padding: '0 20px 18px', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {MOCK_BUDGETS.map(b => <BudgetBar key={b.id} budget={b} />)}
            </div>
          </>
        )}
      </div>
    </div>
  );
}