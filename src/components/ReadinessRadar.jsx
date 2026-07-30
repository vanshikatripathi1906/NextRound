import React, { useState } from 'react';
import { ShieldCheck, Activity, Plus, Edit3, Trash2, Check, X } from 'lucide-react';

export function ReadinessRadar({ initialSkills = [], onSkillsChange }) {
  const [skills, setSkills] = useState(initialSkills);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [newValue, setNewValue] = useState(70);

  const [editingIndex, setEditingIndex] = useState(null);
  const [editSubjectName, setEditSubjectName] = useState('');

  const updateSkillsState = (newSkills) => {
    setSkills(newSkills);
    if (onSkillsChange) {
      onSkillsChange(newSkills);
    }
  };

  const handleSliderChange = (index, val) => {
    const updated = skills.map((s, i) => i === index ? { ...s, value: parseInt(val, 10) } : s);
    updateSkillsState(updated);
  };

  const handleAddConcept = (e) => {
    e.preventDefault();
    if (!newSubject.trim()) return;

    const newSkillObj = {
      subject: newSubject.trim(),
      value: Math.min(100, Math.max(10, parseInt(newValue, 10) || 50)),
      fullMark: 100
    };

    const updated = [...skills, newSkillObj];
    updateSkillsState(updated);
    setNewSubject('');
    setNewValue(70);
    setShowAddModal(false);
  };

  const handleStartRename = (index, currentSubject) => {
    setEditingIndex(index);
    setEditSubjectName(currentSubject);
  };

  const handleSaveRename = (index) => {
    if (!editSubjectName.trim()) return;
    const updated = skills.map((s, i) => i === index ? { ...s, subject: editSubjectName.trim() } : s);
    updateSkillsState(updated);
    setEditingIndex(null);
  };

  const handleDeleteConcept = (index) => {
    if (skills.length <= 3) {
      alert("A minimum of 3 concepts are required for the radar polygon shape.");
      return;
    }
    const updated = skills.filter((_, i) => i !== index);
    updateSkillsState(updated);
  };

  // Radar geometry calculations
  const center = 140;
  const radius = 100;
  const numAxes = Math.max(3, skills.length);
  const angleStep = (2 * Math.PI) / numAxes;

  const points = skills.map((skill, index) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (skill.value / (skill.fullMark || 100)) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1.0];

  return (
    <div className="netflix-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={22} style={{ color: 'var(--color-netflix-red)' }} />
            <h2 style={{ fontSize: '1.25rem' }}>Readiness Radar</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Multi-dimensional interview skill shape. Move sliders or click edit to update live!
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            className="btn btn-secondary" 
            onClick={() => setShowAddModal(true)}
            style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
          >
            <Plus size={14} /> Add Concept
          </button>
          <span className="badge badge-netflix">
            <Activity size={14} /> LIVE SHAPE
          </span>
        </div>
      </div>

      {showAddModal && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          width: '100vw', height: '100vh',
          background: 'rgba(9, 13, 22, 0.85)',
          backdropFilter: 'blur(12px)',
          zIndex: 2000,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }}>
          <div className="glass-card" style={{ maxWidth: '420px', width: '92%', padding: '1.75rem', border: '1px solid #484f58' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.2rem', color: '#f0f6fc', margin: 0 }}>Add New Readiness Concept</h3>
              <button className="btn btn-secondary btn-icon" onClick={() => setShowAddModal(false)}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleAddConcept} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#c9d1d9', marginBottom: '0.35rem', fontWeight: '600' }}>
                  Concept Name *
                </label>
                <input 
                  type="text" 
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  placeholder="e.g. System Design, Cloud Architecture"
                  required
                  autoFocus
                  style={{ width: '100%', background: '#161b22', border: '1px solid #30363d', color: '#fff', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#c9d1d9', marginBottom: '0.35rem', fontWeight: '600' }}>
                  Initial Readiness Score ({newValue}%)
                </label>
                <input 
                  type="range" 
                  min="10" 
                  max="100"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn btn-secondary" style={{ flex: 1, padding: '0.65rem', color: '#fff' }}>
                  Add Concept
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)} style={{ padding: '0.65rem 1rem' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', alignItems: 'center', flex: 1 }}>
        
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
                <g key={skill.subject + index}>
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
              const r = (skill.value / (skill.fullMark || 100)) * radius;
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

        {/* Live Skill Sliders with Editable Names & Delete */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {skills.map((skill, index) => (
            <div key={index} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                {editingIndex === index ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flex: 1, marginRight: '0.5rem' }}>
                    <input 
                      type="text" 
                      value={editSubjectName} 
                      onChange={(e) => setEditSubjectName(e.target.value)}
                      style={{ background: '#161b22', border: '1px solid #484f58', color: '#fff', padding: '0.2rem 0.4rem', borderRadius: '4px', fontSize: '0.8rem', width: '100%' }}
                      autoFocus
                    />
                    <button className="btn btn-secondary btn-icon" onClick={() => handleSaveRename(index)} style={{ padding: '0.2rem 0.4rem' }}>
                      <Check size={14} />
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontWeight: '600', color: '#f0f6fc' }}>{skill.subject}</span>
                    <button 
                      onClick={() => handleStartRename(index, skill.subject)}
                      style={{ background: 'none', border: 'none', color: '#8b949e', cursor: 'pointer', padding: '2px' }}
                      title="Rename Concept"
                    >
                      <Edit3 size={13} />
                    </button>
                    {skills.length > 3 && (
                      <button 
                        onClick={() => handleDeleteConcept(index)}
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '2px' }}
                        title="Delete Concept"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                )}
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
