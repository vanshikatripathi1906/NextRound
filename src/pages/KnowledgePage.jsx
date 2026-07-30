import React from 'react';
import { KnowledgeGraph } from '../components/KnowledgeGraph';
import { ReadinessRadar } from '../components/ReadinessRadar';
import { ConfidenceDecay } from '../components/ConfidenceDecay';

export function KnowledgePage({ 
  nodes, 
  onUpdateNodeDetails,
  skills,
  onSkillsChange
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <KnowledgeGraph 
        nodes={nodes} 
        onUpdateNodeDetails={onUpdateNodeDetails} 
      />

      <ReadinessRadar 
        skills={skills}
        onSkillsChange={onSkillsChange}
      />

      <ConfidenceDecay nodes={nodes} />
    </div>
  );
}
