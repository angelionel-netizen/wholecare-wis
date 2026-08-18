import React, { useState } from 'react';
import Register from './Register';
import Login from './Login';
import Dashboard from './Dashboard';
import Booking from './Booking';
import Recommendations from './Recommendations';
import Profile from './Profile';
import Billing from './Billing';
import ProviderPortal from './ProviderPortal';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [authMode, setAuthMode] = useState('register');
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [userRole, setUserRole] = useState('customer');
  const [latestAppointment, setLatestAppointment] = useState(null);
  const [showArchModal, setShowArchModal] = useState(false);

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLatestAppointment(null);
    setCurrentPage('dashboard');
    setUserRole('customer');
    setAuthMode('login');
  };

  if (!currentUser) {
    if (authMode === 'login') {
      return (
        <Login 
          onLoginSuccess={handleAuthSuccess} 
          onSwitchToRegister={() => setAuthMode('register')} 
        />
      );
    }
    return (
      <Register 
        onRegisterSuccess={handleAuthSuccess} 
        onSwitchToLogin={() => setAuthMode('login')} 
      />
    );
  }

  if (userRole === 'provider') {
    return (
      <ProviderPortal 
        currentCustomer={currentUser}
        latestAppointment={latestAppointment}
        onSwitchToCustomer={() => setUserRole('customer')} 
      />
    );
  }

  return (
    <div>
      {/* Top Demo Toolbar */}
      <div style={{ backgroundColor: '#163821', color: '#E2E8F0', padding: '0.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span>🌿 WholeCare WIS • Active: <strong>Customer Portal ({currentUser.firstName})</strong></span>
          <button 
            onClick={() => setShowArchModal(true)}
            style={{ backgroundColor: '#2C5E3B', color: '#D4E6D4', border: '1px solid #487A57', padding: '0.2rem 0.6rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.7rem', fontWeight: '600' }}
          >
            ℹ️ System Architecture
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            onClick={handleLogout}
            style={{ backgroundColor: 'transparent', border: '1px solid #718096', color: '#E2E8F0', padding: '0.3rem 0.7rem', borderRadius: '4px', fontWeight: '600', cursor: 'pointer', fontSize: '0.75rem' }}
          >
            Log Out
          </button>
          <button 
            onClick={() => setUserRole('provider')}
            style={{ backgroundColor: '#D4AF37', color: '#1A202C', border: 'none', padding: '0.3rem 0.8rem', borderRadius: '4px', fontWeight: '700', cursor: 'pointer', fontSize: '0.75rem' }}
          >
            Switch to Clinician Portal →
          </button>
        </div>
      </div>

      {/* Architecture Modal */}
      {showArchModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '12px', maxWidth: '650px', width: '100%', padding: '2rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #1A531A', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
              <h2 style={{ margin: 0, color: '#1A531A', fontSize: '1.25rem' }}>WholeCare System Architecture & Design</h2>
              <button onClick={() => setShowArchModal(false)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#718096' }}>✕</button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.85rem', color: '#4A5568', lineHeight: '1.5' }}>
              <p><strong>• Frontend:</strong> React 18 SPA built with Vite and custom Tailwind CSS design system (*Harvest Modern* theme).</p>
              <p><strong>• Backend:</strong> Node.js / Express REST API handling authentication, customer intake, and provider routing.</p>
              <p><strong>• Database:</strong> SQLite (`better-sqlite3`) relational database enforcing strict data schema for customers, providers, appointments, and encounters.</p>
              <p><strong>• Compliance & Consent Gate:</strong> User-controlled granular consent toggles for clinical encounter notes and grocery recommendation access.</p>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setShowArchModal(false)}
                style={{ backgroundColor: '#1A531A', color: '#FFFFFF', border: 'none', padding: '0.6rem 1.25rem', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {currentPage === 'book' && (
        <Booking 
          customer={currentUser} 
          onBack={() => setCurrentPage('dashboard')} 
          onBookingComplete={(appt) => {
            setLatestAppointment(appt);
            setCurrentPage('dashboard');
          }} 
        />
      )}

      {currentPage === 'tips' && (
        <Recommendations 
          customer={currentUser} 
          onBack={() => setCurrentPage('dashboard')} 
        />
      )}

      {currentPage === 'profile' && (
        <Profile 
          customer={currentUser} 
          onBack={() => setCurrentPage('dashboard')}
          onUpdateCustomer={(updated) => setCurrentUser(prev => ({ ...prev, ...updated }))}
        />
      )}

      {currentPage === 'billing' && (
        <Billing 
          customer={currentUser} 
          onBack={() => setCurrentPage('dashboard')} 
        />
      )}

      {currentPage === 'dashboard' && (
        <Dashboard 
          customer={currentUser} 
          onNavigate={(page) => setCurrentPage(page)} 
          appointment={latestAppointment}
        />
      )}
    </div>
  );
}

export default App;