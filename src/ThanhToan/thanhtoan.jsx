import React, { useState } from 'react';
import Sidebar from '../DangBai/sidebar';
import Header from '../TrangChuDaDangNhap/Header';
import Footer from '../TrangChuDaDangNhap/Footer';

function ThanhToan() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('bank-transfer');
  const [exportInvoice, setExportInvoice] = useState(false);

  // Lấy thông tin từ localStorage
  const postData = JSON.parse(localStorage.getItem('postData') || '{}');
  const paymentAmount = postData.totalAmount ? `${postData.totalAmount.toLocaleString()}₫` : '50.000₫';
  const transferContent = `BĐĐ001 ${Math.floor(Math.random() * 100000)} VIP ${postData.postType?.includes('Vip 1') ? '1' : '2'} ${postData.numberOfDays?.split(' ')[0]} NGAY`;

  const paymentMethods = [
    {
      id: 'account-balance',
      name: 'Số dư tài khoản',
      description: 'Thanh toán bằng số dư trong tài khoản',
      image: '💰'
    },
    {
      id: 'qr-code',
      name: 'QR Code',
      description: 'Quét mã QR để thanh toán',
      image: 'public/anh/qr.png'
    },
    {
      id: 'momo',
      name: 'MoMo',
      description: 'Thanh toán qua ví MoMo',
      image: 'anh/momo.png'
    },
    {
      id: 'domestic-card',
      name: 'Thẻ nội địa',
      description: 'Thẻ ATM nội địa',
      image: 'anh/thenoidia.jpg'
    },
    {
      id: 'international-card',
      name: 'Thẻ quốc tế',
      description: 'Visa, Mastercard, JCB',
      image: 'anh/thequote.jpg'
    },
    {
      id: 'bank-transfer',
      name: 'Chuyển khoản ngân hàng',
      description: 'Chuyển khoản trực tiếp',
      image: 'anh/bank.jpg'
    }
  ];

  const handlePayment = () => {
    console.log('Thanh toán với phương thức:', selectedPaymentMethod);
    console.log('Thông tin đăng bài:', postData);
    if (selectedPaymentMethod === 'bank-transfer') {
      alert(`Vui lòng chuyển khoản ${paymentAmount} với nội dung: ${transferContent}`);
    } else {
      alert('Chức năng thanh toán sẽ được tích hợp sau!');
    }
    localStorage.removeItem('postData');
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
          {/* Title & Breadcrumbs */}
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
              Thanh toán đăng bài
            </h1>
            {/* Breadcrumbs */}
            <div style={{
              fontSize: '16px',
              color: '#666',
              marginBottom: '20px'
            }}>
              Trang quản lý {'>'} Đăng bài {'>'} Thanh toán đăng bài
            </div>
          </div>

          {/* Payment Content */}
          <div style={{
            padding: '0 32px',
            flex: 1
          }}>
            {/* Order Summary */}
            {postData.title && (
              <div style={{
                marginBottom: '32px',
                background: '#c8f1fc',
                borderRadius: '25px',
                padding: '25px 24px',
                fontSize: '32px',
                fontWeight: 700,
                color: '#111'
              }}>
                <div style={{ fontWeight: 700, fontSize: '25px', marginBottom: '20px' }}>
                  Thông tin đăng bài
                </div>
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '15px' }}>
                  <div style={{ minWidth: '220px', fontWeight: 500, fontSize: '18px' }}>Tiêu đề:</div>
                  <div style={{ fontWeight: 500, fontSize: '16px' }}>{postData.title}</div>
                </div>
                <div style={{
                  borderTop: '0.3px solid #222',
                  margin: '10px 0'
                }} />
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '15px' }}>
                  <div style={{ minWidth: '220px', fontWeight: 500, fontSize: '18px' }}>Loại tin:</div>
                  <div style={{ fontWeight: 500, fontSize: '16px' }}>{postData.postType}</div>
                </div>
                <div style={{
                  borderTop: '0.3px solid #222',
                  margin: '10px 0'
                }} />
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '15px' }}>
                  <div style={{ minWidth: '220px', fontWeight: 500, fontSize: '18px' }}>Số ngày:</div>
                  <div style={{ fontWeight: 500, fontSize: '16px' }}>{postData.numberOfDays}</div>
                </div>
                <div style={{
                  borderTop: '0.3px solid #222',
                  margin: '10px 0'
                }} />
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                  <div style={{ minWidth: '220px', fontWeight: 500, fontSize: '18px' }}>Tổng tiền:</div>
                  <div style={{ fontWeight: 500, fontSize: '16px' }}>{paymentAmount}</div>
                </div>
              </div>
            )}

            {/* Payment phương thức thanh toán */}
            <div style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              // width: '100%',
              // maxWidth: '1000px'
            }}>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '20px',
                color: '#333'
              }}>
                Chọn phương thức thanh toán
              </h3>
              
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    style={{
                      border: selectedPaymentMethod === method.id ? '2px solid #3181d0ff' : '1px solid #e0e0e0',
                      borderRadius: '8px',
                      padding: '10px',
                      cursor: 'pointer',
                      background: selectedPaymentMethod === method.id ? '#f0f8ff' : '#fff',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      // maxWidth: '1110px'
                    }}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '8px',
                        background: '#f8f9fa',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '24px',
                        border: '1px solid #e9ecef',
                        overflow: 'hidden'
                      }}>
                        {method.image.startsWith('public/') || method.image.startsWith('anh/') ? (
                          <img 
                            src={method.image.startsWith('public/') ? method.image.replace('public/', '/') : `/${method.image}`}
                            alt={method.name}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover'
                            }}
                          />
                        ) : (
                          method.image
                        )}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontWeight: '600',
                          fontSize: '16px',
                          color: '#333',
                          marginBottom: '4px'
                        }}>
                          {method.name}
                        </div>
                        <div style={{
                          fontSize: '14px',
                          color: '#666'
                        }}>
                          {method.description}
                        </div>
                      </div>
                    </div>
                    
                    {/* Radio Button */}
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: selectedPaymentMethod === method.id ? '2px solid #3181d0ff' : '2px solid #d1d5db',
                      background: selectedPaymentMethod === method.id ? '#3181d0ff' : '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative'
                    }}>
                      {selectedPaymentMethod === method.id && (
                        <div style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: '#fff'
                        }} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Invoice Option */}
            <div style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <input
                  type="checkbox"
                  id="exportInvoice"
                  checked={exportInvoice}
                  onChange={(e) => setExportInvoice(e.target.checked)}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer'
                  }}
                />
                <label
                  htmlFor="exportInvoice"
                  style={{
                    fontSize: '16px',
                    fontWeight: '500',
                    color: '#333',
                    cursor: 'pointer'
                  }}
                >
                  Xuất hóa đơn
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{
              display: 'flex',
              gap: '16px',
              marginTop: '32px'
            }}>
              <button
                onClick={() => window.history.back()}
                style={{
                  flex: 1,
                  padding: '16px 32px',
                  background: '#f5f5f5',
                  color: '#666',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.background = '#e0e0e0'}
                onMouseLeave={(e) => e.target.style.background = '#f5f5f5'}
              >
                Quay lại
              </button>
              <button
                onClick={handlePayment}
                style={{
                  flex: 1,
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
                onMouseLeave={(e) => e.target.style.background = '#4d9ff2ff'}
              >
                Thanh toán {paymentAmount}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default ThanhToan;
