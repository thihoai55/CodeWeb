import React, { useState, useRef, useEffect } from "react";

const ProfileDropdown = () => {
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Đóng dropdown khi click ra ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div style={{ position: "relative", display: "inline-block" }} ref={dropdownRef}>
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
                onClick={() => setOpen((prev) => !prev)}
            >
                <img
                    src="/anh/avt.jpg"
                    alt="avatar"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
            </div>
            {open && (
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
                        padding: 16,
                    }}
                >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <img
                            src="/anh/avt.jpg"
                            alt="avatar"
                            style={{ width: 48, height: 48, borderRadius: "50%" }}
                        />
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
                            justifyContent: "space-between",
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
                                cursor: "pointer",


                            }}
                        >
                            Nạp tiền
                            <span style={{
                                marginLeft: "6px",
                                color: "#070707ff",
                                fontSize: 18,
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                            >
                                <i class="bi bi-credit-card-2-back"></i></span>

                        </button>
                    </div>
                    <div style={{ marginTop: 16 }}>
                        {/* <span style={{
                            marginRight: "6px",
                            color: "#070707ff",
                            fontSize: 18,

                        }}
                        >
                            <i class="bi bi-person-fill"></i></span> */}
                        <divs

                            style={{

                                alignItems: "center",
                                padding: "8px 0",

                                cursor: "pointer",
                                fontWeight: "bold",

                            }}

                        >
                            <i className="bi bi-person-fill" style={{ fontSize: 22, marginRight: 8 }}></i>
                            Thông tin cá nhân
                        </divs>

                        <div

                            style={{
                                padding: "8px 0",
                                fontWeight: "bold",
                                cursor: "pointer",


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
                            }}
                        >
                            <i className="bi bi-box-arrow-left" style={{ color: " #000000ff", fontSize: 20, marginRight: 8 }}></i>
                            Đăng xuất
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileDropdown;