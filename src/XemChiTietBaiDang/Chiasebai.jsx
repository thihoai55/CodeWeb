
import React from 'react';

function ChiaSe({ postId }) {
  const copy = async () => {
    const url = `${window.location.origin}/xem-bai-dang/${postId}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const t = document.createElement('textarea');
      t.value = url; document.body.appendChild(t); t.select(); document.execCommand('copy'); document.body.removeChild(t);
    }
    alert('Đã sao chép liên kết!');
  };

  return (
    <div style={{ display:'flex', alignItems:'center', gap:'6px', cursor:'pointer' }} onClick={copy}>
      <span>🔗</span>
      <span>Chia sẻ</span>
    </div>
  );
}
export default ChiaSe;

