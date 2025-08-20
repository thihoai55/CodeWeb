import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeIdx, setActiveIdx] = useState(0);

  const menuItems = [
    { label: 'Quản lý bài đăng', icon: '📋', path: '/quan-ly-bai-dang' },
    { label: 'Đăng bài mới', icon: '📝', path: '/dang-bai' },
    { label: 'Thông tin cá nhân', icon: '👤', path: '/thong-tin-ca-nhan' },
    { label: 'Đổi mật khẩu', icon: '🔒', path: '/doi-mat-khau' },
    { label: 'Lịch sử nạp tiền', icon: '⏱️', path: '/lich-su-nap-tien' },
    { label: 'Lịch sử giao dịch', icon: '📄', path: '/lich-su-giao-dich' },
    { label: 'Thông báo', icon: '🔔', path: '/thong-bao' },
    { label: 'Liên hệ & trợ giúp', icon: '❓', path: '/lien-he-tro-giup' },
    { label: 'Hợp đồng cho thuê', icon: '📑', path: '/hop-dong-cho-thue' },
  ];

  // Xác định active item dựa trên current path
  const getActiveIndex = () => {
    const currentPath = location.pathname;
    const activeIndex = menuItems.findIndex(item => item.path === currentPath);
    return activeIndex >= 0 ? activeIndex : 0;
  };

  const handleMenuClick = (idx, path) => {
    setActiveIdx(idx);
    navigate(path);
  };

  return (
    <div style={{
      width: '260px',
      background: '#fff',
      borderRight: '1px solid #e0e0e0',
      padding: '24px 16px',
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      boxSizing: 'border-box', 
      // position: 'fixed'
    }}>
      {/* User Info */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '15px',
        paddingBottom: '16px',
        borderBottom: '1px solid #e0e0e0'
      }}>
        <img
          src="anh/avt.jpg"
          alt="Avatar"
          style={{
            width: '70px',
            height: '70px',
            borderRadius: '50%',
            objectFit: 'cover',
            // border: '2px solid #90caf9'
          }}
        />
        <div>
          <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '7px', color: '#3181d0ff' }}>
            Hehe
          </div>
          <div style={{ fontSize: '15px', color: '#666' }}>
            0819923174
          </div>
        </div>
      </div>

      {/* Tài khoản */}
      <div style={{
        marginBottom: '15px',
        padding: '10px',
        background: '#e5e5edff',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(25, 118, 210, 0.1)'
      }}>
        <div style={{ fontSize: '14px', color: '#666' }}>Số dư tài khoản</div>
        <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px', color: '#333' }}>0 đ</div>

        <div style={{ fontSize: '14px', color: '#666' }}>Mã tài khoản</div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '16px',
          fontWeight: '600',
          marginBottom: '12px',
          color: '#333'
        }}>
          <span>115777</span>
          <span style={{
            cursor: 'pointer',
            fontSize: '18px'
          }}>📋</span>
        </div>

        <button style={{
          width: '100%',
          padding: '10px',
          background: '#4d9ff2ff',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '15px',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(25, 118, 210, 0.1)'
        }} onClick={() => navigate('/nap-tien')}>
          Nạp tiền
        </button>
      </div>

      {/* Menu */}
      <div>
        {menuItems.map((item, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '5px 10px',
              marginBottom: '5px',
              borderRadius: '7px',
              fontSize: '15px',
              fontWeight: item.color ? '600' : '500',
              color: getActiveIndex() === idx ? '#1976d2' : (item.color || '#222'),
              backgroundColor: getActiveIndex() === idx ? '#e3f2fd' : (item.color ? '#f1f8ff' : 'transparent'),
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s'
            }}
            onClick={() => handleMenuClick(idx, item.path)}
            onMouseEnter={e => {
              if (getActiveIndex() !== idx) e.currentTarget.style.background = '#f5f5f5';
            }}
            onMouseLeave={e => {
              if (getActiveIndex() !== idx) e.currentTarget.style.background = item.color ? '#f1f8ff' : 'transparent';
            }}
          >
            <span style={{ marginRight: '5px', fontSize: '18px' }}>{item.icon}</span>
            {item.label}
          </div>
        ))}
      </div>

      {/* Đăng xuất */}
      <div style={{
        marginTop: '10px',
        borderTop: '1px solid #e0e0e0',
        paddingTop: '5px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          padding: '5px 10px',
          borderRadius: '7px',
          fontSize: '15px',
          color: '#333',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'background 0.2s'
        }}
          onMouseEnter={e => e.currentTarget.style.background = '#f5f5f5'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          onClick={() => navigate('/')}
        >
          <span style={{ marginRight: '5px', fontSize: '18px' }}>↩️</span>
          Đăng xuất
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
