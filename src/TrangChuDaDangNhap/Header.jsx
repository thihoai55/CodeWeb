import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
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
          marginRight: 12
        }}>
          <img src="/logo.png" alt="Motel Home" style={{height: 32, marginBottom: 1}} />
          <div style={{
            fontSize: "11px",
            color: "#888",
            marginTop: "1px",
            fontWeight: 500
          }}>
            NƠI TÌM CHỖ Ở VIỆT NAM
          </div>
        </div>
        {/* Menu giữa */}
        <div style={{
          display: "flex",
          gap: 10
        }}>
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
            justifyContent: "center",
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
          }}>
            <span style={{fontSize: 18, display: 'flex', alignItems: 'center'}}><i class="bi bi-house-door"></i></span>
            Phòng trọ
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
            justifyContent: "center",
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
          }}>
            <span style={{fontSize: 18, display: 'flex', alignItems: 'center'}}><i class="bi bi-houses"></i></span>
            Nhà nguyên căn
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
            justifyContent: "center",
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
          }}>
            <span style={{fontSize: 18, display: 'flex', alignItems: 'center'}}><i class="bi bi-people-fill"></i></span>
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
            // onClick={() => navigate("/quan-ly")}
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
            <span style={{fontSize: 18}}><i class="bi bi-grid-fill"></i></span>
            Trang quản lý
          </button>

          {/* Icon thông báo */}
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
            {/* , verticalAlign: 'middle', lineHeight: 1.1, display: 'inline-block', marginTop: '1px' */}
            <span style={{fontSize: 18}}>🔔</span>
          </button>
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
            <span style={{fontSize: 18}}>❤️</span>
          </button>

          {/* Avatar hình tròn */}
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
              marginRight: 2
            }}
            >
            <img
              src="/anh/avt.jpg"
              alt="avatar"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
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
            <span style={{fontSize: 18}}><i class="bi bi-postcard"></i></span>
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
        }}>
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
        <button style={{
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
          <span style={{fontSize: 18}}>⏳</span>
        </button>
      </div>
    </header>
  );
}

export default Header;