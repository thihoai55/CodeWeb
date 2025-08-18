import React, { useMemo, useState } from 'react';
import Header from '../TrangChuDaDangNhap/Header';
import Footer from '../TrangChuDaDangNhap/Footer';
import Sidebar from '../DangBai/sidebar';
import HeaderTab from './HeaderTab';

function LichSuGiaoDich() {
  const [activeTab, setActiveTab] = useState('lichsunaptien');

  const transactions = useMemo(() => ([
    { id: 1, time: '23:32 10/07/2025', fee: 150000, balanceStart: 1234000, balanceEnd: 1234000, action: 'Đăng lại tin', code: '685879', type: 'Tin miễn phí' },
    { id: 2, time: '13:12 12/07/2025', fee: 150000, balanceStart: 1234000, balanceEnd: 1084000, action: 'Đăng tin mới', code: '685911', type: 'Tin thường' },
    { id: 3, time: '23:15 10/09/2025', fee: 500000, balanceStart: 1434000, balanceEnd: 934000, action: 'Đăng lại tin', code: '685923', type: 'Tin thường' },
    { id: 4, time: '13:12 12/07/2025', fee: 500000, balanceStart: 934000, balanceEnd: 384000, action: 'Đăng tin mới', code: '685952', type: 'Tin VIP' },
    { id: 5, time: '13:12 10/09/2025', fee: 150000, balanceStart: 2084000, balanceEnd: 1934000, action: 'Đăng lại tin', code: '685987', type: 'Tin thường' },
    { id: 6, time: '23:15 10/09/2025', fee: 500000, balanceStart: 1734000, balanceEnd: 1234000, action: 'Đăng tin mới', code: '685533', type: 'Tin thường' },
    { id: 7, time: '23:15 10/09/2025', fee: 500000, balanceStart: 1934000, balanceEnd: 1434000, action: 'Đăng tin mới', code: '685646', type: 'Tin thường' },
    { id: 8, time: '23:15 10/09/2025', fee: 500000, balanceStart: 1434000, balanceEnd: 934000, action: 'Đăng tin mới', code: '686888', type: 'Tin VIP 2' },
    { id: 9, time: '23:15 10/09/2025', fee: 500000, balanceStart: 1634000, balanceEnd: 1134000, action: 'Đăng tin mới', code: '688888', type: 'Tin VIP' },
    { id: 10, time: '23:15 10/09/2025', fee: 500000, balanceStart: 1534000, balanceEnd: 1034000, action: 'Đăng tin mới', code: '686888', type: 'Tin VIP' },
    { id: 11, time: '23:15 10/09/2025', fee: 500000, balanceStart: 1434000, balanceEnd: 934000, action: 'Đăng tin mới', code: '686888', type: 'Tin VIP' },
    { id: 12, time: '23:15 10/09/2025', fee: 150000, balanceStart: 2084000, balanceEnd: 1934000, action: 'Đăng lại tin', code: '685987', type: 'Tin thường' },
  ]), []);

  const formatVND = (num) => num.toLocaleString('vi-VN') + ' VND';

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f5f5',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Header />

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
                padding: '10px 12px',
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
              {transactions.map((tran, idx) => (
                <div key={tran.id} style={{
                  display: 'grid',
                  gridTemplateColumns: '220px 160px 160px 160px 200px 120px 120px',
                  padding: '10px 12px',
                  alignItems: 'center',
                  borderBottom: idx === transactions.length - 1 ? 'none' : '1px solid #f0f0f0',
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
                      fontSize: 13,
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

      <Footer />
    </div>
  );
}

export default LichSuGiaoDich;
