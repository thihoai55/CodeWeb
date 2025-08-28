import React, { useState } from 'react';
import AdHeader from './ad_header';
import AdSidebar from './ad_sidebar';
import './Admin.css';

const AdDoiMatKhau = () => {
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (field, value) => {
    setPasswords(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleChangePassword = () => {
    // Kiểm tra mật khẩu mới và xác nhận có khớp nhau không
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('Mật khẩu mới và xác nhận mật khẩu không khớp nhau!');
      return;
    }

    // Kiểm tra mật khẩu cũ có được nhập không
    if (!passwords.oldPassword) {
      alert('Vui lòng nhập mật khẩu cũ!');
      return;
    }

    // Kiểm tra mật khẩu mới có được nhập không
    if (!passwords.newPassword) {
      alert('Vui lòng nhập mật khẩu mới!');
      return;
    }

    // Xử lý đổi mật khẩu
    alert('Đổi mật khẩu thành công!');
    
    // Reset form
    setPasswords({
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handleForgotPassword = () => {
    alert('Chức năng khôi phục mật khẩu sẽ được thêm sau!');
  };

  return (
    <div className="admin-container">
      <AdHeader />
      
      <div className="admin-content">
        <AdSidebar />
        
        <main className="main-content">
          {/* Tiêu đề trang */}
          <div className="change-password-header">
            <h1 className="page-title">Đổi mật khẩu</h1>
          </div>

          {/* Form đổi mật khẩu*/}
          <div className="change-password-form">
            <div className="form-group">
              <label>Mật khẩu cũ</label>
              <input
                type="password"
                value={passwords.oldPassword}
                onChange={(e) => handleInputChange('oldPassword', e.target.value)}
                className="form-input"
                placeholder="Nhập mật khẩu cũ"
              />
            </div>

            <div className="form-group">
              <label>Mật khẩu mới</label>
              <input
                type="password"
                value={passwords.newPassword}
                onChange={(e) => handleInputChange('newPassword', e.target.value)}
                className="form-input"
                placeholder="Nhập mật khẩu mới"
              />
            </div>

            <div className="form-group">
              <label>Nhập lại mật khẩu</label>
              <input
                type="password"
                value={passwords.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="form-input"
                placeholder="Nhập lại mật khẩu"
              />
            </div>

            {/* Nút đổi mật khẩu*/}
            <div className="form-actions">
              <button className="btn-change-password" onClick={handleChangePassword}>
                Đổi mật khẩu
              </button>
            </div>

            {/* Liên kết quên mật khẩu*/}
            <div className="forgot-password">
              Bạn quên mật khẩu?
              <button 
                className="btn-forgot-password"
                onClick={handleForgotPassword}
              >
                
                 Bấm vào đây để khôi phục.
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdDoiMatKhau;
