import React, { useState } from 'react';
import { UserCheck, Phone, Check, X, Sparkles } from 'lucide-react';

export function UserProfileModal({ 
  userProfile, 
  onSaveProfile, 
  onClose,
  isFirstVisit = false 
}) {
  const [nameInput, setNameInput] = useState(userProfile.name || '');
  const [phoneInput, setPhoneInput] = useState(userProfile.phone || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nameInput.trim()) return;

    if (onSaveProfile) {
      onSaveProfile({
        name: nameInput.trim(),
        phone: phoneInput.trim()
      });
    }

    if (onClose) {
      onClose();
    }
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
      background: 'rgba(9, 13, 22, 0.92)', 
      backdropFilter: 'blur(16px)', 
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justify: 'center',
      padding: '1rem'
    }}>
      <div 
        className="glass-card" 
        style={{ 
          maxWidth: '440px', 
          width: '92%', 
          padding: '2rem', 
          border: '1px solid #484f58', 
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
          margin: '0 auto'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <UserCheck size={24} style={{ color: '#c9d1d9' }} />
            <h3 style={{ fontSize: '1.3rem', color: '#f0f6fc', margin: 0 }}>
              {isFirstVisit ? "Welcome to NextRound!" : "Candidate Profile"}
            </h3>
          </div>

          {!isFirstVisit && (
            <button className="btn btn-secondary btn-icon" onClick={onClose}>
              <X size={18} />
            </button>
          )}
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem', lineHeight: '1.45' }}>
          {isFirstVisit 
            ? "Please enter your name to personalize your technical interview dashboard and track your daily streak."
            : "Update your candidate profile details below."}
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#c9d1d9', marginBottom: '0.35rem', fontWeight: '600' }}>
              Candidate Name *
            </label>
            <input 
              type="text" 
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="e.g. Vanshika"
              required
              autoFocus
              style={{ 
                width: '100%', 
                background: '#161b22', 
                border: '1px solid #30363d', 
                color: '#fff', 
                padding: '0.65rem 0.85rem', 
                borderRadius: 'var(--radius-sm)', 
                fontSize: '0.95rem',
                fontWeight: '600'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#c9d1d9', marginBottom: '0.35rem', fontWeight: '600' }}>
              Phone Number (Optional)
            </label>
            <input 
              type="text" 
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              placeholder="e.g. +91 9876543210"
              style={{ 
                width: '100%', 
                background: '#161b22', 
                border: '1px solid #30363d', 
                color: '#fff', 
                padding: '0.65rem 0.85rem', 
                borderRadius: 'var(--radius-sm)', 
                fontSize: '0.95rem'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
            <button 
              type="submit" 
              className="btn btn-secondary"
              style={{ 
                flex: 1, 
                padding: '0.75rem', 
                fontSize: '0.95rem', 
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem'
              }}
            >
              <Check size={18} />
              <span>{isFirstVisit ? "Start Preparation" : "Save Profile"}</span>
            </button>

            {!isFirstVisit && (
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={onClose} 
                style={{ padding: '0.75rem 1.25rem' }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
