import React, { useState, useEffect } from 'react';
import { Calendar, Target, Sparkles, Edit2, Check, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export function InterviewCountdown() {
  const [targetCompany, setTargetCompany] = useState(() => {
    return localStorage.getItem('nextround_countdown_company') || 'Google';
  });

  const [targetDate, setTargetDate] = useState(() => {
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 24);
    return localStorage.getItem('nextround_countdown_date') || defaultDate.toISOString().split('T')[0];
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempCompany, setTempCompany] = useState(targetCompany);
  const [tempDate, setTempDate] = useState(targetDate);

  const calculateDaysRemaining = (dateStr) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(dateStr);
    target.setHours(0, 0, 0, 0);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const daysRemaining = calculateDaysRemaining(targetDate);
  const totalDays = 60;
  const progressPercent = Math.min(100, Math.max(0, Math.round(((totalDays - daysRemaining) / totalDays) * 100)));

  const quotes = [
    "Consistency creates capability. Every solved problem brings you closer to your dream offer.",
    "Focus on understanding patterns over memorizing code solutions.",
    "Dry run your code out loud. Clear articulation is as important as syntax.",
    "Small daily progress compounds into massive interview success.",
    "Trust your preparation. You've solved hard problems before, and you will solve them again!"
  ];

  const getQuoteOfDay = () => {
    const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    return quotes[dayOfYear % quotes.length];
  };

  const handleSave = () => {
    setTargetCompany(tempCompany);
    setTargetDate(tempDate);
    localStorage.setItem('nextround_countdown_company', tempCompany);
    localStorage.setItem('nextround_countdown_date', tempDate);
    setIsEditing(false);
    confetti({ particleCount: 60, spread: 60 });
  };

  return (
    <div className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Target size={22} style={{ color: '#c9d1d9' }} />
            <h3 style={{ fontSize: '1.2rem', color: '#f0f6fc', margin: 0, fontWeight: '800' }}>
              Target Interview Countdown
            </h3>
          </div>

          <button 
            className="btn btn-secondary btn-icon"
            onClick={() => {
              setTempCompany(targetCompany);
              setTempDate(targetDate);
              setIsEditing(!isEditing);
            }}
            title="Change Target Company or Date"
          >
            {isEditing ? <X size={16} /> : <Edit2 size={16} />}
          </button>
        </div>

        {isEditing ? (
          <div style={{ background: '#0d1117', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid #484f58', marginBottom: '1.25rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#c9d1d9', marginBottom: '0.35rem', fontWeight: '600' }}>
                Target Company Name:
              </label>
              <input 
                type="text" 
                value={tempCompany} 
                onChange={(e) => setTempCompany(e.target.value)}
                placeholder="e.g. Google, Amazon, Microsoft"
                style={{ width: '100%', background: '#161b22', border: '1px solid #30363d', color: '#fff', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem' }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#c9d1d9', marginBottom: '0.35rem', fontWeight: '600' }}>
                Target Interview Date:
              </label>
              <input 
                type="date" 
                value={tempDate} 
                onChange={(e) => setTempDate(e.target.value)}
                style={{ width: '100%', background: '#161b22', border: '1px solid #30363d', color: '#fff', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-secondary" onClick={handleSave} style={{ flex: 1, padding: '0.55rem', color: '#fff' }}>
                <Check size={16} /> Save Target
              </button>
              <button className="btn btn-secondary" onClick={() => setIsEditing(false)} style={{ padding: '0.55rem 1rem' }}>
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div style={{ background: '#0d1117', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #30363d', textAlign: 'center', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.9rem', color: '#c9d1d9', fontWeight: '600' }}>
              Target: <strong style={{ color: '#f0f6fc', fontSize: '1.1rem' }}>{targetCompany}</strong>
            </div>

            <div style={{ fontSize: '3.8rem', fontWeight: '900', color: '#f0f6fc', margin: '0.5rem 0', fontFamily: 'var(--font-mono)' }}>
              {daysRemaining} <span style={{ fontSize: '1.2rem', color: '#c9d1d9', fontWeight: '600' }}>Days Left</span>
            </div>

            <div style={{ fontSize: '0.8rem', color: '#8b949e', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
              <Calendar size={14} /> Scheduled for {new Date(targetDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          </div>
        )}

        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#c9d1d9', fontWeight: '600', marginBottom: '0.4rem' }}>
            <span>Preparation Timeline Progress</span>
            <span style={{ color: '#f0f6fc', fontWeight: '700' }}>{progressPercent}% Complete</span>
          </div>

          <div style={{ width: '100%', height: '8px', background: '#21262d', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${progressPercent}%`, height: '100%', background: '#8b949e', transition: 'width 0.4s ease' }} />
          </div>
        </div>
      </div>

      <div style={{ background: '#161b22', padding: '1rem 1.1rem', borderRadius: 'var(--radius-md)', border: '1px solid #30363d', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
        <Sparkles size={18} style={{ color: '#c9d1d9', flexShrink: 0, marginTop: '0.15rem' }} />
        <div>
          <span style={{ fontSize: '0.75rem', color: '#c9d1d9', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '0.15rem' }}>
            Daily Motivational Quote
          </span>
          <p style={{ color: '#f0f6fc', fontSize: '0.85rem', lineHeight: '1.45', margin: 0, italic: 'true' }}>
            "{getQuoteOfDay()}"
          </p>
        </div>
      </div>
    </div>
  );
}
