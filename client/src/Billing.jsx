import React, { useState } from 'react';

export default function Billing({ customer, onBack }) {
  const [insuranceData, setInsuranceData] = useState({
    providerName: 'Blue Cross Blue Shield',
    policyNumber: 'WFM-8839201',
    groupNumber: 'GRP-9941',
    copay: '$0 (WholeCare Preventive Tier Covered)'
  });

  const [invoices] = useState([
    { id: 'INV-2026-003', date: 'Mar 15, 2026', service: 'Nutritional Assessment', provider: 'Dr. Alice Smith', status: 'Covered by Insurance', amount: '$0.00' },
    { id: 'INV-2026-002', date: 'Feb 20, 2026', service: 'Lifestyle & Supplement Review', provider: 'Coach Brian Miller', status: 'Covered by Insurance', amount: '$0.00' },
    { id: 'INV-2026-001', date: 'Jan 12, 2026', service: 'Initial Wellness Intake', provider: 'Dr. Claire Vance', status: 'Covered by Insurance', amount: '$0.00' }
  ]);

  return (
    <div style={{ backgroundColor: '#F4F1DE', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '950px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Header */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '1.5rem 2rem', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
          <div>
            <h1 style={{ margin: 0, color: '#1A531A', fontSize: '1.5rem', fontWeight: '700' }}>Insurance Coverage & Billing History</h1>
            <p style={{ margin: '0.25rem 0 0 0', color: '#4A5568', fontSize: '0.85rem' }}>Verify preventive care coverage and download past session statements</p>
          </div>
          <button onClick={onBack} style={{ backgroundColor: '#EDF2F7', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', color: '#2D3748', fontSize: '0.85rem' }}>
            ← Back to Dashboard
          </button>
        </div>

        {/* Coverage Overview Card */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '1.5rem', border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem' }}>
            <h2 style={{ margin: 0, color: '#1A531A', fontSize: '1.15rem', fontWeight: '600' }}>Active Health Plan Details</h2>
            <span style={{ backgroundColor: '#DEF7EC', color: '#03543F', fontSize: '0.75rem', fontWeight: '700', padding: '0.25rem 0.65rem', borderRadius: '12px' }}>
              ✓ Verified & Active
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#718096', fontWeight: '600', textTransform: 'uppercase' }}>Insurance Carrier</span>
              <p style={{ margin: '0.25rem 0 0 0', fontWeight: '600', color: '#2D3748' }}>{insuranceData.providerName}</p>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#718096', fontWeight: '600', textTransform: 'uppercase' }}>Member Policy ID</span>
              <p style={{ margin: '0.25rem 0 0 0', fontWeight: '600', color: '#2D3748' }}>{insuranceData.policyNumber}</p>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#718096', fontWeight: '600', textTransform: 'uppercase' }}>Group Number</span>
              <p style={{ margin: '0.25rem 0 0 0', fontWeight: '600', color: '#2D3748' }}>{insuranceData.groupNumber}</p>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#718096', fontWeight: '600', textTransform: 'uppercase' }}>Consultation Copay</span>
              <p style={{ margin: '0.25rem 0 0 0', fontWeight: '700', color: '#1A531A' }}>{insuranceData.copay}</p>
            </div>
          </div>
        </div>

        {/* Billing Statements Table */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '1.5rem', border: '1px solid #E2E8F0' }}>
          <h2 style={{ margin: '0 0 1rem 0', color: '#1A531A', fontSize: '1.15rem', fontWeight: '600' }}>Recent Statements & Invoices</h2>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #EDF2F7', color: '#718096', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                <th style={{ padding: '0.75rem 0.5rem' }}>Statement ID</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>Date</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>Service Description</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>Specialist</th>
                <th style={{ padding: '0.75rem 0.5rem' }}>Status</th>
                <th style={{ padding: '0.75rem 0.5rem', textAlign: 'right' }}>Patient Responsibility</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} style={{ borderBottom: '1px solid #EDF2F7' }}>
                  <td style={{ padding: '0.85rem 0.5rem', fontWeight: '600', color: '#2D3748' }}>{inv.id}</td>
                  <td style={{ padding: '0.85rem 0.5rem', color: '#4A5568' }}>{inv.date}</td>
                  <td style={{ padding: '0.85rem 0.5rem', color: '#2D3748', fontWeight: '500' }}>{inv.service}</td>
                  <td style={{ padding: '0.85rem 0.5rem', color: '#4A5568' }}>{inv.provider}</td>
                  <td style={{ padding: '0.85rem 0.5rem' }}>
                    <span style={{ backgroundColor: '#DEF7EC', color: '#03543F', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '600' }}>
                      {inv.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 0.5rem', textAlign: 'right', fontWeight: '700', color: '#1A531A' }}>
                    {inv.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}