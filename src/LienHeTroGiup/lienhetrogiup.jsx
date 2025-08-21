import React, { useState } from 'react';
import Header from '../TrangChuDaDangNhap/Header';
import Footer from '../TrangChuDaDangNhap/Footer';

function ContactInput({ label, type = 'text', value, onChange, placeholder, required, error, multiline = false }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ fontSize: '16px', marginBottom: '6px', color: '#333', fontWeight: '500' }}>
        {label} {required && <span style={{ color: '#d32f2f' }}>*</span>}
      </div>
      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          rows="4"
          style={{
            width: '100%', padding: '10px 12px',
            border: `1px solid ${error ? '#d32f2f' : '#dfe3e8'}`, borderRadius: '6px', fontSize: '15px',
            background: '#fff', resize: 'vertical', fontFamily: 'inherit'
          }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: '100%', padding: '10px 12px',
            border: `1px solid ${error ? '#d32f2f' : '#dfe3e8'}`, borderRadius: '6px', fontSize: '15px',
            background: '#fff'
          }}
        />
      )}
      {error && <div style={{ color: '#d32f2f', fontSize: '12px', marginTop: '4px' }}>{error}</div>}
    </div>
  );
}

function LienHeTroGiup() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    content: '',
    captcha: ''
  });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [captchaCode] = useState('6FA4');

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Vui lòng nhập tên của bạn';
    if (!form.email.trim()) newErrors.email = 'Vui lòng nhập email';
    if (!form.content.trim()) newErrors.content = 'Vui lòng nhập nội dung liên hệ';
    if (!form.captcha.trim()) newErrors.captcha = 'Vui lòng nhập mã xác nhận';
    else if (form.captcha.toUpperCase() !== captchaCode) newErrors.captcha = 'Mã xác nhận không đúng';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // TODO: Gọi API gửi liên hệ
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setForm({ name: '', email: '', phone: '', content: '', captcha: '' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
      <Header />
      
      <div style={{ flex: 1, padding: '40px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', background: '#fff', borderRadius: '8px', padding: '30px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#333', margin: '0 0 20px 0', textAlign: 'center' }}>
            Liên hệ trực tuyến
          </h1>
          
          <div style={{ borderBottom: '1px solid #ddddddff', marginBottom: '30px' }}></div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '90px'}}>
            {/* Form Section */}
            <div>
              <form onSubmit={handleSubmit}>
                <ContactInput 
                  label="Tên của bạn" 
                  value={form.name} 
                  onChange={(value) => handleChange('name', value)} 
                  placeholder="Nhập tên của bạn" 
                  required 
                  error={errors.name}
                />
                
                <ContactInput 
                  label="Email" 
                  type="email" 
                  value={form.email} 
                  onChange={(value) => handleChange('email', value)} 
                  placeholder="Nhập email" 
                  required 
                  error={errors.email}
                />
                
                <ContactInput 
                  label="Điện thoại" 
                  type="tel" 
                  value={form.phone} 
                  onChange={(value) => handleChange('phone', value)} 
                  placeholder="Nhập số điện thoại"
                />
                
                <ContactInput 
                  label="Nội dung liên hệ" 
                  value={form.content} 
                  onChange={(value) => handleChange('content', value)} 
                  placeholder="Nhập nội dung liên hệ" 
                  required 
                  multiline 
                  error={errors.content}
                />
                
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '16px', marginBottom: '6px', color: '#333', fontWeight: '500' }}>
                    Mã xác nhận <span style={{ color: '#d32f2f' }}>*</span>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={form.captcha}
                      onChange={e => handleChange('captcha', e.target.value)}
                      placeholder="Nhập mã xác nhận"
                      style={{
                        flex: 1, padding: '10px 12px',
                        border: `1px solid ${errors.captcha ? '#d32f2f' : '#dfe3e8'}`, borderRadius: '6px', fontSize: '15px',
                        background: '#fff'
                      }}
                    />
                    <div style={{
                      width: '80px', height: '40px', background: '#7b7b7bff',
                      borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '16px', fontWeight: 'bold', color: '#333', fontFamily: 'Arial Black, Comic Sans, Tahoma bold',
                      position: 'relative', overflow: 'hidden'
                    }}>
                      <div style={{ position: 'absolute', top: '2px', left: '2px', width: '2px', height: '2px', background: '#fff', borderRadius: '50%' }}></div>
                      <div style={{ position: 'absolute', top: '8px', right: '4px', width: '1px', height: '1px', background: '#fff', borderRadius: '50%' }}></div>
                      <div style={{ position: 'absolute', bottom: '6px', left: '6px', width: '1px', height: '1px', background: '#fff', borderRadius: '50%' }}></div>
                      {captchaCode}
                    </div>
                  </div>
                  {errors.captcha && <div style={{ color: '#d32f2f', fontSize: '12px', marginTop: '4px' }}>{errors.captcha}</div>}
                </div>
                
                <button type="submit" style={{
                  width: '100%', padding: '12px', background: '#1976d2', color: '#fff',
                  border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: '600', cursor: 'pointer'
                }}>
                  Gửi liên hệ
                </button>
              </form>
            </div>
            
            {/* Contact Info Section */}
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#333', margin: '0 0 16px 0', textTransform: 'uppercase' }}>
                THÔNG TIN LIÊN HỆ
              </h2>
              
              <p style={{ fontSize: '16px', color: '#666', marginBottom: '24px', lineHeight: '1.5' }}>
                Chúng tôi biết bạn có rất nhiều sự lựa chọn. Nhưng cảm ơn vì đã lựa chọn ThuePhongTro.com
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ fontSize: '16px', color: '#333' }}>
                  <strong>Điện thoại:</strong> 0819 923 174
                </div>
                <div style={{ fontSize: '16px', color: '#333' }}>
                  <strong>Email:</strong> nhathoainhan@gmail.com
                </div>
                <div style={{ fontSize: '16px', color: '#333' }}>
                  <strong>Zalo:</strong> 0819 923 174
                </div>
                {/* <div style={{ fontSize: '14px', color: '#333' }}>
                  <strong>Viber:</strong> 09678.333.78
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Success Toast */}
      {showToast && (
        <div style={{
          position: 'fixed', top: '20px', right: '20px', background: '#4caf50', color: '#fff',
          padding: '16px 24px', borderRadius: '6px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 1000, fontSize: '14px', fontWeight: '500'
        }}>
          Thông tin liên hệ của bạn đã được gửi thành công
        </div>
      )}
      
      <Footer />
    </div>
  );
}

export default LienHeTroGiup;
