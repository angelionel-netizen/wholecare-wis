import React from 'react';

export default function Dashboard({ customer, onNavigate, appointment }) {
  const displayAppointment = appointment || {
    date: '2026-08-25',
    time: '10:00 AM',
    specialty: 'Clinical Nutrition & Meal Strategy',
    providerName: 'Dr. Alice Smith',
    room: 'Wellness Suite B (In-Store)',
    status: 'Confirmed'
  };

  return (
    <div style={{ padding: '2.5rem 1.5rem', maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Hero Welcome Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #10331D 0%, #184D28 65%, #256B3A 100%)',
        borderRadius: '20px',
        padding: '2.5rem',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 20px 40px -15px rgba(16, 51, 29, 0.4)'
      }}>
        {/* Subtle background glow circles */}
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(229, 169, 60, 0.18)', filter: 'blur(35px)' }}></div>
        <div style={{ position: 'absolute', bottom: '-40px', left: '30%', width: '180px', height: '180px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.08)', filter: 'blur(25px)' }}></div>

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.15)', padding: '0.35rem 0.85rem', borderRadius: '30px', backdropFilter: 'blur(8px)', marginBottom: '0.75rem' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ADE80', display: 'inline-block' }}></span>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#FAF7EE' }}>WholeCare Verified Tier</span>
            </div>
            <h1 className="font-serif-title" style={{ fontSize: '2.4rem', margin: 0, fontWeight: '700', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Welcome back, {customer?.firstName || 'Valued Member'}
            </h1>
            <p style={{ margin: '0.6rem 0 0 0', color: '#D5E6D8', fontSize: '0.95rem', maxWidth: '520px', lineHeight: 1.5 }}>
              Your integrative nutrition consultations and tailored Whole Foods market recommendations in one dashboard.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
            <span style={{ background: '#E5A93C', color: '#10331D', fontSize: '0.8rem', fontWeight: '800', padding: '0.5rem 1.1rem', borderRadius: '30px', boxShadow: '0 4px 12px rgba(229,169,60,0.3)' }}>
              ★ 365 Rewards Linked
            </span>
            <span style={{ fontSize: '0.75rem', color: '#D5E6D8' }}>Store: Whole Foods Market #1042</span>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
        
        {/* Metric 1 */}
        <div className="card-hover glass-panel" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(24, 77, 40, 0.1)', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#EDF4EE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
            📅
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Next Consultation</span>
            <p style={{ margin: '0.2rem 0 0 0', fontSize: '1.15rem', fontWeight: '800', color: '#10331D' }}>
              {displayAppointment.date}
            </p>
            <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '600' }}>{displayAppointment.time}</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="card-hover glass-panel" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(24, 77, 40, 0.1)', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
            🥑
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tailored Grocery Plan</span>
            <p style={{ margin: '0.2rem 0 0 0', fontSize: '1.35rem', fontWeight: '800', color: '#10331D' }}>
              4 Items Active
            </p>
            <span style={{ fontSize: '0.75rem', color: '#D97706', fontWeight: '600' }}>Anti-Inflammatory Protocol</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="card-hover glass-panel" style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid rgba(24, 77, 40, 0.1)', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: '#E0E7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
            🛡️
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Preventive Benefit</span>
            <p style={{ margin: '0.2rem 0 0 0', fontSize: '1.35rem', fontWeight: '800', color: '#10331D' }}>
              100% Covered
            </p>
            <span style={{ fontSize: '0.75rem', color: '#4F46E5', fontWeight: '600' }}>$0 Copay Verified</span>
          </div>
        </div>

      </div>

      {/* Quick Action Tiles */}
      <div>
        <h2 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#10331D', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>⚡</span> Wellness Navigation
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          
          <button 
            onClick={() => onNavigate('book')} 
            className="card-hover btn-press glass-panel"
            style={{ padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(24, 77, 40, 0.15)', textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            <span style={{ fontSize: '1.75rem' }}>📅</span>
            <strong style={{ fontSize: '1rem', color: '#10331D' }}>Book Consultation</strong>
            <span style={{ fontSize: '0.8rem', color: '#6B7280', lineHeight: 1.3 }}>Schedule certified dietitians in flexible store rooms</span>
          </button>

          <button 
            onClick={() => onNavigate('tips')} 
            className="card-hover btn-press glass-panel"
            style={{ padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(24, 77, 40, 0.15)', textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            <span style={{ fontSize: '1.75rem' }}>✨</span>
            <strong style={{ fontSize: '1rem', color: '#10331D' }}>Nutrition & Recipes</strong>
            <span style={{ fontSize: '0.8rem', color: '#6B7280', lineHeight: 1.3 }}>Clinician-curated food and supplement guides</span>
          </button>

          <button 
            onClick={() => onNavigate('profile')} 
            className="card-hover btn-press glass-panel"
            style={{ padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(24, 77, 40, 0.15)', textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            <span style={{ fontSize: '1.75rem' }}>📋</span>
            <strong style={{ fontSize: '1rem', color: '#10331D' }}>Health Profile</strong>
            <span style={{ fontSize: '0.8rem', color: '#6B7280', lineHeight: 1.3 }}>Dietary preferences and consent audit gate</span>
          </button>

          <button 
            onClick={() => onNavigate('billing')} 
            className="card-hover btn-press glass-panel"
            style={{ padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(24, 77, 40, 0.15)', textAlign: 'left', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
          >
            <span style={{ fontSize: '1.75rem' }}>💳</span>
            <strong style={{ fontSize: '1rem', color: '#10331D' }}>Insurance & Billing</strong>
            <span style={{ fontSize: '0.8rem', color: '#6B7280', lineHeight: 1.3 }}>Preventive care coverage and itemized receipts</span>
          </button>

        </div>
      </div>

      {/* Two-Column Detail Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        
        {/* Left Card: Upcoming Encounter */}
        <div className="glass-panel" style={{ borderRadius: '16px', padding: '1.75rem', border: '1px solid rgba(24, 77, 40, 0.1)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ margin: 0, color: '#10331D', fontSize: '1.15rem', fontWeight: '800' }}>Active Appointment</h3>
            <span style={{ backgroundColor: '#DEF7EC', color: '#03543F', fontSize: '0.75rem', fontWeight: '700', padding: '0.3rem 0.75rem', borderRadius: '20px' }}>
              ✓ Confirmed
            </span>
          </div>

          <div style={{ background: '#FAF7EE', borderRadius: '12px', padding: '1.25rem', border: '1px solid rgba(24, 77, 40, 0.1)' }}>
            <h4 style={{ margin: '0 0 0.35rem 0', color: '#184D28', fontSize: '1rem', fontWeight: '700' }}>{displayAppointment.specialty}</h4>
            <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.85rem', color: '#4B5563' }}>Specialist: <strong>{displayAppointment.providerName}</strong></p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8rem', color: '#374151', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '0.75rem' }}>
              <span>🕒 {displayAppointment.time}</span>
              <span>📅 {displayAppointment.date}</span>
              <span>📍 {displayAppointment.room}</span>
            </div>
          </div>
        </div>

        {/* Right Card: Clinical Timeline */}
        <div className="glass-panel" style={{ borderRadius: '16px', padding: '1.75rem', border: '1px solid rgba(24, 77, 40, 0.1)' }}>
          <h3 style={{ margin: '0 0 1.25rem 0', color: '#10331D', fontSize: '1.15rem', fontWeight: '800' }}>Recent Health Activity</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem' }}>
            {appointment && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid #F3F4F6' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }}></span>
                  <span style={{ fontWeight: '700', color: '#184D28' }}>Consultation Booked ({displayAppointment.providerName})</span>
                </div>
                <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '700' }}>Just now</span>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid #F3F4F6' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#9CA3AF' }}></span>
                <span style={{ color: '#374151' }}>Anti-Inflammatory Meal Plan Approved</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Aug 15</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#9CA3AF' }}></span>
                <span style={{ color: '#374151' }}>Vitamin D3 Bioavailability Protocol Logged</span>
              </div>
              <span style={{ fontSize: '0.75rem', color: '#9CA3AF' }}>Aug 14</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}