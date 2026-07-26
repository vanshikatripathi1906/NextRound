import React from 'react';
import { InterviewArchive } from '../components/InterviewArchive';

export function InterviewReplayPage({ replayList }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Interactive Past Interview Round Audio & Moment Logs */}
      <InterviewArchive replayList={replayList} />

    </div>
  );
}
