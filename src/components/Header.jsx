import React, { useState } from 'react';
import { Target, Plus, CheckCircle2, Circle, Flame, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export function Header({ userProfile, nodes = [], skills = [], onCheckInStreak }) {
  const [missions, setMissions] = useState(
    userProfile.todaysMissions || [
      { id: 1, text: 'Graph BFS Traversal', tag: 'Medium', completed: true },
      { id: 2, text: 'Graph DFS Cycle Detection', tag: 'Medium', completed: false },
      { id: 3, text: 'LRU Cache Design (O(1) DLL)', tag: 'Hard', completed: false }
    ]
  );

  const [showAddInput, setShowAddInput] = useState(false);
  const [newMissionText, setNewMissionText] = useState('');
  const [newMissionTag, setNewMissionTag] = useState('Medium');

  const handleToggleMission = (id) => {
    setMissions(prev => prev.map(m => {
      if (m.id === id) {
        const nextState = !m.completed;
        if (nextState) {
          confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });
        }
        return { ...m, completed: nextState };
      }
      return m;
    }));
  };

  const handleAddMission = (e) => {
    e.preventDefault();
    if (!newMissionText.trim()) return;

    const item = {
      id: Date.now(),
      text: newMissionText.trim(),
      tag: newMissionTag,
      completed: false
    };

    setMissions(prev => [...prev, item]);
    confetti({ particleCount: 40, spread: 50 });
    setNewMissionText('');
    setShowAddInput(false);
  };

  const handleStreakClick = () => {
    if (onCheckInStreak) {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 }
      });
      onCheckInStreak();
    }
  };

  const avgNodeMastery = nodes.length > 0 
    ? nodes.reduce((acc, curr) => acc + (curr.mastery || 0), 0) / nodes.length 
    : 78;

  const avgSkillScore = skills.length > 0 
    ? skills.reduce((acc, curr) => acc + (curr.score || 0), 0) / skills.length 
    : 80;

  const streakBonus = Math.min(10, (userProfile.currentStreak || 0) * 0.4);
  const dynamicReadiness = Math.min(99, Math.max(35, Math.round((avgNodeMastery * 0.5) + (avgSkillScore * 0.4) + streakBonus)));

  const completedCount = missions.filter(m => m.completed).length;
  const totalMissions = missions.length;
  const progressPercent = totalMissions > 0 ? Math.round((completedCount / totalMissions) * 100) : 0;

  return (
    <header className="glass-card mb-6" style={{ padding: '2.25rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-body)', fontSize: '1.65rem', fontWeight: '800', lineHeight: '1.2', marginBottom: '0.35rem', color: 'var(--text-main)' }}>
          Hello, {userProfile.name}
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
          Welcome to your interview preparation dashboard. Track your readiness and master core technical topics.
        </p>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
        gap: '1.25rem',
        marginBottom: '1.75rem'
      }}>
        <div style={{ background: '#161b22', padding: '1.35rem', borderRadius: 'var(--radius-md)', border: '1px solid #30363d' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600' }}>
            Interview Readiness
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.35rem' }}>
            <span style={{ fontSize: '2.4rem', fontWeight: '800', color: '#f0f6fc' }}>
              {dynamicReadiness}%
            </span>
            <span style={{ fontSize: '0.8rem', color: '#56d364', fontWeight: '700' }}>+4% this week</span>
          </div>
        </div>

        <div 
          onClick={handleStreakClick}
          style={{ 
            background: '#161b22', 
            padding: '1.35rem', 
            borderRadius: 'var(--radius-md)', 
            border: '1px solid #30363d',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            userSelect: 'none'
          }}
          title="Current active streak"
        >
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: '600' }}>
            <Flame size={15} style={{ color: '#ff7b72' }} />
            <span>Current Streak</span>
          </div>

          <div style={{ fontSize: '2.4rem', fontWeight: '800', color: '#ff7b72', marginTop: '0.35rem' }}>
            🔥 {userProfile.currentStreak} Days
          </div>
        </div>
      </div>

      <div style={{ 
        background: '#161b22', 
        padding: '1.75rem', 
        borderRadius: 'var(--radius-md)', 
        border: '1px solid #30363d' 
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Target size={22} style={{ color: '#c9d1d9' }} />
              <h2 style={{ fontSize: '1.3rem', color: '#f0f6fc', margin: 0, fontWeight: '800' }}>Today's Mission</h2>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
              Complete your daily coding tasks to boost interview confidence and maintain streak momentum.
            </p>
          </div>

          <button 
            className="btn btn-secondary"
            onClick={() => setShowAddInput(!showAddInput)}
            style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            {showAddInput ? <X size={15} /> : <Plus size={15} />}
            <span>{showAddInput ? 'Cancel' : 'Add Mission'}</span>
          </button>
        </div>

        <div style={{ marginBottom: '1.5rem', background: '#0d1117', padding: '1rem 1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid #30363d' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#f0f6fc', fontWeight: '700', marginBottom: '0.5rem' }}>
            <span>Mission Progress ({completedCount} / {totalMissions} Completed)</span>
            <span style={{ color: '#c9d1d9', fontWeight: '800' }}>{progressPercent}% Done</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: '#21262d', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: `${progressPercent}%`, height: '100%', background: '#8b949e', transition: 'width 0.35s ease' }} />
          </div>
        </div>

        {showAddInput && (
          <form onSubmit={handleAddMission} style={{ background: '#0d1117', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid #484f58', marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
            <input 
              type="text" 
              value={newMissionText}
              onChange={(e) => setNewMissionText(e.target.value)}
              placeholder="e.g. Solve LC 207 Course Schedule"
              autoFocus
              required
              style={{ flex: 1, minWidth: '240px', background: '#161b22', border: '1px solid #30363d', color: '#fff', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem' }}
            />

            <select
              value={newMissionTag}
              onChange={(e) => setNewMissionTag(e.target.value)}
              style={{ background: '#161b22', border: '1px solid #30363d', color: '#fff', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem', fontWeight: '600' }}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <button type="submit" className="btn btn-secondary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem', color: '#fff' }}>
              Save Mission
            </button>
          </form>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.1rem' }}>
          {missions.map(m => (
            <div 
              key={m.id}
              onClick={() => handleToggleMission(m.id)}
              style={{ 
                background: '#0d1117', 
                border: `1px solid ${m.completed ? '#484f58' : '#30363d'}`, 
                padding: '1.25rem 1.35rem', 
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'all 0.25s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flex: 1 }}>
                {m.completed ? (
                  <CheckCircle2 size={22} style={{ color: '#c9d1d9', flexShrink: 0 }} />
                ) : (
                  <Circle size={22} style={{ color: '#484f58', flexShrink: 0 }} />
                )}

                <div>
                  <div style={{ 
                    fontSize: '1rem', 
                    fontWeight: '700', 
                    color: '#f0f6fc',
                    lineHeight: '1.3'
                  }}>
                    {m.text}
                  </div>
                  
                  <div style={{ marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span className="badge badge-dark" style={{ fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
                      {m.tag || 'Medium'}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                {m.completed ? (
                  <span className="badge badge-primary" style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem' }}>
                    Done ✓
                  </span>
                ) : (
                  <span className="badge badge-dark" style={{ fontSize: '0.75rem', padding: '0.25rem 0.65rem', opacity: 0.7 }}>
                    To Do
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
