import React, { useState } from 'react';
import { Film, HelpCircle, CheckCircle, AlertTriangle, BookOpen, Play } from 'lucide-react';

export function InterviewReplay({ replayList }) {
  const [activeReplayId, setActiveReplayId] = useState(replayList[0]?.id);

  const selectedReplay = replayList.find(r => r.id === activeReplayId) || replayList[0];

  return (
    <div className="netflix-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Film size={22} style={{ color: 'var(--color-netflix-red)' }} />
            <h2 style={{ fontSize: '1.25rem' }}>Interview Replay Archives</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Replay past interview recordings: Question → Your Answer → Optimal Model Answer → Mistake → Learning.
          </p>
        </div>

        {/* Company Replay Buttons */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {replayList.map(r => (
            <button
              key={r.id}
              className={`btn ${activeReplayId === r.id ? 'btn-netflix' : 'btn-secondary'}`}
              onClick={() => setActiveReplayId(r.id)}
              style={{ fontSize: '0.85rem', padding: '0.4rem 0.85rem' }}
            >
              <Play size={14} fill={activeReplayId === r.id ? "#fff" : "transparent"} />
              <span>{r.company} ({r.role})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Interview Details */}
      {selectedReplay && (
        <div style={{ background: '#0e0e0e', padding: '1.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '0.75rem' }}>
            <div>
              <h3 style={{ fontSize: '1.3rem', color: 'var(--color-netflix-red)' }}>
                {selectedReplay.company} - {selectedReplay.role}
              </h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Interview Date: {selectedReplay.date}
              </span>
            </div>
            <span className="badge badge-emerald" style={{ fontSize: '0.85rem' }}>
              {selectedReplay.status}
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {selectedReplay.questions.map((q, idx) => (
              <div 
                key={idx} 
                style={{ 
                  background: 'rgba(255, 255, 255, 0.02)', 
                  padding: '1.25rem', 
                  borderRadius: 'var(--radius-sm)', 
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                <h4 style={{ fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.85rem', color: '#fff' }}>
                  <HelpCircle size={18} style={{ color: 'var(--color-netflix-red)' }} />
                  Q{idx + 1}: {q.question}
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
                  
                  <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid #3b82f6' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600' }}>Your Answer:</div>
                    <div style={{ fontSize: '0.85rem', marginTop: '0.2rem' }}>{q.yourAnswer}</div>
                  </div>

                  <div style={{ background: 'rgba(43, 183, 65, 0.08)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid #2bb741' }}>
                    <div style={{ fontSize: '0.75rem', color: '#4ade80', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <CheckCircle size={12} /> Optimal Model Answer:
                    </div>
                    <div style={{ fontSize: '0.85rem', marginTop: '0.2rem' }}>{q.correctAnswer}</div>
                  </div>

                  <div style={{ background: 'rgba(229, 9, 20, 0.08)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid #E50914' }}>
                    <div style={{ fontSize: '0.75rem', color: '#ff5252', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <AlertTriangle size={12} /> Oversight / Mistake:
                    </div>
                    <div style={{ fontSize: '0.85rem', marginTop: '0.2rem' }}>{q.mistake}</div>
                  </div>

                  <div style={{ background: 'rgba(156, 39, 176, 0.08)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', borderLeft: '3px solid #9c27b0' }}>
                    <div style={{ fontSize: '0.75rem', color: '#ce93d8', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <BookOpen size={12} /> Takeaway Learning:
                    </div>
                    <div style={{ fontSize: '0.85rem', marginTop: '0.2rem' }}>{q.learning}</div>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
}
