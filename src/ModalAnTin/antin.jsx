import React from 'react';

function ModalAnTin({ open, onCancel, onConfirm }) {
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
        }}>Bạn muốn ẩn bài đăng này đi?</h3>

        <p style={{
          margin: 0,
          marginBottom: 12,
          color: '#555',
          fontSize: 16,
          lineHeight: 1.6
        }}>
          Chức năng <b>ẨN BÀI</b> sử dụng khi bài đăng của bạn ở trạng thái đang hiển thị hoặc bất động sản của bạn đã cho thuê và muốn ẩn tin đăng với người xem.
        </p>

        <ul style={{ marginTop: 0, paddingLeft: 18, color: '#555', fontSize: 16 }}>
          <li>Không còn cuộc gọi/tin nhắn làm phiền.</li>
          <li>Người xem sẽ không nhìn thấy tin của bạn.</li>
          <li>
            Tuy nhiên tin vẫn còn tồn tại trong phần quản lý bài đăng của bạn, bạn có thể mở cho thuê lại bằng cách chọn "Đăng lại" mà không cần phải soạn lại tin mới.
          </li>
        </ul>

        <div style={{ display: 'flex', gap: 20, justifyContent: 'end', marginTop: 12 }}>
          <button
            onClick={onCancel}
            style={{
              padding: '10px 15px',
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
              padding: '10px 18px',
              background: 'rgb(215, 31, 49)',
              color: '#fff',
              border: '1px solid rgb(255, 17, 40)',
              borderRadius: 8,
              cursor: 'pointer'
            }}
            onMouseEnter={(e)=> e.currentTarget.style.background = '#c82333'}
            onMouseLeave={(e)=> e.currentTarget.style.background = 'rgb(255, 17, 40)'}
          >
            Vâng, tôi muốn ẩn tin này
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAnTin;


