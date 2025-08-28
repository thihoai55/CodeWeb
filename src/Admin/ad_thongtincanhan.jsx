import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdHeader from './ad_header';
import AdSidebar from './ad_sidebar';
import './Admin.css';

const AdThongTinCaNhan = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    accountId: '# admin',
    fullName: 'Quản Trị Viên',
    email: 'admin@codeweb.vn',
    phone: '0900000001',
    address: 'Hà Nội, Việt Nam'
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUpdate = () => {
    alert('Cập nhật thông tin thành công!');
    
  };

  const handleChangePassword = () => {
    navigate('/admin/doi-mat-khau');
  };

  const handleImageChange = () => {
    // Logic để chọn ảnh mới
    alert('Chức năng chọn ảnh sẽ được thêm sau!');
  };

  return (
    <div className="admin-container">
      <AdHeader />
      
      <div className="admin-content">
        <AdSidebar />
        
        <main className="main-content">
          <div className="profile-page">
            <div className="profile-header">
              <h1 className="profile-title">Thông tin cá nhân</h1>
            </div>

            <div className="profile-content">
              {/* Avatar Section */}
              <div className="avatar-section">
                <div className="avatar-label">Ảnh đại diện</div>
                <div className="avatar-container">
                  <div className="avatar-image"><i class="bi bi-person-circle"></i></div>
                  <button 
                    className="btn-change-avatar" 
                    onClick={handleImageChange}
                  >
                    Chọn ảnh khác
                  </button>
                </div>
              </div>

              {/* User Information Form */}
              <div className="info-form">
                <div className="form-group">
                  <label>Mã tài khoản</label>
                  <input
                    type="text"
                    value={formData.accountId}
                    readOnly
                    className="form-input readonly"
                  />
                </div>

                <div className="form-group">
                  <label>Họ tên</label>
                  <div className="input-with-icon">
                    <span className="input-icon"><i class="bi bi-person-fill"></i></span>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="form-input"
                      placeholder="Nhập họ tên"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <div className="input-with-icon">
                    <span className="input-icon"><i class="bi bi-envelope"></i></span>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="form-input"
                      placeholder="Nhập email"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Số điện thoại</label>
                  <div className="input-with-icon">
                    <span className="input-icon"><i class="bi bi-phone"></i></span>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="form-input"
                      placeholder="Nhập số điện thoại"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Địa chỉ liên hệ</label>
                  <div className="input-with-icon">
                    <span className="input-icon"><i class="bi bi-geo-alt"></i></span>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="form-input"
                      placeholder="Nhập địa chỉ"
                    />
                  </div>
                </div>

                
              </div>

              {/* hanh dong button */}
              <div className="form-actions">
                <button className="btn-update" onClick={handleUpdate}>
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdThongTinCaNhan;
