import React, { createContext, useContext, useMemo, useState } from 'react';

const NotificationsContext = createContext(null);

const initialNotifications = [
  { id: 1, message: 'HOT: Hệ thống phát hiện 5 bài đăng vi phạm quy định cần xem xét', date: '15/01/2024 14:30', isRead: false, timeAgo: '2 giờ trước' },
  { id: 2, message: 'Thông báo: Có 12 yêu cầu thuê phòng mới cần phê duyệt', date: '15/01/2024 13:45', isRead: true, timeAgo: '3 giờ trước' },
  { id: 3, message: 'Chào mừng admin mới: Người dùng "user123" báo cáo vấn đề với bài đăng #456', date: '15/01/2024 12:20', isRead: true, timeAgo: '4 giờ trước' },
  { id: 4, message: 'Hệ thống backup dữ liệu hoàn thành thành công', date: '15/01/2024 11:15', isRead: true, timeAgo: '5 giờ trước' },
  { id: 5, message: 'Có 3 tài khoản mới đăng ký cần xác minh', date: '15/01/2024 10:30', isRead: false, timeAgo: '6 giờ trước' }
];

export const NotificationsProvider = ({ children }) => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = useMemo(() => notifications.filter(n => !n.isRead).length, [notifications]);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const markSelectedAsRead = (ids) => {
    setNotifications(prev => prev.map(n => ids.includes(n.id) ? { ...n, isRead: true } : n));
  };

  const deleteSelected = (ids) => {
    setNotifications(prev => prev.filter(n => !ids.includes(n.id)));
  };

  const value = {
    notifications,
    setNotifications,
    unreadCount,
    markAllAsRead,
    markSelectedAsRead,
    deleteSelected
  };

  return (
    <NotificationsContext.Provider value={value}>{children}</NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationsProvider');
  return ctx;
};


