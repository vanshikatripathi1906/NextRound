import React, { useState } from 'react';
import { GitCommit, Sparkles } from 'lucide-react';

export function ResumeEvolution() {
  const [selectedIdx, setSelectedIdx] = useState(2);

  const versions = [
    { label: 'v1.0 (Beginner)', date: 'Jan 2026', changes: ['Basic HTML/CSS projects', 'Solved 30 LeetCode Easy'] },
    { label: 'v2.0 (Intermediate)', date: 'April 2026', changes: ['Built React Apps', '120 LC Solved', 'Added System Design'] },
    { label: 'v3.0 (Interview Ready)', date: 'July 2026', changes: ['NextRound Project', '200+ LC Solved', '6-Axis Skill Radar'] }
  ];

  const current = versions[selectedIdx];

  return (
    <div className="glass-card mb-6" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
        <GitCommit size={24} style={{ color: 'var(--color-primary)' }} />
        <h2 style={{ fontSize: '1.35rem' }}>Resume Evolution & Version History</h2>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        {versions.map((v, idx) => (
          <button
            key={idx}
            className={`btn ${selectedIdx === idx ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSelectedIdx(idx)}
            style={{ fontSize: '0.85rem' }}
          >
            {v.label}
          </button>
        ))}
      </div>

      <div style={{ background: '#161b22', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #30363d' }}>
        <div style={{ fontSize: '0.9rem', color: '#c9d1d9', fontWeight: '700', marginBottom: '0.75rem' }}>
          Resume Highlights ({current.date}):
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {current.changes.map((c, i) => (
            <div key={i} style={{ fontSize: '0.85rem', color: '#f0f6fc', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#10b981', fontWeight: '800' }}>+</span>
              <span>{c}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
