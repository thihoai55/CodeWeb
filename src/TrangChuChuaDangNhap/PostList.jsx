import React from "react";
import PostCard from "./PostCard";

function PostList() {
  // Dữ liệu mẫu
  const posts = [
    {
      title: "Phòng trọ mới xây sạch sẽ, gần trung tâm thành phố, có đầy đủ tiện nghi,...",
      img: "https://th.bing.com/th/id/OIP.8XnAKLQnuXCfnp-s2PdTDQHaFj?w=261&h=196&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
      price: "1 triệu / tháng",
      size: "20 m²",
      address: "Trần Phú, Thành phố Huế",
    },
    {
      title: "Phòng trọ cho nữ thuê không gian được trang trí đẹp mắt,...",
      img: "https://bandon.vn/uploads/posts/thiet-ke-nha-tro-dep-2020-bandon-0.jpg",
      price: "2.5 triệu / tháng",
      size: "30 m²",
      address: "Nguyễn Huệ, Tp Huế",
    },
    {
      title: "Phòng trọ có gác lửng, kệ bếp, phòng vệ sinh khép kín",
      img: "https://s-housing.vn/wp-content/uploads/2022/09/thiet-ke-phong-tro-dep-54.jpg",
      price: "2.5 triệu / tháng",
      size: "25 m²",
      address: "29/3, Đà Nẵng",
    },
    {
      title: "Tìm người ở ghép gần trung tâm thành phố đã có đầy đủ nội thất,..",
      img: "https://bandon.vn/uploads/thiet-ke-nha-tro-dep-2020-bandon-11.jpg",
      price: "5.5 triệu / tháng",
      size: "50 m²",
      address: "TP Vinh, Nghệ An",
    },
    {
      title: "Căn hộ mini tiện lợi cho cả học sinh và dân văn phòng vừa mới xây xong",
      img: "https://bandon.vn/uploads/thiet-ke-nha-tro-dep-2020-bandon-28.jpg",
      price: "3 triệu / tháng",
      size: "30 m²",
      address: "Bà Triệu, TP Huế",
    },
    {
      title: "Phòng trọ với không gian ấm cúm có ghế sofa và gác lửng,..",
      img: "https://spacet-release.s3.ap-southeast-1.amazonaws.com/img/blog/2023-10-04/mau-thiet-ke-phong-tro-voi-tone-xanh-chu-dao-651cda6bc9649b0ef5c6f638.webp",
      price: "2 triệu / tháng",
      size: "30 m²",
      address: "Phan Chu Trinh, Hà Nội",
    },
    {
      title: "Tùm người ở ghépp trong căn hộ có gác lửng rộng 65m2,...",
      img: "https://cdn.chotot.com/uEHaEtr9GcI7nnaADBciNGcK8M6tZeRs4-d_tWcAJmg/preset:listing/plain/1e324e89c3d81eafc71e4a9e218a7304-2940712751021281457.jpg",
      price: "2 triệu / tháng",
      size: "35 m²",
      address: "Phan Đình Phùng, HCM",
    },
    {
      title: "Phòng trọ đẹp đẽ, thoáng mát cho sinh viên nữ thuê ngay trung tâm thành phố.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-AeWsUvnoaVjuPKqX1KdVtku9WoNQKrPczg&s",
      price: "6.5 triệu / tháng",
      size: "50 m²",
      address: "Phường Bãi Cháy, Hạ Long",
    },
  ];
  return (
    <section style={{
      margin: "40px 0",
      padding: "0 32px",
      maxWidth: "1200px",
      marginLeft: "auto",
      marginRight: "auto"
    }}>
      <h2 style={{
        fontSize: "28px",
        fontWeight: "bold",
        marginBottom: "24px",
        color: "#333"
      }}>Tin mới đăng</h2>
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "24px",
        justifyContent: "center"
      }}>
        {posts.map((post, idx) => (
          <PostCard post={post} key={idx} />
        ))}
      </div>
    </section>
  );
}

export default PostList;
