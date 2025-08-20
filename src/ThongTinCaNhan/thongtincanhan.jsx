import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../DangBai/sidebar';
import Header from '../TrangChuDaDangNhap/Header';
import Footer from '../TrangChuDaDangNhap/Footer';

function ThongTinCaNhan() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    accountId: '115777',
    fullName: 'Hihjj',
    email: 'nguyenthihoai552004@gmail.com',
    phone: '0819923174',
    address: '',
    avatarPreview: 'anh/avt.jpg',
    avatarFile: null
  });

  const handleChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setProfile(prev => ({ ...prev, avatarFile: file, avatarPreview: previewUrl }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Gọi API cập nhật thông tin cá nhân ở đây
    alert('Cập nhật thông tin thành công');
  };

  const Input = ({ icon, type = 'text', value, onChange, placeholder, readOnly }) => (
    <div style={{ position: 'relative' }}>
      <span style={{
        position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
        color: '#666', fontSize: '16px'
      }}>{icon}</span>
      <input
        type={type}
        value={value}
        onChange={e => onChange && onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        style={{
          width: '100%', padding: '10px 12px 10px 36px',
          border: '1px solid #dfe3e8', borderRadius: '6px', fontSize: '15px',
          background: readOnly ? '#f6f8fa' : '#fff', color: '#111'
        }}
      />
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />

        <div style={{ flex: 1, padding: '15px 0 0 0' }}>
          <div style={{ padding: '0 32px', marginBottom: '16px' }}>
            <span
              style={{ color: '#1976d2', cursor: 'pointer', fontSize: '16px' }}
              onClick={() => navigate('/quan-ly-bai-dang')}
            >
              Trang quản lý
            </span>
            <span style={{ margin: '0 8px', color: '#b0b7c3' }}>›</span>
            <span style={{ color: '#333', fontSize: '16px' }}>Thông tin cá nhân</span>
          </div>

          <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: '10px', padding: '20px', margin: '0 100px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ padding: '0 0 16px 0', borderBottom: '1px solid #ebe9e9ff' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: '#111' }}>Thông tin cá nhân</h1>
            </div>

            <div style={{ maxWidth: '820px', margin: '16px auto 0', display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>

              <div>
                <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '8px', color: '#333' }}>Ảnh đại diện</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ width: '120px', height: '120px', borderRadius: '50%', overflow: 'hidden', background: '#f2f4f7', border: '1px solid #e6e9ef' }}>
                    <img src={profile.avatarPreview} alt="Avatar preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div>
                    <input id="avatar-input" type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
                    <label htmlFor="avatar-input" style={{ padding: '8px 16px', background: '#6b778d', color: '#fff', borderRadius: '6px', cursor: 'pointer', display: 'inline-block', fontSize: '15px', fontWeight: 500 }}>Chọn ảnh khác</label>
                  </div>
                </div>
              </div>

              <div>
                <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '8px', color: '#333' }}>Mã tài khoản</div>
                <Input icon="#" value={profile.accountId} readOnly />
              </div>

              <div>
                <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '8px', color: '#333' }}>Họ tên</div>
                <Input icon="👤" value={profile.fullName} onChange={(v) => handleChange('fullName', v)} placeholder="Nhập họ tên" />
              </div>

              <div>
                <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '8px', color: '#333' }}>Email</div>
                <Input icon="✉️" type="email" value={profile.email} onChange={(v) => handleChange('email', v)} placeholder="Nhập email" />
              </div>

              <div>
                <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '8px', color: '#333' }}>Số điện thoại</div>
                <Input icon="📞" value={profile.phone} onChange={(v) => handleChange('phone', v)} placeholder="Nhập số điện thoại" />
              </div>

              <div>
                <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '8px', color: '#333' }}>Địa chỉ liên hệ</div>
                <Input icon="📍" value={profile.address} onChange={(v) => handleChange('address', v)} placeholder="Nhập địa chỉ" />
              </div>

              <div>
                <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '8px', color: '#333' }}>Mật khẩu</div>
                <div style={{ fontSize: '15px' }}>
                  <span style={{ color: '#1976d2', cursor: 'pointer' }} onClick={() => navigate('/doi-mat-khau')}>Bấm vào đây để thay đổi mật khẩu</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '30px', textAlign: 'center', justifyContent: 'end', display: 'flex' }}>
              <button type="submit" style={{
                background: '#1976d2', color: '#fff', border: 'none', borderRadius: '6px',
                padding: '12px 24px', fontSize: '15px', fontWeight: 600, cursor: 'pointer'
              }}>Cập nhật</button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ThongTinCaNhan;


