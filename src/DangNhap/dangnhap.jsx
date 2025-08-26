import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { accounts } from '../DaTa/account.js';

const googleIcon = "anh/gg.jpg";
const facebookIcon = "anh/fb.png";
const appleIcon = "anh/apple.png";

const DangNhap = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("login"); // "login" hoặc "register"
  const [email, setEmail] = useState("");
  const [matKhau, setMatKhau] = useState("");

  // State cho form đăng ký
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerRePassword, setRegisterRePassword] = useState("");
  const [registerRole, setRegisterRole] = useState("");
  const [registerAgree, setRegisterAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // Hàm đăng nhập sử dụng toán tử 3 ngôi
  const loginWithTernary = (identifier, password) => {
    // Validation đầu vào
    if (!identifier || !password) {
      return { 
        success: false, 
        message: "Vui lòng nhập đầy đủ thông tin đăng nhập!" 
      };
    }

    // Loại bỏ khoảng trắng thừa
    const cleanIdentifier = identifier.trim();
    const cleanPassword = password.trim();

    // Tìm account trong danh sách
    const account = accounts.find(acc => 
      acc.username === cleanIdentifier || 
      acc.email === cleanIdentifier || 
      acc.phone === cleanIdentifier
    );
    
    // Sử dụng toán tử 3 ngôi để kiểm tra đăng nhập
    return account 
      ? (account.password === cleanPassword 
          ? { 
              success: true, 
              account: {
                username: account.username,
                role: account.role,
                name: account.name,
                phone: account.phone,
                email: account.email
              }, 
              message: "Đăng nhập thành công!" 
            }
          : { success: false, message: "Mật khẩu không đúng!" })
      : { success: false, message: "Tài khoản không tồn tại!" };
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !matKhau) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    
    // Kiểm tra đăng nhập với data thực tế
    const loginResult = loginWithTernary(email, matKhau);
    
    if (loginResult.success) {
      setError("");
      // Lấy thông tin đầy đủ từ accounts để có số dư
      const fullAccount = accounts.find(acc => acc.username === loginResult.account.username);
      
      // Lưu thông tin đăng nhập
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userInfo', JSON.stringify(loginResult.account));
      localStorage.setItem('userRole', loginResult.account.role);
      
      // Lưu thêm số dư tài khoản nếu có
      if (fullAccount) {
        localStorage.setItem('userBalance', fullAccount.balance.toString());
      }
      
      // Chuyển hướng dựa trên role
      if (loginResult.account.role === "admin") {
        navigate("/admin/dashboard"); // Chuyển đến trang chủ admin
      } else if (loginResult.account.role === "host") {
        navigate("/trang-quan-ly");
      } else {
        navigate("/trang-chu-da-dang-nhap");
      }
    } else {
      setError(loginResult.message);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Validation đăng ký
    if (!registerPhone || !registerEmail || !registerPassword || !registerRePassword || !registerRole) {
      setError("Vui lòng nhập đầy đủ thông tin đăng ký!");
      return;
    }
    
    if (registerPassword !== registerRePassword) {
      setError("Mật khẩu nhập lại không khớp!");
      return;
    }
    
    if (!registerAgree) {
      setError("Vui lòng đồng ý với điều khoản!");
      return;
    }
    
    // Kiểm tra email và số điện thoại đã tồn tại chưa
    const existingAccount = accounts.find(acc => 
      acc.email === registerEmail || acc.phone === registerPhone
    );
    
    if (existingAccount) {
      setError("Email hoặc số điện thoại đã được sử dụng!");
      return;
    }
    
    // Đăng ký thành công
    setError("");
    localStorage.setItem('isLoggedIn', 'true');
    navigate("/trang-chu-da-dang-nhap");
  };


  const inputWidth = 340;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: `url('https://i.ex-cdn.com/vietnamfinance.vn/files/content/2024/10/13/to-ng-ho-p-ca-c-khu-do-thi-ven-so-ng-sa-i-go-n-tp-hcm-1257.jpeg') center/cover no-repeat`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "rgba(255,255,255,0.1)",
          borderRadius: 18,
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          padding: "32px 32px 24px 32px",
          minWidth: inputWidth + 40,
          maxWidth: "90vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backdropFilter: "blur(5px)",
          marginTop: 70,
          marginBottom: 50,
        }}
      >
        {/* Logo */}
        <div
          style={{
            background: "rgba(255,255,255,0.5)",
            borderRadius: 16,
            // padding: "5px",
            marginBottom: 8,
            marginTop: -8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            maxHeight: 50,
            // maxWidth: 150,
          }}
        >
          <img
            src="/anh/logotachnen.png"
            alt="Motel Home"
            style={{
              height: 50,
              width: 150,
              objectFit: "contain",
              display: "block",
            }}
          />
        </div>
        {/* Tabs */}
        <div
          style={{
            display: "flex",
            width: "100%",
            marginBottom: 18,
            borderBottom: "2px solid #e0e0e0",
          }}
        >
          <div
            style={{
              flex: 1,
              textAlign: "center",
              fontWeight: 700,
              fontSize: 24,
              padding: "8px 0",
              borderBottom: tab === "login" ? "2.5px solid #2a2afc" : "none",
              color: tab === "login" ? "#222" : "#888",
              cursor: "pointer",
              letterSpacing: 1,
              transition: "color 0.2s, border-bottom 0.2s",
            }}
            onClick={() => setTab("login")}
          >
            Đăng Nhập
          </div>
          <div
            style={{
              flex: 1,
              textAlign: "center",
              fontWeight: 700,
              fontSize: 24,
              padding: "8px 0",
              borderBottom: tab === "register" ? "2.5px solid #2a2afc" : "none",
              color: tab === "register" ? "#222" : "#888",
              cursor: "pointer",
              letterSpacing: 1,
              transition: "color 0.2s, border-bottom 0.2s",
            }}
            onClick={() => setTab("register")}
          >
            Đăng Ký
          </div>
        </div>
        {/* Form */}
        {tab === "login" ? (
          // --- FORM ĐĂNG NHẬP ---
          <form
            onSubmit={handleLogin}
            style={{
              width: inputWidth,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {error && (
              <div
                style={{
                  color: "#e53935",
                  background: "#fff3f3",
                  borderRadius: 6,
                  padding: "8px 12px",
                  textAlign: "center",
                  fontWeight: 500,
                  marginBottom: 4,
                }}
              >
                {error}
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontWeight: 700, color: "#222", fontSize: 20 }}>
                Email hoặc số điện thoại:
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email hoặc số điện thoại"
                style={{
                  width: "100%",
                  padding: "12px 20px",
                  borderRadius: 8,
                  border: "1.5px solid #bdbdbd",
                  fontSize: 18,
                  fontWeight: 400,
                  outline: "none",
                  background: "#fff",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontWeight: 700, color: "#222", fontSize: 20 }}>
                Mật khẩu:
              </label>
              <input
                type="password"
                value={matKhau}
                onChange={(e) => setMatKhau(e.target.value)}
                placeholder="Mật khẩu"
                style={{
                  width: "100%",
                  padding: "12px 20px",
                  borderRadius: 8,
                  border: "1.5px solid #bdbdbd",
                  fontSize: 18,
                  fontWeight: 400,
                  outline: "none",
                  background: "#fff",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                background: "#4fc3f7",
                color: "#222",
                fontWeight: 700,
                fontSize: 20,
                border: "none",
                borderRadius: 8,
                padding: "12px 20px",
                marginTop: 10,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(44,62,80,0.08)",
                transition: "background 0.2s",
                letterSpacing: 1,
              }}
            >
              Đăng nhập
            </button>
          </form>
        ) : (
          // --- FORM ĐĂNG KÝ ---
          <form
            onSubmit={handleRegister}
            style={{
              width: inputWidth,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {error && (
              <div
                style={{
                  color: "#e53935",     
                  background: "#fff3f3",
                  borderRadius: 6,
                  padding: "8px 12px",
                  textAlign: "center",
                  fontWeight: 500,
                  marginBottom: 4,
                }}
              >
                {error}
              </div>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontWeight: 700, color: "#222", fontSize: 20 }}>
                Số điện thoại:
              </label>
              <input
                type="text"
                value={registerPhone}
                onChange={e => setRegisterPhone(e.target.value)}
                placeholder="Số điện thoại"
                style={{
                  width: "100%",
                  padding: "12px 20px",
                  borderRadius: 8,
                  border: "1.5px solid #bdbdbd",
                  fontSize: 18,
                  fontWeight: 400,
                  outline: "none",
                  background: "#fff",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontWeight: 700, color: "#222", fontSize: 20 }}>
                Email:
              </label>
              <input
                type="email"
                value={registerEmail}
                onChange={e => setRegisterEmail(e.target.value)}
                placeholder="Email"
                style={{
                  width: "100%",
                  padding: "12px 20px",
                  borderRadius: 8,
                  border: "1.5px solid #bdbdbd",
                  fontSize: 18,
                  fontWeight: 400,
                  outline: "none",
                  background: "#fff",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontWeight: 700, color: "#222", fontSize: 20 }}>
                Mật khẩu:
              </label>
              <input
                type="password"
                value={matKhau}
                onChange={(e) => setMatKhau(e.target.value)}
                placeholder="Mật khẩu"
                style={{
                  width: "100%",
                  padding: "12px 20px",
                  borderRadius: 8,
                  border: "1.5px solid #bdbdbd",
                  fontSize: 18,
                  fontWeight: 400,
                  outline: "none",
                  background: "#fff",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontWeight: 700, color: "#222", fontSize: 20 }}>
                Nhập lại mật khẩu:
              </label>
              <input
                type="password"
                value={registerRePassword}
                onChange={e => setRegisterRePassword(e.target.value)}
                placeholder="Nhập lại mật khẩu"
                style={{
                  width: "100%",
                  padding: "12px 20px",
                  borderRadius: 8,
                  border: "1.5px solid #bdbdbd",
                  fontSize: 18,
                  fontWeight: 400,
                  outline: "none",
                  background: "#fff",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontWeight: 700, color: "#222", fontSize: 20 }}>
                Chọn vai trò:
              </label>
              <select
                value={registerRole}
                onChange={e => setRegisterRole(e.target.value)}
                style={{
                  width: "100%",
                  padding: "12px 20px",
                  borderRadius: 8,
                  border: "1.5px solid #bdbdbd",
                  fontSize: 18,
                  fontWeight: 400,
                  outline: "none",
                  background: "#fff",
                  boxSizing: "border-box",
                  appearance: "none",
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  backgroundImage:
                    "url('data:image/svg+xml;utf8,<svg fill=\\'gray\\' height=\\'20\\' viewBox=\\'0 0 24 24\\' width=\\'20\\' xmlns=\\'http://www.w3.org/2000/svg\\'><path d=\\'M7 10l5 5 5-5z\\'/></svg>')",
                  backgroundPosition: "right 16px center",
                  backgroundRepeat: "no-repeat",
                  border: "1.5px solid #bdbdbd",
                }}
              >
                <option value="">Chọn vai trò</option> 
                <option value="user">Người thuê</option>
                <option value="owner">Người cho thuê</option>
              </select>
            </div>

            <div style={{ margin: "10px 0" }}>
              <input
                type="checkbox"
                id="agree"
                checked={registerAgree}
                onChange={e => setRegisterAgree(e.target.checked)}
              />
              <label htmlFor="agree" style={{ marginLeft: 5 }}>
                Tôi đồng ý với Điều khoản và Chính sách về bảo mật và xử lý dữ liệu cá nhân
              </label>
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                background: "#4fc3f7",
                color: "#222",
                fontWeight: 700,
                fontSize: 20,
                border: "none",
                borderRadius: 8,
                padding: "12px 20px",
                marginTop: 10,
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(44,62,80,0.08)",
                transition: "background 0.2s",
                letterSpacing: 1,
              }}
            >
              Đăng ký
            </button>
          </form>
        )}
        <div
          style={{
            width: inputWidth,
            marginTop: 10,
            display: "flex",
            justifyContent: "space-between",
            fontSize: 15,
            color: "#222",
          }}
        >
          <a href="#" style={{ color: "#222", textDecoration: "none" }}>
            Quên mật khẩu ?
          </a>
        </div>
        <div
          style={{
            width: inputWidth,
            textAlign: "center",
            margin: "15px 0 10px 0",
            color: "#222", // màu đen
            fontWeight: 500,
            fontSize: 18,
          }}
        >
          Hoặc đăng nhập bằng
        </div>
        <div
          style={{
            display: "flex",
            gap: 32,
            justifyContent: "center",
            marginBottom: 4,
            width: inputWidth,
          }}
        >
          {/* Google */}
          <button
            type="button"
            style={{
              background: "#fff",
              border: "1.5px solid #e0e0e0",
              borderRadius: "50%",
              width: 54,
              height: 54,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(44,62,80,0.08)",
              transition: "box-shadow 0.2s",
              padding: 0,
              overflow: "hidden",
            }}
          >
            <img
              src={googleIcon}
              alt="Google"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </button>
          {/* Facebook */}
          <button
            type="button"
            style={{
              background: "#fff",
              border: "1.5px solid #e0e0e0",
              borderRadius: "50%",
              width: 54,
              height: 54,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(44,62,80,0.08)",
              transition: "box-shadow 0.2s",
              padding: 0,
              overflow: "hidden",
            }}
          >
            <img
              src={facebookIcon}
              alt="Facebook"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </button>
          {/* Apple */}
          <button
            type="button"
            style={{
              background: "#fff",
              border: "1.5px solid #e0e0e0",
              borderRadius: "50%",
              width: 54,
              height: 54,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 8px rgba(44,62,80,0.08)",
              transition: "box-shadow 0.2s",
              padding: 0,
              overflow: "hidden",
            }}
          >
            <img
              src={appleIcon}
              alt="Apple"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DangNhap;
