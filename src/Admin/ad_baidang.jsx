import React, { useState } from 'react';
import AdHeader from './ad_header';
import AdSidebar from './ad_sidebar';
import './Admin.css';

const AdBaiDang = () => {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('approved');
    const [selectedType, setSelectedType] = useState('all');
    const [allPosts, setAllPosts] = useState([
        // Phòng trọ (Rental posts)
        {
            id: 'BĐ209',
            type: 'phongtro',
            title: 'Phòng trọ cao cấp gần trường Đại học Khoa học Huế, khoảng cách chỉ 100m, view đẹp, an ninh 24/7, phù hợp cho sinh viên và người đi làm',
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
            id: 'BĐ210',
            type: 'phongtro',
            title: 'Phòng trọ cho sinh viên giá rẻ, chỉ cho nữ thuê, không chung chủ, gần trường Đại học Y Dược Huế, an toàn tuyệt đối',
            poster: 'Trần Thị B',
            submissionDate: '18/7/2025',
            address: '39/104 Phan Chu Trinh, Thành phố Huế',
            price: '1.000.000 VND/ Tháng',
            phone: '0982974652',
            content: 'Dành riêng cho nữ sinh viên, đảm bảo an ninh tuyệt đối, không ngập lụt, có camera an ninh, cửa khóa vân tay, wifi miễn phí, nước nóng, điều hòa, tủ lạnh mini. Gần trường Đại học Y Dược Huế, chợ Đông Ba, bến xe. Môi trường sống văn minh, sạch sẽ. Giá cả hợp lý, phù hợp với sinh viên.',
            images: ['phong5.jpg', 'phong6.jpg', 'phong7.jpg', 'phong8.jpg'],
            status: 'approved'
        },
        // Tìm người ở ghép (Roommate-seeking posts)
        {
            id: 'BĐ211',
            type: 'oghep',
            title: 'Tìm người ở ghép tại trọ cao cấp, gần trường Đại học Sư phạm Huế, phòng rộng rãi, đầy đủ tiện nghi',
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
            id: 'BĐ212',
            type: 'oghep',
            title: 'Tìm bạn nữ ở ghép phòng trọ sinh viên, gần trường Đại học Kinh tế Huế, phòng sạch sẽ, giá rẻ, môi trường thân thiện',
            poster: 'Lê Thị C',
            submissionDate: '19/7/2025',
            address: '25 Lý Thường Kiệt, Thành phố Huế',
            price: '800.000 VND/ Tháng',
            phone: '0912345678',
            content: 'Tìm bạn nữ ở ghép, phòng sạch sẽ, gần trường Đại học Kinh tế Huế, chợ An Cựu, bến xe. Có wifi, điều hòa, tủ lạnh, bếp nấu ăn chung. Môi trường sống văn minh, thân thiện, phù hợp cho sinh viên. Giá cả hợp lý, bao gồm điện nước. Liên hệ ngay để xem phòng và gặp mặt!',
            images: ['phong13.jpg', 'phong14.jpg', 'phong15.jpg', 'phong16.jpg'],
            status: 'locked'
        },
        {
            id: 'BĐ213',
            type: 'phongtro',
            title: 'Cho thuê phòng trọ cao cấp, view sông Hương, gần trung tâm thành phố Huế, đầy đủ tiện nghi hiện đại, an ninh 24/7',
            poster: 'Phạm Văn D',
            submissionDate: '20/7/2025',
            address: '78 Trần Phú, Thành phố Huế',
            price: '2.500.000 VND/ Tháng',
            phone: '0987654321',
            content: 'Phòng cao cấp, đầy đủ tiện nghi hiện đại, an ninh 24/7, có camera an ninh, cửa khóa vân tay, wifi tốc độ cao, điều hòa inverter, tủ lạnh, máy giặt, bếp nấu ăn riêng biệt. View sông Hương đẹp, gần trung tâm thành phố, chợ Đông Ba, cầu Tràng Tiền. Phù hợp cho người đi làm, gia đình nhỏ. Liên hệ ngay để xem phòng!',
            images: ['phong17.jpg', 'phong18.jpg', 'phong19.jpg', 'phong20.jpg'],
            status: 'approved'
        },
        {
            id: 'BĐ214',
            type: 'phongtro',
            title: 'Phòng trọ bị từ chối - test chức năng duyệt lại',
            poster: 'Nguyễn Văn Test',
            submissionDate: '21/7/2025',
            address: '123 Test Street, Thành phố Huế',
            price: '1.800.000 VND/ Tháng',
            phone: '0123456789',
            content: 'Đây là bài đăng test để kiểm tra chức năng duyệt lại sau khi bị từ chối. Phòng trọ có đầy đủ tiện nghi cơ bản.',
            images: ['phong1.jpg', 'phong2.webp', 'phong3.jpeg', 'phong4.jpg'],
            status: 'rejected'
        }
    ]);

    const handleApprove = (postId) => {
        console.log('Approve post:', postId);
        // Update post status to approved
        setAllPosts(prevPosts => 
            prevPosts.map(post => 
                post.id === postId 
                    ? { ...post, status: 'approved' }
                    : post
            )
        );
    };

    const handleReject = (postId) => {
        console.log('Reject post:', postId);
        // Update post status to rejected
        setAllPosts(prevPosts => 
            prevPosts.map(post => 
                post.id === postId 
                    ? { ...post, status: 'rejected' }
                    : post
            )
        );
    };

    const handleDelete = (postId) => {
        console.log('Delete post:', postId);
        // Remove post from list
        setAllPosts(prevPosts => 
            prevPosts.filter(post => post.id !== postId)
        );
    };

    const handleLock = (postId) => {
        console.log('Lock post:', postId);
        // Update post status to locked
        setAllPosts(prevPosts => 
            prevPosts.map(post => 
                post.id === postId 
                    ? { ...post, status: 'locked' }
                    : post
            )
        );
    };

    const handleViewDetails = (postId) => {
        console.log('View details for post:', postId);
        // Navigate to detail page
        window.location.href = '/admin/chi-tiet-bai-dang';
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
    const filteredPosts = allPosts.filter(post => {
        const typeMatch = selectedType === 'all' || post.type === selectedType;
        const statusMatch = selectedStatus === 'all' || post.status === selectedStatus;
        return typeMatch && statusMatch;
    });

    return (
        <div className="admin-layout">
            <AdHeader />
            <div className="admin-content">
                <AdSidebar />
                <main className="admin-main">
                    <div className="quan-ly-bai-dang-container">
                        

                        {/* Filter Options */}
                        <div className="filter-section">
                                                         <div className="filter-buttons">
                                 {/* <button
                                     className={`filter-btn ${selectedStatus === 'all' ? 'active' : ''}`}
                                     onClick={() => setSelectedStatus('all')}
                                 >
                                     Tất cả
                                 </button> */}
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
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdBaiDang;
