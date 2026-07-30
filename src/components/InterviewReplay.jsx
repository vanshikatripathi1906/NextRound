import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Volume2, Star } from 'lucide-react';
import { initialInterviewReplays } from '../data/initialData';

export function InterviewReplay() {
  const [selectedId, setSelectedId] = useState('1');
  const [isPlaying, setIsPlaying] = useState(false);

  const selectedReplay = initialInterviewReplays.find(r => r.id === selectedId) || initialInterviewReplays[0];

  return (
    <div className="glass-card mb-6" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
        <Volume2 size={24} style={{ color: 'var(--color-primary)' }} />
        <h2 style={{ fontSize: '1.35rem' }}>Interview Replay Center</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {initialInterviewReplays.map(r => (
            <div 
              key={r.id}
              onClick={() => {
                setSelectedId(r.id);
                setIsPlaying(false);
              }}
              style={{ 
                background: r.id === selectedId ? '#0d1117' : '#161b22', 
                border: `1px solid ${r.id === selectedId ? '#484f58' : '#30363d'}`, 
                padding: '1.25rem', 
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '1.05rem', color: '#f0f6fc', margin: 0 }}>{r.company}</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#f59e0b', fontSize: '0.85rem', fontWeight: '800' }}>
                  <Star size={14} fill="#f59e0b" /> {r.rating}
                </div>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                {r.role} • {r.date}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#161b22', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #30363d' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#f0f6fc', margin: 0 }}>{selectedReplay.company} Mock Round</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Duration: {selectedReplay.duration}</span>
            </div>

            <button 
              className="btn btn-secondary"
              onClick={() => setIsPlaying(!isPlaying)}
              style={{ padding: '0.65rem 1.25rem', color: '#fff' }}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              <span>{isPlaying ? 'Pause' : 'Play'}</span>
            </button>
          </div>

          <div style={{ background: '#0d1117', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid #30363d' }}>
            <div style={{ fontSize: '0.85rem', color: '#c9d1d9', fontWeight: '700', marginBottom: '0.35rem' }}>Key Question Asked:</div>
            <p style={{ color: '#f0f6fc', fontSize: '0.9rem', margin: 0 }}>"{selectedReplay.question}"</p>
          </div>
        </div>
      </div>
    </div>
  );
}
