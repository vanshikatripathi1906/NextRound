import React from 'react';
import { 
  LayoutDashboard, 
  Network, 
  Building2, 
  BarChart3, 
  Clock, 
  User
} from 'lucide-react';

export function Navbar({ 
  activePage, 
  setActivePage, 
  onOpenFocusTimer, 
  onOpenProfileModal, 
  userName 
}) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard Home', icon: LayoutDashboard },
    { id: 'knowledge', label: 'Knowledge & Radar', icon: Network },
    { id: 'companies', label: 'Interview Experience', icon: Building2 },
    { id: 'analytics', label: 'Analytics & Tools', icon: BarChart3 },
  ];

  return (
    <nav style={{ 
      background: 'var(--bg-nav-top)', 
      borderRadius: 'var(--radius-lg)', 
      border: '1px solid #30363d',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)',
      marginBottom: '2rem',
      overflow: 'hidden'
    }}>
      
      {/* Top Header Row */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justify: 'space-between', 
        padding: '0.85rem 2rem',
        borderBottom: '1px solid #30363d',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        
        {/* Brand Logo with Interview Icon */}
        <div 
          style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer' }} 
          onClick={() => setActivePage('dashboard')}
        >
          <div style={{ 
            background: '#30363d', 
            border: '1px solid #484f58',
            padding: '0.35rem 0.55rem', 
            borderRadius: 'var(--radius-sm)', 
            display: 'flex',
            alignItems: 'center',
            justify: 'center'
          }}>
            <img 
              src="/interview-icon.svg" 
              alt="NextRound Interview Icon" 
              style={{ width: '28px', height: '28px', filter: 'brightness(0) invert(0.95)' }} 
            />
          </div>

          <div>
            <h2 style={{ fontSize: '1.35rem', lineHeight: '1', margin: 0, color: '#f0f6fc', fontWeight: '800' }}>
              NextRound
            </h2>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Interview Preparation Portal</span>
          </div>
        </div>

        {/* Action Tools Pinned to Right Side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: 'auto', flexWrap: 'wrap' }}>
          
          {/* Focus Timer Button */}
          <button 
            className="btn btn-secondary" 
            onClick={onOpenFocusTimer}
            title="Launch Focus Timer"
            style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Clock size={16} style={{ color: '#c9d1d9' }} />
            <span>Focus Timer</span>
          </button>

          {/* Candidate Profile Icon Button */}
          <button 
            className="btn btn-primary"
            onClick={onOpenProfileModal}
            title="Edit Candidate Profile Name & Phone"
            style={{ padding: '0.55rem 1.1rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <User size={16} />
            <span>{userName || 'Profile'}</span>
          </button>

        </div>

      </div>

      {/* Sub-Nav Category Tab Row */}
      <div style={{ 
        background: 'var(--bg-nav-sub)', 
        display: 'flex', 
        alignItems: 'center', 
        padding: '0.4rem 1.5rem',
        overflowX: 'auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                style={{ 
                  background: isActive ? '#30363d' : 'transparent',
                  border: 'none',
                  borderBottom: isActive ? '3px solid #8b949e' : '3px solid transparent',
                  color: isActive ? '#f0f6fc' : 'var(--text-muted)',
                  fontWeight: isActive ? '700' : '500',
                  fontSize: '0.875rem',
                  padding: '0.65rem 1.25rem',
                  borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

    </nav>
  );
}
