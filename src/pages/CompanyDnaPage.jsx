import React from 'react';
import { CompanyDNA } from '../components/CompanyDNA';

export function CompanyDnaPage({ companyDNAData, skills, onSkillsChange, onUpdateTodaysFocus }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* 100% Interactive Company DNA Research Center */}
      <CompanyDNA 
        companyDNAData={companyDNAData} 
        skills={skills} 
        onSkillsChange={onSkillsChange}
        onUpdateTodaysFocus={onUpdateTodaysFocus}
      />

    </div>
  );
}
