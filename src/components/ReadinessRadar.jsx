import React, { useState } from 'react';
import { ShieldCheck, Activity } from 'lucide-react';

export function ReadinessRadar({ initialSkills, onSkillsChange }) {
  const [skills, setSkills] = useState(initialSkills);

  const handleSliderChange = (index, newValue) => {
    const updated = [...skills];
    updated[index] = { ...updated[index], value: parseInt(newValue, 10) };
    setSkills(updated);
    if (onSkillsChange) {
      onSkillsChange(updated);
    }
  };

  const center = 140;
  const radius = 100;
  const numAxes = skills.length;
  const angleStep = (2 * Math.PI) / numAxes;

  const points = skills.map((skill, index) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (skill.value / skill.fullMark) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

  return (
    <div className="netflix-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={22} style={{ color: 'var(--color-netflix-red)' }} />
            <h2 style={{ fontSize: '1.25rem' }}>Readiness Radar</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Multi-dimensional interview skill shape. Move sliders to update live!
          </p>
        </div>
        <span className="badge badge-netflix">
          <Activity size={14} /> LIVE SHAPE
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', alignItems: 'center', flex: 1 }}>
        
        {/* SVG Radar */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <svg width="280" height="280" viewBox="0 0 280 280">
            {gridLevels.map((level, lvlIdx) => {
              const gridPoints = skills.map((_, index) => {
                const angle = index * angleStep - Math.PI / 2;
                const r = level * radius;
                const x = center + r * Math.cos(angle);
                const y = center + r * Math.sin(angle);
                return `${x},${y}`;
              }).join(' ');

              return (
                <polygon
                  key={lvlIdx}
                  points={gridPoints}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="1"
                />
              );
            })}

            {skills.map((skill, index) => {
              const angle = index * angleStep - Math.PI / 2;
              const x2 = center + radius * Math.cos(angle);
              const y2 = center + radius * Math.sin(angle);
              
              const labelRadius = radius + 22;
              const lx = center + labelRadius * Math.cos(angle);
              const ly = center + labelRadius * Math.sin(angle);

              return (
                <g key={skill.subject}>
                  <line 
                    x1={center} 
                    y1={center} 
                    x2={x2} 
                    y2={y2} 
                    stroke="rgba(255, 255, 255, 0.12)" 
                    strokeDasharray="3 3"
                  />
                  <text 
                    x={lx} 
                    y={ly} 
                    textAnchor="middle" 
                    dominantBaseline="middle" 
                    fill="var(--text-muted)" 
                    fontSize="10"
                    fontWeight="700"
                  >
                    {skill.subject}
                  </text>
                </g>
              );
            })}

            {/* Filled Polygon */}
            <polygon
              points={points}
              fill="rgba(229, 9, 20, 0.25)"
              stroke="var(--color-netflix-red)"
              strokeWidth="2.5"
              style={{ transition: 'all 0.25s ease' }}
            />

            {skills.map((skill, index) => {
              const angle = index * angleStep - Math.PI / 2;
              const r = (skill.value / skill.fullMark) * radius;
              const x = center + r * Math.cos(angle);
              const y = center + r * Math.sin(angle);

              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="4.5"
                  fill="var(--color-netflix-red)"
                  stroke="#fff"
                  strokeWidth="1.5"
                />
              );
            })}
          </svg>
        </div>

        {/* Live Skill Sliders */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {skills.map((skill, index) => (
            <div key={skill.subject} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: '600' }}>{skill.subject}</span>
                <span style={{ color: 'var(--color-netflix-red)', fontWeight: '800' }}>{skill.value}%</span>
              </div>
              <input 
                type="range" 
                min="10" 
                max="100" 
                value={skill.value} 
                onChange={(e) => handleSliderChange(index, e.target.value)} 
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
