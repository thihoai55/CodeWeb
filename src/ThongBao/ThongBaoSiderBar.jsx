import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../DangBai/sidebar';
import Header from '../TrangChuDaDangNhap/Header';
import Footer from '../TrangChuDaDangNhap/Footer';
import { 
  getAllNotifications, 
  deleteSelectedNotifications, 
  markAsRead, 
  markAllAsRead, 
  updateNotificationSelection, 
  selectAllNotifications 
} from '../DaTa/dulieuThongBao';

const ThongBaoSideBar = () => {
  const navigate = useNavigate();

  // Đọc thông báo từ notificationManager
  const [notifications, setNotifications] = useState(() => {
    return getAllNotifications();
  });

  // Lắng nghe sự thay đổi trong localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setNotifications(getAllNotifications());
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Kiểm tra localStorage mỗi giây để cập nhật thông báo mới
    const interval = setInterval(() => {
      const currentNotifications = getAllNotifications();
      if (JSON.stringify(currentNotifications) !== JSON.stringify(notifications)) {
        setNotifications(currentNotifications);
      }
    }, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [notifications]);

  // Xử lý chọn/ bỏ chọn thông báo
  const handleCheckboxChange = (id) => {
    const updatedNotifications = updateNotificationSelection(id, !notifications.find(n => n.id === id)?.isSelected);
    setNotifications(updatedNotifications);
  };
  // Xử lý các hành động: chọn tất cả, bor chọn tất cả
  const handleSelectAll = () => {
    const allSelected = notifications.every(n => n.isSelected);
    const updatedNotifications = selectAllNotifications(!allSelected);
    setNotifications(updatedNotifications);
  };
  // Xử lý xóa các thông báo đã chọn
  const handleDeleteSelected = () => {
    const updatedNotifications = deleteSelectedNotifications(notifications);
    setNotifications(updatedNotifications);
  };
  // Xử lý đánh dấu đã đọc
  const handleMarkAsRead = (id) => {
    const updatedNotifications = markAsRead(id);
    setNotifications(updatedNotifications);
  };
  // Xử lý đánh dấu đã đọc tất cả
  const handleMarkAllAsRead = () => {
    const updatedNotifications = markAllAsRead();
    setNotifications(updatedNotifications);
  };
  // Xử lý khi click vào thông báo
  const handleNotificationClick = (notification) => {
    if (!notification.isRead) {
      handleMarkAsRead(notification.id);
    }
    // Có thể thêm logic để mở chi tiết thông báo ở đây
    console.log('Clicked notification:', notification);
  };

  // Lấy role từ localStorage để ẩn header/footer nếu là host
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

        <div style={{ flex: 1, padding: '15px 0 0 0' }}>
          <div style={{ padding: '0 32px', marginBottom: '16px' }}>
            <span
              style={{ color: '#1976d2', cursor: 'pointer', fontSize: '16px' }}
              onClick={() => navigate('/quan-ly-bai-dang')}
            >
              Trang quản lý
            </span>
            <span style={{ margin: '0 8px', color: '#b0b7c3' }}>›</span>
            <span style={{ color: '#333', fontSize: '16px' }}>Thông báo</span>
          </div>

          <div style={{ background: '#fff', borderRadius: '10px', padding: '20px', margin: '0 100px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ padding: '0 0 16px 0', borderBottom: '1px solid #ebe9e9ff' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: '#111' }}>Thông báo</h1>
            </div>

            {/* Action Buttons */}
            <div style={{
              padding: '15px 0',
              display: 'flex',
              gap: '10px'
            }}>
              <button 
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  transition: 'background-color 0.3s'
                }}
                onClick={handleSelectAll}
              >
                Chọn tất cả
              </button>
              <button 
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: notifications.every(n => n.isRead) ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  backgroundColor: notifications.every(n => n.isRead) ? '#6c757d' : '#28a745',
                  color: 'white',
                  transition: 'background-color 0.3s'
                }}
                onClick={handleMarkAllAsRead}
                disabled={notifications.every(n => n.isRead)}
              >
                Đánh dấu đã đọc tất cả
              </button>
              <button 
                style={{
                  padding: '8px 16px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: !notifications.some(n => n.isSelected) ? 'not-allowed' : 'pointer',
                  fontSize: '14px',
                  backgroundColor: !notifications.some(n => n.isSelected) ? '#6c757d' : '#dc3545',
                  color: 'white',
                  transition: 'background-color 0.3s'
                }}
                onClick={handleDeleteSelected}
                disabled={!notifications.some(n => n.isSelected)}
              >
                Xóa đã chọn
              </button>
            </div>

            {/* Notifications List */}
            <div style={{
              overflow: 'hidden'
            }}>
              {notifications.length === 0 ? (
                <div style={{
                  padding: '40px 20px',
                  textAlign: 'center',
                  color: '#6c757d'
                }}>
                  <p style={{ margin: 0, fontSize: '16px' }}>Không có thông báo nào</p>
                </div>
              ) : (
                notifications.map(notification => (
                  <div 
                    key={notification.id} 
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      padding: '15px 20px',
                      borderBottom: '1px solid #dededeff',
                      transition: 'background-color 0.3s',
                      cursor: 'pointer',
                      backgroundColor: notification.isRead ? 'white' : '#f0f8ff'
                    }}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div 
                      style={{
                        marginRight: '15px',
                        marginTop: '2px'
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={notification.isSelected}
                        onChange={() => handleCheckboxChange(notification.id)}
                        style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: '8px'
                      }}>
                        <span style={{
                          color: '#333',
                          fontSize: '14px',
                          fontWeight: '500'
                        }}>{notification.date}</span>
                      </div>
                      <div style={{
                        color: '#007bff',
                        fontSize: '15px',
                        lineHeight: '1.4',
                        cursor: 'pointer'
                      }}>
                        {notification.message}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ThongBaoSideBar;
