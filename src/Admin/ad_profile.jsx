import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdProfile = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Đóng dropdown khi click bên ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleProfileClick = () => {
    navigate('/admin/thong-tin-ca-nhan');
    setShowDropdown(false);
  };

  const handleChangePasswordClick = () => {
    navigate('/admin/doi-mat-khau');
    setShowDropdown(false);
  };

  const handleLogoutClick = () => {
    // Xử lý đăng xuất
    alert('Đăng xuất thành công!');
    navigate('/');
    setShowDropdown(false);
  };

  return (
    <div className="user-profile-dropdown" ref={dropdownRef}>
      {/* Nút kích hoạt */}
      <div className="user-info" onClick={toggleDropdown}>
        <div className="avatar">👤</div>
        <span className="username">Admin</span>
        <div className={`dropdown-arrow ${showDropdown ? 'active' : ''}`}>▼</div>
      </div>
      
      {/* Menu thả xuống */}
      {showDropdown && (
        <div className="user-dropdown">
          {/* Profile Summary */}
          <div className="dropdown-profile">
            <div className="dropdown-avatar"><i class="bi bi-person-circle"></i></div>
            <div className="dropdown-user-info">
              <div className="dropdown-username">Admin</div>
              <div className="dropdown-phone">Quản trị viên</div>
            </div>
          </div>
          
          {/* Account Balance */}
          
          
          {/* Menu Items */}
          <div className="dropdown-menu">
            <div className="dropdown-item" onClick={handleProfileClick}>
              <span className="item-icon"><i class="bi bi-person-fill"></i></span>
              <span className="item-text">Thông tin cá nhân</span>
            </div>
            <div className="dropdown-item" onClick={handleChangePasswordClick}>
              <span className="item-icon"><i class="bi bi-lock-fill"></i></span>
              <span className="item-text">Đổi mật khẩu</span>
            </div>
            <div className="dropdown-item" onClick={handleLogoutClick}>
              <span className="item-icon"><i class="bi bi-box-arrow-left"></i></span>
              <span className="item-text">Đăng xuất</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdProfile;
