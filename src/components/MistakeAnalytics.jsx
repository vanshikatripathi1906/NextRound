import React from 'react';
import { AlertOctagon, Bug, Clock, AlertTriangle, HardDrive } from 'lucide-react';

export function MistakeAnalytics({ nodes }) {
  // Aggregate error metrics dynamically from DSA topic nodes!
  const syntaxCount = nodes ? nodes.reduce((acc, n) => acc + (n.errors?.syntax || 0), 0) : 27;
  const tleCount = nodes ? nodes.reduce((acc, n) => acc + (n.errors?.tle || 0), 0) : 46;
  const edgeCount = nodes ? nodes.reduce((acc, n) => acc + (n.errors?.edgeCase || 0), 0) : 35;
  const memoryCount = nodes ? nodes.reduce((acc, n) => acc + (n.errors?.memory || 0), 0) : 13;

  const totalErrors = syntaxCount + tleCount + edgeCount + memoryCount || 1;

  const categories = [
    { title: 'Time Limit Exceeded (TLE)', count: tleCount, icon: Clock, color: '#f59e0b', desc: 'Optimize nested loops to O(N log N) using HashMaps or Binary Search.' },
    { title: 'Edge Cases (Null / Bounds / Empty)', count: edgeCount, icon: AlertTriangle, color: '#ef4444', desc: 'Always test single element arrays, empty strings, and Integer overflow.' },
    { title: 'Syntax & Logic Bugs', count: syntaxCount, icon: Bug, color: '#3b82f6', desc: 'Off-by-one errors in pointer manipulation and array indexing.' },
    { title: 'Memory Limit Exceeded (MLE)', count: memoryCount, icon: HardDrive, color: '#a855f7', desc: 'Excessive recursion depth; switch to iterative bottom-up DP table.' }
  ];

  return (
    <div className="glass-card mb-6" style={{ padding: '2.25rem' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <AlertOctagon size={24} style={{ color: '#ef4444' }} />
          <h2 style={{ fontSize: '1.35rem' }}>Mistakes & Error Analytics</h2>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Real-time mistake tracking synced directly from your DSA topic practice log.
        </p>
      </div>

      {/* Spacious Grid Layout for Categories */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {categories.map((cat) => {
          const Icon = cat.icon;
          const percentage = Math.round((cat.count / totalErrors) * 100);

          return (
            <div 
              key={cat.title}
              style={{ 
                background: '#161b22', 
                padding: '1.5rem', 
                borderRadius: 'var(--radius-md)', 
                border: '1px solid #30363d',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Icon size={18} style={{ color: cat.color }} />
                    <h4 style={{ fontSize: '1rem', color: '#f0f6fc', margin: 0 }}>{cat.title}</h4>
                  </div>
                  <span style={{ fontSize: '1.1rem', fontWeight: '800', color: cat.color }}>
                    {cat.count}
                  </span>
                </div>

                {/* Progress bar */}
                <div style={{ width: '100%', height: '8px', background: '#21262d', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.85rem' }}>
                  <div style={{ width: `${percentage}%`, height: '100%', background: cat.color, transition: 'width 0.4s ease' }} />
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.5', margin: 0 }}>
                  {cat.desc}
                </p>
              </div>

              <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #21262d', fontSize: '0.75rem', color: '#8b949e', display: 'flex', justifyContent: 'space-between' }}>
                <span>Share of total errors:</span>
                <strong style={{ color: '#f0f6fc' }}>{percentage}%</strong>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
