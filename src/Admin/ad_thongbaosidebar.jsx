import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdHeader from './ad_header';
import AdSidebar from './ad_sidebar';
import { useNotifications } from './ad_du_lieu_thong_bao';

const AdThongBaoSidebar = () => {
  const navigate = useNavigate();
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const { notifications, markAllAsRead, deleteSelected, markSelectedAsRead } = useNotifications();

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
      deleteSelected(selectedNotifications);
      setSelectedNotifications([]);
      setSelectAllChecked(false);
    }
  };

  // Xử lý đánh dấu tất cả đã đọc
  const handleMarkAllAsRead = () => {
    markAllAsRead();
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

  // Xử lý click vào thông báo
  const handleNotificationClick = (notification) => {
    // Nếu thông báo có postId (báo cáo vi phạm), chuyển đến chi tiết bài đăng
    if (notification.postId && notification.type === 'violation') {
      navigate(`/admin/chi-tiet-bai-dang/${notification.postId}`);
    }
    // Có thể thêm xử lý cho các loại thông báo khác ở đây
  };

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
                      <div 
                        className="notification-content"
                        style={{
                          cursor: notification.postId && notification.type === 'violation' ? 'pointer' : 'default',
                          flex: 1
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNotificationClick(notification);
                        }}
                      >
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
