import React from 'react';
import { CompanyDNA } from '../components/CompanyDNA';

export function CompanyDnaPage({ companyDNAData }) {
  return (
    <div>
      <CompanyDNA companyDNAData={companyDNAData} />
    </div>
  );
}
