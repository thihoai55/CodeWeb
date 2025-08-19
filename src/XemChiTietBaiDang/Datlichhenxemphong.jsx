// src/XemChiTietBaiDang/Datlichhenxemphong.jsx
import React, { useEffect, useState } from 'react';

export default function DatLichHenXemPhong({ isOpen, onClose, defaultDate, defaultTime }) {
  const [date, setDate] = useState(defaultDate || '');
  const [time, setTime] = useState(defaultTime || '');

  useEffect(() => {
    if (isOpen) {
      setDate(defaultDate || '');
      setTime(defaultTime || '');
    }
  }, [isOpen, defaultDate, defaultTime]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!date || !time) return;
    alert(`Đã đặt lịch xem phòng vào ${new Date(date).toLocaleDateString('vi-VN')} lúc ${time}. Vui lòng chờ xác nhận từ chủ trọ.`);
    onClose && onClose();
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose && onClose()}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        style={{
          width: 'min(680px, 92vw)',
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          overflow: 'hidden'
        }}
      >
        <div style={{ background: '#52b4f9', color: '#0b0f14', padding: '12px 16px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>Đặt lịch hẹn xem phòng:</span>
          <button onClick={onClose} aria-label="Đóng" style={{ background: 'transparent', border: 'none', fontSize: '18px', cursor: 'pointer' }}>×</button>
        </div>

        <div style={{ padding: '20px 24px' }}>
          <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <label style={{ fontWeight: 600 }}>
              Chọn ngày:
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().slice(0,10)}
                style={{ display: 'block', marginTop: 8, padding: '10px 12px', borderRadius: 6, border: '1px solid #d1d5db', background: '#f9fafb' }}
              />
            </label>

            <label style={{ fontWeight: 600 }}>
              Chọn giờ:
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                step="900"
                style={{ display: 'block', marginTop: 8, padding: '10px 12px', borderRadius: 6, border: '1px solid #d1d5db', background: '#f9fafb', width: 140 }}
              />
            </label>
          </div>

          <div style={{ display: 'flex', gap: '16px', marginTop: '28px' }}>
            <button
              onClick={handleConfirm}
              disabled={!date || !time}
              style={{ padding: '10px 20px', background: (!date || !time) ? '#93c5fd' : '#1976d2', color: '#fff', border: 'none', borderRadius: '8px', cursor: (!date || !time) ? 'not-allowed' : 'pointer', fontWeight: 700 }}
            >
              Xác Nhận
            </button>
            <button
              onClick={onClose}
              style={{ padding: '10px 20px', background: '#e5e7eb', color: '#111827', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

