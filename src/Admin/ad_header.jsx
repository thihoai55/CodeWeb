import React from 'react';
import AdProfile from './ad_profile';
import AdThongBaoHeader from './ad_thongbaoheader';
import { useNavigate } from 'react-router-dom';

const AdHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="admin-header">
      <div className="header-left">
        <div className="logo">
          {/* Logo */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            minWidth: 90,
            marginRight: 12,
            cursor: "pointer"
          }}
            onClick={() => navigate("/")}
          >
            <img 
              src="/anh/Logotrang.png" 
              alt="Motel Home" 
              style={{ height: 60, marginBottom: 1 }}
              onError={(e) => {
                console.error('Logo load error:', e);
                // Fallback nếu logo không load được
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div style={{
              fontSize: "16px",
              color: "#52b4f9",
              marginTop: "1px",
              fontWeight: "700",
              display: "none" // Ẩn mặc định, chỉ hiện khi logo lỗi
            }}>
              Motel Home
            </div>
          </div>
          
        </div>
      </div>
      <div className="header-right">
        <div className="header-icons">
          <AdThongBaoHeader />
          <div className="icon"><i className="bi bi-chat-left-text"></i></div>
        </div>
        
        {/* Thay thế phần user-info cũ bằng AdProfile component */}
        <AdProfile />
      </div>
    </header>
  );
};

export default AdHeader;
// // Chèn logo nhóm
// tạo id của từng bài dể khi có người bao cáo con biet
// thiếu thống kê theo loại bài
// chưa thống nhất bài đã duyệt bên admin qua người dùng
