import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../DangBai/sidebar';
import Header from '../TrangChuDaDangNhap/Header';
import Footer from '../TrangChuDaDangNhap/Footer';
import { accounts as defaultAccounts } from '../DaTa/account.js';
import { giaoDichTheoTaiKhoan } from '../DaTa/lichSuGiaoDich';

function ThanhToan() {
  const navigate = useNavigate();
  // State cho phương thức thanh toán và xuất hóa đơn
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('bank-transfer'); // mặc định là chuyển khoản
  const [exportInvoice, setExportInvoice] = useState(false); // mặc định không xuất hóa đơn
  const [isProcessing, setIsProcessing] = useState(false); // trạng thái đang xử lý thanh toán, chống double click
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  // Xác định role hiện tại để điều khiển Header (host: ẩn, renter: hiện)
  const showHeader = useMemo(() => {
    try {
      const ui = JSON.parse(localStorage.getItem('userInfo') || '{}');
      return ui?.role !== 'host';
    } catch {
      return true; // mặc định hiện nếu không xác định được
    }
  }, []);

  // Lấy thông tin đăng bài từ localStorage
  const postData = JSON.parse(localStorage.getItem('postData') || '{}');

  // Tính toán số tiền thanh toán
  const paymentAmount = postData.totalAmount ? `${postData.totalAmount.toLocaleString('vi-VN')} VNĐ` : '0 VNĐ';

  // Ảnh đầu tiên (Data URL) nếu có
  const firstImageDataUrl = Array.isArray(postData.images) && typeof postData.images[0] === 'string' ? postData.images[0] : '';

  // Parse số ngày an toàn
  const numberOfDaysOnly = (String(postData.numberOfDays || '').match(/\d+/)?.[0] || '0'); //match là toán tử lấy số đầu tiên, ví dụ "30 ngày" -> "30"

  // Tạo nội dung chuyển khoản tự động (dùng số ngày đã parse)
  const transferContent = `BĐĐ ${Math.floor(Math.random() * 100000)} ${postData.postType?.includes('Vip 1') ? 'VIP1' : postData.postType?.includes('Vip 2') ? 'VIP2' : postData.postType?.includes('Vip 3') ? 'VIP3' : 'THUONG'} ${numberOfDaysOnly} NGAY`;

  const paymentMethods = [
    { id: 'account-balance', name: 'Số dư tài khoản', description: 'Thanh toán bằng số dư trong tài khoản', image: '💰' },
    { id: 'qr-code', name: 'QR Code', description: 'Quét mã QR để thanh toán', image: 'public/anh/qr.png' },
    { id: 'momo', name: 'MoMo', description: 'Thanh toán qua ví MoMo', image: 'anh/momo.png' },
    { id: 'domestic-card', name: 'Thẻ nội địa', description: 'Thẻ ATM nội địa', image: 'anh/thenoidia.jpg' },
    { id: 'international-card', name: 'Thẻ quốc tế', description: 'Visa, Mastercard, JCB', image: 'anh/thequocte.jpg' },
    { id: 'bank-transfer', name: 'Chuyển khoản ngân hàng', description: 'Chuyển khoản trực tiếp', image: 'anh/bank.jpg' }
  ];

  // Sinh mã tin tự tăng theo danh sách bài của chính tài khoản: BD001, BD002, ...
  // (Đọc danh sách từ khóa userPosts_<username> để tránh đếm lẫn giữa các tài khoản)
  const getNextPostId = () => {
    try {
      //lấy thông tin user từ localStorage
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      //tạo key lưu danh sách bài đăng theo user
      const key = `userPosts_${userInfo?.username || ''}`;
      //lấy danh sách bài đăng hiện có
      const currentPosts = JSON.parse(localStorage.getItem(key) || '[]');
      //tìm mã lớn nhất hiện có trong danh sách bài đăng
      const maxFromPosts = currentPosts.reduce((max, p) => {
        const match = String(p.id || '').match(/^BD(\d+)$/);
        return match ? Math.max(max, parseInt(match[1], 10)) : max;
      }, 0);
      //lấy số đếm đã lưu trong localStorage (riêng theo user) để tránh trùng nếu xóa bài
      //nếu không có thì dùng 0
      const storedCounter = parseInt(localStorage.getItem(`postIdCounter_${userInfo?.username || 'global'}`) || '0', 10) || 0;
      const next = Math.max(maxFromPosts, storedCounter) + 1;

      localStorage.setItem(`postIdCounter_${userInfo?.username || 'global'}`, String(next));
      return `BD${String(next).padStart(3, '0')}`;
    } catch {
      // Fallback nếu có lỗi
      const fallback = Date.now() % 1000; // chỉ để tránh trùng
      return `BD${String(fallback).padStart(3, '0')}`;
    }
  };

  // Xử lý thanh toán
  const handlePayment = async () => {
    if (isProcessing) return; // Ngăn chặn click nhiều lần
    setIsProcessing(true);

    try {
      // 1) Xác thực người dùng hiện tại
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
      if (!userInfo?.username) {
        alert('Bạn cần đăng nhập để thanh toán.');
        setIsProcessing(false);
        return;
      }

      // 2) Lấy danh sách accounts từ localStorage (hoặc seed từ defaultAccounts nếu chưa có)
      const storedAccounts = localStorage.getItem('accounts');
      const accountsList = storedAccounts ? JSON.parse(storedAccounts) : defaultAccounts;

      // 3) Tìm account của user
      const idx = accountsList.findIndex(a => a.username === userInfo.username);
      if (idx === -1) {
        alert('Không tìm thấy tài khoản của bạn.');
        setIsProcessing(false);
        return;
      }

      const total = Number(postData.totalAmount || 0);
      if (Number.isNaN(total) || total <= 0) {
        alert('Số tiền thanh toán không hợp lệ.');
        setIsProcessing(false);
        return;
      }

      // 4) Kiểm tra số dư đủ trước khi cho thanh toán (áp dụng cho mọi phương thức)
      if ((accountsList[idx].balance || 0) < total) {
        alert('Số dư tài khoản không đủ để thanh toán!');
        setIsProcessing(false);
        return;
      }

      // 5) Thực hiện thanh toán theo phương thức (hiển thị thông tin nếu cần)
      if (selectedPaymentMethod === 'bank-transfer') {
        // Thông tin chuyển khoản mô phỏng
        console.log(`Vui lòng chuyển khoản ${paymentAmount} với nội dung: ${transferContent}`);
      }

      // 6) Trừ tiền và cập nhật lại accounts + lưu lại vào localStorage
      const balanceBefore = accountsList[idx].balance || 0;
      accountsList[idx].balance = balanceBefore - total;
      localStorage.setItem('accounts', JSON.stringify(accountsList));

      localStorage.setItem('updatedAccounts', JSON.stringify(accountsList)); // cho Sidebar
      try {
        const latestUserInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
        if (latestUserInfo && latestUserInfo.username === accountsList[idx].username) {
          latestUserInfo.balance = accountsList[idx].balance;
          localStorage.setItem('userInfo', JSON.stringify(latestUserInfo));
        }
      } catch { }
      // Gửi sự kiện để các component khác (Header, Sidebar) cập nhật lại
      window.dispatchEvent(new Event('accountsUpdated'));
      window.dispatchEvent(new Event('userInfoUpdated'));

      // 7) Tạo bài đăng mới và lưu vào danh sách bài theo tài khoản hiện tại
      const newPost = {
        id: getNextPostId(), // Mã tin dạng BD001, BD002, ...
        type: postData.category === 'phongtro' ? 'Phòng trọ' : postData.category === 'nhanguyencan' ? 'Nhà nguyên căn' : postData.category === 'timnguoioghep' ? 'Tìm người ở ghép' : 'Không xác định',
        vipType: postData.postType?.includes('Vip 1') ? 'Tin VIP 1' : postData.postType?.includes('Vip 2') ? 'Tin VIP 2' : postData.postType?.includes('Vip 3') ? 'Tin VIP 3' : 'Tin thường',
        title: postData.title,
        price: postData.price,
        area: postData.area,
        description: postData.description,
        image: firstImageDataUrl || '',
        status: 'Đang hiển thị',
        startDate: new Date().toLocaleDateString('vi-VN'),
        endDate: (() => {
          const days = parseInt(numberOfDaysOnly, 10) || 0;
          const end = new Date(Date.now() + days * 24 * 60 * 60 * 1000);
          return end.toLocaleDateString('vi-VN');
        })(),
        address: `${postData.exactAddress}, ${postData.street}, ${postData.ward}, ${postData.district}, ${postData.province}`,
        contactName: postData.contactName,
        contactPhone: postData.contactPhone
      };

      // Khóa lưu riêng cho từng tài khoản, ví dụ: userPosts_chutro01
      const storageKey = `userPosts_${userInfo.username}`;
      const currentPosts = JSON.parse(localStorage.getItem(storageKey) || '[]');
      // Thêm bài mới lên đầu danh sách
      currentPosts.unshift(newPost);
      // Ghi lại vào localStorage theo đúng tài khoản
      localStorage.setItem(storageKey, JSON.stringify(currentPosts));

      // 7c) Lưu bản ghi CÔNG KHAI để hiển thị trên Trang chủ (dành cho mọi tài khoản)
      // Giải thích:
      // - Ngoài danh sách riêng theo user (userPosts_<username>), ta cần một nguồn dữ liệu chung
      //   để mọi tài khoản (kể cả chưa đăng nhập) đều xem được bài vừa đăng.
      // - Ở đây dùng localStorage key 'publicPosts' như một “feed công khai”.
      // - Khi thanh toán thành công, ta push bài mới vào 'publicPosts' (đưa lên đầu) để trang chủ đọc và hiển thị ngay.
      try {
        const publicKey = 'publicPosts';
        const existingPublic = JSON.parse(localStorage.getItem(publicKey) || '[]');
        const categoryForHomepage = newPost.type === 'Tìm người ở ghép' ? 'Ở ghép' : newPost.type;
        const publicRecord = {
          id: newPost.id,
          title: newPost.title,
          img: newPost.image,
          images: Array.isArray(postData.images) && postData.images.length ? postData.images : (newPost.image ? [newPost.image] : []),
          price: newPost.price,
          size: newPost.area,
          area: newPost.area,
          address: newPost.address,
          postedDate: new Date().toLocaleString(),
          category: categoryForHomepage,
          owner: {
            name: newPost.contactName || userInfo.username || 'Chủ trọ',
            phone: newPost.contactPhone || '',
            avatar: 'anh/avt.jpg',
            totalPosts: (currentPosts?.length || 0)
          },
          rating: { average: 0, total: 0, breakdown: {} },
          reviews: [],
          location: { lat: null, lng: null, address: newPost.address } //lat, lng chỉ là để lưu tọa độ địa lý
        };
        const mergedPublic = [publicRecord, ...existingPublic.filter(p => p && p.id !== publicRecord.id)];
        localStorage.setItem(publicKey, JSON.stringify(mergedPublic));
        window.dispatchEvent(new Event('publicPostsUpdated'));
      } catch { }

      // 7b) Ghi lịch sử giao dịch thanh toán cho tài khoản hiện tại
      try {
        const txKey = `transactions_${userInfo.username}`;
        // Lấy danh sách hiện có: ưu tiên localStorage, nếu chưa có thì lấy seed theo tài khoản
        let baseList;
        try {
          const stored = localStorage.getItem(txKey);
          baseList = stored ? JSON.parse(stored) : (giaoDichTheoTaiKhoan[userInfo.username] || []);
        } catch { baseList = giaoDichTheoTaiKhoan[userInfo.username] || []; }

        const nextId = (baseList[0]?.id || baseList.length) + 1;
        const nowStr = new Date().toLocaleString('vi-VN', { hour12: false });
        const txCode = `TX${String(Math.floor(100000 + Math.random() * 900000))}`;
        const vipType = newPost.vipType; // 'Tin thường' | 'Tin VIP 1' | ...
        const txRecord = {
          id: nextId,
          time: nowStr,
          fee: total,
          balanceStart: balanceBefore,
          balanceEnd: accountsList[idx].balance,
          action: 'Đăng tin mới',
          code: txCode,
          type: vipType
        };
        const mergedList = [txRecord, ...baseList];
        localStorage.setItem(txKey, JSON.stringify(mergedList));
      } catch { }

      // 8) Xóa postData tạm sau thanh toán
      localStorage.removeItem('postData');

      // 9) Hiển thị toast đơn giản và chuyển trang sau 2 giây
      setShowSuccessToast(true);
      setTimeout(() => {
        navigate('/quan-ly-bai-dang');
      }, 2000);
    } catch (error) {
      console.error('Lỗi trong quá trình thanh toán:', error);
      alert('Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại!');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f5f5',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header trang */}
      {showHeader && <Header />}

      {/* Nội dung chính với sidebar */}
      <div style={{
        display: 'flex',
        flex: 1
      }}>
        {/* Sidebar điều hướng */}
        <Sidebar />

        {/* Khu vực nội dung chính */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 0 0 0' }}>
          {/* Tiêu đề và breadcrumb */}
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
              Thanh toán đăng bài\
            </h1>
            {/* Đường dẫn điều hướng */}
            <div style={{
              fontSize: '16px',
              color: '#666',
              marginBottom: '20px'
            }}>
              Trang quản lý {'>'} Đăng bài {'>'} Thanh toán đăng bài
            </div>
          </div>

          {/* Nội dung thanh toán */}
          <div style={{
            padding: '0 32px',
            flex: 1
          }}>
            {/* Tóm tắt thông tin đăng bài */}
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
                <div style={{ fontWeight: 700, fontSize: '24px', marginBottom: '20px' }}>
                  Thông tin đăng bài
                </div>

                {/* Tiêu đề bài đăng */}
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '15px' }}>
                  <div style={{ minWidth: '220px', fontWeight: 500, fontSize: '18px' }}>Tiêu đề:</div>
                  <div style={{ fontWeight: 500, fontSize: '16px' }}>{postData.title}</div>
                </div>
                <div style={{
                  borderTop: '0.3px solid #222',
                  margin: '10px 0'
                }} />

                {/* Loại tin */}
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '15px' }}>
                  <div style={{ minWidth: '220px', fontWeight: 500, fontSize: '18px' }}>Loại tin:</div>
                  <div style={{ fontWeight: 500, fontSize: '16px' }}>{postData.postType}</div>
                </div>
                <div style={{
                  borderTop: '0.3px solid #222',
                  margin: '10px 0'
                }} />

                {/* Số ngày đăng */}
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '15px' }}>
                  <div style={{ minWidth: '220px', fontWeight: 500, fontSize: '18px' }}>Số ngày:</div>
                  <div style={{ fontWeight: 500, fontSize: '16px' }}>{postData.numberOfDays}</div>
                </div>
                <div style={{
                  borderTop: '0.3px solid #222',
                  margin: '10px 0'
                }} />

                {/* Tổng tiền thanh toán */}
                <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                  <div style={{ minWidth: '220px', fontWeight: 500, fontSize: '18px' }}>Tổng tiền:</div>
                  <div style={{ fontWeight: 500, fontSize: '16px' }}>{paymentAmount}</div>
                </div>
              </div>
            )}

            {/* Phương thức thanh toán */}
            <div style={{
              background: '#fff',
              borderRadius: '12px',
              padding: '24px',
              marginBottom: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
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
                      // width: '100%',
                      // maxWidth: '1110px'
                    }}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                      {/* Icon hoặc ảnh của phương thức thanh toán */}
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
                        {/* Hiển thị ảnh nếu có, nếu không thì hiển thị emoji */}
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

                    {/* Nút radio để chọn phương thức */}
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

            {/* Tùy chọn xuất hóa đơn */}
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

            {/* Các nút hành động */}
            <div style={{
              display: 'flex',
              gap: '16px',
              marginTop: '32px'
            }}>
              {/* Nút quay lại */}
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

              {/* Nút thanh toán */}
              <button
                onClick={handlePayment}
                disabled={isProcessing}
                style={{
                  flex: 1,
                  padding: '16px',
                  background: isProcessing ? '#ccc' : '#2196f3',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (!isProcessing) {
                    e.target.style.background = '#1565c0';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isProcessing) {
                    e.target.style.background = '#2196f3';
                  }
                }}
              >
                {isProcessing ? 'Đang xử lý...' : `Thanh toán ${paymentAmount}`}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer trang */}
      <Footer />

      {/* Toast thông báo đơn giản */}
      {showSuccessToast && (
        <div style={{
          position: 'fixed',
          top: '10px',
          right: '20px',
          background: '#2e7d32',
          color: '#fff',
          padding: '12px 16px',
          borderRadius: '6px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
          zIndex: 1000,
          fontSize: '14px',
          fontWeight: 600
        }}>
          Đăng bài thành công
        </div>
      )}

    </div>
  );
}

export default ThanhToan;
