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
      icon: '📊',
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
      id: 'quan-ly-tai-khoan',
      label: 'Quản lý tài khoản',
      icon: '☰',
      path: '/admin/quan-ly-tai-khoan'
    },
    {
      id: 'quan-ly-bai-dang',
      label: 'Quản lý bài đăng',
      icon: '☰',
      path: '/admin/quan-ly-bai-dang'
    },
    {
      id: 'duyet-kiem-duyet',
      label: 'Duyệt và kiểm duyệt',
      icon: '☰',
      path: '/admin/duyet-kiem-duyet'
    },
    {
      id: 'quan-tri-he-thong',
      label: 'Quản trị hệ thống',
      icon: '☰',
      path: '/admin/quan-tri-he-thong'
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

  const handleMouseEnter = (itemId) => {
    setHoveredItem(itemId);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleItemClick = (item) => {
    if (item.id === 'dang-xuat') {
      navigate('/');
      return;
    }
    
    if (item.path) {
      navigate(item.path);
    }
  };



  return (
    <nav className="admin-sidebar">
      <ul className="nav-list">
        {menuItems.map((item) => (
          <li
            key={item.id}
            className="nav-item"
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
