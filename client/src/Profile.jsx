import React, { useState } from 'react';

export default function Profile({ customer, onBack, onUpdateCustomer }) {
  const [profileData, setProfileData] = useState({
    firstName: customer?.firstName || 'Ange',
    lastName: customer?.lastName || '',
    email: customer?.email || 'customer@wholefoods.com',
    phone: customer?.phone || '337-555-0199',
    dietaryPreferences: 'Gluten-Free, Plant-Forward',
    allergies: 'Peanuts, Shellfish',
    allowNotes: customer?.allowNotes ?? true,
    allowPurchaseHistory: customer?.allowPurchaseHistory ?? true,
    receiveEmailTips: customer?.receiveEmailTips ?? true,
  });

  const [savedMessage, setSavedMessage] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfileData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (onUpdateCustomer) {
      onUpdateCustomer(profileData);
    }
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 2500);
  };

  return (
    <div style={{ backgroundColor: '#F4F1DE', minHeight: '100vh', padding: '2rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', backgroundColor: '#FFFFFF', borderRadius: '12px', padding: '2rem', border: '1px solid #E2E8F0', boxShadow: '0 10px 25px rgba(0,0,0,0.06)' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #1A531A', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ margin: 0, color: '#1A531A', fontSize: '1.5rem', fontWeight: '700' }}>Member Health Profile & Privacy</h1>
            <p style={{ margin: '0.25rem 0 0 0', color: '#4A5568', fontSize: '0.85rem' }}>Manage dietary profile, medical notes access, and consent controls</p>
          </div>
          <button onClick={onBack} style={{ backgroundColor: '#EDF2F7', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', color: '#2D3748', fontSize: '0.85rem' }}>
            ← Back to Dashboard
          </button>
        </div>

        {savedMessage && (
          <div style={{ backgroundColor: '#DEF7EC', color: '#03543F', padding: '0.75rem 1rem', borderRadius: '6px', marginBottom: '1.5rem', fontWeight: '600', fontSize: '0.9rem', border: '1px solid #BCF0DA' }}>
            ✓ Profile preferences and consent settings saved successfully.
          </div>
        )}

        <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          
          {/* Left Column: Health Profile */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h2 style={{ color: '#1A531A', fontSize: '1.15rem', fontWeight: '600', margin: 0, borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem' }}>
              Dietary & Health Profile
            </h2>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#2D3748', marginBottom: '0.25rem' }}>Full Name</label>
              <input disabled value={`${profileData.firstName} ${profileData.lastName}`.trim()} style={{ width: '100%', padding: '0.6rem', border: '1px solid #CBD5E0', borderRadius: '6px', backgroundColor: '#F7FAFC', color: '#718096', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#2D3748', marginBottom: '0.25rem' }}>Contact Email</label>
              <input disabled value={profileData.email} style={{ width: '100%', padding: '0.6rem', border: '1px solid #CBD5E0', borderRadius: '6px', backgroundColor: '#F7FAFC', color: '#718096', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#2D3748', marginBottom: '0.25rem' }}>Dietary Preferences & Lifestyle</label>
              <input name="dietaryPreferences" value={profileData.dietaryPreferences} onChange={handleChange} style={{ width: '100%', padding: '0.6rem', border: '1px solid #CBD5E0', borderRadius: '6px', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#2D3748', marginBottom: '0.25rem' }}>Known Allergies / Sensitivities</label>
              <input name="allergies" value={profileData.allergies} onChange={handleChange} style={{ width: '100%', padding: '0.6rem', border: '1px solid #CBD5E0', borderRadius: '6px', boxSizing: 'border-box' }} />
            </div>
          </div>

          {/* Right Column: Privacy & Consent Controls */}
          <div style={{ backgroundColor: '#F9FBF9', border: '1px solid #E3EBE3', padding: '1.5rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ color: '#1A531A', fontSize: '1.15rem', fontWeight: '600', margin: 0, borderBottom: '1px solid #E3EBE3', paddingBottom: '0.5rem' }}>
                Consent & Data Gate
              </h2>
              <p style={{ color: '#718096', fontSize: '0.8rem', margin: '0.5rem 0 1.25rem 0' }}>Adjust what data WholeCare providers can reference.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <label style={{ display: 'flex', gap: '0.75rem', cursor: 'pointer' }}>
                  <input type="checkbox" name="allowNotes" checked={profileData.allowNotes} onChange={handleChange} style={{ marginTop: '0.25rem' }} />
                  <span style={{ fontSize: '0.85rem', color: '#2D3748' }}>
                    <strong>Share Consultation Notes</strong>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: '#718096' }}>Allow assigned WholeCare specialists to view previous clinical and dietary notes.</span>
                  </span>
                </label>

                <label style={{ display: 'flex', gap: '0.75rem', cursor: 'pointer' }}>
                  <input type="checkbox" name="allowPurchaseHistory" checked={profileData.allowPurchaseHistory} onChange={handleChange} style={{ marginTop: '0.25rem' }} />
                  <span style={{ fontSize: '0.85rem', color: '#2D3748' }}>
                    <strong>Sync Whole Foods Purchase History</strong>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: '#718096' }}>Permits automated meal plan recommendations based on past in-store groceries.</span>
                  </span>
                </label>

                <label style={{ display: 'flex', gap: '0.75rem', cursor: 'pointer' }}>
                  <input type="checkbox" name="receiveEmailTips" checked={profileData.receiveEmailTips} onChange={handleChange} style={{ marginTop: '0.25rem' }} />
                  <span style={{ fontSize: '0.85rem', color: '#2D3748' }}>
                    <strong>Weekly Wellness Newsletter</strong>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: '#718096' }}>Receive dietary research and store promotion guides.</span>
                  </span>
                </label>
              </div>
            </div>

            <button type="submit" style={{ backgroundColor: '#1A531A', color: '#FFFFFF', border: 'none', padding: '0.85rem', borderRadius: '6px', fontWeight: '600', fontSize: '0.95rem', cursor: 'pointer', marginTop: '1.5rem' }}>
              Save Profile Preferences
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}