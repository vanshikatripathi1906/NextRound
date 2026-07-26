import React from 'react';
import { KnowledgeGraph } from '../components/KnowledgeGraph';
import { ReadinessRadar } from '../components/ReadinessRadar';

export function KnowledgePage({ 
  nodes, 
  onUpdateNodeDetails, 
  skills, 
  onSkillsChange
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* 1. Interactive Knowledge Graph with 100-Question Scaling & Error Logs */}
      <KnowledgeGraph 
        nodes={nodes} 
        onUpdateNodeDetails={onUpdateNodeDetails}
      />

      {/* 2. Readiness Radar */}
      <ReadinessRadar 
        initialSkills={skills} 
        onSkillsChange={onSkillsChange}
      />

    </div>
  );
}
