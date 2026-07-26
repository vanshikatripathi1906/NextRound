import React from 'react';
import { TrendingDown, Clock, RefreshCw, AlertCircle } from 'lucide-react';

export function ConfidenceDecay({ decayTopics, onReviseTopic }) {
  return (
    <div className="netflix-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <TrendingDown size={22} style={{ color: 'var(--color-netflix-red)' }} />
            <h2 style={{ fontSize: '1.25rem' }}>Confidence Decay & Revision Intelligence</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Ebbinghaus forgetting curve tracking. Topics decay automatically without practice.
          </p>
        </div>
        <span className="badge badge-amber">
          <Clock size={14} /> SPACED REPETITION
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: 1 }}>
        {decayTopics.map((item) => {
          const dropAmount = item.initialConfidence - item.decayedConfidence;

          return (
            <div 
              key={item.topic} 
              style={{ 
                background: '#0e0e0e', 
                borderRadius: 'var(--radius-sm)', 
                padding: '1.1rem', 
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.05rem', color: '#fff' }}>{item.topic}</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Not revised in <strong style={{ color: 'var(--color-netflix-red)' }}>{item.daysWithoutPractice} days</strong>
                  </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '1.3rem', fontWeight: '900', color: 'var(--color-netflix-red)' }}>
                    {item.decayedConfidence}%
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-subtle)' }}>
                    Was: {item.initialConfidence}% (-{dropAmount}%)
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{ marginBottom: '0.75rem' }}>
                <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div 
                    style={{ 
                      width: `${item.decayedConfidence}%`, 
                      background: 'var(--color-netflix-red)', 
                      height: '100%',
                      transition: 'width 0.4s ease'
                    }} 
                  />
                </div>
              </div>

              {/* Intelligent Reason */}
              <div style={{ background: 'rgba(229, 9, 20, 0.08)', border: '1px solid rgba(229, 9, 20, 0.2)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', marginBottom: '0.75rem', fontSize: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-netflix-red)', fontWeight: '700', marginBottom: '0.15rem' }}>
                  <AlertCircle size={14} /> Recommended Action:
                </div>
                <p style={{ color: 'var(--text-muted)' }}>
                  {item.recommendation}
                </p>
              </div>

              <button 
                className="btn btn-netflix"
                style={{ width: '100%', fontSize: '0.8rem', padding: '0.45rem' }}
                onClick={() => onReviseTopic(item.topic)}
              >
                <RefreshCw size={14} /> Restore Confidence to 100%
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
