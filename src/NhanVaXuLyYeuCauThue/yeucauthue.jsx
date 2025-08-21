import React, { useState } from 'react';
import { createRentalRequestNotification } from '../DaTa/DaTaThongBao';

const YeuCauThue = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      listingId: 'BD006',
      title: 'Cho thuê căn hộ phù hợp với sinh viên và nhân viên văn phòng ngay trung tâm TP Huế. Phòng rộng rãi, sạch sẽ, có sẵn điều hòa, tủ lạnh, máy giặt và bàn học. Giá chỉ 2.5 triệu/tháng, hợp đồng dài hạn, an ninh đảm bảo, gần các trường đại học và siêu thị.',
      renterName: 'Huỳnh Mai Ngọc Nữ',
      rentDate: '15/07/2025',
      rentTime: '08:15',
      phoneNumber: '0824562657'
    },
    {
      id: 2,
      listingId: 'BD003',
      title: 'Tìm nữ ở ghép gần trường Đại học Khoa học. Phòng trọ đã đầy đủ tiện nghi: giường, tủ, bàn học, internet tốc độ cao. Chỉ cần mang quần áo đến ở, không phát sinh thêm chi phí. Gần chợ, siêu thị và trạm xe buýt, thuận tiện cho sinh viên đi học và đi làm thêm.',
      renterName: 'Nguyễn Thị Hoài',
      rentDate: '05/05/2025',
      rentTime: '08:30',
      phoneNumber: '0819923174'
    },
    {
      id: 3,
      listingId: 'BD004',
      title: 'Phòng trọ ngay trung tâm thành phố Huế, vị trí đẹp, gần các trường đại học, siêu thị và khu vui chơi. Phòng đã có điều hòa, nóng lạnh, giường, tủ và bàn học, rất phù hợp cho sinh viên hoặc nhân viên văn phòng. Khu trọ an ninh, có chỗ để xe an toàn, giá cả hợp lý.',
      renterName: 'Lê Văn Thuần',
      rentDate: '08/01/2025',
      rentTime: '17:00',
      phoneNumber: '0865465228'
    },
    {
      id: 4,
      listingId: 'BD002',
      title: 'Cho thuê căn hộ vừa mới xây, nội thất mới 100%, đã lắp đặt đầy đủ tiện nghi: điều hòa, tủ lạnh, máy giặt, bếp từ, bàn ghế. Diện tích rộng rãi, có ban công thoáng mát, view đẹp. Có nơi để xe an toàn, khu vực yên tĩnh, hàng xóm thân thiện. Thích hợp cho gia đình nhỏ hoặc nhóm bạn thuê chung.',
      renterName: 'Ngô Quý Long Nhật',
      rentDate: '11/08/2024',
      rentTime: '15:30',
      phoneNumber: '0839582948'
    }
  ]);

  const handleApprove = (requestId) => {
    console.log('Chấp nhận yêu cầu thuê:', requestId);
    
    // Tìm thông tin yêu cầu thuê
    const request = requests.find(req => req.id === requestId);
    
    // Xóa yêu cầu thuê khỏi danh sách
    setRequests(prev => prev.filter(req => req.id !== requestId));
    
    // Tạo thông báo mới sử dụng notificationManager
    createRentalRequestNotification(request.listingId, 'approve');
    
    // Có thể thêm logic gửi thông báo real-time ở đây
    alert('Đã chấp nhận yêu cầu thuê và gửi thông báo!');
  };

  const handleReject = (requestId) => {
    console.log('Từ chối yêu cầu thuê:', requestId);
    
    // Tìm thông tin yêu cầu thuê
    const request = requests.find(req => req.id === requestId);
    
    // Xóa yêu cầu thuê khỏi danh sách
    setRequests(prev => prev.filter(req => req.id !== requestId));
    
    // Tạo thông báo mới sử dụng notificationManager
    createRentalRequestNotification(request.listingId, 'reject');
    
    // Có thể thêm logic gửi thông báo real-time ở đây
    alert('Đã từ chối yêu cầu thuê và gửi thông báo!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {requests.map((req) => (
        <div
          key={req.id}
          style={{
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
          }}
        >
          <div style={{ flex: 1, marginRight: '20px' }}>
            <h3
              style={{
                fontSize: '18px',
                fontWeight: '500',
                color: '#1a73e8',
                margin: '0 0 12px 0',
                lineHeight: '1.4'
              }}
            >
              Tiêu đề: {req.title}
            </h3>

            <div style={{ display: 'flex', gap: '100px', flexWrap: 'wrap', paddingLeft: '15px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span style={{ fontSize: '16px', color: '#666', fontWeight: '600' }}>Mã tin</span>
                <span style={{ fontSize: '16px', color: '#333' }}>{req.listingId}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span style={{ fontSize: '16px', color: '#666', fontWeight: '600' }}>Tên người thuê</span>
                <span style={{ fontSize: '16px', color: '#333' }}>{req.renterName}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span style={{ fontSize: '16px', color: '#666', fontWeight: '600' }}>Ngày thuê</span>
                <span style={{ fontSize: '16px', color: '#333' }}>{req.rentDate}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span style={{ fontSize: '16px', color: '#666', fontWeight: '600' }}>Giờ thuê</span>
                <span style={{ fontSize: '16px', color: '#333' }}>{req.rentTime}</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <span style={{ fontSize: '16px', color: '#666', fontWeight: '600' }}>SĐT</span>
                <span style={{ fontSize: '16px', color: '#333' }}>{req.phoneNumber}</span>
              </div>
            </div>
          </div>

          {/* button xác nhân */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flexShrink: 0 }}>
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
                minWidth: '110px',
                justifyContent: 'center',
                // lineHeight: '1.4'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#efefef';
                e.currentTarget.style.borderColor = '#cfcfcf';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f5f5f5';
                e.currentTarget.style.borderColor = '#d9d9d9';
              }}
              onClick={() => handleApprove(req.id)}
            >
              <span style={{ fontSize: '15px', color: '#28a745' }}>✓</span>
              Chấp nhận
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
                minWidth: '110px',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#efefef';
                e.currentTarget.style.borderColor = '#cfcfcf';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#f5f5f5';
                e.currentTarget.style.borderColor = '#d9d9d9';
              }}
              onClick={() => handleReject(req.id)}
            >
              <span style={{ fontSize: '15px', color: '#dc3545' }}>✕</span>
              Từ chối
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default YeuCauThue;