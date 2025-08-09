import React from 'react';

function ModalXoaTin({ open, onCancel, onConfirm }) {
  if (!open) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: '#fff',
        borderRadius: 12,
        padding: 24,
        width: 'min(520px, 92vw)',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
      }}>
        <h3 style={{
          margin: 0,
          marginBottom: 12,
          fontSize: 20,
          fontWeight: 700,
          color: '#333'
        }}>Bạn muốn xóa bài đăng này?</h3>

        <p style={{
          margin: 0,
          marginBottom: 12,
          color: '#555',
          fontSize: 16,
          lineHeight: 1.6
        }}>
          Chức năng <b>XÓA BÀI</b> sẽ xóa vĩnh viễn bài đăng của bạn khỏi hệ thống.
        </p>

        <ul style={{ marginTop: 0, paddingLeft: 18, color: '#555', fontSize: 16 }}>
          <li>Bài đăng sẽ bị xóa hoàn toàn khỏi hệ thống.</li>
          <li>Không thể khôi phục lại sau khi xóa.</li>
          <li>Tất cả dữ liệu liên quan đến bài đăng sẽ bị mất.</li>
        </ul>

        <div style={{ display: 'flex', gap: 20, justifyContent: 'end', marginTop: 20 }}>
          <button
            onClick={onCancel}
            style={{
              padding: '10px 18px',
              background: '#f5f5f5',
              color: '#666',
              border: '1px solid #e0e0e0',
              borderRadius: 8,
              cursor: 'pointer'
            }}
            onMouseEnter={(e)=> e.currentTarget.style.background = '#efefef'}
            onMouseLeave={(e)=> e.currentTarget.style.background = '#f5f5f5'}
          >
            Hủy ✕
          </button>
          <button
            onClick={onConfirm}
            style={{
              padding: '10px 15px',
              background: 'rgb(215, 31, 49)',
              color: '#fff',
              border: '1px solid #dc3545',
              borderRadius: 8,
              cursor: 'pointer'
            }}
            onMouseEnter={(e)=> e.currentTarget.style.background = '#c82333'}
            onMouseLeave={(e)=> e.currentTarget.style.background = 'rgb(215, 31, 49)'}
          >
            Vâng, tôi muốn xóa tin này
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalXoaTin;


