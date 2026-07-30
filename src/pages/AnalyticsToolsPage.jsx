import React from 'react';
import { PreparationTimeMachine } from '../components/PreparationTimeMachine';
import { MistakeAnalytics } from '../components/MistakeAnalytics';
import { StressMeter } from '../components/StressMeter';

export function AnalyticsToolsPage({ nodes, onUpdateQuestionsSolved }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <PreparationTimeMachine onUpdateQuestionsSolved={onUpdateQuestionsSolved} />
      <MistakeAnalytics nodes={nodes} />
      <StressMeter />
    </div>
  );
}
