import React, { useState, useEffect } from 'react';

export default function Booking({ customer, onBack, onBookingComplete }) {
  const [providers, setProviders] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedDate, setSelectedDate] = useState('2026-08-25');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [filterSpecialty, setFilterSpecialty] = useState('All');
  const [bookingNotes, setBookingNotes] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/providers')
      .then(res => res.json())
      .then(data => {
        setProviders(data);
        if (data && data.length > 0) setSelectedProvider(data[0].id);
      })
      .catch(() => {
        const mock = [
          { id: 1, name: 'Dr. Alice Smith', specialty: 'Nutrition & Dietetics', rating: 4.9, available: 'Mon, Wed, Fri' },
          { id: 2, name: 'Coach Brian Miller', specialty: 'Functional Wellness & Lifestyle', rating: 4.8, available: 'Tue, Thu' },
          { id: 3, name: 'Dr. Claire Vance', specialty: 'Holistic Health & Supplements', rating: 5.0, available: 'Mon - Thu' }
        ];
        setProviders(mock);
        setSelectedProvider(mock[0].id);
      });
  }, []);

  const timeSlots = ['09:00 AM', '10:00 AM', '11:30 AM', '01:00 PM', '02:30 PM', '04:00 PM'];
  const specialties = ['All', 'Nutrition & Dietetics', 'Functional Wellness & Lifestyle', 'Holistic Health & Supplements'];

  const filteredProviders = filterSpecialty === 'All' 
    ? providers 
    : providers.filter(p => p.specialty.toLowerCase().includes(filterSpecialty.toLowerCase()));

  const handleConfirm = (e) => {
    e.preventDefault();
    const providerObj = providers.find(p => p.id === selectedProvider) || { name: 'Dr. Alice Smith', specialty: 'Nutrition Consultation' };
    
    const newAppointment = {
      date: selectedDate,
      time: selectedTime,
      providerName: providerObj.name,
      specialty: providerObj.specialty,
      room: 'Room 2 (Flexible Store Space)',
      notes: bookingNotes
    };

    fetch('http://localhost:5000/api/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerId: customer?.customerId || 1,
        providerId: selectedProvider,
        dateTime: `${selectedDate} ${selectedTime}`,
        notes: bookingNotes
      })
    })
      .then(res => res.json())
      .catch(() => ({}))
      .finally(() => {
        setConfirmed(true);
        setTimeout(() => {
          if (onBookingComplete) onBookingComplete(newAppointment);
        }, 1500);
      });
  };

  return (
    <div style={{ backgroundColor: '#F4F1DE', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '2rem', border: '1px solid #E2E8F0', boxShadow: '0 10px 25px rgba(0,0,0,0.06)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #1A531A', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ margin: 0, color: '#1A531A', fontSize: '1.5rem', fontWeight: '700' }}>Book a Wellness Consultation</h1>
            <p style={{ margin: '0.25rem 0 0 0', color: '#4A5568', fontSize: '0.85rem' }}>Flexible In-Store Consultation Rooms & Certified Specialists</p>
          </div>
          <button onClick={onBack} style={{ backgroundColor: '#EDF2F7', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', color: '#2D3748', fontSize: '0.85rem' }}>
            ← Back to Dashboard
          </button>
        </div>

        {confirmed ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
            <span style={{ fontSize: '3rem' }}>✅</span>
            <h2 style={{ color: '#1A531A', margin: '1rem 0 0.5rem 0' }}>Consultation Confirmed!</h2>
            <p style={{ color: '#4A5568', fontSize: '0.9rem' }}>Scheduled for <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong>.</p>
            <p style={{ color: '#718096', fontSize: '0.8rem' }}>Updating your dashboard...</p>
          </div>
        ) : (
          <form onSubmit={handleConfirm} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h2 style={{ color: '#1A531A', fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>1. Select Date & Slot</h2>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#2D3748', marginBottom: '0.35rem' }}>Consultation Date</label>
                <input 
                  type="date" 
                  value={selectedDate} 
                  onChange={(e) => setSelectedDate(e.target.value)} 
                  style={{ width: '100%', padding: '0.6rem', border: '1px solid #CBD5E0', borderRadius: '6px', boxSizing: 'border-box', fontSize: '0.9rem' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#2D3748', marginBottom: '0.5rem' }}>Available Time Slots</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
                  {timeSlots.map(time => (
                    <button
                      type="button"
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      style={{
                        padding: '0.6rem 0.25rem',
                        border: selectedTime === time ? '2px solid #1A531A' : '1px solid #E2E8F0',
                        backgroundColor: selectedTime === time ? '#DEF7EC' : '#F7FAFC',
                        color: selectedTime === time ? '#03543F' : '#2D3748',
                        fontWeight: selectedTime === time ? '700' : '500',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#2D3748', marginBottom: '0.35rem' }}>Notes for Provider (Optional)</label>
                <textarea 
                  rows="3" 
                  value={bookingNotes} 
                  onChange={(e) => setBookingNotes(e.target.value)} 
                  placeholder="e.g. Dietary goals, organic grocery questions, food sensitivities..."
                  style={{ width: '100%', padding: '0.6rem', border: '1px solid #CBD5E0', borderRadius: '6px', boxSizing: 'border-box', fontSize: '0.85rem' }} 
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h2 style={{ color: '#1A531A', fontSize: '1.1rem', fontWeight: '600', margin: 0 }}>2. Choose Provider</h2>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: '600', color: '#718096', marginBottom: '0.25rem' }}>Filter by Specialty</label>
                <select 
                  value={filterSpecialty} 
                  onChange={(e) => setFilterSpecialty(e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', border: '1px solid #CBD5E0', borderRadius: '6px', fontSize: '0.85rem' }}
                >
                  {specialties.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {filteredProviders.map(p => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProvider(p.id)}
                    style={{
                      padding: '0.85rem 1rem',
                      border: selectedProvider === p.id ? '2px solid #1A531A' : '1px solid #E2E8F0',
                      backgroundColor: selectedProvider === p.id ? '#F9FBF9' : '#FFFFFF',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <div>
                      <p style={{ margin: 0, fontWeight: '700', color: '#1A531A', fontSize: '0.9rem' }}>{p.name}</p>
                      <p style={{ margin: '0.15rem 0', fontSize: '0.75rem', color: '#4A5568' }}>{p.specialty}</p>
                      <span style={{ fontSize: '0.7rem', color: '#718096' }}>🕒 {p.available || 'Flexible Availability'}</span>
                    </div>
                    <span style={{ backgroundColor: '#D4AF37', color: '#1A202C', fontSize: '0.75rem', fontWeight: '700', padding: '0.2rem 0.5rem', borderRadius: '12px' }}>
                      ★ {p.rating}
                    </span>
                  </div>
                ))}
              </div>

              <button 
                type="submit" 
                style={{
                  marginTop: 'auto',
                  backgroundColor: '#1A531A',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '0.85rem',
                  borderRadius: '6px',
                  fontWeight: '600',
                  fontSize: '0.95rem',
                  cursor: 'pointer'
                }}
              >
                Confirm Appointment →
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}