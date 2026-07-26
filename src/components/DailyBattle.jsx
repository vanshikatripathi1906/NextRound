import React, { useState } from 'react';
import { Sword, CheckSquare, Square, Award, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export function DailyBattle({ battles, onEarnXP }) {
  const [battleList, setBattleList] = useState(battles);

  const toggleBattle = (id) => {
    const updated = battleList.map(b => {
      if (b.id === id) {
        const nextState = !b.completed;
        if (nextState) {
          confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
          if (onEarnXP) onEarnXP(b.xp);
        }
        return { ...b, completed: nextState };
      }
      return b;
    });
    setBattleList(updated);
  };

  const totalXP = battleList.filter(b => b.completed).reduce((acc, curr) => acc + curr.xp, 0);

  return (
    <div className="netflix-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sword size={22} style={{ color: 'var(--color-netflix-red)' }} />
            <h2 style={{ fontSize: '1.25rem' }}>Daily Battle Quests</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Complete today's daily missions to earn XP and level up your skills!
          </p>
        </div>

        <div className="badge badge-amber" style={{ fontSize: '0.85rem', padding: '0.4rem 0.85rem' }}>
          <Award size={16} /> +{totalXP} XP Claimed
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1 }}>
        {battleList.map(battle => (
          <div 
            key={battle.id}
            onClick={() => toggleBattle(battle.id)}
            style={{ 
              background: battle.completed ? 'rgba(43, 183, 65, 0.1)' : '#0e0e0e',
              border: `1px solid ${battle.completed ? 'rgba(43, 183, 65, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`,
              padding: '0.85rem 1.25rem',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {battle.completed ? (
                <CheckSquare size={20} style={{ color: '#4ade80' }} />
              ) : (
                <Square size={20} style={{ color: 'var(--text-muted)' }} />
              )}
              <div>
                <div style={{ fontWeight: '600', fontSize: '0.925rem', textDecoration: battle.completed ? 'line-through' : 'none', color: battle.completed ? 'var(--text-muted)' : 'var(--text-main)' }}>
                  {battle.task}
                </div>
                <span className="badge badge-netflix" style={{ fontSize: '0.65rem', marginTop: '0.2rem' }}>
                  {battle.category}
                </span>
              </div>
            </div>

            <span style={{ fontWeight: '800', color: 'var(--color-amber)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Sparkles size={14} /> +{battle.xp} XP
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
