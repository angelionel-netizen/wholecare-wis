import React, { useState } from 'react';

export default function Login({ onLoginSuccess, onSwitchToRegister }) {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      setError('Please enter both email and password.');
      return;
    }

    // Attempt backend login or fallback mock login for demo
    fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.customer) {
          onLoginSuccess(data.customer);
        } else {
          // Fallback login object
          onLoginSuccess({
            firstName: credentials.email.split('@')[0] || 'Member',
            lastName: '',
            email: credentials.email,
            allowNotes: true,
            allowPurchaseHistory: true
          });
        }
      })
      .catch(() => {
        // Offline demo fallback
        onLoginSuccess({
          firstName: credentials.email.split('@')[0] || 'Member',
          lastName: '',
          email: credentials.email,
          allowNotes: true,
          allowPurchaseHistory: true
        });
      });
  };

  return (
    <div style={{ backgroundColor: '#FAF7EE', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', boxShadow: '0 20px 40px -15px rgba(16, 51, 29, 0.15)', maxWidth: '450px', width: '100%', padding: '2.5rem', border: '1px solid rgba(24, 77, 40, 0.1)' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#EDF4EE', padding: '0.35rem 0.85rem', borderRadius: '30px', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem' }}>🌿</span>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#184D28' }}>Whole Foods WIS</span>
          </div>
          <h1 className="font-serif-title" style={{ color: '#10331D', fontSize: '1.85rem', fontWeight: '700', margin: 0 }}>Sign In to WholeCare</h1>
          <p style={{ color: '#6B7280', fontSize: '0.85rem', marginTop: '0.35rem' }}>Access your wellness consultations & dietary plans</p>
        </div>

        {error && (
          <div style={{ backgroundColor: '#FEE2E2', color: '#991B1B', padding: '0.6rem 0.85rem', borderRadius: '6px', fontSize: '0.8rem', marginBottom: '1.25rem', fontWeight: '600' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#374151', marginBottom: '0.35rem' }}>Email Address</label>
            <input 
              required 
              type="email" 
              name="email" 
              placeholder="you@wholefoods.com"
              value={credentials.email} 
              onChange={handleChange} 
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '8px', boxSizing: 'border-box', fontSize: '0.9rem' }} 
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#374151', marginBottom: '0.35rem' }}>Password</label>
            <input 
              required 
              type="password" 
              name="password" 
              placeholder="••••••••"
              value={credentials.password} 
              onChange={handleChange} 
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #D1D5DB', borderRadius: '8px', boxSizing: 'border-box', fontSize: '0.9rem' }} 
            />
          </div>

          <button 
            type="submit" 
            style={{ backgroundColor: '#184D28', color: '#FFFFFF', border: 'none', padding: '0.85rem', borderRadius: '8px', fontWeight: '700', fontSize: '0.95rem', cursor: 'pointer', marginTop: '0.5rem', boxShadow: '0 4px 12px rgba(24, 77, 40, 0.25)' }}
          >
            Sign In to Dashboard →
          </button>
        </form>

        {/* Switch to Register */}
        <div style={{ textAlign: 'center', marginTop: '1.75rem', borderTop: '1px solid #F3F4F6', paddingTop: '1.25rem' }}>
          <p style={{ margin: 0, fontSize: '0.85rem', color: '#6B7280' }}>
            Don't have a WholeCare account yet?{' '}
            <button 
              onClick={onSwitchToRegister} 
              style={{ background: 'none', border: 'none', color: '#184D28', fontWeight: '700', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
            >
              Create Account
            </button>
          </p>
        </div>

      </div>
    </div>
  );
}