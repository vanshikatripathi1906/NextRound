import React, { useState } from 'react';
import { ShieldCheck, Plus, X, Edit2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { initialRadarSkills } from '../data/initialData';

export function ReadinessRadar({ skills = initialRadarSkills, onSkillsChange }) {
  const [skillList, setSkillList] = useState(skills);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillScore, setNewSkillScore] = useState(80);
  const [newSkillBenchmark, setNewSkillBenchmark] = useState(85);

  const [editingSkill, setEditingSkill] = useState(null);

  const handleScoreChange = (index, delta) => {
    const updated = skillList.map((s, idx) => {
      if (idx === index) {
        const newScore = Math.min(100, Math.max(0, s.score + delta));
        return { ...s, score: newScore };
      }
      return s;
    });
    setSkillList(updated);
    if (onSkillsChange) onSkillsChange(updated);
  };

  const handleAddSkillSubmit = (e) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    const newObj = {
      name: newSkillName.trim(),
      score: Math.min(100, Math.max(0, parseInt(newSkillScore) || 80)),
      benchmark: Math.min(100, Math.max(0, parseInt(newSkillBenchmark) || 85))
    };

    const updated = [...skillList, newObj];
    setSkillList(updated);
    if (onSkillsChange) onSkillsChange(updated);

    confetti({ particleCount: 60, spread: 60 });
    setNewSkillName('');
    setShowAddModal(false);
  };

  const handleEditSave = () => {
    if (!editingSkill) return;
    const updated = skillList.map(s => {
      if (s.name === editingSkill.name) {
        return editingSkill;
      }
      return s;
    });
    setSkillList(updated);
    if (onSkillsChange) onSkillsChange(updated);
    setEditingSkill(null);
  };

  const size = 320;
  const center = size / 2;
  const radius = 110;
  const totalAxes = skillList.length || 6;
  const angleStep = (Math.PI * 2) / totalAxes;

  const calculatePoint = (scorePercent, index) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (scorePercent / 100) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  const candidatePoints = skillList.map((s, idx) => calculatePoint(s.score, idx));
  const benchmarkPoints = skillList.map((s, idx) => calculatePoint(s.benchmark || 85, idx));

  const candidatePolygonStr = candidatePoints.map(p => `${p.x},${p.y}`).join(' ');
  const benchmarkPolygonStr = benchmarkPoints.map(p => `${p.x},${p.y}`).join(' ');

  return (
    <div className="glass-card mb-6" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <ShieldCheck size={24} style={{ color: 'var(--color-primary)' }} />
          <h2 style={{ fontSize: '1.35rem' }}>Readiness Radar & Skill Matrix</h2>
        </div>

        <button 
          className="btn btn-secondary"
          onClick={() => setShowAddModal(true)}
          style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <Plus size={16} /> Add Skill Axis
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'center' }}>
        <div style={{ background: '#161b22', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #30363d', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {[0.25, 0.5, 0.75, 1.0].map((level, lIdx) => {
              const gridRadius = radius * level;
              const points = skillList.map((_, idx) => {
                const angle = idx * angleStep - Math.PI / 2;
                const x = center + gridRadius * Math.cos(angle);
                const y = center + gridRadius * Math.sin(angle);
                return `${x},${y}`;
              }).join(' ');

              return (
                <polygon 
                  key={lIdx}
                  points={points}
                  fill="none"
                  stroke="#30363d"
                  strokeWidth="1"
                  strokeDasharray={level < 1 ? '3 3' : 'none'}
                />
              );
            })}

            {skillList.map((_, idx) => {
              const angle = idx * angleStep - Math.PI / 2;
              const x = center + radius * Math.cos(angle);
              const y = center + radius * Math.sin(angle);
              return (
                <line 
                  key={idx}
                  x1={center}
                  y1={center}
                  x2={x}
                  y2={y}
                  stroke="#30363d"
                  strokeWidth="1.5"
                />
              );
            })}

            <polygon 
              points={benchmarkPolygonStr}
              fill="rgba(139, 148, 158, 0.12)"
              stroke="#8b949e"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            <polygon 
              points={candidatePolygonStr}
              fill="rgba(240, 246, 252, 0.18)"
              stroke="#f0f6fc"
              strokeWidth="2.5"
            />

            {candidatePoints.map((p, idx) => (
              <circle key={idx} cx={p.x} cy={p.y} r="4" fill="#f0f6fc" stroke="#161b22" strokeWidth="2" />
            ))}
          </svg>

          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', fontSize: '0.8rem' }}>
            <span style={{ color: '#f0f6fc', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ display: 'inline-block', width: '10px', height: '10px', background: '#f0f6fc', borderRadius: '2px' }} />
              Your Score
            </span>
            <span style={{ color: '#8b949e', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <span style={{ display: 'inline-block', width: '10px', height: '10px', background: '#8b949e', borderRadius: '2px' }} />
              Industry Benchmark
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {skillList.map((s, idx) => (
            <div 
              key={idx}
              style={{ 
                background: '#161b22', 
                padding: '1rem 1.25rem', 
                borderRadius: 'var(--radius-md)', 
                border: '1px solid #30363d',
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between'
              }}
            >
              <div>
                <div style={{ fontSize: '0.95rem', color: '#f0f6fc', fontWeight: '700' }}>{s.name}</div>
                <div style={{ fontSize: '0.75rem', color: '#8b949e', marginTop: '0.15rem' }}>
                  Target Benchmark: {s.benchmark || 85}%
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ fontSize: '1.1rem', fontWeight: '800', color: s.score >= (s.benchmark || 85) ? '#56d364' : '#c9d1d9' }}>
                  {s.score}%
                </span>

                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  <button className="btn btn-secondary" onClick={() => handleScoreChange(idx, -5)} style={{ padding: '0.2rem 0.5rem', fontSize: '0.85rem' }}>-</button>
                  <button className="btn btn-secondary" onClick={() => handleScoreChange(idx, +5)} style={{ padding: '0.2rem 0.5rem', fontSize: '0.85rem' }}>+</button>
                  <button className="btn btn-secondary" onClick={() => setEditingSkill(s)} style={{ padding: '0.2rem 0.45rem', fontSize: '0.8rem' }} title="Edit Target Benchmark">
                    <Edit2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh', background: 'rgba(9, 13, 22, 0.9)', backdropFilter: 'blur(16px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="glass-card" style={{ maxWidth: '440px', width: '92%', padding: '2rem', border: '1px solid #484f58', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#f0f6fc', margin: 0 }}>Add Skill Axis</h3>
              <button className="btn btn-secondary btn-icon" onClick={() => setShowAddModal(false)}><X size={18} /></button>
            </div>

            <form onSubmit={handleAddSkillSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: '#c9d1d9', fontWeight: '600', marginBottom: '0.35rem', display: 'block' }}>Skill Name</label>
                <input type="text" value={newSkillName} onChange={(e) => setNewSkillName(e.target.value)} placeholder="e.g. System Design LLD" required style={{ width: '100%', background: '#161b22', border: '1px solid #30363d', color: '#fff', padding: '0.65rem', borderRadius: '4px' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', color: '#c9d1d9', fontWeight: '600', marginBottom: '0.35rem', display: 'block' }}>Your Score (0-100)</label>
                <input type="number" min="0" max="100" value={newSkillScore} onChange={(e) => setNewSkillScore(e.target.value)} style={{ width: '100%', background: '#161b22', border: '1px solid #30363d', color: '#fff', padding: '0.65rem', borderRadius: '4px' }} />
              </div>

              <div>
                <label style={{ fontSize: '0.85rem', color: '#c9d1d9', fontWeight: '600', marginBottom: '0.35rem', display: 'block' }}>Industry Benchmark (0-100)</label>
                <input type="number" min="0" max="100" value={newSkillBenchmark} onChange={(e) => setNewSkillBenchmark(e.target.value)} style={{ width: '100%', background: '#161b22', border: '1px solid #30363d', color: '#fff', padding: '0.65rem', borderRadius: '4px' }} />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn btn-secondary" style={{ flex: 1, color: '#fff', padding: '0.65rem' }}>Add Skill</button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)} style={{ padding: '0.65rem 1.25rem' }}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {editingSkill && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh', background: 'rgba(9, 13, 22, 0.9)', backdropFilter: 'blur(16px)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="glass-card" style={{ maxWidth: '420px', width: '92%', padding: '2rem', border: '1px solid #484f58', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#f0f6fc', margin: 0 }}>Edit Benchmark for {editingSkill.name}</h3>
              <button className="btn btn-secondary btn-icon" onClick={() => setEditingSkill(null)}><X size={18} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', color: '#c9d1d9', fontWeight: '600', marginBottom: '0.35rem', display: 'block' }}>Target Benchmark Score (0-100)</label>
                <input 
                  type="number" 
                  min="0" 
                  max="100" 
                  value={editingSkill.benchmark || 85} 
                  onChange={(e) => setEditingSkill({ ...editingSkill, benchmark: Math.min(100, Math.max(0, parseInt(e.target.value) || 0)) })}
                  style={{ width: '100%', background: '#161b22', border: '1px solid #30363d', color: '#fff', padding: '0.65rem', borderRadius: '4px' }} 
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button className="btn btn-secondary" onClick={handleEditSave} style={{ flex: 1, color: '#fff', padding: '0.65rem' }}>Save Changes</button>
                <button className="btn btn-secondary" onClick={() => setEditingSkill(null)} style={{ padding: '0.65rem 1.25rem' }}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
