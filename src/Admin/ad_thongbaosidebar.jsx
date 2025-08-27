import React, { useState, useEffect } from 'react';
import AdHeader from './ad_header';
import AdSidebar from './ad_sidebar';

const AdThongBaoSidebar = () => {
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
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

  // Xử lý chọn tất cả thông báo
  const handleSelectAll = () => {
    if (selectAllChecked) {
      setSelectedNotifications([]);
      setSelectAllChecked(false);
    } else {
      const allIds = notifications.map(n => n.id);
      setSelectedNotifications(allIds);
      setSelectAllChecked(true);
    }
  };

  // Xử lý chọn từng thông báo
  const handleSelectNotification = (notificationId) => {
    if (selectedNotifications.includes(notificationId)) {
      const newSelected = selectedNotifications.filter(id => id !== notificationId);
      setSelectedNotifications(newSelected);
      setSelectAllChecked(newSelected.length === notifications.length);
    } else {
      const newSelected = [...selectedNotifications, notificationId];
      setSelectedNotifications(newSelected);
      setSelectAllChecked(newSelected.length === notifications.length);
    }
  };

  // Xử lý xóa thông báo đã chọn
  const handleDeleteSelected = () => {
    if (selectedNotifications.length > 0) {
      const updatedNotifications = notifications.filter(n => !selectedNotifications.includes(n.id));
      setNotifications(updatedNotifications);
      setSelectedNotifications([]);
      setSelectAllChecked(false);
    }
  };

  // Xử lý đánh dấu tất cả đã đọc
  const handleMarkAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      isRead: true
    }));
    setNotifications(updatedNotifications);
    setSelectedNotifications([]);
    setSelectAllChecked(false);
  };

  // Reset select all khi notifications thay đổi
  useEffect(() => {
    if (selectedNotifications.length === 0) {
      setSelectAllChecked(false);
    } else if (selectedNotifications.length === notifications.length) {
      setSelectAllChecked(true);
    }
  }, [selectedNotifications, notifications]);

  return (
    <div className="admin-layout">
      <AdHeader />
      <div className="admin-content">
        <AdSidebar />
        <main className="admin-main">
          <div className="thong-bao-page">
            <div className="page-header">
          
            </div>
            
            <div className="ad-thongbaosidebar">
              {/* Header */}
              <div className="ad-noti-sidebar-header">
                <h3>Thông báo</h3>
              </div>

              {/* Action Buttons */}
              <div className="ad-noti-sidebar-actions">
                <button 
                  className={`btn btn-select-all ${selectAllChecked ? 'active' : ''}`}
                  onClick={handleSelectAll}
                >
                  Chọn tất cả
                </button>
                <button 
                  className="btn btn-mark-all"
                  onClick={handleMarkAllAsRead}
                  disabled={notifications.filter(n => !n.isRead).length === 0}
                >
                  Đánh dấu đã đọc tất cả
                </button>
                <button 
                  className="btn btn-delete-selected"
                  onClick={handleDeleteSelected}
                  disabled={selectedNotifications.length === 0}
                >
                  Xóa đã chọn
                </button>
              </div>

              {/* Notifications List */}
              <div className="ad-noti-sidebar-list">
                {notifications.length === 0 ? (
                  <div className="empty-state">
                    <p>Không có thông báo nào</p>
                  </div>
                ) : (
                  notifications.map(notification => (
                    <div 
                      key={notification.id}
                      className={`notification-sidebar-item ${selectedNotifications.includes(notification.id) ? 'selected' : ''}`}
                    >
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={selectedNotifications.includes(notification.id)}
                        onChange={() => handleSelectNotification(notification.id)}
                        className="notification-checkbox"
                      />
                      
                      {/* Content */}
                      <div className="notification-content">
                        <div className="notification-message">
                          {notification.message}
                        </div>
                        <div className="notification-meta">
                          <span className="notification-date">{notification.date}</span>
                          <span className="notification-time">{notification.timeAgo}</span>
                        </div>
                      </div>

                      {/* Status Dot */}
                      {!notification.isRead && (
                        <div className="notification-dot"></div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdThongBaoSidebar;
