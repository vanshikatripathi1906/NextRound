import React, { useState } from 'react';
import { Compass, CheckCircle2, ArrowRight, Sparkles, Clock, TrendingUp } from 'lucide-react';
import confetti from 'canvas-confetti';

export function DecisionEngine({ decisionEngineData, onSolveRecommendation }) {
  const [completed, setCompleted] = useState(false);

  const handleActionClick = () => {
    setCompleted(true);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
    if (onSolveRecommendation) {
      onSolveRecommendation();
    }
  };

  return (
    <div className="glass-card mb-6" style={{ borderLeft: '4px solid var(--color-primary)', background: 'linear-gradient(135deg, rgba(18, 26, 44, 0.9) 0%, rgba(30, 41, 67, 0.7) 100%)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: 1 }}>
          <div style={{ 
            background: 'rgba(56, 189, 248, 0.15)', 
            padding: '0.75rem', 
            borderRadius: 'var(--radius-md)', 
            color: 'var(--color-primary)',
            border: '1px solid rgba(56, 189, 248, 0.3)'
          }}>
            <Compass size={28} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="badge badge-primary">
                <Sparkles size={12} /> AI Decision Engine
              </span>
              <span className="badge badge-amber">Priority: {decisionEngineData.priority}</span>
            </div>

            <h3 style={{ fontSize: '1.2rem', margin: '0.25rem 0' }}>
              {decisionEngineData.actionTitle}
            </h3>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', maxWidth: '700px' }}>
              <strong>Reasoning:</strong> {decisionEngineData.reason}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Clock size={14} style={{ color: 'var(--color-primary)' }} />
                Est. Time: <strong style={{ color: 'var(--text-main)' }}>{decisionEngineData.estimatedTime}</strong>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <TrendingUp size={14} style={{ color: 'var(--color-emerald)' }} />
                Readiness Gain: <strong style={{ color: 'var(--color-emerald)' }}>{decisionEngineData.expectedReadinessGain}</strong>
              </span>
            </div>
          </div>
        </div>

        <div>
          {completed ? (
            <div className="badge badge-emerald" style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem' }}>
              <CheckCircle2 size={18} /> Completed Today!
            </div>
          ) : (
            <button 
              className="btn btn-primary"
              onClick={handleActionClick}
            >
              <span>Practice Recommendation</span>
              <ArrowRight size={16} />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
