import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

export function HeatmapCalendar({ onUpdateTodayCount }) {
  const getTodayISO = () => new Date().toISOString().split('T')[0];

  const generatePast7Days = () => {
    const list = [];
    const now = new Date();

    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(now.getDate() - i);
      const isoStr = d.toISOString().split('T')[0];
      const isToday = i === 0;
      
      const dayName = isToday ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short' });
      const dateNum = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

      const savedCount = localStorage.getItem(`nextround_activity_${isoStr}`);
      const fallbackCounts = [6, 8, 4, 10, 7, 9, 5];
      const countVal = savedCount !== null ? parseInt(savedCount) : (fallbackCounts[6 - i] || 5);

      list.push({
        iso: isoStr,
        dayName,
        dateNum,
        isToday,
        count: countVal
      });
    }

    return list;
  };

  const [daysList, setDaysList] = useState(generatePast7Days);
  
  const todayItem = daysList.find(d => d.isToday) || daysList[daysList.length - 1];
  const [todaySolved, setTodaySolved] = useState(todayItem.count);

  const handleUpdateCount = (newCount) => {
    const val = Math.max(0, parseInt(newCount) || 0);
    setTodaySolved(val);

    const todayISO = getTodayISO();
    localStorage.setItem(`nextround_activity_${todayISO}`, val);

    setDaysList(prev => prev.map(d => d.isToday ? { ...d, count: val } : d));

    if (onUpdateTodayCount) {
      onUpdateTodayCount(val);
    }
  };

  const totalSolved = daysList.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div className="glass-card mb-6" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Calendar size={24} style={{ color: 'var(--color-primary)' }} />
            <h2 style={{ fontSize: '1.35rem' }}>Practice Activity Log</h2>
          </div>
        </div>

        <div style={{ background: '#161b22', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid #30363d', display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <label style={{ fontSize: '0.85rem', color: '#f0f6fc', fontWeight: '600' }}>
            Questions Solved Today:
          </label>
          <input 
            type="number" 
            min="0" 
            value={todaySolved} 
            onChange={(e) => handleUpdateCount(e.target.value)}
            style={{ 
              width: '75px', 
              background: '#0d1117', 
              border: '1px solid #484f58', 
              color: '#f0f6fc', 
              padding: '0.35rem 0.6rem', 
              borderRadius: 'var(--radius-sm)', 
              fontSize: '1rem',
              fontWeight: '800',
              textAlign: 'center'
            }} 
          />
        </div>
      </div>

      <div style={{ 
        background: '#161b22', 
        padding: '1.5rem', 
        borderRadius: 'var(--radius-md)', 
        border: '1px solid #30363d',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.9rem', color: '#f0f6fc', fontWeight: '700' }}>
            Past 7 Days Activity Log
          </span>
          <span style={{ fontSize: '0.85rem', color: '#c9d1d9', fontWeight: '700' }}>
            Total Solved (Past 7 Days): <strong style={{ color: '#f0f6fc' }}>{totalSolved} Questions</strong>
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '0.85rem' }}>
          {daysList.map((day) => {
            return (
              <div 
                key={day.iso}
                style={{ 
                  background: day.isToday ? '#0d1117' : '#0d1117', 
                  border: `1px solid ${day.isToday ? '#484f58' : '#30363d'}`, 
                  padding: '1rem 0.85rem', 
                  borderRadius: 'var(--radius-md)', 
                  textAlign: 'center',
                  boxShadow: day.isToday ? '0 4px 14px rgba(0, 0, 0, 0.3)' : 'none'
                }}
              >
                <div style={{ fontSize: '0.8rem', color: day.isToday ? '#f0f6fc' : '#c9d1d9', fontWeight: '700' }}>
                  {day.dayName}
                </div>
                <div style={{ fontSize: '0.7rem', color: '#8b949e', marginTop: '0.1rem' }}>
                  {day.dateNum}
                </div>

                <div style={{ fontSize: '1.6rem', fontWeight: '800', color: day.isToday ? '#f0f6fc' : '#c9d1d9', margin: '0.35rem 0 0.15rem 0' }}>
                  {day.count}
                </div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-subtle)' }}>
                  questions
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
