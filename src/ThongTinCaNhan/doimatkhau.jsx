import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../DangBai/sidebar';
import Header from '../TrangChuDaDangNhap/Header';
import Footer from '../TrangChuDaDangNhap/Footer';

function DoiMatKhau() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
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
    // TODO: Gọi API đổi mật khẩu
    alert('Đổi mật khẩu thành công');
    navigate('/thong-tin-ca-nhan');
  };

  const Input = ({ label, type = 'password', value, onChange, placeholder }) => (
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

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <div style={{ flex: 1, padding: '20px 0 0 0' }}>
          <div style={{ padding: '0 32px', marginBottom: '16px' }}>
            <span
              style={{ color: '#1976d2', cursor: 'pointer', fontSize: '14px' }}
              onClick={() => navigate('/quan-ly-bai-dang')}
            >
              Trang quản lý
            </span>
            <span style={{ margin: '0 8px', color: '#b0b7c3' }}>›</span>
            <span style={{ color: '#333', fontSize: '14px' }}>Đổi mật khẩu</span>
          </div>

          <form onSubmit={handleSubmit} style={{ background: '#fff', borderRadius: '10px', padding: '20px', margin: '0 100px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ paddingBottom: '16px', borderBottom: '1px solid #eee' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: '#111' }}>Đổi mật khẩu</h1>
            </div>

            <div style={{ maxWidth: '820px', margin: '16px auto 0', display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
              <Input label={'Mật khẩu cũ'} value={form.oldPassword} onChange={(v) => handleChange('oldPassword', v)} placeholder={'Nhập mật khẩu cũ'} />
              <Input label={'Mật khẩu mới'} value={form.newPassword} onChange={(v) => handleChange('newPassword', v)} placeholder={'Nhập mật khẩu mới'} />
              <Input label={'Nhập lại mật khẩu'} value={form.confirmPassword} onChange={(v) => handleChange('confirmPassword', v)} placeholder={'Nhập lại mật khẩu'} />

              {error && (
                <div style={{ color: '#d32f2f', fontSize: '14px' }}>{error}</div>
              )}

              <button type="submit" style={{
                width: '100%', padding: '12px', background: '#1e5aa7', color: '#fff',
                border: 'none', borderRadius: '6px', fontSize: '15px', fontWeight: 600, cursor: 'pointer'
              }}>Đổi mật khẩu</button>

              <div style={{ fontSize: '14px' }}>
                Bạn quên mật khẩu? <span style={{ color: '#1976d2', cursor: 'pointer' }} onClick={() => alert('Chức năng khôi phục mật khẩu sẽ được bổ sung')}>Bấm vào đây để khôi phục.</span>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default DoiMatKhau;


