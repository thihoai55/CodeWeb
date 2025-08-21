import React, { useState } from 'react';
import { createAppointmentNotification } from '../DaTa/DaTaThongBao';

const LichHen = () => {
  // Dữ liệu mẫu cho các lịch hẹn
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      listingId: 'BD001',
      title: 'Phòng trọ mới xây, đã trang trí đầy đủ tiện nghi như giường, tủ quần áo, bàn học và internet tốc độ cao. Vị trí gần trung tâm thành phố Huế, thuận tiện đi lại, khu vực an ninh tốt. Phù hợp cho sinh viên và người đi làm cần chỗ ở lâu dài.',
      customerName: 'Ngô Thị Thanh Nhàn',
      appointmentDate: '29/03/2024',
      appointmentTime: '11:00',
      phoneNumber: '0356340085'
    },
    {
      id: 2,
      listingId: 'BD002',
      title: 'Cho thuê căn hộ vừa mới xây, nội thất hiện đại, đã lắp đặt đầy đủ tiện nghi: điều hòa, máy giặt, tủ lạnh, bếp nấu ăn. Căn hộ rộng rãi, thoáng mát, có nơi để xe an toàn, camera giám sát 24/7. Khu vực yên tĩnh, hàng xóm thân thiện, rất thích hợp cho gia đình hoặc nhân viên văn phòng.',
      customerName: 'Ngô Quý Long Nhật',
      appointmentDate: '11/08/2024',
      appointmentTime: '15:30',
      phoneNumber: '0839582948'
    },
    {
      id: 3,
      listingId: 'BD003',
      title: 'Tìm nữ ở ghép gần trường Đại học Khoa học Huế. Phòng đã có sẵn giường, tủ quần áo, bàn học, điều hòa và internet tốc độ cao. Chỉ cần mang đồ dùng cá nhân đến ở. Gần chợ, siêu thị và bến xe bus, rất thuận tiện cho sinh viên vừa học vừa làm thêm.',
      customerName: 'Nguyễn Thị Hoài',
      appointmentDate: '05/05/2025',
      appointmentTime: '08:30',
      phoneNumber: '0819923174'
    },
    {
      id: 4,
      listingId: 'BD004',
      title: 'Phòng trọ ngay trung tâm thành phố Huế, vị trí đắc địa, gần các trường đại học, siêu thị và khu vui chơi. Phòng rộng, có điều hòa, bình nóng lạnh, giường và bàn học, rất phù hợp cho sinh viên hoặc nhân viên văn phòng. Khu vực an ninh, có chỗ để xe an toàn, giá thuê hợp lý.',
      customerName: 'Lê Văn Thuần',
      appointmentDate: '08/01/2025',
      appointmentTime: '17:00',
      phoneNumber: '0865465228'
    }
  ]);

  const handleConfirm = (appointmentId) => {
    console.log('Xác nhận lịch hẹn:', appointmentId);
    
    // Tìm thông tin lịch hẹn
    const appointment = appointments.find(apt => apt.id === appointmentId);
    
    // Xóa lịch hẹn khỏi danh sách
    setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
    
    // Tạo thông báo mới sử dụng notificationManager
    createAppointmentNotification(appointment.listingId, 'confirm');
    
    // Có thể thêm logic gửi thông báo real-time ở đây
    alert('Đã xác nhận lịch hẹn và gửi thông báo!');
  };

  const handleCancel = (appointmentId) => {
    console.log('Hủy lịch hẹn:', appointmentId);
    
    // Tìm thông tin lịch hẹn
    const appointment = appointments.find(apt => apt.id === appointmentId);
    
    // Xóa lịch hẹn khỏi danh sách
    setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
    
    // Tạo thông báo mới sử dụng notificationManager
    createAppointmentNotification(appointment.listingId, 'cancel');
    
    // Có thể thêm logic gửi thông báo real-time ở đây
    alert('Đã hủy lịch hẹn và gửi thông báo!');
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      {appointments.map((appointment) => (
        <div key={appointment.id} style={{
          background: '#fff',
          borderRadius: '10px',
          padding: '30px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          border: '1px solid #ECEBEB',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}>
          {/* Appointment Header */}
          <div style={{ flex: 1, marginRight: '20px' }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '500',
              color: '#1a73e8',
              margin: '0 0 12px 0',
              lineHeight: '1.4'
            }}>
              Tiêu đề: {appointment.title}
            </h3>

            {/* Appointment Details - Horizontal Layout */}
            <div style={{
              display: 'flex',
              gap: '100px',
              flexWrap: 'wrap',
              paddingLeft: '15px'
              // marginleft: '50px',
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span style={{ fontSize: '16px', color: '#666', fontWeight: '600' }}>Mã tin</span>
                <span style={{ fontSize: '16px', color: '#333' }}>{appointment.listingId}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span style={{ fontSize: '16px', color: '#666', fontWeight: '600' }}>Tên người hẹn</span>
                <span style={{ fontSize: '16px', color: '#333' }}>{appointment.customerName}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span style={{ fontSize: '16px', color: '#666', fontWeight: '600' }}>Ngày hẹn</span>
                <span style={{ fontSize: '16px', color: '#333' }}>{appointment.appointmentDate}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span style={{ fontSize: '16px', color: '#666', fontWeight: '600' }}>Giờ hẹn</span>
                <span style={{ fontSize: '16px', color: '#333' }}>{appointment.appointmentTime}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span style={{ fontSize: '16px', color: '#666', fontWeight: '600' }}>SĐT</span>
                <span style={{ fontSize: '16px', color: '#333' }}>{appointment.phoneNumber}</span>
              </div>
            </div>
          </div>

          {/* Appointment Actions */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            flexShrink: 0
          }}>
            <button
              style={{
                padding: '8px 12px',
                background: '#f5f5f5',
                color: '#333',
                border: '1px solid #d9d9d9',
                borderRadius: '18px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
                minWidth: '90px',
                justifyContent: 'center'
              }}
              onClick={() => handleConfirm(appointment.id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#efefef';
                e.currentTarget.style.borderColor = '#cfcfcf';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f5f5f5';
                e.currentTarget.style.borderColor = '#d9d9d9';
              }}
            >
              {/* <span style={{ fontSize: '15px', color: '#28a745' }}>✓</span> */}
              Xác nhận
              <span style={{ fontSize: '15px', color: '#28a745' }}>✓</span>
            </button>
            <button
              style={{
                padding: '8px 16px',
                background: '#f5f5f5',
                color: '#333',
                border: '1px solid #d9d9d9',
                borderRadius: '18px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease',
                minWidth: '90px',
                justifyContent: 'center'
              }}
              onClick={() => handleCancel(appointment.id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#efefef';
                e.currentTarget.style.borderColor = '#cfcfcf';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f5f5f5';
                e.currentTarget.style.borderColor = '#d9d9d9';
              }}
            >
              {/* <span style={{ fontSize: '15px', color: '#dc3545' }}>✕</span> */}
              Hủy
              <span style={{ fontSize: '15px', color: '#dc3545' }}>✕</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LichHen;