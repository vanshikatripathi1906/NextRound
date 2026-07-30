import React from 'react';
import { Bug, AlertTriangle, Zap, HardDrive } from 'lucide-react';

export function MistakeAnalytics({ nodes = [] }) {
  const totals = nodes.reduce((acc, curr) => {
    const errs = curr.errors || {};
    acc.syntax += errs.syntax || 0;
    acc.tle += errs.tle || 0;
    acc.edge += errs.edgeCase || 0;
    acc.memory += errs.memory || 0;
    return acc;
  }, { syntax: 0, tle: 0, edge: 0, memory: 0 });

  const totalFailures = totals.syntax + totals.tle + totals.edge + totals.memory || 1;

  const categories = [
    { title: 'Edge Cases Failed', count: totals.edge, percent: Math.round((totals.edge / totalFailures) * 100), color: '#ef4444', icon: AlertTriangle, tip: 'Edge Cases & Empty Inputs: Focus on testing empty arrays, single elements, zero, and boundary constraints.' },
    { title: 'Time Limit Exceeded (TLE)', count: totals.tle, percent: Math.round((totals.tle / totalFailures) * 100), color: '#f59e0b', icon: Zap, tip: 'Algorithmic Complexity: Avoid nested loops (O(N^2)). Refactor using HashMap lookups or Two Pointers.' },
    { title: 'Syntax & Logic Bugs', count: totals.syntax, percent: Math.round((totals.syntax / totalFailures) * 100), color: '#3b82f6', icon: Bug, tip: 'Logic Verification: Dry-run variable state line-by-line before writing full code.' },
    { title: 'Memory Limit Exceeded (MLE)', count: totals.memory, percent: Math.round((totals.memory / totalFailures) * 100), color: '#10b981', icon: HardDrive, tip: 'Space Complexity: Optimize auxiliary data structure usage and recursive call stack depth.' }
  ];

  return (
    <div className="glass-card mb-6" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
        <Bug size={24} style={{ color: 'var(--color-primary)' }} />
        <h2 style={{ fontSize: '1.35rem' }}>Error Pattern & Mistake Breakdown</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div key={idx} style={{ background: '#161b22', padding: '1.35rem', borderRadius: 'var(--radius-md)', border: '1px solid #30363d' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Icon size={18} style={{ color: cat.color }} />
                  <h4 style={{ fontSize: '0.95rem', color: '#f0f6fc', margin: 0 }}>{cat.title}</h4>
                </div>
                <span style={{ fontSize: '1.1rem', fontWeight: '800', color: cat.color }}>{cat.count}</span>
              </div>

              <div style={{ width: '100%', height: '6px', background: '#21262d', borderRadius: '3px', overflow: 'hidden', marginBottom: '0.85rem' }}>
                <div style={{ width: `${cat.percent}%`, height: '100%', background: cat.color, transition: 'width 0.4s ease' }} />
              </div>

              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4', margin: 0 }}>
                💡 {cat.tip}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
