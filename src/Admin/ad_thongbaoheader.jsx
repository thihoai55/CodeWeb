import React, { useState, useEffect } from 'react';

const AdThongBaoHeader = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: 'HOT: Hệ thống phát hiện 5 bài đăng vi phạm quy định cần xem xét',
      date: '15/01/2024 14:30',
      isRead: false,
      timeAgo: '2 giờ trước'
    },
    {
      id: 2,
      message: 'Thông báo: Có 12 yêu cầu thuê phòng mới cần phê duyệt',
      date: '15/01/2024 13:45',
      isRead: true,
      timeAgo: '3 giờ trước'
    },
    {
      id: 3,
      message: 'Chào mừng admin mới: Người dùng "user123" báo cáo vấn đề với bài đăng #456',
      date: '15/01/2024 12:20',
      isRead: true,
      timeAgo: '4 giờ trước'
    },
    {
      id: 4,
      message: 'Hệ thống backup dữ liệu hoàn thành thành công',
      date: '15/01/2024 11:15',
      isRead: true,
      timeAgo: '5 giờ trước'
    },
    {
      id: 5,
      message: 'Có 3 tài khoản mới đăng ký cần xác minh',
      date: '15/01/2024 10:30',
      isRead: false,
      timeAgo: '6 giờ trước'
    }
  ]);

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest('.notification-dropdown') && !e.target.closest('.notification-icon')) {
      setShowNotifications(false);
    }
  };

  const handleMarkAllAsRead = () => {
    // Đánh dấu tất cả thông báo đã đọc
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      isRead: true
    }));
    setNotifications(updatedNotifications);
    
    // Thêm hiệu ứng CSS để thông báo đã được đọc
    const notificationItems = document.querySelectorAll('.notification-item');
    notificationItems.forEach((item, index) => {
      setTimeout(() => {
        item.style.backgroundColor = '#f8f9fa';
        item.style.transform = 'scale(1.02)';
        item.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
        
        // Reset transform sau 300ms
        setTimeout(() => {
          item.style.transform = 'scale(1)';
          item.style.boxShadow = 'none';
        }, 300);
      }, index * 100); // Hiệu ứng lần lượt từng item
    });
    
    // Thêm hiệu ứng cho nút
    const button = document.querySelector('.mark-all-read-btn');
    if (button) {
      button.style.transform = 'scale(0.95)';
      button.style.backgroundColor = '';
      setTimeout(() => {
        button.style.transform = 'scale(1)';
        button.style.backgroundColor = '#6c757d';
      }, 200);
    }
  };

  const handleClose = () => {
    setShowNotifications(false);
  };

  const filteredNotifications = showUnreadOnly 
    ? notifications.filter(n => !n.isRead)
    : notifications;

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="ad-thongbaoheader">
      {/* Notification Icon */}
      <div 
        className="notification-icon ad-noti-icon" 
        onClick={handleNotificationClick}
      >
        <i className="bi bi-bell"></i>
        {notifications.filter(n => !n.isRead).length > 0 && (
          <span className="ad-noti-badge">
            {notifications.filter(n => !n.isRead).length > 9 ? '9+' : notifications.filter(n => !n.isRead).length}
          </span>
        )}
      </div>
      
      {/* Notification Dropdown */}
      {showNotifications && (
        <div className="notification-dropdown ad-noti-dropdown">
          {/* Header */}
          <div className="ad-noti-header">
            <h3>Thông báo</h3>
            <button 
              className="ad-noti-close"
              onClick={handleClose}
            >
              Đóng
            </button>
          </div>

          {/* Action Buttons */}
          <div className="ad-noti-actions">
            <button 
              className="btn btn-toggle"
              onClick={() => setShowUnreadOnly(!showUnreadOnly)}
              aria-pressed={showUnreadOnly}
            >
              {showUnreadOnly ? 'Hiện tất cả' : 'Chưa đọc'}
            </button>
            <button 
              className="btn btn-mark mark-all-read-btn"
              style={{
                cursor: notifications.filter(n => !n.isRead).length > 0 ? 'pointer' : 'not-allowed',
                backgroundColor: notifications.filter(n => !n.isRead).length > 0 ? undefined : '#6c757d',
                opacity: notifications.filter(n => !n.isRead).length > 0 ? 1 : 0.6
              }}
              onClick={handleMarkAllAsRead}
              disabled={notifications.filter(n => !n.isRead).length === 0}
            >
              Đánh dấu đã đọc tất cả
            </button>
          </div>

          {/* Notifications List */}
          <div className="ad-noti-list">
            {filteredNotifications.length === 0 ? (
              <div style={{
                padding: '40px 20px',
                textAlign: 'center',
                color: '#666'
              }}>
                <p style={{ margin: 0, fontSize: '14px' }}>
                  {showUnreadOnly ? 'Không có thông báo chưa đọc nào' : 'Không có thông báo nào'}
                </p>
              </div>
            ) : (
              filteredNotifications.map(notification => (
                                 <div 
                   key={notification.id}
                   className="notification-item"
                   style={{
                     padding: '15px 20px',
                     borderBottom: '1px solid #f0f0f0',
                     cursor: 'pointer',
                     backgroundColor: notification.isRead ? 'white' : '#f8f9fa'
                   }}
                 >
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px'
                  }}>
                    {/* Status Dot */}
                    <div style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: notification.isRead ? '' : '#007bff',
                      marginTop: '6px',
                      flexShrink: 0
                    }}></div>
                    
                    {/* Content */}
                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '8px'
                      }}>
                        <span style={{
                          fontSize: '12px',
                          color: '#666',
                          fontWeight: '500'
                        }}>
                          {notification.date}
                        </span>
                        <span style={{
                          fontSize: '11px',
                          color: '#999',
                          fontStyle: 'italic'
                        }}>
                          {notification.timeAgo}
                        </span>
                      </div>
                      
                      <div style={{
                        fontSize: '14px',
                        color: notification.isRead ? '#666' : '#007bff',
                        lineHeight: '1.4',
                        fontWeight: notification.isRead ? '400' : '500'
                      }}>
                        {notification.message}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdThongBaoHeader;
