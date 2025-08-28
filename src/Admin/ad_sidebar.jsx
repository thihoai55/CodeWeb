import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';


const AdSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);



  const menuItems = [
    {
      id: 'dashboard',
      label: 'Trang chủ',
      icon: <i className="bi bi-border-all"></i>,
      path: '/admin/dashboard'
    },
    {
      id: 'quan-ly-nguoi-dung',
      label: 'Quản lý người dùng',
      icon: '☰',
      path: '/admin/quan-ly-nguoi-dung'
      // Bỏ isActive để không có màu xanh
    },
    
    {
      id: 'quan-ly-bai-dang',
      label: 'Quản lý bài đăng',
      icon: '☰',
      path: '/admin/quan-ly-bai-dang'
    },
    
    {
      id: 'bao-cao-thong-ke',
      label: 'Báo cáo - Thống kê',
      icon: '☰',
      path: '/admin/bao-cao-thong-ke'
    },
    {
      id: 'thong-bao',
      label: 'Thông báo',
      icon: <i className="bi bi-bell"></i>,
      path: '/admin/thong-bao'
    },

    {
      id: 'dang-xuat',
      label: 'Đăng xuất',
      icon: <i className="bi bi-box-arrow-left"></i>,
      path: '/admin/dang-xuat'
    }
  ];
// Tương tác với sidebar
  const handleMouseEnter = (itemId) => {
    setHoveredItem(itemId);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };
//dẫn về trang chủ
  const handleItemClick = (item) => {
    if (item.id === 'dang-xuat') {
      navigate('/');
      return;
    }
    
    if (item.path) {
      navigate(item.path);
    }
  };
//render thanh điều hướng bên trái (sidebar)
  // Xác định item đang active dựa theo đường dẫn hiện tại
  const isItemActive = (itemPath) => {
    if (!itemPath) return false;
    const currentPath = location.pathname || '';
    // Active nếu path hiện tại khớp hoặc bắt đầu bằng path của item
    return currentPath === itemPath || currentPath.startsWith(itemPath + '/');
  };

  return (
    <nav className="admin-sidebar">
      <ul className="nav-list">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className={`nav-item ${isItemActive(item.path) ? 'active' : ''}`}
            onMouseEnter={() => handleMouseEnter(item.id)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleItemClick(item)}
            style={{ position: 'relative' }}
          >
            <div className="nav-icon">
              {item.icon}

            </div>
            <span>{item.label}</span>
            
            
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdSidebar;
