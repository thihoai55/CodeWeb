import React, { useState } from "react";

const headerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "10px 12px",
  borderBottom: "1px solid #e0e0e0",
  backgroundColor: "#f8f9fa",
};

const titleStyle = {
  margin: 0,
  fontSize: 20,
  fontWeight: 600,
  color: "#333",
};

const closeButtonStyle = {
  background: "none",
  border: "none",
  fontSize: 20,
  cursor: "pointer",
  color: "#666",
  padding: "4px",
  borderRadius: "50%",
  width: 32,
  height: 32,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s ease",
};

const backButtonStyle = {
  background: "none",
  border: "none",
  fontSize: 16,
  cursor: "pointer",
  color: "#2196f3",
  padding: "4px 8px",
  borderRadius: 6,
  display: "flex",
  alignItems: "center",
  gap: 8,
  transition: "all 0.2s ease",
};

const listContainerStyle = {
  flex: 1,
  overflowY: "auto",
  padding: "16px 0",
};

const listItemStyle = (isSelected, isHovered) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 12px",
  cursor: "pointer",
  backgroundColor: isSelected ? "#e3f2fd" : isHovered ? "#f5f5f5" : "transparent",
  borderBottom: "1px solid #f0f0f0",
  transition: "all 0.2s ease",
});

const itemTextStyle = (isSelected) => ({
  fontSize: 16,
  fontWeight: isSelected ? 600 : 500,
  color: isSelected ? "#2196f3" : "#333",
});

const checkboxStyle = (isSelected) => ({
  width: 20,
  height: 20,
  border: isSelected ? "2px solid #2196f3" : "2px solid #ddd",
  borderRadius: 4,
  backgroundColor: isSelected ? "#2196f3" : "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontSize: 12,
  fontWeight: "bold",
});

const arrowStyle = {
  color: "#999",
  fontSize: 16,
};

// Dữ liệu tỉnh thành và quận huyện
const provincesData = {
  "Toàn quốc": [],
  "Hồ Chí Minh": [
    "Quận 1", "Quận 2", "Quận 3", "Quận 4", "Quận 5", "Quận 6", "Quận 7", "Quận 8", "Quận 9", "Quận 10",
    "Quận 11", "Quận 12", "Quận Bình Tân", "Quận Bình Thạnh", "Quận Gò Vấp", "Quận Phú Nhuận", "Quận Tân Bình", "Quận Tân Phú",
    "Huyện Bình Chánh", "Huyện Cần Giờ", "Huyện Củ Chi", "Huyện Hóc Môn", "Huyện Nhà Bè"
  ],
  "Hà Nội": [
    "Quận Ba Đình", "Quận Hoàn Kiếm", "Quận Hai Bà Trưng", "Quận Đống Đa", "Quận Tây Hồ", "Quận Cầu Giấy",
    "Quận Thanh Xuân", "Quận Hoàng Mai", "Quận Long Biên", "Quận Nam Từ Liêm", "Quận Bắc Từ Liêm", "Quận Hà Đông",
    "Huyện Sóc Sơn", "Huyện Đông Anh", "Huyện Gia Lâm", "Huyện Thanh Trì", "Huyện Mê Linh", "Huyện Ba Vì",
    "Huyện Phúc Thọ", "Huyện Thạch Thất", "Huyện Quốc Oai", "Huyện Chương Mỹ", "Huyện Thanh Oai", "Huyện Thường Tín",
    "Huyện Phú Xuyên", "Huyện Ứng Hòa", "Huyện Mỹ Đức"
  ],
  "Đà Nẵng": [
    "Quận Hải Châu", "Quận Thanh Khê", "Quận Sơn Trà", "Quận Ngũ Hành Sơn", "Quận Liên Chiểu", "Quận Cẩm Lệ",
    "Huyện Hòa Vang", "Huyện Hoàng Sa"
  ],
  "Bình Dương": [
    "Thành phố Thủ Dầu Một", "Thành phố Dĩ An", "Thành phố Thuận An", "Thành phố Bến Cát", "Thành phố Tân Uyên",
    "Huyện Bàu Bàng", "Huyện Bắc Tân Uyên", "Huyện Dầu Tiếng", "Huyện Phú Giáo"
  ],
  "Đồng Nai": [
    "Thành phố Biên Hòa", "Thành phố Long Khánh", "Huyện Tân Phú", "Huyện Vĩnh Cửu", "Huyện Định Quán",
    "Huyện Thống Nhất", "Huyện Cẩm Mỹ", "Huyện Long Thành", "Huyện Xuân Lộc", "Huyện Nhơn Trạch", "Huyện Trảng Bom"
  ],
  "Bà Rịa - Vũng Tàu": [
    "Thành phố Vũng Tàu", "Thành phố Bà Rịa", "Huyện Châu Đức", "Huyện Xuyên Mộc", "Huyện Long Điền", "Huyện Đất Đỏ", "Huyện Tân Thành", "Huyện Côn Đảo"
  ],
  "Cần Thơ": [
    "Quận Ninh Kiều", "Quận Bình Thủy", "Quận Cái Răng", "Quận Ô Môn", "Quận Thốt Nốt",
    "Huyện Phong Điền", "Huyện Cờ Đỏ", "Huyện Thới Lai", "Huyện Vĩnh Thạnh"
  ],
  "Khánh Hòa": [
    "Thành phố Nha Trang", "Thành phố Cam Ranh", "Thành phố Ninh Hòa", "Huyện Vạn Ninh", "Huyện Diên Khánh",
    "Huyện Khánh Vĩnh", "Huyện Khánh Sơn", "Huyện Trường Sa"
  ],
  "Hải Phòng": [
    "Quận Hồng Bàng", "Quận Ngô Quyền", "Quận Lê Chân", "Quận Hải An", "Quận Kiến An", "Quận Đồ Sơn", "Quận Dương Kinh",
    "Huyện An Lão", "Huyện Kiến Thụy", "Huyện Thủy Nguyên", "Huyện Tiên Lãng", "Huyện Vĩnh Bảo", "Huyện Cát Hải", "Huyện Bạch Long Vĩ"
  ],
  "An Giang": [
    "Thành phố Long Xuyên", "Thành phố Châu Đốc", "Thị xã Tân Châu", "Huyện An Phú", "Huyện Châu Phú", "Huyện Châu Thành",
    "Huyện Chợ Mới", "Huyện Phú Tân", "Huyện Thoại Sơn", "Huyện Tịnh Biên", "Huyện Tri Tôn"
  ],
  "Bắc Giang": [
    "Thành phố Bắc Giang", "Thị xã Việt Yên", "Huyện Hiệp Hòa", "Huyện Lạng Giang", "Huyện Lục Nam", "Huyện Lục Ngạn",
    "Huyện Sơn Động", "Huyện Tân Yên", "Huyện Việt Yên", "Huyện Yên Dũng", "Huyện Yên Thế"
  ],
  "Bắc Kạn": [
    "Thành phố Bắc Kạn", "Huyện Ba Bể", "Huyện Bạch Thông", "Huyện Chợ Đồn", "Huyện Chợ Mới", "Huyện Na Rì", "Huyện Ngân Sơn", "Huyện Pác Nặm"
  ]
};

function TimKiemTheoKhuVuc({ onClose, onSelect, customHeader }) {
  const [currentView, setCurrentView] = useState("provinces"); // "provinces" hoặc "districts"
  const [selectedProvince, setSelectedProvince] = useState("Toàn quốc");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isDelaying, setIsDelaying] = useState(false);

  const provinces = Object.keys(provincesData);
  const districts = provincesData[selectedProvince] || [];

  const handleProvinceSelect = (province) => {
    setSelectedProvince(province);
    setIsDelaying(true);
    setTimeout(() => {
      setIsDelaying(false);
      if (province === "Toàn quốc" || provincesData[province].length === 0) {
        onSelect({ province, district: "" });
        onClose();
      } else {
        setCurrentView("districts");
      }
    }, 10);
  };

  const handleDistrictSelect = (district) => {
    setSelectedDistrict(district);
    setIsDelaying(true);
    setTimeout(() => {
      setIsDelaying(false);
      onSelect({ province: selectedProvince, district });
      onClose();
    }, 10);
  };

  const handleBack = () => {
    setCurrentView("provinces");
    setSelectedDistrict("");
  };

  const renderProvinces = () => (
    <>
      <div style={headerStyle}>
        {customHeader ? (
          customHeader
        ) : (
          <>
            <h2 style={titleStyle}>Tìm theo khu vực</h2>
            <button
              onClick={onClose}
              style={closeButtonStyle}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#f0f0f0";
                e.target.style.color = "#333";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#666";
              }}
            >
              ✕
            </button>
          </>
        )}
      </div>
      <div style={listContainerStyle}>
        {provinces.map((province) => (
          <div
            key={province}
            style={listItemStyle(selectedProvince === province, hoveredItem === province)}
            onMouseEnter={() => setHoveredItem(province)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => handleProvinceSelect(province)}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={checkboxStyle(selectedProvince === province)}>
                {selectedProvince === province && "✓"}
              </div>
              <span style={itemTextStyle(selectedProvince === province)}>{province}</span>
            </div>
            <span style={arrowStyle}>›</span>
          </div>
        ))}
      </div>
    </>
  );

  const renderDistricts = () => (
    <>
      <div style={headerStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={handleBack}
            style={backButtonStyle}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#e3f2fd";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
            }}
          >
            ‹ Quay lại
          </button>
        </div>
            <button
            onClick={onClose}
            style={closeButtonStyle}
            onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#f0f0f0";
                e.target.style.color = "#333";
            }}
            onMouseLeave={(e) => {
                e.target.style.backgroundColor = "transparent";
                e.target.style.color = "#666";
            }}
            >
            ✕
            </button>
      </div>
      <div style={{ padding: "10px 15px", borderBottom: "1px solid #e0e0e0" }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, color: "#333" }}>
          {selectedProvince}
        </h3>
        <p style={{ margin: "4px 0 0 0", fontSize: 14, color: "#666" }}>
          Chọn quận/huyện
        </p>
      </div>
      <div style={listContainerStyle}>
        {districts.map((district) => (
          <div
            key={district}
            style={listItemStyle(selectedDistrict === district, hoveredItem === district)}
            onMouseEnter={() => setHoveredItem(district)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => handleDistrictSelect(district)}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={checkboxStyle(selectedDistrict === district)}>
                {selectedDistrict === district && "✓"}
              </div>
              <span style={itemTextStyle(selectedDistrict === district)}>{district}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div style={{ width: 600, height: 600, minHeight: 0, minWidth: 0, maxWidth: "98vw", maxHeight: "80vh", 
                    background: "#fff", borderRadius: 15, boxShadow: "0 8px 32px rgba(0,0,0,0.12)", display: "flex", flexDirection: "column" }}>
      {currentView === "provinces" ? renderProvinces() : renderDistricts()}
    </div>
  );
}

export default TimKiemTheoKhuVuc;
