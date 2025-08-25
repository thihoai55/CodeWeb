import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AdHeader from './ad_header';
import AdSidebar from './ad_sidebar';
import './Admin.css';

const SuaThongTinNguoiDung = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Lấy thông tin người dùng từ navigation state
  const userData = location.state?.userData;
  
  const [formData, setFormData] = useState({
    tenNguoiDung: '',
    email: '',
    soDienThoai: '',
    ngaySinh: '',
    vaiTro: '',
    diaChi: ''
  });

  useEffect(() => {
    if (userData) {
      // Cập nhật form với thông tin người dùng đã chọn
      setFormData({
        tenNguoiDung: userData.fullName || '',
        email: userData.email || '',
        soDienThoai: userData.phone || '',
        ngaySinh: '',
        vaiTro: userData.role || '',
        diaChi: 'Thành phố Huế' // Giá trị mặc định
      });
    } else {
      // Nếu không có dữ liệu, quay về trang danh sách
      navigate('/admin/quan-ly-nguoi-dung');
    }
  }, [userData, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý lưu thông tin
    console.log('Thông tin đã được cập nhật:', formData);
    alert('Thông tin đã được cập nhật thành công!');
    navigate('/admin/quan-ly-nguoi-dung');
  };

  const handleCancel = () => {
    // Quay về trang danh sách
    navigate('/admin/quan-ly-nguoi-dung');
  };

  if (!userData) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="admin-container">
      <AdHeader />
      <div className="admin-content">
        <AdSidebar />
        <div className="main-content">
          {/* Breadcrumbs */}
          <div className="page-header">
            <div className="breadcrumbs">
              
              <span>Quản lý người dùng</span>
            </div>
          </div>

          {/* Form Container */}
          <div className="edit-user-form">
            <div className="form-header">
              <h2 className="form-title">Chỉnh sửa thông tin người dùng</h2>
              <button className="btn-cancel" onClick={handleCancel}>
                ✕ Hủy
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="tenNguoiDung">Tên người dùng</label>
                  <input
                    type="text"
                    id="tenNguoiDung"
                    name="tenNguoiDung"
                    value={formData.tenNguoiDung}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="soDienThoai">Số điện thoại</label>
                  <input
                    type="tel"
                    id="soDienThoai"
                    name="soDienThoai"
                    value={formData.soDienThoai}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="ngaySinh">Ngày sinh</label>
                  <input
                    type="date"
                    id="ngaySinh"
                    name="ngaySinh"
                    value={formData.ngaySinh}
                    onChange={handleInputChange}
                    placeholder="Ngày sinh"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="vaiTro">Vai trò</label>
                  <input
                    type="text"
                    id="vaiTro"
                    name="vaiTro"
                    value={formData.vaiTro}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="diaChi">Địa chỉ hiện tại</label>
                  <input
                    type="text"
                    id="diaChi"
                    name="diaChi"
                    value={formData.diaChi}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-save">
                  <span className="save-icon">💾</span>
                  Lưu thông tin
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuaThongTinNguoiDung;
