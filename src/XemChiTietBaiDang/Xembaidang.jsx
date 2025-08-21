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
import { normalizedPosts, getPostById } from '../data/selector';

function XemBaiDang() {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const postData = getPostById(id);

  // Fallbacks
  const safeImages = Array.isArray(postData?.images) ? postData.images : [];
  const safeMapAddress = postData?.map?.address || postData?.address || '';
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
  }, [id]);
  // Helpers
  const allPosts = (normalizedPosts || []).filter(p => p && p.id);
  const fromNow = (iso) => {
    if (!iso) return '';
    const ms = Date.now() - new Date(iso).getTime();
    const m = Math.floor(ms / 60000);
    if (m < 1) return 'Mới đăng';
    if (m < 60) return `${m} phút trước`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h} giờ trước`;
    const d = Math.floor(h / 24);
    return `${d} ngày trước`;
  };
  const cityOf = (addr = '') => {
    const parts = String(addr).split(',');
    return parts[parts.length - 1]?.trim().toLowerCase() || '';
  };

  // Google Maps từ địa chỉ
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(safeMapAddress)}&output=embed`;
  const mapExternalUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(safeMapAddress)}`;

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

  // Replace old featuredPosts/nearbyPosts/latestPosts
  const currentCity = cityOf(postData.address || postData?.map?.address || '');

  // Latest posts (newest postedDate)
  const latestPosts = allPosts
    .filter(p => p.id !== postData.id)
    .sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate))
    .slice(0, 4)
    .map(p => ({
      id: p.id,
      title: p.title,
      price: p.price,
      image: p.images?.[0] || '',
      time: fromNow(p.postedDate),
    }));

  // Nearby by city (fallback: same category if no city match)
  let nearbyPosts = allPosts
    .filter(p => p.id !== postData.id && cityOf(p.address) === currentCity)
    .slice(0, 4)
    .map(p => ({
      id: p.id,
      title: p.title,
      price: p.price,
      address: p.address,
      image: p.images?.[0] || '',
    }));
  if (nearbyPosts.length === 0) {
    nearbyPosts = allPosts
      .filter(p => p.id !== postData.id && p.category === postData.category)
      .slice(0, 4)
      .map(p => ({
        id: p.id,
        title: p.title,
        price: p.price,
        address: p.address,
        image: p.images?.[0] || '',
      }));
  }

  // Featured by highest rating
  const featuredPosts = allPosts
    .filter(p => p.id !== postData.id)
    .sort((a, b) => (b.rating?.average || 0) - (a.rating?.average || 0))
    .slice(0, 20)
    .map(p => ({
      id: p.id,
      title: p.title,
      price: p.price,
      image: p.images?.[0] || '',
      time: fromNow(p.postedDate),
    }));

  // Sidebar list
  const baseFeatured = (featuredPosts.length ? featuredPosts : latestPosts);
  const sidebarFeatured = baseFeatured.length
    ? Array.from({ length: sidebarItemCount }, (_, i) => ({
        ...baseFeatured[i % baseFeatured.length],
        uid: `sf-${i}`,
      }))
    : [];

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
                    <span style={{ fontWeight: '600', color: '#000' }}>{safeMapAddress}</span>
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
                        src={safeImages[selectedImage]}
                        alt="Main"
                        style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '16px' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: '12px' }}>
                      {[1, 2, 3].map((i) => {
                        const imgSrc = safeImages[i];
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
                          background: safeImages[4] ? `url(${safeImages[4]}) center/cover no-repeat` : '#f3f4f6'
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
                        {safeImages.map((img, idx) => (
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
                    <div
                      key={post.id}
                      onClick={() => navigate(`/xem-bai-dang/${post.id}`)}
                      style={{
                        border: '1px solid #eee',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        transform: 'translateZ(0)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.045)';
                        e.currentTarget.style.boxShadow = '0 10px 32px 0 rgba(25,118,210,0.18)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                      }}
                    >
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
                    <div
                      key={item.id}
                      onClick={() => navigate(`/xem-bai-dang/${item.id}`)}
                      style={{
                        border: '1px solid #eee',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        transform: 'translateZ(0)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.045)';
                        e.currentTarget.style.boxShadow = '0 10px 32px 0 rgba(25,118,210,0.18)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                      }}
                    >
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
                      onClick={() => post.id && navigate(`/xem-bai-dang/${post.id}`)}
                      style={{
                        display: 'flex',
                        gap: '12px',
                        cursor: 'pointer',
                        padding: '8px',
                        borderRadius: '8px',
                        transition: 'background 0.2s, transform 0.2s ease, box-shadow 0.2s ease',
                        transform: 'translateZ(0)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#f5f5f5';
                        e.currentTarget.style.transform = 'scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 6px 18px rgba(25,118,210,0.15)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
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