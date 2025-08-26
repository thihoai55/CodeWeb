import React, { useMemo, useState } from 'react';
import Header from '../TrangChuDaDangNhap/Header';
import Footer from '../TrangChuDaDangNhap/Footer';
import Sidebar from '../DangBai/sidebar';
import HeaderTab from './HeaderTab';
import { giaoDichTheoTaiKhoan } from '../DaTa/lichSuGiaoDich';

function LichSuGiaoDich() {
  const [activeTab, setActiveTab] = useState('lichsunaptien');

  // Lấy username hiện tại
  const currentUser = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('userInfo') || '{}'); } catch { return {}; }
  }, []);

  // Ưu tiên lấy lịch sử theo tài khoản từ localStorage nếu có, nếu không dùng seed từ data
  const storageKey = `transactions_${currentUser?.username || ''}`;
  const transactions = useMemo(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) return JSON.parse(stored);
    } catch {}
    return giaoDichTheoTaiKhoan[currentUser?.username] || [];
  }, [storageKey, currentUser?.username]);

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
                gridTemplateColumns: '220px 160px 160px 160px 180px 140px 120px',
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
                  gridTemplateColumns: '220px 160px 160px 160px 180px 140px 120px',
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

      <Footer />
    </div>
  );
}

export default LichSuGiaoDich;