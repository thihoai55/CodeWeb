import React from "react";

function formatTimeAgo(date) {
  const now = new Date();
  const diffMs = now - new Date(date);
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (seconds < 60) return `${seconds} giây`;
  if (minutes < 60) return `${minutes} phút`;
  if (hours < 24) return `${hours} giờ`;
  if (days < 7) return `${days} ngày`;
  const weeks = Math.floor(days / 7);
  return `${weeks} tuần`;
}

function NotificationItem({ notification, onClick }) {
  const {
    id,
    title,
    message,
    time,
    read,
    avatar,
    icon
  } = notification;

  return (
    <div
      onClick={() => onClick(id)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 12px",
        cursor: "pointer",
        background: read ? "#fff" : "#eef6ff",
        borderBottom: "1px solid #f1f1f1"
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "#e5e7eb",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flex: "0 0 44px"
        }}
      >
        {avatar ? (
          <img src={avatar} alt="avt" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <span style={{ fontSize: 22 }}>{icon || "🔔"}</span>
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontWeight: 600, color: "#222", marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</div>
        {message && (
          <div style={{ color: "#555", fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{message}</div>
        )}
        <div style={{ color: "#888", fontSize: 12, marginTop: 4 }}>{formatTimeAgo(time)} trước</div>
      </div>
      {!read && (
        <div style={{ width: 10, height: 10, borderRadius: 20, background: "#1a73e8" }} />
      )}
    </div>
  );
}

export default function ThongBaoDropdown({
  open,
  onClose,
  notifications,
  onItemClick,
  onMarkAllRead
}) {
  const [tab, setTab] = React.useState("all");

  React.useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  const list = tab === "all" ? notifications : notifications.filter(n => !n.read);

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
        <div style={{ fontWeight: 700, fontSize: 16 }}>Thông báo</div>
        <button
          onClick={onMarkAllRead}
          style={{
            border: "none",
            background: "transparent",
            color: "#1a73e8",
            cursor: "pointer",
            fontWeight: 600
          }}
        >
          Đánh dấu đã đọc tất cả
        </button>
      </div>

      <div style={{ display: "flex", gap: 8, padding: 8, borderBottom: "1px solid #f1f1f1" }}>
        <button
          onClick={() => setTab("all")}
          style={{
            flex: 1,
            padding: "8px 10px",
            borderRadius: 20,
            border: "1px solid #e5e7eb",
            background: tab === "all" ? "#f5faff" : "#fff",
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          Tất cả
        </button>
        <button
          onClick={() => setTab("unread")}
          style={{
            flex: 1,
            padding: "8px 10px",
            borderRadius: 20,
            border: "1px solid #e5e7eb",
            background: tab === "unread" ? "#f5faff" : "#fff",
            fontWeight: 600,
            cursor: "pointer"
          }}
        >
          Chưa đọc
        </button>
      </div>

      <div style={{ maxHeight: 420, overflowY: "auto" }}>
        {list.length === 0 ? (
          <div style={{ padding: 16, color: "#666" }}>Không có thông báo.</div>
        ) : (
          list.map(n => (
            <NotificationItem key={n.id} notification={n} onClick={onItemClick} />
          ))
        )}
      </div>

      <div style={{ padding: 10, borderTop: "1px solid #eee", display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <button
          onClick={onClose}
          style={{
            border: "none",
            padding: "8px 12px",
            borderRadius: 8,
            background: "#f5f5f5",
            cursor: "pointer",
            fontWeight: 600
          }}
        >
          Đóng
        </button>
      </div>
    </div>
  );
}

