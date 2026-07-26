import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw, X, Coffee, BookOpen, Sliders } from 'lucide-react';

export function FocusTimer({ onClose, onUpdateStudyTime }) {
  const [studyMinutes, setStudyMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(10);

  const [timeLeft, setTimeLeft] = useState(studyMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('study');

  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(mode === 'study' ? studyMinutes * 60 : breakMinutes * 60);
    }
  }, [studyMinutes, breakMinutes, mode, isRunning]);

  useEffect(() => {
    if (onUpdateStudyTime) {
      const hours = Math.floor(studyMinutes / 60);
      const mins = studyMinutes % 60;
      let formatted = "";
      if (hours > 0) formatted += `${hours}h `;
      if (mins > 0 || hours === 0) formatted += `${mins}m`;
      onUpdateStudyTime(formatted.trim());
    }
  }, [studyMinutes, onUpdateStudyTime]);

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (mode === 'study') {
        setMode('break');
        setTimeLeft(breakMinutes * 60);
      } else {
        setMode('study');
        setTimeLeft(studyMinutes * 60);
      }
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode, studyMinutes, breakMinutes]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'study' ? studyMinutes * 60 : breakMinutes * 60);
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0,
      bottom: 0,
      width: '100vw', 
      height: '100vh', 
      background: 'rgba(9, 13, 22, 0.88)', 
      backdropFilter: 'blur(16px)', 
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justify: 'center',
      padding: '1rem'
    }}>
      <div 
        className="glass-card" 
        style={{ 
          maxWidth: '480px', 
          width: '92%', 
          textAlign: 'center', 
          border: '1px solid #484f58', 
          padding: '2rem',
          margin: '0 auto',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)'
        }}
      >
        
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Timer size={24} style={{ color: '#c9d1d9' }} />
            <h3 style={{ fontSize: '1.3rem', color: '#f0f6fc', margin: 0 }}>Self-Adjustable Focus Timer</h3>
          </div>
          <button className="btn btn-secondary btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Mode Selector */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <button
            className={`btn ${mode === 'study' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ flex: 1 }}
            onClick={() => {
              setMode('study');
              setTimeLeft(studyMinutes * 60);
              setIsRunning(false);
            }}
          >
            <BookOpen size={16} /> Study Mode
          </button>
          <button
            className={`btn ${mode === 'break' ? 'btn-emerald' : 'btn-secondary'}`}
            style={{ flex: 1 }}
            onClick={() => {
              setMode('break');
              setTimeLeft(breakMinutes * 60);
              setIsRunning(false);
            }}
          >
            <Coffee size={16} /> Rest Break
          </button>
        </div>

        {/* Timer Digital Display */}
        <div style={{ 
          fontSize: '4.5rem', 
          fontWeight: '800', 
          fontFamily: 'var(--font-mono)', 
          color: '#f0f6fc',
          margin: '0.5rem 0'
        }}>
          {formatTime(timeLeft)}
        </div>

        {/* Self-Adjustment Sliders */}
        <div style={{ background: '#161b22', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid #30363d', margin: '1.25rem 0', textTransform: 'none', textAlign: 'left' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: '#c9d1d9', fontWeight: '700', marginBottom: '0.75rem' }}>
            <Sliders size={16} /> Adjust Duration:
          </div>

          {/* Study Duration Slider */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem', color: '#f0f6fc' }}>
              <span>Deep Study Duration:</span>
              <strong style={{ color: '#c9d1d9' }}>{studyMinutes} Minutes</strong>
            </div>
            <input 
              type="range" 
              min="5" 
              max="180" 
              step="5"
              value={studyMinutes} 
              onChange={(e) => {
                const mins = parseInt(e.target.value, 10);
                setStudyMinutes(mins);
              }}
            />
          </div>

          {/* Break Duration Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem', color: '#f0f6fc' }}>
              <span>Rest Break Duration:</span>
              <strong style={{ color: '#56d364' }}>{breakMinutes} Minutes</strong>
            </div>
            <input 
              type="range" 
              min="2" 
              max="60" 
              step="1"
              value={breakMinutes} 
              onChange={(e) => {
                const mins = parseInt(e.target.value, 10);
                setBreakMinutes(mins);
              }}
            />
          </div>

        </div>

        {/* Timer Controls */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '1.5rem' }}>
          <button 
            className="btn btn-secondary"
            style={{ padding: '0.75rem 2rem', fontSize: '1rem', color: '#fff' }}
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? <Pause size={20} /> : <Play size={20} />}
            <span>{isRunning ? 'Pause Timer' : 'Start Timer'}</span>
          </button>

          <button 
            className="btn btn-secondary"
            onClick={handleReset}
          >
            <RotateCcw size={18} /> Reset
          </button>
        </div>

      </div>
    </div>
  );
}
