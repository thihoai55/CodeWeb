import React from 'react';

const LichHen = () => {
  // Dữ liệu mẫu cho các lịch hẹn
  const appointments = [
    {
      id: 1,
      listingId: 'BD001',
      title: 'Phòng trọ mới đã trang trí đầy đủ tiện nghi, gần trung tâm thành phố',
      customerName: 'Ngô Thị Thanh Nhàn',
      appointmentDate: '29/03/2024',
      appointmentTime: '11:00',
      phoneNumber: '0356340085'
    },
    {
      id: 2,
      listingId: 'BD002',
      title: 'Cho thuê căn hộ vừa mới xây đã lắp đặt đầy đủ tiện nghi, rộng rãi, có nơi bỏ xe an toàn,...',
      customerName: 'Ngô Quý Long Nhật',
      appointmentDate: '11/08/2024',
      appointmentTime: '15:30',
      phoneNumber: '0839582948'
    },
    {
      id: 3,
      listingId: 'BD003',
      title: 'Tìm nữ ở ghép gần trường Đại học Khoa học, trọ đã có đầy đủ các tiện nghi chỉ cần chuyển vào ở.',
      customerName: 'Nguyễn Thị Hoài',
      appointmentDate: '05/05/2025',
      appointmentTime: '08:30',
      phoneNumber: '0819923174'
    },
    {
      id: 4,
      listingId: 'BD004',
      title: 'Phòng trọ ngay trung tâm thành phố Huế, gần các trường đại học, có điều hòa, nóng lạnh phù hợp cho sinh viên,...',
      customerName: 'Lê Văn Thuần',
      appointmentDate: '08/01/2025',
      appointmentTime: '17:00',
      phoneNumber: '0865465228'
    }
  ];

  const handleConfirm = (appointmentId) => {
    console.log('Xác nhận lịch hẹn:', appointmentId);
    // Xử lý logic xác nhận lịch hẹn
  };

  const handleCancel = (appointmentId) => {
    console.log('Hủy lịch hẹn:', appointmentId);
    // Xử lý logic hủy lịch hẹn
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      {appointments.map((appointment) => (
        <div key={appointment.id} style={{
          background: '#fff',
          borderRadius: '10px',
          padding: '16px',
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
          <div style={{ flex: 1 }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '600',
              color: '#1a73e8',
              margin: '0 0 12px 0',
              lineHeight: '1.4'
            }}>
              Tiêu đề: {appointment.title}
            </h3>
            
            {/* Appointment Details - Horizontal Layout */}
            <div style={{
              display: 'flex',
              gap: '24px',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: '#666', fontWeight: '600' }}>Mã tin:</span>
                <span style={{ fontSize: '14px', color: '#333' }}>{appointment.listingId}</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: '#666', fontWeight: '600' }}>Tên người hẹn:</span>
                <span style={{ fontSize: '14px', color: '#333' }}>{appointment.customerName}</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: '#666', fontWeight: '600' }}>Ngày hẹn:</span>
                <span style={{ fontSize: '14px', color: '#333' }}>{appointment.appointmentDate}</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: '#666', fontWeight: '600' }}>Giờ hẹn:</span>
                <span style={{ fontSize: '14px', color: '#333' }}>{appointment.appointmentTime}</span>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: '#666', fontWeight: '600' }}>SĐT:</span>
                <span style={{ fontSize: '14px', color: '#333' }}>{appointment.phoneNumber}</span>
              </div>
            </div>
          </div>

          {/* Appointment Actions */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            flexShrink: 0
          }}>
            <button 
              style={{
                padding: '8px 16px',
                background: '#f5f5f5',
                color: '#333',
                border: '1px solid #d9d9d9',
                borderRadius: '18px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
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
              <span style={{ fontSize: '12px', color: '#28a745' }}>✓</span>
              Xác nhận
            </button>
            <button 
              style={{
                padding: '8px 16px',
                background: '#f5f5f5',
                color: '#333',
                border: '1px solid #d9d9d9',
                borderRadius: '18px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
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
              <span style={{ fontSize: '12px', color: '#dc3545' }}>✕</span>
              Hủy
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LichHen;