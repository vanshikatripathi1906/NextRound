import React, { useState, useEffect } from 'react';
import { HeartPulse, Compass } from 'lucide-react';
import confetti from 'canvas-confetti';

export function StressMeter() {
  const [stressLevel, setStressLevel] = useState(35);
  const [confidenceLevel, setConfidenceLevel] = useState(82);

  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState('Inhale (4s)');
  const [breathTimer, setBreathTimer] = useState(16);

  useEffect(() => {
    let interval = null;
    if (isBreathing && breathTimer > 0) {
      interval = setInterval(() => {
        setBreathTimer(prev => {
          const nextVal = prev - 1;
          const cycle = (16 - nextVal) % 16;
          if (cycle < 4) setBreathPhase('Inhale deeply (4s)...');
          else if (cycle < 8) setBreathPhase('Hold breath (4s)...');
          else if (cycle < 12) setBreathPhase('Exhale slowly (4s)...');
          else setBreathPhase('Hold empty (4s)...');
          return nextVal;
        });
      }, 1000);
    } else if (breathTimer === 0 && isBreathing) {
      setIsBreathing(false);
      setBreathTimer(16);
      setBreathPhase('Completed!');
      setStressLevel(prev => Math.max(15, prev - 15));
      confetti({ particleCount: 60, spread: 60 });
    }
    return () => clearInterval(interval);
  }, [isBreathing, breathTimer]);

  const handleStartBreathing = () => {
    setIsBreathing(true);
    setBreathTimer(16);
    setBreathPhase('Inhale deeply (4s)...');
  };

  const performanceIndex = Math.round((confidenceLevel * 0.6) - (stressLevel * 0.4) + 40);

  const getFlowZone = (index) => {
    if (index >= 75) return { label: '🔥 Peak Flow State', color: '#56d364', bg: 'rgba(86, 211, 100, 0.1)', desc: 'Optimal cognitive state. Ideal for solving LC Hard & System Design questions.' };
    if (index >= 50) return { label: '⚡ Focused Practice Zone', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)', desc: 'Good focus & momentum. Practice medium topic questions & mock rounds.' };
    if (index >= 30) return { label: '🌊 Balanced Recovery Mode', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', desc: 'Slight fatigue. Recommended: Review notes, flashcards, or take a 15-min walk.' };
    return { label: '⚠️ Overwhelm Alert', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', desc: 'High stress detected. Pause study session and do 1-min Box Breathing below.' };
  };

  const zone = getFlowZone(performanceIndex);

  return (
    <div className="glass-card mb-6" style={{ padding: '2.25rem' }}>
      
      {/* Title & Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <HeartPulse size={24} style={{ color: zone.color }} />
          <h2 style={{ fontSize: '1.35rem' }}>Mental Peak Performance & Stress Center</h2>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Monitor cognitive fatigue, calculate flow state readiness, and practice 1-minute box breathing for interview success.
        </p>
      </div>

      {/* Grid: 2 Sliders */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        
        {/* Stress & Fatigue Level Slider */}
        <div style={{ background: '#161b22', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #30363d' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>Cognitive Stress Index</span>
            <span style={{ fontSize: '1.3rem', fontWeight: '800', color: stressLevel > 60 ? '#ef4444' : '#f59e0b' }}>
              {stressLevel}%
            </span>
          </div>

          <input 
            type="range" 
            min="0" 
            max="100" 
            value={stressLevel} 
            onChange={(e) => setStressLevel(parseInt(e.target.value))}
            style={{ width: '100%', accentColor: stressLevel > 60 ? '#ef4444' : '#f59e0b', cursor: 'pointer', height: '6px' }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#8b949e', marginTop: '0.4rem' }}>
            <span>Relaxed (0%)</span>
            <span>Moderate (50%)</span>
            <span>High Anxiety (100%)</span>
          </div>
        </div>

        {/* Self-Confidence Slider */}
        <div style={{ background: '#161b22', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #30363d' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>Interview Self-Confidence</span>
            <span style={{ fontSize: '1.3rem', fontWeight: '800', color: '#56d364' }}>
              {confidenceLevel}%
            </span>
          </div>

          <input 
            type="range" 
            min="20" 
            max="100" 
            value={confidenceLevel} 
            onChange={(e) => setConfidenceLevel(parseInt(e.target.value))}
            style={{ width: '100%', accentColor: '#56d364', cursor: 'pointer', height: '6px' }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#8b949e', marginTop: '0.4rem' }}>
            <span>Hesitant (20%)</span>
            <span>Balanced (60%)</span>
            <span>Unstoppable (100%)</span>
          </div>
        </div>

      </div>

      {/* Peak Flow Zone Dashboard Banner (Real-Time Sync Badge Removed as Requested) */}
      <div style={{ background: zone.bg, padding: '1.5rem 1.75rem', borderRadius: 'var(--radius-md)', border: `1px solid ${zone.color}`, marginBottom: '2rem' }}>
        <div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Calculated Peak Readiness Score</div>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', color: zone.color, marginTop: '0.2rem' }}>
            {zone.label} ({performanceIndex}% Score)
          </div>
          <p style={{ color: '#f0f6fc', fontSize: '0.9rem', marginTop: '0.35rem', marginBottom: 0, lineHeight: '1.5' }}>
            {zone.desc}
          </p>
        </div>
      </div>

      {/* 1-Minute Guided Box Breathing Widget */}
      <div style={{ background: '#161b22', padding: '1.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #30363d', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Compass size={20} style={{ color: '#3b82f6' }} />
          <h4 style={{ fontSize: '1.1rem', color: '#f0f6fc', margin: 0 }}>
            1-Minute Box Breathing Reset
          </h4>
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0 }}>
          4s Inhale → 4s Hold → 4s Exhale → 4s Hold. Lowers cognitive stress level by 15% upon completion!
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', background: '#0d1117', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid #30363d', marginTop: '0.5rem' }}>
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: '800', color: isBreathing ? '#3b82f6' : '#56d364' }}>
              {isBreathing ? breathPhase : 'Ready to Start'}
            </div>
            {isBreathing && (
              <div style={{ fontSize: '0.8rem', color: '#8b949e', marginTop: '0.2rem' }}>
                Time Remaining: <strong>{breathTimer}s</strong>
              </div>
            )}
          </div>

          <button 
            className={isBreathing ? 'btn btn-secondary' : 'btn btn-primary'}
            onClick={handleStartBreathing}
            disabled={isBreathing}
            style={{ padding: '0.65rem 1.5rem', fontSize: '0.9rem' }}
          >
            {isBreathing ? 'Breathing in Progress...' : 'Start 1-Min Box Breathing'}
          </button>
        </div>
      </div>

    </div>
  );
}
