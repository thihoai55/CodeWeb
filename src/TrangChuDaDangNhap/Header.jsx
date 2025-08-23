import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ModalBoLoc from "../ModalBoLoc/modal_boloc"
import ModalTimKiem from "../ModalTimKiem/modal_timkiem"
import BoLoc from "../BoLoc/boloc"
import TimKiemTheoKhuVuc from "../TimKiemTheoKhuVuc/timkiem"
import YeuThichDropdown from "../LuuBai/YeuThich";
import ThongBaoDropdown from "../ThongBao/Thongbaoo";
import { getAllNotifications, markAsRead, markAllAsRead } from "../DaTa/dulieuThongBao";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [openBoLoc, setOpenBoLoc] = React.useState(false);
  const [openTimKiem, setOpenTimKiem] = React.useState(false);
  const [openNotify, setOpenNotify] = React.useState(false);
  const [openFav, setOpenFav] = React.useState(false);
  const [openProfile, setOpenProfile] = React.useState(false);
  
  // Thêm refs để kiểm tra click outside
  const profileRef = React.useRef(null);
  const notifyRef = React.useRef(null);
  const favRef = React.useRef(null);

  // Thông báo: đồng bộ với kho dữ liệu chung trong dulieuThongBao
  const [notifications, setNotifications] = React.useState(() => getAllNotifications());

  React.useEffect(() => {
    function onStorage() {
      setNotifications(getAllNotifications());
    }
    window.addEventListener("storage", onStorage);
    const interval = setInterval(() => {
      setNotifications(getAllNotifications());
    }, 1000);
    return () => {
      window.removeEventListener("storage", onStorage);
      clearInterval(interval);
    };
  }, []);

  // Sửa lại logic đóng dropdown khi click outside
  React.useEffect(() => {
    function handleClickOutside(event) {
      // Kiểm tra click có nằm ngoài dropdown thông báo không
      if (openNotify && notifyRef.current && !notifyRef.current.contains(event.target)) {
        setOpenNotify(false);
      }
      
      // Kiểm tra click có nằm ngoài dropdown yêu thích không
      if (openFav && favRef.current && !favRef.current.contains(event.target)) {
        setOpenFav(false);
      }
      
      // Kiểm tra click có nằm ngoài dropdown profile không
      if (openProfile && profileRef.current && !profileRef.current.contains(event.target)) {
        setOpenProfile(false);
      }
    }

    // Chỉ thêm event listener khi có dropdown nào đó mở
    if (openNotify || openFav || openProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openNotify, openFav, openProfile]);

  // Đóng tất cả popup/modal khi chuyển route để tránh che phủ nội dung trang mới
  React.useEffect(() => {
    setOpenBoLoc(false);
    setOpenTimKiem(false);
    setOpenNotify(false);
    setOpenFav(false);
    setOpenProfile(false);
  }, [location.pathname]);

  const loadSavedPosts = () => {
    try {
      const ids = JSON.parse(localStorage.getItem("savedPosts") || "[]");
      const detailsMap = JSON.parse(localStorage.getItem("savedPostsDetails") || "{}");
      return ids.map(id => ({ id, ...(detailsMap[id] || {}) }));
    } catch (_) {
      return [];
    }
  };
  const [favorites, setFavorites] = React.useState(loadSavedPosts);

  React.useEffect(() => {
    function handleStorage(e) {
      if (e.key === "savedPosts" || e.key === "savedPostsDetails") {
        setFavorites(loadSavedPosts());
      }
    }
    const handleSavedPostsUpdated = () => setFavorites(loadSavedPosts());
    window.addEventListener("storage", handleStorage);
    window.addEventListener("saved-posts-updated", handleSavedPostsUpdated);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("saved-posts-updated", handleSavedPostsUpdated);
    };
  }, []);

  // Đóng các popup bằng phím Escape
  React.useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setOpenBoLoc(false);
        setOpenTimKiem(false);
        setOpenNotify(false);
        setOpenFav(false);
        setOpenProfile(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // State để lưu thông tin khu vực được chọn
  const [selectedArea, setSelectedArea] = React.useState({
    province: "Hà Nội",
    district: "Quận Tây Hồ",
    ward: "Tất cả"
  });

  // State để lưu loại bài đăng được chọn
  const [selectedCategory, setSelectedCategory] = React.useState(() => {
    // Xác định loại hiện tại dựa trên URL
    const pathname = window.location.pathname;
    if (pathname === "/phong-tro-da-dang-nhap") return "Phòng trọ";
    if (pathname === "/nha-nguyen-can-da-dang-nhap") return "Nhà nguyên căn";
    if (pathname === "/o-ghep-da-dang-nhap") return "Ở ghép";
    return "all";
  });

  // Hàm xử lý khi chọn loại bài đăng
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    // Chuyển hướng đến trang tương ứng (dùng chung với Chuyentrang)
    switch(category) {
      case "Phòng trọ":
        navigate("/phong-tro-da-dang-nhap");
        break;
      case "Nhà nguyên căn":
        navigate("/nha-nguyen-can-da-dang-nhap");
        break;
      case "Ở ghép":
        navigate("/o-ghep-da-dang-nhap");
        break;
      case "all":
      default:
        navigate("/trang-chu-da-dang-nhap");
        break;
    }
  };

  return (
    <>

      <header style={{
        background: "#fff",
        borderBottom: "1px solid #e0e0e0",
        padding: "12px 24px 0 24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        // position: 'fixed',
        // width: '100%'
      }}>
        {/* Hàng 1: Logo - Menu - Action */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "8px",
          gap: 18
        }}>
          {/* Logo */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            minWidth: 90,
            marginRight: 12,
            cursor: 'pointer'
          }} onClick={() => navigate('/trang-chu-da-dang-nhap')}>
            <img src="/anh/Logotrang.png" alt="Motel Home" style={{ height: 60, marginBottom: 1 }} />
            <div style={{
              fontSize: "10px",
              color: "#888",
              marginTop: "1px",
              fontWeight: 500
            }}>

            </div>
          </div>
          {/* Menu giữa */}
          <div style={{
            display: "flex",
            gap: 10
          }}>
            <button 
              onClick={() => handleCategorySelect("all")}
              style={{
                padding: "0 10px",
                border: "none",
                borderRadius: "12px",
                background: selectedCategory === "all" ? "#e3f2fd" : "#fff",
                color: selectedCategory === "all" ? "#1976d2" : "#222",
                fontSize: "15px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s cubic-bezier(.4,2,.6,1)",
                boxShadow: "0 4px 8px rgba(0,0,0,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                height: "36px",
                minWidth: 0
              }}
              onMouseEnter={e => {
                if (selectedCategory !== "all") {
                  e.target.style.background = "#f5f5f5";
                }
                e.target.style.transform = "translateY(-1.5px)";
                e.target.style.boxShadow = "0 6px 16px rgba(25,118,210,0.10)";
              }}
              onMouseLeave={e => {
                e.target.style.background = selectedCategory === "all" ? "#e3f2fd" : "#fff";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.12)";
              }}>
              <span style={{ fontSize: 18, display: 'flex', alignItems: 'center' }}>🏠</span>
              Tất cả
            </button>
            <button 
              onClick={() => handleCategorySelect("Phòng trọ")}
              style={{
                padding: "0 10px",
                border: "none",
                borderRadius: "12px",
                background: selectedCategory === "Phòng trọ" ? "#e3f2fd" : "#fff",
                color: selectedCategory === "Phòng trọ" ? "#1976d2" : "#222",
                fontSize: "15px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s cubic-bezier(.4,2,.6,1)",
                boxShadow: "0 4px 8px rgba(0,0,0,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                height: "36px",
                minWidth: 0
              }}
              onMouseEnter={e => {
                if (selectedCategory !== "Phòng trọ") {
                  e.target.style.background = "#f5f5f5";
                }
                e.target.style.transform = "translateY(-1.5px)";
                e.target.style.boxShadow = "0 6px 16px rgba(25,118,210,0.10)";
              }}
              onMouseLeave={e => {
                e.target.style.background = selectedCategory === "Phòng trọ" ? "#e3f2fd" : "#fff";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.12)";
              }}>
              <span style={{ fontSize: 18, display: 'flex', alignItems: 'center' }}><i class="bi bi-house-door"></i></span>
              Phòng trọ
            </button>
            <button 
              onClick={() => handleCategorySelect("Nhà nguyên căn")}
              style={{
                padding: "0 10px",
                border: "none",
                borderRadius: "12px",
                background: selectedCategory === "Nhà nguyên căn" ? "#e3f2fd" : "#fff",
                color: selectedCategory === "Nhà nguyên căn" ? "#1976d2" : "#222",
                fontSize: "15px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s cubic-bezier(.4,2,.6,1)",
                boxShadow: "0 4px 8px rgba(0,0,0,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                height: "36px",
                minWidth: 0
              }}
              onMouseEnter={e => {
                if (selectedCategory !== "Nhà nguyên căn") {
                  e.target.style.background = "#f5f5f5";
                }
                e.target.style.transform = "translateY(-1.5px)";
                e.target.style.boxShadow = "0 6px 16px rgba(25,118,210,0.10)";
              }}
              onMouseLeave={e => {
                e.target.style.background = selectedCategory === "Nhà nguyên căn" ? "#e3f2fd" : "#fff";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.12)";
              }}>
              <span style={{ fontSize: 18, display: 'flex', alignItems: 'center' }}><i class="bi bi-houses"></i></span>
              Nhà nguyên căn
            </button>
            <button 
              onClick={() => handleCategorySelect("Ở ghép")}
              style={{
                padding: "0 10px",
                border: "none",
                borderRadius: "12px",
                background: selectedCategory === "Ở ghép" ? "#e3f2fd" : "#fff",
                color: selectedCategory === "Ở ghép" ? "#1976d2" : "#222",
                fontSize: "15px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s cubic-bezier(.4,2,.6,1)",
                boxShadow: "0 4px 8px rgba(0,0,0,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
                height: "36px",
                minWidth: 0
              }}
              onMouseEnter={e => {
                if (selectedCategory !== "Ở ghép") {
                  e.target.style.background = "#f5f5f5";
                }
                e.target.style.transform = "translateY(-1.5px)";
                e.target.style.boxShadow = "0 6px 16px rgba(25,118,210,0.10)";
              }}
              onMouseLeave={e => {
                e.target.style.background = selectedCategory === "Ở ghép" ? "#e3f2fd" : "#fff";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.12)";
              }}>
              <span style={{ fontSize: 18, display: 'flex', alignItems: 'center' }}><i class="bi bi-people-fill"></i></span>
              Tìm người ở ghép
            </button>
          </div>
          {/* Action phải */}
          <div style={{
            display: "flex",
            gap: 10,
            alignItems: "center",
            minWidth: 180,
            marginLeft: 12
          }}>
            {/* Trang quản lý */}
            <button
              style={{
                padding: "0 10px",
                border: "none",
                borderRadius: "20px",
                background: "#fff",
                color: "#222",
                fontSize: "16px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s cubic-bezier(.4,2,.6,1)",
                boxShadow: "0 4px 8px rgba(0,0,0,0.12)",
                height: "36px",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}
              onClick={() => navigate("/dang-bai")}
              onMouseEnter={e => {
                e.target.style.background = "#f5f5f5";
                e.target.style.transform = "translateY(-1.5px)";
                e.target.style.boxShadow = "0 6px 16px rgba(25,118,210,0.10)";
              }}
              onMouseLeave={e => {
                e.target.style.background = "#fff";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.12)";
              }}
            >
              <span style={{ fontSize: 18 }}><i class="bi bi-grid-fill"></i></span>
              Trang quản lý
            </button>

            {/* Thêm ref cho dropdown thông báo */}
            <div style={{ position: "relative" }} ref={notifyRef}>
              <button
                onClick={() => setOpenNotify(v => !v)}
                style={{
                  padding: "0 10px",
                  border: "none",
                  borderRadius: "12px",
                  background: "#fff",
                  color: "#222",
                  fontSize: "15px",
                  fontWeight: 600,
                  cursor: "pointer",
                  transition: "all 0.2s cubic-bezier(.4,2,.6,1)",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.12)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  height: "36px",
                  minWidth: 0,
                  position: "relative"
                }}
                onMouseEnter={e => {
                  e.target.style.background = "#f5f5f5";
                  e.target.style.transform = "translateY(-1.5px)";
                  e.target.style.boxShadow = "0 6px 16px rgba(25,118,210,0.10)";
                }}
                onMouseLeave={e => {
                  e.target.style.background = "#fff";
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.12)";
                }}
              >
                <span style={{ fontSize: 18 }}>🔔</span>
                {notifications.some(n => !n.isRead) && (
                  <span style={{
                    position: "absolute",
                    top: -2,
                    right: -2,
                    minWidth: 16,
                    height: 16,
                    padding: "0 4px",
                    borderRadius: 10,
                    background: "#d93025",
                    color: "#fff",
                    fontSize: 11,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    lineHeight: 1
                  }}>{notifications.filter(n => !n.isRead).length}</span>
                )}
              </button>
              <ThongBaoDropdown
                open={openNotify}
                onClose={() => setOpenNotify(false)}
                notifications={notifications}
                onItemClick={(id) => {
                  const updated = markAsRead(id);
                  setNotifications(updated);
                }}
                onMarkAllRead={() => {
                  const updated = markAllAsRead();
                  setNotifications(updated);
                }}
              />
            </div>

            {/* Thêm ref cho dropdown yêu thích */}
            <div style={{ position: "relative" }} ref={favRef}>
              <button style={{
                padding: "0 10px",
                border: "none",
                borderRadius: "12px",
                background: "#fff",
                color: "#e53935",
                fontSize: "15px",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.2s cubic-bezier(.4,2,.6,1)",
                boxShadow: "0 4px 8px rgba(0,0,0,0.12)",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                height: "36px",
                minWidth: 0,
                position: "relative"
              }}
                onClick={() => setOpenFav(v => !v)}
                onMouseEnter={e => {
                  e.target.style.background = "#f5f5f5";
                  e.target.style.transform = "translateY(-1.5px)";
                  e.target.style.boxShadow = "0 6px 10px rgba(25,118,210,0.10)";
                }}
                onMouseLeave={e => {
                  e.target.style.background = "#fff";
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.12)";
                }}>
                <span style={{ fontSize: 18 }}>❤️</span>
                {favorites.length > 0 && (
                  <span style={{
                    position: "absolute",
                    top: -2,
                    right: -2,
                    minWidth: 16,
                    height: 16,
                    padding: "0 4px",
                    borderRadius: 10,
                    background: "#d93025",
                    color: "#fff",
                    fontSize: 11,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    lineHeight: 1
                  }}>{favorites.length}</span>
                )}
              </button>
              <YeuThichDropdown
                open={openFav}
                onClose={() => setOpenFav(false)}
                items={favorites}
                onItemClick={(id) => {
                  setOpenFav(false);
                  // Điều hướng tới chi tiết bài viết
                  navigate(`/xem-bai-dang/${id}`);
                }}
              />
            </div>

            {/* Avatar hình tròn */}
            <div style={{ position: "relative", display: "inline-block" }} ref={profileRef} onClick={e => e.stopPropagation()}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background: "#e5e7eb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  marginRight: 2,
                  cursor: "pointer"
                }}
                onClick={() => setOpenProfile(prev => !prev)}
              >
                <img
                  src="/anh/avt.jpg"
                  alt="avatar"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              {openProfile && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "calc(100% + 8px)",
                    width: 340,
                    background: "#fff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    borderRadius: 8,
                    zIndex: 100,
                    padding: 16
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <img src="/anh/avt.jpg" alt="avatar" style={{ width: 48, height: 48, borderRadius: "50%" }} />
                    <div>
                      <div style={{ fontWeight: "bold", fontSize: 16 }}>Hehe</div>
                      <div style={{ color: "#000000ff", fontSize: 14 }}>0878772943</div>
                    </div>
                  </div>
                  <div
                    style={{
                      marginTop: 16,
                      background: "#f5f5f5",
                      padding: 12,
                      borderRadius: 6,
                      border: "1px solid #000",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 13, color: "#000000ff" }}>Số dư tài khoản:</div>
                      <div style={{ fontWeight: "bold", fontSize: 16 }}>100.000 VND</div>
                    </div>
                    <button
                      style={{
                        padding: "10px 12px",
                        background: "#2196f3",
                        color: "#fff",
                        border: "none",
                        borderRadius: 15,
                        fontSize: 13,
                        cursor: "pointer"
                      }}
                      onClick={() => {
                        setOpenProfile(false);
                        navigate("/nap-tien");
                      }}
                    >
                      Nạp tiền
                      <span style={{
                        marginLeft: "6px",
                        color: "#070707ff",
                        fontSize: 18,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                        <i className="bi bi-credit-card-2-back"></i>
                      </span>
                    </button>
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <div
                      style={{
                        alignItems: "center",
                        padding: "8px 0",
                        cursor: "pointer",
                        fontWeight: "bold",
                        display: "flex"
                      }}
                      onClick={() => {
                        setOpenProfile(false);
                        navigate("/thong-tin-ca-nhan");
                      }}
                    >
                      <i className="bi bi-person-fill" style={{ fontSize: 22, marginRight: 8 }}></i>
                      Thông tin cá nhân
                    </div>
                    <div
                      style={{
                        padding: "8px 0",
                        fontWeight: "bold",
                        cursor: "pointer",
                        display: "flex"
                      }}
                      onClick={() => {
                        setOpenProfile(false);
                        navigate("/lien-he-tro-giup");
                      }}
                    >
                      <i className="bi bi-question-circle" style={{ fontSize: 22, marginRight: 8 }}></i>
                      Liên hệ và trợ giúp
                    </div>
                    <div
                      style={{
                        padding: "8px 0",
                        cursor: "pointer",
                        color: "#000000ff",
                        fontWeight: "bold",
                        display: "flex"
                      }}
                      onClick={() => {
                        setOpenProfile(false);
                        // Tùy ý: xóa token đăng nhập nếu có
                        try { localStorage.removeItem("authToken"); } catch (_) {}
                        navigate("/");
                      }}
                    >
                      <i className="bi bi-box-arrow-left" style={{ color: " #000000ff", fontSize: 20, marginRight: 8 }}></i>
                      Đăng xuất
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Đăng bài */}
            <button style={{
              padding: "0 10px",
              border: "none",
              borderRadius: "12px",
              background: "#fff",
              color: "#222",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s cubic-bezier(.4,2,.6,1)",
              boxShadow: "0 4px 8px rgba(0,0,0,0.12)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              height: "36px",
              minWidth: 0
            }}
              onClick={() => navigate("/dang-bai")}
              onMouseEnter={e => {
                e.target.style.background = "#f5f5f5";
                e.target.style.transform = "translateY(-1.5px)";
                e.target.style.boxShadow = "0 6px 16px rgba(25,118,210,0.10)";
              }}
              onMouseLeave={e => {
                e.target.style.background = "#fff";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.12)";
              }}>
              <span style={{ fontSize: 18 }}><i class="bi bi-postcard"></i></span>
              Đăng bài
            </button>
          </div>
        </div>
        {/* Hàng 2: Thanh tìm kiếm và bộ lọc */}
        <div style={{
          display: "flex",
          gap: "16px",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 0 8px 0"
        }}>
          <div style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            minWidth: 340,
            flex: 1,
            maxWidth: 420
          }}
            onClick={() => {
              setOpenTimKiem(true);
            }}
          >
            <input
              type="text"
              placeholder="Tìm kiếm"
              style={{
                padding: "8px 16px",
                paddingRight: "44px",
                borderRadius: "16px",
                border: "1px solid #e0e0e0",
                fontSize: "16px",
                width: "100%",
                outline: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.10)",
                fontWeight: 300,
                height: "36px",
                boxSizing: "border-box"
              }}
            />
            <span style={{
              position: "absolute",
              right: "16px",
              color: "#222",
              fontSize: "18px"
            }}>
              🔍
            </span>
          </div>
          <button
            onClick={() => {
              console.log("Button clicked!");
              setOpenBoLoc(true);
            }}
            style={{
              padding: "0 16px",
              border: "none",
              borderRadius: "16px",
              background: "#fff",
              color: "#222",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s cubic-bezier(.4,2,.6,1)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.13)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              height: "36px"
            }}
            onMouseEnter={e => {
              e.target.style.background = "#f5f5f5";
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 24px rgba(25,118,210,0.13)";
            }}
            onMouseLeave={e => {
              e.target.style.background = "#fff";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.13)";
            }}>
            Bộ lọc
            <span style={{ fontSize: 18 }}>⏳</span>
          </button>
        </div>
      </header>

      <ModalBoLoc open={openBoLoc} onClose={() => setOpenBoLoc(false)}>
        <BoLoc
          onClose={() => setOpenBoLoc(false)}
          selectedArea={selectedArea}
          onAreaChange={setSelectedArea}
        />
      </ModalBoLoc>

      <ModalTimKiem open={openTimKiem} onClose={() => setOpenTimKiem(false)}>
        <TimKiemTheoKhuVuc
          onClose={() => setOpenTimKiem(false)}
          onSelect={(result) => {
            console.log('Kết quả tìm kiếm:', result);
            // Cập nhật thông tin khu vực vào bộ lọc
            if (result.province && result.district) {
              setSelectedArea({
                province: result.province,
                district: result.district,
                ward: "Tất cả" // Mặc định là "Tất cả" cho phường xã
              });
            }
            setOpenTimKiem(false);
          }}
        />
      </ModalTimKiem>
    </>
  );
}

export default Header;