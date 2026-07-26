import React, { useState } from 'react';
import { Network, Edit3, Check, X, AlertTriangle } from 'lucide-react';

export function KnowledgeGraph({ nodes, onUpdateNodeDetails }) {
  const [selectedNode, setSelectedNode] = useState(null);
  const [editSolved, setEditSolved] = useState(0);
  const [editRequired, setEditRequired] = useState(100);
  const [editSyntax, setEditSyntax] = useState(0);
  const [editTle, setEditTle] = useState(0);
  const [editEdge, setEditEdge] = useState(0);
  const [editMemory, setEditMemory] = useState(0);

  const handleOpenEditor = (node) => {
    setSelectedNode(node);
    setEditSolved(node.questionsSolved || 0);
    setEditRequired(node.requiredQuestions || 100);
    setEditSyntax(node.errors?.syntax || 0);
    setEditTle(node.errors?.tle || 0);
    setEditEdge(node.errors?.edgeCase || 0);
    setEditMemory(node.errors?.memory || 0);
  };

  const handleSaveNode = () => {
    if (!selectedNode) return;
    const solvedCount = Math.max(0, parseInt(editSolved) || 0);
    const requiredCount = Math.max(1, parseInt(editRequired) || 100);
    
    if (onUpdateNodeDetails) {
      onUpdateNodeDetails(selectedNode.id, solvedCount, {
        syntax: parseInt(editSyntax) || 0,
        tle: parseInt(editTle) || 0,
        edgeCase: parseInt(editEdge) || 0,
        memory: parseInt(editMemory) || 0
      }, requiredCount);
    }

    setSelectedNode(null);
  };

  const getNodeColor = (percent) => {
    if (percent >= 80) return '#10b981';
    if (percent >= 60) return '#f59e0b';
    return '#ef4444';
  };

  return (
    <div className="glass-card mb-6" style={{ padding: '2rem' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Network size={24} style={{ color: 'var(--color-primary)' }} />
            <h2 style={{ fontSize: '1.35rem' }}>Interactive Knowledge Graph</h2>
          </div>
        </div>
      </div>

      {/* SVG Knowledge Graph Container */}
      <div style={{ 
        background: '#161b22', 
        borderRadius: 'var(--radius-md)', 
        border: '1px solid #30363d', 
        padding: '1.5rem',
        position: 'relative',
        overflowX: 'auto'
      }}>
        <svg viewBox="0 0 1000 240" style={{ width: '100%', height: '240px', minWidth: '700px' }}>
          
          {/* Prerequisite Connecting Lines */}
          {nodes.map(node => {
            const reqVal = node.requiredQuestions || 100;
            const percent = Math.min(100, Math.round((node.questionsSolved / reqVal) * 100));
            const lineColor = getNodeColor(percent);

            return node.prereqs.map(pId => {
              const prereqNode = nodes.find(n => n.id === pId);
              if (!prereqNode) return null;

              return (
                <line 
                  key={`${prereqNode.id}-${node.id}`}
                  x1={prereqNode.x * 9.5} 
                  y1={prereqNode.y * 2.1} 
                  x2={node.x * 9.5} 
                  y2={node.y * 2.1} 
                  stroke={lineColor}
                  strokeWidth="2.5"
                  strokeDasharray={percent < 60 ? '6 4' : 'none'}
                />
              );
            });
          })}

          {/* Interactive Graph Nodes */}
          {nodes.map(node => {
            const reqVal = node.requiredQuestions || 100;
            const percent = Math.min(100, Math.round((node.questionsSolved / reqVal) * 100));
            const nodeColor = getNodeColor(percent);
            const cx = node.x * 9.5;
            const cy = node.y * 2.1;

            return (
              <g key={node.id} style={{ cursor: 'pointer' }} onClick={() => handleOpenEditor(node)}>
                
                <circle 
                  cx={cx} 
                  cy={cy} 
                  r="34" 
                  fill={nodeColor} 
                  fillOpacity="0.15"
                  stroke={nodeColor}
                  strokeWidth="2"
                />

                <circle 
                  cx={cx} 
                  cy={cy} 
                  r="26" 
                  fill="#0d1117" 
                  stroke={nodeColor}
                  strokeWidth="3"
                />

                <text 
                  x={cx} 
                  y={cy + 5} 
                  textAnchor="middle" 
                  fill="#f0f6fc" 
                  fontSize="13" 
                  fontWeight="800"
                  fontFamily="var(--font-body)"
                >
                  {percent}%
                </text>

                <text 
                  x={cx} 
                  y={cy + 48} 
                  textAnchor="middle" 
                  fill="#c9d1d9" 
                  fontSize="12" 
                  fontWeight="600"
                  fontFamily="var(--font-body)"
                >
                  {node.name}
                </text>

                <text 
                  x={cx} 
                  y={cy + 63} 
                  textAnchor="middle" 
                  fill="#8b949e" 
                  fontSize="10" 
                  fontFamily="var(--font-body)"
                >
                  ({node.questionsSolved}/{reqVal} solved)
                </text>

              </g>
            );
          })}
        </svg>

        <p style={{ textAlign: 'center', color: '#8b949e', fontSize: '0.8rem', marginTop: '0.5rem' }}>
          💡 Click any topic node above to update your solved questions, required target, and error logs.
        </p>
      </div>

      {/* Topics Interactive Practice & Error Logger Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
        gap: '1.25rem', 
        marginTop: '1.75rem' 
      }}>
        {nodes.map(node => {
          const reqVal = node.requiredQuestions || 100;
          const percent = Math.min(100, Math.round((node.questionsSolved / reqVal) * 100));
          const color = getNodeColor(percent);

          return (
            <div 
              key={node.id}
              style={{ 
                background: '#161b22', 
                padding: '1.25rem', 
                borderRadius: 'var(--radius-md)', 
                border: '1px solid #30363d',
                display: 'flex',
                flexDirection: 'column',
                justify: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <h4 style={{ fontSize: '1rem', color: '#f0f6fc', margin: 0 }}>{node.name}</h4>
                  <span style={{ fontSize: '0.85rem', fontWeight: '800', color: color }}>{percent}%</span>
                </div>

                {/* Progress Bar */}
                <div style={{ width: '100%', height: '8px', background: '#21262d', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.75rem' }}>
                  <div style={{ width: `${percent}%`, height: '100%', background: color, transition: 'width 0.4s ease' }} />
                </div>

                <div style={{ fontSize: '0.8rem', color: '#8b949e', display: 'flex', justifyContent: 'space-between' }}>
                  <span>Questions: <strong>{node.questionsSolved} / {reqVal}</strong></span>
                  <span style={{ color: '#f0f6fc', fontWeight: '700' }}>Required: {reqVal}</span>
                </div>

                {/* Errors Breakdown Summary */}
                <div style={{ marginTop: '0.65rem', paddingTop: '0.65rem', borderTop: '1px solid #21262d', fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <span>🐛 Syntax: {node.errors?.syntax || 0}</span>
                  <span>⚡ TLE: {node.errors?.tle || 0}</span>
                  <span>⚠️ Edge: {node.errors?.edgeCase || 0}</span>
                </div>
              </div>

              <button 
                className="btn btn-secondary" 
                onClick={() => handleOpenEditor(node)}
                style={{ width: '100%', marginTop: '1rem', fontSize: '0.8rem', padding: '0.45rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
              >
                <Edit3 size={14} /> Update Solved, Required & Errors
              </button>
            </div>
          );
        })}
      </div>

      {/* Node Interactive Practice & Errors Modal (Centered in Viewport!) */}
      {selectedNode && (
        <div style={{ 
          position: 'fixed', 
          top: 0, 
          left: 0, 
          right: 0,
          bottom: 0,
          width: '100vw', 
          height: '100vh', 
          background: 'rgba(9, 13, 22, 0.9)', 
          backdropFilter: 'blur(16px)', 
          zIndex: 2000,
          display: 'flex',
          alignItems: 'center',
          justify: 'center',
          padding: '1rem'
        }}>
          <div className="glass-card" style={{ maxWidth: '480px', width: '94%', padding: '2rem', border: '1px solid #484f58', margin: '0 auto', boxShadow: '0 20px 50px rgba(0,0,0,0.8)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#f0f6fc', margin: 0 }}>
                Edit {selectedNode.name}
              </h3>
              <button className="btn btn-secondary btn-icon" onClick={() => setSelectedNode(null)}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Solved & Required Grid Inputs */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontWeight: '600' }}>
                    Questions Solved
                  </label>
                  <input 
                    type="number" 
                    min="0" 
                    value={editSolved}
                    onChange={(e) => setEditSolved(e.target.value)}
                    style={{ 
                      width: '100%', 
                      background: '#161b22', 
                      border: '1px solid #30363d', 
                      color: '#fff', 
                      padding: '0.65rem 0.85rem', 
                      borderRadius: 'var(--radius-sm)', 
                      fontSize: '1.1rem',
                      fontWeight: '700'
                    }} 
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#c9d1d9', marginBottom: '0.35rem', fontWeight: '700' }}>
                    Required Target
                  </label>
                  <input 
                    type="number" 
                    min="1" 
                    value={editRequired}
                    onChange={(e) => setEditRequired(e.target.value)}
                    style={{ 
                      width: '100%', 
                      background: '#161b22', 
                      border: '1px solid #484f58', 
                      color: '#56d364', 
                      padding: '0.65rem 0.85rem', 
                      borderRadius: 'var(--radius-sm)', 
                      fontSize: '1.1rem',
                      fontWeight: '800'
                    }} 
                  />
                </div>
              </div>

              <span style={{ fontSize: '0.8rem', color: '#c9d1d9', textAlign: 'center' }}>
                Topic Mastery Score: <strong style={{ color: '#f0f6fc' }}>{Math.min(100, Math.round(((parseInt(editSolved) || 0) / (parseInt(editRequired) || 100)) * 100))}%</strong>
              </span>

              {/* Log Error Types */}
              <div style={{ borderTop: '1px solid #30363d', paddingTop: '1rem' }}>
                <h4 style={{ fontSize: '0.9rem', color: '#f0f6fc', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <AlertTriangle size={16} style={{ color: '#f59e0b' }} />
                  Log Errors & Failures for Analytics:
                </h4>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Syntax / Logic Bugs</label>
                    <input 
                      type="number" 
                      min="0" 
                      value={editSyntax} 
                      onChange={(e) => setEditSyntax(e.target.value)}
                      style={{ width: '100%', background: '#161b22', border: '1px solid #30363d', color: '#fff', padding: '0.45rem', borderRadius: '4px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Time Limit Exceeded (TLE)</label>
                    <input 
                      type="number" 
                      min="0" 
                      value={editTle} 
                      onChange={(e) => setEditTle(e.target.value)}
                      style={{ width: '100%', background: '#161b22', border: '1px solid #30363d', color: '#fff', padding: '0.45rem', borderRadius: '4px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Edge Cases Failed</label>
                    <input 
                      type="number" 
                      min="0" 
                      value={editEdge} 
                      onChange={(e) => setEditEdge(e.target.value)}
                      style={{ width: '100%', background: '#161b22', border: '1px solid #30363d', color: '#fff', padding: '0.45rem', borderRadius: '4px' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Memory Limit (MLE)</label>
                    <input 
                      type="number" 
                      min="0" 
                      value={editMemory} 
                      onChange={(e) => setEditMemory(e.target.value)}
                      style={{ width: '100%', background: '#161b22', border: '1px solid #30363d', color: '#fff', padding: '0.45rem', borderRadius: '4px' }}
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button className="btn btn-secondary" onClick={handleSaveNode} style={{ flex: 1, padding: '0.65rem', color: '#fff' }}>
                  <Check size={16} /> Save & Sync Analytics
                </button>
                <button className="btn btn-secondary" onClick={() => setSelectedNode(null)} style={{ padding: '0.65rem 1rem' }}>
                  Cancel
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
