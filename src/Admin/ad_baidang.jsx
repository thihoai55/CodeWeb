import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdHeader from './ad_header';
import AdSidebar from './ad_sidebar';
import './Admin.css';

const AdBaiDang = () => {
    const navigate = useNavigate();
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('pending');
    const [selectedType, setSelectedType] = useState('all');
    const [showNotification, setShowNotification] = useState(false);
    const [notificationMessage, setNotificationMessage] = useState('');
    const [allPosts, setAllPosts] = useState([
        // Phòng trọ (Rental posts)
        {
            id: 'ND209',
            type: 'phongtro',
            title: 'Phòng trọ gần trường Đại học Khoa học Huế',
            poster: 'Nguyễn Văn A',
            submissionDate: '16/7/2025',
            address: '109 Nguyễn Huệ, Thành phố Huế',
            price: '1.500.000 VND/ Tháng',
            phone: '0921453673',
            content: 'Phòng sạch sẽ, riêng biệt, giờ giấc tự do, có nhà xe rộng rãi, không ngập lụt, có camera an ninh 24/7, wifi tốc độ cao, điều hòa mới, tủ lạnh, bếp nấu ăn riêng biệt. Gần chợ, siêu thị, bệnh viện, trường học. Phù hợp cho sinh viên và người đi làm. Liên hệ ngay để xem phòng!',
            images: ['phong1.jpg', 'phong2.webp', 'phong3.jpeg', 'phong4.jpg'],
            status: 'pending' // pending, approved, rejected, locked
        },
        {
            id: 'ND210',
            type: 'phongtro',
            title: 'Phòng trọ cho sinh viên giá rẻ',
            poster: 'Trần Thị B',
            submissionDate: '18/7/2025',
            address: '39/104 Phan Chu Trinh, Thành phố Huế',
            price: '1.000.000 VND/ Tháng',
            phone: '0982974652',
            content: 'Dành riêng cho nữ sinh viên, đảm bảo an ninh tuyệt đối, không ngập lụt, có camera an ninh, cửa khóa vân tay, wifi miễn phí, nước nóng, điều hòa, tủ lạnh mini. Gần trường Đại học Y Dược Huế, chợ Đông Ba, bến xe. Môi trường sống văn minh, sạch sẽ. Giá cả hợp lý, phù hợp với sinh viên.',
            images: ['phong5.jpg', 'phong6.jpg', 'phong7.jpg', 'phong8.jpg'],
            status: 'approved',
            approvedAt: '2025-07-18T10:30:00.000Z'
        },
        // Tìm người ở ghép (Roommate-seeking posts)
        {
            id: 'ND211',
            type: 'oghep',
            title: 'Tìm người ở ghép tại trọ',
            poster: 'Hoàng Trọng Bảo',
            submissionDate: '18/7/2025',
            address: '43 Hồ Đắc Di, Thành phố Huế',
            price: '1.200.000 VND/ Tháng',
            phone: '0963456778',
            content: 'Trọ sạch sẽ, đầy đủ đồ dùng, đảm bảo an ninh, không ngập lụt, có camera an ninh, wifi tốc độ cao, điều hòa, tủ lạnh, bếp nấu ăn chung. Gần trường Đại học Sư phạm Huế, chợ Tây Lộc, bến xe. Tìm bạn ở ghép văn minh, sạch sẽ, không hút thuốc, không ồn ào. Phù hợp cho sinh viên hoặc người đi làm.',
            images: ['phong9.jpg', 'phong10.jpg', 'phong11.jpg', 'phong12.jpg'],
            status: 'pending'
        },
        {
            id: 'ND212',
            type: 'oghep',
            title: 'Tìm bạn nữ ở ghép phòng trọ sinh viên',
            poster: 'Lê Thị C',
            submissionDate: '19/7/2025',
            address: '25 Lý Thường Kiệt, Thành phố Huế',
            price: '800.000 VND/ Tháng',
            phone: '0912345678',
            content: 'Tìm bạn nữ ở ghép, phòng sạch sẽ, gần trường Đại học Kinh tế Huế, chợ An Cựu, bến xe. Có wifi, điều hòa, tủ lạnh, bếp nấu ăn chung. Môi trường sống văn minh, thân thiện, phù hợp cho sinh viên. Giá cả hợp lý, bao gồm điện nước. Liên hệ ngay để xem phòng và gặp mặt!',
            images: ['phong13.jpg', 'phong14.jpg', 'phong15.jpg', 'phong16.jpg'],
            status: 'locked',
            lockedAt: '2025-07-19T12:30:00.000Z'
        },
        {
            id: 'ND213',
            type: 'phongtro',
            title: 'Cho thuê phòng trọ cao cấp, view sông Hương',
            poster: 'Phạm Văn D',
            submissionDate: '20/7/2025',
            address: '78 Trần Phú, Thành phố Huế',
            price: '2.500.000 VND/ Tháng',
            phone: '0987654321',
            content: 'Phòng cao cấp, đầy đủ tiện nghi hiện đại, an ninh 24/7, có camera an ninh, cửa khóa vân tay, wifi tốc độ cao, điều hòa inverter, tủ lạnh, máy giặt, bếp nấu ăn riêng biệt. View sông Hương đẹp, gần trung tâm thành phố, chợ Đông Ba, cầu Tràng Tiền. Phù hợp cho người đi làm, gia đình nhỏ. Liên hệ ngay để xem phòng!',
            images: ['phong17.jpg', 'phong18.jpg', 'phong19.jpg', 'phong20.jpg'],
            status: 'approved',
            approvedAt: '2025-07-20T14:15:00.000Z'
        },
        {
            id: 'ND214',
            type: 'phongtro',
            title: 'Phòng trọ bị từ chối - test chức năng duyệt lại',
            poster: 'Nguyễn Văn Test',
            submissionDate: '21/7/2025',
            address: '123 Test Street, Thành phố Huế',
            price: '1.800.000 VND/ Tháng',
            phone: '0123456789',
            content: 'Đây là bài đăng test để kiểm tra chức năng duyệt lại sau khi bị từ chối. Phòng trọ có đầy đủ tiện nghi cơ bản.',
            images: ['phong1.jpg', 'phong2.webp', 'phong3.jpeg', 'phong4.jpg'],
            status: 'rejected',
            rejectedAt: '2025-07-21T16:45:00.000Z'
        }
    ]);

    const showSuccessNotification = (message) => {
        setNotificationMessage(message);
        setShowNotification(true);
        setTimeout(() => {
            setShowNotification(false);
        }, 3000);
    };

    const handleApprove = (postId) => {
        setAllPosts(prevPosts => {
            // Cập nhật trạng thái bài đăng thành 'approved' và thêm thời gian duyệt
            const updatedPosts = prevPosts.map(post =>
                post.id === postId
                    ? { ...post, status: 'approved', approvedAt: new Date().toISOString() }
                    : post
            );
            return updatedPosts;
        });
        
        // Tự động chuyển sang tab "Đã duyệt" sau khi duyệt
        setSelectedStatus('approved');
        
        // Hiển thị thông báo thành công
        const approvedPost = allPosts.find(post => post.id === postId);
        showSuccessNotification(`Đã duyệt bài đăng "${approvedPost.title}" thành công!`);
    };

    const handleReject = (postId) => {
        console.log('Reject post:', postId);
        // Update post status to rejected and add rejection time
        setAllPosts(prevPosts => 
            prevPosts.map(post => 
                post.id === postId 
                    ? { ...post, status: 'rejected', rejectedAt: new Date().toISOString() }
                    : post
            )
        );
        
        // Tự động chuyển sang tab "Từ chối" sau khi từ chối
        setSelectedStatus('rejected');
        
        // Hiển thị thông báo
        const rejectedPost = allPosts.find(post => post.id === postId);
        showSuccessNotification(`Đã từ chối bài đăng "${rejectedPost.title}"!`);
    };

    const handleDelete = (postId) => {
        const postToDelete = allPosts.find(post => post.id === postId);
        const confirmDelete = window.confirm(`Bạn có chắc chắn muốn xóa bài đăng "${postToDelete.title}"?`);
        
        if (confirmDelete) {
            console.log('Delete post:', postId);
            // Remove post from list
            setAllPosts(prevPosts => 
                prevPosts.filter(post => post.id !== postId)
            );
            
            // Hiển thị thông báo
            showSuccessNotification(`Đã xóa bài đăng "${postToDelete.title}"!`);
        }
    };

    const handleLock = (postId) => {
        console.log('Lock post:', postId);
        // Update post status to locked and add lock time
        setAllPosts(prevPosts => 
            prevPosts.map(post => 
                post.id === postId 
                    ? { ...post, status: 'locked', lockedAt: new Date().toISOString() }
                    : post
            )
        );
        
        // Tự động chuyển sang tab "Đã khóa" sau khi khóa
        setSelectedStatus('locked');
        
        // Hiển thị thông báo
        const lockedPost = allPosts.find(post => post.id === postId);
        showSuccessNotification(`Đã khóa bài đăng "${lockedPost.title}"!`);
    };

    const handleViewDetails = (postId) => {
        console.log('View details for post:', postId);
        console.log('Current selectedStatus:', selectedStatus);
        console.log('Will navigate to:', `/admin/chi-tiet-bai-dang/${postId}`);
        // Navigate to detail page with post ID
        navigate(`/admin/chi-tiet-bai-dang/${postId}`);
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { text: 'Chờ duyệt', class: 'status-pending' },
            approved: { text: 'Đã duyệt', class: 'status-approved' },
            rejected: { text: 'Từ chối', class: 'status-rejected' },
            locked: { text: 'Đã khóa', class: 'status-locked' }
        };

        const config = statusConfig[status] || statusConfig.pending;
        return <span className={`status-badge ${config.class}`}>{config.text}</span>;
    };

    const getTypeBadge = (type) => {
        const typeConfig = {
            phongtro: { text: 'Phòng trọ', class: 'type-rental' },
            oghep: { text: 'Ở ghép', class: 'type-roommate' }
        };

        const config = typeConfig[type] || typeConfig.phongtro;
        return <span className={`type-badge ${config.class}`}>{config.text}</span>;
    };

    // Filter posts based on selected filters
    const filteredPosts = allPosts
        .filter(post => {
            const typeMatch = selectedType === 'all' || post.type === selectedType;
            const statusMatch = selectedStatus === 'all' || post.status === selectedStatus;
            return typeMatch && statusMatch;
        })
        .sort((a, b) => {
            // Ưu tiên bài đăng mới được duyệt lên đầu (nếu có thời gian duyệt)
            if (a.approvedAt && b.approvedAt) {
                return new Date(b.approvedAt) - new Date(a.approvedAt);
            } else if (a.approvedAt && !b.approvedAt) {
                return -1; // a lên đầu
            } else if (!a.approvedAt && b.approvedAt) {
                return 1; // b lên đầu
            }
            
            // Ưu tiên bài đăng mới bị từ chối lên đầu (nếu có thời gian từ chối)
            if (a.rejectedAt && b.rejectedAt) {
                return new Date(b.rejectedAt) - new Date(a.rejectedAt);
            } else if (a.rejectedAt && !b.rejectedAt) {
                return -1; // a lên đầu
            } else if (!a.rejectedAt && b.rejectedAt) {
                return 1; // b lên đầu
            }
            
            // Ưu tiên bài đăng mới bị khóa lên đầu (nếu có thời gian khóa)
            if (a.lockedAt && b.lockedAt) {
                return new Date(b.lockedAt) - new Date(a.lockedAt);
            } else if (a.lockedAt && !b.lockedAt) {
                return -1; // a lên đầu
            } else if (!a.lockedAt && b.lockedAt) {
                return 1; // b lên đầu
            }
            
            // Nếu không có thời gian duyệt, từ chối hoặc khóa, sắp xếp theo ngày gửi (mới nhất lên đầu)
            const dateA = new Date(a.submissionDate.split('/').reverse().join('-'));
            const dateB = new Date(b.submissionDate.split('/').reverse().join('-'));
            return dateB - dateA;
        });

    return (
        <div className="admin-layout">
            <AdHeader />
            <div className="admin-content">
                <AdSidebar />
                <main className="admin-main">
                    <div className="quan-ly-bai-dang-container">
                        
                        {/* Notification */}
                        {showNotification && (
                            <div className="notification success">
                                <i className="bi bi-check-circle"></i>
                                {notificationMessage}
                            </div>
                        )}
                        
                        {/* Filter Options */}
                        <div className="filter-section">
                            <div className="filter-buttons">
                                <button
                                    className={`filter-btn ${selectedStatus === 'approved' ? 'active' : ''}`}
                                    onClick={() => setSelectedStatus('approved')}
                                >
                                    Đã duyệt
                                </button>
                                <button
                                    className={`filter-btn ${selectedStatus === 'pending' ? 'active' : ''}`}
                                    onClick={() => setSelectedStatus('pending')}
                                >
                                    Chờ duyệt
                                </button>
                                <button
                                    className={`filter-btn ${selectedStatus === 'rejected' ? 'active' : ''}`}
                                    onClick={() => setSelectedStatus('rejected')}
                                >
                                    Từ chối
                                </button>
                                <button
                                    className={`filter-btn ${selectedStatus === 'locked' ? 'active' : ''}`}
                                    onClick={() => setSelectedStatus('locked')}
                                >
                                    Đã khóa
                                </button>
                            </div>
                            <div className="status-dropdown">
                                <select
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    className="status-select"
                                >
                                    <option value="all">Tất cả loại</option>
                                    <option value="phongtro">Phòng trọ</option>
                                    <option value="oghep">Ở ghép</option>
                                </select>
                            </div>
                        </div>

                        {/* Posts List */}
                        <div className="posts-list">
                            {filteredPosts.map((post) => (
                                <div key={post.id} className="post-card">
                                    <div className="post-content-wrapper">
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
                                                <h3 className="post-title">{post.title}</h3>
                                            </div>

                                            <div className="post-info">
                                                <div className="info-row">
                                                    <span className="label">Mã tin:</span>
                                                    <span className="value post-id">{post.id}</span>
                                                </div>
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

                                                {/* Show Approve/Reject buttons for pending posts */}
                                                {post.status === 'pending' && (
                                                    <>
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
                                                    </>
                                                )}

                                                {/* Show Lock button for approved posts */}
                                                {post.status === 'approved' && (
                                                    <button
                                                        className="btn-lock"
                                                        onClick={() => handleLock(post.id)}
                                                    >
                                                        <i className="bi bi-lock"></i> Khóa
                                                    </button>
                                                )}

                                                {/* Show Unlock button for locked posts */}
                                                {post.status === 'locked' && (
                                                    <button
                                                        className="btn-unlock"
                                                        onClick={() => handleApprove(post.id)}
                                                    >
                                                        <i className="bi bi-unlock"></i> Mở khóa
                                                    </button>
                                                )}

                                                <button
                                                    className="btn-delete"
                                                    onClick={() => handleDelete(post.id)}
                                                >
                                                    <i className="bi bi-trash"></i> Xóa
                                                </button>
                                            </div>
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

export default AdBaiDang;