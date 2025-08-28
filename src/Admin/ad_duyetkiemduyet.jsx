import React, { useState } from 'react';
import AdHeader from './ad_header';
import AdSidebar from './ad_sidebar';
import './Admin.css';

const AdDuyetKiemDuyet = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data for pending posts
  const pendingPosts = [
  ];

  const handleApprove = (postId) => {
    console.log('Approve post:', postId);
    // Add approval logic here
  };

  const handleReject = (postId) => {
    console.log('Reject post:', postId);
    // Add rejection logic here
  };

  const handleViewDetails = (postId) => {
    console.log('View details for post:', postId);
    // Add view details logic here
  };

  return (
    <div className="admin-layout">
      <AdHeader />
      <div className="admin-content">
        <AdSidebar />
        <main className="admin-main">
          <div className="duyet-kiem-duyet-container">

            {/* Filter Options */}
            <div className="filter-section">
              <div className="filter-buttons">
                <button 
                  className={`filter-btn ${selectedFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedFilter('all')}
                >
                  Tất cả
                </button>
                <button 
                  className={`filter-btn ${selectedFilter === 'title' ? 'active' : ''}`}
                  onClick={() => setSelectedFilter('title')}
                >
                  Tiêu đề
                </button>
                <button 
                  className={`filter-btn ${selectedFilter === 'poster' ? 'active' : ''}`}
                  onClick={() => setSelectedFilter('poster')}
                >
                  Người đăng
                </button>
                <button 
                  className={`filter-btn ${selectedFilter === 'date' ? 'active' : ''}`}
                  onClick={() => setSelectedFilter('date')}
                >
                  Ngày gửi
                </button>
              </div>
              <div className="status-dropdown">
                <select 
                  value={selectedStatus} 
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="status-select"
                >
                  <option value="all">Trạng thái</option>
                  <option value="pending">Chờ duyệt</option>
                  <option value="approved">Đã duyệt</option>
                  <option value="rejected">Từ chối</option>
                </select>
              </div>
            </div>

            {/* Posts List */}
            <div className="posts-list">
              {pendingPosts.map((post) => (
                <div key={post.id} className="post-card">
                  <div className="post-images">
                    <div className="image-grid">
                      {post.images.slice(0, 4).map((image, index) => (
                        <div key={index} className="image-item">
                          <img 
                            src={`/anh/${image}`} 
                            alt={`${post.title} - ${index + 1}`}
                            onError={(e) => {
                              e.target.src = '/anh/phong1.jpg'; // Fallback image
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="post-details">
                    <div className="post-header">
                      <span className="post-id">{post.id}</span>
                      <h3 className="post-title">{post.title}</h3>
                    </div>
                    
                    <div className="post-info">
                      <div className="info-row">
                        <span className="label">Người đăng:</span>
                        <span className="value">{post.poster}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Ngày gửi:</span>
                        <span className="value">{post.submissionDate}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Địa chỉ:</span>
                        <span className="value">{post.address}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Giá:</span>
                        <span className="value price">{post.price}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">SĐT:</span>
                        <span className="value">{post.phone}</span>
                      </div>
                    </div>
                    
                    <div className="post-content">
                      <p>{post.content}</p>
                    </div>
                    
                    <div className="post-actions">
                      <button 
                        className="btn-details"
                        onClick={() => handleViewDetails(post.id)}
                      >
                        Chi tiết <i className="bi bi-chevron-down"></i>
                      </button>
                      <button 
                        className="btn-approve"
                        onClick={() => handleApprove(post.id)}
                      >
                        <i className="bi bi-check"></i> Duyệt
                      </button>
                      <button 
                        className="btn-reject"
                        onClick={() => handleReject(post.id)}
                      >
                        <i className="bi bi-x"></i> Từ chối
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdDuyetKiemDuyet;
