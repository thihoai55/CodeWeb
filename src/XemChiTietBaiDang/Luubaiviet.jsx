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

