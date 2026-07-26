import React, { useState } from 'react';
import { Gamepad2, Star, Lock, CheckCircle2 } from 'lucide-react';

export function SkillTree({ skillNodes, userXP, userLevel }) {
  const [nodes, setNodes] = useState(skillNodes);

  const renderStars = (count) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={14} 
          fill={i <= count ? "#E50914" : "transparent"} 
          color={i <= count ? "#E50914" : "#444"} 
        />
      );
    }
    return <div style={{ display: 'flex', gap: '2px' }}>{stars}</div>;
  };

  const unlockSkill = (id) => {
    setNodes(nodes.map(n => n.id === id ? { ...n, unlocked: true } : n));
  };

  return (
    <div className="netflix-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Gamepad2 size={22} style={{ color: 'var(--color-netflix-red)' }} />
            <h2 style={{ fontSize: '1.25rem' }}>Gamified Skill Tree</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Level up your engineering mastery. Unlock advanced technologies as you progress!
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <span className="badge badge-emerald" style={{ fontSize: '0.85rem' }}>
            ⭐ Level {userLevel} Engineer
          </span>
          <span className="badge badge-netflix" style={{ fontSize: '0.85rem' }}>
            🏆 {userXP} XP
          </span>
        </div>
      </div>

      <div className="equal-height-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
        {nodes.map(node => (
          <div 
            key={node.id}
            style={{ 
              background: node.unlocked ? '#0e0e0e' : 'rgba(255, 255, 255, 0.02)',
              border: `1px solid ${node.unlocked ? 'rgba(229, 9, 20, 0.25)' : 'rgba(255, 255, 255, 0.05)'}`,
              padding: '1.25rem',
              borderRadius: 'var(--radius-sm)',
              opacity: node.unlocked ? 1 : 0.6,
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <div style={{ fontSize: '2rem' }}>{node.icon}</div>
                {node.unlocked ? (
                  <span className="badge badge-emerald"><CheckCircle2 size={12} /> Level {node.level}</span>
                ) : (
                  <span className="badge badge-dark"><Lock size={12} /> Locked</span>
                )}
              </div>

              <h3 style={{ fontSize: '1.05rem', margin: '0.25rem 0' }}>{node.title}</h3>
              {renderStars(node.stars)}

              <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                {node.description}
              </p>
            </div>

            {!node.unlocked && (
              <button 
                className="btn btn-netflix" 
                style={{ width: '100%', marginTop: '0.85rem', fontSize: '0.8rem', padding: '0.4rem' }}
                onClick={() => unlockSkill(node.id)}
              >
                Unlock Skill Badge
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
