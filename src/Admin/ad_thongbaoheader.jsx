import React, { useState, useEffect } from 'react';
import AdThongBaoSidebar from './ad_thongbaosidebar';
import { useNotifications } from './ad_du_lieu_thong_bao';

const AdThongBaoHeader = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const { notifications, setNotifications, unreadCount, markAllAsRead, deleteSelected } = useNotifications();

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    setShowSidebar(false);
  };

  const handleSidebarClick = () => {
    setShowSidebar(!showSidebar);
    setShowNotifications(false);
  };

  const handleClickOutside = (e) => {
    if (!e.target.closest('.notification-dropdown') && !e.target.closest('.notification-icon')) {
      setShowNotifications(false);
    }
    if (!e.target.closest('.ad-thongbaosidebar') && !e.target.closest('.sidebar-notification-icon')) {
      setShowSidebar(false);
    }
  };

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  const handleSelectAll = (selectAll) => {
    console.log('Select all:', selectAll);
  };

  const handleDeleteSelected = (selectedIds) => {
    deleteSelected(selectedIds);
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
      {/* Header Notification Icon */}
      <div 
        className="notification-icon ad-noti-icon" 
        onClick={handleNotificationClick}
      >
        <i className="bi bi-bell"></i>
        {unreadCount > 0 && (
          <span className="ad-noti-badge">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </div>

      {/* Sidebar Notification Icon */}
      <div 
        className="sidebar-notification-icon" 
        onClick={handleSidebarClick}
      >
        {/* <i className="bi bi-list-ul"></i> */}
        {unreadCount > 0 && (
          <span className="notification-badge">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </div>
      
      {/* Header Notification Dropdown */}
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

      {/* Sidebar Notification Panel */}
      {showSidebar && (
        <div className="sidebar-notification-dropdown">
          <AdThongBaoSidebar
            notifications={notifications}
            onMarkAllAsRead={handleMarkAllAsRead}
            onSelectAll={handleSelectAll}
            onDeleteSelected={handleDeleteSelected}
          />
        </div>
      )}
    </div>
  );
};

export default AdThongBaoHeader;