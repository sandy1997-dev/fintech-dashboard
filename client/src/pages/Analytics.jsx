import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { MOCK_TREND, MOCK_BY_CATEGORY, MOCK_SUMMARY } from '../data/mockData';
import TrendChart from '../components/TrendChart';
import DonutChart from '../components/DonutChart';
import { fmt } from '../utils/format';

function BarChart({ data }) {
  const svgRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    if (!data.length) return;
    const W = containerRef.current.clientWidth;
    const H = 180;
    const margin = { top: 10, right: 10, bottom: 30, left: 10 };
    const width = W - margin.left - margin.right;
    const height = H - margin.top - margin.bottom;

    d3.select(svgRef.current).selectAll('*').remove();
    const svg = d3.select(svgRef.current).attr('width', W).attr('height', H);
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand().domain(data.map(d => d.name)).range([0, width]).padding(0.25);
    const y = d3.scaleLinear().domain([0, d3.max(data, d => +d.total) * 1.15]).range([height, 0]);

    g.append('g').attr('transform', `translate(0,${height})`).call(d3.axisBottom(x).tickSize(0))
      .call(g => { g.selectAll('text').attr('fill', '#6b7280').attr('font-size', 9).attr('dy', 14); g.select('.domain').remove(); });

    const bars = g.selectAll('rect').data(data).enter().append('rect')
      .attr('x', d => x(d.name)).attr('width', x.bandwidth())
      .attr('y', height).attr('height', 0)
      .attr('rx', 4).attr('fill', d => d.color);

    bars.transition().duration(600).delay((d, i) => i * 60)
      .attr('y', d => y(d.total)).attr('height', d => height - y(d.total));

    g.selectAll('.val').data(data).enter().append('text')
      .attr('x', d => x(d.name) + x.bandwidth() / 2)
      .attr('y', d => y(d.total) - 4)
      .attr('text-anchor', 'middle').attr('fill', '#9ca3af')
      .attr('font-size', 8).attr('font-family', 'DM Mono, monospace')
      .text(d => `$${Math.round(d.total)}`);
  }, [data]);

  return <div ref={containerRef} style={{ width: '100%' }}><svg ref={svgRef} style={{ display: 'block', width: '100%' }} /></div>;
}

function MonthlyTable({ data }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ borderBottom: '1px solid var(--border)' }}>
          {['Month', 'Income', 'Expenses', 'Net', 'Rate'].map(h => (
            <th key={h} style={{ padding: '8px 12px', textAlign: 'left', fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 500 }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => {
          const net = row.income - row.expenses;
          const rate = ((net / row.income) * 100).toFixed(0);
          return (
            <tr key={i} style={{ borderTop: i > 0 ? '1px solid var(--border)' : 'none' }}>
              <td style={{ padding: '9px 12px', fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)' }}>{row.label}</td>
              <td style={{ padding: '9px 12px', fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--green)' }}>{fmt(row.income)}</td>
              <td style={{ padding: '9px 12px', fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--red)' }}>{fmt(row.expenses)}</td>
              <td style={{ padding: '9px 12px', fontSize: 12, fontFamily: 'var(--font-mono)', color: net >= 0 ? 'var(--green)' : 'var(--red)', fontWeight: 600 }}>{fmt(net)}</td>
              <td style={{ padding: '9px 12px', fontSize: 11 }}>
                <span style={{ padding: '2px 6px', borderRadius: 4, background: +rate >= 20 ? 'rgba(52,211,153,0.15)' : 'rgba(251,191,36,0.15)', color: +rate >= 20 ? 'var(--green)' : 'var(--yellow)', fontSize: 10, fontFamily: 'var(--font-mono)' }}>{rate}%</span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

const card = (title, sub, children) => (
  <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
    <div style={{ padding: '18px 20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600 }}>{title}</h2>
        {sub && <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>{sub}</p>}
      </div>
    </div>
    <div style={{ padding: '14px 20px 20px' }}>{children}</div>
  </div>
);

export default function Analytics() {
  const s = MOCK_SUMMARY;
  const avgIncome = MOCK_TREND.reduce((a, d) => a + d.income, 0) / MOCK_TREND.length;
  const avgExpenses = MOCK_TREND.reduce((a, d) => a + d.expenses, 0) / MOCK_TREND.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>Analytics</h1>
        <p style={{ color: 'var(--muted)', fontSize: 13, marginTop: 2 }}>Deep dive into your financial patterns</p>
      </div>

      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
        {[
          { label: 'Avg Monthly Income', val: fmt(avgIncome), color: 'var(--green)' },
          { label: 'Avg Monthly Expenses', val: fmt(avgExpenses), color: 'var(--red)' },
          { label: 'Avg Savings', val: fmt(avgIncome - avgExpenses), color: 'var(--accent)' },
          { label: 'Avg Savings Rate', val: `${Math.round(((avgIncome - avgExpenses) / avgIncome) * 100)}%`, color: 'var(--yellow)' },
        ].map(item => (
          <div key={item.label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '18px 22px' }}>
            <div style={{ fontSize: 10, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{item.label}</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 500, color: item.color }}>{item.val}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {card('Spending by Category', 'Breakdown of expense categories', <BarChart data={MOCK_BY_CATEGORY} />)}
        {card('Category Distribution', 'Share of total spending', <DonutChart data={MOCK_BY_CATEGORY} />)}
      </div>

      {card('6-Month Cash Flow Trend', 'Income vs expenses over time', <TrendChart data={MOCK_TREND} />)}
      {card('Monthly Summary', 'Detailed breakdown by month', <MonthlyTable data={MOCK_TREND} />)}
    </div>
  );
}
