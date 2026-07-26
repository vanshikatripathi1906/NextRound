import React, { useState } from 'react';
import { AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export function ConfidenceDecayBanner({ onPracticeToday }) {
  const [decayTopics, setDecayTopics] = useState([
    { topic: 'Graphs (BFS/DFS)', confidence: 63, daysAgo: 14 },
    { topic: 'Dynamic Programming', confidence: 58, daysAgo: 17 }
  ]);

  const [revised, setRevised] = useState(false);

  const handleRevise = () => {
    setRevised(true);
    setDecayTopics(prev => prev.map(t => ({ ...t, confidence: 95, daysAgo: 0 })));
    confetti({ particleCount: 70, spread: 60 });
    if (onPracticeToday) {
      onPracticeToday();
    }
  };

  return (
    <div className="glass-card mb-6" style={{ padding: '1.75rem', border: '1px solid rgba(245, 158, 11, 0.3)', background: 'rgba(245, 158, 11, 0.05)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <AlertCircle size={24} style={{ color: '#f59e0b', flexShrink: 0 }} />
          <div>
            <h3 style={{ fontSize: '1.15rem', color: '#f0f6fc', margin: 0 }}>
              Confidence Decay Alert & Spaced Repetition Reminder
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
              Ebbinghaus forgetting curve tracking: <strong>Graphs (BFS/DFS)</strong> decayed to 63% (Not practiced in 14 days).
            </p>
          </div>
        </div>

        <button 
          className={revised ? 'btn btn-emerald' : 'btn btn-primary'}
          onClick={handleRevise}
          style={{ padding: '0.6rem 1.2rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          {revised ? <CheckCircle2 size={16} /> : <RefreshCw size={16} />}
          <span>{revised ? 'Confidence Restored to 95%!' : 'Practice Today (Restore Confidence)'}</span>
        </button>

      </div>
    </div>
  );
}
