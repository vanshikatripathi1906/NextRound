import React, { useState } from 'react';
import { FileCode, ArrowRight, PlusCircle, MinusCircle, FileText } from 'lucide-react';

export function ResumeEvolution({ resumeList }) {
  const [selectedIdx, setSelectedIdx] = useState(2); // Placed version

  const selectedResume = resumeList[selectedIdx];

  return (
    <div className="glass-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FileCode size={22} style={{ color: 'var(--color-primary)' }} />
            <h2 style={{ fontSize: '1.25rem' }}>Resume Evolution Visual Diff</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Track how your resume bullet points evolved from V1 to your final offer-landing version!
          </p>
        </div>

        {/* Version Switchers */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {resumeList.map((res, idx) => (
            <button
              key={res.version}
              className={`btn ${selectedIdx === idx ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setSelectedIdx(idx)}
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
            >
              {res.version}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Diff Box */}
      <div style={{ background: 'rgba(9, 13, 22, 0.7)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <div style={{ fontWeight: '700', fontSize: '1.1rem', marginBottom: '0.35rem', color: 'var(--color-primary)' }}>
          {selectedResume.version}
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
          💡 <em>{selectedResume.highlight}</em>
        </p>

        {/* Git Style Visual Diff */}
        <div style={{ background: '#0d1117', padding: '1rem', borderRadius: 'var(--radius-sm)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {selectedResume.diff.map((item, i) => {
            const isAdded = item.type === 'added';
            return (
              <div 
                key={i} 
                style={{ 
                  background: isAdded ? 'rgba(46, 160, 67, 0.15)' : 'rgba(248, 81, 73, 0.15)',
                  color: isAdded ? '#7ee787' : '#ffa198',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '4px',
                  borderLeft: `4px solid ${isAdded ? '#2ea043' : '#f85149'}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                {isAdded ? <PlusCircle size={14} /> : <MinusCircle size={14} />}
                <span>{item.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
