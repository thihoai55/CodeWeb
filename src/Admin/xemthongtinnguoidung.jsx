import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';
import AdSidebar from './ad_sidebar';
import AdHeader from './ad_header';
import XoaNguoiDung from './xoanguoidung';

const XemThongTinNguoiDung = () => {
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10); // Thay đổi từ 5 thành 10 người dùng mỗi trang
  
  const [users, setUsers] = useState([
    {
      id: 'N01',
      fullName: 'Ngô Thị Thanh Nhàn',
      email: 'Nhanngo@gmail.com',
      phone: '0356340085',
      role: 'Người thuê'
    },
    {
      id: 'N02',
      fullName: 'Nguyễn Thị Hoài',
      email: 'Hoai@gmail.com',
      phone: '0364782438',
      role: 'Người cho thuê'
    },
    {
      id: 'N03',
      fullName: 'Ngô Quý Long Nhật',
      email: 'Ngonhat@gmail.com',
      phone: '0984782445',
      role: 'Người thuê'
    },
    {
      id: 'N04',
      fullName: 'Nguyễn Văn A',
      email: 'nguyena@gmail.com',
      phone: '0948254265',
      role: 'Người thuê'
    },
    {
      id: 'N05',
      fullName: 'Trần Thị B',
      email: 'BTran@gmail.com',
      phone: '0362746848',
      role: 'Người cho thuê'
    },
    {
      id: 'N06',
      fullName: 'Lê Văn Cường',
      email: 'cuong.le@gmail.com',
      phone: '0987654321',
      role: 'Người thuê'
    },
    {
      id: 'N07',
      fullName: 'Phạm Thị Dung',
      email: 'dung.pham@gmail.com',
      phone: '0123456789',
      role: 'Người cho thuê'
    },
    {
      id: 'N08',
      fullName: 'Vũ Hoàng Nam',
      email: 'nam.vu@gmail.com',
      phone: '0987123456',
      role: 'Người thuê'
    },
    {
      id: 'N09',
      fullName: 'Đỗ Thị Hương',
      email: 'huong.do@gmail.com',
      phone: '0567891234',
      role: 'Người cho thuê'
    },
    {
      id: 'N10',
      fullName: 'Hoàng Văn Minh',
      email: 'minh.hoang@gmail.com',
      phone: '0789012345',
      role: 'Người thuê'
    },
    {
      id: 'N11',
      fullName: 'Trần Văn Sơn',
      email: 'son.tran@gmail.com',
      phone: '0345678901',
      role: 'Người cho thuê'
    },
    {
      id: 'N12',
      fullName: 'Nguyễn Thị Lan',
      email: 'lan.nguyen@gmail.com',
      phone: '0890123456',
      role: 'Người thuê'
    },
    {
      id: 'N13',
      fullName: 'Lê Hoàng Phương',
      email: 'phuong.le@gmail.com',
      phone: '0678901234',
      role: 'Người cho thuê'
    },
    {
      id: 'N14',
      fullName: 'Phạm Văn Thành',
      email: 'thanh.pham@gmail.com',
      phone: '0456789012',
      role: 'Người thuê'
    },
    {
      id: 'N15',
      fullName: 'Vũ Thị Mai',
      email: 'mai.vu@gmail.com',
      phone: '0234567890',
      role: 'Người cho thuê'
    }
  ]);

  const [searchFilters, setSearchFilters] = useState({
    fullName: '',
    email: '',
    phone: '',
    unlabeled: ''
  });

  const handleFilterChange = (field, value) => {
    setSearchFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleEditClick = () => {
    if (!selectedUser) {
      alert('Vui lòng chọn một người dùng để chỉnh sửa!');
      return;
    }
    
    // Chuyển đến trang chỉnh sửa với thông tin người dùng đã chọn
    navigate('/admin/sua-thong-tin-nguoi-dung', { 
      state: { userData: selectedUser } 
    });
  };

  const handleDeleteClick = () => {
    if (!selectedUser) {
      alert('Vui lòng chọn một người dùng để xóa!');
      return;
    }
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUser) {
      // Xóa người dùng khỏi danh sách
      setUsers(prevUsers => prevUsers.filter(user => user.id !== selectedUser.id));
      setSelectedUser(null);
      setShowDeleteModal(false);
      alert('Đã xóa người dùng thành công!');
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const filteredUsers = users.filter(user => {
    return (
      user.fullName.toLowerCase().includes(searchFilters.fullName.toLowerCase()) &&
      user.email.toLowerCase().includes(searchFilters.email.toLowerCase()) &&
      user.phone.includes(searchFilters.phone) &&
      (searchFilters.unlabeled === '' ||
        user.fullName.toLowerCase().includes(searchFilters.unlabeled.toLowerCase()) ||
        user.email.toLowerCase().includes(searchFilters.unlabeled.toLowerCase()) ||
        user.phone.includes(searchFilters.unlabeled))
    );
  });

  // Tính toán phân trang
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  
  // Lấy người dùng cho trang hiện tại
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Xử lý chuyển trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setSelectedUser(null); // Bỏ chọn người dùng khi chuyển trang
  };

  // Xử lý chuyển trang trước/sau
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setSelectedUser(null);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setSelectedUser(null);
    }
  };

  // Xử lý chuyển về trang đầu
  const handleFirstPage = () => {
    setCurrentPage(1);
    setSelectedUser(null);
  };

  // Xử lý chuyển đến trang cuối
  const handleLastPage = () => {
    setCurrentPage(totalPages);
    setSelectedUser(null);
  };

  // Reset về trang 1 khi có filter mới
  useEffect(() => {
    setCurrentPage(1);
    setSelectedUser(null);
  }, [searchFilters.fullName, searchFilters.email, searchFilters.phone, searchFilters.unlabeled]);

  return (
    <div className="admin-container">
      <AdHeader />

      <div className="admin-content">
        <AdSidebar />

        <main className="main-content">
          

          {/* Search/Filter Inputs */}
          <div className="search-filters">
            <div className="filter-row">
              <div className="filter-group">
                <label>Họ tên</label>
                <input
                  type="text"
                  value={searchFilters.fullName}
                  onChange={(e) => handleFilterChange('fullName', e.target.value)}
                  placeholder="Nhập họ tên..."
                />
              </div>
              <div className="filter-group">
                <label>Email</label>
                <input
                  type="email"
                  value={searchFilters.email}
                  onChange={(e) => handleFilterChange('email', e.target.value)}
                  placeholder="Nhập email..."
                />
              </div>
            </div>
            <div className="filter-row">
              <div className="filter-group">
                <label>Số điện thoại</label>
                <input
                  type="tel"
                  value={searchFilters.phone}
                  onChange={(e) => handleFilterChange('phone', e.target.value)}
                  placeholder="Nhập số điện thoại..."
                />
              </div>
              <div className="filter-group">
                <label>Vai trò</label>
                <input
                  type="text"
                  value={searchFilters.unlabeled}
                  onChange={(e) => handleFilterChange('unlabeled', e.target.value)}
                  placeholder="Nhập vai trò..."
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons" style={{ display: "flex", justifyContent: "flex-end" }}>
            <button 
              className={`btn btn-edit ${!selectedUser ? 'disabled' : ''}`} 
              onClick={handleEditClick}
              disabled={!selectedUser}
            >
              <span className="btn-icon">✏️</span>
            </button>
            <button 
              className={`btn btn-delete ${!selectedUser ? 'disabled' : ''}`}
              onClick={handleDeleteClick}
              disabled={!selectedUser}
            >
              <span className="btn-icon">🗑️</span>
            </button>
          </div>

          {/* User Data Table */}
          <div className="table-container">
            <table className="user-table">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Họ tên</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Vai trò</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                  <tr 
                    key={user.id}
                    className={selectedUser?.id === user.id ? 'selected-row' : ''}
                    onClick={() => handleUserSelect(user)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>{indexOfFirstUser + index + 1}</td>
                    <td>{user.fullName}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="pagination">
            <div className="page-info">
              <span>Page {currentPage}/{totalPages}</span>
              <div className="dropdown-arrow">▼</div>
            </div>
            <div className="pagination-controls">
              
              <button 
                className={`page-btn ${currentPage === 1 ? 'disabled' : ''}`}
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                ◀️
              </button>
              
              {/* Hiển thị số trang */}
              {Array.from({ length: totalPages }, (_, index) => {
                const pageNumber = index + 1;
                // Chỉ hiển thị một số trang nhất định để tránh quá dài
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      className={`page-btn ${pageNumber === currentPage ? 'active' : ''}`}
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  );
                } else if (
                  pageNumber === currentPage - 2 ||
                  pageNumber === currentPage + 2
                ) {
                  return <span key={pageNumber} className="page-dots">...</span>;
                }
                return null;
              })}
              
              <button 
                className={`page-btn ${currentPage === totalPages ? 'disabled' : ''}`}
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                ▶️
              </button>
              
            </div>
          </div>

          {/* Thay thế modal cũ bằng component mới */}
          <XoaNguoiDung
            isOpen={showDeleteModal}
            onClose={handleCancelDelete}
            onConfirm={handleConfirmDelete}
            userToDelete={selectedUser}
          />
        </main>
      </div>
    </div>
  );
};

export default XemThongTinNguoiDung;
