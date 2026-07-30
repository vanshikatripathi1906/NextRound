import React, { useState, useEffect } from 'react';
import { 
  initialUserProfile, 
  initialKnowledgeGraphNodes, 
  initialRadarSkills, 
  initialCompanyDNA, 
  initialHeatmapData 
} from './data/initialData';

import { Navbar } from './components/Navbar';
import { FocusTimer } from './components/FocusTimer';
import { JourneyReplay } from './components/JourneyReplay';
import { UserProfileModal } from './components/UserProfileModal';

import { DashboardPage } from './pages/DashboardPage';
import { KnowledgePage } from './pages/KnowledgePage';
import { CompanyDnaPage } from './pages/CompanyDnaPage';
import { AnalyticsToolsPage } from './pages/AnalyticsToolsPage';
import confetti from 'canvas-confetti';

export default function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('nextround_userProfile');
    let profile = {
      ...initialUserProfile,
      name: 'Vanshika',
      phone: '+91 9876543210',
      isCheckedInToday: false
    };

    if (saved) {
      try { 
        profile = { ...profile, ...JSON.parse(saved) }; 
      } catch (e) {}
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const lastLogin = localStorage.getItem('nextround_lastLoginDate') || profile.lastLoginDate;

    if (lastLogin) {
      const lastDate = new Date(lastLogin);
      const todayDate = new Date(todayStr);
      const diffTime = todayDate.getTime() - lastDate.getTime();
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 1) {
        profile.currentStreak = 0;
        profile.isCheckedInToday = false;
      } else if (diffDays === 1) {
        profile.isCheckedInToday = false;
      }
    }

    localStorage.setItem('nextround_lastLoginDate', todayStr);
    profile.lastLoginDate = todayStr;
    return profile;
  });

  const [nodes, setNodes] = useState(() => {
    const saved = localStorage.getItem('nextround_nodes');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return initialKnowledgeGraphNodes;
  });

  const [skills, setSkills] = useState(() => {
    const saved = localStorage.getItem('nextround_skills');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return initialRadarSkills;
  });

  const [companyDNAData, setCompanyDNAData] = useState(() => {
    const saved = localStorage.getItem('nextround_companyDNA');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return initialCompanyDNA;
  });
  
  const [showJourneyReplay, setShowJourneyReplay] = useState(false);
  const [showFocusTimer, setShowFocusTimer] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  useEffect(() => {
    localStorage.setItem('nextround_userProfile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('nextround_nodes', JSON.stringify(nodes));
  }, [nodes]);

  useEffect(() => {
    localStorage.setItem('nextround_skills', JSON.stringify(skills));
  }, [skills]);

  useEffect(() => {
    localStorage.setItem('nextround_companyDNA', JSON.stringify(companyDNAData));
  }, [companyDNAData]);

  useEffect(() => {
    const hasPrompted = localStorage.getItem('nextround_hasPromptedName');
    if (!hasPrompted) {
      setShowProfileModal(true);
      setIsFirstVisit(true);
    }
  }, []);

  const handleManualSaveState = () => {
    localStorage.setItem('nextround_userProfile', JSON.stringify(userProfile));
    localStorage.setItem('nextround_nodes', JSON.stringify(nodes));
    localStorage.setItem('nextround_skills', JSON.stringify(skills));
    localStorage.setItem('nextround_companyDNA', JSON.stringify(companyDNAData));

    confetti({ particleCount: 70, spread: 60 });
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 3000);
  };

  const handleSaveProfile = (newInfo) => {
    setUserProfile(prev => {
      const isAlreadyCheckedIn = prev.isCheckedInToday;
      return {
        ...prev,
        name: newInfo.name,
        phone: newInfo.phone,
        isCheckedInToday: true,
        currentStreak: isAlreadyCheckedIn ? prev.currentStreak : Math.max(1, prev.currentStreak + 1)
      };
    });

    localStorage.setItem('nextround_hasPromptedName', 'true');

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    setIsFirstVisit(false);
    setShowProfileModal(false);
  };

  const handleCheckInStreak = () => {
    setUserProfile(prev => {
      const nextCheckInState = !prev.isCheckedInToday;
      const nextStreak = nextCheckInState ? prev.currentStreak + 1 : Math.max(0, prev.currentStreak - 1);
      return {
        ...prev,
        currentStreak: nextStreak,
        isCheckedInToday: nextCheckInState
      };
    });
  };

  const handleUpdateStudyTime = (newStudyTime) => {
    setUserProfile(prev => ({ ...prev, estimatedStudyTime: newStudyTime }));
  };

  const handleUpdateTodaysFocus = (newFocus) => {
    setUserProfile(prev => ({ ...prev, todaysFocus: newFocus }));
  };

  const handleUpdateNodeDetails = (nodeId, newSolvedCount, newErrors, newRequiredCount) => {
    setNodes(prev => prev.map(n => {
      if (n.id === nodeId) {
        const solved = Math.max(0, newSolvedCount);
        const required = Math.max(1, newRequiredCount || n.requiredQuestions || 100);
        const percent = Math.min(100, Math.round((solved / required) * 100));
        const color = percent >= 80 ? '#10b981' : percent >= 60 ? '#f59e0b' : '#ef4444';
        return {
          ...n,
          questionsSolved: solved,
          requiredQuestions: required,
          mastery: percent,
          color: color,
          errors: newErrors
        };
      }
      return n;
    }));
  };

  const handleUpdateQuestionsSolved = (newSolved) => {
    const readiness = Math.min(100, Math.round((newSolved / 450) * 100));
    setUserProfile(prev => ({ ...prev, readinessPercentage: readiness }));
  };

  return (
    <div className="app-container">
      <Navbar 
        activePage={activePage} 
        setActivePage={setActivePage}
        onOpenFocusTimer={() => setShowFocusTimer(true)}
        onOpenJourneyReplay={() => setShowJourneyReplay(true)}
        onOpenProfileModal={() => setShowProfileModal(true)}
        onSaveState={handleManualSaveState}
        isSavedNotice={isSavedNotice}
        userName={userProfile.name}
      />

      <main>
        {activePage === 'dashboard' && (
          <DashboardPage 
            userProfile={userProfile}
            nodes={nodes}
            skills={skills}
            onUpdateTodaysFocus={handleUpdateTodaysFocus}
            onCheckInStreak={handleCheckInStreak}
            heatmapData={initialHeatmapData}
            onOpenJourneyReplay={() => setShowJourneyReplay(true)}
            onOpenFocusTimer={() => setShowFocusTimer(true)}
          />
        )}

        {activePage === 'knowledge' && (
          <KnowledgePage 
            nodes={nodes}
            onUpdateNodeDetails={handleUpdateNodeDetails}
            skills={skills}
            onSkillsChange={setSkills}
          />
        )}

        {activePage === 'companies' && (
          <CompanyDnaPage 
            companyDNAData={companyDNAData}
            skills={skills}
            onSkillsChange={setSkills}
            onUpdateTodaysFocus={handleUpdateTodaysFocus}
          />
        )}

        {activePage === 'analytics' && (
          <AnalyticsToolsPage 
            nodes={nodes}
            onUpdateQuestionsSolved={handleUpdateQuestionsSolved}
          />
        )}
      </main>

      {showJourneyReplay && (
        <JourneyReplay onClose={() => setShowJourneyReplay(false)} />
      )}

      {showFocusTimer && (
        <FocusTimer 
          onClose={() => setShowFocusTimer(false)} 
          onUpdateStudyTime={handleUpdateStudyTime}
        />
      )}

      {showProfileModal && (
        <UserProfileModal 
          userProfile={userProfile}
          onSaveProfile={handleSaveProfile}
          onClose={() => setShowProfileModal(false)}
          isFirstVisit={isFirstVisit}
        />
      )}

    </div>
  );
}
