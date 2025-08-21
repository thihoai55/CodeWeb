import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../TrangChuDaDangNhap/Header';
import Footer from '../TrangChuDaDangNhap/Footer';
import Danhgia from './Danhgia';
import LuuBaiViet from './Luubaiviet';
import ChiaSe from './Chiasebai';
import BaoCao from './BaoCao';
import GuiYeuCauThue from './Guiyeucauthue'; 
import DatLichHenXemPhong from './Datlichhenxemphong';
import { normalizedPosts, getPostById } from '../data/selectors';

function XemBaiDang() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const postData = getPostById(id);

  // Google Maps từ địa chỉ
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(postData.map.address)}&output=embed`;
  const mapExternalUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(postData.map.address)}`;

  const [selectedImage, setSelectedImage] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);
  const [rentModalOpen, setRentModalOpen] = useState(false);
  const [appointmentOpen, setAppointmentOpen] = useState(false);

  const postDetailRef = useRef(null);
  const ownerCardRef = useRef(null);
  const [featuredContainerHeight, setFeaturedContainerHeight] = useState(null);
  const [sidebarItemCount, setSidebarItemCount] = useState(18);

  useEffect(() => {
    const computeHeights = () => {
      const postH = postDetailRef.current ? postDetailRef.current.offsetHeight : 0;
      const ownerH = ownerCardRef.current ? ownerCardRef.current.offsetHeight : 0;
      const gapBetweenCards = 20;
      if (postH > 0) {
        const available = Math.max(200, postH - ownerH - gapBetweenCards);
        setFeaturedContainerHeight(available);
        const approxItemHeight = 84;
        const desiredCount = Math.ceil(available / approxItemHeight) + 1;
        setSidebarItemCount(Math.max(12, desiredCount));
      }
    };
    computeHeights();
    window.addEventListener('resize', computeHeights);
    return () => window.removeEventListener('resize', computeHeights);
  }, []);

  const featuredPosts = [
    { id: 1, title: "Cho thuê phòng trọ ngay ĐH Khoa Học", price: "2 Triệu/tháng", image: "https://bandon.vn/uploads/posts/thiet-ke-nha-tro-dep-2020-bandon-0.jpg", time: "1 ngày trước" },
    { id: 2, title: "Phòng trọ gần chợ Đông Ba", price: "1.5 Triệu/tháng", image: "https://s-housing.vn/wp-content/uploads/2022/09/thiet-ke-phong-tro-dep-54.jpg", time: "2 ngày trước" },
    { id: 3, title: "Nhà trọ cho sinh viên", price: "1.8 Triệu/tháng", image: "https://bandon.vn/uploads/thiet-ke-nha-tro-dep-2020-bandon-11.jpg", time: "3 ngày trước" }
  ];

  const nearbyPosts = [
    { id: 1, title: "Phòng trọ mới xây sạch sẽ, gần trung tâm thành phố", price: "1.2 Triệu/tháng", address: "Trần Phú, Thành phố Huế", image: "https://th.bing.com/th/id/OIP.8XnAKLQnuXCfnp-s2PdTDQHaFj?w=261&h=196&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
    { id: 2, title: "Phòng trọ cho nữ thuê không gian được trang trí đẹp mắt", price: "2.5 Triệu/tháng", address: "Nguyễn Huệ, Tp Huế", image: "https://bandon.vn/uploads/posts/thiet-ke-nha-tro-dep-2020-bandon-0.jpg" },
    { id: 3, title: "Phòng trọ có gác lửng, kệ bếp, phòng vệ sinh khép kín", price: "2.5 Triệu/tháng", address: "29/3, Đà Nẵng", image: "https://s-housing.vn/wp-content/uploads/2022/09/thiet-ke-phong-tro-dep-54.jpg" },
    { id: 4, title: "Tìm người ở ghép gần trung tâm thành phố", price: "5.5 Triệu/tháng", address: "TP Vinh, Nghệ An", image: "https://bandon.vn/uploads/thiet-ke-nha-tro-dep-2020-bandon-11.jpg" }
  ];

  const latestPosts = [
    { id: '1001', title: 'Căn hộ mini trung tâm Huế, gần ĐH Khoa Học', price: '3 Triệu/tháng', image: 'https://bandon.vn/uploads/posts/thiet-ke-nha-tro-dep-2020-bandon-0.jpg', time: 'Mới đăng' },
    { id: '1002', title: 'Phòng trọ có ban công, nội thất cơ bản', price: '2 Triệu/tháng', image: 'https://s-housing.vn/wp-content/uploads/2022/09/thiet-ke-phong-tro-dep-54.jpg', time: '30 phút trước' },
    { id: '1003', title: 'Phòng cho nữ, gần chợ, an ninh tốt', price: '1.8 Triệu/tháng', image: 'https://bandon.vn/uploads/thiet-ke-nha-tro-dep-2020-bandon-11.jpg', time: '1 giờ trước' },
    { id: '1004', title: 'Phòng trọ mới xây, có gác lửng, để xe rộng', price: '2.2 Triệu/tháng', image: 'https://bandon.vn/uploads/thiet-ke-nha-tro-dep-2020-bandon-28.jpg', time: '2 giờ trước' }
  ];

  const featuredFromImages = postData.images.map((img, index) => ({
    id: index + 1,
    title: `Bài viết nổi bật ${index + 1}`,
    price: postData.price,
    image: img,
    time: `${index + 1} giờ trước`
  }));
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
        setAppointmentOpen(true);
        break;
      case 'rent':
        setRentModalOpen(true);
        break;
      default:
        break;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <Header />
      
      <main style={{ padding: '20px 0' }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{ marginBottom: '20px', fontSize: '14px', color: '#666' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Trang chủ</span>
            {' > '}
            <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>{postData.category}</span>
            {' > '}
            <span style={{ cursor: 'pointer' }}>Phước Vĩnh</span>
            {' > '}
            <span>Thành phố Huế</span>
          </div>

          <div style={{ display: 'flex', gap: '24px' }}>
            <div style={{ flex: 1 }}>
              <div ref={postDetailRef} style={{ background: '#fff', borderRadius: '12px', padding: '24px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px', color: '#52b4f9' }}>
                  {postData.title}
                </h1>
                
                <div style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>📍</span>
                    <span style={{ fontWeight: '600', color: '#000' }}>{postData.map.address}</span>
                  </div>
                </div>
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

                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
                    <div>
                      <img
                        src={postData.images[selectedImage]}
                        alt="Main"
                        style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '16px' }}
                      />
                    </div>

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

                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
                    Mô tả
                  </h3>
                  <div style={{ lineHeight: '1.6', color: '#333', whiteSpace: 'pre-line' }}>
                    {postData.description}
                  </div>
                </div>

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
                      style={{ position: 'absolute', right: 12, bottom: 12, padding: '8px 12px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '14px' }}
                    >
                      Xem bản đồ lớn hơn
                    </button>
                  </div>
                </div>

                <Danhgia
                  ownerAvatar={postData.owner.avatar}
                  ratingAverage={postData.rating.average}
                  initialReviews={postData.reviews}
                />
              </div>

              <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                  Trọ cùng khu vực
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                  {nearbyPosts.map(post => (
                    <div key={post.id} style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer' }}>
                      <img src={post.image} alt={post.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                      <div style={{ padding: '12px' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                          {post.title}
                        </h4>
                        <div style={{ color: '#52b4f9', fontWeight: '600', marginBottom: '4px' }}>
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

              <div style={{ background: '#fff', borderRadius: '12px', padding: '24px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                  Bài viết mới
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                  {latestPosts.map(item => (
                    <div key={item.id} onClick={() => navigate(`/xem-bai-dang/${item.id}`)} style={{ border: '1px solid #eee', borderRadius: '8px', overflow: 'hidden', cursor: 'pointer' }}>
                      <img src={item.image} alt={item.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                      <div style={{ padding: '12px' }}>
                        <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
                          {item.title}
                        </h4>
                        <div style={{ color: '#52b4f9', fontWeight: '600', marginBottom: '4px' }}>
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

            <div style={{ width: '320px', position: 'sticky', top: '20px', alignSelf: 'flex-start' }}>
              <div ref={ownerCardRef} style={{ background: '#fff', borderRadius: '12px', padding: '20px', marginBottom: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img
                    src={postData.owner.avatar}
                    alt="Avatar"
                    style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover', border: '1px solid #eee', marginBottom: '12px' }}
                  />
                  <div style={{ fontWeight: 600, marginBottom: 4 }}>{postData.owner.name}</div>

                  <div style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '12px' }}>
                    {postData.owner.totalPosts} tin đăng
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button
                    onClick={() => handleContact('appointment')}
                    style={{ width: '100%', padding: '10px 12px', background: '#fff', color: '#111827', border: '1px solid #e5e7eb', borderRadius: '9999px', cursor: 'pointer', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    <span>✉️</span>
                    <span>Đặt lịch hẹn xem phòng</span>
                  </button>

                  <button
                    onClick={() => handleContact('phone')}
                    style={{ width: '100%', padding: '10px 12px', background: '#fff', color: '#111827', border: '1px solid #e5e7eb', borderRadius: '9999px', cursor: 'pointer', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    <span>📞</span>
                    <span>{postData.owner.phone}</span>
                  </button>

                  <button
                    onClick={() => handleContact('rent')}
                    style={{ width: '100%', padding: '10px 12px', background: '#fff', color: '#111827', border: '1px solid #e5e7eb', borderRadius: '9999px', cursor: 'pointer', fontSize: '14px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    <span>🔒</span>
                    <span>Gửi yêu cầu thuê</span>
                  </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '8px', borderTop: '1px solid #f3f4f6', fontSize: '13px', color: '#6b7280' }}>
                  <LuuBaiViet postId={postData.id} />
                  <ChiaSe postId={postData.id} />
                  <BaoCao postId={postData.id} />
                </div>
              </div>

              <div style={{ background: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', maxHeight: featuredContainerHeight ? `${featuredContainerHeight}px` : undefined, overflowY: 'auto' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>
                  Tin nổi bật
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {sidebarFeatured.map(post => (
                    <div
                      key={post.uid || post.id}
                      style={{ display: 'flex', gap: '12px', cursor: 'pointer', padding: '8px', borderRadius: '8px', transition: 'background 0.2s' }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = '#f5f5f5')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                    >
                      <img
                        src={post.image}
                        alt={post.title}
                        style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '4px' }}>
                          {post.title}
                        </div>
                        <div style={{ color: '#52b4f9', fontWeight: '600', fontSize: '12px', marginBottom: '2px' }}>
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

<GuiYeuCauThue
  isOpen={rentModalOpen}
  onClose={() => setRentModalOpen(false)}
  defaultDate={new Date().toISOString().slice(0,10)}
  onSubmit={(date) => {
    setRentModalOpen(false);
    alert(`Đã gửi yêu cầu thuê từ ngày ${new Date(date).toLocaleDateString('vi-VN')}. Vui lòng chờ chủ trọ phê duyệt.`);
  }}
/>

<DatLichHenXemPhong
  isOpen={appointmentOpen}
  onClose={() => setAppointmentOpen(false)}
  defaultDate={new Date().toISOString().slice(0,10)}
  defaultTime="09:00"
/>

<Footer />
    </div>
  );
}

export default XemBaiDang;