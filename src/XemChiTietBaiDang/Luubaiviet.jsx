// src/XemChiTietBaiDang/Luubaiviet.jsx
import React, { useEffect, useState } from 'react';

function LuuBaiViet({ postId }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const ids = JSON.parse(localStorage.getItem('savedPosts') || '[]');
    setSaved(ids.includes(postId));
  }, [postId]);

  const toggleSave = () => {
    const ids = JSON.parse(localStorage.getItem('savedPosts') || '[]');
    const next = ids.includes(postId) ? ids.filter(id => id !== postId) : [postId, ...ids];
    localStorage.setItem('savedPosts', JSON.stringify(next));
    setSaved(next.includes(postId));
    try {
      const details = JSON.parse(localStorage.getItem('savedPostsDetails') || '{}');
      if (next.includes(postId)) {
        if (!details[postId]) {
          // Lưu metadata cơ bản để hiển thị thumbnail trên dropdown
          details[postId] = {
            id: postId,
            title: document.title || `Bài viết #${postId}`,
            image: undefined
          };
        }
      } else {
        delete details[postId];
      }
      localStorage.setItem('savedPostsDetails', JSON.stringify(details));
    } catch (_) {}
    // Thông báo cho header cập nhật ngay
    try { window.dispatchEvent(new Event('saved-posts-updated')); } catch (_) {}
    alert(next.includes(postId) ? 'Đã lưu bài!' : 'Đã bỏ lưu.');
  };

  return (
    <div style={{ display:'flex', alignItems:'center', gap:'6px', cursor:'pointer' }} onClick={toggleSave}>
      <span>{saved ? '♥' : '♡'}</span>
      <span>{saved ? 'Đã lưu' : 'Lưu bài'}</span>
    </div>
  );
}
export default LuuBaiViet;
