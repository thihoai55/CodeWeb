import React, { createContext, useContext, useMemo, useState } from 'react';

const NotificationsContext = createContext(null);

const initialNotifications = [
  { id: 1, message: 'Báo cáo bài đăng vi phạm #ND214', date: '15/01/2024 14:30', isRead: false, timeAgo: '2 giờ trước', postId: 'ND214', type: 'violation' },
  { id: 2, message: 'Báo cáo vi phạm mã tin ND213', date: '15/01/2024 13:45', isRead: false, timeAgo: '3 giờ trước', postId: 'ND213', type: 'violation' },
  { id: 3, message: 'Báo cáo bài ND212 vi phạm', date: '15/01/2024 12:20', isRead: false, timeAgo: '4 giờ trước', postId: 'ND212', type: 'violation' },
  { id: 4, message: 'HOT: Hệ thống phát hiện 5 bài đăng vi phạm quy định cần xem xét', date: '15/01/2024 11:15', isRead: true, timeAgo: '5 giờ trước', type: 'system' },
  { id: 5, message: 'Thông báo: Có 12 yêu cầu thuê phòng mới cần phê duyệt', date: '15/01/2024 10:30', isRead: true, timeAgo: '6 giờ trước', type: 'system' },
  { id: 6, message: 'Hệ thống backup dữ liệu hoàn thành thành công', date: '15/01/2024 09:15', isRead: true, timeAgo: '7 giờ trước', type: 'system' },
  { id: 7, message: 'Có 3 tài khoản mới đăng ký cần xác minh', date: '15/01/2024 08:30', isRead: true, timeAgo: '8 giờ trước', type: 'system' }
];
//cung cấp dữ liệu thông báo
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


