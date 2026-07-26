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
  heatmapData,
  onOpenJourneyReplay,
  onOpenFocusTimer
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* 1. Top Section: Header with Interview Readiness, Current Streak & Today's Mission ABOVE */}
      <Header 
        userProfile={userProfile} 
        nodes={nodes}
        skills={skills}
        onUpdateTodaysFocus={onUpdateTodaysFocus}
        onCheckInStreak={onCheckInStreak}
        onOpenJourneyReplay={onOpenJourneyReplay}
        onOpenFocusTimer={onOpenFocusTimer}
      />

      {/* 2. Side-by-Side 2-Column Grid: Target Interview Countdown (Left) & Interview Timeline (Right) */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', 
        gap: '1.75rem',
        alignItems: 'stretch'
      }}>
        {/* Target Interview Countdown */}
        <InterviewCountdown />

        {/* Interview Timeline */}
        <TimelineTracker pipelineStages={initialInterviewPipeline} />
      </div>

      {/* 3. Heatmap Activity Calendar */}
      <HeatmapCalendar heatmapData={heatmapData} />

    </div>
  );
}
