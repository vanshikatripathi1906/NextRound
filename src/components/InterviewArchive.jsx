import React, { useState } from 'react';
import { Film, Play, Pause, Clock, Star, Calendar, Volume2, FileText, ChevronRight, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export function InterviewArchive({ replayList }) {
  const [selectedReplayId, setSelectedReplayId] = useState(replayList[0]?.id || 1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeMomentIndex, setActiveMomentIndex] = useState(0);

  const selectedReplay = replayList.find(r => r.id === selectedReplayId) || replayList[0];

  const handlePlayToggle = () => {
    const nextPlayState = !isPlaying;
    setIsPlaying(nextPlayState);
    if (nextPlayState) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  return (
    <div className="glass-card mb-6" style={{ padding: '2.25rem' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <Film size={24} style={{ color: 'var(--color-primary)' }} />
          <h2 style={{ fontSize: '1.35rem' }}>Interview Archive & Audio Replays</h2>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Review past mock & real technical interview round logs, feedback, and key timestamped moments.
        </p>
      </div>

      {/* Main Grid: Replay Selector List + Active Audio Replay Player */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem' }}>
        
        {/* Left Column: Replay List Selectors */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <h4 style={{ fontSize: '1rem', color: '#f0f6fc', margin: 0 }}>Select Interview Session:</h4>

          {replayList.map((replay) => {
            const isSelected = replay.id === selectedReplayId;

            return (
              <div 
                key={replay.id}
                onClick={() => { setSelectedReplayId(replay.id); setIsPlaying(false); }}
                style={{ 
                  background: isSelected ? '#21262d' : '#161b22', 
                  padding: '1.25rem', 
                  borderRadius: 'var(--radius-md)', 
                  border: `1px solid ${isSelected ? '#8b949e' : '#30363d'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 4px 16px rgba(0,0,0,0.4)' : 'none'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                  <span className="badge badge-primary" style={{ fontSize: '0.7rem' }}>
                    {replay.company}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#f59e0b', fontSize: '0.85rem', fontWeight: '700' }}>
                    <Star size={13} fill="#f59e0b" /> {replay.rating}
                  </div>
                </div>

                <h4 style={{ fontSize: '1.05rem', color: isSelected ? '#f0f6fc' : 'var(--text-main)', margin: '0.35rem 0' }}>
                  {replay.title}
                </h4>

                <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: '#8b949e', marginTop: '0.5rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Calendar size={13} /> {replay.date}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={13} /> {replay.duration}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Audio & Key Moments Player */}
        {selectedReplay && (
          <div style={{ background: '#161b22', padding: '1.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #30363d', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            
            <div>
              {/* Active Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #30363d', paddingBottom: '1rem' }}>
                <div>
                  <span className="badge badge-emerald" style={{ fontSize: '0.75rem', marginBottom: '0.25rem' }}>
                    {selectedReplay.company} Archive
                  </span>
                  <h3 style={{ fontSize: '1.3rem', color: '#f0f6fc', margin: 0 }}>
                    {selectedReplay.title}
                  </h3>
                </div>

                <button 
                  className={isPlaying ? 'btn btn-emerald' : 'btn btn-secondary'}
                  onClick={handlePlayToggle}
                  style={{ padding: '0.65rem 1.1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} fill="#c9d1d9" />}
                  <span>{isPlaying ? 'Pause Replay' : 'Play Audio Session'}</span>
                </button>
              </div>

              {/* Status Audio Visualizer bar */}
              <div style={{ background: '#0d1117', padding: '1rem 1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid #30363d', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Volume2 size={20} style={{ color: isPlaying ? '#56d364' : '#8b949e' }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.8rem', color: isPlaying ? '#56d364' : '#8b949e', fontWeight: '700', marginBottom: '0.35rem' }}>
                    {isPlaying ? '▶ Audio Playing... Replaying timestamped candidate responses' : '⏸ Audio Paused (Click Play)'}
                  </div>
                  <div style={{ width: '100%', height: '6px', background: '#21262d', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: isPlaying ? '65%' : '20%', height: '100%', background: '#56d364', transition: 'width 0.5s ease' }} />
                  </div>
                </div>
              </div>

              {/* Timestamped Key Moments */}
              <h4 style={{ fontSize: '0.95rem', color: '#f0f6fc', marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <FileText size={16} style={{ color: 'var(--color-primary)' }} />
                Key Timestamped Interview Moments:
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {selectedReplay.keyMoments.map((moment, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setActiveMomentIndex(idx)}
                    style={{ 
                      background: activeMomentIndex === idx ? '#21262d' : '#0d1117', 
                      padding: '0.85rem 1rem', 
                      borderRadius: 'var(--radius-sm)', 
                      border: `1px solid ${activeMomentIndex === idx ? '#8b949e' : '#30363d'}`,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem'
                    }}
                  >
                    <span className="badge badge-dark" style={{ fontSize: '0.75rem', fontWeight: '800', flexShrink: 0 }}>
                      {moment.time}
                    </span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
                      {moment.note}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
