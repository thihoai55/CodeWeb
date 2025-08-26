import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../DangBai/sidebar';
import Header from '../TrangChuDaDangNhap/Header';
import Footer from '../TrangChuDaDangNhap/Footer';

function PasswordInput({ label, type = 'password', value, onChange, placeholder }) {
  return (
    <div>
      <div style={{ fontSize: '14px', marginBottom: '6px', color: '#333' }}>{label}</div>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%', padding: '10px 12px',
          border: '1px solid #dfe3e8', borderRadius: '6px', fontSize: '15px',
          background: '#f8fafc'
        }}
      />
    </div>
  );
}

function DoiMatKhau() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  // Load thông tin user từ localStorage
  useEffect(() => {
    const loadUserInfo = () => {
      try {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
          const parsedUserInfo = JSON.parse(storedUserInfo);
          setUserInfo(parsedUserInfo);
        }
      } catch (error) {
        console.error('Error loading user info:', error);
      }
    };

    loadUserInfo();
  }, []);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    // Xóa thông báo lỗi khi user bắt đầu nhập
    if (error) setError('');
    if (success) setSuccess('');
  };

  // Hàm kiểm tra mật khẩu cũ
  const verifyOldPassword = (oldPassword) => {
    try {
      const { accounts } = require('../DaTa/account.js');
      
      // Tìm account của user hiện tại
      const userAccount = accounts.find(acc => 
        acc.username === userInfo?.username ||
        acc.email === userInfo?.email ||
        acc.phone === userInfo?.phone
      );
      
      if (userAccount && userAccount.password === oldPassword) {
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error verifying old password:', error);
      return false;
    }
  };

  // Hàm cập nhật mật khẩu mới
  const updatePassword = (newPassword) => {
    try {
      const { accounts } = require('../DaTa/account.js');
      
      // Tìm account cần cập nhật
      const accountIndex = accounts.findIndex(acc => 
        acc.username === userInfo?.username ||
        acc.email === userInfo?.email ||
        acc.phone === userInfo?.phone
      );
      
      if (accountIndex !== -1) {
        // Cập nhật mật khẩu
        accounts[accountIndex].password = newPassword;
        
        // Lưu vào localStorage để các component khác có thể sử dụng
        localStorage.setItem('updatedAccounts', JSON.stringify(accounts));
        
        console.log('Password updated successfully for account:', accounts[accountIndex].username);
        return true;
      } else {
        console.error('Account not found for password update');
        return false;
      }
    } catch (error) {
      console.error('Error updating password:', error);
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
      setError('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    if (form.newPassword.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự.');
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      setError('Mật khẩu mới và nhập lại không khớp.');
      return;
    }

    if (form.oldPassword === form.newPassword) {
      setError('Mật khẩu mới không được trùng với mật khẩu cũ.');
      return;
    }

    // Kiểm tra mật khẩu cũ
    if (!verifyOldPassword(form.oldPassword)) {
      setError('Mật khẩu cũ không đúng.');
      return;
    }

    // Cập nhật mật khẩu mới
    const passwordUpdated = updatePassword(form.newPassword);
    
    if (passwordUpdated) {
      setSuccess('Đổi mật khẩu thành công! Mật khẩu đã được cập nhật.');
      
      // Reset form
      setForm({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      
      // Trigger events để các component khác biết có thay đổi
      window.dispatchEvent(new CustomEvent('passwordUpdated'));
      window.dispatchEvent(new CustomEvent('accountsUpdated'));
      
      // Chuyển hướng sau 2 giây
      setTimeout(() => {
        navigate('/thong-tin-ca-nhan');
      }, 2000);
    } else {
      setError('Có lỗi xảy ra khi cập nhật mật khẩu. Vui lòng thử lại.');
    }
  };

  // Lấy role để ẩn header/footer khi là host
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
        <div style={{ flex: 1, padding: '20px 0 0 0' }}>
          <div style={{ padding: '0 32px', marginBottom: '16px' }}>
            <span
              style={{ color: '#1976d2', cursor: 'pointer', fontSize: '16px' }}
              onClick={() => navigate('/quan-ly-bai-dang')}
            >
              Trang quản lý
            </span>
            <span style={{ margin: '0 8px', color: '#b0b7c3' }}>›</span>
            <span style={{ color: '#333', fontSize: '16px' }}>Đổi mật khẩu</span>
          </div>

          <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: '10px', padding: '20px', margin: '0 100px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ paddingBottom: '16px', borderBottom: '1px solid #ebe9e9ff' }}>
              <h1 style={{ fontSize: '20px', fontWeight: '700', margin: '0', color: '#111' }}>Đổi mật khẩu</h1>
            </div>

            <div style={{ maxWidth: '820px', margin: '16px auto 0', display: 'grid', gridTemplateColumns: '1fr', gap: '16px', fontSize: '18px', fontWeight: '500' }}>
              <PasswordInput label={'Mật khẩu cũ'} value={form.oldPassword} onChange={(v) => handleChange('oldPassword', v)} placeholder={'Nhập mật khẩu cũ'} />
              <PasswordInput label={'Mật khẩu mới'} value={form.newPassword} onChange={(v) => handleChange('newPassword', v)} placeholder={'Nhập mật khẩu mới'} />
              <PasswordInput label={'Nhập lại mật khẩu'} value={form.confirmPassword} onChange={(v) => handleChange('confirmPassword', v)} placeholder={'Nhập lại mật khẩu'} />

              {error && (
                <div style={{ color: '#d32f2f', fontSize: '15px' }}>{error}</div>
              )}

              {success && (
                <div style={{ 
                  color: '#2e7d32', 
                  fontSize: '15px', 
                  padding: '12px',
                  background: '#e8f5e8',
                  borderRadius: '6px',
                  border: '1px solid #c8e6c9'
                }}>
                  ✅ {success}
                </div>
              )}

              <button type="submit" style={{
                width: '100%', padding: '12px', background: '#1976d2', color: '#fff',
                border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: '600', cursor: 'pointer'
              }}>Đổi mật khẩu</button>

              <div style={{ fontSize: '15px', fontWeight: '400' }}>
                Bạn quên mật khẩu? <span style={{ color: '#1976d2', cursor: 'pointer' }} onClick={() => alert('Chức năng khôi phục mật khẩu sẽ được bổ sung')}>Bấm vào đây để khôi phục.</span>
              </div>
            </div>
          </form>
        </div>
      </div>
      {currentUserRole !== 'host' && <Footer />}
    </div>
  );
}

export default DoiMatKhau;


