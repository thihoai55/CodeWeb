import React from "react";

function parseViDateStringToDate(dateStr) {
  // dateStr ví dụ: '01/03/2020 23:39'
  try {
    const [d, t] = dateStr.split(" ");
    const [day, month, year] = d.split("/").map(Number);
    const [hour, minute] = t.split(":").map(Number);
    return new Date(year, month - 1, day, hour, minute);
  } catch (_) {
    return new Date();
  }
}

function formatTimeAgoFromVi(dateStr) {
  const base = parseViDateStringToDate(dateStr);
  const now = new Date();
  const diffMs = now - base;
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

function DropdownNotificationItem({ notification, onClick }) {
  const { id, message, date, isRead } = notification;

  return (
    <div
      onClick={() => onClick(id)}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "12px 14px",
        cursor: "pointer",
        background: isRead ? "#fff" : "#f0f8ff",
        borderBottom: "1px solid #dededeff",
        transition: "background 0.2s"
      }}
    >
      <div style={{
        width: 10,
        height: 10,
        borderRadius: 20,
        background: isRead ? "transparent" : "#1a73e8",
        marginTop: 6,
        flex: "0 0 10px"
      }} />

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 6
        }}>
          <span style={{ color: "#333", fontSize: 13, fontWeight: 500 }}>
            {date}
          </span>
          <span style={{ color: "#888", fontSize: 12 }}>
            {formatTimeAgoFromVi(date)} trước
          </span>
        </div>
        {message && (
          <div style={{ color: "#007bff", fontSize: 14, lineHeight: 1.4, whiteSpace: "normal" }}>
            {message}
          </div>
        )}
      </div>
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
  const [showOnlyUnread, setShowOnlyUnread] = React.useState(false);

  React.useEffect(() => {
    function handleEsc(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (open) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  const list = showOnlyUnread ? notifications.filter(n => !n.isRead) : notifications;

  return (
    <div
      style={{
        position: "absolute",
        top: 44,
        right: 0,
        width: 380,
        maxHeight: 520,
        background: "#fff",
        borderRadius: 10,
        boxShadow: "0 12px 32px rgba(0,0,0,0.18)",
        border: "1px solid #e5e7eb",
        overflow: "hidden",
        zIndex: 1000
      }}
      onClick={e => e.stopPropagation()}
    >
      <div style={{ padding: "10px 14px", borderBottom: "1px solid #ebe9e9ff" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: "#111", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Thông báo</div>
          <button
            onClick={onClose}
            style={{
              border: "none",
              background: "#f5f5f5",
              color: "#111",
              cursor: "pointer",
              fontWeight: 700,
              padding: "6px 10px",
              borderRadius: 8
            }}
          >
            Đóng
          </button>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <button
            onClick={() => setShowOnlyUnread(v => !v)}
            style={{
              border: "1px solid #e5e7eb",
              background: showOnlyUnread ? "#f5faff" : "#fff",
              color: "#111",
              cursor: "pointer",
              fontWeight: 600,
              padding: "6px 10px",
              borderRadius: 8,
              flexShrink: 0
            }}
          >
            {showOnlyUnread ? "Hiện tất cả" : "Chỉ chưa đọc"}
          </button>
          <button
            onClick={onMarkAllRead}
            style={{
              border: "none",
              background: "#007bff",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 600,
              padding: "6px 10px",
              borderRadius: 8,
              flexShrink: 0
            }}
          >
            Đánh dấu đã đọc tất cả
          </button>
        </div>
      </div>

      <div style={{ maxHeight: 420, overflowY: "auto" }}>
        {list.length === 0 ? (
          <div style={{ padding: 16, color: "#6c757d", textAlign: "center" }}>Không có thông báo nào</div>
        ) : (
          list.map(n => (
            <DropdownNotificationItem key={n.id} notification={n} onClick={onItemClick} />
          ))
        )}
      </div>

    </div>
  );
}










