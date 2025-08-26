import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../DangBai/sidebar';
import Header from '../TrangChuDaDangNhap/Header';
import Footer from '../TrangChuDaDangNhap/Footer';

function ProfileInput({ icon, type = 'text', value, onChange, placeholder, readOnly }) {
  return (
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
}

function ThongTinCaNhan() {
  const navigate = useNavigate();
  const role = (localStorage.getItem('userRole')) || (JSON.parse(localStorage.getItem('userInfo')||'{}')?.role) || '';
  const [profile, setProfile] = useState({
    accountId: '',
    fullName: '',
    email: '',
    phone: '',
    address: '',
    avatarPreview: 'anh/avt.jpg',
    avatarFile: null
  });

  // Thêm useEffect để load thông tin user từ localStorage
  useEffect(() => {
    const loadUserInfo = () => {
      try {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
          const parsedUserInfo = JSON.parse(storedUserInfo);
          
          // Cập nhật profile với thông tin từ localStorage
          setProfile(prev => ({
            ...prev,
            accountId: parsedUserInfo.username || '',
            fullName: parsedUserInfo.name || '',
            email: parsedUserInfo.email || '',
            phone: parsedUserInfo.phone || '',
            avatarPreview: parsedUserInfo.avatar || 'anh/avt.jpg'
          }));
        }
      } catch (error) {
        console.error('Error loading user info:', error);
      }
    };

    loadUserInfo();
    
    // Lắng nghe sự thay đổi localStorage
    window.addEventListener('storage', loadUserInfo);
    
    return () => {
      window.removeEventListener('storage', loadUserInfo);
    };
  }, []);

  const handleChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    setProfile(prev => ({ ...prev, avatarFile: file, avatarPreview: previewUrl }));
  };

  // Hàm cập nhật account data trực tiếp
  const updateAccountData = (updatedUserInfo) => {
    try {
      // Import accounts từ file account.js
      const { accounts } = require('../DaTa/account.js');
      
      // Tìm account cần cập nhật
      const accountIndex = accounts.findIndex(acc => 
        acc.username === updatedUserInfo.username ||
        acc.email === updatedUserInfo.email ||
        acc.phone === updatedUserInfo.phone
      );
      
      if (accountIndex !== -1) {
        // Cập nhật thông tin account
        accounts[accountIndex] = {
          ...accounts[accountIndex],
          name: updatedUserInfo.name,
          email: updatedUserInfo.email,
          phone: updatedUserInfo.phone
        };
        
        // Lưu vào localStorage để các component khác có thể sử dụng
        localStorage.setItem('updatedAccounts', JSON.stringify(accounts));
        
        console.log('Account data updated successfully:', accounts[accountIndex]);
        return true;
      } else {
        console.error('Account not found for update');
        return false;
      }
    } catch (error) {
      console.error('Error updating account data:', error);
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Cập nhật localStorage với thông tin mới
    try {
      const storedUserInfo = localStorage.getItem('userInfo');
      if (storedUserInfo) {
        const parsedUserInfo = JSON.parse(storedUserInfo);
        const updatedUserInfo = {
          ...parsedUserInfo,
          name: profile.fullName,
          email: profile.email,
          phone: profile.phone,
          avatar: profile.avatarPreview
        };
        
        // Cập nhật localStorage
        localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
        
        // Cập nhật account data
        const accountUpdated = updateAccountData(updatedUserInfo);
        
        if (accountUpdated) {
          alert('Cập nhật thông tin thành công! Thông tin đã được đồng bộ với tài khoản.');
          
          // Trigger event để các component khác biết có thay đổi
          window.dispatchEvent(new CustomEvent('userInfoUpdated', {
            detail: updatedUserInfo
          }));
          
          // Trigger event để cập nhật accounts
          window.dispatchEvent(new CustomEvent('accountsUpdated'));
        } else {
          alert('Cập nhật thông tin thành công! Nhưng có lỗi khi đồng bộ với tài khoản.');
        }
      }
    } catch (error) {
      console.error('Error updating user info:', error);
      alert('Có lỗi xảy ra khi cập nhật thông tin');
    }
  };

  // Ẩn Header/Footer khi là host
  const currentUserRole = (() => {
    try {
      const userInfo = localStorage.getItem('userInfo');
      return userInfo ? JSON.parse(userInfo).role : null;
    } catch (e) { return null; }
  })();

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
      {currentUserRole !== 'host' && <Header />}

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
                <ProfileInput icon="#" value={profile.accountId} readOnly />
              </div>

              <div>
                <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '8px', color: '#333' }}>Họ tên</div>
                <ProfileInput icon="👤" value={profile.fullName} onChange={(v) => handleChange('fullName', v)} placeholder="Nhập họ tên" />
              </div>

              <div>
                <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '8px', color: '#333' }}>Email</div>
                <ProfileInput icon="✉️" type="email" value={profile.email} onChange={(v) => handleChange('email', v)} placeholder="Nhập email" />
              </div>

              <div>
                <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '8px', color: '#333' }}>Số điện thoại</div>
                <ProfileInput icon="📞" value={profile.phone} onChange={(v) => handleChange('phone', v)} placeholder="Nhập số điện thoại" />
              </div>

              <div>
                <div style={{ fontSize: '16px', fontWeight: 500, marginBottom: '8px', color: '#333' }}>Địa chỉ liên hệ</div>
                <ProfileInput icon="📍" value={profile.address} onChange={(v) => handleChange('address', v)} placeholder="Nhập địa chỉ" />
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