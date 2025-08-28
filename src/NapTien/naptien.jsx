import React, { useState, useEffect } from 'react';
import Header from '../TrangChuDaDangNhap/Header';
import Footer from '../TrangChuDaDangNhap/Footer';
import Sidebar from '../DangBai/sidebar';
import { useNavigate } from 'react-router-dom';

function NapTien() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(50000);
  const presetAmounts = [50000, 100000, 200000, 500000, 1000000, 2000000, 5000000];

  const [step, setStep] = useState(1);
  const [countdown, setCountdown] = useState(580); // 09:40
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    let timerId;
    if (step === 2) {
      setCountdown(580);
      timerId = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timerId);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => timerId && clearInterval(timerId);
  }, [step]);

  const formatTime = (s) => {
    const mm = String(Math.floor(s / 60)).padStart(2, '0');
    const ss = String(s % 60).padStart(2, '0');
    return `00:${mm}:${ss}`;
  };

  const handleContinue = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleCancel = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      // navigate('/nap-tien');
      setStep(1);
    }, 1200);
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
        <div style={{ flex: 1, padding: '20px 0 0 0' }}>
          <div style={{ padding: '0 32px', marginBottom: '16px' }}>
            <span style={{ color: '#1976d2', cursor: 'pointer', fontSize: '16px' }} onClick={() => navigate('/quan-ly-bai-dang')}>Trang quản lý</span>
            <span style={{ margin: '0 8px', color: '#b0b7c3' }}>›</span>
            <span style={{ color: '#333', fontSize: '16px' }}>Nạp tiền</span>
          </div>

          {step === 1 && (
            <div style={{ background: '#fff', borderRadius: '10px', padding: '20px', margin: '0 100px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h1 style={{ fontSize: '22px', fontWeight: 600, margin: '0 0 16px 0', color: '#111' }}>Chọn số tiền cần nạp</h1>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px', marginBottom: '16px' }}>
                {presetAmounts.map((v) => (
                  <button
                    key={v}
                    onClick={() => setAmount(v)}
                    onMouseEnter={(e) => {
                      if (amount !== v) {
                        e.currentTarget.style.background = '#f5faff';
                        e.currentTarget.style.borderColor = '#76b4f3ff';
                        e.currentTarget.style.color = '#1976d2';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (amount !== v) {
                        e.currentTarget.style.background = '#fff';
                        e.currentTarget.style.borderColor = '#90caf9';
                        e.currentTarget.style.color = '#1976d2';
                      }
                    }}
                    style={{
                      padding: '12px 14px', borderRadius: '12px', border: `2px solid ${amount === v ? '#1976d2' : '#90caf9'}`,
                      background: amount === v ? '#e3f2fd' : '#fff', color: '#1976d2', fontWeight: 700, cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center'
                    }}
                  >
                    <span style={{
                      width: '12px', height: '12px', borderRadius: '50%',
                      border: `3px solid ${amount === v ? '#1976d2' : '#90caf9'}`,
                      background: amount === v ? '#1976d2' : 'transparent'
                    }} />
                    {v.toLocaleString('vi-VN')}
                  </button>
                ))}
              </div>

              <div style={{ fontSize: '16px', color: '#111', margin: '8px 0 6px 0' }}>Hoặc nhập số tiền cần nạp</div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',       
                  border: '1px solid #b3b3b3ff',
                  borderRadius: '15px',     
                  overflow: 'hidden',
                  marginTop: '10px'
                }}
              >
                <input
                  value={amount.toString()}
                  onChange={(e) =>
                    setAmount(Number(e.target.value.replace(/\D/g, '')) || 0)
                  }
                  placeholder="Hoặc nhập số tiền cần nạp"
                  style={{
                    flex: 1,
                    padding: '10px 12px',
                    border: 'none',
                    outline: 'none',
                    fontSize: '15px'
                  }}
                />
                <div
                  style={{
                    padding: '10px 20px',
                    borderLeft: '1px solid #b3b3b3ff',
                    background: '#edededff',
                    fontSize: '15px'
                  }}
                >
                  đ
                </div>
              </div>

              {/* {amountInWords && (
                <div style={{ color: '#ef5350', fontSize: '12px', marginTop: '6px' }}>{amountInWords}</div>
              )} */}

              <div style={{ background: '#cee1f8ff', borderRadius: '8px', padding: '12px 16px', marginTop: '16px', marginBottom: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" />
                  <span>Xuất hóa đơn cho giao dịch</span>
                </label>
              </div>

              <button onClick={handleContinue} style={{ width: '100%', padding: '14px', background: '#4d9ff2ff', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 700, cursor: 'pointer' }}>
                Tiếp tục
              </button>
            </div>
          )}

          {step === 2 && (
            <div style={{ background: '#fff', borderRadius: '10px', padding: '20px', margin: '0 100px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <h2 style={{ fontSize: '18px', margin: 0, color: '#333' }}>Bước 2: Thanh toán bằng cách scan mã QRCODE bên dưới</h2>
              <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', margin: '16px 0' }}>
                <div style={{ border: '1px solid #e0e0e0', padding: '12px', borderRadius: '8px' }}>
                  <img src="anh/qr.png" alt="QR" style={{ width: '260px', height: '260px', objectFit: 'contain' }} />
                </div>
                <button onClick={handleCancel} style={{ marginTop: '12px', padding: '8px 16px', background: '#666', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Hủy ({formatTime(countdown)})</button>
              </div>

              <div style={{ marginTop: '8px' }}>
                <div style={{ fontWeight: 700, color: '#333', fontSize: '20px', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Hướng dẫn thanh toán bằng QR Code
                </div>

                <div style={{ background: '#1976d2', borderRadius: '8px', padding: '16px', color: '#fff', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fff', color: '#1976d2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>1</div>
                    <div>Đăng nhập ứng dụng ► Chọn chức năng Quét mã QR</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fff', color: '#1976d2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>2</div>
                    <div>Quét QR Code của Giao dịch</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fff', color: '#1976d2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>3</div>
                    <div>Xác nhận thông tin giao dịch và hoàn tất thanh toán</div>
                  </div>
                </div>

                <div style={{ background: '#1976d2', color: '#fff', padding: '10px 16px' }}>
                  Ứng dụng hỗ trợ quét QR thanh toán
                </div>
                <div style={{ display: 'flex', gap: '25px', alignItems: 'center', marginTop: '12px', flexWrap: 'wrap', background: '#e0e0e0f', justifyContent: 'center' }}>
                  <img src="anh/viettinbank.png" alt="momo" style={{ width: '90px', height: '90px', borderRadius: '10px' }} />
                  <img src="anh/mbbank.png" alt="vnPay" style={{ width: '90px', height: '90px', boderRadius: '10px' }} />
                  <img src="anh/vpbank.png" alt="bank1" style={{ width: '90px', height: '90px' }} />
                  <img src="anh/VCB.png" alt="bank2" style={{ width: '90px', height: '90px' }} />
                  <img src="anh/saccombank.jpg" alt="bank2" style={{ width: '90px', height: '90px' }} />
                  <img src="anh/myVIB.png" alt="bank2" style={{ width: '90px', height: '90px' }} />
                  <img src="anh/agribank.png" alt="bank2" style={{ width: '90px', height: '90px' }} />
                  <img src="anh/abbank.jpg" alt="bank2" style={{ width: '90px', height: '90px' }} />
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {showToast && (
        <div style={{
          position: 'fixed', top: '20px', right: '20px', background: '#4caf50', color: '#fff',
          padding: '14px 18px', borderRadius: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)', zIndex: 9999
        }}>
          Giao dịch đã được huỷ thành công
        </div>
      )}

      {currentUserRole !== 'host' && <Footer />}
    </div>
  );
}

export default NapTien;