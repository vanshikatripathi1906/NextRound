import React from 'react';
import { 
  LayoutDashboard, 
  Network, 
  Building2, 
  BarChart2, 
  Timer, 
  UserCheck
} from 'lucide-react';

export function Navbar({ 
  activePage, 
  setActivePage, 
  onOpenFocusTimer, 
  onOpenProfileModal,
  userName = 'Vanshika'
}) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'knowledge', label: 'Knowledge Graph', icon: Network },
    { id: 'companies', label: 'Interview Experience', icon: Building2 },
    { id: 'analytics', label: 'Analytics & Tools', icon: BarChart2 }
  ];

  return (
    <nav className="glass-card mb-6" style={{ padding: '1rem 1.75rem', borderRadius: 'var(--radius-lg)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div 
          onClick={() => setActivePage('dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer' }}
        >
          <div style={{ background: '#161b22', padding: '0.55rem', borderRadius: 'var(--radius-md)', border: '1px solid #30363d', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#f0f6fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="#8b949e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="#c9d1d9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div>
            <div style={{ fontSize: '1.25rem', fontWeight: '800', fontFamily: 'var(--font-body)', letterSpacing: '-0.5px', color: '#f0f6fc', lineHeight: '1.1' }}>
              NextRound
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600', letterSpacing: '0.5px' }}>
              Technical Interview Preparation
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            className="btn btn-secondary btn-icon"
            onClick={onOpenFocusTimer}
            title="Focus Timer"
            style={{ borderRadius: '50%', padding: '0.65rem' }}
          >
            <Timer size={18} style={{ color: '#c9d1d9' }} />
          </button>

          <button
            className="btn btn-secondary"
            onClick={onOpenProfileModal}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              padding: '0.5rem 0.95rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid #484f58',
              background: '#161b22',
              color: '#f0f6fc',
              fontSize: '0.85rem',
              fontWeight: '700'
            }}
            title="Update Profile Information"
          >
            <UserCheck size={16} style={{ color: '#c9d1d9' }} />
            <span>{userName}</span>
          </button>
        </div>
      </div>

      <div style={{ 
        display: 'flex', 
        gap: '0.5rem', 
        marginTop: '1.25rem', 
        paddingTop: '0.85rem', 
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        overflowX: 'auto'
      }}>
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`btn ${isActive ? 'btn-primary' : 'btn-secondary'}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.9rem',
                padding: '0.55rem 1.1rem',
                whiteSpace: 'nowrap',
                fontWeight: isActive ? '700' : '500'
              }}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
