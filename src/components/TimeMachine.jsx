import React, { useState } from 'react';
import { History, Sparkles, TrendingUp } from 'lucide-react';
import { timeMachineSnapshots } from '../data/initialData';

export function TimeMachine() {
  const months = ['Jan', 'March', 'May', 'July'];
  const [selectedMonthIdx, setSelectedMonthIdx] = useState(2); // May

  const currentMonth = months[selectedMonthIdx];
  const snapshot = timeMachineSnapshots[currentMonth];

  return (
    <div className="netflix-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <History size={22} style={{ color: 'var(--color-netflix-red)' }} />
            <h2 style={{ fontSize: '1.25rem' }}>Preparation Time Machine</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Scrub months of preparation and watch readiness stats scrub back and forth!
          </p>
        </div>
        <span className="badge badge-netflix">
          <Sparkles size={14} /> {currentMonth} 2026
        </span>
      </div>

      <div style={{ background: '#0e0e0e', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255, 255, 255, 0.08)', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          {months.map((m, idx) => (
            <span 
              key={m} 
              onClick={() => setSelectedMonthIdx(idx)}
              style={{ 
                cursor: 'pointer',
                color: idx === selectedMonthIdx ? 'var(--color-netflix-red)' : 'var(--text-subtle)',
                fontWeight: idx === selectedMonthIdx ? 'bold' : 'normal'
              }}
            >
              {m}
            </span>
          ))}
        </div>

        <input 
          type="range" 
          min="0" 
          max={months.length - 1} 
          step="1"
          value={selectedMonthIdx}
          onChange={(e) => setSelectedMonthIdx(parseInt(e.target.value, 10))}
        />
      </div>

      <div className="equal-height-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}>
        
        <div style={{ background: 'rgba(229, 9, 20, 0.08)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(229, 9, 20, 0.25)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Snapshot Readiness</div>
          <div className="text-gradient-red" style={{ fontSize: '1.8rem', fontWeight: '900', marginTop: '0.2rem' }}>
            {snapshot.readiness}%
          </div>
        </div>

        <div style={{ background: 'rgba(43, 183, 65, 0.08)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(43, 183, 65, 0.25)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Questions Solved</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#4ade80', marginTop: '0.2rem' }}>
            {snapshot.questions}
          </div>
        </div>

        <div style={{ background: 'rgba(255, 152, 0, 0.08)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255, 152, 0, 0.25)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Graph Mastery</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#ffb74d', marginTop: '0.2rem' }}>
            {snapshot.graphMastery}%
          </div>
        </div>

        <div style={{ background: 'rgba(229, 9, 20, 0.08)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(229, 9, 20, 0.25)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Active Streak</div>
          <div style={{ fontSize: '1.8rem', fontWeight: '900', color: '#ff5252', marginTop: '0.2rem' }}>
            🔥 {snapshot.streak} Days
          </div>
        </div>

      </div>

      <div style={{ marginTop: '1rem', background: 'rgba(255, 255, 255, 0.03)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255, 255, 255, 0.05)', fontSize: '0.875rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <TrendingUp size={18} style={{ color: 'var(--color-netflix-red)' }} />
        <span>{snapshot.message}</span>
      </div>
    </div>
  );
}
