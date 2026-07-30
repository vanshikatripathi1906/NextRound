import React, { useState } from 'react';
import { History, Sparkles, CheckCircle2, ChevronRight, BookOpen, Plus, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export function PreparationTimeMachine({ onUpdateQuestionsSolved }) {
  const [currentDay, setCurrentDay] = useState(30);

  const [revisionNotes, setRevisionNotes] = useState([
    { id: 1, topic: 'Graph BFS & Cycle Detection', note: 'Remember to track visited array AND parent node in undirected graphs.', priority: 'High' },
    { id: 2, topic: 'Sliding Window (Variable Size)', note: 'Shrink left pointer inside while loop as long as condition is violated.', priority: 'High' },
    { id: 3, topic: 'LRU Cache Design', note: 'Combine HashMap for O(1) lookups with Doubly Linked List for O(1) eviction.', priority: 'Medium' }
  ]);

  const [newTopic, setNewTopic] = useState('');
  const [newNote, setNewNote] = useState('');
  const [newPriority, setNewPriority] = useState('High');
  const [showAddNote, setShowAddNote] = useState(false);

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newTopic.trim() || !newNote.trim()) return;

    const item = {
      id: Date.now(),
      topic: newTopic.trim(),
      note: newNote.trim(),
      priority: newPriority
    };

    setRevisionNotes(prev => [item, ...prev]);
    confetti({ particleCount: 50, spread: 50 });
    setNewTopic('');
    setNewNote('');
    setShowAddNote(false);
  };

  const handleDeleteNote = (id) => {
    setRevisionNotes(prev => prev.filter(n => n.id !== id));
  };

  const totalQuestionsSolved = Math.round((currentDay / 30) * 240);

  const handleSliderChange = (e) => {
    const dayVal = parseInt(e.target.value, 10);
    setCurrentDay(dayVal);
    const solved = Math.round((dayVal / 30) * 240);
    if (onUpdateQuestionsSolved) {
      onUpdateQuestionsSolved(solved);
    }
  };

  const dayReadiness = Math.min(98, Math.max(15, Math.round((currentDay / 30) * 88)));

  const easySolved = Math.round(totalQuestionsSolved * 0.42);
  const mediumSolved = Math.round(totalQuestionsSolved * 0.45);
  const hardSolved = Math.max(0, totalQuestionsSolved - (easySolved + mediumSolved));

  return (
    <div className="glass-card mb-6" style={{ padding: '2.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <BookOpen size={24} style={{ color: 'var(--color-primary)' }} />
            <h2 style={{ fontSize: '1.4rem' }}>Study Revision Notes & Key Concepts</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Review candidate key notes, edge case checklists, and custom revision topics for interviews.
          </p>
        </div>

        <button 
          className="btn btn-secondary"
          onClick={() => setShowAddNote(!showAddNote)}
          style={{ padding: '0.6rem 1.1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
        >
          <Plus size={16} /> Add Concept Note
        </button>
      </div>

      {showAddNote && (
        <form onSubmit={handleAddNote} style={{ background: '#161b22', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #484f58', marginBottom: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#c9d1d9', marginBottom: '0.35rem', fontWeight: '600' }}>Topic / Problem Name *</label>
            <input 
              type="text" 
              value={newTopic} 
              onChange={(e) => setNewTopic(e.target.value)}
              placeholder="e.g. Graph BFS & Dijkstra's Shortest Path"
              required
              style={{ width: '100%', background: '#0d1117', border: '1px solid #30363d', color: '#fff', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#c9d1d9', marginBottom: '0.35rem', fontWeight: '600' }}>Key Takeaway / Revision Note *</label>
            <textarea 
              rows="2"
              value={newNote} 
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="e.g. Always check for cycle in graph before performing topological sort..."
              required
              style={{ width: '100%', background: '#0d1117', border: '1px solid #30363d', color: '#fff', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.9rem', fontFamily: 'var(--font-body)' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#c9d1d9', marginBottom: '0.35rem', fontWeight: '600' }}>Priority Level</label>
              <select 
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value)}
                style={{ width: '100%', background: '#0d1117', border: '1px solid #30363d', color: '#fff', padding: '0.6rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.85rem' }}
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', alignSelf: 'flex-end' }}>
              <button type="submit" className="btn btn-secondary" style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem', color: '#fff' }}>
                Save Concept Note
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowAddNote(false)} style={{ padding: '0.65rem 1rem', fontSize: '0.85rem' }}>
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {revisionNotes.map(n => (
          <div 
            key={n.id}
            style={{ 
              background: '#161b22', 
              padding: '1.35rem', 
              borderRadius: 'var(--radius-md)', 
              border: '1px solid #30363d',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                <h4 style={{ fontSize: '1rem', color: '#f0f6fc', margin: 0, fontWeight: '700' }}>{n.topic}</h4>
                <span className="badge badge-dark" style={{ fontSize: '0.7rem', color: n.priority === 'High' ? '#ef4444' : '#f59e0b', border: `1px solid ${n.priority === 'High' ? '#ef4444' : '#f59e0b'}` }}>
                  {n.priority}
                </span>
              </div>
              <p style={{ color: 'var(--text-main)', fontSize: '0.875rem', lineHeight: '1.5', margin: 0 }}>
                "{n.note}"
              </p>
            </div>

            <button 
              className="btn btn-secondary btn-icon" 
              onClick={() => handleDeleteNote(n.id)}
              style={{ alignSelf: 'flex-end', marginTop: '1rem', padding: '0.35rem' }}
              title="Delete Note"
            >
              <Trash2 size={14} style={{ color: '#8b949e' }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
