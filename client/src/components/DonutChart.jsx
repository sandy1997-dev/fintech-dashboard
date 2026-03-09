import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { fmt } from '../utils/format';

export default function DonutChart({ data = [] }) {
  const svgRef = useRef();

  useEffect(() => {
    if (!data.length) return;
    const size = 200;
    const r = size / 2;
    const inner = r * 0.55;

    d3.select(svgRef.current).selectAll('*').remove();
    const svg = d3.select(svgRef.current).attr('width', size).attr('height', size);
    const g = svg.append('g').attr('transform', `translate(${r},${r})`);

    const total = d3.sum(data, d => +d.total);
    const pie = d3.pie().value(d => d.total).sort(null).padAngle(0.03);
    const arc = d3.arc().innerRadius(inner).outerRadius(r - 4).cornerRadius(4);
    const arcHover = d3.arc().innerRadius(inner).outerRadius(r + 2).cornerRadius(4);

    const arcs = g.selectAll('path').data(pie(data)).enter().append('path')
      .attr('fill', d => d.data.color)
      .attr('d', arc)
      .style('cursor', 'pointer')
      .style('transition', 'opacity 0.2s')
      .on('mouseenter', function(event, d) {
        d3.select(this).attr('d', arcHover);
        label.text(fmt(d.data.total));
        sublabel.text(d.data.name);
      })
      .on('mouseleave', function() {
        d3.select(this).attr('d', arc);
        label.text(fmt(total));
        sublabel.text('total spent');
      });

    const label = g.append('text')
      .attr('text-anchor', 'middle').attr('dy', '0.1em')
      .attr('fill', 'var(--text)').attr('font-family', 'DM Mono, monospace')
      .attr('font-size', 14).attr('font-weight', 500)
      .text(fmt(total));

    const sublabel = g.append('text')
      .attr('text-anchor', 'middle').attr('dy', '1.5em')
      .attr('fill', 'var(--muted)').attr('font-family', 'DM Sans, sans-serif')
      .attr('font-size', 9).text('total spent');
  }, [data]);

  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
      <svg ref={svgRef} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6, minWidth: 140 }}>
        {data.slice(0, 6).map((d, i) => {
          const total = data.reduce((s, x) => s + +x.total, 0);
          const pct = ((d.total / total) * 100).toFixed(0);
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: d.color, flexShrink: 0 }} />
              <span style={{ flex: 1, fontSize: 11, color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{d.name}</span>
              <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text)' }}>{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
