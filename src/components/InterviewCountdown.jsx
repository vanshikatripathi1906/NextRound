import React, { useState } from 'react';
import { Clock, Calendar, Building2, Sparkles, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

const MOTIVATIONAL_QUOTES = [
  "The expert in anything was once a beginner. Keep grinding LeetCode!",
  "Consistency is what transforms average effort into extraordinary results.",
  "Your only limit is your willingness to try. Debug one problem at a time.",
  "Great things in coding are never done by one quick attempt, but by daily discipline.",
  "Believe you can handle the technical round and you're halfway there!"
];

export function InterviewCountdown() {
  const [targetCompany, setTargetCompany] = useState(() => {
    return localStorage.getItem('nextround_targetCompany') || 'Google';
  });

  const [targetDateStr, setTargetDateStr] = useState(() => {
    return localStorage.getItem('nextround_targetDate') || '2026-08-15';
  });

  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [tempCompany, setTempCompany] = useState(targetCompany);
  const [tempDate, setTempDate] = useState(targetDateStr);

  const calculateDaysRemaining = () => {
    const target = new Date(targetDateStr).getTime();
    const now = new Date().getTime();
    const diff = target - now;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return Math.max(0, days);
  };

  const daysLeft = calculateDaysRemaining();
  const totalPrepWindow = 30;
  const prepProgress = Math.min(100, Math.max(10, Math.round(((totalPrepWindow - daysLeft) / totalPrepWindow) * 100)));

  const handleSaveCountdown = (e) => {
    e.preventDefault();
    setTargetCompany(tempCompany);
    setTargetDateStr(tempDate);
    localStorage.setItem('nextround_targetCompany', tempCompany);
    localStorage.setItem('nextround_targetDate', tempDate);
    setIsEditing(false);
    confetti({ particleCount: 60, spread: 60 });
  };

  const handleNextQuote = () => {
    setQuoteIndex(prev => (prev + 1) % MOTIVATIONAL_QUOTES.length);
  };

  return (
    <div style={{ background: '#161b22', padding: '1.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #30363d', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <Calendar size={22} style={{ color: '#c9d1d9' }} />
              <h2 style={{ fontSize: '1.25rem', color: '#f0f6fc', margin: 0, fontWeight: '800' }}>Target Interview Countdown</h2>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
              Track days remaining until your target interview.
            </p>
          </div>

          <button 
            className="btn btn-secondary"
            onClick={() => setIsEditing(!isEditing)}
            style={{ padding: '0.45rem 0.9rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Building2 size={15} />
            <span>{isEditing ? 'Cancel' : 'Set Target Date'}</span>
          </button>
        </div>

        {/* Edit Form */}
        {isEditing && (
          <form onSubmit={handleSaveCountdown} style={{ background: '#0d1117', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid #484f58', marginBottom: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.85rem', alignItems: 'center' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#c9d1d9', marginBottom: '0.25rem', fontWeight: '600' }}>
                Target Company
              </label>
              <input 
                type="text" 
                value={tempCompany} 
                onChange={(e) => setTempCompany(e.target.value)}
                placeholder="e.g. Google or Amazon"
                required
                style={{ background: '#161b22', border: '1px solid #30363d', color: '#fff', padding: '0.45rem 0.7rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#c9d1d9', marginBottom: '0.25rem', fontWeight: '600' }}>
                Interview Date
              </label>
              <input 
                type="date" 
                value={tempDate} 
                onChange={(e) => setTempDate(e.target.value)}
                required
                style={{ background: '#161b22', border: '1px solid #30363d', color: '#fff', padding: '0.45rem 0.7rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}
              />
            </div>

            <button type="submit" className="btn btn-secondary" style={{ padding: '0.45rem 1.1rem', fontSize: '0.8rem', marginTop: '1.1rem', color: '#fff' }}>
              Save Target
            </button>
          </form>
        )}

        {/* Days Remaining Big Stat (Silver/White Theme) */}
        <div style={{ background: '#0d1117', padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #30363d', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Target: <strong style={{ color: '#f0f6fc' }}>{targetCompany}</strong>
            </span>
            <div style={{ fontSize: '2.2rem', fontWeight: '800', color: '#f0f6fc', marginTop: '0.15rem' }}>
              {daysLeft} Days
            </div>
            <span style={{ fontSize: '0.75rem', color: '#8b949e' }}>Interview Date: {targetDateStr}</span>
          </div>

          <div style={{ background: '#161b22', padding: '0.85rem', borderRadius: '50%', border: '1px solid #484f58' }}>
            <Clock size={24} style={{ color: '#c9d1d9' }} />
          </div>
        </div>

        {/* Prep Timeline Progress Bar (Silver Theme) */}
        <div style={{ background: '#0d1117', padding: '1.25rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #30363d', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#f0f6fc', fontWeight: '700', marginBottom: '0.45rem' }}>
            <span>Preparation Timeline</span>
            <span style={{ color: '#c9d1d9', fontWeight: '800' }}>{prepProgress}% Completed</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: '#21262d', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${prepProgress}%`, height: '100%', background: '#8b949e' }} />
          </div>
        </div>
      </div>

      {/* Daily Motivational Quote Box (Slate Theme) */}
      <div style={{ background: '#0d1117', padding: '1.1rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid #30363d', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flex: 1 }}>
          <Sparkles size={18} style={{ color: '#c9d1d9', flexShrink: 0 }} />
          <div>
            <span style={{ fontSize: '0.75rem', color: '#8b949e', fontWeight: '700', display: 'block', marginBottom: '0.1rem' }}>
              💡 Daily Motivational Quote
            </span>
            <p style={{ color: '#f0f6fc', fontSize: '0.875rem', fontStyle: 'italic', margin: 0, lineHeight: '1.4' }}>
              "{MOTIVATIONAL_QUOTES[quoteIndex]}"
            </p>
          </div>
        </div>

        <button 
          className="btn btn-secondary"
          onClick={handleNextQuote}
          title="Get another quote"
          style={{ padding: '0.4rem 0.75rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
        >
          <RefreshCw size={12} />
          <span>New Quote</span>
        </button>
      </div>

    </div>
  );
}
