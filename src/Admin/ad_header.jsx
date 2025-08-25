import React from 'react';
import AdProfile from './ad_profile';

const AdHeader = () => {
  return (
    <header className="admin-header">
      <div className="header-left">
        <div className="logo">
          <div className="logo-icon">🏠</div>
          <div className="logo-text">MOTEL HOME</div>
        </div>
      </div>
      <div className="header-right">
        <div className="header-icons">
          <div className="icon"><i className="bi bi-bell"></i></div>
          <div className="icon"><i className="bi bi-chat-left-text"></i></div>
        </div>
        {/* Thay thế phần user-info cũ bằng AdProfile component */}
        <AdProfile />
      </div>
    </header>
  );
};

export default AdHeader;
