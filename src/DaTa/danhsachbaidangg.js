export const postsData = [
  {
    id: "1001",
    title: "Phòng trọ mini trung tâm Huế, gần ĐH Khoa Học",
    describe: `Phòng trọ mới xây, sạch sẽ, thoáng mát với đầy đủ tiện nghi hiện đại. Phòng có điều hòa, nóng lạnh, ban công riêng với view đẹp. Khu vực an ninh tốt, có camera 24/7, cổng khóa vân tay.

    Vị trí thuận lợi:
    - Gần chợ Đông Ba (5 phút đi bộ)
    - Gần trường Đại học Khoa học Huế (10 phút đi bộ)
    - Gần trung tâm thành phố (15 phút đi bộ)
    - Có xe buýt đi qua cửa

    Tiện ích:
    - Điều hòa inverter tiết kiệm điện
    - Nóng lạnh 24/7
    - Ban công riêng, view đẹp
    - Tủ quần áo rộng rãi
    - Bàn học, kệ sách
    - Nhà vệ sinh khép kín
    - Bếp nấu ăn riêng
    - Wifi tốc độ cao

    Phù hợp cho sinh viên hoặc người đi làm. Giá thuê bao gồm điện, nước, wifi.`,
    images: ["anh/phong1.jpg", "anh/phong2.webp", "anh/phong3.jpeg"],
    img: "anh/phong1.jpg",
    price: "3 Triệu/tháng",
    size: "30 m²",
    area: "30 m²",
    address: "TP Huế",
    postedDate: "2025-07-30T 09:00",
    category: "Phòng trọ",
    owner: { name: "Nguyễn Văn A", phone: "0978772943", avatar: "anh/avt1.jpg", totalPosts: 5 },
    describe: "Phòng trọ cho thuê tại Trần Phú, Huế – Phòng rộng rãi, thoáng mát, có điều hòa, nóng lạnh và ban công riêng. Khu vực an ninh, gần chợ và trường học, thuận tiện đi lại. Giá thuê hợp lý, phù hợp sinh viên và người đi làm.",
    rating: { average: 4.8, total: 26, breakdown: { 5: 18, 4: 6, 3: 2, 2: 0, 1: 0 } },
    reviews: [
      { id: 1, user: "Trần Thị Mai", rating: 5, comment: "Vị trí đẹp, phòng thoáng, chủ nhà nhiệt tình.", date: "2025-08-01" },
      { id: 2, user: "Lê Đức Anh", rating: 4, comment: "Giá hợp lý, có ban công phơi đồ tiện.", date: "2025-08-02" }
    ],
    location: { lat: 16.4637, lng: 107.5909, address: "TP Huế" }
  },
  {
    id: "1002",
    title: "Phòng trọ có ban công, nội thất cơ bản",
    description:
      "Phòng nằm trên trục Phan Chu Trinh, trung tâm Hà Nội – 28 m², ban công thoáng, WC khép kín, có giường, tủ, kệ bếp; internet cáp quang. Camera 24/7, để xe miễn phí. Điện 3.5k/kWh, nước 20k/m³, rác + wifi 100k/phòng.",
    images: ["anh/phong2.webp", "anh/phong3.jpeg", "anh/phong4.jpg"],
    img: "anh/phong2.webp",
    price: "2 Triệu/tháng",
    size: "28 m²",
    area: "28 m²",
    address: "Phan Chu Trinh, Hà Nội",
    postedDate: "2025-07-31 06:30",
    category: "Phòng trọ",
    owner: { name: "Trần Thị B", phone: "0900000002", avatar: "anh/avt.jpg", totalPosts: 3 },
    describe: "Phòng nằm trên trục Phan Chu Trinh, trung tâm Hà Nội – Diện tích 28 m², có ban công thoáng hướng Đông, cửa sổ lớn đón sáng, WC khép kín sạch sẽ. Trang bị giường, tủ quần áo, kệ bếp, bồn rửa; internet cáp quang 100Mbps. Khu nhà để xe miễn phí tầng trệt, camera an ninh 24/7, giờ giấc tự do. Chi phí: điện 3.5k/kWh, nước 20k/m³, rác + wifi 100k/phòng/tháng. Phù hợp sinh viên và người đi làm; gần chợ, trạm bus, khu văn phòng.",
    rating: { average: 4.6, total: 18, breakdown: { 5: 11, 4: 5, 3: 2, 2: 0, 1: 0 } },
    reviews: [
      { id: 1, user: "Ngô Minh", rating: 5, comment: "Ngay trung tâm, đi lại thuận tiện.", date: "2025-08-01" },
      { id: 2, user: "Phạm Hạnh", rating: 4, comment: "Phòng sáng, ban công rộng.", date: "2025-08-02" }
    ],
    location: { lat: 21.0278, lng: 105.8342, address: "Phan Chu Trinh, Hà Nội" }
  },
  {
    id: "1003",
    title: "Phòng cho nữ, gần chợ, an ninh tốt",
    description: "Phòng dành cho nữ tại Bãi Cháy – 22 m², sàn gạch sáng, cửa sổ thoáng, WC riêng. Có bàn học, tủ áo; máy giặt chung; sân phơi riêng. Khu an ninh, chủ nhà thân thiện. Điện 3.5k/kWh, nước 18k/m³.",
    images: ["anh/phong3.jpeg", "anh/phong4.jpg", "anh/phong5.jpg"],
    img: "anh/phong3.jpeg",
    price: "1.8 Triệu/tháng",
    size: "22 m²",
    area: "22 m²",
    address: "Phường Bãi Cháy, Hạ Long",
    postedDate: "2025-08-01 03:15",
    category: "Phòng trọ",
    owner: { name: "Lê Minh C", phone: "0900000003", avatar: "anh/avt.jpg", totalPosts: 4 },
    describe: "Phòng dành cho nữ tại Bãi Cháy – 22 m², sàn gạch sáng, cửa sổ thoáng, WC riêng. Có bàn học, ghế, tủ áo; máy giặt dùng chung theo khung giờ, sân phơi riêng. Khu xóm an ninh, chủ nhà thân thiện, lối đi riêng, giờ giấc tự do. Gần chợ Bãi Cháy, trạm bus, siêu thị mini. Chi phí: điện 3.5k/kWh, nước 18k/m³, gửi xe máy 50k/tháng.",
    rating: { average: 4.7, total: 14, breakdown: { 5: 9, 4: 4, 3: 1, 2: 0, 1: 0 } },
    reviews: [
      { id: 1, user: "Đặng Trà My", rating: 5, comment: "Ưu tiên nữ nên rất yên tĩnh, an toàn.", date: "2025-08-03" },
      { id: 2, user: "Nguyễn Thảo", rating: 4, comment: "Sạch sẽ, gần chợ.", date: "2025-08-04" }
    ],
    location: { lat: 20.9711, lng: 107.0448, address: "Phường Bãi Cháy, Hạ Long" }
  },
  {
    id: "1004",
    title: "Phòng trọ mới xây, có gác lửng, để xe rộng",
    description:
      "Nhà trọ mới 100%, có gác lửng chắc chắn ~8 m² (tổng sử dụng 25 m²), bếp có bồn rửa, kệ trên/dưới; WC riêng có nóng lạnh. Bãi để xe rộng, camera + khóa vân tay. Điện 3.8k/kWh, nước 20k/m³.",
    images: ["anh/phong4.jpg", "anh/phong5.jpg", "anh/phong6.jpg"],
    img: "anh/phong4.jpg",
    price: "2.2 Triệu/tháng",
    size: "25 m²",
    area: "25 m²",
    address: "Đà Nẵng",
    postedDate: "2025-08-02T11:20:00Z",
    category: "Phòng trọ",
    owner: { name: "Phạm D", phone: "0900000004", avatar: "anh/avt.jpg", totalPosts: 1 },
    describe: "Nhà trọ mới 100%, có gác lửng chắc chắn ~8 m² (tổng sử dụng 25 m²). Khu bếp có bồn rửa, kệ trên/dưới; WC riêng có nóng lạnh. Bãi để xe rộng, lối đi thông thoáng; camera + khóa vân tay cổng. Khu dân cư yên tĩnh, gần chợ/siêu thị, di chuyển thuận tiện về trung tâm Đà Nẵng. Chi phí: điện 3.8k/kWh, nước 20k/m³.",
    rating: { average: 4.5, total: 10, breakdown: { 5: 6, 4: 3, 3: 1, 2: 0, 1: 0 } },
    reviews: [
      { id: 1, user: "Lý Quốc Huy", rating: 5, comment: "Gác chắc chắn, không gian hợp lý.", date: "2025-08-04" }
    ],
    location: { lat: 16.0544, lng: 108.2022, address: "Đà Nẵng" }
  },
  {
    id: "1005",
    title: "Phòng studio full nội thất, có thang máy và hầm để xe",
    description: "Studio hiện đại Q.7 – 28 m², cửa sổ lớn, rèm 2 lớp; full nội thất, máy lạnh; thang máy, hầm để xe; máy giặt + máy sấy dùng chung. Bao wifi; điện 4k/kWh, nước 20k/m³, giữ xe 100k/tháng.",
    images: ["anh/phong5.jpg", "anh/phong6.jpg", "anh/phong7.jpg"],
    img: "anh/phong5.jpg",
    price: "3.2 Triệu/tháng",
    size: "28 m²",
    area: "28 m²",
    address: "Q. 7, TP HCM",
    postedDate: "2025-08-03 07:45",
    category: "Phòng trọ",
    owner: { name: "Đỗ E", phone: "0900000005", avatar: "anh/avt.jpg", totalPosts: 2 },
    describe: "Studio hiện đại tại Q.7 – 28 m², cửa sổ lớn, rèm 2 lớp. Full nội thất: giường nệm, tủ áo, sofa nhỏ, bàn làm việc, bếp điện từ, máy lạnh; ban công phơi đồ. Tòa nhà có thang máy, hầm để xe, máy giặt + máy sấy dùng chung, hệ thống thẻ từ ra vào. Gần RMIT, Crescent Mall, di chuyển thuận lợi khu Phú Mỹ Hưng. Bao wifi; phí khác: điện 4k/kWh, nước 20k/m³, giữ xe 100k/tháng.",
    rating: { average: 4.6, total: 22, breakdown: { 5: 14, 4: 6, 3: 2, 2: 0, 1: 0 } },
    reviews: [
      { id: 1, user: "Phạm Tín", rating: 5, comment: "Tòa nhà tiện nghi, vị trí đẹp.", date: "2025-08-04" },
      { id: 2, user: "Huỳnh Ái", rating: 4, comment: "Phòng như mô tả, hài lòng.", date: "2025-08-05" }
    ],
    location: { lat: 10.7626, lng: 106.6602, address: "Q. 7, TP HCM" }
  },
  {
    id: "1006",
    title: "Căn hộ dịch vụ gần trung tâm, có dọn phòng hàng tuần",
    description:
      "Căn hộ dịch vụ 40 m² tại Q.3 – 1PK + bếp + 1PN, ban công nhỏ. Dọn phòng/đổ rác 1 tuần/lần, thay drap 2 tuần/lần. Bao wifi, truyền hình; nước theo đầu người. Điện 4k/kWh.",
    images: ["anh/phong6.jpg", "anh/phong7.jpg", "anh/phong8.jpg"],
    img: "anh/phong6.jpg",
    price: "6 Triệu/tháng",
    size: "40 m²",
    area: "40 m²",
    address: "Q. 3, TP HCM",
    postedDate: "2025-08-03T13:00:00Z",
    category: "Nhà nguyên căn",
    owner: { name: "Ngô F", phone: "0900000006", avatar: "anh/avt.jpg", totalPosts: 6 },
    describe: "Căn hộ dịch vụ 40 m² tại Q.3 – Bố cục 1 phòng khách + bếp + 1 phòng ngủ, có ban công nhỏ. Dịch vụ dọn phòng/đổ rác 1 tuần/lần, thay drap 2 tuần/lần; lễ tân giờ hành chính. Bao wifi, truyền hình cơ bản; nước tính theo đầu người. Có thang máy, chỗ để xe máy trong nhà, camera an ninh. Phù hợp gia đình nhỏ/nhân viên văn phòng ở dài hạn. Điện 4k/kWh.",
    rating: { average: 4.7, total: 19, breakdown: { 5: 12, 4: 5, 3: 2, 2: 0, 1: 0 } },
    reviews: [
      { id: 1, user: "Bảo Khánh", rating: 5, comment: "Dịch vụ sạch sẽ, gọn gàng.", date: "2025-08-05" }
    ],
    location: { lat: 10.7873, lng: 106.6861, address: "Q. 3, TP HCM" }
  },
  {
    id: "1007",
    title: "Phòng trọ giá rẻ, giờ giấc tự do, điện nước giá dân",
    description: "Phòng giá tốt tại Ninh Kiều – 18 m², trần cao, cửa sổ thoáng, WC riêng. Bảo vệ 24/7, cổng vân tay, bãi xe mái che. Điện 3.5k/kWh, nước 15k/m³, wifi 50k/phòng.",
    images: ["anh/phong7.jpg", "anh/phong8.jpg", "anh/phong9.jpg"],
    img: "anh/phong7.jpg",
    price: "1.6 Triệu/tháng",
    size: "18 m²",
    area: "18 m²",
    address: "Q. Ninh Kiều, Cần Thơ",
    postedDate: "2025-08-04T08:10:00Z",
    category: "Phòng trọ",
    owner: { name: "Võ G", phone: "0900000007", avatar: "anh/avt.jpg", totalPosts: 2 },
    describe: "Phòng giá tốt tại Ninh Kiều – 18 m², trần cao, cửa sổ thoáng, WC riêng. Khu trọ có bảo vệ 24/7, cổng vân tay, bãi để xe có mái che. Gần ĐH Cần Thơ, chợ, trạm bus; xung quanh nhiều quán ăn sinh viên. Điện 3.5k/kWh, nước 15k/m³, wifi 50k/phòng. Giờ giấc tự do, cho nấu ăn.",
    rating: { average: 4.4, total: 12, breakdown: { 5: 6, 4: 4, 3: 2, 2: 0, 1: 0 } },
    reviews: [
      { id: 1, user: "Trịnh Hải", rating: 4, comment: "Ổn trong tầm giá, an ninh.", date: "2025-08-05" }
    ],
    location: { lat: 10.0452, lng: 105.7469, address: "Q. Ninh Kiều, Cần Thơ" }
  },
  {
    id: "1008",
    title: "Tìm người ở ghép phòng rộng 30m², đầy đủ nội thất",
    description: "Tìm người ở ghép phòng master 30 m² tại TP Vinh – Cửa sổ lớn, tủ áo âm tường, bếp chung đầy đủ; máy giặt chung. Chia đều chi phí. Ưu tiên sinh viên/nhân viên văn phòng.",
    images: ["anh/phong8.jpg", "anh/phong9.jpg", "anh/phong10.jpg"],
    img: "anh/phong8.jpg",
    price: "1.2 Triệu/tháng",
    size: "30 m²",
    area: "30 m²",
    address: "TP Vinh, Nghệ An",
    postedDate: "2025-08-04T15:25:00Z",
    category: "Ở ghép",
    owner: { name: "Phan H", phone: "0900000008", avatar: "anh/avt.jpg", totalPosts: 1 },
    describe: "Tìm người ở ghép phòng master 30 m² tại TP Vinh – Phòng cửa sổ lớn, tủ áo âm tường; bếp dùng chung đầy đủ đồ cơ bản; máy giặt chung. Hiện có 1 người ở, sạch sẽ, hòa đồng; ưu tiên sinh viên/nhân viên văn phòng. Chia đều tiền phòng; điện 3.5k/kWh, nước 15k/m³, wifi 50k/phòng chia theo đầu người. Yêu cầu giữ vệ sinh, không ồn ào, tôn trọng giờ nghỉ.",
    rating: { average: 4.5, total: 9, breakdown: { 5: 6, 4: 2, 3: 1, 2: 0, 1: 0 } },
    reviews: [
      { id: 1, user: "Mai Vũ", rating: 5, comment: "Bạn cùng phòng thân thiện, chia sẻ rõ ràng.", date: "2025-08-06" }
    ],
    location: { lat: 18.6796, lng: 105.6813, address: "TP Vinh, Nghệ An" }
  },
  {
    id: "1009",
    title: "Căn hộ cao cấp 2 phòng ngủ, full nội thất sang trọng",
    description: "Căn hộ 2PN 75 m² – Phòng khách rộng, bếp kín, ban công view thoáng. Full nội thất, hồ bơi, gym miễn phí, khu BBQ, lễ tân & bảo vệ 24/7. Điện nước giá NN, phí QL theo tòa.",
    images: ["anh/phong9.jpg", "anh/phong10.jpg", "anh/phong11.jpg"],
    img: "anh/phong9.jpg",
    price: "14 Triệu/tháng",
    size: "75 m²",
    area: "75 m²",
    address: "Q. Bình Thạnh, TP HCM",
    postedDate: "2025-08-05T02:00:00Z",
    category: "Nhà nguyên căn",
    owner: { name: "Bùi I", phone: "0900000009", avatar: "anh/avt.jpg", totalPosts: 7 },
    describe: "Căn hộ cao cấp 2PN 75 m² tại Bình Thạnh – Phòng khách rộng, bếp khép kín, ban công view thoáng. Full nội thất: sofa, TV, tủ lạnh, bếp từ, lò vi sóng, máy giặt, máy lạnh từng phòng. Tiện ích: hồ bơi, gym miễn phí, khu BBQ, sân chơi trẻ em; bảo vệ và lễ tân 24/7. Bãi đậu xe tầng hầm, thẻ từ ra vào. Gần trung tâm, thuận tiện qua Q.1, Phú Nhuận. Phí quản lý theo tòa; điện nước giá nhà nước.",
    rating: { average: 4.9, total: 31, breakdown: { 5: 24, 4: 6, 3: 1, 2: 0, 1: 0 } },
    reviews: [
      { id: 1, user: "Trần Kha", rating: 5, comment: "Tiện ích đỉnh, quản lý tốt.", date: "2025-08-06" }
    ],
    location: { lat: 10.8057, lng: 106.7203, address: "Q. Bình Thạnh, TP HCM" }
  },
  {
    id: "1010",
    title: "Phòng trọ gần bệnh viện, thang máy, giữ xe 24/7",
    description: "Phòng 25 m², mới, sạch; thang máy; WC riêng, bếp nhỏ; cửa sổ/ban công thoáng. Gần bệnh viện, sân bay. Điện 4k/kWh, nước 20k/m³, rác + wifi 100k/phòng.",
    images: ["anh/phong10.jpg", "anh/phong11.jpg", "anh/phong12.jpg"],
    img: "anh/phong10.jpg",
    price: "3.8 Triệu/tháng",
    size: "25 m²",
    area: "25 m²",
    address: "Q. Gò Vấp, TP HCM",
    postedDate: "2025-08-05T14:40:00Z",
    category: "Phòng trọ",
    owner: { name: "Nguyễn J", phone: "0900000010", avatar: "anh/avt.jpg", totalPosts: 2 },
    describe: "Phòng gần bệnh viện tại Gò Vấp – 25 m², phòng mới, sạch, có thang máy. WC riêng, khu bếp nhỏ; cửa sổ/ban công thoáng. Tòa nhà có giữ xe 24/7, camera, ra vào bằng vân tay. Thuận tiện di chuyển đến bệnh viện, trường học, sân bay. Điện 4k/kWh, nước 20k/m³, rác + wifi 100k/phòng.",
    rating: { average: 4.5, total: 13, breakdown: { 5: 8, 4: 3, 3: 2, 2: 0, 1: 0 } },
    reviews: [
      { id: 1, user: "Vũ Lợi", rating: 4, comment: "Vị trí tiện, tòa nhà an ninh.", date: "2025-08-07" }
    ],
    location: { lat: 10.838, lng: 106.677, address: "Q. Gò Vấp, TP HCM" }
  },
  {
    id: "1011",
    title: "Căn hộ 2 phòng ngủ, thiết kế hiện đại, trung tâm Nam Từ Liêm",
    description: "Căn hộ 2PN 70 m² – Thiết kế hiện đại, ban công lớn, bếp đầy đủ thiết bị. Nội thất mới: tủ bếp, tủ lạnh, sofa, bàn ăn, máy giặt. Gần TTTM, trường học. Điện nước giá NN.",
    images: ["anh/phong11.jpg", "anh/phong12.jpg", "anh/phong13.jpg"],
    img: "anh/phong11.jpg",
    price: "12 Triệu/tháng",
    size: "70 m²",
    area: "70 m²",
    address: "Q. Nam Từ Liêm, Hà Nội",
    postedDate: "2025-08-06T08:05:00Z",
    category: "Nhà nguyên căn",
    owner: { name: "Trương K", phone: "0900000011", avatar: "anh/avt.jpg", totalPosts: 8 },
    describe: "Căn hộ 2PN 70 m² tại Nam Từ Liêm – Thiết kế hiện đại, ban công lớn đón gió, bếp khép kín đầy đủ thiết bị. Nội thất mới: tủ bếp, tủ lạnh, sofa, bàn ăn, tủ áo, giường nệm, máy giặt. Khu dân cư an ninh, chỗ để xe rộng, thang máy nhanh. Gần khu văn phòng, TTTM, trường học. Phù hợp gia đình trẻ hoặc nhóm bạn đi làm. Phí quản lý/gửi xe theo quy định; điện nước giá nhà nước.",
    rating: { average: 4.7, total: 20, breakdown: { 5: 13, 4: 5, 3: 2, 2: 0, 1: 0 } },
    reviews: [
      { id: 1, user: "Đỗ Quân", rating: 5, comment: "Căn hộ mới, đủ đồ, ở rất sướng.", date: "2025-08-07" }
    ],
    location: { lat: 21.0081, lng: 105.7704, address: "Q. Nam Từ Liêm, Hà Nội" }
  },
  {
    id: "1012",
    title: "Phòng trọ có bếp riêng, phù hợp sinh viên và cặp đôi trẻ",
    description: "Phòng 20 m² có bếp riêng tại TP Vinh – Bố cục gọn gàng, bếp tách biệt; ban công nhỏ. WC riêng có nóng lạnh, cửa sổ thoáng. Khu yên tĩnh, giờ giấc tự do.",
    images: ["anh/phong12.jpg", "anh/phong13.jpg", "anh/phong14.jpg"],
    img: "anh/phong12.jpg",
    price: "2.3 Triệu/tháng",
    size: "20 m²",
    area: "20 m²",
    address: "TP Vinh, Nghệ An",
    postedDate: "2025-08-06T15:30:00Z",
    category: "Phòng trọ",
    owner: { name: "Hồ L", phone: "0900000012", avatar: "anh/avt.jpg", totalPosts: 2 },
    describe: "Phòng 20 m² có bếp riêng tại TP Vinh – Bố cục gọn gàng, bếp tách biệt với khu ngủ; ban công nhỏ phơi đồ. WC riêng có nóng lạnh, cửa sổ thoáng. Khu vực yên tĩnh, lối đi riêng, giờ giấc tự do; chủ nhà thân thiện. Phù hợp sinh viên và cặp đôi trẻ muốn tự nấu ăn. Chi phí: điện 3.5k/kWh, nước 15k/m³, wifi 50k/phòng.",
    rating: { average: 4.5, total: 11, breakdown: { 5: 7, 4: 3, 3: 1, 2: 0, 1: 0 } },
    reviews: [
      { id: 1, user: "La Thảo", rating: 5, comment: "Bếp riêng tiện, chủ nhà dễ chịu.", date: "2025-08-08" }
    ],
    location: { lat: 18.6796, lng: 105.6813, address: "TP Vinh, Nghệ An" }
  },
  {
    id: "1013",
    title: "Tìm người ở ghép căn hộ 2 phòng ngủ, gần trường đại học",
    description: "Tìm người ở ghép căn hộ 2PN tại Q.1 – Phòng master 20m², tủ áo rộng, ban công view đẹp. Bếp chung đầy đủ đồ, máy giặt riêng. Ưu tiên sinh viên/nhân viên văn phòng, sạch sẽ.",
    images: ["anh/phong13.jpg", "anh/phong14.jpg", "anh/phong15.jpg"],
    img: "anh/phong13.jpg",
    price: "2.5 Triệu/tháng",
    size: "20 m²",
    area: "20 m²",
    address: "Q. 1, TP HCM",
    postedDate: "2025-08-07T10:15:00Z",
    category: "Ở ghép",
    owner: { name: "Lê Minh", phone: "0900000013", avatar: "anh/avt.jpg", totalPosts: 1 },
    describe: "Tìm người ở ghép căn hộ 2PN tại Q.1 – Phòng master 20m², tủ áo rộng, ban công view đẹp. Bếp chung đầy đủ đồ, máy giặt riêng. Hiện có 1 người ở, sạch sẽ, hòa đồng. Ưu tiên sinh viên/nhân viên văn phòng. Chia đều tiền phòng; điện 4k/kWh, nước 20k/m³, wifi 80k/phòng chia theo đầu người.",
    rating: { average: 4.6, total: 8, breakdown: { 5: 5, 4: 2, 3: 1, 2: 0, 1: 0 } },
    reviews: [
      { id: 1, user: "Nguyễn Hà", rating: 5, comment: "Bạn cùng phòng rất thân thiện.", date: "2025-08-08" }
    ],
    location: { lat: 10.7769, lng: 106.7009, address: "Q. 1, TP HCM" }
  },
  {
    id: "1014",
    title: "Nhà nguyên căn 3 phòng ngủ, sân vườn rộng, an ninh tốt",
    description: "Nhà nguyên căn 3PN 120m² tại Q.2 – Sân vườn 50m², gara 2 xe, bếp rộng, phòng khách thoáng. Gần trường quốc tế, siêu thị. Phù hợp gia đình có con nhỏ.",
    images: ["anh/phong14.jpg", "anh/phong15.jpg", "anh/phong16.jpg"],
    img: "anh/phong14.jpg",
    price: "25 Triệu/tháng",
    size: "120 m²",
    area: "120 m²",
    address: "Q. 2, TP HCM",
    postedDate: "2025-08-07T14:30:00Z",
    category: "Nhà nguyên căn",
    owner: { name: "Trần Văn B", phone: "0900000014", avatar: "anh/avt.jpg", totalPosts: 3 },
    describe: "Nhà nguyên căn 3PN 120m² tại Q.2 – Sân vườn 50m², gara 2 xe, bếp rộng, phòng khách thoáng. Full nội thất: sofa, TV, tủ lạnh, bếp từ, máy giặt, máy lạnh từng phòng. Khu dân cư an ninh, gần trường quốc tế, siêu thị. Phù hợp gia đình có con nhỏ. Phí quản lý/gửi xe theo quy định; điện nước giá nhà nước.",
    rating: { average: 4.8, total: 15, breakdown: { 5: 11, 4: 3, 3: 1, 2: 0, 1: 0 } },
    reviews: [
      { id: 1, user: "Phạm Thị C", rating: 5, comment: "Nhà đẹp, sân vườn rộng rãi.", date: "2025-08-09" }
    ],
    location: { lat: 10.7873, lng: 106.7498, address: "Q. 2, TP HCM" }
  },
  {
    id: "1015",
    title: "Phòng trọ cao cấp, view hồ Tây, full nội thất",
    description: "Phòng trọ cao cấp 35m² tại Tây Hồ – View hồ Tây đẹp, ban công rộng, full nội thất cao cấp. Thang máy, hầm để xe, bảo vệ 24/7. Gần trung tâm, thuận tiện đi lại.",
    images: ["anh/phong15.jpg", "anh/phong16.jpg", "anh/phong17.jpg"],
    img: "anh/phong15.jpg",
    price: "5.5 Triệu/tháng",
    size: "35 m²",
    area: "35 m²",
    address: "Q. Tây Hồ, Hà Nội",
    postedDate: "2025-08-08T09:20:00Z",
    category: "Phòng trọ",
    owner: { name: "Nguyễn Thị D", phone: "0900000015", avatar: "anh/avt.jpg", totalPosts: 4 },
    describe: "Phòng trọ cao cấp 35m² tại Tây Hồ – View hồ Tây đẹp, ban công rộng, full nội thất cao cấp: giường nệm, tủ áo, sofa, bàn làm việc, bếp từ, máy lạnh. Thang máy, hầm để xe, bảo vệ 24/7. Gần trung tâm, thuận tiện đi lại. Phù hợp người đi làm, sinh viên cao cấp.",
    rating: { average: 4.9, total: 28, breakdown: { 5: 22, 4: 5, 3: 1, 2: 0, 1: 0 } },
    reviews: [
      { id: 1, user: "Lê Văn E", rating: 5, comment: "View đẹp, phòng sang trọng.", date: "2025-08-09" }
    ],
    location: { lat: 21.0455, lng: 105.8230, address: "Q. Tây Hồ, Hà Nội" }
  },
  {
    id: "1016",
    title: "Phòng trọ sinh viên, giá rẻ, gần trường đại học",
    description: "Phòng trọ sinh viên 18m² tại Cầu Giấy – Giá rẻ, WC riêng, bếp chung. Gần các trường đại học, chợ, trạm xe buýt. Phù hợp sinh viên.",
    images: ["anh/phong16.jpg", "anh/phong17.jpg", "anh/phong18.jpg"],
    img: "anh/phong16.jpg",
    price: "1.8 Triệu/tháng",
    size: "18 m²",
    area: "18 m²",
    address: "Q. Cầu Giấy, Hà Nội",
    postedDate: "2025-08-08T16:45:00Z",
    category: "Phòng trọ",
    owner: { name: "Phạm Văn F", phone: "0900000016", avatar: "anh/avt.jpg", totalPosts: 2 },
    describe: "Phòng trọ sinh viên 18m² tại Cầu Giấy – Giá rẻ, WC riêng, bếp chung. Gần các trường đại học, chợ, trạm xe buýt. Phù hợp sinh viên. Điện 3.5k/kWh, nước 15k/m³, wifi 50k/phòng.",
    rating: { average: 4.3, total: 12, breakdown: { 5: 6, 4: 4, 3: 2, 2: 0, 1: 0 } },
    reviews: [
      { id: 1, user: "Trần Văn G", rating: 4, comment: "Giá rẻ, phù hợp sinh viên.", date: "2025-08-10" }
    ],
    location: { lat: 21.0369, lng: 105.7826, address: "Q. Cầu Giấy, Hà Nội" }
  },
  {
    id: "1017",
    title: "Tìm người ở ghép phòng trọ, gần chợ và trạm xe buýt",
    description: "Tìm người ở ghép phòng trọ 25m² tại Đống Đa – Phòng rộng, tủ áo lớn, bếp chung. Gần chợ, trạm xe buýt, thuận tiện đi lại. Ưu tiên sinh viên.",
    images: ["anh/phong17.jpg", "anh/phong18.jpg", "anh/phong19.jpg"],
    img: "anh/phong17.jpg",
    price: "1.5 Triệu/tháng",
    size: "25 m²",
    area: "25 m²",
    address: "Q. Đống Đa, Hà Nội",
    postedDate: "2025-08-09T11:30:00Z",
    category: "Ở ghép",
    owner: { name: "Hoàng Văn H", phone: "0900000017", avatar: "anh/avt.jpg", totalPosts: 1 },
    describe: "Tìm người ở ghép phòng trọ 25m² tại Đống Đa – Phòng rộng, tủ áo lớn, bếp chung. Gần chợ, trạm xe buýt, thuận tiện đi lại. Hiện có 1 người ở, sạch sẽ, hòa đồng. Ưu tiên sinh viên. Chia đều tiền phòng; điện 3.5k/kWh, nước 15k/m³, wifi 50k/phòng chia theo đầu người.",
    rating: { average: 4.4, total: 7, breakdown: { 5: 4, 4: 2, 3: 1, 2: 0, 1: 0 } },
    reviews: [
      { id: 1, user: "Vũ Thị I", rating: 4, comment: "Bạn cùng phòng dễ thương.", date: "2025-08-10" }
    ],
    location: { lat: 21.0198, lng: 105.8342, address: "Q. Đống Đa, Hà Nội" }
  },
  {
    id: "1018",
    title: "Tìm người ở ghép căn hộ cao cấp, view sông Sài Gòn",
    description: "Tìm người ở ghép căn hộ cao cấp tại Q.7 – Phòng master 30m², view sông Sài Gòn, full nội thất. Tiện ích: hồ bơi, gym, bảo vệ 24/7. Ưu tiên người đi làm.",
    images: ["anh/phong18.jpg", "anh/phong19.jpg", "anh/phong20.jpg"],
    img: "anh/phong18.jpg",
    price: "4.5 Triệu/tháng",
    size: "30 m²",
    area: "30 m²",
    address: "Q. 7, TP HCM",
    postedDate: "2025-08-09T15:20:00Z",
    category: "Ở ghép",
    owner: { name: "Ngô Thị K", phone: "0900000018", avatar: "anh/avt.jpg", totalPosts: 2 },
    describe: "Tìm người ở ghép căn hộ cao cấp tại Q.7 – Phòng master 30m², view sông Sài Gòn, full nội thất. Tiện ích: hồ bơi, gym, bảo vệ 24/7. Hiện có 1 người ở, sạch sẽ, hòa đồng. Ưu tiên người đi làm. Chia đều tiền phòng; điện 4k/kWh, nước 20k/m³, wifi 100k/phòng chia theo đầu người.",
    rating: { average: 4.7, total: 11, breakdown: { 5: 7, 4: 3, 3: 1, 2: 0, 1: 0 } },
    reviews: [
      { id: 1, user: "Lý Văn L", rating: 5, comment: "Căn hộ đẹp, bạn cùng phòng tốt.", date: "2025-08-11" }
    ],
    location: { lat: 10.7626, lng: 106.6602, address: "Q. 7, TP HCM" }
  },
  {
    id: "1019",
    title: "Nhà nguyên căn 4 phòng ngủ, sân thượng rộng, view đẹp",
    description: "Nhà nguyên căn 4PN 150m² tại Q.3 – Sân thượng 30m², gara 3 xe, bếp rộng, phòng khách thoáng. Gần trung tâm, thuận tiện đi lại. Phù hợp gia đình lớn.",
    images: ["anh/phong19.jpg", "anh/phong20.jpg", "anh/phong21.jpg"],
    img: "anh/phong19.jpg",
    price: "35 Triệu/tháng",
    size: "150 m²",
    area: "150 m²",
    address: "Q. 3, TP HCM",
    postedDate: "2025-08-10T08:15:00Z",
    category: "Nhà nguyên căn",
    owner: { name: "Trần Văn M", phone: "0900000019", avatar: "anh/avt.jpg", totalPosts: 5 },
    describe: "Nhà nguyên căn 4PN 150m² tại Q.3 – Sân thượng 30m², gara 3 xe, bếp rộng, phòng khách thoáng. Full nội thất: sofa, TV, tủ lạnh, bếp từ, máy giặt, máy lạnh từng phòng. Gần trung tâm, thuận tiện đi lại. Phù hợp gia đình lớn. Phí quản lý/gửi xe theo quy định; điện nước giá nhà nước.",
    rating: { average: 4.9, total: 18, breakdown: { 5: 14, 4: 3, 3: 1, 2: 0, 1: 0 } },
    reviews: [
      { id: 1, user: "Nguyễn Văn N", rating: 5, comment: "Nhà rộng rãi, sân thượng đẹp.", date: "2025-08-11" }
    ],
    location: { lat: 10.7873, lng: 106.6861, address: "Q. 3, TP HCM" }
  },
  {
    id: "1020",
    title: "Nhà nguyên căn 2 phòng ngủ, thiết kế hiện đại, gần công viên",
    description: "Nhà nguyên căn 2PN 80m² tại Q.1 – Thiết kế hiện đại, ban công lớn, bếp mở. Gần công viên, trung tâm mua sắm. Phù hợp cặp đôi hoặc gia đình nhỏ.",
    images: ["anh/phong20.jpg", "anh/phong21.jpg", "anh/phong22.jpg"],
    img: "anh/phong20.jpg",
    price: "18 Triệu/tháng",
    size: "80 m²",
    area: "80 m²",
    address: "Q. 1, TP HCM",
    postedDate: "2025-08-10T12:30:00Z",
    category: "Nhà nguyên căn",
    owner: { name: "Lê Thị O", phone: "0900000020", avatar: "anh/avt.jpg", totalPosts: 3 },
    describe: "Nhà nguyên căn 2PN 80m² tại Q.1 – Thiết kế hiện đại, ban công lớn, bếp mở. Full nội thất: sofa, TV, tủ lạnh, bếp từ, máy giặt, máy lạnh từng phòng. Gần công viên, trung tâm mua sắm. Phù hợp cặp đôi hoặc gia đình nhỏ. Phí quản lý/gửi xe theo quy định; điện nước giá nhà nước.",
    rating: { average: 4.8, total: 22, breakdown: { 5: 17, 4: 4, 3: 1, 2: 0, 1: 0 } },
    reviews: [
      { id: 1, user: "Phạm Văn P", rating: 5, comment: "Thiết kế đẹp, vị trí thuận lợi.", date: "2025-08-12" }
    ],
    location: { lat: 10.7769, lng: 106.7009, address: "Q. 1, TP HCM" }
  },
  {
    id: "1021",
    title: "Phòng trọ có gác lửng, view đẹp, gần trung tâm",
    description: "Phòng trọ có gác lửng 30m² tại Q.5 – View đẹp, ban công rộng, WC riêng. Gần chợ, trung tâm mua sắm. Phù hợp sinh viên và người đi làm.",
    images: ["anh/phong21.jpg", "anh/phong22.jpg", "anh/phong1.jpg"],
    img: "anh/phong21.jpg",
    price: "3.2 Triệu/tháng",
    size: "30 m²",
    area: "30 m²",
    address: "Q. 5, TP HCM",
    postedDate: "2025-08-11T09:45:00Z",
    category: "Phòng trọ",
    owner: { name: "Vũ Văn Q", phone: "0900000021", avatar: "anh/avt.jpg", totalPosts: 2 },
    describe: "Phòng trọ có gác lửng 30m² tại Q.5 – View đẹp, ban công rộng, WC riêng. Gần chợ, trung tâm mua sắm. Phù hợp sinh viên và người đi làm. Điện 4k/kWh, nước 20k/m³, wifi 80k/phòng.",
    rating: { average: 4.6, total: 16, breakdown: { 5: 10, 4: 4, 3: 2, 2: 0, 1: 0 } },
    reviews: [
      { id: 1, user: "Hoàng Thị R", rating: 5, comment: "Gác lửng rộng, view đẹp.", date: "2025-08-12" }
    ],
    location: { lat: 10.7540, lng: 106.6625, address: "Q. 5, TP HCM" }
  },
  {
    id: "1022",
    title: "Phòng trọ mini, giá rẻ, gần trường đại học",
    description: "Phòng trọ mini 15m² tại Q.10 – Giá rẻ, WC riêng, bếp chung. Gần trường đại học, chợ, trạm xe buýt. Phù hợp sinh viên.",
    images: ["anh/phong22.jpg", "anh/phong1.jpg", "anh/phong2.webp"],
    img: "anh/phong22.jpg",
    price: "1.5 Triệu/tháng",
    size: "15 m²",
    area: "15 m²",
    address: "Q. 10, TP HCM",
    postedDate: "2025-08-11T14:20:00Z",
    category: "Phòng trọ",
    owner: { name: "Đặng Văn S", phone: "0900000022", avatar: "anh/avt.jpg", totalPosts: 1 },
    describe: "Phòng trọ mini 15m² tại Q.10 – Giá rẻ, WC riêng, bếp chung. Gần trường đại học, chợ, trạm xe buýt. Phù hợp sinh viên. Điện 3.5k/kWh, nước 15k/m³, wifi 50k/phòng.",
    rating: { average: 4.2, total: 9, breakdown: { 5: 4, 4: 3, 3: 2, 2: 0, 1: 0 } },
    reviews: [
      { id: 1, user: "Trịnh Văn T", rating: 4, comment: "Giá rẻ, phù hợp sinh viên.", date: "2025-08-13" }
    ],
    location: { lat: 10.7626, lng: 106.6602, address: "Q. 10, TP HCM" }
  },
  {
    id: "1023",
    title: "Phòng trọ gần trường đại học, giá rẻ cho sinh viên",
    description: "Phòng trọ 20m² tại Q.10 – Gần trường đại học, giá rẻ cho sinh viên. WC riêng, bếp chung, wifi miễn phí. An ninh tốt, thuận tiện đi lại.",
    images: ["anh/phong22.jpg", "anh/phong1.jpg", "anh/phong2.webp"],
    img: "anh/phong22.jpg",
    price: "2.8 Triệu/tháng",
    size: "20 m²",
    area: "20 m²",
    address: "Q. 10, TP HCM",
    postedDate: "2025-08-12T10:30:00Z",
    category: "Phòng trọ",
    owner: { name: "Lê Văn R", phone: "0900000023", avatar: "anh/avt.jpg", totalPosts: 3 },
    describe: "Phòng trọ 20m² tại Q.10 – Gần trường đại học, giá rẻ cho sinh viên. WC riêng, bếp chung, wifi miễn phí. An ninh tốt, thuận tiện đi lại.",
    location: { lat: 10.7626, lng: 106.6602, address: "Q. 10, TP HCM" }
  },
  {
    id: "1024",
    title: "Nhà nguyên căn 3 phòng ngủ, sân vườn đẹp",
    description: "Nhà nguyên căn 3PN 120m² tại Q.2 – Sân vườn 50m², gara 2 xe, bếp rộng, phòng khách thoáng. Gần trung tâm, thuận tiện đi lại.",
    images: ["anh/phong1.jpg", "anh/phong2.webp", "anh/phong3.jpeg"],
    img: "anh/phong1.jpg",
    price: "25 Triệu/tháng",
    size: "120 m²",
    area: "120 m²",
    address: "Q. 2, TP HCM",
    postedDate: "2025-08-13T09:15:00Z",
    category: "Nhà nguyên căn",
    owner: { name: "Nguyễn Thị S", phone: "0900000024", avatar: "anh/avt.jpg", totalPosts: 2 },
    describe: "Nhà nguyên căn 3PN 120m² tại Q.2 – Sân vườn 50m², gara 2 xe, bếp rộng, phòng khách thoáng. Gần trung tâm, thuận tiện đi lại.",
    location: { lat: 10.7873, lng: 106.7498, address: "Q. 2, TP HCM" }
  },
  {
    id: "1025",
    title: "Tìm người ở ghép căn hộ cao cấp, view đẹp",
    description: "Tìm người ở ghép căn hộ cao cấp 2PN tại Q.7 – View sông đẹp, ban công rộng, full nội thất. Bếp chung đầy đủ đồ, máy giặt riêng.",
    images: ["anh/phong2.webp", "anh/phong3.jpeg", "anh/phong4.jpg"],
    img: "anh/phong2.webp",
    price: "3.5 Triệu/tháng",
    size: "25 m²",
    area: "25 m²",
    address: "Q. 7, TP HCM",
    postedDate: "2025-08-14T11:45:00Z",
    category: "Ở ghép",
    owner: { name: "Trần Văn T", phone: "0900000025", avatar: "anh/avt.jpg", totalPosts: 1 },
    describe: "Tìm người ở ghép căn hộ cao cấp 2PN tại Q.7 – View sông đẹp, ban công rộng, full nội thất. Bếp chung đầy đủ đồ, máy giặt riêng.",
    location: { lat: 10.7626, lng: 106.6602, address: "Q. 7, TP HCM" }
  }
];

export default postsData;