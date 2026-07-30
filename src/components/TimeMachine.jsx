import React, { useState } from 'react';
import { History } from 'lucide-react';

export function TimeMachine() {
  const [selectedMonthIdx, setSelectedMonthIdx] = useState(2);

  const history = [
    { month: 'March 2026', solved: 45, readiness: '32%' },
    { month: 'May 2026', solved: 110, readiness: '58%' },
    { month: 'July 2026', solved: 200, readiness: '81%' }
  ];

  const current = history[selectedMonthIdx];

  return (
    <div className="glass-card mb-6" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
        <History size={24} style={{ color: 'var(--color-primary)' }} />
        <h2 style={{ fontSize: '1.35rem' }}>Preparation Growth History</h2>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
        {history.map((h, idx) => (
          <button
            key={idx}
            className={`btn ${selectedMonthIdx === idx ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSelectedMonthIdx(idx)}
            style={{ fontSize: '0.85rem' }}
          >
            {h.month}
          </button>
        ))}
      </div>

      <div style={{ background: '#161b22', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #30363d', display: 'flex', gap: '2rem' }}>
        <div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Questions Solved</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#f0f6fc' }}>{current.solved}</div>
        </div>

        <div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Interview Readiness</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#10b981' }}>{current.readiness}</div>
        </div>
      </div>
    </div>
  );
}
