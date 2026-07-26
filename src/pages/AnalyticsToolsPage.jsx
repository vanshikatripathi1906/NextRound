import React from 'react';
import { ConceptsToRevisit } from '../components/ConceptsToRevisit';
import { MistakeAnalytics } from '../components/MistakeAnalytics';
import { StressMeter } from '../components/StressMeter';

export function AnalyticsToolsPage({ nodes }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* 1. User-Editable Concepts to Revisit & Study Notes */}
      <ConceptsToRevisit />

      {/* 2. Mistakes & Error Analytics (Synced with DSA Topic Error Logs) */}
      <MistakeAnalytics nodes={nodes} />

      {/* 3. Stress & Confidence Meter */}
      <StressMeter />

    </div>
  );
}
