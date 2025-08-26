import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
import Header from '../TrangChuDaDangNhap/Header';
import Footer from '../TrangChuDaDangNhap/Footer';
import { addressData } from '../DaTa/addressData';

function DangBai() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    province: '',
    district: '',
    ward: '',
    street: '',
    exactAddress: '',
    category: '',
    price: '',
    area: '',
    title: '',
    description: '',
    images: [],
    contactName: '',
    contactPhone: '',
    postType: 'Tin Vip 1 (30.000/ngày)',
    numberOfDays: '3 ngày'
  });

  const [titleCharCount, setTitleCharCount] = useState(0);
  const [descCharCount, setDescCharCount] = useState(0);
  const [activeTab, setActiveTab] = useState('khu-vuc');
  const [currentUserRole, setCurrentUserRole] = useState('host');
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);
      setCurrentUserRole(parsedUserInfo.role); // dùng trực tiếp role đã lưu khi login
    }
  }, []);

  // Dữ liệu địa chỉ đã được import từ file addressData.js

  // Lấy thông tin user từ localStorage
  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const parsedUserInfo = JSON.parse(userInfo);
      // Tìm role trong accounts
      const accounts = JSON.parse(localStorage.getItem('accounts') || '[]');
      const userAccount = accounts.find(acc => acc.username === parsedUserInfo.username);
      if (userAccount) {
        setCurrentUserRole(userAccount.role);
        // Tự động set category theo role
        if (userAccount.role === 'renter') {
          setFormData(prev => ({ ...prev, category: 'timnguoioghep' }));
        }
      }
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Reset các trường phụ thuộc khi thay đổi trường chính
    if (field === 'province') {
      setFormData(prev => ({
        ...prev,
        district: '',
        ward: '',
        street: '',
        [field]: value
      }));
    } else if (field === 'district') {
      setFormData(prev => ({
        ...prev,
        ward: '',
        street: '',
        [field]: value
      }));
    } else if (field === 'ward') {
      setFormData(prev => ({
        ...prev,
        street: '',
        [field]: value
      }));
    }
  };

  const handleTitleChange = (value) => {
    setFormData(prev => ({ ...prev, title: value }));
    setTitleCharCount(value.length);
  };

  const handleDescriptionChange = (value) => {
    setFormData(prev => ({ ...prev, description: value }));
    setDescCharCount(value.length);
  };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    if (files.length <= 5) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...files]
      }));
    }
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  // Tính toán giá theo loại tin và số ngày
  const calculateTotal = () => {
    let basePrice = 0;
    let dayPrice = 0;

    // Giá theo loại tin
    if (formData.postType === 'Tin Thường (10.000/ngày)') {
      basePrice = 10000;
    }
    else if (formData.postType === 'Tin Vip 1 (30.000/ngày)') {
      basePrice = 30000;
    } else if (formData.postType === 'Tin Vip 2 (50.000/ngày)') {
      basePrice = 50000;
    } else if (formData.postType === 'Tin Vip 3 (80.000/ngày)') {
      basePrice = 80000;
    }

    // Giá theo số ngày
    if (formData.numberOfDays === '3 ngày') {
      dayPrice = 50000;
    } else if (formData.numberOfDays === '7 ngày') {
      dayPrice = 150000;
    } else if (formData.numberOfDays === '15 ngày') {
      dayPrice = 300000;
    }

    return basePrice + dayPrice;
  };

  // Tính ngày hết hạn
  const getExpirationDate = () => {
    const today = new Date();
    const expiration = new Date(today);
    
    if (formData.numberOfDays === '3 ngày') {
      expiration.setDate(today.getDate() + 3);
    } else if (formData.numberOfDays === '7 ngày') {
      expiration.setDate(today.getDate() + 7);
    } else if (formData.numberOfDays === '15 ngày') {
      expiration.setDate(today.getDate() + 15);
    }
    
    return expiration.toLocaleDateString('vi-VN');
  };

  // Lấy giá theo loại tin
  const getPostTypePrice = () => {
    if (formData.postType === 'Tin Thường (10.000/ngày)') {
      return '10.000';
    }
    if (formData.postType === 'Tin Vip 1 (30.000/ngày)') {
      return '30.000';
    } else if (formData.postType === 'Tin Vip 2 (50.000/ngày)') {
      return '50.000';
    } else if (formData.postType === 'Tin Vip 3 (80.000/ngày)') {
      return '80.000';
    }
    return '30.000';
  };

  // Lấy số ngày
  const getNumberOfDays = () => {
    return formData.numberOfDays.split(' ')[0];
  };

  // Lấy giá theo số ngày
  const getDayPrice = () => {
    if (formData.numberOfDays === '3 ngày') {
      return '50.000';
    } else if (formData.numberOfDays === '7 ngày') {
      return '150.000';
    } else if (formData.numberOfDays === '15 ngày') {
      return '300.000';
    }
    return '50.000';
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmitAndPayment = async () => {
    // Kiểm tra các trường bắt buộc
    if (!formData.province || !formData.district || !formData.category || !formData.title || !formData.contactName || !formData.contactPhone) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc!');
      return;
    }

    // Chuyển File ảnh sang Data URL để có thể lưu/hiển thị sau
    const fileToDataUrl = (file) => new Promise((resolve, reject) => {
      try {
        if (typeof file === 'string') return resolve(file);
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      } catch (e) {
        resolve('');
      }
    });

    let imageDataUrls = [];
    try {
      imageDataUrls = await Promise.all((formData.images || []).map(fileToDataUrl));
    } catch (e) {
      console.warn('Không thể chuyển một số ảnh sang Data URL:', e);
    }

    // Lưu thông tin đăng bài vào localStorage để sử dụng ở trang thanh toán
    const postData = {
      ...formData,
      images: imageDataUrls.filter(Boolean),
      totalAmount: calculateTotal(),
      postType: formData.postType,
      numberOfDays: formData.numberOfDays
    };
    localStorage.setItem('postData', JSON.stringify(postData));

    // Chuyển hướng đến trang thanh toán
    navigate('/thanh-toan');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f5f5',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header (ẩn khi là host) */}
      {currentUserRole !== 'host' && <Header />}

      {/* Main Content with Sidebar */}
      <div style={{
        display: 'flex',
        flex: 1
      }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 0 0 0' }}>
          <div style={{ padding: '0 32px', marginBottom: '16px' }}>
            <span
              style={{ color: '#1976d2', cursor: 'pointer', fontSize: '16px' }}
              onClick={() => navigate('/quan-ly-bai-dang')}
            >
              Trang quản lý
            </span>
            <span style={{ margin: '0 8px', color: '#b0b7c3' }}>›</span>
            <span style={{ color: '#333', fontSize: '16px' }}>Đăng tin cho thuê</span>
          </div>
          {/* Title & Tabs */}
          <div style={{
            marginBottom: '20px',
            background: 'transparent',
            padding: '0 32px'
          }}>
            <h1 style={{
              fontSize: '25px',
              fontWeight: '700',
              color: '#333',
              margin: '0 0 10px 0'
            }}>
              Đăng tin cho thuê
            </h1>
            {/* Navigation Tabs */}
            <div style={{
              display: 'flex',
              gap: '32px',
              borderBottom: '1px solid #e0e0e0',
            }}>
              <div
                style={{
                  padding: '8px 0',
                  cursor: 'pointer',
                  color: activeTab === 'khu-vuc' ? '#3181d0ff' : '#666',
                  fontSize: '16px',
                  fontWeight: '500',
                  borderBottom: activeTab === 'khu-vuc' ? '2px solid #3181d0ff' : '2px solid transparent',
                  transition: 'color 0.2s, border-bottom 0.2s'
                }}
                onClick={() => { setActiveTab('khu-vuc'); scrollToSection('khu-vuc'); }}
              >
                Khu vực
              </div>
              <div
                style={{
                  padding: '8px 0',
                  cursor: 'pointer',
                  color: activeTab === 'thong-tin-mo-ta' ? '#3181d0ff' : '#666',
                  fontSize: '16px',
                  fontWeight: '500',
                  borderBottom: activeTab === 'thong-tin-mo-ta' ? '2px solid #3181d0ff' : '2px solid transparent',
                  transition: 'color 0.2s, border-bottom 0.2s'
                }}
                onClick={() => { setActiveTab('thong-tin-mo-ta'); scrollToSection('thong-tin-mo-ta'); }}
              >
                Thông tin mô tả
              </div>
              <div
                style={{
                  padding: '8px 0',
                  cursor: 'pointer',
                  color: activeTab === 'hinh-anh' ? '#3181d0ff' : '#666',
                  fontSize: '16px',
                  fontWeight: '500',
                  borderBottom: activeTab === 'hinh-anh' ? '2px solid #3181d0ff' : '2px solid transparent',
                  transition: 'color 0.2s, border-bottom 0.2s'
                }}
                onClick={() => { setActiveTab('hinh-anh'); scrollToSection('hinh-anh'); }}
              >
                Hình ảnh
              </div>
              <div
                style={{
                  padding: '8px 0',
                  cursor: 'pointer',
                  color: activeTab === 'video' ? '#3181d0ff' : '#666',
                  fontSize: '16px',
                  fontWeight: '500',
                  borderBottom: activeTab === 'video' ? '2px solid #3181d0ff' : '2px solid transparent',
                  transition: 'color 0.2s, border-bottom 0.2s'
                }}
                onClick={() => { setActiveTab('video'); scrollToSection('video'); }}
              >
                Video
              </div>
              <div
                style={{
                  padding: '8px 0',
                  cursor: 'pointer',
                  color: activeTab === 'thong-tin-lien-he' ? '#3181d0ff' : '#666',
                  fontSize: '16px',
                  fontWeight: '500',
                  borderBottom: activeTab === 'thong-tin-lien-he' ? '2px solid #3181d0ff' : '2px solid transparent',
                  transition: 'color 0.2s, border-bottom 0.2s'
                }}
                onClick={() => { setActiveTab('thong-tin-lien-he'); scrollToSection('thong-tin-lien-he'); }}
              >
                Thông tin liên hệ
              </div>
            </div>
          </div>

          {/* Form Container */}
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            flex: 1,
            minWidth: 0,
            margin: '0 100px 0 100px'
          }}>
            {/* Khu vực */}
            <div id="khu-vuc" style={{
              marginBottom: '32px',
              background: '#fafbfc',
              borderRadius: '16px',
              padding: '0px 24px',
              boxShadow: '0 2px 8px rgba(25, 118, 210, 0.04)'
            }}>
              <h3 style={{ marginBottom: '20px', fontSize: '25px', fontWeight: '700', color: '#222' }}>
                Khu vực
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 32px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '17px', fontWeight: '600', color: '#222' }}>
                    Tỉnh/Thành phố <span style={{ color: 'red' }}>(*)</span>
                  </label>
                  <select
                    value={formData.province}
                    onChange={e => handleInputChange('province', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 8px',
                      border: '2px solid #cfd8dc',
                      borderRadius: '10px',
                      fontSize: '18px',
                      color: formData.province ? '#222' : '#888',
                      background: '#fff',
                      outline: 'none',
                      marginBottom: 0
                    }}
                  >
                    <option value="">Chọn Tỉnh/TP</option>
                    {Object.keys(addressData).map(provinceKey => (
                      <option key={provinceKey} value={provinceKey}>
                        {addressData[provinceKey].name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '17px', fontWeight: '600', color: '#222' }}>
                    Quận/Huyện <span style={{ color: 'red' }}>(*)</span>
                  </label>
                  <select
                    value={formData.district}
                    onChange={e => handleInputChange('district', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 8px',
                      border: '2px solid #cfd8dc',
                      borderRadius: '10px',
                      fontSize: '18px',
                      color: formData.district ? '#222' : '#888',
                      background: '#fff',
                      outline: 'none',
                      marginBottom: 0
                    }}
                    disabled={!formData.province}
                  >
                    <option value="">Chọn quận huyện</option>
                    {formData.province && addressData[formData.province] && 
                      Object.keys(addressData[formData.province].districts).map(districtKey => (
                        <option key={districtKey} value={districtKey}>
                          {addressData[formData.province].districts[districtKey].name}
                        </option>
                      ))
                    }
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '17px', fontWeight: '600', color: '#222' }}>
                    Phường/Xã
                  </label>
                  <select
                    value={formData.ward}
                    onChange={e => handleInputChange('ward', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 8px',
                      border: '2px solid #cfd8dc',
                      borderRadius: '10px',
                      fontSize: '18px',
                      color: formData.ward ? '#222' : '#888',
                      background: '#fff',
                      outline: 'none',
                      marginBottom: 0
                    }}
                    disabled={!formData.district}
                  >
                    <option value="">Chọn phường xã</option>
                    {formData.district && formData.province && addressData[formData.province] && 
                      addressData[formData.province].districts[formData.district] &&
                      Object.keys(addressData[formData.province].districts[formData.district].wards).map(wardKey => (
                        <option key={wardKey} value={wardKey}>
                          {addressData[formData.province].districts[formData.district].wards[wardKey].name}
                        </option>
                      ))
                    }
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '17px', fontWeight: '600', color: '#222' }}>
                    Đường/Phố
                  </label>
                  <select
                    value={formData.street}
                    onChange={e => handleInputChange('street', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 8px',
                      border: '2px solid #cfd8dc',
                      borderRadius: '10px',
                      fontSize: '18px',
                      color: formData.street ? '#222' : '#888',
                      background: '#fff',
                      outline: 'none',
                      marginBottom: 0
                    }}
                    disabled={!formData.ward}
                  >
                    <option value="">Chọn đường phố</option>
                    {formData.ward && formData.district && formData.province && addressData[formData.province] && 
                      addressData[formData.province].districts[formData.district] &&
                      addressData[formData.province].districts[formData.district].wards[formData.ward] &&
                      Object.keys(addressData[formData.province].districts[formData.district].wards[formData.ward].streets).map(streetKey => (
                        <option key={streetKey} value={streetKey}>
                          {addressData[formData.province].districts[formData.district].wards[formData.ward].streets[streetKey]}
                        </option>
                      ))
                    }
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '17px', fontWeight: '600', color: '#222' }}>
                    Số nhà
                  </label>
                  <input
                    type="text"
                    value={formData.houseNumber || ''}
                    onChange={e => handleInputChange('houseNumber', e.target.value)}
                    placeholder="Nhập số nhà"
                    style={{
                      width: '100%',
                      padding: '10px 8px',
                      border: '2px solid #cfd8dc',
                      borderRadius: '10px',
                      fontSize: '18px',
                      color: formData.street ? '#222' : '#888',
                      background: '#fff',
                      outline: 'none',
                      marginBottom: 0
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '17px', fontWeight: '600', color: '#222' }}>
                    Địa chỉ
                  </label>
                  <input
                    type="text"
                    value={formData.exactAddress}
                    onChange={e => handleInputChange('exactAddress', e.target.value)}
                    placeholder="Địa chỉ"
                    style={{
                      width: '100%',
                      padding: '10px 5px',
                      border: '2px solid #cfd8dc',
                      borderRadius: '10px',
                      fontSize: '18px',
                      color: formData.street ? '#222' : '#888',
                      background: '#fff',
                      outline: 'none',
                      marginBottom: 0
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Chuyên mục cho thuê */}
            <div style={{
              marginBottom: '32px',
              background: '#fafbfc',
              borderRadius: '16px',
              padding: '0px 24px',
              boxShadow: '0 2px 8px rgba(25, 118, 210, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}>
              <h3 style={{ marginBottom: '8px', fontSize: '18px', fontWeight: '600', width: '100%' }}>
                Chuyên mục cho thuê <span style={{ color: 'red' }}>(*)</span>
              </h3>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 8px',
                  border: '2px solid #cfd8dc',
                  borderRadius: '10px',
                  fontSize: '18px',
                  fontWeight: '400',
                  background: '#fff',
                  color: formData.category ? '#222' : '#888',
                  outline: 'none',
                  marginBottom: 0
                }}
                disabled={currentUserRole === 'renter'}
              >
                <option value="">Chọn chuyên mục</option>
                {currentUserRole === 'renter' ? (
                  <option value="timnguoioghep">Tìm người ở ghép</option>
                ) : (
                  <>
                    <option value="phongtro">Phòng trọ</option>
                    <option value="nhanguyencan">Nhà nguyên căn</option>
                  </>
                )}
              </select>
              {currentUserRole === 'renter' && (
                <div style={{ 
                  marginTop: '8px', 
                  fontSize: '14px', 
                  color: '#666', 
                  fontStyle: 'italic',
                  textAlign: 'center'
                }}>
                  Tài khoản renter chỉ được đăng bài "Tìm người ở ghép"
                </div>
              )}
            </div>

            {/* Thông tin mô tả, Giá, Diện tích */}
            <div id="thong-tin-mo-ta" style={{
              marginBottom: '32px',
              background: '#fafbfc',
              borderRadius: '16px',
              padding: '0px 24px',
              boxShadow: '0 2px 8px rgba(25, 118, 210, 0.04)'
            }}>
              <h3 style={{ marginBottom: '20px', fontSize: '25px', fontWeight: '700' }}>
                Thông tin mô tả
              </h3>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '17px', fontWeight: '600' }}>
                  Tiêu đề
                </label>
                <input
                  type="text"
                  value={formData.title}
                  maxLength={150}
                  onChange={(e) => handleTitleChange(e.target.value.slice(0, 150))}
                  placeholder="Nhập tiêu đề"
                  style={{
                    width: '100%',
                    padding: '10px 8px',
                    border: '2px solid #cfd8dc',
                    borderRadius: '10px',
                    fontSize: '18px',
                    color: '#222',
                    background: '#fff',
                    outline: 'none',
                    marginBottom: 0
                  }}
                />
                <div style={{ textAlign: 'right', fontSize: '12px', color: titleCharCount >= 150 ? 'red' : '#666', marginTop: '3px' }}>
                  {titleCharCount}/150 ký tự
                </div>
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '17px', fontWeight: '600' }}>
                  Mô tả
                </label>
                <textarea
                  value={formData.description}
                  maxLength={1000}
                  onChange={(e) => handleDescriptionChange(e.target.value.slice(0, 1000))}
                  placeholder="Nhập mô tả chi tiết"
                  rows="6"
                  style={{
                    width: '100%',
                    padding: '10px 8px',
                    border: '2px solid #cfd8dc',
                    borderRadius: '10px',
                    fontSize: '18px',
                    color: '#222',
                    background: '#fff',
                    outline: 'none',
                    marginBottom: 0
                  }}
                />
                <div style={{ textAlign: 'right', fontSize: '12px', color: descCharCount >= 1000 ? 'red' : '#666', marginTop: '3px' }}>
                  {descCharCount}/1000 ký tự
                </div>
              </div>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-end' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ marginBottom: '8px', display: 'block', fontSize: '17px', fontWeight: '600' }}>Giá</label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => handleInputChange('price', e.target.value)}
                    placeholder="VD: 2 triệu 500 nghìn"
                    style={{
                      width: '80%',
                      padding: '10px 8px',
                      border: '2px solid #cfd8dc',
                      borderRadius: '10px',
                      fontSize: '18px',
                      color: '#222',
                      background: '#fff',
                      outline: 'none',
                      marginBottom: 0
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ marginBottom: '8px', display: 'block', fontSize: '17px', fontWeight: '600' }}>Diện tích</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      value={formData.area}
                      onChange={(e) => handleInputChange('area', e.target.value)}
                      placeholder="Nhập diện tích"
                      style={{
                        width: '80%',
                        padding: '10px 8px',
                        border: '2px solid #cfd8dc',
                        borderRadius: '10px',
                        fontSize: '18px',
                        color: '#222',
                        background: '#fff',
                        outline: 'none',
                        marginBottom: 0
                      }}
                    />
                    {/* <span style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontSize: '18px',
                      color: '#222',
                      pointerEvents: 'none'
                    }}>m²</span> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Hình ảnh/Video, Video, Liên hệ, Chọn gói đăng tin */}
            <div
              style={{
                marginBottom: '32px',
                background: '#fafbfc',
                borderRadius: '16px',
                padding: '0px 24px',
                boxShadow: '0 2px 8px rgba(25, 118, 210, 0.04)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              {/* Hình ảnh/Video */}
              <div id="hinh-anh" style={{ width: '100%', marginBottom: '32px' }}>
                <h3 style={{ marginBottom: '20px', fontSize: '25px', fontWeight: '700' }}>
                  Hình ảnh
                </h3>
                <div style={{
                  border: '2px dashed #e0e0e0',
                  borderRadius: '8px',
                  padding: '32px',
                  textAlign: 'center',
                  background: '#fafafa'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>📤</div>
                  <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                    Upload ảnh/video
                  </div>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
                    Tối đa 5 ảnh. Dung lượng không quá 6MB.
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" style={{
                    padding: '12px 24px',
                    background: '#1976d2',
                    color: '#fff',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    display: 'inline-block'
                  }}>
                    Chọn file
                  </label>
                </div>

                {/* Preview Images */}
                {formData.images.length > 0 && (
                  <div style={{ marginTop: '16px' }}>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      {formData.images.map((file, index) => (
                        <div key={index} style={{
                          position: 'relative',
                          width: '100px',
                          height: '100px',
                          border: '1px solid #e0e0e0',
                          borderRadius: '8px',
                          overflow: 'hidden'
                        }}>
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index + 1}`}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                          <button
                            onClick={() => removeImage(index)}
                            style={{
                              position: 'absolute',
                              top: '4px',
                              right: '4px',
                              background: 'rgba(0,0,0,0.7)',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '50%',
                              width: '24px',
                              height: '24px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Video */}
              <div id="video" style={{ width: '100%', marginBottom: '32px' }}>
                <h3 style={{ marginBottom: '20px', fontSize: '25px', fontWeight: '700' }}>
                  Video
                </h3>
                <div style={{
                  border: '2px dashed #e0e0e0',
                  borderRadius: '8px',
                  padding: '32px',
                  textAlign: 'center',
                  background: '#fafafa'
                }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎥</div>
                  <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                    Upload video
                  </div>
                  <div style={{ fontSize: '14px', color: '#666', marginBottom: '16px' }}>
                    Dung lượng không quá 50MB.
                  </div>
                  <input
                    type="file"
                    accept="video/*"
                    style={{ display: 'none' }}
                    id="video-upload"
                  />
                  <label htmlFor="video-upload" style={{
                    padding: '12px 24px',
                    background: '#1976d2',
                    color: '#fff',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '600',
                    display: 'inline-block'
                  }}>
                    Chọn video
                  </label>
                </div>
              </div>

              {/* Liên hệ */}
              <div id="thong-tin-lien-he" style={{ width: '100%', marginBottom: '32px' }}>
                <h3 style={{ marginBottom: '20px', fontSize: '25px', fontWeight: '700' }}>
                  Liên hệ
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '17px', fontWeight: '600' }}>
                      Tên
                    </label>
                    <input
                      type="text"
                      value={formData.contactName}
                      onChange={(e) => handleInputChange('contactName', e.target.value)}
                      placeholder="Nhập tên"
                      style={{
                        width: '90%',
                        padding: '10px 8px',
                        border: '2px solid #cfd8dc',
                        borderRadius: '10px',
                        fontSize: '18px',
                        color: '#222',
                        background: '#fff',
                        outline: 'none',
                        marginBottom: 0
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '17px', fontWeight: '600' }}>
                      Số điện thoại
                    </label>
                    <input
                      type="text"
                      value={formData.contactPhone}
                      onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                      placeholder="SĐT"
                      style={{
                        width: '90%',
                        padding: '10px 8px',
                        border: '2px solid #cfd8dc',
                        borderRadius: '10px',
                        fontSize: '18px',
                        color: '#222',
                        background: '#fff',
                        outline: 'none',
                        marginBottom: 0
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Chọn gói đăng tin */}
              <div style={{ width: '100%', marginBottom: '32px' }}>
                <h3 style={{ marginBottom: '20px', fontSize: '25px', fontWeight: '700' }}>
                  Chọn gói đăng tin
                </h3>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '17px', fontWeight: '600' }}>
                    Loại tin
                  </label>
                  <select
                    value={formData.postType}
                    onChange={(e) => handleInputChange('postType', e.target.value)}
                    style={{
                      width: '90%',
                      padding: '10px 8px',
                      border: '2px solid #cfd8dc',
                      borderRadius: '10px',
                      fontSize: '18px',
                      color: '#222',
                      background: '#fff',
                      outline: 'none',
                      marginBottom: 0
                    }}
                  >
                    <option value="Tin Thường (10.000/ngày)">Tin Thường (10.000/ngày)</option>
                    <option value="Tin Vip 1 (30.000/ngày)">Tin Vip 1 (30.000/ngày)</option>
                    <option value="Tin Vip 2 (50.000/ngày)">Tin Vip 2 (50.000/ngày)</option>
                    <option value="Tin Vip 3 (80.000/ngày)">Tin Vip 3 (80.000/ngày)</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '17px', fontWeight: '600' }}>
                    Số ngày
                  </label>
                  <select
                    value={formData.numberOfDays}
                    onChange={(e) => handleInputChange('numberOfDays', e.target.value)}
                    style={{
                      width: '90%',
                      padding: '10px 8px',
                      border: '2px solid #cfd8dc',
                      borderRadius: '10px',
                      fontSize: '18px',
                      color: '#222',
                      background: '#fff',
                      outline: 'none',
                      marginBottom: 0
                    }}
                  >
                    <option value="3 ngày">3 ngày (+50.000đ)</option>
                    <option value="7 ngày">7 ngày (+150.000đ)</option>
                    <option value="15 ngày">15 ngày (+300.000đ)</option>
                  </select>
                </div>
              </div>
              </div>
            </div>

            {/* Thông tin thanh toán */}
            <div style={{
              marginBottom: '32px',
              background: '#c8f1fc',
              borderRadius: '25px',
              padding: '20px 30px',
              // fontSize: '32px',
              // fontWeight: 700,
              color: '#111'
            }}>
              <div style={{ fontWeight: 700, fontSize: '25px', marginBottom: '10px' }}>
                Thông tin thanh toán
              </div>
              <div style={{
                borderTop: '0.5px solid #222',
                margin: '10px 0'
              }} />
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ minWidth: '220px', fontWeight: 500, fontSize: '18px' }}>Loại tin:</div>
                <div style={{ fontWeight: 500, fontSize: '16px', lineHeight: 1.2 }}>
                  {formData.postType}
                </div>
              </div>
              <div style={{
                borderTop: '0.3px solid #222',
                margin: '10px 0'
              }} />
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ minWidth: '220px', fontWeight: 500, fontSize: '18px' }}>Đơn giá:</div>
                <div style={{ fontWeight: 500, fontSize: '16px' }}>{getPostTypePrice()} VNĐ</div>
              </div>
              <div style={{
                borderTop: '0.3px solid #222',
                margin: '10px 0'
              }} />
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ minWidth: '220px', fontWeight: 500, fontSize: '18px' }}>Số ngày:</div>
                <div style={{ fontWeight: 500, fontSize: '16px' }}>{getNumberOfDays()} ngày</div>
              </div>
              <div style={{
                borderTop: '0.3px solid #222',
                margin: '10px 0'
              }} />
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ minWidth: '220px', fontWeight: 500, fontSize: '18px' }}>Phí số ngày:</div>
                <div style={{ fontWeight: 500, fontSize: '16px' }}>{getDayPrice()} VNĐ</div>
              </div>
              <div style={{
                borderTop: '0.3px solid #222',
                margin: '10px 0'
              }} />
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '1px' }}>
                <div style={{ minWidth: '220px', fontWeight: 500, fontSize: '18px' }}>Ngày hết hạn:</div>
                <div style={{ fontWeight: 500, fontSize: '16px' }}>{getExpirationDate()}</div>
              </div>
              <div style={{
                borderTop: '0.3px solid #222',
                margin: '10px 0'
              }} />
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                <div style={{ minWidth: '220px', fontWeight: 500, fontSize: '18px' }}>Thành tiền:</div>
                <div style={{ fontWeight: 700, fontSize: '16px'}}>{calculateTotal().toLocaleString('vi-VN')} VNĐ</div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmitAndPayment}
              style={{
                width: '100%',
                padding: '16px',
                background: '#2196f3',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.background = '#1565c0'}
              onMouseLeave={(e) => e.target.style.background = '#2196f3'}>
              Đăng tin và thanh toán
            </button>
          </div>
        </div>
      </div>

      {/* Footer (ẩn khi là host) */}
      {currentUserRole !== 'host' && <Footer />}
    </div>
  );
}

export default DangBai;
