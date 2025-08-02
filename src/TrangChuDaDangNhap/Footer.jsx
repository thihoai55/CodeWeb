import React from "react";

function Footer() {
  return (
    <footer
      style={{
        background: `url('https://media.istockphoto.com/id/511061090/vi/anh/t%C3%B2a-nh%C3%A0-v%C4%83n-ph%C3%B2ng-kinh-doanh-t%E1%BA%A1i-london-anh.jpg?s=612x612&w=0&k=20&c=FzPVk6ogXpuoz2mJaEeBlKWEVIELrgen0lNaR9O-QKw=') center/cover no-repeat`,
        color: "#222",
        padding: "15px 0 15px 0",
        marginTop: 32,
        // border: "3px solid #7c3aed",
        // borderRadius: 8,
        boxSizing: "border-box",
        position: "relative",
        zIndex: 1,
        overflow: "hidden",
        minHeight: 260,
      }}
    >
      {/* Overlay làm mờ ảnh nền */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(247, 248, 248, 0.3)",
        backdropFilter: "blur(0.5px)",
        zIndex: 1,
        pointerEvents: "none"
      }} />
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "30px",
          alignItems: "stretch",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Cột 1 */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          // background: "rgba(255,255,255,0.85)",
          // border: "2px dashed #a78bfa",
          borderRadius: 10,
          padding: 16,
          boxSizing: "border-box",
          minHeight: 210,
          height: "100%",
        }}>
          <div style={{ color: "#2a2afc", fontWeight: "bold", fontSize: 18, marginBottom: 12 }}>Về chúng tôi</div>
          <div style={{ fontWeight: "bold", fontSize: 18, marginBottom: 8 }}>
            Website cho thuê phòng trọ, căn hộ, tìm người ở ghép ghép nhanh chóng và hiệu quả
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: "bold", fontSize: 18, marginBottom: 4 }}>
            <span>📍</span> 131 Trần phú, TP. Huế
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: "bold", fontSize: 18, marginBottom: 4 }}>
            <span>📞</span> 0978772943
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: "bold", fontSize: 18 }}>
            <span>✉️</span> nhathoainhan@gmail.com
          </div>
        </div>
        {/* Cột 2 */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          // background: "rgba(255,255,255,0.85)",
          // border: "2px dashed #a78bfa",
          borderRadius: 10,
          padding: 16,
          boxSizing: "border-box",
          minHeight: 210,
          height: "100%",
        }}>
          <div style={{ color: "#2a2afc", fontWeight: "bold", fontSize: 18, marginBottom: 12 }}>Giới thiệu</div>
          <div style={{ fontWeight: "bold", fontSize: 18, marginBottom: 4 }}>Giới thiệu</div>
          <div style={{ fontWeight: "bold", fontSize: 18, marginBottom: 4 }}>Quy chế hoạt động</div>
          <div style={{ fontWeight: "bold", fontSize: 18, marginBottom: 4 }}>Chính sách bảo mật</div>
          <div style={{ fontWeight: "bold", fontSize: 18, marginBottom: 4 }}>Quy định sử dụng</div>
          <div style={{ fontWeight: "bold", fontSize: 18 }}>Liên hệ</div>
        </div>
        {/* Cột 3 */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          // background: "rgba(255,255,255,0.85)",
          // border: "2px dashed #a78bfa",
          borderRadius: 10,
          padding: 16,
          boxSizing: "border-box",
          minHeight: 210,
          height: "100%",
        }}>
          <div style={{ color: "#2a2afc", fontWeight: "bold", fontSize: 18, marginBottom: 12 }}>Hỗ trợ</div>
          <div style={{ fontWeight: "bold", fontSize: 18, marginBottom: 4 }}>Hướng dẫn đăng tin</div>
          <div style={{ fontWeight: "bold", fontSize: 18 }}>Quy định đăng tin</div>
        </div>
        {/* Cột 4: Phương thức thanh toán */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          // background: "rgba(255,255,255,0.85)",
          // border: "2px dashed #a78bfa",
          borderRadius: 10,
          padding: 16,
          boxSizing: "border-box",
          minHeight: 210,
          height: "100%",
        }}>
          <div style={{ color: "#2a2afc", fontWeight: "bold", fontSize: 18, marginBottom: 15, textAlign: "center", letterSpacing: 1}}>
            Phương thức thanh toán
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 54px)",
              gridTemplateRows: "repeat(2, 33px)",
              gap: "10px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* VISA */}
            <div style={{ background: "#fff", borderRadius: 5, boxShadow: "0 4px 12px -2px rgba(0,0,0,0.12)", display: "flex", alignItems: "center", justifyContent: "center", height: 33, width: 54 }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="visa" style={{ width: 44, height: 22, objectFit: "contain" }} />
            </div>
            {/* Mastercard */}
            <div style={{ background: "#fff", borderRadius: 5, boxShadow: "0 4px 12px -2px rgba(0,0,0,0.12)", display: "flex", alignItems: "center", justifyContent: "center", height: 33, width: 54 }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" alt="mastercard" style={{ width: 28, height: 28, objectFit: "contain" }} />
            </div>
            {/* JCB */}
            <div style={{ background: "#fff", borderRadius: 5, boxShadow: "0 4px 12px -2px rgba(0,0,0,0.12)", display: "flex", alignItems: "center", justifyContent: "center", height: 33, width: 54 }}>
              <img src="https://e7.pngegg.com/pngimages/157/1005/png-clipart-ucb-logo-jcb-co-ltd-logo-payment-credit-card-card-vetor-text-service.png" alt="jcb" style={{ width: 36, height: 22, objectFit: "contain" }} />
            </div>
            {/* MoMo */}
            <div style={{ background: "#fff", borderRadius: 5, boxShadow: "0 4px 12px -2px rgba(0,0,0,0.12)", display: "flex", alignItems: "center", justifyContent: "center", height: 33, width: 54 }}>
              <img src="https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png" alt="momo" style={{ width: 36, height: 22, objectFit: "contain" }} />
            </div>
            {/* ZaloPay */}
            <div style={{ background: "#fff", borderRadius: 5, boxShadow: "0 4px 12px -2px rgba(0,0,0,0.12)", display: "flex", alignItems: "center", justifyContent: "center", height: 33, width: 54 }}>
              <img src="https://cdn.haitrieu.com/wp-content/uploads/2022/10/Logo-ZaloPay-2s.png" alt="zalopay" style={{ width: 36, height: 22, objectFit: "contain" }} />
            </div>
            {/* ShopeePay */}
            <div style={{ background: "#fff", borderRadius: 5, boxShadow: "0 4px 12px -2px rgba(0,0,0,0.12)", display: "flex", alignItems: "center", justifyContent: "center", height: 33, width: 54 }}>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQypySdKn7gDqFjAQfsU5RcLlEnIIFumLsjPg&shttps://www.siampay.com/en/images/shopeepay-img1.png" alt="shopeepay" style={{ width: 36, height: 22, objectFit: "contain" }} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

