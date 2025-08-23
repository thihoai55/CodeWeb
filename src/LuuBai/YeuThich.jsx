import React from "react";

function FavoriteItem({ item, onClick }) {
  const { id, title, image, price, address, category } = item;
  return (
    <div
      onClick={() => onClick(id)}
      style={{
        display: "flex",
        gap: 10,
        padding: "10px 12px",
        borderBottom: "1px solid #f1f1f1",
        cursor: "pointer",
        alignItems: "center",
        background: "#fff",
        transition: "background 0.2s"
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = "#f5f5f5"}
      onMouseLeave={(e) => e.currentTarget.style.background = "#fff"}
    >
      <div
        style={{
          width: 48,
          height: 36, 
          background: "#eee",
          borderRadius: 6,
          overflow: "hidden",
          flex: "0 0 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {image ? (
          <img src={image} alt="thumb" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <span style={{ fontSize: 16 }}>🏠</span>
        )}
      </div>
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ 
          fontWeight: 600, 
          color: "#222", 
          whiteSpace: "nowrap", 
          overflow: "hidden", 
          textOverflow: "ellipsis",
          marginBottom: "2px"
        }}>
          {title || `Bài viết #${id}`}
        </div>
        {price && (
          <div style={{ 
            color: "#52b4f9", 
            fontSize: "12px", 
            fontWeight: "600",
            marginBottom: "2px"
          }}>
            {price}
          </div>
        )}
        {address && (
          <div style={{ 
            color: "#666", 
            fontSize: "11px",
            whiteSpace: "nowrap", 
            overflow: "hidden", 
            textOverflow: "ellipsis"
          }}>
            📍 {address}
          </div>
        )}
        {!price && !address && (
          <div style={{ color: "#666", fontSize: "12px" }}>
            Nhấn để mở chi tiết
          </div>
        )}
      </div>
      <span style={{ color: "#e53935", fontSize: 16 }}>❤</span>
    </div>
  );
}

export default function YeuThichDropdown({ open, onClose, items, onItemClick }) {
  if (!open) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: 44,
        right: 0,
        width: 360,
        maxHeight: 520,
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
        border: "1px solid #e5e7eb",
        overflow: "hidden",
        zIndex: 1000
      }}
      onClick={e => e.stopPropagation()}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", borderBottom: "1px solid #eee" }}>
        <div style={{ fontWeight: 700, fontSize: 16 }}>Bài viết đã lưu ({items.length})</div>
      </div>
      <div style={{ maxHeight: 440, overflowY: "auto" }}>
        {items.length === 0 ? (
          <div style={{ padding: 16, color: "#666", textAlign: "center" }}>
            Chưa có bài viết nào được lưu.
          </div>
        ) : (
          items.map(it => <FavoriteItem key={it.id} item={it} onClick={onItemClick} />)
        )}
      </div>
      <div style={{ padding: 10, borderTop: "1px solid #eee", display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={onClose}
          style={{ 
            border: "none", 
            padding: "8px 12px", 
            borderRadius: 8, 
            background: "#f5f5f5", 
            cursor: "pointer", 
            fontWeight: 600,
            transition: "background 0.2s"
          }}
          onMouseEnter={(e) => e.target.style.background = "#e0e0e0"}
          onMouseLeave={(e) => e.target.style.background = "#f5f5f5"}
        >
          Đóng
        </button>
      </div>
    </div>
  );
}


