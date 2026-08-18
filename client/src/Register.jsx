import React, { useState } from 'react';

export default function Register({ onRegisterSuccess, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
    allowNotes: false,
    allowPurchaseHistory: false,
    receiveEmailTips: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => onRegisterSuccess(data.customer || formData))
      .catch(err => {
        console.error(err);
        onRegisterSuccess(formData); // Fallback to proceed if backend is offline
      });
  };

  return (
    <div style={{ backgroundColor: '#F4F1DE', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.08)', maxWidth: '900px', width: '100%', padding: '2.5rem', border: '1px solid #E2E8F0' }}>
        
        {/* Header */}
        <div style={{ borderBottom: '2px solid #1A531A', paddingBottom: '1rem', marginBottom: '2rem' }}>
          <h1 style={{ color: '#1A531A', fontSize: '1.75rem', fontWeight: '700', margin: 0 }}>WholeCare — Create Account</h1>
          <p style={{ color: '#4A5568', fontSize: '0.9rem', marginTop: '0.25rem' }}>Free wellness & consultation services for Whole Foods customers</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          
          {/* Left Column: Personal Information */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h2 style={{ color: '#1A531A', fontSize: '1.15rem', fontWeight: '600', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.5rem', margin: 0 }}>Personal Details</h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#2D3748', marginBottom: '0.25rem' }}>First Name *</label>
                <input required name="firstName" value={formData.firstName} onChange={handleChange} style={{ width: '100%', padding: '0.6rem', border: '1px solid #CBD5E0', borderRadius: '6px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#2D3748', marginBottom: '0.25rem' }}>Last Name *</label>
                <input required name="lastName" value={formData.lastName} onChange={handleChange} style={{ width: '100%', padding: '0.6rem', border: '1px solid #CBD5E0', borderRadius: '6px', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#2D3748', marginBottom: '0.25rem' }}>Email Address *</label>
              <input required type="email" name="email" value={formData.email} onChange={handleChange} style={{ width: '100%', padding: '0.6rem', border: '1px solid #CBD5E0', borderRadius: '6px', boxSizing: 'border-box' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#2D3748', marginBottom: '0.25rem' }}>Phone Number</label>
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} style={{ width: '100%', padding: '0.6rem', border: '1px solid #CBD5E0', borderRadius: '6px', boxSizing: 'border-box' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#2D3748', marginBottom: '0.25rem' }}>Password *</label>
                <input required type="password" name="password" value={formData.password} onChange={handleChange} style={{ width: '100%', padding: '0.6rem', border: '1px solid #CBD5E0', borderRadius: '6px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#2D3748', marginBottom: '0.25rem' }}>Confirm Password *</label>
                <input required type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} style={{ width: '100%', padding: '0.6rem', border: '1px solid #CBD5E0', borderRadius: '6px', boxSizing: 'border-box' }} />
              </div>
            </div>
          </div>

          {/* Right Column: Consent & Privacy (Audit Gate) */}
          <div style={{ backgroundColor: '#F9FBF9', border: '1px solid #E3EBE3', padding: '1.5rem', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h2 style={{ color: '#1A531A', fontSize: '1.15rem', fontWeight: '600', borderBottom: '1px solid #E3EBE3', paddingBottom: '0.5rem', margin: 0 }}>Consent & Privacy</h2>
              <p style={{ color: '#718096', fontSize: '0.8rem', margin: '0.5rem 0 1.25rem 0' }}>All items below are optional except Terms of Service.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <label style={{ display: 'flex', gap: '0.75rem', cursor: 'pointer' }}>
                  <input type="checkbox" required name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} style={{ marginTop: '0.25rem' }} />
                  <span style={{ fontSize: '0.85rem', color: '#2D3748' }}>
                    <strong>Terms of Service *</strong>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: '#718096' }}>Required to access consultation features</span>
                  </span>
                </label>

                <label style={{ display: 'flex', gap: '0.75rem', cursor: 'pointer' }}>
                  <input type="checkbox" name="allowNotes" checked={formData.allowNotes} onChange={handleChange} style={{ marginTop: '0.25rem' }} />
                  <span style={{ fontSize: '0.85rem', color: '#2D3748' }}>
                    <strong>Allow consultation notes for recommendations</strong>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: '#718096' }}>Permits providers to log wellness observations</span>
                  </span>
                </label>

                <label style={{ display: 'flex', gap: '0.75rem', cursor: 'pointer' }}>
                  <input type="checkbox" name="allowPurchaseHistory" checked={formData.allowPurchaseHistory} onChange={handleChange} style={{ marginTop: '0.25rem' }} />
                  <span style={{ fontSize: '0.85rem', color: '#2D3748' }}>
                    <strong>Allow purchase history for suggestions</strong>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: '#718096' }}>Enables personalized dietary and recipe suggestions</span>
                  </span>
                </label>

                <label style={{ display: 'flex', gap: '0.75rem', cursor: 'pointer' }}>
                  <input type="checkbox" name="receiveEmailTips" checked={formData.receiveEmailTips} onChange={handleChange} style={{ marginTop: '0.25rem' }} />
                  <span style={{ fontSize: '0.85rem', color: '#2D3748' }}>
                    <strong>Receive weekly tips by email</strong>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: '#718096' }}>Curated nutrition guides and health updates</span>
                  </span>
                </label>
              </div>
            </div>

            <button type="submit" style={{ backgroundColor: '#1A531A', color: '#FFFFFF', border: 'none', padding: '0.85rem', borderRadius: '6px', fontWeight: '600', fontSize: '0.95rem', cursor: 'pointer', marginTop: '1.5rem', transition: 'background-color 0.2s' }}>
              Create Account & Go to Dashboard →
            </button>
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
  <span style={{ fontSize: '0.8rem', color: '#718096' }}>Already registered? </span>
  <button 
    type="button" 
    onClick={onSwitchToLogin} 
    style={{ background: 'none', border: 'none', color: '#1A531A', fontWeight: '700', cursor: 'pointer', padding: 0, textDecoration: 'underline', fontSize: '0.8rem' }}
  >
    Sign In here
  </button>
</div>
          </div>
        </form>
      </div>
    </div>
  );
}