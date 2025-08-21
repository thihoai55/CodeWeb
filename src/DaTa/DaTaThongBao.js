// Dữ liệu thông báo mặc định
const defaultNotifications = [
  {
    id: 1,
    date: '01/03/2020 23:39',
    message: 'HOT: Nâng cấp chức năng, thay đổi giao diện và tặng tiền vào tài khoản',
    isRead: false,
    isSelected: false
  },
  {
    id: 2,
    date: '28/02/2020 15:30',
    message: 'Thông báo: Hệ thống sẽ bảo trì vào ngày mai',
    isRead: true,
    isSelected: false
  },
  {
    id: 3,
    date: '25/02/2020 10:15',
    message: 'Chào mừng bạn đến với hệ thống thuê trọ mới',
    isRead: true,
    isSelected: false
  },
  {
    id: 4,
    date: '20/02/2020 09:45',
    message: 'Có phòng trọ mới phù hợp với yêu cầu của bạn',
    isRead: false,
    isSelected: false
  },
  {
    id: 5,
    date: '18/02/2020 14:20',
    message: 'Đơn đặt lịch xem phòng của bạn đã được xác nhận',
    isRead: true,
    isSelected: false
  }
];

// Lấy tất cả thông báo
export const getAllNotifications = () => {
  const savedNotifications = localStorage.getItem('notifications');
  if (savedNotifications) {
    return JSON.parse(savedNotifications);
  }
  // Nếu chưa có dữ liệu, lưu thông báo mặc định
  localStorage.setItem('notifications', JSON.stringify(defaultNotifications));
  return defaultNotifications;
};

// Thêm thông báo mới
export const addNotification = (message) => {
  const newNotification = {
    id: Date.now(),
    date: new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
    message: message,
    isRead: false,
    isSelected: false
  };

  const existingNotifications = getAllNotifications();
  const updatedNotifications = [newNotification, ...existingNotifications];
  localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  
  return newNotification;
};

// Xóa thông báo theo ID
export const deleteNotification = (id) => {
  const notifications = getAllNotifications();
  const updatedNotifications = notifications.filter(notification => notification.id !== id);
  localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  return updatedNotifications;
};

// Xóa nhiều thông báo đã chọn
export const deleteSelectedNotifications = (notifications) => {
  const updatedNotifications = notifications.filter(notification => !notification.isSelected);
  localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  return updatedNotifications;
};

// Đánh dấu thông báo đã đọc
export const markAsRead = (id) => {
  const notifications = getAllNotifications();
  const updatedNotifications = notifications.map(notification => 
    notification.id === id 
      ? { ...notification, isRead: true }
      : notification
  );
  localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  return updatedNotifications;
};

// Đánh dấu tất cả thông báo đã đọc
export const markAllAsRead = () => {
  const notifications = getAllNotifications();
  const updatedNotifications = notifications.map(notification => ({ ...notification, isRead: true }));
  localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  return updatedNotifications;
};

// Cập nhật trạng thái chọn thông báo
export const updateNotificationSelection = (id, isSelected) => {
  const notifications = getAllNotifications();
  const updatedNotifications = notifications.map(notification => 
    notification.id === id 
      ? { ...notification, isSelected: isSelected }
      : notification
  );
  localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  return updatedNotifications;
};

// Chọn tất cả thông báo
export const selectAllNotifications = (isSelected) => {
  const notifications = getAllNotifications();
  const updatedNotifications = notifications.map(notification => ({ ...notification, isSelected: isSelected }));
  localStorage.setItem('notifications', JSON.stringify(updatedNotifications));
  return updatedNotifications;
};

// Xóa tất cả thông báo
export const clearAllNotifications = () => {
  localStorage.removeItem('notifications');
  return [];
};

// Lấy số thông báo chưa đọc
export const getUnreadCount = () => {
  const notifications = getAllNotifications();
  return notifications.filter(notification => !notification.isRead).length;
};

// Tạo thông báo cho lịch hẹn
export const createAppointmentNotification = (listingId, action) => {
  const message = action === 'confirm' 
    ? `Đơn đặt lịch xem phòng với mã bài đăng ${listingId} đã được xác nhận`
    : `Đơn đặt lịch xem phòng với mã bài đăng ${listingId} đã bị hủy`;
  
  return addNotification(message);
};

// Tạo thông báo cho yêu cầu thuê
export const createRentalRequestNotification = (listingId, action) => {
  const message = action === 'approve'
    ? `Yêu cầu thuê phòng với mã bài đăng ${listingId} đã được chấp nhận`
    : `Yêu cầu thuê phòng với mã bài đăng ${listingId} đã bị từ chối`;
  
  return addNotification(message);
};
