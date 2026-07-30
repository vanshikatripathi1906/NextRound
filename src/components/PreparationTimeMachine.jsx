import React, { useState } from 'react';
import { History, Edit3, CheckCircle2, RotateCcw, Flame, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export function PreparationTimeMachine({ onUpdateQuestionsSolved }) {
  // Continuous 1 to 30 Day Slider
  const [currentDay, setCurrentDay] = useState(30); // Default to Day 30
  const [editableQuestions, setEditableQuestions] = useState(340);

  // Concepts to Revisit state
  const [revisitTopics, setRevisitTopics] = useState([
    { id: 1, topic: 'Dynamic Programming (State Compression & 0/1 Knapsack)', lastRevised: '17 days ago', isRevised: false },
    { id: 2, topic: 'Graph Dijkstra & Topological Sort (Kahn Algorithm)', lastRevised: '14 days ago', isRevised: false },
    { id: 3, topic: 'Trie Prefix Trees & Search Auto-Completion', lastRevised: '10 days ago', isRevised: false }
  ]);

  const handleSliderChange = (e) => {
    const day = parseInt(e.target.value) || 1;
    setCurrentDay(day);
    const calculatedQuestions = Math.round(day * 11 + 10);
    setEditableQuestions(calculatedQuestions);
    if (onUpdateQuestionsSolved) {
      onUpdateQuestionsSolved(calculatedQuestions);
    }
  };

  const handleQuestionsInputChange = (val) => {
    const num = Math.max(0, parseInt(val) || 0);
    setEditableQuestions(num);
    const inferredDay = Math.min(30, Math.max(1, Math.round((num - 10) / 11)));
    setCurrentDay(inferredDay);
    if (onUpdateQuestionsSolved) {
      onUpdateQuestionsSolved(num);
    }
  };

  const handleToggleRevise = (id) => {
    setRevisitTopics(prev => prev.map(t => {
      if (t.id === id) {
        const nextState = !t.isRevised;
        if (nextState) confetti({ particleCount: 60, spread: 60 });
        return { ...t, isRevised: nextState, lastRevised: nextState ? 'Just now' : '14 days ago' };
      }
      return t;
    }));
  };

  // Calculated readiness percentage based on solved questions
  const calculatedReadiness = Math.min(100, Math.round((editableQuestions / 400) * 100));

  // LeetCode-style difficulty breakdown
  const easyCount = Math.round(editableQuestions * 0.38);
  const mediumCount = Math.round(editableQuestions * 0.48);
  const hardCount = Math.round(editableQuestions * 0.14);

  return (
    <div className="glass-card mb-6" style={{ padding: '2.25rem' }}>
      
      {/* Title Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <History size={24} style={{ color: 'var(--color-primary)' }} />
          <h2 style={{ fontSize: '1.35rem' }}>Preparation Time Machine & LeetCode Tracker</h2>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
          Scrub each day of preparation (Day 1 to Day 30) to calculate LeetCode questions solved day-wise and track concepts to revisit.
        </p>
      </div>

      {/* Smooth Continuous Day 1 to Day 30 Slider */}
      <div style={{ background: '#161b22', padding: '1.5rem 1.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #30363d', marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.85rem', color: '#f0f6fc', fontSize: '0.9rem', fontWeight: '700' }}>
          <span>Day 1</span>
          <span style={{ color: '#56d364', fontWeight: '800' }}>Day {currentDay}</span>
          <span>Day 30</span>
        </div>

        <input 
          type="range" 
          min="1" 
          max="30" 
          step="1"
          value={currentDay}
          onChange={handleSliderChange}
          style={{ 
            width: '100%', 
            accentColor: '#56d364', 
            cursor: 'pointer',
            height: '8px'
          }} 
        />
      </div>

      {/* LeetCode-Style Questions Tracking & Readiness Stats */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>

        {/* Snapshot Readiness Percentage */}
        <div style={{ background: '#161b22', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #30363d' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Snapshot Readiness
          </div>
          <div style={{ fontSize: '2.4rem', fontWeight: '800', color: '#f0f6fc', marginTop: '0.35rem' }}>
            {calculatedReadiness}%
          </div>
          <span style={{ fontSize: '0.75rem', color: '#56d364', marginTop: '0.2rem', display: 'block' }}>
            Calculated from solved questions
          </span>
        </div>

        {/* EDITABLE Questions Solved */}
        <div style={{ background: '#161b22', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #30363d' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>Total Questions Solved (Editable)</span>
            <Edit3 size={14} style={{ color: '#56d364' }} />
          </div>
          
          <div style={{ marginTop: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input 
              type="number" 
              min="0" 
              value={editableQuestions}
              onChange={(e) => handleQuestionsInputChange(e.target.value)}
              style={{ 
                width: '100%', 
                background: '#0d1117', 
                border: '1px solid #56d364', 
                color: '#56d364', 
                padding: '0.4rem 0.75rem', 
                borderRadius: 'var(--radius-sm)', 
                fontSize: '1.8rem', 
                fontWeight: '800',
                fontFamily: 'var(--font-body)'
              }} 
            />
          </div>
        </div>

        {/* LeetCode Difficulty Breakdown (Easy / Medium / Hard) */}
        <div style={{ background: '#161b22', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #30363d' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.75rem', fontWeight: '600' }}>
            LeetCode Difficulty Breakdown
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            
            {/* Easy */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem' }}>
              <span style={{ color: '#00b8a3', fontWeight: '700' }}>Easy: {easyCount}</span>
              <span style={{ color: '#8b949e' }}>38%</span>
            </div>
            <div style={{ width: '100%', height: '5px', background: '#21262d', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '38%', height: '100%', background: '#00b8a3' }} />
            </div>

            {/* Medium */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginTop: '0.2rem' }}>
              <span style={{ color: '#ffa116', fontWeight: '700' }}>Medium: {mediumCount}</span>
              <span style={{ color: '#8b949e' }}>48%</span>
            </div>
            <div style={{ width: '100%', height: '5px', background: '#21262d', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '48%', height: '100%', background: '#ffa116' }} />
            </div>

            {/* Hard */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginTop: '0.2rem' }}>
              <span style={{ color: '#ef4444', fontWeight: '700' }}>Hard: {hardCount}</span>
              <span style={{ color: '#8b949e' }}>14%</span>
            </div>
            <div style={{ width: '100%', height: '5px', background: '#21262d', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: '14%', height: '100%', background: '#ef4444' }} />
            </div>

          </div>
        </div>

      </div>

      {/* Feature: Concepts to Revisit Section */}
      <div style={{ background: '#161b22', padding: '1.75rem', borderRadius: 'var(--radius-md)', border: '1px solid #30363d' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <RotateCcw size={20} style={{ color: '#f59e0b' }} />
          <h3 style={{ fontSize: '1.15rem', color: '#f0f6fc', margin: 0 }}>
            Concepts to Revisit (Spaced Repetition Practice Queue)
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {revisitTopics.map((item) => (
            <div 
              key={item.id}
              style={{ 
                background: item.isRevised ? 'rgba(86, 211, 100, 0.1)' : '#0d1117', 
                padding: '1rem 1.25rem', 
                borderRadius: 'var(--radius-md)', 
                border: `1px solid ${item.isRevised ? 'rgba(86, 211, 100, 0.4)' : '#30363d'}`,
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}
            >
              <div>
                <div style={{ fontSize: '0.95rem', fontWeight: '700', color: item.isRevised ? '#56d364' : '#f0f6fc' }}>
                  {item.topic}
                </div>
                <span style={{ fontSize: '0.75rem', color: '#8b949e', marginTop: '0.2rem', display: 'block' }}>
                  Last revised: <strong>{item.lastRevised}</strong>
                </span>
              </div>

              <button 
                className={item.isRevised ? 'btn btn-emerald' : 'btn btn-secondary'}
                onClick={() => handleToggleRevise(item.id)}
                style={{ padding: '0.5rem 1rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <CheckCircle2 size={15} />
                <span>{item.isRevised ? 'Revised ✓' : 'Mark Revised'}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
