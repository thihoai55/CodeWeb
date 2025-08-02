import React from "react";

const btnGroupStyle = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap",
  marginBottom: 24,
};

const categoryBtnStyle = (active, hovered) => ({
  padding: "10px 12px",
  border: active ? "2px solid #2196f3" : hovered ? "2px solid #e0e0e0" : "1.5px solid #bdbdbd",
  borderRadius: 12,
  background: active ? "#e3f2fd" : hovered ? "#f8f9fa" : "#fff",
  color: "#222",
  fontWeight: 600,
  fontSize: 18,
  cursor: "pointer",
  transition: "all 0.2s ease",
  outline: "none",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 8,
  minWidth: 80,
  minHeight: 50,
  justifyContent: "center",
  boxShadow: hovered ? "0 4px 12px rgba(0,0,0,0.1)" : "0 2px 4px rgba(0,0,0,0.05)",
  transform: hovered ? "translateY(-2px)" : "translateY(0)",
});

const filterBtnStyle = (active, hovered) => ({
  padding: "10px 16px",
  border: active ? "2px solid #2196f3" : hovered ? "2px solid #e0e0e0" : "1.5px solid #bdbdbd",
  borderRadius: 20,
  background: active ? "#e3f2fd" : hovered ? "#f8f9fa" : "#fff",
  color: "#222",
  fontWeight: 600,
  fontSize: 14,
  cursor: "pointer",
  transition: "all 0.2s ease",
  outline: "none",
  boxShadow: hovered ? "0 4px 12px rgba(0,0,0,0.1)" : "0 2px 4px rgba(0,0,0,0.05)",
  transform: hovered ? "translateY(-1px)" : "translateY(0)",
});

const selectStyle = {
  padding: "12px 16px",
  borderRadius: 12,
  border: "1.5px solid rgb(234, 235, 235)",
  fontSize: 14,
  fontWeight: 500,
  outline: "none",
  marginRight: 16,
  marginBottom: 16,
  minWidth: 180,
  background: "#fff",
  boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
  transition: "all 0.2s ease",
  cursor: "pointer",
  appearance: "none",
  WebkitAppearance: "none",
  MozAppearance: "none",
  backgroundImage: "url('data:image/svg+xml;utf8,<svg fill=\\'%232196f3\\' height=\\'16\\' viewBox=\\'0 0 24 24\\' width=\\'16\\' xmlns=\\'http://www.w3.org/2000/svg\\'><path d=\\'M7 10l5 5 5-5z\\'/></svg>')",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 12px center",
  paddingRight: "40px",
};

function BoLoc({ onClose, selectedArea, onAreaChange }) {
  const [hoveredCategory, setHoveredCategory] = React.useState(null);
  const [hoveredPrice, setHoveredPrice] = React.useState(null);
  const [hoveredArea, setHoveredArea] = React.useState(null);
  const [activeCategory, setActiveCategory] = React.useState("Phòng trọ");
  const [activePrice, setActivePrice] = React.useState("Tất cả");
  const [activeArea, setActiveArea] = React.useState("Tất cả");

  return (
    <div style={{ 
      width: 600, 
      maxWidth: "95vw", 
      height: 600, 
      overflowY: "auto", 
      // borderRadius: 10, 
      position: "relative", 
      background: "#fff",   
      // boxShadow: "0 8px 32px rgba(0,0,0,0.12)"
    }}>
      {/* Tiêu đề và nút đóng */}
      <div style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between", 
        marginBottom: 24, 
        padding: "0 4px" 
      }}>
        <h2 style={{ fontWeight: 700, fontSize: 24, margin: 0, color: "222" }}>Bộ lọc</h2>
        <button 
          onClick={onClose} 
          style={{ 
            background: "none", 
            border: "none", 
            fontSize: 24, 
            cursor: "pointer", 
            color: "#666", 
            fontWeight: 400,
            padding: "8px",
            borderRadius: "50%",
            transition: "all 0.2s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#f5f5f5";
            e.target.style.color = "#333";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
            e.target.style.color = "#666";
          }}
        >
          ✕
        </button>
      </div>

      {/* Danh mục cho thuê */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontWeight: 600, marginBottom: 16, fontSize: 20, color: "#333" }}>Danh mục cho thuê</div>
        <div style={btnGroupStyle}>
          {[
            { icon: "🏠", label: "Phòng trọ" },
            { icon: "🏢", label: "Nhà nguyên căn" },
            { icon: "👥", label: "Tìm người ở ghép" }
          ].map((item, idx) => (
            <button
              key={item.label}
              style={categoryBtnStyle(activeCategory === item.label, hoveredCategory === item.label)}
              onMouseEnter={() => setHoveredCategory(item.label)}
              onMouseLeave={() => setHoveredCategory(null)}
              onClick={() => setActiveCategory(item.label)}
            >
              <span style={{ fontSize: 24 }}>{item.icon}</span>
              <span style={{ fontSize: 12, textAlign: "center", lineHeight: 1.2 }}>{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Lọc theo khu vực */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontWeight: 600, marginBottom: 16, fontSize: 20, color: "#333" }}>Lọc theo khu vực</div>
        <div style={{ display: "flex", flexWrap: "nowrap", gap:  0}}>
          {/* Tỉnh thành */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 500, color: "#333", marginBottom: 4 }}>Tỉnh thành</label>
            <select 
              style={selectStyle} 
              value={selectedArea?.province || "Hà Nội"}
              onChange={(e) => {
                if (onAreaChange) {
                  onAreaChange({
                    ...selectedArea,
                    province: e.target.value,
                    district: "Quận Tây Hồ", // Reset về mặc định khi đổi tỉnh
                    ward: "Tất cả"
                  });
                }
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = "#1976d2";
                e.target.style.boxShadow = "0 4px 12px rgba(201, 211, 218, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = "#2196f3";
                e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
              }}
            >
              <option>Hà Nội</option>
              <option>TP. Hồ Chí Minh</option>
              <option>Đà Nẵng</option>
              <option>Thành Phố Huế</option>
              <option>Bình Dương</option>
              <option>Đồng Nai</option>
            </select>
          </div>
          
          {/* Quận huyện */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 500, color: "#333", marginBottom: 4 }}>Quận huyện</label>
            <select 
              style={selectStyle} 
              value={selectedArea?.district || "Quận Tây Hồ"}
              onChange={(e) => {
                if (onAreaChange) {
                  onAreaChange({
                    ...selectedArea,
                    district: e.target.value,
                    ward: "Tất cả" // Reset về mặc định khi đổi quận
                  });
                }
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = "#1976d2";
                e.target.style.boxShadow = "0 4px 12px rgba(33,150,243,0.15)";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = "#2196f3";
                e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
              }}
            >
              <option>Quận Tây Hồ</option>
              <option>Quận Ba Đình</option>
              <option>Quận Hoàn Kiếm</option>
              <option>Quận Hai Bà Trưng</option>
              <option>Quận Đống Đa</option>
              <option>Quận Cầu Giấy</option>
            </select>
          </div>
          
          {/* Phường xã */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <label style={{ fontSize: 14, fontWeight: 500, color: "#333", marginBottom: 4 }}>Phường xã</label>
            <select 
              style={selectStyle} 
              value={selectedArea?.ward || "Tất cả"}
              onChange={(e) => {
                if (onAreaChange) {
                  onAreaChange({
                    ...selectedArea,
                    ward: e.target.value
                  });
                }
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = "#1976d2";
                e.target.style.boxShadow = "0 4px 12px rgba(33,150,243,0.15)";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = "#2196f3";
                e.target.style.boxShadow = "0 2px 4px rgba(0,0,0,0.05)";
              }}
            >
              <option>Tất cả</option>
              <option>Phường Yên Phụ</option>
              <option>Phường Tứ Liên</option>
              <option>Phường Nhật Tân</option>
              <option>Phường Quảng An</option>
              <option>Phường Xuân La</option>
            </select>
          </div>
        </div>
      </div>

      {/* Khoảng giá */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontWeight: 600, marginBottom: 16, fontSize: 16, color: "#333" }}>Khoảng giá</div>
        <div style={btnGroupStyle}>
          {["Tất cả", "Dưới 1 triệu", "1 - 2 triệu", "2 - 3 triệu", "3 - 5 triệu", "5 - 7 triệu", "7 - 10 triệu", "10 - 15 triệu", "Trên 15 triệu"].map((label, idx) => (
            <button
              key={label}
              style={filterBtnStyle(activePrice === label, hoveredPrice === label)}
              onMouseEnter={() => setHoveredPrice(label)}
              onMouseLeave={() => setHoveredPrice(null)}
              onClick={() => setActivePrice(label)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Khoảng diện tích */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontWeight: 600, marginBottom: 16, fontSize: 16, color: "#333" }}>Khoảng diện tích</div>
        <div style={btnGroupStyle}>
          {["Tất cả", "Dưới 20m²", "20m² - 30m²", "30m² - 50m²", "50m² - 70m²", "70m² - 90m²", "Trên 90m²"].map((label, idx) => (
            <button
              key={label}
              style={filterBtnStyle(activeArea === label, hoveredArea === label)}
              onMouseEnter={() => setHoveredArea(label)}
              onMouseLeave={() => setHoveredArea(null)}
              onClick={() => setActiveArea(label)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Nút áp dụng */}
      <button
        style={{
          width: "100%",
          background: "#2196f3",
          color: "#fff",
          fontWeight: 700,
          fontSize: 16,
          border: "none",
          borderRadius: 12,
          padding: "14px 0",
          marginTop: 16,
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(33,150,243,0.3)",
          transition: "all 0.2s ease",
          letterSpacing: 0.5,
        }}
        onMouseEnter={(e) => {
          e.target.style.background = "#1976d2";
          e.target.style.boxShadow = "0 6px 16px rgba(33,150,243,0.4)";
          e.target.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={(e) => {
          e.target.style.background = "#2196f3";
          e.target.style.boxShadow = "0 4px 12px rgba(33,150,243,0.3)";
          e.target.style.transform = "translateY(0)";
        }}
      >
        Áp dụng
      </button>
    </div>
  );
}

export default BoLoc;
