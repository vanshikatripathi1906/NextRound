import React, { useState } from 'react';
import { 
  Building2, 
  ChevronDown, 
  CheckCircle2, 
  HelpCircle, 
  Star, 
  Plus, 
  X, 
  MessageSquare, 
  Award, 
  FileText,
  Target
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { initialCompanyDNA } from '../data/initialData';
import { CompanyLogo } from './CompanyLogos';

export function CompanyDNA({ companyDNAData = initialCompanyDNA }) {
  const [companies, setCompanies] = useState(() => {
    return companyDNAData && companyDNAData.length > 0 ? companyDNAData : initialCompanyDNA;
  });
  const [selectedCompanyId, setSelectedCompanyId] = useState('google');
  
  const [showAddCompanyModal, setShowAddCompanyModal] = useState(false);
  const [newCompanyNameInput, setNewCompanyNameInput] = useState('');
  const [newCompanyRoleInput, setNewCompanyRoleInput] = useState('Software Engineer');

  const [showAddExperienceModal, setShowAddExperienceModal] = useState(false);
  const [candName, setCandName] = useState('');
  const [candRole, setCandRole] = useState('Software Engineer');
  const [candRating, setCandRating] = useState('4.8');
  const [candAdvice, setCandAdvice] = useState('');
  const [candRoundNotes, setCandRoundNotes] = useState('');

  const [customConcept, setCustomConcept] = useState('');
  const [customQuestion, setCustomQuestion] = useState('');

  const selectedCompany = companies.find(c => c.id === selectedCompanyId) || companies[0];

  const handleAddNewCompanySubmit = (e) => {
    e.preventDefault();
    const nameStr = newCompanyNameInput.trim();
    if (!nameStr) return;

    const customId = nameStr.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const existing = companies.find(c => c.id === customId || c.name.toLowerCase() === nameStr.toLowerCase());

    if (existing) {
      setSelectedCompanyId(existing.id);
    } else {
      const newCompanyObj = {
        id: customId,
        name: nameStr,
        role: newCompanyRoleInput.trim() || 'Software Engineer',
        roundsCount: 4,
        eligibility: `B.Tech / M.Tech in CS, IT or related field. Open for ${nameStr} recruitment.`,
        oaDetails: `Online Assessment: 2 Algorithmic Coding Questions + System Design MCQs for ${nameStr}.`,
        conceptsToFocus: [
          'Data Structures & Algorithm Optimization',
          'System Architecture & LLD Design',
          'Clean Code & Complexity Analysis'
        ],
        questionsAsked: [
          { name: `${nameStr} OA: Array & String Problem`, difficulty: 'Medium', topic: 'Algorithms' },
          { name: `${nameStr} Tech Round: System Design`, difficulty: 'Hard', topic: 'System Design' }
        ],
        experiences: []
      };

      setCompanies(prev => [...prev, newCompanyObj]);
      setSelectedCompanyId(customId);
      confetti({ particleCount: 60, spread: 60 });
    }

    setNewCompanyNameInput('');
    setShowAddCompanyModal(false);
  };

  const handleAddExperienceSubmit = (e) => {
    e.preventDefault();
    if (!candName.trim() || !candAdvice.trim()) return;

    const newExp = {
      id: Date.now(),
      candidateName: candName.trim(),
      date: 'Today (July 2026)',
      role: candRole.trim(),
      rating: parseFloat(candRating) || 4.5,
      rounds: [
        'OA Round: ' + (candRoundNotes.trim() || 'Passed coding assessment'),
        'Tech Round 1: Algorithmic Coding & Problem Decomposition',
        'Tech Round 2: System Architecture & Low-Level Design'
      ],
      advice: candAdvice.trim()
    };

    setCompanies(prev => prev.map(c => {
      if (c.id === selectedCompanyId) {
        const updatedConcepts = customConcept.trim() 
          ? [customConcept.trim(), ...(c.conceptsToFocus || [])]
          : c.conceptsToFocus;

        const updatedQuestions = customQuestion.trim()
          ? [{ name: customQuestion.trim(), difficulty: 'Medium', topic: 'Algorithm' }, ...(c.questionsAsked || [])]
          : c.questionsAsked;

        return {
          ...c,
          conceptsToFocus: updatedConcepts,
          questionsAsked: updatedQuestions,
          experiences: [newExp, ...(c.experiences || [])]
        };
      }
      return c;
    }));

    confetti({ particleCount: 80, spread: 70 });
    setShowAddExperienceModal(false);
    setCandName('');
    setCandAdvice('');
    setCandRoundNotes('');
    setCustomConcept('');
    setCustomQuestion('');
  };

  if (!selectedCompany) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div className="glass-card" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <Building2 size={24} style={{ color: 'var(--color-primary)' }} />
              <h2 style={{ fontSize: '1.4rem' }}>Interview Experience</h2>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Select or type any target company to view eligibility criteria, OA questions, and candidate experiences.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ position: 'relative', minWidth: '200px' }}>
                <select
                  value={selectedCompanyId}
                  onChange={(e) => setSelectedCompanyId(e.target.value)}
                  style={{
                    width: '100%',
                    background: '#161b22',
                    border: '1px solid #484f58',
                    color: '#f0f6fc',
                    padding: '0.65rem 2.2rem 0.65rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.95rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    appearance: 'none',
                    fontFamily: 'var(--font-body)'
                  }}
                >
                  {companies.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown size={18} style={{ position: 'absolute', right: '0.85rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#8b949e' }} />
              </div>

              <button 
                className="btn btn-secondary"
                onClick={() => setShowAddCompanyModal(true)}
                title="Type or add any target company"
                style={{ padding: '0.65rem 0.95rem', fontSize: '0.85rem', whiteSpace: 'nowrap' }}
              >
                + Add Company
              </button>
            </div>

            <button 
              className="btn btn-secondary"
              onClick={() => setShowAddExperienceModal(true)}
              style={{ padding: '0.65rem 1.25rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Plus size={18} style={{ color: '#c9d1d9' }} />
              <span>Share Experience</span>
            </button>
          </div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '2.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem', borderBottom: '1px solid #30363d', paddingBottom: '1.5rem', marginBottom: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ background: '#161b22', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid #30363d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CompanyLogo companyId={selectedCompany.id} size={42} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.65rem', color: '#f0f6fc', margin: 0 }}>
                {selectedCompany.name} Technical Recruitment
              </h3>
              <span className="badge badge-primary" style={{ marginTop: '0.4rem', fontSize: '0.85rem', display: 'inline-block' }}>
                Target Role: {selectedCompany.role}
              </span>
            </div>
          </div>

          <div style={{ background: '#161b22', padding: '0.85rem 1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #30363d', textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Interview Rounds</div>
            <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#f0f6fc' }}>
              {selectedCompany.roundsCount || 4} Rounds
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          <div style={{ background: '#161b22', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #30363d' }}>
            <h4 style={{ fontSize: '1rem', color: '#f0f6fc', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={18} style={{ color: '#3b82f6' }} />
              Eligibility Criteria:
            </h4>
            <p style={{ color: 'var(--text-main)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
              {selectedCompany.eligibility || 'B.Tech / M.Tech in CS or IT with CGPA >= 7.5. No active backlogs.'}
            </p>
          </div>

          <div style={{ background: '#161b22', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #30363d' }}>
            <h4 style={{ fontSize: '1rem', color: '#f0f6fc', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <HelpCircle size={18} style={{ color: '#f59e0b' }} />
              What Was Asked in OA Round:
            </h4>
            <p style={{ color: 'var(--text-main)', fontSize: '0.9rem', lineHeight: '1.6', margin: 0 }}>
              {selectedCompany.oaDetails || 'Online Assessment: 2 Algorithmic Coding Questions + Work Simulation.'}
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.5rem' }}>
          <div style={{ background: '#161b22', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #30363d' }}>
            <h4 style={{ fontSize: '1rem', color: '#f0f6fc', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Target size={18} style={{ color: '#c9d1d9' }} />
              Concepts to Focus More:
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {(selectedCompany.conceptsToFocus || []).map((concept, idx) => (
                <div 
                  key={idx}
                  style={{ 
                    background: '#0d1117', 
                    padding: '1rem 1.25rem', 
                    borderRadius: 'var(--radius-md)', 
                    border: '1px solid #30363d',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justify: 'space-between',
                    gap: '1rem'
                  }}
                >
                  <span style={{ fontSize: '0.9rem', color: '#f0f6fc', fontWeight: '600', lineHeight: '1.4', flex: 1 }}>
                    {concept}
                  </span>
                  
                  <span 
                    className="badge badge-dark" 
                    style={{ 
                      fontSize: '0.7rem', 
                      color: '#c9d1d9', 
                      border: '1px solid #484f58',
                      marginLeft: 'auto',
                      alignSelf: 'flex-start',
                      whiteSpace: 'nowrap',
                      padding: '0.25rem 0.6rem'
                    }}
                  >
                    High Priority
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#161b22', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid #30363d' }}>
            <h4 style={{ fontSize: '1rem', color: '#f0f6fc', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={18} style={{ color: '#c9d1d9' }} />
              Frequently Asked Questions:
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {(selectedCompany.questionsAsked || []).map((q, idx) => (
                <div 
                  key={idx}
                  style={{ 
                    background: '#0d1117', 
                    padding: '1rem 1.25rem', 
                    borderRadius: 'var(--radius-md)', 
                    border: '1px solid #30363d',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justify: 'space-between',
                    gap: '1rem'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.9rem', color: '#f0f6fc', fontWeight: '700', lineHeight: '1.4' }}>
                      {q.name}
                    </div>
                    <span style={{ fontSize: '0.75rem', color: '#8b949e', marginTop: '0.2rem', display: 'block' }}>
                      {q.topic}
                    </span>
                  </div>

                  <span 
                    className="badge badge-dark" 
                    style={{ 
                      fontSize: '0.7rem', 
                      color: '#c9d1d9', 
                      border: '1px solid #484f58',
                      marginLeft: 'auto',
                      alignSelf: 'flex-start',
                      whiteSpace: 'nowrap',
                      padding: '0.25rem 0.6rem'
                    }}
                  >
                    {q.difficulty}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card" style={{ padding: '2.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <MessageSquare size={22} style={{ color: '#c9d1d9' }} />
              <h3 style={{ fontSize: '1.3rem', color: '#f0f6fc', margin: 0 }}>
                Candidate Shared Experiences ({selectedCompany.name})
              </h3>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
              Real interview logs shared by candidates who interviewed at {selectedCompany.name}.
            </p>
          </div>

          <button 
            className="btn btn-secondary"
            onClick={() => setShowAddExperienceModal(true)}
            style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <Plus size={16} /> Share Experience
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {(selectedCompany.experiences || []).map((exp) => (
            <div 
              key={exp.id}
              style={{ 
                background: '#161b22', 
                padding: '1.5rem', 
                borderRadius: 'var(--radius-md)', 
                border: '1px solid #30363d' 
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <div>
                  <h4 style={{ fontSize: '1.1rem', color: '#f0f6fc', margin: 0 }}>
                    {exp.candidateName} — <span style={{ color: '#c9d1d9' }}>{exp.role}</span>
                  </h4>
                  <span style={{ fontSize: '0.75rem', color: '#8b949e' }}>Interviewed in {exp.date}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#f59e0b', fontWeight: '800' }}>
                  <Star size={16} fill="#f59e0b" /> {exp.rating} / 5.0
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div style={{ fontSize: '0.8rem', color: '#8b949e', fontWeight: '700', marginBottom: '0.35rem' }}>Round Breakdown:</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {exp.rounds.map((r, i) => (
                    <div key={i} style={{ fontSize: '0.85rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <CheckCircle2 size={14} style={{ color: '#8b949e', flexShrink: 0 }} />
                      <span>{r}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: '#0d1117', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid #30363d' }}>
                <span style={{ fontSize: '0.75rem', color: '#c9d1d9', fontWeight: '700', display: 'block', marginBottom: '0.2rem' }}>
                  💡 Candidate Key Advice:
                </span>
                <p style={{ color: '#f0f6fc', fontSize: '0.875rem', margin: 0, lineHeight: '1.5' }}>
                  "{exp.advice}"
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddCompanyModal && (
        <div style={{ 
          position: 'fixed', 
          top: 0, left: 0, right: 0, bottom: 0, 
          width: '100vw', height: '100vh', 
          background: 'rgba(9, 13, 22, 0.9)', 
          backdropFilter: 'blur(16px)', 
          zIndex: 2000, 
          display: 'flex', 
          alignItems: 'center', 
          justify: 'center', 
          padding: '1rem' 
        }}>
          <div className="glass-card" style={{ maxWidth: '440px', width: '92%', padding: '2rem', border: '1px solid #484f58', margin: '0 auto', boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#f0f6fc', margin: 0 }}>
                Type Any Target Company
              </h3>
              <button className="btn btn-secondary btn-icon" onClick={() => setShowAddCompanyModal(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddNewCompanySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#c9d1d9', marginBottom: '0.35rem', fontWeight: '600' }}>
                  Company Name *
                </label>
                <input 
                  type="text" 
                  value={newCompanyNameInput}
                  onChange={(e) => setNewCompanyNameInput(e.target.value)}
                  placeholder="e.g. Netflix, Uber, Atlassian"
                  required
                  autoFocus
                  style={{ width: '100%', background: '#161b22', border: '1px solid #30363d', color: '#fff', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.95rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#c9d1d9', marginBottom: '0.35rem', fontWeight: '600' }}>
                  Target Role
                </label>
                <input 
                  type="text" 
                  value={newCompanyRoleInput}
                  onChange={(e) => setNewCompanyRoleInput(e.target.value)}
                  placeholder="e.g. Software Engineer / SDE 2"
                  style={{ width: '100%', background: '#161b22', border: '1px solid #30363d', color: '#fff', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.95rem' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn btn-secondary" style={{ flex: 1, padding: '0.7rem', color: '#fff' }}>
                  Add Company & View Intel
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddCompanyModal(false)} style={{ padding: '0.7rem 1.25rem' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showAddExperienceModal && (
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
          <div 
            className="glass-card" 
            style={{ 
              maxWidth: '540px', 
              width: '94%', 
              padding: '2rem', 
              border: '1px solid #484f58', 
              maxHeight: '90vh', 
              overflowY: 'auto',
              margin: '0 auto',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <h3 style={{ fontSize: '1.25rem', color: '#f0f6fc', margin: 0 }}>
                Share Your {selectedCompany.name} Interview Experience
              </h3>
              <button className="btn btn-secondary btn-icon" onClick={() => setShowAddExperienceModal(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddExperienceSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontWeight: '600' }}>
                  Your Name *
                </label>
                <input 
                  type="text" 
                  value={candName} 
                  onChange={(e) => setCandName(e.target.value)}
                  placeholder="e.g. Vanshika"
                  required
                  style={{ width: '100%', background: '#161b22', border: '1px solid #30363d', color: '#fff', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.95rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontWeight: '600' }}>
                  Role Applied For
                </label>
                <input 
                  type="text" 
                  value={candRole} 
                  onChange={(e) => setCandRole(e.target.value)}
                  placeholder="e.g. Software Engineer / SDE 2"
                  style={{ width: '100%', background: '#161b22', border: '1px solid #30363d', color: '#fff', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.95rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontWeight: '600' }}>
                  What Was Asked in OA Round?
                </label>
                <input 
                  type="text" 
                  value={candRoundNotes} 
                  onChange={(e) => setCandRoundNotes(e.target.value)}
                  placeholder="e.g. LC 207 Course Schedule & String Parsing"
                  style={{ width: '100%', background: '#161b22', border: '1px solid #30363d', color: '#fff', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.95rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#c9d1d9', marginBottom: '0.35rem', fontWeight: '600' }}>
                  Add Concept to Focus More (Optional)
                </label>
                <input 
                  type="text" 
                  value={customConcept} 
                  onChange={(e) => setCustomConcept(e.target.value)}
                  placeholder="e.g. Graph BFS/DFS & Memory Optimization"
                  style={{ width: '100%', background: '#161b22', border: '1px solid #30363d', color: '#fff', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.95rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#c9d1d9', marginBottom: '0.35rem', fontWeight: '600' }}>
                  Add Frequently Asked Question (Optional)
                </label>
                <input 
                  type="text" 
                  value={customQuestion} 
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  placeholder="e.g. LC 146: LRU Cache Implementation"
                  style={{ width: '100%', background: '#161b22', border: '1px solid #30363d', color: '#fff', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.95rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontWeight: '600' }}>
                  Your Key Advice for Future Candidates *
                </label>
                <textarea 
                  rows="3"
                  value={candAdvice} 
                  onChange={(e) => setCandAdvice(e.target.value)}
                  placeholder="e.g. Focus on dry running test cases out loud and explaining space complexity trade-offs!"
                  required
                  style={{ width: '100%', background: '#161b22', border: '1px solid #30363d', color: '#fff', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.95rem', fontFamily: 'var(--font-body)' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="submit" className="btn btn-secondary" style={{ flex: 1, padding: '0.7rem', color: '#fff' }}>
                  Submit Experience & Update Intel
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddExperienceModal(false)} style={{ padding: '0.7rem 1.25rem' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
