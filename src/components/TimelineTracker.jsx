import React, { useState } from 'react';
import { GitCommit, CheckCircle2, Circle } from 'lucide-react';

export function TimelineTracker({ pipelineStages }) {
  const [stages, setStages] = useState(pipelineStages);

  const handleToggleStage = (stageId) => {
    setStages(prevStages => 
      prevStages.map(stage => {
        if (stage.id === stageId) {
          const nextStatus = stage.status === 'completed' ? 'pending' : 'completed';
          return { ...stage, status: nextStatus };
        }
        return stage;
      })
    );
  };

  return (
    <div style={{ background: '#161b22', padding: '1.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #30363d', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      
      <div>
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
            <GitCommit size={22} style={{ color: '#c9d1d9' }} />
            <h2 style={{ fontSize: '1.25rem', color: '#f0f6fc', margin: 0, fontWeight: '800' }}>Interview Timeline</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
            Track your recruitment progress. Click stage to toggle status.
          </p>
        </div>

        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '0.75rem'
        }}>
          {stages.map((stage) => {
            const isCompleted = stage.status === 'completed';

            return (
              <div 
                key={stage.id}
                onClick={() => handleToggleStage(stage.id)}
                style={{ 
                  cursor: 'pointer',
                  padding: '0.85rem 1.1rem', 
                  borderRadius: 'var(--radius-md)', 
                  background: isCompleted ? '#0d1117' : '#0d1117',
                  border: `1px solid ${isCompleted ? '#484f58' : '#30363d'}`,
                  transition: 'all 0.25s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between',
                  userSelect: 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {isCompleted ? (
                    <CheckCircle2 size={18} style={{ color: '#c9d1d9', flexShrink: 0 }} />
                  ) : (
                    <Circle size={18} style={{ color: '#484f58', flexShrink: 0 }} />
                  )}

                  <div>
                    <div style={{ 
                      fontWeight: '700', 
                      fontSize: '0.9rem', 
                      color: isCompleted ? '#f0f6fc' : '#c9d1d9',
                      lineHeight: '1.3'
                    }}>
                      {stage.title}
                    </div>
                    <span style={{ fontSize: '0.7rem', color: '#8b949e' }}>Stage {stage.id}</span>
                  </div>
                </div>

                <div>
                  <span 
                    className={isCompleted ? 'badge badge-primary' : 'badge badge-dark'} 
                    style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem' }}
                  >
                    {isCompleted ? 'Completed ✓' : 'Pending'}
                  </span>
                </div>

              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
