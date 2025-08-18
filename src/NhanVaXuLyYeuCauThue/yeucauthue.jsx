import React from 'react';

const YeuCauThue = () => {
  const requests = [
    {
      id: 1,
      listingId: 'BD006',
      title: 'Cho thuê căn hộ phù hợp với sinh viên và nhân viên văn phòng ngay trung tâm TP Huế, 2.5 triệu/tháng, đầy đủ tiện nghi.',
      renterName: 'Huỳnh Mai Ngọc Nữ',
      rentDate: '15/07/2025',
      rentTime: '08:15',
      phoneNumber: '0824562657'
    },
    {
      id: 2,
      listingId: 'BD003',
      title: 'Tìm nữ ở ghép gần trường Đại học Khoa học, trọ đã có đầy đủ các tiện nghi chỉ cần chuyển vào ở.',
      renterName: 'Nguyễn Thị Hoài',
      rentDate: '05/05/2025',
      rentTime: '08:30',
      phoneNumber: '0819923174'
    },
    {
      id: 3,
      listingId: 'BD004',
      title: 'Phòng trọ ngay trung tâm thành phố Huế, gần các trường đại học, có điều hòa, nóng lạnh phù hợp cho sinh viên,...',
      renterName: 'Lê Văn Thuần',
      rentDate: '08/01/2025',
      rentTime: '17:00',
      phoneNumber: '0865465228'
    },
    {
      id: 4,
      listingId: 'BD002',
      title: 'Cho thuê căn hộ vừa mới xây đã lắp đặt đầy đủ tiện nghi, rộng rãi, có nơi bỏ xe an toàn,...',
      renterName: 'Ngô Quý Long Nhật',
      rentDate: '11/08/2024',
      rentTime: '15:30',
      phoneNumber: '0839582948'
    }
  ];

  const handleApprove = (requestId) => {
    console.log('Chấp nhận yêu cầu thuê:', requestId);
  };

  const handleReject = (requestId) => {
    console.log('Từ chối yêu cầu thuê:', requestId);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {requests.map((req) => (
        <div
          key={req.id}
          style={{
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
          }}
        >
          <div style={{ flex: 1 }}>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#1a73e8',
                margin: '0 0 12px 0',
                lineHeight: '1.4'
              }}
            >
              Tiêu đề: {req.title}
            </h3>

            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: '#666', fontWeight: '600' }}>Mã tin:</span>
                <span style={{ fontSize: '14px', color: '#333' }}>{req.listingId}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: '#666', fontWeight: '600' }}>Tên người thuê:</span>
                <span style={{ fontSize: '14px', color: '#333' }}>{req.renterName}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: '#666', fontWeight: '600' }}>Ngày thuê:</span>
                <span style={{ fontSize: '14px', color: '#333' }}>{req.rentDate}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: '#666', fontWeight: '600' }}>Giờ thuê:</span>
                <span style={{ fontSize: '14px', color: '#333' }}>{req.rentTime}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '14px', color: '#666', fontWeight: '600' }}>SĐT:</span>
                <span style={{ fontSize: '14px', color: '#333' }}>{req.phoneNumber}</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 }}>
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
              onClick={() => handleApprove(req.id)}
            >
              <span style={{ fontSize: '12px', color: '#28a745' }}>✓</span>
              Chấp nhận
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
              <span style={{ fontSize: '12px', color: '#dc3545' }}>✕</span>
              Từ chối
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default YeuCauThue;