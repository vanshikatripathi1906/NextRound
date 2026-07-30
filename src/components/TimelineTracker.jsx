import React from 'react';
import { Calendar, CheckCircle2, Clock, Circle } from 'lucide-react';

export function TimelineTracker({ pipelineStages = [] }) {
  const defaultStages = [
    { name: 'Online Assessment (OA)', date: 'June 15', status: 'Completed' },
    { name: 'Technical Round 1 (DSA)', date: 'July 02', status: 'Completed' },
    { name: 'Technical Round 2 (System Design)', date: 'July 28', status: 'Upcoming' },
    { name: 'Managerial & HR Round', date: 'August 10', status: 'Scheduled' }
  ];

  const stages = pipelineStages.length > 0 ? pipelineStages : defaultStages;

  return (
    <div className="glass-card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <Calendar size={22} style={{ color: '#c9d1d9' }} />
          <h3 style={{ fontSize: '1.2rem', color: '#f0f6fc', margin: 0, fontWeight: '800' }}>
            Interview Timeline
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {stages.map((stage, idx) => {
            const isCompleted = stage.status === 'Completed' || stage.status === 'Passed';
            const isUpcoming = stage.status === 'Upcoming' || stage.status === 'In Progress';

            return (
              <div 
                key={idx}
                style={{ 
                  background: '#0d1117', 
                  border: `1px solid ${isUpcoming ? '#484f58' : '#30363d'}`, 
                  padding: '1.1rem 1.25rem', 
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  {isCompleted ? (
                    <CheckCircle2 size={20} style={{ color: '#56d364', flexShrink: 0 }} />
                  ) : isUpcoming ? (
                    <Clock size={20} style={{ color: '#f0f6fc', flexShrink: 0 }} />
                  ) : (
                    <Circle size={20} style={{ color: '#484f58', flexShrink: 0 }} />
                  )}

                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#f0f6fc' }}>
                      {stage.name}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#8b949e', marginTop: '0.15rem', display: 'block' }}>
                      {stage.date}
                    </span>
                  </div>
                </div>

                <span 
                  className="badge badge-dark" 
                  style={{ 
                    fontSize: '0.75rem', 
                    color: isCompleted ? '#56d364' : isUpcoming ? '#f0f6fc' : '#8b949e',
                    border: `1px solid ${isUpcoming ? '#484f58' : '#30363d'}`,
                    padding: '0.25rem 0.65rem'
                  }}
                >
                  {stage.status}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
