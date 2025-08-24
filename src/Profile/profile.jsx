import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { accounts } from '../DaTa/account.js';

const ProfileDropdown = ({ openProfile, onClose }) => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [userBalance, setUserBalance] = useState(0);

    useEffect(() => {
        // Lấy thông tin người dùng từ localStorage
        const storedUserInfo = localStorage.getItem('userInfo');
        if (storedUserInfo) {
            const parsedUserInfo = JSON.parse(storedUserInfo);
            setUserInfo(parsedUserInfo);
            
            // Lấy số dư từ localStorage
            const storedBalance = localStorage.getItem('userBalance');
            if (storedBalance) {
                setUserBalance(parseInt(storedBalance));
            } else {
                // Fallback: tìm số dư từ danh sách accounts nếu không có trong localStorage
                const account = accounts.find(acc => acc.username === parsedUserInfo.username);
                if (account) {
                    setUserBalance(account.balance);
                }
            }
        }
    }, []);

    if (!openProfile) return null;

    // Nếu chưa có thông tin người dùng, hiển thị loading hoặc thông báo
    if (!userInfo) {
        return (
            <div
                style={{
                    position: "absolute",
                    right: 0,
                    top: "calc(100% + 8px)",
                    width: 320,
                    background: "#fff",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    borderRadius: 10,
                    zIndex: 100,
                    padding: 10
                }}
            >
                <div style={{ textAlign: "center", padding: "20px" }}>
                    Đang tải thông tin...
                </div>
            </div>
        );
    }

    return (
        <div
            style={{
                position: "absolute",
                right: 0,
                top: "calc(100% + 8px)",
                width: 320,
                background: "#fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                borderRadius: 10,
                zIndex: 100,
                padding: 10
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
                <img src="/anh/avt.jpg" alt="avatar" style={{ width: 50, height: 50, borderRadius: "50%" }} />
                <div>
                    <div style={{ fontWeight: "700", fontSize: 18, color: '#3181d0ff' }}>{userInfo.name || userInfo.username}</div>
                    <div style={{ color: "#000000ff", fontSize: 16 }}>{userInfo.phone || userInfo.email}</div>
                </div>
            </div>
            <div
                style={{
                    marginTop: 12,
                    background: "#f5f5f5",
                    padding: 12,
                    borderRadius: 6,
                    border: "1px solid rgba(209, 203, 203, 0.96)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                <div>
                    <div style={{ fontSize: 16, color: "#000000ff" }}>Số dư tài khoản</div>
                    <div style={{ fontWeight: "bold", fontSize: 16 }}>{userBalance.toLocaleString('vi-VN')} VND</div>
                </div>
                <button
                    style={{
                        padding: "10px 12px",
                        background: "#2196f3",
                        color: "#fff",
                        border: "none",
                        borderRadius: 15,
                        fontSize: 16,
                        cursor: "pointer"
                    }}
                    onClick={() => {
                        onClose();
                        navigate("/nap-tien");
                    }}
                >
                    Nạp tiền
                    <span style={{
                        marginLeft: "6px",
                        color: "#070707ff",
                        fontSize: 16,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <i className="bi bi-credit-card-2-back"></i>
                    </span>
                </button>
            </div>
            <div style={{ marginTop: 10 }}>
                <div
                    style={{
                        alignItems: "center",
                        padding: "10px 5px",
                        cursor: "pointer",
                        fontWeight: "600",
                        display: "flex",
                        borderBottom: "1px solid #eee"
                    }}
                    onClick={() => {
                        onClose();
                        navigate("/thong-tin-ca-nhan");
                    }}
                >
                    <i className="bi bi-person-fill" style={{ fontSize: 20, marginRight: 12 }}></i>
                    Thông tin cá nhân
                </div>
                <div
                    style={{
                        alignItems: "center",
                        padding: "10px 5px",
                        fontWeight: "600",
                        cursor: "pointer",
                        display: "flex",
                        borderBottom: "1px solid #eee"
                    }}
                    onClick={() => {
                        onClose();
                        navigate("/lien-he-tro-giup");
                    }}
                >
                    <i className="bi bi-question-circle" style={{ fontSize: 20, marginRight: 12 }}></i>
                    Liên hệ và trợ giúp
                </div>
                <div
                    style={{
                        alignItems: "center",
                        padding: "10px 5px",
                        cursor: "pointer",
                        // color: "#000000ff",
                        fontWeight: "600",
                        display: "flex",
                        borderBottom: "1px solid #eee"
                    }}
                    onClick={() => {
                        onClose();
                        // Xóa thông tin đăng nhập
                        localStorage.removeItem('isLoggedIn');
                        localStorage.removeItem('userInfo');
                        localStorage.removeItem('userRole');
                        localStorage.removeItem('userBalance');
                        navigate("/");
                    }}
                >
                    <i className="bi bi-box-arrow-left" style={{ color: " #000000ff", fontSize: 20, marginRight: 12 }}></i>
                    Đăng xuất
                </div>
            </div>
        </div>
    );
};

export default ProfileDropdown;