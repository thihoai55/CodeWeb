import React from "react";
import Header from "../TrangChuChuaDangNhap/Header";
import PostList from "../TrangChuChuaDangNhap/PostList";
import Footer from "../TrangChuChuaDangNhap/Footer";
import postsData from "../DaTa/danhsachbaidangg";

function TrangPhongTro() {
  // Lọc chỉ bài đăng phòng trọ
  const phongTroPosts = postsData
    .filter(post => post.category === "Phòng trọ")
    .map(p => ({
      title: p.title,
      img: p.img,
      price: p.price,
      size: p.size,
      address: p.address,
      id: p.id,
      postedAt: p.postedAt,
      owner: p.owner,
      category: p.category
    }));

  return (
    <div>
      <Header />
      <div style={{ paddingTop: "20px" }}>
        <div style={{
          textAlign: "center",
          marginBottom: "30px",
          padding: "0 20px"
        }}>
          <h1 style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "#333",
            marginBottom: "10px"
          }}>
            Phòng trọ cho thuê
          </h1>
          <p style={{
            fontSize: "16px",
            color: "#666",
            maxWidth: "600px",
            margin: "0 auto"
          }}>
            Tìm kiếm phòng trọ phù hợp với nhu cầu của bạn. Đa dạng về vị trí, giá cả và tiện nghi.
          </p>
        </div>
        <PostList posts={phongTroPosts} title="Phòng trọ cho thuê" />
      </div>
      <Footer />
    </div>
  );
}

export default TrangPhongTro;
