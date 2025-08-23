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

// Dữ liệu tỉnh thành và quận huyện đầy đủ của Việt Nam
const provincesData = {
  "Toàn quốc": [],
  "Hà Nội": [
    "Quận Ba Đình", "Quận Hoàn Kiếm", "Quận Hai Bà Trưng", "Quận Đống Đa", "Quận Tây Hồ", "Quận Cầu Giấy",
    "Quận Thanh Xuân", "Quận Hoàng Mai", "Quận Long Biên", "Quận Nam Từ Liêm", "Quận Bắc Từ Liêm", "Quận Hà Đông",
    "Huyện Sóc Sơn", "Huyện Đông Anh", "Huyện Gia Lâm", "Huyện Thanh Trì", "Huyện Mê Linh", "Huyện Ba Vì",
    "Huyện Phúc Thọ", "Huyện Thạch Thất", "Huyện Quốc Oai", "Huyện Chương Mỹ", "Huyện Thanh Oai", "Huyện Thường Tín",
    "Huyện Phú Xuyên", "Huyện Ứng Hòa", "Huyện Mỹ Đức"
  ],
  "Hồ Chí Minh": [
    "Quận 1", "Quận 2", "Quận 3", "Quận 4", "Quận 5", "Quận 6", "Quận 7", "Quận 8", "Quận 9", "Quận 10",
    "Quận 11", "Quận 12", "Quận Bình Tân", "Quận Bình Thạnh", "Quận Gò Vấp", "Quận Phú Nhuận", "Quận Tân Bình", "Quận Tân Phú",
    "Huyện Bình Chánh", "Huyện Cần Giờ", "Huyện Củ Chi", "Huyện Hóc Môn", "Huyện Nhà Bè"
  ],
  "Đà Nẵng": [
    "Quận Hải Châu", "Quận Thanh Khê", "Quận Sơn Trà", "Quận Ngũ Hành Sơn", "Quận Liên Chiểu", "Quận Cẩm Lệ",
    "Huyện Hòa Vang", "Huyện Hoàng Sa"
  ],
  "Hải Phòng": [
    "Quận Hồng Bàng", "Quận Ngô Quyền", "Quận Lê Chân", "Quận Hải An", "Quận Kiến An", "Quận Đồ Sơn", "Quận Dương Kinh",
    "Huyện An Lão", "Huyện Kiến Thụy", "Huyện Thủy Nguyên", "Huyện Tiên Lãng", "Huyện Vĩnh Bảo", "Huyện Cát Hải", "Huyện Bạch Long Vĩ"
  ],
  "Cần Thơ": [
    "Quận Ninh Kiều", "Quận Bình Thủy", "Quận Cái Răng", "Quận Ô Môn", "Quận Thốt Nốt",
    "Huyện Phong Điền", "Huyện Cờ Đỏ", "Huyện Thới Lai", "Huyện Vĩnh Thạnh"
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
  "Khánh Hòa": [
    "Thành phố Nha Trang", "Thành phố Cam Ranh", "Thành phố Ninh Hòa", "Huyện Vạn Ninh", "Huyện Diên Khánh",
    "Huyện Khánh Vĩnh", "Huyện Khánh Sơn", "Huyện Trường Sa"
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
  ],
  "Bạc Liêu": [
    "Thành phố Bạc Liêu", "Huyện Đông Hải", "Huyện Giá Rai", "Huyện Hòa Bình", "Huyện Hồng Dân", "Huyện Phước Long", "Huyện Vĩnh Lợi"
  ],
  "Bắc Ninh": [
    "Thành phố Bắc Ninh", "Thành phố Từ Sơn", "Huyện Gia Bình", "Huyện Lương Tài", "Huyện Quế Võ", "Huyện Thuận Thành", "Huyện Tiên Du", "Huyện Yên Phong"
  ],
  "Bến Tre": [
    "Thành phố Bến Tre", "Huyện Ba Tri", "Huyện Bình Đại", "Huyện Châu Thành", "Huyện Chợ Lách", "Huyện Giồng Trôm", "Huyện Mỏ Cày Bắc", "Huyện Mỏ Cày Nam", "Huyện Thạnh Phú"
  ],
  "Bình Định": [
    "Thành phố Quy Nhơn", "Thị xã An Nhơn", "Huyện An Lão", "Huyện Hoài Ân", "Huyện Hoài Nhơn", "Huyện Phù Cát", "Huyện Phù Mỹ", "Huyện Tây Sơn", "Huyện Tuy Phước", "Huyện Vân Canh", "Huyện Vĩnh Thạnh"
  ],
  "Bình Phước": [
    "Thị xã Bình Long", "Thị xã Đồng Xoài", "Thị xã Phước Long", "Huyện Bù Đăng", "Huyện Bù Đốp", "Huyện Bù Gia Mập", "Huyện Chơn Thành", "Huyện Đồng Phú", "Huyện Hớn Quản", "Huyện Lộc Ninh", "Huyện Phú Riềng"
  ],
  "Bình Thuận": [
    "Thành phố Phan Thiết", "Thị xã La Gi", "Huyện Bắc Bình", "Huyện Đức Linh", "Huyện Hàm Tân", "Huyện Hàm Thuận Bắc", "Huyện Hàm Thuận Nam", "Huyện Phú Quý", "Huyện Tánh Linh", "Huyện Tuy Phong"
  ],
  "Cà Mau": [
    "Thành phố Cà Mau", "Huyện Cái Nước", "Huyện Đầm Dơi", "Huyện Năm Căn", "Huyện Ngọc Hiển", "Huyện Phú Tân", "Huyện Thới Bình", "Huyện Trần Văn Thời", "Huyện U Minh"
  ],
  "Cao Bằng": [
    "Thành phố Cao Bằng", "Huyện Bảo Lạc", "Huyện Bảo Lâm", "Huyện Hạ Lang", "Huyện Hà Quảng", "Huyện Hoà An", "Huyện Nguyên Bình", "Huyện Phục Hoà", "Huyện Quảng Uyên", "Huyện Thạch An", "Huyện Thông Nông", "Huyện Trà Lĩnh", "Huyện Trùng Khánh"
  ],
  "Đắk Lắk": [
    "Thành phố Buôn Ma Thuột", "Thị xã Buôn Hồ", "Huyện Buôn Đôn", "Huyện Cư Kuin", "Huyện Cư M'gar", "Huyện Ea H'leo", "Huyện Ea Kar", "Huyện Ea Súp", "Huyện Krông Ana", "Huyện Krông Bông", "Huyện Krông Búk", "Huyện Krông Năng", "Huyện Krông Pắc", "Huyện Lắk", "Huyện M'Đrắk"
  ],
  "Đắk Nông": [
    "Thị xã Gia Nghĩa", "Huyện Cư Jút", "Huyện Đắk Glong", "Huyện Đắk Mil", "Huyện Đắk R'Lấp", "Huyện Đắk Song", "Huyện Krông Nô", "Huyện Tuy Đức"
  ],
  "Điện Biên": [
    "Thành phố Điện Biên Phủ", "Thị xã Mường Lay", "Huyện Điện Biên", "Huyện Điện Biên Đông", "Huyện Mường Ảng", "Huyện Mường Chà", "Huyện Mường Nhé", "Huyện Nậm Pồ", "Huyện Tủa Chùa", "Huyện Tuần Giáo"
  ],
  "Đồng Tháp": [
    "Thành phố Cao Lãnh", "Thành phố Sa Đéc", "Thành phố Hồng Ngự", "Thị xã Hồng Ngự", "Huyện Cao Lãnh", "Huyện Châu Thành", "Huyện Hồng Ngự", "Huyện Lai Vung", "Huyện Lấp Vò", "Huyện Tam Nông", "Huyện Tân Hồng", "Huyện Thanh Bình", "Huyện Tháp Mười"
  ],
  "Gia Lai": [
    "Thành phố Pleiku", "Thị xã An Khê", "Thị xã Ayun Pa", "Huyện Chư Păh", "Huyện Chư Prông", "Huyện Chư Sê", "Huyện Đăk Đoa", "Huyện Đăk Pơ", "Huyện Đức Cơ", "Huyện Ia Grai", "Huyện Ia Pa", "Huyện KBang", "Huyện Kông Chro", "Huyện Krông Pa", "Huyện Mang Yang", "Huyện Phú Thiện"
  ],
  "Hà Giang": [
    "Thành phố Hà Giang", "Huyện Bắc Mê", "Huyện Bắc Quang", "Huyện Đồng Văn", "Huyện Hoàng Su Phì", "Huyện Mèo Vạc", "Huyện Quản Bạ", "Huyện Quang Bình", "Huyện Vị Xuyên", "Huyện Xín Mần", "Huyện Yên Minh"
  ],
  "Hà Nam": [
    "Thành phố Phủ Lý", "Huyện Bình Lục", "Huyện Duy Tiên", "Huyện Kim Bảng", "Huyện Lý Nhân", "Huyện Thanh Liêm"
  ],
  "Hà Tĩnh": [
    "Thành phố Hà Tĩnh", "Thị xã Hồng Lĩnh", "Huyện Cẩm Xuyên", "Huyện Can Lộc", "Huyện Đức Thọ", "Huyện Hương Khê", "Huyện Hương Sơn", "Huyện Kỳ Anh", "Huyện Lộc Hà", "Huyện Nghi Xuân", "Huyện Thạch Hà", "Huyện Vũ Quang"
  ],
  "Hải Dương": [
    "Thành phố Hải Dương", "Thị xã Chí Linh", "Huyện Bình Giang", "Huyện Cẩm Giàng", "Huyện Gia Lộc", "Huyện Kim Thành", "Huyện Nam Sách", "Huyện Ninh Giang", "Huyện Thanh Hà", "Huyện Thanh Miện", "Huyện Tứ Kỳ"
  ],
  "Hậu Giang": [
    "Thành phố Vị Thanh", "Thị xã Long Mỹ", "Thị xã Ngã Bảy", "Huyện Châu Thành", "Huyện Châu Thành A", "Huyện Long Mỹ", "Huyện Phụng Hiệp", "Huyện Vị Thủy"
  ],
  "Hòa Bình": [
    "Thành phố Hòa Bình", "Huyện Cao Phong", "Huyện Đà Bắc", "Huyện Kim Bôi", "Huyện Lạc Sơn", "Huyện Lạc Thủy", "Huyện Lương Sơn", "Huyện Mai Châu", "Huyện Tân Lạc", "Huyện Yên Thủy"
  ],
  "Hưng Yên": [
    "Thành phố Hưng Yên", "Huyện Ân Thi", "Huyện Khoái Châu", "Huyện Kim Động", "Huyện Mỹ Hào", "Huyện Phù Cừ", "Huyện Tiên Lữ", "Huyện Văn Giang", "Huyện Văn Lâm", "Huyện Yên Mỹ"
  ],
  "Kiên Giang": [
    "Thành phố Rạch Giá", "Thị xã Hà Tiên", "Thị xã Phú Quốc", "Huyện An Biên", "Huyện An Minh", "Huyện Châu Thành", "Huyện Giang Thành", "Huyện Giồng Riềng", "Huyện Gò Quao", "Huyện Hòn Đất", "Huyện Kiên Hải", "Huyện Kiên Lương", "Huyện Phú Quốc", "Huyện Tân Hiệp", "Huyện U Minh Thượng", "Huyện Vĩnh Thuận"
  ],
  "Kon Tum": [
    "Thành phố Kon Tum", "Huyện Đắk Glei", "Huyện Đắk Hà", "Huyện Đắk Tô", "Huyện Ia H'Drai", "Huyện Kon Plông", "Huyện Kon Rẫy", "Huyện Ngọc Hồi", "Huyện Sa Thầy", "Huyện Tu Mơ Rông"
  ],
  "Lai Châu": [
    "Thành phố Lai Châu", "Huyện Mường Tè", "Huyện Nậm Nhùn", "Huyện Phong Thổ", "Huyện Sìn Hồ", "Huyện Tam Đường", "Huyện Tân Uyên", "Huyện Than Uyên"
  ],
  "Lâm Đồng": [
    "Thành phố Đà Lạt", "Thành phố Bảo Lộc", "Huyện Bảo Lâm", "Huyện Cát Tiên", "Huyện Đạ Huoai", "Huyện Đạ Tẻh", "Huyện Đam Rông", "Huyện Di Linh", "Huyện Đơn Dương", "Huyện Đức Trọng", "Huyện Lạc Dương", "Huyện Lâm Hà"
  ],
  "Lạng Sơn": [
    "Thành phố Lạng Sơn", "Huyện Bắc Sơn", "Huyện Bình Gia", "Huyện Cao Lộc", "Huyện Chi Lăng", "Huyện Đình Lập", "Huyện Hữu Lũng", "Huyện Lộc Bình", "Huyện Tràng Định", "Huyện Văn Lãng", "Huyện Văn Quan"
  ],
  "Lào Cai": [
    "Thành phố Lào Cai", "Huyện Bắc Hà", "Huyện Bảo Thắng", "Huyện Bảo Yên", "Huyện Bát Xát", "Huyện Mường Khương", "Huyện Sa Pa", "Huyện Si Ma Cai", "Huyện Văn Bàn"
  ],
  "Long An": [
    "Thành phố Tân An", "Thị xã Kiến Tường", "Huyện Bến Lức", "Huyện Cần Đước", "Huyện Cần Giuộc", "Huyện Châu Thành", "Huyện Đức Hòa", "Huyện Đức Huệ", "Huyện Mộc Hóa", "Huyện Tân Hưng", "Huyện Tân Thạnh", "Huyện Tân Trụ", "Huyện Thạnh Hóa", "Huyện Thủ Thừa", "Huyện Vĩnh Hưng"
  ],
  "Nam Định": [
    "Thành phố Nam Định", "Huyện Giao Thủy", "Huyện Hải Hậu", "Huyện Mỹ Lộc", "Huyện Nam Trực", "Huyện Nghĩa Hưng", "Huyện Trực Ninh", "Huyện Vụ Bản", "Huyện Xuân Trường", "Huyện Ý Yên"
  ],
  "Nghệ An": [
    "Thành phố Vinh", "Thị xã Cửa Lò", "Thị xã Hoàng Mai", "Thị xã Thái Hòa", "Huyện Anh Sơn", "Huyện Con Cuông", "Huyện Diễn Châu", "Huyện Đô Lương", "Huyện Hưng Nguyên", "Huyện Kỳ Sơn", "Huyện Nam Đàn", "Huyện Nghi Lộc", "Huyện Nghĩa Đàn", "Huyện Quế Phong", "Huyện Quỳ Châu", "Huyện Quỳ Hợp", "Huyện Quỳnh Lưu", "Huyện Tân Kỳ", "Huyện Thanh Chương", "Huyện Tương Dương", "Huyện Yên Thành"
  ],
  "Ninh Bình": [
    "Thành phố Ninh Bình", "Thành phố Tam Điệp", "Huyện Gia Viễn", "Huyện Hoa Lư", "Huyện Kim Sơn", "Huyện Nho Quan", "Huyện Yên Khánh", "Huyện Yên Mô"
  ],
  "Ninh Thuận": [
    "Thành phố Phan Rang - Tháp Chàm", "Huyện Bác Ái", "Huyện Ninh Hải", "Huyện Ninh Phước", "Huyện Ninh Sơn", "Huyện Thuận Bắc", "Huyện Thuận Nam"
  ],
  "Phú Thọ": [
    "Thành phố Việt Trì", "Thị xã Phú Thọ", "Huyện Cẩm Khê", "Huyện Đoan Hùng", "Huyện Hạ Hòa", "Huyện Lâm Thao", "Huyện Phù Ninh", "Huyện Tam Nông", "Huyện Tân Sơn", "Huyện Thanh Ba", "Huyện Thanh Sơn", "Huyện Thanh Thủy", "Huyện Yên Lập"
  ],
  "Phú Yên": [
    "Thành phố Tuy Hòa", "Thị xã Đông Hòa", "Thị xã Sông Cầu", "Huyện Đồng Xuân", "Huyện Phú Hòa", "Huyện Sơn Hòa", "Huyện Sông Hinh", "Huyện Tây Hòa", "Huyện Tuy An"
  ],
  "Quảng Bình": [
    "Thành phố Đồng Hới", "Thị xã Ba Đồn", "Huyện Bố Trạch", "Huyện Lệ Thủy", "Huyện Minh Hóa", "Huyện Quảng Ninh", "Huyện Quảng Trạch", "Huyện Tuyên Hóa"
  ],
  "Quảng Nam": [
    "Thành phố Hội An", "Thành phố Tam Kỳ", "Huyện Bắc Trà My", "Huyện Đại Lộc", "Huyện Đông Giang", "Huyện Duy Xuyên", "Huyện Hiệp Đức", "Huyện Nam Giang", "Huyện Nam Trà My", "Huyện Nông Sơn", "Huyện Núi Thành", "Huyện Phú Ninh", "Huyện Phước Sơn", "Huyện Quế Sơn", "Huyện Tây Giang", "Huyện Thăng Bình", "Huyện Tiên Phước"
  ],
  "Quảng Ngãi": [
    "Thành phố Quảng Ngãi", "Huyện Ba Tơ", "Huyện Bình Sơn", "Huyện Đức Phổ", "Huyện Lý Sơn", "Huyện Minh Long", "Huyện Mộ Đức", "Huyện Nghĩa Hành", "Huyện Sơn Hà", "Huyện Sơn Tây", "Huyện Sơn Tịnh", "Huyện Tây Trà", "Huyện Trà Bồng", "Huyện Tư Nghĩa"
  ],
  "Quảng Ninh": [
    "Thành phố Hạ Long", "Thành phố Móng Cái", "Thành phố Uông Bí", "Thị xã Cẩm Phả", "Thị xã Đông Triều", "Thị xã Quảng Yên", "Huyện Ba Chẽ", "Huyện Bình Liêu", "Huyện Cô Tô", "Huyện Đầm Hà", "Huyện Hải Hà", "Huyện Hoành Bồ", "Huyện Tiên Yên", "Huyện Vân Đồn"
  ],
  "Quảng Trị": [
    "Thành phố Đông Hà", "Thị xã Quảng Trị", "Huyện Cam Lộ", "Huyện Cồn Cỏ", "Huyện Đa Krông", "Huyện Gio Linh", "Huyện Hải Lăng", "Huyện Hướng Hóa", "Huyện Triệu Phong", "Huyện Vĩnh Linh"
  ],
  "Sóc Trăng": [
    "Thành phố Sóc Trăng", "Huyện Châu Thành", "Huyện Cù Lao Dung", "Huyện Kế Sách", "Huyện Long Phú", "Huyện Mỹ Tú", "Huyện Mỹ Xuyên", "Huyện Ngã Năm", "Huyện Thạnh Trị", "Huyện Trần Đề", "Huyện Vĩnh Châu"
  ],
  "Sơn La": [
    "Thành phố Sơn La", "Huyện Bắc Yên", "Huyện Mai Sơn", "Huyện Mộc Châu", "Huyện Mường La", "Huyện Phù Yên", "Huyện Quỳnh Nhai", "Huyện Sông Mã", "Huyện Sốp Cộp", "Huyện Thuận Châu", "Huyện Vân Hồ", "Huyện Yên Châu"
  ],
  "Tây Ninh": [
    "Thành phố Tây Ninh", "Huyện Bến Cầu", "Huyện Châu Thành", "Huyện Dương Minh Châu", "Huyện Gò Dầu", "Huyện Hòa Thành", "Huyện Tân Biên", "Huyện Tân Châu", "Huyện Trảng Bàng"
  ],
  "Thái Bình": [
    "Thành phố Thái Bình", "Huyện Đông Hưng", "Huyện Hưng Hà", "Huyện Kiến Xương", "Huyện Quỳnh Phụ", "Huyện Thái Thụy", "Huyện Tiền Hải", "Huyện Vũ Thư"
  ],
  "Thái Nguyên": [
    "Thành phố Thái Nguyên", "Thành phố Sông Công", "Thị xã Phổ Yên", "Huyện Đại Từ", "Huyện Định Hóa", "Huyện Đồng Hỷ", "Huyện Phú Bình", "Huyện Phú Lương", "Huyện Võ Nhai"
  ],
  "Thanh Hóa": [
    "Thành phố Thanh Hóa", "Thị xã Bỉm Sơn", "Thị xã Sầm Sơn", "Huyện Bá Thước", "Huyện Cẩm Thủy", "Huyện Đông Sơn", "Huyện Hà Trung", "Huyện Hậu Lộc", "Huyện Hoằng Hóa", "Huyện Lang Chánh", "Huyện Mường Lát", "Huyện Nga Sơn", "Huyện Ngọc Lặc", "Huyện Như Thanh", "Huyện Như Xuân", "Huyện Nông Cống", "Huyện Quan Hóa", "Huyện Quan Sơn", "Huyện Quảng Xương", "Huyện Thạch Thành", "Huyện Thiệu Hóa", "Huyện Thọ Xuân", "Huyện Thường Xuân", "Huyện Tĩnh Gia", "Huyện Triệu Sơn", "Huyện Vĩnh Lộc", "Huyện Yên Định"
  ],
  "Thừa Thiên Huế": [
    "Thành phố Huế", "Thị xã Hương Thủy", "Thị xã Hương Trà", "Huyện A Lưới", "Huyện Nam Đông", "Huyện Phong Điền", "Huyện Phú Lộc", "Huyện Phú Vang", "Huyện Quảng Điền"
  ],
  "Tiền Giang": [
    "Thành phố Mỹ Tho", "Thị xã Gò Công", "Thị xã Cai Lậy", "Huyện Cái Bè", "Huyện Châu Thành", "Huyện Chợ Gạo", "Huyện Gò Công Đông", "Huyện Gò Công Tây", "Huyện Tân Phú Đông", "Huyện Tân Phước"
  ],
  "Trà Vinh": [
    "Thành phố Trà Vinh", "Huyện Càng Long", "Huyện Cầu Kè", "Huyện Cầu Ngang", "Huyện Châu Thành", "Huyện Duyên Hải", "Huyện Tiểu Cần", "Huyện Trà Cú"
  ],
  "Tuyên Quang": [
    "Thành phố Tuyên Quang", "Huyện Chiêm Hóa", "Huyện Hàm Yên", "Huyện Lâm Bình", "Huyện Na Hang", "Huyện Sơn Dương", "Huyện Yên Sơn"
  ],
  "Vĩnh Long": [
    "Thành phố Vĩnh Long", "Huyện Bình Tân", "Huyện Long Hồ", "Huyện Mang Thít", "Huyện Tam Bình", "Huyện Trà Ôn", "Huyện Vũng Liêm"
  ],
  "Vĩnh Phúc": [
    "Thành phố Vĩnh Yên", "Thị xã Phúc Yên", "Huyện Bình Xuyên", "Huyện Lập Thạch", "Huyện Sông Lô", "Huyện Tam Đảo", "Huyện Tam Dương", "Huyện Vĩnh Tường", "Huyện Yên Lạc"
  ],
  "Yên Bái": [
    "Thành phố Yên Bái", "Thị xã Nghĩa Lộ", "Huyện Lục Yên", "Huyện Mù Cang Chải", "Huyện Trạm Tấu", "Huyện Trấn Yên", "Huyện Văn Chấn", "Huyện Văn Yên", "Huyện Yên Bình"
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
      // Chỉ cần chọn tỉnh là tìm kiếm luôn, không cần chọn quận/huyện
      onSelect({ province, district: "" });
      onClose();
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
