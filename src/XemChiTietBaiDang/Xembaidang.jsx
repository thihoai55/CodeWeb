import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../TrangChuDaDangNhap/Header';
import Footer from '../TrangChuDaDangNhap/Footer';

function XemBaiDang() {
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy ID bài đăng từ URL
  
  // State cho các tính năng tương tác
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  // Dữ liệu mẫu cho bài đăng
  const postData = {
    id: "123456",
    title: "Phòng trọ mới, đầy đủ tiện nghi, có máy lạnh, ban công",
    address: "Kiệt 131, Trần Phú, Phường Phước Vĩnh, Thành Phố Huế",
    price: "1 Triệu/tháng",
    area: "20 m²",
    postedDate: "07/08/2025",
    category: "Phòng trọ",
    images: [
      "https://th.bing.com/th/id/OIP.8XnAKLQnuXCfnp-s2PdTDQHaFj?w=261&h=196&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
      "https://bandon.vn/uploads/posts/thiet-ke-nha-tro-dep-2020-bandon-0.jpg",
      "https://s-housing.vn/wp-content/uploads/2022/09/thiet-ke-phong-tro-dep-54.jpg",
      "https://bandon.vn/uploads/thiet-ke-nha-tro-dep-2020-bandon-11.jpg",
      "https://bandon.vn/uploads/thiet-ke-nha-tro-dep-2020-bandon-28.jpg"
    ],
    description: `Phòng trọ mới xây, sạch sẽ, thoáng mát với đầy đủ tiện nghi hiện đại. Phòng có điều hòa, nóng lạnh, ban công riêng với view đẹp. Khu vực an ninh tốt, có camera 24/7, cổng khóa vân tay.

Vị trí thuận lợi:
- Gần chợ Đông Ba (5 phút đi bộ)
- Gần trường Đại học Khoa học Huế (10 phút đi bộ)
- Gần trung tâm thành phố (15 phút đi bộ)
- Có xe buýt đi qua cửa

Tiện ích:
- Điều hòa inverter tiết kiệm điện
- Nóng lạnh 24/7
- Ban công riêng, view đẹp
- Tủ quần áo rộng rãi
- Bàn học, kệ sách
- Nhà vệ sinh khép kín
- Bếp nấu ăn riêng
- Wifi tốc độ cao

Phù hợp cho sinh viên hoặc người đi làm. Giá thuê bao gồm điện, nước, wifi.`,
    owner: {
      name: "Nguyễn Văn A",
      phone: "0978772943",
      avatar: "/anh/avt.jpg",
      totalPosts: 2
    },
    rating: {
      average: 4.9,
      total: 38,
      breakdown: {
        5: 20,
        4: 10,
        3: 5,
        2: 2,
        1: 1
      }
    },
    reviews: [
      {
        id: 1,
        user: "Nguyễn Thị Hoài",
        rating: 5,
        comment: "Phòng trọ đẹp, giá rẻ, chủ trọ thân thiện, nằm ở trung tâm thành phố và gần trường, cho thuê nhanh.",
        date: "15/12/2024"
      },
      {
        id: 2,
        user: "Trần Văn Bình",
        rating: 5,
        comment: "Phòng sạch sẽ, tiện nghi đầy đủ, chủ trọ dễ thương, giá cả hợp lý.",
        date: "10/12/2024"
      }
    ],
    location: {
      lat: 16.4637,
      lng: 107.5909,
      address: "Kiệt 131, Trần Phú, Phường Phước Vĩnh, Thành Phố Huế"
    }
  };

  // Dữ liệu tin nổi bật
  const featuredPosts = [
    {
      id: 1,
      title: "Cho thuê phòng trọ ngay ĐH Khoa Học",
      price: "2 Triệu/tháng",
      image: "https://bandon.vn/uploads/posts/thiet-ke-nha-tro-dep-2020-bandon-0.jpg",
      time: "1 ngày trước"
    },
    {
      id: 2,
      title: "Phòng trọ gần chợ Đông Ba",
      price: "1.5 Triệu/tháng",
      image: "https://s-housing.vn/wp-content/uploads/2022/09/thiet-ke-phong-tro-dep-54.jpg",
      time: "2 ngày trước"
    },
    {
      id: 3,
      title: "Nhà trọ cho sinh viên",
      price: "1.8 Triệu/tháng",
      image: "https://bandon.vn/uploads/thiet-ke-nha-tro-dep-2020-bandon-11.jpg",
      time: "3 ngày trước"
    }
  ];

  // Dữ liệu trọ cùng khu vực
  const nearbyPosts = [
    {
      id: 1,
      title: "Phòng trọ mới xây sạch sẽ, gần trung tâm thành phố",
      price: "1.2 Triệu/tháng",
      address: "Trần Phú, Thành phố Huế",
      image: "https://th.bing.com/th/id/OIP.8XnAKLQnuXCfnp-s2PdTDQHaFj?w=261&h=196&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
    },
    {
      id: 2,
      title: "Phòng trọ cho nữ thuê không gian được trang trí đẹp mắt",
      price: "2.5 Triệu/tháng",
      address: "Nguyễn Huệ, Tp Huế",
      image: "https://bandon.vn/uploads/posts/thiet-ke-nha-tro-dep-2020-bandon-0.jpg"
    },
    {
      id: 3,
      title: "Phòng trọ có gác lửng, kệ bếp, phòng vệ sinh khép kín",
      price: "2.5 Triệu/tháng",
      address: "29/3, Đà Nẵng",
      image: "https://s-housing.vn/wp-content/uploads/2022/09/thiet-ke-phong-tro-dep-54.jpg"
    },
    {
      id: 4,
      title: "Tìm người ở ghép gần trung tâm thành phố",
      price: "5.5 Triệu/tháng",
      address: "TP Vinh, Nghệ An",
      image: "https://bandon.vn/uploads/thiet-ke-nha-tro-dep-2020-bandon-11.jpg"
    }
  ];

  const handleContact = (type) => {
    switch(type) {
      case 'phone':
        window.open(`tel:${postData.owner.phone}`);
        break;
      case 'appointment':
        alert('Chức năng đặt lịch hẹn sẽ được tích hợp sau!');
        break;
      case 'rent':
        alert('Chức năng gửi yêu cầu thuê sẽ được tích hợp sau!');
        break;
      default:
        break;
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} style={{ color: index < rating ? '#FFD700' : '#ddd' }}>
        ★
      </span>
    ));
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Header />
      
      <main style={{ padding: '20px 0' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          {/* Breadcrumbs */}
          <div style={{ 
            marginBottom: '20px',
            fontSize: '14px',
            color: '#666'
          }}>
            <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Trang chủ</span>
            {' > '}
            <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>{postData.category}</span>
            {' > '}
            <span style={{ cursor: 'pointer' }}>Phước Vĩnh</span>
            {' > '}
            <span>Thành phố Huế</span>
          </div>

          <div style={{ display: 'flex', gap: '24px' }}>
            {/* Main Content */}
            <div style={{ flex: 1 }}>
              {/* Post Header */}
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                padding: '24px',
                marginBottom: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <h1 style={{ 
                  fontSize: '24px', 
                  fontWeight: '700', 
                  marginBottom: '16px',
                  color: '#333'
                }}>
                  {postData.title}
                </h1>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>📍</span>
                    <span>{postData.address}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>💰</span>
                    <span style={{ fontWeight: '600', color: '#e53935' }}>{postData.price}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>📏</span>
                    <span>{postData.area}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>#</span>
                    <span>{postData.id}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>📅</span>
                    <span>{postData.postedDate}</span>
                  </div>
                </div>

                {/* Image Gallery */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <div style={{ flex: 1 }}>
                      <img 
                        src={postData.images[selectedImage]} 
                        alt="Main"
                        style={{ 
                          width: '100%', 
                          height: '400px', 
                          objectFit: 'cover',
                          borderRadius: '8px'
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {postData.images.slice(0, 3).map((img, index) => (
                        <img 
                          key={index}
                          src={img} 
                          alt={`Thumbnail ${index + 1}`}
                          style={{ 
                            width: '120px', 
                            height: '120px', 
                            objectFit: 'cover',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            border: selectedImage === index ? '2px solid #1976d2' : '1px solid #ddd'
                          }}
                          onClick={() => setSelectedImage(index)}
                        />
                      ))}
                      {postData.images.length > 4 && (
                        <div 
                          style={{ 
                            width: '120px', 
                            height: '120px', 
                            background: '#f0f0f0',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: '600'
                          }}
                          onClick={() => setShowAllImages(true)}
                        >
                          Xem thêm
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
                    Mô tả
                  </h3>
                  <div style={{ 
                    lineHeight: '1.6', 
                    color: '#333',
                    whiteSpace: 'pre-line'
                  }}>
                    {postData.description}
                  </div>
                </div>

                {/* Location & Map */}
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
                    Vị trí & Bản đồ
                  </h3>
                  <div style={{ 
                    height: '300px', 
                    background: '#f0f0f0',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative'
                  }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '48px', marginBottom: '16px' }}>🗺️</div>
                      <div style={{ fontSize: '16px', marginBottom: '12px' }}>
                        {postData.location.address}
                      </div>
                      <button 
                        onClick={() => setShowMap(true)}
                        style={{
                          padding: '8px 16px',
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

                {/* Reviews */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600' }}>
                      Đánh giá
                    </h3>
                    <button 
                      onClick={() => setShowReviews(!showReviews)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#1976d2',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      {showReviews ? 'Ẩn đánh giá' : 'Xem tất cả'}
                    </button>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '24px', fontWeight: '700' }}>{postData.rating.average}</span>
                      <span>trên 5</span>
                    </div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {renderStars(Math.floor(postData.rating.average))}
                    </div>
                    <span style={{ color: '#666' }}>({postData.rating.total} đánh giá)</span>
                  </div>

                  {showReviews && (
                    <div style={{ marginTop: '16px' }}>
                      {postData.reviews.map(review => (
                        <div key={review.id} style={{ 
                          borderBottom: '1px solid #eee', 
                          padding: '16px 0',
                          marginBottom: '16px'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontWeight: '600' }}>{review.user}</span>
                            <div style={{ display: 'flex', gap: '4px' }}>
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          <div style={{ color: '#666', marginBottom: '8px' }}>
                            {review.comment}
                          </div>
                          <div style={{ fontSize: '12px', color: '#999' }}>
                            {review.date}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Nearby Posts */}
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                padding: '24px',
                marginBottom: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                  Trọ cùng khu vực
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                  {nearbyPosts.map(post => (
                    <div key={post.id} style={{ 
                      border: '1px solid #eee',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      cursor: 'pointer'
                    }}>
                      <img 
                        src={post.image} 
                        alt={post.title}
                        style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                      />
                      <div style={{ padding: '12px' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                          {post.title}
                        </h4>
                        <div style={{ color: '#e53935', fontWeight: '600', marginBottom: '4px' }}>
                          {post.price}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          {post.address}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div style={{ width: '320px' }}>
              {/* Owner Info */}
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                padding: '20px',
                marginBottom: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                  Người cho thuê
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <img 
                    src={postData.owner.avatar} 
                    alt="Avatar"
                    style={{ 
                      width: '48px', 
                      height: '48px', 
                      borderRadius: '50%',
                      objectFit: 'cover'
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: '600' }}>{postData.owner.name}</div>
                    <div style={{ fontSize: '14px', color: '#666' }}>
                      {postData.owner.totalPosts} tin đăng
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button 
                    onClick={() => handleContact('appointment')}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#1976d2',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}
                  >
                    Đặt lịch hẹn xem phòng
                  </button>
                  <button 
                    onClick={() => handleContact('phone')}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#4caf50',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}
                  >
                    {postData.owner.phone}
                  </button>
                  <button 
                    onClick={() => handleContact('rent')}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: '#ff9800',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}
                  >
                    Gửi yêu cầu thuê
                  </button>
                </div>
              </div>

              {/* Featured Posts */}
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                  Tin nổi bật
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {featuredPosts.map(post => (
                    <div key={post.id} style={{ 
                      display: 'flex', 
                      gap: '12px',
                      cursor: 'pointer',
                      padding: '8px',
                      borderRadius: '8px',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#f5f5f5'}
                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                    >
                      <img 
                        src={post.image} 
                        alt={post.title}
                        style={{ 
                          width: '60px', 
                          height: '60px', 
                          objectFit: 'cover',
                          borderRadius: '6px'
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                          {post.title}
                        </div>
                        <div style={{ color: '#e53935', fontWeight: '600', fontSize: '12px', marginBottom: '2px' }}>
                          {post.price}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          {post.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default XemBaiDang;
