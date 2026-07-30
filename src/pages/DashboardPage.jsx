import React from 'react';
import { Header } from '../components/Header';
import { InterviewCountdown } from '../components/InterviewCountdown';
import { TimelineTracker } from '../components/TimelineTracker';
import { HeatmapCalendar } from '../components/HeatmapCalendar';
import { initialInterviewPipeline } from '../data/initialData';

export function DashboardPage({ 
  userProfile, 
  nodes,
  skills,
  onUpdateTodaysFocus,
  onCheckInStreak,
  onUpdateMissions,
  heatmapData,
  onOpenJourneyReplay,
  onOpenFocusTimer
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Header 
        userProfile={userProfile} 
        nodes={nodes}
        skills={skills}
        onUpdateTodaysFocus={onUpdateTodaysFocus}
        onCheckInStreak={onCheckInStreak}
        onUpdateMissions={onUpdateMissions}
        onOpenJourneyReplay={onOpenJourneyReplay}
        onOpenFocusTimer={onOpenFocusTimer}
      />

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', 
        gap: '1.75rem',
        alignItems: 'stretch'
      }}>
        <InterviewCountdown />
        <TimelineTracker pipelineStages={initialInterviewPipeline} />
      </div>

      <HeatmapCalendar heatmapData={heatmapData} />
    </div>
  );
}
