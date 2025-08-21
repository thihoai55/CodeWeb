import React from 'react';
import { useNavigate } from 'react-router-dom';

function HeaderTab({ title = 'Quản lý giao dịch', tabs = [], activeId }) {
  const navigate = useNavigate();

  return (
    <div style={{
      marginBottom: '16px',
      background: '#fff',
      padding: '10px 24px 0 32px',
      boxShadow: '0 2px 0px rgba(199, 193, 193, 0.4)'
    }}>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: '#333', margin: 0 }}>{title}</h1>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center', paddingTop: 10, paddingBottom: 8 }}>
        {tabs.map(t => (
          <span
            key={t.id}
            onClick={() => {
              if (t.to) navigate(t.to);
              if (t.onClick) t.onClick();
            }}
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: activeId === t.id ? '#3181d0' : '#333',
              paddingBottom: 8,
              borderBottom: activeId === t.id ? '3px solid #3181d0' : '3px solid transparent',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => { if (activeId !== t.id) e.currentTarget.style.color = '#1a73e8'; }}
            onMouseLeave={(e) => { if (activeId !== t.id) e.currentTarget.style.color = '#333'; }}
          >
            {t.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export default HeaderTab;