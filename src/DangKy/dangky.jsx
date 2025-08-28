import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { accounts as defaultAccounts } from "../DaTa/account";

const Register = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [role, setRole] = useState("");
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    // Validate cơ bản
    if (!phone || !email || !password || !rePassword || !role) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^0\d{9,10}$/; // 10-11 số, bắt đầu bằng 0
    if (!emailRegex.test(email.trim())) {
      setError("Email không hợp lệ!");
      return;
    }
    if (!phoneRegex.test(phone.trim())) {
      setError("Số điện thoại không hợp lệ!");
      return;
    }
    if (password.length < 6) {
      setError("Mật khẩu tối thiểu 6 ký tự!");
      return;
    }
    if (password !== rePassword) {
      setError("Mật khẩu nhập lại không khớp!");
      return;
    }
    if (!agree) {
      setError("Bạn phải đồng ý với điều khoản!");
      return;
    }

    // Lấy danh sách tài khoản hiện tại từ localStorage (ưu tiên) hoặc seed mặc định
    let existingAccounts = [];
    try {
      const local = localStorage.getItem('accounts');
      const updated = localStorage.getItem('updatedAccounts');
      if (updated) {
        existingAccounts = JSON.parse(updated) || [];
      } else if (local) {
        existingAccounts = JSON.parse(local) || [];
      } else {
        existingAccounts = Array.isArray(defaultAccounts) ? defaultAccounts : [];
      }
    } catch {
      existingAccounts = Array.isArray(defaultAccounts) ? defaultAccounts : [];
    }

    // Kiểm tra trùng email/phone
    const isDuplicate = existingAccounts.some(acc => acc.email === email.trim() || acc.phone === phone.trim());
    if (isDuplicate) {
      setError("Email hoặc số điện thoại đã tồn tại!");
      return;
    }

    // Map role từ select sang role hệ thống
    const mappedRole = role === 'owner' || role === 'host' ? 'host' : 'renter';

    // Tạo username đơn giản dựa trên email/phone, đảm bảo duy nhất
    const baseUsername = (email.split('@')[0] || `user${Date.now()}`).replace(/[^a-zA-Z0-9_]/g, '').slice(0, 20) || `user${Date.now()}`;
    let newUsername = baseUsername;
    let counter = 1;
    const usernameExists = (u) => existingAccounts.some(a => a.username === u);
    while (usernameExists(newUsername)) {
      newUsername = `${baseUsername}_${counter++}`;
    }

    const displayName = baseUsername || "Người dùng mới";

    const newAccount = {
      username: newUsername,
      password: password,
      role: mappedRole,
      name: displayName,
      phone: phone.trim(),
      email: email.trim(),
      balance: 0
    };

    const nextAccounts = [...existingAccounts, newAccount];
    localStorage.setItem('accounts', JSON.stringify(nextAccounts));
    localStorage.setItem('updatedAccounts', JSON.stringify(nextAccounts));

    // Lưu thông tin đăng nhập
    const userInfo = {
      username: newAccount.username,
      role: newAccount.role,
      name: newAccount.name,
      phone: newAccount.phone,
      email: newAccount.email,
      balance: newAccount.balance
    };
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    localStorage.setItem('userRole', newAccount.role);
    localStorage.setItem('userBalance', String(newAccount.balance));
    try { window.dispatchEvent(new Event('accountsUpdated')); } catch {}
    try { window.dispatchEvent(new Event('userInfoUpdated')); } catch {}
    setError("");
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
          background: "rgba(255,255,255,0.01)",
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
        <h2 style={{ textAlign: "center", fontWeight: 700, fontSize: 28, margin: "10px 0 18px 0", color: "#2a2afc" }}>
          Đăng Ký
        </h2>
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
          {/* Số điện thoại */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontWeight: 700, color: "#222", fontSize: 20 }}>
              Số điện thoại:
            </label>
            <input
              type="text"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="Số điện thoại"
              style={inputStyle}
            />
          </div>
          {/* Email */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontWeight: 700, color: "#222", fontSize: 20 }}>
              Email:
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Email"
              style={inputStyle}
            />
          </div>
          {/* Mật khẩu */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontWeight: 700, color: "#222", fontSize: 20 }}>
              Mật khẩu:
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Mật khẩu"
                style={inputStyle}
              />
              {/* {password && (
                <span
                  onClick={() => setShowPassword(v => !v)}
                  style={eyeIconStyle}
                  title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              )} */}
            </div>
          </div>
          {/* Nhập lại mật khẩu */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontWeight: 700, color: "#222", fontSize: 20 }}>
              Nhập lại mật khẩu:
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showRePassword ? "text" : "password"}
                value={rePassword}
                onChange={e => setRePassword(e.target.value)}
                placeholder="Nhập lại mật khẩu"
                style={inputStyle}
              />
              {/* {rePassword && (
                <span
                  onClick={() => setShowRePassword(v => !v)}
                  style={eyeIconStyle}
                  title={showRePassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showRePassword ? "🙈" : "👁️"}
                </span>
              )} */}
            </div>
          </div>
          {/* Chọn vai trò */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontWeight: 700, color: "#222", fontSize: 20 }}>
              Chọn vai trò:
            </label>
            <select
              value={role}
              onChange={e => setRole(e.target.value)}
              style={{
                ...inputStyle,
                appearance: "none",
                WebkitAppearance: "none",
                MozAppearance: "none",
                backgroundImage:
                  "url('data:image/svg+xml;utf8,<svg fill=\\'gray\\' height=\\'20\\' viewBox=\\'0 0 24 24\\' width=\\'20\\' xmlns=\\'http://www.w3.org/2000/svg\\'><path d=\\'M7 10l5 5 5-5z\\'/></svg>')",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 16px center",
                border: "1.5px solid #bdbdbd",
              }}
            >
              <option value="">Chọn vai trò</option>
              <option value="renter">Người thuê</option>
              <option value="host">Người cho thuê</option>
            </select>
          </div>
          {/* Checkbox đồng ý */}
          <div style={{ margin: "10px 0" }}>
            <input
              type="checkbox"
              id="agree"
              checked={agree}
              onChange={e => setAgree(e.target.checked)}
            />
            <label htmlFor="agree" style={{ marginLeft: 5 }}>
              Tôi đồng ý với Điều khoản và Chính sách về bảo mật và xử lý dữ liệu cá nhân
            </label>
          </div>
          {/* Nút đăng ký */}
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
        <div style={{ marginTop: 12, color: "#222", fontSize: 16 }}>
          Đã có tài khoản?{" "}
          <span
            style={{ color: "#2a2afc", cursor: "pointer", fontWeight: 600 }}
            onClick={() => navigate("/dang-nhap")}
          >
            Đăng nhập
          </span>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "12px 20px",
  borderRadius: 8,
  border: "1.5px solid #bdbdbd",
  fontSize: 18,
  fontWeight: 400,
  outline: "none",
  background: "#fff",
  boxSizing: "border-box",
};

// const eyeIconStyle = {
//   position: "absolute",
//   right: 10,
//   top: "50%",
//   transform: "translateY(-50%)",
//   cursor: "pointer",
//   fontSize: 20,
//   color: "#888",
//   userSelect: "none",
// };

export default Register;
