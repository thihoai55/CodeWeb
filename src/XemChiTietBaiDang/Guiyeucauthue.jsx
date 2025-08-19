import React, { useEffect, useState } from 'react';

export default function GuiYeuCauThue({ isOpen, onClose, defaultDate, postId }) {
  const [date, setDate] = useState(defaultDate || '');

  useEffect(() => {
    if (isOpen) setDate(defaultDate || '');
  }, [isOpen, defaultDate]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (!date) return;
    // TODO: thay bằng gọi API thật (fetch/axios) khi có endpoint
    alert(`Đã gửi yêu cầu thuê từ ngày ${new Date(date).toLocaleDateString('vi-VN')}. Vui lòng chờ chủ trọ phê duyệt.`);
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
          width: 'min(640px, 92vw)',
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          overflow: 'hidden'
        }}
      >
        <div style={{ background: '#52b4f9', color: '#0b0f14', padding: '12px 16px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span>Gửi yêu cầu thuê</span>
          <button
            onClick={onClose}
            aria-label="Đóng"
            style={{ background: 'transparent', border: 'none', fontSize: '18px', cursor: 'pointer' }}
          >
            ×
          </button>
        </div>

        <div style={{ padding: '20px 24px' }}>
          <label style={{ display: 'block', marginBottom: '12px', fontWeight: 600 }}>
            Ngày bắt đầu thuê :
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().slice(0,10)}
            style={{
              padding: '10px 12px',
              borderRadius: '6px',
              border: '1px solid #d1d5db',
              width: '220px',
              background: '#f9fafb'
            }}
          />

          <div style={{ display: 'flex', gap: '16px', marginTop: '28px' }}>
            <button
              onClick={handleConfirm}
              disabled={!date}
              style={{
                padding: '10px 20px',
                background: date ? '#1976d2' : '#93c5fd',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: date ? 'pointer' : 'not-allowed',
                fontWeight: 700
              }}
            >
              Xác Nhận
            </button>
            <button
              onClick={onClose}
              style={{
                padding: '10px 20px',
                background: '#e5e7eb',
                color: '#111827',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 700
              }}
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}