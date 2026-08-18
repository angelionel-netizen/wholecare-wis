import React, { useState } from 'react';

export default function ProviderPortal({ currentCustomer, latestAppointment, onSwitchToCustomer }) {
  const defaultQueue = [
    {
      id: 'APT-101',
      patientName: currentCustomer ? `${currentCustomer.firstName} ${currentCustomer.lastName}`.trim() : 'Active Patient',
      time: latestAppointment ? `${latestAppointment.date} • ${latestAppointment.time}` : '10:00 AM - 10:45 AM',
      type: latestAppointment?.specialty || 'Initial Nutrition Assessment',
      room: 'Room 2 (Flexible Store Space)',
      status: 'Confirmed',
      consentStatus: { 
        notesAllowed: currentCustomer?.allowNotes ?? true, 
        purchaseHistoryAllowed: currentCustomer?.allowPurchaseHistory ?? true 
      },
      clinicalNotes: latestAppointment?.notes || 'Client registered for whole-food dietary guidance and wellness assessment.',
      recommendedProducts: ['Organic Cold-Pressed Olive Oil', 'Wild Alaskan Sockeye Salmon', 'Turmeric Curcumin Extracts']
    },
    {
      id: 'APT-102',
      patientName: 'Sarah Jenkins',
      time: '11:30 AM - 12:15 PM',
      type: 'Follow-up Consultation',
      room: 'Room 1 (Private Consultation Bay)',
      status: 'Pending Notes',
      consentStatus: { notesAllowed: true, purchaseHistoryAllowed: false },
      clinicalNotes: 'Follow-up on low-sodium intake goals.',
      recommendedProducts: ['Organic Raw Almonds', 'Herbal Green Tea Blend']
    }
  ];

  const [appointments, setAppointments] = useState(defaultQueue);
  const [selectedAppt, setSelectedAppt] = useState(defaultQueue[0]);
  const [newNote, setNewNote] = useState(defaultQueue[0].clinicalNotes);
  const [newProduct, setNewProduct] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSelectAppointment = (appt) => {
    setSelectedAppt(appt);
    setNewNote(appt.clinicalNotes);
    setSaveSuccess(false);
  };

  const handleAddProduct = () => {
    if (!newProduct.trim()) return;
    const updated = {
      ...selectedAppt,
      recommendedProducts: [...selectedAppt.recommendedProducts, newProduct.trim()]
    };
    updateSelected(updated);
    setNewProduct('');
  };

  const handleSaveNotes = () => {
    const updated = { ...selectedAppt, clinicalNotes: newNote, status: 'Completed' };
    updateSelected(updated);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const updateSelected = (updated) => {
    setSelectedAppt(updated);
    setAppointments(prev => prev.map(a => a.id === updated.id ? updated : a));
  };

  return (
    <div style={{ backgroundColor: '#F4F1DE', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        {/* Top Clinical Header */}
        <header style={{ backgroundColor: '#163821', color: '#FFFFFF', padding: '1.25rem 2rem', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <h1 style={{ margin: 0, fontSize: '1.4rem', fontWeight: '700' }}>WholeCare Provider Portal</h1>
              <span style={{ backgroundColor: '#2C5E3B', color: '#D4E6D4', fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: '12px', fontWeight: '600' }}>Clinician View</span>
            </div>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: '#B3CBB9' }}>Logged in as: <strong>Dr. Alice Smith, RD, LDN</strong> (Store #1042)</p>
          </div>
          <button 
            onClick={onSwitchToCustomer} 
            style={{ backgroundColor: '#D4AF37', color: '#1A202C', border: 'none', padding: '0.6rem 1.2rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '700', fontSize: '0.85rem' }}
          >
            ⇄ Switch to Customer Portal
          </button>
        </header>

        {/* Clinical Workspace Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '1.5rem' }}>
          
          {/* Left Column: Patient Appointment Queue */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', padding: '1.25rem', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #EDF2F7', paddingBottom: '0.5rem' }}>
              <h2 style={{ margin: 0, fontSize: '1rem', color: '#1A531A', fontWeight: '700' }}>Today's Consultations</h2>
              <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#718096' }}>{appointments.length} Scheduled</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {appointments.map(appt => (
                <div
                  key={appt.id}
                  onClick={() => handleSelectAppointment(appt)}
                  style={{
                    padding: '0.85rem',
                    borderRadius: '8px',
                    border: selectedAppt.id === appt.id ? '2px solid #1A531A' : '1px solid #E2E8F0',
                    backgroundColor: selectedAppt.id === appt.id ? '#F2F8F4' : '#FFFFFF',
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ fontSize: '0.95rem', color: '#2D3748' }}>{appt.patientName}</strong>
                    <span style={{ fontSize: '0.7rem', backgroundColor: appt.status === 'Confirmed' ? '#DEF7EC' : '#FEF3C7', color: appt.status === 'Confirmed' ? '#03543F' : '#92400E', padding: '0.15rem 0.5rem', borderRadius: '4px', fontWeight: '600' }}>
                      {appt.status}
                    </span>
                  </div>
                  <p style={{ margin: '0.25rem 0', fontSize: '0.75rem', color: '#4A5568' }}>🕒 {appt.time}</p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#718096' }}>📍 {appt.room}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Encounter Console */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', padding: '1.5rem', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#1A531A', fontWeight: '700' }}>{selectedAppt.patientName}</h2>
                  <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: '#4A5568' }}>Session: {selectedAppt.type}</p>
                </div>
                
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', borderRadius: '6px', fontWeight: '600', backgroundColor: selectedAppt.consentStatus.notesAllowed ? '#DEF7EC' : '#FEE2E2', color: selectedAppt.consentStatus.notesAllowed ? '#03543F' : '#991B1B' }}>
                    {selectedAppt.consentStatus.notesAllowed ? '✓ Notes Authorized' : '✕ Notes Restricted'}
                  </span>
                  <span style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem', borderRadius: '6px', fontWeight: '600', backgroundColor: selectedAppt.consentStatus.purchaseHistoryAllowed ? '#DEF7EC' : '#FEE2E2', color: selectedAppt.consentStatus.purchaseHistoryAllowed ? '#03543F' : '#991B1B' }}>
                    {selectedAppt.consentStatus.purchaseHistoryAllowed ? '✓ Grocery Sync Active' : '✕ No Purchase Access'}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', padding: '1.5rem', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <h3 style={{ margin: 0, fontSize: '1rem', color: '#1A531A' }}>Clinical Observations & Recommendations</h3>
                {saveSuccess && <span style={{ color: '#03543F', fontSize: '0.8rem', fontWeight: '600' }}>✓ Saved & Dispatched</span>}
              </div>
              
              <textarea
                rows="4"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                style={{ width: '100%', padding: '0.75rem', border: '1px solid #CBD5E0', borderRadius: '6px', boxSizing: 'border-box', fontSize: '0.9rem', lineHeight: '1.4' }}
                placeholder="Enter clinical assessment, macro targets, dietary advice..."
              />

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.75rem' }}>
                <button
                  onClick={handleSaveNotes}
                  style={{ backgroundColor: '#1A531A', color: '#FFFFFF', border: 'none', padding: '0.6rem 1.25rem', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '0.85rem' }}
                >
                  Save & Update Patient Chart
                </button>
              </div>
            </div>

            <div style={{ backgroundColor: '#FFFFFF', borderRadius: '10px', padding: '1.5rem', border: '1px solid #E2E8F0' }}>
              <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', color: '#1A531A' }}>Prescribed Whole Foods Grocery & Supplement Items</h3>
              
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  placeholder="e.g. 365 Organic Chia Seeds, Thorne Zinc Picolinate..."
                  value={newProduct}
                  onChange={(e) => setNewProduct(e.target.value)}
                  style={{ flex: 1, padding: '0.6rem', border: '1px solid #CBD5E0', borderRadius: '6px', fontSize: '0.85rem' }}
                />
                <button
                  onClick={handleAddProduct}
                  style={{ backgroundColor: '#2C5E3B', color: '#FFFFFF', border: 'none', padding: '0.6rem 1rem', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', fontSize: '0.85rem' }}
                >
                  + Add Item
                </button>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {selectedAppt.recommendedProducts.map((prod, idx) => (
                  <span key={idx} style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', color: '#166534', padding: '0.35rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '500' }}>
                    🥗 {prod}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}