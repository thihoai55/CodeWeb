import React, { useState } from 'react';
import AdHeader from './ad_header';
import AdSidebar from './ad_sidebar';
import './Admin.css';

const AdChiTietBaiDang = () => {
    // Mock data for detailed post view
    const postDetail = {
        id: '123456',
        title: 'Phòng trọ mới, đầy đủ tiện nghi, có máy lạnh, ban công',
        address: 'Kiệt 131, Trần Phú, Phường Phước Vĩnh, Thành Phố Huế',
        price: '1 Triệu/tháng',
        area: '20 m²',
        submissionDate: '07/08/2025',
        description: 'Cho thuê phòng trọ khép kín mới xây tại 10/9,Kiệt 131, Trần Phú, TP Huế. Phòng rộng rãi, thoáng mát, có điều hoà, máy nước nóng và ban công riêng. Khu vực yên tĩnh, an ninh tốt, gần chợ, trường đại học và các tiện ích xung quanh. Giờ giấc tự do, có chỗ để xe. Phù hợp với sinh viên hoặc người đi làm.',
        images: ['phong1.jpg', 'phong2.webp', 'phong3.jpeg', 'phong4.jpg'],
        poster: {
            name: 'Người cho thuê',
            listings: '2 tin đăng',
            phone: '0978772943',
            avatar: '/anh/avt.jpg'
        }
    };

    const [selectedImage, setSelectedImage] = useState(0);
    const [showAllImages, setShowAllImages] = useState(false);

    const handleImageClick = (index) => {
        setSelectedImage(index);
    };

    // Google Maps từ địa chỉ
    const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(postDetail.address)}&output=embed`;
    const mapExternalUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(postDetail.address)}`;

    return (
        <div className="admin-layout">
            <AdHeader />
            <div className="admin-content">
                <AdSidebar />
                <main className="admin-main">
                    <div className="chi-tiet-bai-dang-container">
                        <div style={{ display: 'flex', gap: '24px' }}>
                            <div style={{ flex: 1 }}>
                                {/* Post Detail Card */}
                                <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                                    <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px', color: '#52b4f9' }}>
                                        {postDetail.title}
                                    </h1>
                                    
                                    <div style={{ marginBottom: '8px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span>📍</span>
                                            <span style={{ fontWeight: '600', color: '#000' }}>{postDetail.address}</span>
                                        </div>
                                    </div>
                                    
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span>💰</span>
                                            <span style={{ fontWeight: '600', color: '#000' }}>{postDetail.price}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span>📏</span>
                                            <span style={{ fontWeight: '600', color: '#000' }}>{postDetail.area}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span>#</span>
                                            <span>{postDetail.id}</span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                            <span>📅</span>
                                            <span>{postDetail.submissionDate}</span>
                                        </div>
                                    </div>

                                    {/* Image Gallery */}
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

                                    {/* Description Section */}
                                    <div style={{ marginBottom: '24px' }}>
                                        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
                                            Mô tả
                                        </h3>
                                        <div style={{ lineHeight: '1.6', color: '#333', whiteSpace: 'pre-line' }}>
                                            {postDetail.description}
                                        </div>
                                    </div>

                                    {/* Location & Map Section */}
                                    <div style={{ marginBottom: '24px' }}>
                                        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
                                            Vị trí & Bản đồ
                                        </h3>
                                        <div style={{ height: '300px', borderRadius: '8px', overflow: 'hidden', position: 'relative', background: '#f0f0f0' }}>
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
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px',
                                                padding: '12px',
                                                background: '#28a745',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                fontSize: '14px',
                                                fontWeight: '500'
                                            }}
                                        >
                                            📞 {postDetail.poster.phone}
                                        </button>
                                        
                                        <button
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px',
                                                padding: '12px',
                                                background: '#ffc107',
                                                color: '#212529',
                                                border: 'none',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                fontSize: '14px',
                                                fontWeight: '500'
                                            }}
                                        >
                                            📅 Đặt lịch hẹn xem phòng
                                        </button>
                                        
                                        <button
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '8px',
                                                padding: '12px',
                                                background: '#17a2b8',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                fontSize: '14px',
                                                fontWeight: '500'
                                            }}
                                        >
                                            🏠 Gửi yêu cầu thuê
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
