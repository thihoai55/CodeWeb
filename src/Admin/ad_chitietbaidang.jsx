import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdHeader from './ad_header';
import AdSidebar from './ad_sidebar';
import './Admin.css';

const AdChiTietBaiDang = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [postDetail, setPostDetail] = useState(null);
    const [loading, setLoading] = useState(true);

    const allPosts = [
        {
            id: 'ND209',
            type: 'phongtro',
            title: 'Phòng trọ cao cấp gần trường Đại học Khoa học Huế, khoảng cách chỉ 100m, view đẹp, an ninh 24/7, phù hợp cho sinh viên và người đi làm',
            poster: 'Nguyễn Văn A',
            submissionDate: '16/7/2025',
            address: '109 Nguyễn Huệ, Thành phố Huế',
            price: '1.500.000 VND/ Tháng',
            phone: '0921453673',
            content: 'Phòng sạch sẽ, riêng biệt, giờ giấc tự do, có nhà xe rộng rãi, không ngập lụt, có camera an ninh 24/7, wifi tốc độ cao, điều hòa mới, tủ lạnh, bếp nấu ăn riêng biệt. Gần chợ, siêu thị, bệnh viện, trường học. Phù hợp cho sinh viên và người đi làm. Liên hệ ngay để xem phòng!',
            images: ['phong1.jpg', 'phong2.webp', 'phong3.jpeg', 'phong4.jpg'],
            status: 'pending'
        },
        {
            id: 'ND210',
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
        {
            id: 'ND211',
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
            id: 'ND212',
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
            id: 'ND213',
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
            status: 'rejected'
        }
    ];

    useEffect(() => {
        console.log('Đang tìm bài đăng với ID:', postId);
        console.log('Loại dữ liệu của postId:', typeof postId);
        console.log('Danh sách bài đăng có sẵn:', allPosts.map(p => p.id));
        console.log('Loại dữ liệu của các ID:', allPosts.map(p => ({ id: p.id, type: typeof p.id })));
        // Tìm bài viết theo ID
        const foundPost = allPosts.find(post => {
            console.log('So sánh:', post.id, '===', postId, 'Kết quả:', post.id === postId);
            return post.id === postId;
        });
        if (foundPost) {
            // Chuyển đổi dữ liệu để phù hợp với định dạng
            const transformedPost = {
                id: foundPost.id,
                title: foundPost.title,
                address: foundPost.address,
                price: foundPost.price,
                area: '20 m²', // Default area
                submissionDate: foundPost.submissionDate,
                description: foundPost.content,
                images: foundPost.images,
                poster: {
                    name: foundPost.poster,
                    listings: '2 tin đăng',
                    phone: foundPost.phone,
                    avatar: '/anh/avt.jpg'
                },
                type: foundPost.type,
                status: foundPost.status
            };
            setPostDetail(transformedPost);
        } else {
            // Bài viết không tìm thấy, chuyển hướng về danh sách bài viết
            console.log('Không tìm thấy bài đăng với ID:', postId);
            console.log('Sẽ navigate về:', '/admin/quan-ly-bai-dang');
            // Thay vì navigate ngay lập tức, hãy đợi một chút để xem debug
            setTimeout(() => {
                navigate('/admin/quan-ly-bai-dang');
            }, 3000);
        }
        setLoading(false);
    }, [postId, navigate]);

    const [selectedImage, setSelectedImage] = useState(0);
    const [showAllImages, setShowAllImages] = useState(false);

    const handleImageClick = (index) => {
        setSelectedImage(index);
    };

    if (loading) {
        return (
            <div className="admin-layout">
                <AdHeader />
                <div className="admin-content">
                    <AdSidebar />
                    <main className="admin-main">
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                            <div>Đang tải...</div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    if (!postDetail) {
        return (
            <div className="admin-layout">
                <AdHeader />
                <div className="admin-content">
                    <AdSidebar />
                    <main className="admin-main">
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                            <div>Không tìm thấy bài đăng</div>
                        </div>
                    </main>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-layout">
            <AdHeader />
            <div className="admin-content">
                <AdSidebar />
                <main className="admin-main">
                    <div className="chi-tiet-bai-dang-container">
                        {/* Back Button */}
                        <div style={{ marginBottom: '20px' }}>
                            <button
                                onClick={() => navigate('/admin/quan-ly-bai-dang')}
                                style={{
                                    padding: '8px 16px',
                                    background: '#f3f4f6',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                Quay lại
                            </button>
                        </div>

                        <div style={{ display: 'flex', gap: '24px' }}>
                            <div style={{ flex: 1 }}>
                                {/* Thẻ thông tin bài đăng*/}
                                <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>

                                    <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px', color: '#52b4f9' }}>
                                        {postDetail.title}
                                    </h1>
                                    
                                    <div style={{ marginBottom: '8px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ color: '#666' }}>📍</span>
                                            <span style={{ fontWeight: '600', color: '#000' }}>{postDetail.address}</span>
                                        </div>
                                    </div>
                                    
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ color: '#666' }}>💰</span>
                                            <span style={{ fontWeight: '600', color: '#000' }}>{postDetail.price}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ color: '#666' }}>📐</span>
                                            <span style={{ fontWeight: '600', color: '#000' }}>{postDetail.area}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ color: '#666' }}>🆔</span>
                                            <span>{postDetail.id}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ color: '#666' }}>📅</span>
                                            <span>{postDetail.submissionDate}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span style={{ color: '#666' }}>🏠</span>
                                            <span style={{
                                                padding: '2px 8px',
                                                borderRadius: '12px',
                                                fontSize: '11px',
                                                fontWeight: '600',
                                                ...(postDetail.type === 'phongtro' && { background: '#dbeafe', color: '#1e40af' }),
                                                ...(postDetail.type === 'oghep' && { background: '#fef3c7', color: '#92400e' })
                                            }}>
                                                {postDetail.type === 'phongtro' ? 'Phòng trọ' : 'Ở ghép'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Hình ảnh bài đăng*/}
                                    <div style={{ marginBottom: '24px' }}>
                                        <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                                            <div style={{ flex: 1, height: '400px', borderRadius: '8px', overflow: 'hidden' }}>
                                                <img 
                                                    src={`/anh/${postDetail.images[selectedImage]}`}
                                                    alt={`${postDetail.title} - ${selectedImage + 1}`}
                                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    onError={(e) => {
                                                        e.target.src = '/anh/phong1.jpg';
                                                    }}
                                                />
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                                {postDetail.images.slice(0, 3).map((image, index) => (
                                                    <div 
                                                        key={index} 
                                                        style={{ 
                                                            width: '80px', 
                                                            height: '80px', 
                                                            borderRadius: '6px', 
                                                            overflow: 'hidden',
                                                            cursor: 'pointer',
                                                            border: selectedImage === index ? '2px solid #52b4f9' : '2px solid transparent'
                                                        }}
                                                        onClick={() => handleImageClick(index)}
                                                    >
                                                        <img 
                                                            src={`/anh/${image}`}
                                                            alt={`${postDetail.title} - ${index + 1}`}
                                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                            onError={(e) => {
                                                                e.target.src = '/anh/phong1.jpg';
                                                            }}
                                                        />
                                                    </div>
                                                ))}
                                                {postDetail.images.length > 3 && (
                                                    <div 
                                                        style={{ 
                                                            width: '80px', 
                                                            height: '80px', 
                                                            borderRadius: '6px',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                            background: '#f8f9fa',
                                                            color: '#666',
                                                            fontSize: '12px',
                                                            border: '1px dashed #ddd',
                                                            cursor: 'pointer'
                                                        }}
                                                        onClick={() => setShowAllImages(!showAllImages)}
                                                    >
                                                        Xem thêm
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Mô tả bài đăng*/}
                                    <div style={{ marginBottom: '24px' }}>
                                        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
                                            Mô tả
                                        </h3>
                                        <div style={{ lineHeight: '1.6', color: '#333', whiteSpace: 'pre-line' }}>
                                            {postDetail.description}
                                        </div>
                                    </div>

                                    {/* Vị trí & Bản đồ*/}
                                    <div style={{ marginBottom: '24px' }}>
                                        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
                                            Vị trí & Bản đồ
                                        </h3>
                                        <div style={{ height: '300px', borderRadius: '8px', overflow: 'hidden', position: 'relative', background: '#f0f0f0' }}>
                                            {(() => {
                                                // Google Maps từ địa chỉ - chỉ tạo khi postDetail đã có
                                                const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(postDetail.address)}&output=embed`;
                                                const mapExternalUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(postDetail.address)}`;
                                                
                                                return (
                                                    <>
                                                        <iframe
                                                            title="Google Map"
                                                            src={mapEmbedUrl}
                                                            width="100%"
                                                            height="300"
                                                            style={{ border: 0 }}
                                                            loading="lazy"
                                                            referrerPolicy="no-referrer-when-downgrade"
                                                        />
                                                        <button
                                                            onClick={() => window.open(mapExternalUrl, '_blank')}
                                                            style={{ 
                                                                position: 'absolute', 
                                                                right: 12, 
                                                                bottom: 12, 
                                                                padding: '8px 12px', 
                                                                background: '#1976d2', 
                                                                color: '#fff', 
                                                                border: 'none', 
                                                                borderRadius: '6px', 
                                                                cursor: 'pointer', 
                                                                fontSize: '14px' 
                                                            }}
                                                        >
                                                            Xem bản đồ lớn hơn
                                                        </button>
                                                    </>
                                                );
                                            })()}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div style={{ width: '320px', position: 'sticky', top: '20px', alignSelf: 'flex-start' }}>
                                <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                        <img
                                            src={postDetail.poster.avatar}
                                            alt="Avatar"
                                            style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #eee', marginBottom: '12px' }}
                                            onError={(e) => {
                                                e.target.src = '/anh/avt.jpg';
                                            }}
                                        />
                                        <div style={{ fontWeight: 600, marginBottom: 4 }}>{postDetail.poster.name}</div>
                                        <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '12px' }}>
                                            {postDetail.poster.listings}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <button
                                            onClick={() => window.open(`tel:${postDetail.poster.phone}`)}
                                            style={{ 
                                                width: '100%', 
                                                padding: '10px 12px', 
                                                background: '#fff', 
                                                color: '#111827', 
                                                border: '1px solid #e5e7eb',
                                                 borderRadius: '9999px', 
                                                 cursor: 'pointer', 
                                                 fontSize: '14px', 
                                                 fontWeight: 600, 
                                                 display: 'flex', 
                                                 alignItems: 'center', 
                                                 justifyContent: 'center',
                                                  gap: '8px' }}
                                        >
                                             {postDetail.poster.phone}
                                        </button>
                                        
                                        <button
                                            style={{ 
                                                width: '100%', 
                                                padding: '10px 12px', 
                                                background: '#fff', 
                                                color: '#111827', 
                                                border: '1px solid #e5e7eb',
                                                 borderRadius: '9999px', 
                                                 cursor: 'pointer', 
                                                 fontSize: '14px', 
                                                 fontWeight: 600, 
                                                 display: 'flex', 
                                                 alignItems: 'center', 
                                                 justifyContent: 'center',
                                                  gap: '8px' }}
                                        >
                                             Đặt lịch hẹn xem phòng
                                        </button>
                                        
                                        <button
                                            style={{ 
                                                width: '100%', 
                                                padding: '10px 12px', 
                                                background: '#fff', 
                                                color: '#111827', 
                                                border: '1px solid #e5e7eb',
                                                 borderRadius: '9999px', 
                                                 cursor: 'pointer', 
                                                 fontSize: '14px', 
                                                 fontWeight: 600, 
                                                 display: 'flex', 
                                                 alignItems: 'center', 
                                                 justifyContent: 'center',
                                                  gap: '8px' }}
                                        >
                                             Gửi yêu cầu thuê
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdChiTietBaiDang;
