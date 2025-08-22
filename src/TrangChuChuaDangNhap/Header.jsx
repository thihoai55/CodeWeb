import React from "react";
import { useNavigate } from "react-router-dom";
import ModalBoLoc from "../ModalBoLoc/modal_boloc"
import ModalTimKiem from "../ModalTimKiem/modal_timkiem"
import BoLoc from "../BoLoc/boloc"
import TimKiemTheoKhuVuc from "../TimKiemTheoKhuVuc/timkiem"

function Header() {
  const navigate = useNavigate();
  const [openBoLoc, setOpenBoLoc] = React.useState(false);
  const [openTimKiem, setOpenTimKiem] = React.useState(false);
  
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
    if (pathname === "/phong-tro") return "Phòng trọ";
    if (pathname === "/nha-nguyen-can") return "Nhà nguyên căn";
    if (pathname === "/o-ghep") return "Ở ghép";
    return "all";
  });

  // Hàm xử lý khi chọn loại bài đăng
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    // Chuyển hướng đến trang tương ứng
    switch(category) {
      case "Phòng trọ":
        navigate("/phong-tro");
        break;
      case "Nhà nguyên căn":
        navigate("/nha-nguyen-can");
        break;
      case "Ở ghép":
        navigate("/o-ghep");
        break;
      case "all":
      default:
        navigate("/");
        break;
    }
  };

  return (
    <>
      <header style={{
        background: "#fff",
        borderBottom: "1px solid #e0e0e0",
        padding: "12px 24px 0 24px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
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
            cursor: "pointer"
          }}
            onClick={() => navigate("/")}
          >
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
              <span style={{fontSize: 18, display: 'flex', alignItems: 'center'}}>🏠</span>
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
              <i className="bi bi-grid-fill" style={{fontSize: 18, display: 'flex', alignItems: 'center'}}></i>
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
              <span style={{fontSize: 18, display: 'flex', alignItems: 'center'}}>🏢</span>
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
              <span style={{fontSize: 18, display: 'flex', alignItems: 'center'}}>👥</span>
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
            <button
              onClick={() => navigate("/dang-nhap")}
              style={{
                padding: "0 8px",
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
              <span style={{fontSize: 18, verticalAlign: 'middle', lineHeight: 1.1, display: 'inline-block', marginTop: '1px'}}>🔔</span>
            </button>
            <button style={{
              padding: "0 8px",
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
              minWidth: 0
            }}
            onMouseEnter={e => {
              e.target.style.background = "#f5f5f5";
              e.target.style.transform = "translateY(-1.5px)";
              e.target.style.boxShadow = "0 4px 10px rgba(25,118,210,0.10)";
            }}
            onMouseLeave={e => {
              e.target.style.background = "#fff";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.12)";
            }}>
              <span style={{fontSize: 18, verticalAlign: 'middle', lineHeight: 1.1, display: 'inline-block', marginTop: '1px'}}>❤️</span>
            </button>
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
            onClick={() => navigate("/dang-ky")}
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
              <span style={{fontSize: 16, verticalAlign: 'middle', lineHeight: 1.1, display: 'inline-block', marginTop: '1px'}}>➕</span>
              Đăng ký
            </button>
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
            onClick={() => navigate("/dang-nhap")}
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
              <span style={{fontSize: 16, verticalAlign: 'middle', lineHeight: 1.1, display: 'inline-block', marginTop: '1px'}}>📥</span>
              Đăng nhập
            </button>
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
            onClick={() => navigate("/dang-nhap")}
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
              <span style={{fontSize: 16, verticalAlign: 'middle', lineHeight: 1.1, display: 'inline-block', marginTop: '1px'}}>📝</span>
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
          <div 
            style={{
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
            // onClick={() => navigate("/bo-loc")}
            onMouseEnter={e => {
              e.target.style.background = "#f5f5f5";
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 8px 24px rgba(25,118,210,0.13)";
            }}
            onMouseLeave={e => {
              e.target.style.background = "#fff";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.13)";
            }}
          >
            Bộ lọc
            <span style={{fontSize: 18}}>⏳</span>
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