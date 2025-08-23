import React, { useMemo, useRef, useState, useEffect } from 'react';

function DanhGia({ ownerAvatar, ratingAverage, initialReviews = [] }) {
  const [showReviews, setShowReviews] = useState(false);
  const [reviews, setReviews] = useState(initialReviews);
  
  // Lấy thông tin user từ localStorage
  const [userInfo, setUserInfo] = useState(null);
  
  useEffect(() => {
    const loadUserInfo = () => {
      try {
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
          const parsedUserInfo = JSON.parse(storedUserInfo);
          setUserInfo(parsedUserInfo);
        }
      } catch (error) {
        console.error('Error loading user info:', error);
      }
    };

    loadUserInfo();
    
    // Lắng nghe sự thay đổi localStorage
    window.addEventListener('storage', loadUserInfo);
    
    return () => {
      window.removeEventListener('storage', loadUserInfo);
    };
  }, []);

  // Sử dụng tên user từ localStorage thay vì hardcode
  const newReviewName = userInfo ? userInfo.name : 'Khách';
  
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [newReviewComment, setNewReviewComment] = useState('');

  // Đính kèm media + emoji
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiList = ['😊','😂','❤️','👍','😢','😍','🤔','👏','😮','😡'];

  // Bộ lọc
  const [filter, setFilter] = useState('all'); // 'all' | '5' | '4' | '3' | '2' | '1' | 'commented' | 'media'
  const ratingCounts = useMemo(() => {
    const c = { 1:0,2:0,3:0,4:0,5:0 };
    reviews.forEach(r => { c[r.rating] = (c[r.rating] || 0) + 1; });
    return c;
  }, [reviews]);
  const commentedCount = useMemo(() => reviews.filter(r => (r.comment || '').trim().length > 0).length, [reviews]);
  const mediaCount = useMemo(() => reviews.filter(r => (r.images && r.images.length) || r.video).length, [reviews]);

  const displayedReviews = useMemo(() => {
    switch (filter) {
      case '5': case '4': case '3': case '2': case '1':
        return reviews.filter(r => String(r.rating) === filter);
      case 'commented':
        return reviews.filter(r => (r.comment || '').trim());
      case 'media':
        return reviews.filter(r => (r.images && r.images.length) || r.video);
      default:
        return reviews;
    }
  }, [filter, reviews]);

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

  const handlePickImages = (e) => {
    const files = Array.from(e.target.files || []);
    const imgs = files.filter((f) => f.type && f.type.startsWith('image/'));
    if (imgs.length) setSelectedImages((prev) => [...prev, ...imgs].slice(0, 5));
    if (e.target) e.target.value = '';
  };
  const handlePickVideo = (e) => {
    const file = (e.target.files || [])[0];
    if (file && file.type && file.type.startsWith('video/')) setSelectedVideo(file);
    if (e.target) e.target.value = '';
  };
  const insertEmoji = (emoji) => {
    setNewReviewComment((prev) => `${prev}${emoji}`);
    setShowEmojiPicker(false);
  };
  const removeImageAt = (idx) => setSelectedImages((prev) => prev.filter((_, i) => i !== idx));
  const removeVideo = () => setSelectedVideo(null);

  const handleSubmitReview = () => {
    if (!newReviewComment.trim() || newReviewRating === 0) {
      alert('Vui lòng chấm sao và nhập nội dung đánh giá.');
      return;
    }
    
    // Kiểm tra user đã đăng nhập chưa
    if (!userInfo) {
      alert('Vui lòng đăng nhập để đánh giá!');
      return;
    }
    
    const newReview = {
      id: Date.now(),
      user: userInfo.name, // Sử dụng tên từ localStorage
      userAvatar: userInfo.avatar || '/anh/avt.jpg', // Thêm avatar user
      rating: newReviewRating,
      comment: newReviewComment.trim(),
      date: new Date().toLocaleDateString('vi-VN'),
      images: selectedImages,
      video: selectedVideo
    };
    
    setReviews([newReview, ...reviews]);
    
    // Reset form
    setNewReviewRating(0);
    setNewReviewComment('');
    setSelectedImages([]);
    setSelectedVideo(null);
    setShowEmojiPicker(false);
    setShowReviews(true);
  };

  // UI chip filter
  const Chip = ({ active, onClick, children }) => (
    <button
      onClick={onClick}
      style={{
        padding: '8px 12px',
        background: active ? '#e8f0fe' : '#f8f9fa',
        color: '#111',
        border: '1px solid #e0e0e0',
        borderRadius: 8,
        cursor: 'pointer'
      }}
    >
      {children}
    </button>
  );

  return (
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

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '24px', fontWeight: '700' }}>{ratingAverage}</span>
          <span>trên 5</span>
        </div>
        <div style={{ display: 'flex', gap: '4px' }}>
          {renderStars(Math.floor(ratingAverage))}
        </div>
        <span style={{ color: '#666' }}>({reviews.length} đánh giá)</span>
      </div>

      {/* Bộ lọc */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
        <Chip active={filter==='all'} onClick={() => setFilter('all')}>Tất cả</Chip>
        <Chip active={filter==='5'} onClick={() => setFilter('5')}>5 sao ({ratingCounts[5]})</Chip>
        <Chip active={filter==='4'} onClick={() => setFilter('4')}>4 sao ({ratingCounts[4]})</Chip>
        <Chip active={filter==='3'} onClick={() => setFilter('3')}>3 sao ({ratingCounts[3]})</Chip>
        <Chip active={filter==='2'} onClick={() => setFilter('2')}>2 sao ({ratingCounts[2]})</Chip>
        <Chip active={filter==='1'} onClick={() => setFilter('1')}>1 sao ({ratingCounts[1]})</Chip>
        <Chip active={filter==='commented'} onClick={() => setFilter('commented')}>Có bình luận ({commentedCount})</Chip>
        <Chip active={filter==='media'} onClick={() => setFilter('media')}>Có hình ảnh / video ({mediaCount})</Chip>
      </div>

      {/* Hộp viết đánh giá */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', marginBottom: '12px' }}>
        <img src={ownerAvatar} alt="Avatar" style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover' }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>{newReviewName}</div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 10 }}>
            {renderInteractiveStars()}
          </div>
          <div style={{ position: 'relative', background: '#eee', borderRadius: 12, paddingRight: 140 }}>
            {/* Emoji picker */}
            {showEmojiPicker && (
              <div style={{ position: 'absolute', bottom: '100%', right: 0, marginBottom: 8, background: '#fff', border: '1px solid #eee', borderRadius: 8, padding: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: 'grid', gridTemplateColumns: 'repeat(5, 24px)', gap: 8, zIndex: 10 }}>
                {emojiList.map((emo) => (
                  <span key={emo} style={{ cursor: 'pointer' }} onClick={() => insertEmoji(emo)}>{emo}</span>
                ))}
              </div>
            )}

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

            {/* Input file ẩn */}
            <input type="file" accept="image/*" multiple ref={imageInputRef} onChange={handlePickImages} style={{ display: 'none' }} />
            <input type="file" accept="video/*" ref={videoInputRef} onChange={handlePickVideo} style={{ display: 'none' }} />

            <div style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', display: 'flex', gap: 14 }}>
              <span role="img" aria-label="emoji" style={{ cursor: 'pointer' }} onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊</span>
              <span role="img" aria-label="video" style={{ cursor: 'pointer' }} onClick={() => videoInputRef.current && videoInputRef.current.click()}>🎥</span>
              <span role="img" aria-label="photo" style={{ cursor: 'pointer' }} onClick={() => imageInputRef.current && imageInputRef.current.click()}>📷</span>
              <button onClick={handleSubmitReview} style={{ border: 'none', background: 'black', color: 'white', borderRadius: 9999, padding: '6px 10px', cursor: 'pointer' }}>➤</button>
            </div>
          </div>

          {(selectedImages.length > 0 || selectedVideo) && (
            <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {selectedImages.map((file, idx) => (
                <div key={idx} style={{ position: 'relative', width: 64, height: 64, borderRadius: 8, overflow: 'hidden', border: '1px solid #ddd' }}>
                  <img src={URL.createObjectURL(file)} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button onClick={() => removeImageAt(idx)} style={{ position: 'absolute', top: 2, right: 2, border: 'none', background: 'rgba(0,0,0,0.5)', color: '#fff', width: 18, height: 18, borderRadius: '50%', cursor: 'pointer', lineHeight: '18px', padding: 0 }}>×</button>
                </div>
              ))}
              {selectedVideo && (
                <div style={{ position: 'relative' }}>
                  <video src={URL.createObjectURL(selectedVideo)} style={{ width: 140, height: 80, borderRadius: 8, border: '1px solid #ddd', objectFit: 'cover' }} controls />
                  <button onClick={removeVideo} style={{ position: 'absolute', top: 4, right: 4, border: 'none', background: 'rgba(0,0,0,0.5)', color: '#fff', width: 20, height: 20, borderRadius: '50%', cursor: 'pointer', lineHeight: '20px', padding: 0 }}>×</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showReviews && (
        <div style={{ marginTop: '8px' }}>
          {displayedReviews.map(review => (
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

              {/* Nội dung */}
              {review.comment && (
                <div style={{ color: '#666', marginBottom: '8px' }}>
                  {review.comment}
                </div>
              )}

              {/* Media */}
              {(review.images && review.images.length) || review.video ? (
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
                  {(review.images || []).map((file, idx) => (
                    <img key={idx} src={file instanceof File ? URL.createObjectURL(file) : file} alt="img" style={{ width: 96, height: 96, objectFit: 'cover', borderRadius: 6, border: '1px solid #eee' }} />
                  ))}
                  {review.video && (
                    <video src={review.video instanceof File ? URL.createObjectURL(review.video) : review.video} style={{ width: 200, height: 120, borderRadius: 6, border: '1px solid #eee', objectFit: 'cover' }} controls />
                  )}
                </div>
              ) : null}

              <div style={{ fontSize: '12px', color: '#999' }}>
                {review.date}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DanhGia;