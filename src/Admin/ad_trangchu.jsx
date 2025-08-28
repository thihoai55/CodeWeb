import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdHeader from './ad_header';
import AdSidebar from './ad_sidebar';


const AdTrangChu = () => {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    // Kiểm tra đăng nhập và role
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole');
    const userInfoStr = localStorage.getItem('userInfo');

    if (!isLoggedIn || userRole !== 'admin') {
      navigate('/dang-nhap');
      return;
    }

    if (userInfoStr) {
      setUserInfo(JSON.parse(userInfoStr));
    }


  }, [navigate]);
// khi logout dua ve trang dăng nhapnhap
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userBalance');
    navigate('/dang-nhap');
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-container">
      <AdHeader />
      
      <div className="admin-content">
        <AdSidebar />
        
        <div className="main-content">
          <div className="page-header">
            <div className="breadcrumbs">
              
              
            </div>
          </div>

          {/* cau chao tren trang trang chuchu */}
          <div style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '12px',
            padding: '30px',
            margin: '0 20px 20px 20px',
            color: 'white',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <h1 style={{ margin: '0 0 10px 0', fontSize: '28px', fontWeight: '600' }}>
              Chào mừng, {userInfo.name}! 👋
            </h1>
            <p style={{ margin: '0', fontSize: '16px', opacity: '0.9' }}>
              Bạn đang sử dụng tài khoản quản trị viên với quyền truy cập đầy đủ vào hệ thống
            </p>
          </div>

          {/* Thẻ thống kê */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            margin: '0 20px 20px 20px'
          }}>
            {/*thẻ người dùngdùng */}
            <div style={{
              background: 'white',
              borderRadius: '10px',
              padding: '25px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              border: '1px solid #f0f0f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '600', color: '#333' }}>
                    1,234
                  </h3>
                  <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>Tổng người dùng</p>
                </div>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: '#e3f2fd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px'
                }}>
                  👥
                </div>
              </div>
            </div>

            {/* thẻ bài viếtviết */}
            <div style={{
              background: 'white',
              borderRadius: '10px',
              padding: '25px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              border: '1px solid #f0f0f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '600', color: '#333' }}>
                    567
                  </h3>
                  <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>Bài đăng</p>
                </div>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: '#f3e5f5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px'
                }}>
                  📝
                </div>
              </div>
            </div>

            {/* Thẻ trạng thái hệ thống */}
             <div style={{
               background: 'white',
               borderRadius: '10px',
               padding: '25px',
               boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
               border: '1px solid #f0f0f0'
             }}>
               <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                 <div>
                   <h3 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '600', color: '#333' }}>
                     Hoạt động
                   </h3>
                   <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>Trạng thái hệ thống</p>
                 </div>
                 <div style={{
                   width: '50px',
                   height: '50px',
                   borderRadius: '50%',
                   background: '#e8f5e8',
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   fontSize: '24px'
                 }}>
                   ✅
                 </div>
               </div>
             </div>

            {/* Revenue Card */}
            <div style={{
              background: 'white',
              borderRadius: '10px',
              padding: '25px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              border: '1px solid #f0f0f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '600', color: '#333' }}>
                    ₫125M
                  </h3>
                  <p style={{ margin: '0', color: '#666', fontSize: '14px' }}>Doanh thu tháng</p>
                </div>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: '#e8f5e8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px'
                }}>
                  💰
                </div>
              </div>
            </div>
          </div>

         
          
          </div>
        </div>
      </div>
  
  );
};

export default AdTrangChu;
