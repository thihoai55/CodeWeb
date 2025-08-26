import React, { useMemo, useState } from 'react';
import Header from '../TrangChuDaDangNhap/Header';
import Footer from '../TrangChuDaDangNhap/Footer';
import Sidebar from '../DangBai/sidebar';
import HeaderTab from './HeaderTab';

function LichSuGiaoDich() {
  const [activeTab, setActiveTab] = useState('lichsunaptien');

  const transactions = useMemo(() => ([
    { id: 1, time: '23:32 10/07/2025', fee: 0, balanceStart: 2000000, balanceEnd: 2000000, action: 'Đăng lại tin', code: 'TX100001', type: 'Tin miễn phí' },
    { id: 2, time: '13:12 12/07/2025', fee: 150000, balanceStart: 2000000, balanceEnd: 1850000, action: 'Đăng tin mới', code: 'TX100002', type: 'Tin thường' },
    { id: 3, time: '09:45 15/07/2025', fee: 300000, balanceStart: 1850000, balanceEnd: 1550000, action: 'Đăng tin mới', code: 'TX100003', type: 'Tin VIP 1' },
    { id: 4, time: '20:30 20/07/2025', fee: 500000, balanceStart: 1550000, balanceEnd: 1050000, action: 'Đăng tin mới', code: 'TX100004', type: 'Tin VIP 2' },
    { id: 5, time: '10:10 01/08/2025', fee: 150000, balanceStart: 1050000, balanceEnd: 900000, action: 'Đăng lại tin', code: 'TX100005', type: 'Tin thường' },
    { id: 6, time: '14:20 05/08/2025', fee: 150000, balanceStart: 900000, balanceEnd: 750000, action: 'Đăng lại tin', code: 'TX100006', type: 'Tin thường' },
    { id: 7, time: '19:50 10/08/2025', fee: 300000, balanceStart: 750000, balanceEnd: 450000, action: 'Đăng tin mới', code: 'TX100007', type: 'Tin VIP 1' },
    { id: 8, time: '22:05 15/08/2025', fee: 500000, balanceStart: 450000, balanceEnd: -50000, action: 'Đăng tin mới', code: 'TX100008', type: 'Tin VIP 2' },
    { id: 9, time: '09:15 20/08/2025', fee: 150000, balanceStart: 3000000, balanceEnd: 2850000, action: 'Đăng lại tin', code: 'TX100009', type: 'Tin thường' },
    { id: 10, time: '16:30 25/08/2025', fee: 500000, balanceStart: 2850000, balanceEnd: 2350000, action: 'Đăng tin mới', code: 'TX100010', type: 'Tin VIP 1' },
    { id: 11, time: '11:40 01/09/2025', fee: 300000, balanceStart: 2350000, balanceEnd: 2050000, action: 'Đăng tin mới', code: 'TX100011', type: 'Tin VIP 2' },
    { id: 12, time: '20:55 05/09/2025', fee: 150000, balanceStart: 2050000, balanceEnd: 1900000, action: 'Đăng lại tin', code: 'TX100012', type: 'Tin thường' },
  ]), []);

  const formatVND = (num) => num.toLocaleString('vi-VN') + ' VND';

  // Ẩn Header/Footer khi là host
  const currentUserRole = (() => {
    try {
      const userInfo = localStorage.getItem('userInfo');
      return userInfo ? JSON.parse(userInfo).role : null;
    } catch (e) { return null; }
  })();

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f5f5',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {currentUserRole !== 'host' && <Header />}

      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />

        <div style={{ flex: 1, paddingBottom: 24 }}>
          <HeaderTab
            activeId={'lichsuthanhtoan'}
            tabs={[
              { id: 'lichsunaptien', label: 'Lịch sử nạp tiền', to: '/lich-su-nap-tien' },
              { id: 'lichsuthanhtoan', label: 'Lịch sử giao dịch' }
            ]}
          />

          {/* Table */}
          <div style={{ padding: '0 24px' }}>
            <div style={{
              background: '#fff',
              border: '1px solid #e0e0e0',
              borderRadius: 10,
              overflow: 'hidden'
            }}>
              {/* Header row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '220px 160px 160px 160px 200px 120px 120px',
                gap: 0,
                padding: '12px 15px',
                background: '#f7f7f7',
                fontWeight: 600,
                color: '#333',
                fontSize: 14,
                borderBottom: '1px solid #e0e0e0'
              }}>
                <div>Thời gian</div>
                <div>Phí thanh toán</div>
                <div>Số dư đầu</div>
                <div>Số dư cuối</div>
                <div>Lịch sử hoạt động</div>
                <div>Mã tin</div>
                <div>Loại tin</div>
              </div>

              {/* Rows */}
              {transactions.map((tran) => (
                <div key={tran.id} style={{
                  display: 'grid',
                  gridTemplateColumns: '220px 160px 160px 160px 200px 120px 120px',
                  padding: '10px 12px',
                  alignItems: 'center',
                  borderBottom: '1px solid #e7e4e4ff',
                  background: '#fff'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ color: '#28a745', fontSize: 14 }}>●</span>
                    <span style={{ color: '#444' }}>{tran.time}</span>
                  </div>
                  <div style={{ color: '#444' }}>{formatVND(tran.fee)}</div>
                  <div style={{ color: '#444' }}>{formatVND(tran.balanceStart)}</div>
                  <div style={{ color: '#444' }}>{formatVND(tran.balanceEnd)}</div>
                  <div>
                    <button style={{
                      padding: '6px 10px',
                      background: '#e7f5ff',
                      color: '#118be1',
                      border: '1px solid #cfe8ff',
                      borderRadius: 14,
                      fontSize: 14,
                      cursor: 'default'
                    }}>
                      {tran.action}
                    </button>
                  </div>
                  <div style={{ color: '#444' }}>{tran.code}</div>
                  <div style={{ color: '#444' }}>{tran.type}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {currentUserRole !== 'host' && <Footer />}
    </div>
  );
}

export default LichSuGiaoDich;