// src/XemChiTietBaiDang/BaoCao.jsx
import React, { useState } from 'react';

function BaoCao({ postId }) {
  const [open, setOpen] = useState(false);
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [desc, setDesc] = useState('');
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');

  const reasons = [
    { id: 'fraud', label: 'Bài đăng có dấu hiệu lừa đảo' },
    { id: 'duplicate', label: 'Tin trùng lặp nội dung' },
    { id: 'no-contact', label: 'Không liên hệ được chủ bài đăng' },
    { id: 'incorrect', label: 'Thông tin không đúng thực tế (giá, địa chỉ, diện tích, hình ảnh,...)' },
    { id: 'other', label: 'Lý do khác' }
  ];

  const toggleReason = (id) => {
    setSelectedReasons((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const isValidPhone = (p) => /^[0-9]{9,11}$/.test((p || '').trim());
  const canSubmit = selectedReasons.length > 0 && !!fullname.trim() && isValidPhone(phone);

  const submit = () => {
    if (selectedReasons.length === 0) {
      alert('Vui lòng chọn ít nhất một lý do.');
      return;
    }
    if (!fullname.trim() || !phone.trim()) {
      alert('Vui lòng nhập Họ và tên và Số điện thoại.');
      return;
    }
    if (!isValidPhone(phone)) {
      alert('Số điện thoại không hợp lệ (9-11 chữ số).');
      return;
    }

    const payload = {
      postId,
      reasons: selectedReasons,
      description: desc.trim(),
      contact: { fullname: fullname.trim(), phone: phone.trim() },
      submittedAt: new Date().toISOString()
    };
    console.log('Bao cao payload:', payload);
    alert('Cảm ơn bạn! Chúng tôi đã ghi nhận phản ánh.');
    setOpen(false); setSelectedReasons([]); setDesc(''); setFullname(''); setPhone('');
  };

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }} onClick={() => setOpen(true)}>
        <span>⚠️</span>
        <span>Báo cáo</span>
      </div>

      {open && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}
        >
          <div style={{
            background: '#fff',
            borderRadius: 8,
            width: 520,
            maxWidth: '92%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxSizing: 'border-box',
            boxShadow: '0 6px 18px rgba(0,0,0,0.2)'
          }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', background: '#1e90ff', color: '#fff', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
              <strong>Phản ánh tin đăng:</strong>
              <button onClick={() => setOpen(false)} style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: 18, cursor: 'pointer' }}>✕</button>
            </div>

            {/* Body */}
            <div style={{ padding: 12 }}>
              <div style={{ marginBottom: 8, fontWeight: 600 }}>Lý do phản ánh:</div>
              <div style={{ display: 'grid', gap: 8, marginBottom: 12 }}>
                {reasons.map((r) => (
                  <label
                    key={r.id}
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 8, lineHeight: 1.4, wordBreak: 'break-word', whiteSpace: 'normal' }}
                  >
                    <input type="checkbox" checked={selectedReasons.includes(r.id)} onChange={() => toggleReason(r.id)} />
                    <span>{r.label}</span>
                  </label>
                ))}
              </div>

              <div style={{ marginBottom: 6, fontWeight: 600 }}>Mô tả thêm:</div>
              <textarea
                placeholder="Mô tả thêm:"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                style={{ width: '100%', height: 160, padding: 8, resize: 'vertical',
                         border: '1px solid #dcdcdc', borderRadius: 6, boxSizing: 'border-box' }}
              />

              <div style={{ marginTop: 12, marginBottom: 6, fontWeight: 600 }}>Thông tin liên hệ:</div>
              <div style={{ display: 'grid', gap: 8 }}>
                <input
                  placeholder="Họ và tên của bạn:"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  style={{ width: '100%', padding: 10, border: '1px solid #dcdcdc',
                           borderRadius: 6, boxSizing: 'border-box' }}
                />
                <input
                  placeholder="Số điện thoại:"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ width: '100%', padding: 10, border: '1px solid #dcdcdc',
                           borderRadius: 6, boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ marginTop: 14 }}>
                <button
                  onClick={submit}
                  disabled={!canSubmit}
                  style={{
                    width: '100%', padding: '12px 14px',
                    background: '#1e90ff', color: '#fff', border: 'none',
                    borderRadius: 6, fontWeight: 600,
                    opacity: canSubmit ? 1 : 0.6, cursor: canSubmit ? 'pointer' : 'not-allowed'
                  }}
                >
                  Gửi phản ánh
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BaoCao;