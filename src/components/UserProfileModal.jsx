import React, { useState } from 'react';
import { User, Phone, X, Save, CheckCircle2 } from 'lucide-react';

export function UserProfileModal({ userProfile, onSaveProfile, onClose, isFirstVisit }) {
  const [name, setName] = useState(userProfile.name || '');
  const [phone, setPhone] = useState(userProfile.phone || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onSaveProfile({
      name: name.trim(),
      phone: phone.trim()
    });

    setSavedSuccess(true);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: 0, 
      left: 0, 
      right: 0,
      bottom: 0,
      width: '100vw', 
      height: '100vh', 
      background: 'rgba(9, 13, 22, 0.9)', 
      backdropFilter: 'blur(18px)', 
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justify: 'center',
      padding: '1rem'
    }}>
      <div 
        className="glass-card" 
        style={{ 
          maxWidth: '460px', 
          width: '92%', 
          padding: '2.25rem', 
          border: '1px solid #484f58', 
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
          margin: '0 auto', /* Ensures perfect horizontal centering */
          transform: 'translateY(0)'
        }}
      >
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="badge badge-primary">Candidate Setup</span>
            </div>
            <h3 style={{ fontSize: '1.4rem', margin: 0, color: '#f0f6fc' }}>
              {isFirstVisit ? 'Welcome to NextRound' : 'Update Profile'}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>
              Please enter your name and phone number to personalize your dashboard.
            </p>
          </div>

          {!isFirstVisit && (
            <button className="btn btn-secondary btn-icon" onClick={onClose}>
              <X size={18} />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          
          {/* Name Field */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontWeight: '600' }}>
              Full Name *
            </label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#8b949e' }} />
              <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Vanshika"
                required
                autoFocus
                style={{ 
                  width: '100%', 
                  background: '#161b22', 
                  border: '1px solid #30363d', 
                  color: '#fff', 
                  padding: '0.7rem 0.85rem 0.7rem 2.4rem', 
                  borderRadius: 'var(--radius-sm)', 
                  fontSize: '0.95rem',
                  fontFamily: 'var(--font-body)'
                }} 
              />
            </div>
          </div>

          {/* Phone Field */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.35rem', fontWeight: '600' }}>
              Phone Number
            </label>
            <div style={{ position: 'relative' }}>
              <Phone size={16} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#8b949e' }} />
              <input 
                type="tel" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +91 9876543210"
                style={{ 
                  width: '100%', 
                  background: '#161b22', 
                  border: '1px solid #30363d', 
                  color: '#fff', 
                  padding: '0.7rem 0.85rem 0.7rem 2.4rem', 
                  borderRadius: 'var(--radius-sm)', 
                  fontSize: '0.95rem',
                  fontFamily: 'var(--font-body)'
                }} 
              />
            </div>
          </div>

          {/* Submit Button */}
          <div style={{ marginTop: '0.5rem' }}>
            <button 
              type="submit" 
              className="btn btn-emerald" 
              style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem' }}
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 size={18} /> Profile Saved!
                </>
              ) : (
                <>
                  <Save size={18} /> Continue to Dashboard
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
