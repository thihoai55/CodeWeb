import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../TrangChuDaDangNhap/Header';
import Footer from '../TrangChuDaDangNhap/Footer';

function XemBaiDang() {
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy ID bài đăng từ URL
  
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

  // State cho các tính năng tương tác
  const [selectedImage, setSelectedImage] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showReviews, setShowReviews] = useState(false);

  // State cho đánh giá
  const [reviews, setReviews] = useState(postData.reviews);
  const newReviewName = 'Ngô Thị Thanh Nhàn';
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [newReviewComment, setNewReviewComment] = useState('');
  
  // Đồng bộ chiều cao thanh bên tới ngang "Trọ cùng khu vực"
  const postDetailRef = useRef(null);
  const ownerCardRef = useRef(null);
  const [featuredContainerHeight, setFeaturedContainerHeight] = useState(null);
  const [sidebarItemCount, setSidebarItemCount] = useState(18);
  useEffect(() => {
    const computeHeights = () => {
      const postH = postDetailRef.current ? postDetailRef.current.offsetHeight : 0;
      const ownerH = ownerCardRef.current ? ownerCardRef.current.offsetHeight : 0;
      const gapBetweenCards = 20; // khoảng cách giữa hai thẻ ở sidebar
      if (postH > 0) {
        const available = Math.max(200, postH - ownerH - gapBetweenCards);
        setFeaturedContainerHeight(available);
        const approxItemHeight = 84; // ước lượng chiều cao mỗi mục (px)
        const desiredCount = Math.ceil(available / approxItemHeight) + 1;
        setSidebarItemCount(Math.max(12, desiredCount));
      }
    };
    computeHeights();
    window.addEventListener('resize', computeHeights);
    return () => window.removeEventListener('resize', computeHeights);
  }, []);
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

  // Tạo danh sách bài viết nổi bật từ mục ảnh
  const featuredFromImages = postData.images.map((img, index) => ({
    id: index + 1,
    title: `Bài viết nổi bật ${index + 1}`,
    price: postData.price,
    image: img,
    time: `${index + 1} giờ trước`
  }));
  // Kéo dài danh sách bên thanh phải để gần bằng chiều cao nội dung bài đăng
  const baseFeatured = [...featuredPosts, ...featuredFromImages];
  const sidebarFeatured = Array.from({ length: sidebarItemCount }, (_, i) => ({
    ...baseFeatured[i % baseFeatured.length],
    uid: `sf-${i}`
  }));

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

  const renderInteractiveStars = () => {
    return [...Array(5)].map((_, index) => {
      const starIndex = index + 1;
      const isActive = starIndex <= (hoverRating || newReviewRating);
      return (
        <span
          key={index}
          style={{ cursor: 'pointer', color: isActive ? '#FFD700' : '#ddd' }}
          onMouseEnter={() => setHoverRating(starIndex)}
          onMouseLeave={() => setHoverRating(0)}
          onClick={() => setNewReviewRating(starIndex)}
        >
          ★
        </span>
      );
    });
  };

  const handleSubmitReview = () => {
    if (!newReviewComment.trim() || newReviewRating === 0) {
      alert('Vui lòng chấm sao và nhập nội dung đánh giá.');
      return;
    }
    const newReview = {
      id: Date.now(),
      user: newReviewName,
      rating: newReviewRating,
      comment: newReviewComment.trim(),
      date: new Date().toLocaleDateString('vi-VN')
    };
    setReviews([newReview, ...reviews]);
    setNewReviewRating(0);
    setNewReviewComment('');
    setShowReviews(true);
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
              <div ref={postDetailRef} style={{ 
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
                  color: '#52b4f9'
                }}>
                  {postData.title}
                </h1>
                
                {/* Address on its own line */}
                <div style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>📍</span>
                    <span style={{ fontWeight: '600', color: '#000' }}>{postData.address}</span>
                  </div>
                </div>
                {/* Other info on the next line */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>💰</span>
                    <span style={{ fontWeight: '600', color: '#000' }}>{postData.price}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>📏</span>
                    <span style={{ fontWeight: '600', color: '#000' }}>{postData.area}</span>
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
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                    {/* Left: Main image */}
                    <div>
                      <img
                        src={postData.images[selectedImage]}
                        alt="Main"
                        style={{
                          width: '100%',
                          height: '400px',
                          objectFit: 'cover',
                          borderRadius: '16px'
                        }}
                      />
                    </div>

                    {/* Right: 2x2 thumbnails grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '12px' }}>
                      {[1, 2, 3].map((i) => {
                        const imgSrc = postData.images[i];
                        if (!imgSrc) return <div key={i} style={{ borderRadius: '12px', background: '#f3f4f6' }} />;
                        return (
                          <img
                            key={i}
                            src={imgSrc}
                            alt={`Thumbnail ${i}`}
                            onClick={() => setSelectedImage(i)}
                            style={{
                              width: '100%',
                              height: '194px',
                              objectFit: 'cover',
                              borderRadius: '12px',
                              cursor: 'pointer',
                              border: selectedImage === i ? '2px solid #1976d2' : '1px solid #eee'
                            }}
                          />
                        );
                      })}

                      {/* Bottom-right: overlay tile "Xem thêm" */}
                      <div
                        onClick={() => setShowAllImages(true)}
                        style={{
                          position: 'relative',
                          width: '100%',
                          height: '194px',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                          border: '1px solid #eee',
                          background: postData.images[4] ? `url(${postData.images[4]}) center/cover no-repeat` : '#f3f4f6'
                        }}
                      >
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'rgba(0,0,0,0.35)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          fontWeight: 700,
                          fontSize: '18px'
                        }}>
                          Xem thêm
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* All images modal */}
                {showAllImages && (
                  <div
                    onClick={(e) => { if (e.target === e.currentTarget) setShowAllImages(false); }}
                    style={{
                      position: 'fixed',
                      inset: 0,
                      background: 'rgba(0,0,0,0.6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: 1000
                    }}
                  >
                    <div style={{ background: '#fff', borderRadius: '12px', maxWidth: '1000px', width: '92%', maxHeight: '85vh', overflow: 'auto', padding: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                        <div style={{ fontWeight: 700 }}>Tất cả hình ảnh</div>
                        <button onClick={() => setShowAllImages(false)} style={{ background: 'none', border: 'none', fontSize: '16px', cursor: 'pointer' }}>Đóng ✕</button>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '12px' }}>
                        {postData.images.map((img, idx) => (
                          <img
                            key={idx}
                            src={img}
                            alt={`Hình ${idx + 1}`}
                            onClick={() => { setSelectedImage(idx); setShowAllImages(false); }}
                            style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', cursor: 'pointer' }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}

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
                    <span style={{ color: '#666' }}>({reviews.length} đánh giá)</span>
                  </div>

                  {/* Write review box */}
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <img src={postData.owner.avatar} alt="Avatar" style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, marginBottom: 6 }}>{newReviewName}</div>
                      <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
                        {renderInteractiveStars()}
                      </div>
                      <div style={{ position: 'relative', background: '#eee', borderRadius: 12, paddingRight: 140 }}>
                        <input
                          value={newReviewComment}
                          onChange={(e) => setNewReviewComment(e.target.value)}
                          placeholder="Đánh giá bài viết..."
                          style={{
                            width: '100%',
                            border: 'none',
                            outline: 'none',
                            background: 'transparent',
                            padding: '12px 16px',
                            fontSize: 14
                          }}
                        />
                        <div style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: 14 }}>
                          <span role="img" aria-label="emoji" style={{ cursor: 'pointer' }}>😊</span>
                          <span role="img" aria-label="video" style={{ cursor: 'pointer' }}>🎥</span>
                          <span role="img" aria-label="photo" style={{ cursor: 'pointer' }}>📷</span>
                          <button onClick={handleSubmitReview} style={{ border: 'none', background: 'black', color: 'white', borderRadius: 9999, padding: '6px 10px', cursor: 'pointer' }}>➤</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {showReviews && (
                    <div style={{ marginTop: '8px' }}>
                      {reviews.map(review => (
                        <div key={review.id} style={{
                          borderBottom: '1px solid #eee',
                          padding: '16px 0',
                          marginBottom: '8px'
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
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
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
                        style={{ width: '100%', height: '180px', objectFit: 'cover' }}
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

              {/* Bài viết nổi bật từ ảnh */}
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                padding: '24px',
                marginBottom: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                  Bài viết mới
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                  {featuredFromImages.map(item => (
                    <div key={item.id} style={{ 
                      border: '1px solid #eee',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      cursor: 'pointer'
                    }}>
                      <img 
                        src={item.image} 
                        alt={item.title}
                        style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                      />
                      <div style={{ padding: '12px' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                          {item.title}
                        </h4>
                        <div style={{ color: '#e53935', fontWeight: '600', marginBottom: '4px' }}>
                          {item.price}
                        </div>
                        <div style={{ fontSize: '12px', color: '#666' }}>
                          {item.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div style={{ width: '320px', position: 'sticky', top: '20px', alignSelf: 'flex-start' }}>
              {/* Owner Info - redesigned */}
              <div ref={ownerCardRef} style={{
                background: '#fff',
                borderRadius: '12px',
                padding: '20px',
                marginBottom: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <img
                    src={postData.owner.avatar}
                    alt="Avatar"
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '1px solid #eee',
                      marginBottom: '12px'
                    }}
                  />
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>Người cho thuê</div>
                  <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '12px' }}>
                    {postData.owner.totalPosts} tin đăng
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button
                    onClick={() => handleContact('appointment')}
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
                      gap: '8px'
                    }}
                  >
                    <span>✉️</span>
                    <span>Đặt lịch hẹn xem phòng</span>
                  </button>

                  <button
                    onClick={() => handleContact('phone')}
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
                      gap: '8px'
                    }}
                  >
                    <span>📞</span>
                    <span>{postData.owner.phone}</span>
                  </button>

                  <button
                    onClick={() => handleContact('rent')}
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
                      gap: '8px'
                    }}
                  >
                    <span>🔒</span>
                    <span>Gửi yêu cầu thuê</span>
                  </button>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '12px',
                  paddingTop: '8px',
                  borderTop: '1px solid #f3f4f6',
                  fontSize: '13px',
                  color: '#6b7280'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }} onClick={() => alert('Đã lưu bài!')}>
                    <span>♡</span>
                    <span>Lưu bài</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }} onClick={() => alert('Đã sao chép liên kết!')}>
                    <span>🔗</span>
                    <span>Chia sẻ</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }} onClick={() => alert('Cảm ơn bạn đã báo cáo!')}>
                    <span>⚠️</span>
                    <span>Báo cáo</span>
                  </div>
                </div>
              </div>

              {/* Featured Posts */}
              <div style={{ 
                background: '#fff', 
                borderRadius: '12px', 
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                maxHeight: featuredContainerHeight ? `${featuredContainerHeight}px` : undefined,
                overflowY: 'auto'
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                  Tin nổi bật
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {sidebarFeatured.map(post => (
                    <div key={post.uid || post.id} style={{ 
                      display: 'flex', 
                      gap: '12px',
                      cursor: 'pointer',
                      padding: '8px',
                      borderRadius: '8px',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f5f5')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
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
