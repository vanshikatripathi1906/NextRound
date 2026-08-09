import React, { useState, useEffect } from 'react';
import { Heart, Wind, RefreshCw } from 'lucide-react';

export function StressMeter() {
  const [stressLevel, setStressLevel] = useState(() => {
    const saved = localStorage.getItem('nextround_stress_level');
    return saved !== null ? parseInt(saved) : 45;
  });

  const [confidenceLevel, setConfidenceLevel] = useState(() => {
    const saved = localStorage.getItem('nextround_confidence_level');
    return saved !== null ? parseInt(saved) : 78;
  });

  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState('Inhale');
  const [breathTimer, setBreathTimer] = useState(4);

  const handleStressChange = (val) => {
    setStressLevel(val);
    localStorage.setItem('nextround_stress_level', val);
  };

  const handleConfidenceChange = (val) => {
    setConfidenceLevel(val);
    localStorage.setItem('nextround_confidence_level', val);
  };

  useEffect(() => {
    let timer = null;
    if (isBreathing) {
      timer = setInterval(() => {
        setBreathTimer(prev => {
          if (prev > 1) return prev - 1;
          
          setBreathPhase(current => {
            if (current === 'Inhale') return 'Hold';
            if (current === 'Hold') return 'Exhale';
            if (current === 'Exhale') return 'Pause';
            return 'Inhale';
          });
          return 4;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isBreathing]);

  const handleResetStress = () => {
    handleStressChange(20);
    handleConfidenceChange(92);
  };

  return (
    <div className="glass-card mb-6" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.5rem' }}>
        <Heart size={24} style={{ color: 'var(--color-primary)' }} />
        <h2 style={{ fontSize: '1.35rem' }}>Mental Peak Performance & Stress Reset</h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.75rem' }}>
        <div style={{ background: '#161b22', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #30363d', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.4rem' }}>
              <span style={{ color: '#c9d1d9', fontWeight: '600' }}>Current Stress Level:</span>
              <strong style={{ color: stressLevel > 60 ? '#ef4444' : '#10b981' }}>{stressLevel}%</strong>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={stressLevel} 
              onChange={(e) => handleStressChange(parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.4rem' }}>
              <span style={{ color: '#c9d1d9', fontWeight: '600' }}>Interview Confidence:</span>
              <strong style={{ color: '#3b82f6' }}>{confidenceLevel}%</strong>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={confidenceLevel} 
              onChange={(e) => handleConfidenceChange(parseInt(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <button 
            className="btn btn-secondary" 
            onClick={handleResetStress}
            style={{ width: '100%', padding: '0.65rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: '#fff' }}
          >
            <RefreshCw size={16} /> Quick Mind Reset
          </button>
        </div>

        <div style={{ background: '#161b22', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #30363d', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <Wind size={32} style={{ color: 'var(--color-primary)', marginBottom: '0.75rem' }} />
          <h3 style={{ fontSize: '1.15rem', color: '#f0f6fc', marginBottom: '0.35rem' }}>1-Minute Guided Box Breathing</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            Lower heart rate and eliminate interview anxiety before mock sessions.
          </p>

          {isBreathing ? (
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--color-primary)', fontFamily: 'var(--font-mono)' }}>
                {breathPhase} ({breathTimer}s)
              </div>
            </div>
          ) : null}

          <button 
            className="btn btn-secondary"
            onClick={() => setIsBreathing(!isBreathing)}
            style={{ padding: '0.65rem 1.75rem', color: '#fff' }}
          >
            {isBreathing ? 'Stop Session' : 'Start Breathing Reset'}
          </button>
        </div>
      </div>
    </div>
  );
}
