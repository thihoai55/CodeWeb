import React, { useState } from 'react';
import Sidebar from './sidebar';
import Header from '../TrangChuDaDangNhap/Header';
import Footer from '../TrangChuDaDangNhap/Footer';

function DangBai() {
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

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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

  const calculateTotal = () => {
    const unitPrice = 30000;
    const days = 3;
    return unitPrice * days;
  };

  const getExpirationDate = () => {
    const today = new Date();
    const expiration = new Date(today);
    expiration.setDate(today.getDate() + 3);
    return expiration.toLocaleDateString('vi-VN');
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f5f5',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <Header />

      {/* Main Content with Sidebar */}
      <div style={{
        display: 'flex',
        flex: 1
      }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 0 0 0' }}>
          {/* Title & Tabs */}
          <div style={{
            marginBottom: '20px',
            width: '100%',
            background: 'transparent',
            padding: '0 32px'
          }}>
            <h1 style={{
              fontSize: '28px',
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
              // paddingBottom: '16px'
            }}>
              <div style={{
                padding: '8px 0',
                cursor: 'pointer',
                color: '#666',
                fontSize: '16px',
                fontWeight: '500',
                borderBottom: '2px solid transparent'
              }}
                onClick={() => scrollToSection('khu-vuc')}>
                Khu vực
              </div>
              <div style={{
                padding: '8px 0',
                cursor: 'pointer',
                color: '#666',
                fontSize: '16px',
                fontWeight: '500',
                borderBottom: '2px solid transparent'
              }}
                onClick={() => scrollToSection('thong-tin-mo-ta')}>
                Thông tin mô tả
              </div>
              <div style={{
                padding: '8px 0',
                cursor: 'pointer',
                color: '#666',
                fontSize: '16px',
                fontWeight: '500',
                borderBottom: '2px solid transparent'
              }}
                onClick={() => scrollToSection('hinh-anh')}>
                Hình ảnh
              </div>
              <div style={{
                padding: '8px 0',
                cursor: 'pointer',
                color: '#666',
                fontSize: '16px',
                fontWeight: '500',
                // borderBottom: '2px solid #ff6b35'
              }}
                onClick={() => scrollToSection('video')}>
                Video
              </div>
              <div style={{
                padding: '8px 0',
                cursor: 'pointer',
                color: '#666',
                fontSize: '16px',
                fontWeight: '500',
                borderBottom: '2px solid transparent'
              }}
                onClick={() => scrollToSection('thong-tin-lien-he')}>
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
            margin: '0 100px 100px 100px'
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
                    <option value="hanoi">Hà Nội</option>
                    <option value="hcm">TP. Hồ Chí Minh</option>
                    <option value="danang">Đà Nẵng</option>
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
                  >
                    <option value="">Chọn quận huyện</option>
                    <option value="tayho">Quận Tây Hồ</option>
                    <option value="hoankiem">Quận Hoàn Kiếm</option>
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
                  >
                    <option value="">Chọn phường xã</option>
                    <option value="phuong1">Phường 1</option>
                    <option value="phuong2">Phường 2</option>
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
                  >
                    <option value="">Chọn đường phố</option>
                    <option value="tranphu">Trần Phú</option>
                    <option value="nguyenhuu">Nguyễn Hữu Thọ</option>
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
              >
                <option value="">Chọn chuyên mục</option>
                <option value="phongtro">Phòng trọ</option>
                <option value="nhanguyencan">Nhà nguyên căn</option>
                <option value="timnguoioghep">Tìm người ở ghép</option>
              </select>
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
                    marginBottom: 0,
                    resize: 'vertical'
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
                      <option value="Tin Vip 1 (30.000/ngày)">Tin Vip 1 (30.000/ngày)</option>
                      <option value="Tin Vip 2 (50.000/ngày)">Tin Vip 2 (50.000/ngày)</option>
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
                      <option value="3 ngày">3 ngày</option>
                      <option value="7 ngày">7 ngày</option>
                      <option value="15 ngày">15 ngày</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Thông tin thanh toán */}
            {/* <div style={{
              marginBottom: '32px',
              background: '#c8f1fc',
              borderRadius: '28px',
              padding: '24px 32px',
              fontSize: '32px',
              fontWeight: 400,
              color: '#111'
            }}>
              <div style={{ fontWeight: 700, fontSize: '38px', marginBottom: '16px' }}>
                Thông tin thanh toán
              </div>
              <div style={{
                borderTop: '3px solid #222',
                margin: '16px 0'
              }} />
              <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div style={{ minWidth: '220px', fontWeight: 500 }}>Loại tin:</div>
                <div style={{ fontWeight: 500, fontSize: '32px', lineHeight: 1.2 }}>
                  Đứng đầu danh sách các tin đăng. TIÊU ĐỀ MÀU ĐỎ, IN HOA
                </div>
              </div>
              <div style={{
                borderTop: '3px solid #222',
                margin: '16px 0'
              }} />
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ minWidth: '220px', fontWeight: 500 }}>Đơn giá:</div>
                <div style={{ fontWeight: 500, fontSize: '32px' }}>{'30.000'}</div>
              </div>
              <div style={{
                borderTop: '3px solid #222',
                margin: '16px 0'
              }} />
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ minWidth: '220px', fontWeight: 500 }}>Số ngày:</div>
                <div style={{ fontWeight: 500, fontSize: '32px' }}>{'3'}</div>
              </div>
              <div style={{
                borderTop: '3px solid #222',
                margin: '16px 0'
              }} />
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ minWidth: '220px', fontWeight: 500 }}>Ngày hết hạn:</div>
                <div style={{ fontWeight: 500, fontSize: '32px' }}>{getExpirationDate()}</div>
              </div>
              <div style={{
                borderTop: '3px solid #222',
                margin: '16px 0'
              }} />
              <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                <div style={{ minWidth: '220px', fontWeight: 500 }}>Thành tiền:</div>
                <div style={{ fontWeight: 700, fontSize: '32px' }}>{calculateTotal().toLocaleString()}</div>
              </div>
            </div> */}

            {/* Submit Button */}
            <button style={{
              width: '100%',
              padding: '16px',
              background: '#4d9ff2ff',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
              onMouseEnter={(e) => e.target.style.background = '#1565c0'}
              onMouseLeave={(e) => e.target.style.background = '#4d9ff2ff'}>
              Đăng tin và thanh toán
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default DangBai;
