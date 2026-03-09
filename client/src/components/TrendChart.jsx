import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function TrendChart({ data = [] }) {
  const svgRef = useRef();
  const containerRef = useRef();

  useEffect(() => {
    if (!data.length) return;
    const container = containerRef.current;
    const W = container.clientWidth;
    const H = 220;
    const margin = { top: 16, right: 16, bottom: 32, left: 52 };
    const width = W - margin.left - margin.right;
    const height = H - margin.top - margin.bottom;

    d3.select(svgRef.current).selectAll('*').remove();
    const svg = d3.select(svgRef.current)
      .attr('width', W).attr('height', H);
    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // Defs
    const defs = svg.append('defs');
    ['income', 'expense'].forEach((key, i) => {
      const colors = ['#34d399', '#f87171'];
      const grad = defs.append('linearGradient').attr('id', `grad-${key}`).attr('x1', 0).attr('y1', 0).attr('x2', 0).attr('y2', 1);
      grad.append('stop').attr('offset', '0%').attr('stop-color', colors[i]).attr('stop-opacity', 0.25);
      grad.append('stop').attr('offset', '100%').attr('stop-color', colors[i]).attr('stop-opacity', 0);
    });

    const x = d3.scaleBand().domain(data.map(d => d.label)).range([0, width]).padding(0.2);
    const maxVal = d3.max(data, d => Math.max(d.income, d.expenses)) * 1.1;
    const y = d3.scaleLinear().domain([0, maxVal]).range([height, 0]);

    // Grid
    g.append('g').call(
      d3.axisLeft(y).ticks(4).tickFormat(d => `$${d3.format('.0s')(d)}`).tickSize(-width)
    ).call(g => {
      g.selectAll('line').attr('stroke', '#1e2330').attr('stroke-dasharray', '2,4');
      g.selectAll('text').attr('fill', '#6b7280').attr('font-size', 10).attr('font-family', 'DM Mono, monospace');
      g.select('.domain').remove();
    });

    // X axis
    g.append('g').attr('transform', `translate(0,${height})`).call(
      d3.axisBottom(x).tickSize(0)
    ).call(g => {
      g.selectAll('text').attr('fill', '#6b7280').attr('font-size', 10).attr('dy', 16);
      g.select('.domain').attr('stroke', '#1e2330');
    });

    const lineGen = (key) => d3.line().x(d => x(d.label) + x.bandwidth() / 2).y(d => y(d[key])).curve(d3.curveCatmullRom.alpha(0.5));
    const areaGen = (key) => d3.area().x(d => x(d.label) + x.bandwidth() / 2).y0(height).y1(d => y(d[key])).curve(d3.curveCatmullRom.alpha(0.5));

    // Income area & line
    g.append('path').datum(data).attr('fill', 'url(#grad-income)').attr('d', areaGen('income'));
    g.append('path').datum(data).attr('fill', 'none').attr('stroke', '#34d399').attr('stroke-width', 2).attr('d', lineGen('income'));

    // Expense area & line
    g.append('path').datum(data).attr('fill', 'url(#grad-expense)').attr('d', areaGen('expenses'));
    g.append('path').datum(data).attr('fill', 'none').attr('stroke', '#f87171').attr('stroke-width', 2).attr('d', lineGen('expenses'));

    // Dots
    ['income', 'expenses'].forEach((key, i) => {
      const colors = ['#34d399', '#f87171'];
      g.selectAll(`.dot-${key}`).data(data).enter().append('circle')
        .attr('cx', d => x(d.label) + x.bandwidth() / 2)
        .attr('cy', d => y(d[key]))
        .attr('r', 3.5).attr('fill', colors[i]).attr('stroke', 'var(--surface)').attr('stroke-width', 2);
    });
  }, [data]);

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      <svg ref={svgRef} style={{ display: 'block', width: '100%' }} />
      <div style={{ display: 'flex', gap: 20, marginTop: 12 }}>
        {[['#34d399', 'Income'], ['#f87171', 'Expenses']].map(([c, l]) => (
          <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 24, height: 2, background: c, borderRadius: 1 }} />
            <span style={{ fontSize: 11, color: 'var(--muted)' }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
