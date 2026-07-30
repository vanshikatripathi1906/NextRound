import React, { useState } from 'react';
import { Volume2, Play, Pause, RotateCcw, Clock, Star, FileText } from 'lucide-react';

export function InterviewArchive() {
  const [selectedArchiveId, setSelectedArchiveId] = useState('google-mock');
  const [isPlaying, setIsPlaying] = useState(false);

  const archives = [
    {
      id: 'google-mock',
      company: 'Google',
      role: 'Software Engineer (L3)',
      date: 'July 2026',
      duration: '45 mins',
      rating: 4.8,
      keyMoments: [
        { time: '04:12', title: 'Graph BFS Cycle Detection Strategy' },
        { time: '18:45', title: 'Space Complexity Trade-off Explanation' },
        { time: '32:10', title: 'System Design: Distributed Cache Consistency' }
      ]
    },
    {
      id: 'amazon-mock',
      company: 'Amazon',
      role: 'SDE 1',
      date: 'June 2026',
      duration: '50 mins',
      rating: 4.6,
      keyMoments: [
        { time: '06:30', title: 'Leadership Principle: Customer Obsession Story' },
        { time: '22:15', title: 'LRU Cache Double Linked List Implementation' },
        { time: '41:00', title: 'Edge Case Handling: Overflow & Empty Input' }
      ]
    }
  ];

  const current = archives.find(a => a.id === selectedArchiveId) || archives[0];

  return (
    <div className="glass-card mb-6" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
        <Volume2 size={24} style={{ color: 'var(--color-primary)' }} />
        <h2 style={{ fontSize: '1.35rem' }}>Interview Replay & Audio Archive</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {archives.map(a => (
            <div 
              key={a.id}
              onClick={() => {
                setSelectedArchiveId(a.id);
                setIsPlaying(false);
              }}
              style={{ 
                background: a.id === selectedArchiveId ? '#0d1117' : '#161b22', 
                border: `1px solid ${a.id === selectedArchiveId ? '#484f58' : '#30363d'}`, 
                padding: '1.25rem', 
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '1.1rem', color: '#f0f6fc', margin: 0 }}>{a.company}</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#f59e0b', fontSize: '0.85rem', fontWeight: '800' }}>
                  <Star size={14} fill="#f59e0b" /> {a.rating}
                </div>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                {a.role} • {a.duration}
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: '#161b22', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #30363d' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: '#f0f6fc', margin: 0 }}>{current.company} Mock Session</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Recorded in {current.date}</span>
            </div>

            <button 
              className="btn btn-secondary"
              onClick={() => setIsPlaying(!isPlaying)}
              style={{ padding: '0.65rem 1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff' }}
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              <span>{isPlaying ? 'Pause Replay' : 'Play Session'}</span>
            </button>
          </div>

          <div style={{ background: '#0d1117', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid #30363d', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#c9d1d9', marginBottom: '0.5rem' }}>
              <span>Audio Timeline</span>
              <span>{isPlaying ? 'Playing...' : '00:00 / ' + current.duration}</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: '#21262d', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: isPlaying ? '45%' : '0%', height: '100%', background: 'var(--color-primary)', transition: 'width 0.3s ease' }} />
            </div>
          </div>

          <h4 style={{ fontSize: '0.9rem', color: '#f0f6fc', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <FileText size={16} style={{ color: '#c9d1d9' }} />
            Timestamped Key Moments:
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {current.keyMoments.map((km, idx) => (
              <div key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-main)', background: '#0d1117', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid #30363d', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: 'var(--color-primary)', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>{km.time}</span>
                <span>{km.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
