import React, { useState } from 'react';
import { RotateCcw, Plus, CheckCircle2, Trash2, Edit3, Check, X } from 'lucide-react';
import confetti from 'canvas-confetti';

export function ConceptsToRevisit() {
  const [topics, setTopics] = useState([
    { id: 1, topic: 'Dynamic Programming (State Compression & 0/1 Knapsack)', note: 'Review state space reduction for 2D DP tables.', lastRevised: '17 days ago', isRevised: false },
    { id: 2, topic: 'Graph Dijkstra & Topological Sort (Kahn Algorithm)', note: 'Practice dry-running cycle detection on directed graphs.', lastRevised: '14 days ago', isRevised: false },
    { id: 3, topic: 'Trie Prefix Trees & Search Auto-Completion', note: 'Focus on handling memory deallocation & child node maps.', lastRevised: '10 days ago', isRevised: false }
  ]);

  const [newTopic, setNewTopic] = useState('');
  const [newNote, setNewNote] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editTopicText, setEditTopicText] = useState('');
  const [editNoteText, setEditNoteText] = useState('');

  const handleAddTopic = (e) => {
    e.preventDefault();
    if (!newTopic.trim()) return;

    const item = {
      id: Date.now(),
      topic: newTopic.trim(),
      note: newNote.trim() || 'Custom revision note',
      lastRevised: 'Just added',
      isRevised: false
    };

    setTopics(prev => [item, ...prev]);
    confetti({ particleCount: 50, spread: 60 });
    setNewTopic('');
    setNewNote('');
    setShowAddForm(false);
  };

  const handleToggleRevised = (id) => {
    setTopics(prev => prev.map(t => {
      if (t.id === id) {
        const nextState = !t.isRevised;
        if (nextState) confetti({ particleCount: 60, spread: 60 });
        return { ...t, isRevised: nextState, lastRevised: nextState ? 'Just now' : '14 days ago' };
      }
      return t;
    }));
  };

  const handleDeleteTopic = (id) => {
    setTopics(prev => prev.filter(t => t.id !== id));
  };

  const handleStartEdit = (t) => {
    setEditingId(t.id);
    setEditTopicText(t.topic);
    setEditNoteText(t.note);
  };

  const handleSaveEdit = (id) => {
    setTopics(prev => prev.map(t => {
      if (t.id === id) {
        return {
          ...t,
          topic: editTopicText.trim() || t.topic,
          note: editNoteText.trim() || t.note
        };
      }
      return t;
    }));
    setEditingId(null);
  };

  return (
    <div className="glass-card mb-6" style={{ padding: '2.25rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <RotateCcw size={24} style={{ color: 'var(--color-primary)' }} />
            <h2 style={{ fontSize: '1.35rem' }}>Concepts to Revisit & Study Notes</h2>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            User-editable revision queue. Add custom study notes, edit existing concepts, or mark items as revised.
          </p>
        </div>

        <button 
          className="btn btn-secondary"
          onClick={() => setShowAddForm(!showAddForm)}
          style={{ padding: '0.6rem 1.25rem', fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          {showAddForm ? <X size={16} /> : <Plus size={16} />}
          <span>{showAddForm ? 'Cancel' : 'Add Concept to Revisit'}</span>
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleAddTopic} style={{ background: '#161b22', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #30363d', marginBottom: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#c9d1d9', marginBottom: '0.35rem', fontWeight: '600' }}>
              Concept Name *
            </label>
            <input 
              type="text" 
              value={newTopic} 
              onChange={(e) => setNewTopic(e.target.value)}
              placeholder="e.g. Slanted Matrix DP or Disjoint Set Union"
              required
              style={{ width: '100%', background: '#0d1117', border: '1px solid #30363d', color: '#fff', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.95rem' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#c9d1d9', marginBottom: '0.35rem', fontWeight: '600' }}>
              Personal Study Note / Reminder
            </label>
            <input 
              type="text" 
              value={newNote} 
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="e.g. Remember to handle path compression optimization."
              style={{ width: '100%', background: '#0d1117', border: '1px solid #30363d', color: '#fff', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.95rem' }}
            />
          </div>

          <button type="submit" className="btn btn-secondary" style={{ alignSelf: 'flex-start', padding: '0.6rem 1.2rem', color: '#fff' }}>
            Save Concept to Queue
          </button>
        </form>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
        {topics.map((t) => {
          const isEditing = editingId === t.id;

          return (
            <div 
              key={t.id}
              style={{ 
                background: t.isRevised ? 'rgba(86, 211, 100, 0.08)' : '#161b22', 
                padding: '1.5rem', 
                borderRadius: 'var(--radius-md)', 
                border: `1px solid ${t.isRevised ? 'rgba(86, 211, 100, 0.4)' : '#30363d'}`,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.75rem' }}>
                
                <div style={{ flex: 1 }}>
                  {!isEditing ? (
                    <div>
                      <h4 style={{ fontSize: '1.05rem', color: t.isRevised ? '#56d364' : '#f0f6fc', margin: 0, fontWeight: '700' }}>
                        {t.topic}
                      </h4>
                      <p style={{ fontSize: '0.875rem', color: '#c9d1d9', marginTop: '0.35rem', marginBottom: '0.2rem', lineHeight: '1.4' }}>
                        📝 <strong>Note:</strong> {t.note}
                      </p>
                      <span style={{ fontSize: '0.75rem', color: '#8b949e' }}>
                        Last revised: {t.lastRevised}
                      </span>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                      <input 
                        type="text" 
                        value={editTopicText}
                        onChange={(e) => setEditTopicText(e.target.value)}
                        style={{ width: '100%', background: '#0d1117', border: '1px solid #56d364', color: '#fff', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.95rem', fontWeight: '700' }}
                      />
                      <input 
                        type="text" 
                        value={editNoteText}
                        onChange={(e) => setEditNoteText(e.target.value)}
                        style={{ width: '100%', background: '#0d1117', border: '1px solid #484f58', color: '#fff', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.95rem' }}
                      />
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  {!isEditing ? (
                    <>
                      <button 
                        className="btn btn-secondary btn-icon"
                        onClick={() => handleStartEdit(t)}
                        title="Edit Concept & Note"
                      >
                        <Edit3 size={15} />
                      </button>

                      <button 
                        className={t.isRevised ? 'btn btn-emerald' : 'btn btn-secondary'}
                        onClick={() => handleToggleRevised(t.id)}
                        style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                      >
                        <CheckCircle2 size={15} />
                        <span>{t.isRevised ? 'Revised ✓' : 'Mark Revised'}</span>
                      </button>

                      <button 
                        className="btn btn-secondary btn-icon"
                        onClick={() => handleDeleteTopic(t.id)}
                        title="Delete Concept"
                        style={{ color: '#ef4444' }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </>
                  ) : (
                    <button 
                      className="btn btn-primary"
                      onClick={() => handleSaveEdit(t.id)}
                      style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                    >
                      <Check size={15} />
                      <span>Save Edit</span>
                    </button>
                  )}
                </div>

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
