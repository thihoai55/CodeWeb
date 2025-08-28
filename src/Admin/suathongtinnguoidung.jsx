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

    // useEffect để khởi tạo form với dữ liệu người dùng được chọn
  useEffect(() => {
    if (userData) {
      // Cập nhật form với thông tin người dùng đã chọn từ trang danh sách
      setFormData({
        tenNguoiDung: userData.fullName || '',
        email: userData.email || '',
        soDienThoai: userData.phone || '',
        ngaySinh: '',
        vaiTro: userData.role || '',
        diaChi: 'Thành phố Huế' 
      });
    } else {
      // Nếu không có dữ liệu user, quay về trang quản lý người dùng
      // Lưu ý: Route này phải khớp với route đã định nghĩa trong App.js
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

    // Hàm xử lý khi nhấn nút "Lưu thông tin"
  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn reload trang mặc định của form
    
    try {
      // Bước 1: Lấy danh sách accounts từ localStorage
      const storedAccounts = localStorage.getItem('accounts');
      let accountsList = storedAccounts ? JSON.parse(storedAccounts) : [];
      
      // Bước 2: Tìm user trong accounts bằng email, id hoặc username
      const userIndex = accountsList.findIndex(account => 
        account.email === userData.email || 
        account.id === userData.id ||
        account.username === userData.username
      );
      
      // Bước 3: Cập nhật thông tin người dùng trong accounts nếu tìm thấy
      if (userIndex !== -1) {
        accountsList[userIndex] = {
          ...accountsList[userIndex],
          fullName: formData.tenNguoiDung,
          email: formData.email,
          phone: formData.soDienThoai,
          role: formData.vaiTro,
          address: formData.diaChi,
        };
        localStorage.setItem('accounts', JSON.stringify(accountsList));
      }
      
      // Bước 4: Cập nhật userInfo nếu đang là user hiện tại đang đăng nhập
      const currentUserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      if (currentUserInfo.email === userData.email || currentUserInfo.id === userData.id) {
        const updatedUserInfo = {
          ...currentUserInfo,
          fullName: formData.tenNguoiDung,
          email: formData.email,
          phone: formData.soDienThoai,
          role: formData.vaiTro,
          address: formData.diaChi
        };
        localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
      }
      
      // Bước 5: Lưu thông tin đã cập nhật vào localStorage để xemthongtinnguoidung có thể đọc và cập nhật state
      const updatedUserData = {
        ...userData,
        fullName: formData.tenNguoiDung,
        email: formData.email,
        phone: formData.soDienThoai,
        role: formData.vaiTro,
        address: formData.diaChi
      };
      
      // Lưu vào localStorage với key riêng để xemthongtinnguoidung có thể cập nhật state
      localStorage.setItem('updatedUserData', JSON.stringify(updatedUserData));
      
      // Bước 6: Chuyển hướng về trang quản lý người dùng (không hiện alert)
      console.log('Thông tin đã được cập nhật:', formData);
      
      // Chuyển hướng về trang quản lý người dùng
      // Lưu ý: Route này phải khớp với route đã định nghĩa trong App.js
      navigate('/admin/quan-ly-nguoi-dung');
      
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin:', error);
      alert('Có lỗi xảy ra khi cập nhật thông tin!');
    }
  };

  // Hàm xử lý khi nhấn nút "Hủy" - quay về trang quản lý người dùng
  const handleCancel = () => {
    // Chuyển hướng về trang quản lý người dùng
    // Lưu ý: Route này phải khớp với route đã định nghĩa trong App.js
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
