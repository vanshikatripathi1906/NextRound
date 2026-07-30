import React from 'react';
import { Activity, Clock } from 'lucide-react';

export function ConfidenceDecay({ nodes }) {
  const calculateDecayStatus = () => {
    return nodes.map(node => {
      const solved = node.questionsSolved || 0;
      const required = node.requiredQuestions || 100;
      const percent = Math.min(100, Math.round((solved / required) * 100));
      
      let confidence = Math.max(20, percent - 10);
      let status = 'Fresh';
      let statusColor = '#10b981';
      let actionRecommendation = 'Mastered. Maintain current pace.';

      if (percent < 60) {
        confidence = Math.max(15, percent - 25);
        status = 'High Decay Risk';
        statusColor = '#ef4444';
        actionRecommendation = 'High retention risk! Solve 5-10 practice problems to rebuild memory.';
      } else if (percent < 80) {
        confidence = Math.max(30, percent - 15);
        status = 'Moderate Decay';
        statusColor = '#f59e0b';
        actionRecommendation = 'Memory fading slightly. Review core patterns & edge cases.';
      }

      return {
        id: node.id,
        name: node.name,
        confidence,
        status,
        statusColor,
        actionRecommendation
      };
    });
  };

  const decayList = calculateDecayStatus();

  return (
    <div className="glass-card mb-6" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
        <Activity size={24} style={{ color: 'var(--color-primary)' }} />
        <h2 style={{ fontSize: '1.35rem' }}>Spaced Repetition & Retention Risk</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
        {decayList.map(item => (
          <div 
            key={item.id}
            style={{ 
              background: '#161b22', 
              padding: '1.35rem', 
              borderRadius: 'var(--radius-md)', 
              border: '1px solid #30363d',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <h4 style={{ fontSize: '1.05rem', color: '#f0f6fc', margin: 0 }}>{item.name}</h4>
                <span className="badge badge-dark" style={{ fontSize: '0.75rem', color: item.statusColor, border: `1px solid ${item.statusColor}` }}>
                  {item.status}
                </span>
              </div>

              <div style={{ width: '100%', height: '8px', background: '#21262d', borderRadius: '4px', overflow: 'hidden', margin: '0.75rem 0' }}>
                <div style={{ width: `${item.confidence}%`, height: '100%', background: item.statusColor, transition: 'width 0.4s ease' }} />
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4', marginTop: '0.5rem' }}>
                <Clock size={14} style={{ flexShrink: 0, marginTop: '0.1rem', color: item.statusColor }} />
                <span>{item.actionRecommendation}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
