import React from "react";
import Header from "../TrangChuChuaDangNhap/Header";
import PostList from "../TrangChuChuaDangNhap/PostList";
import Footer from "../TrangChuChuaDangNhap/Footer";
import postsData from "../DaTa/danhsachbaidangg";

function TrangOGhep() {
  // Lọc chỉ bài đăng ở ghép
  const oGhepPosts = postsData
    .filter(post => post.category === "Ở ghép")
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
            Tìm người ở ghép
          </h1>
          <p style={{
            fontSize: "16px",
            color: "#666",
            maxWidth: "600px",
            margin: "0 auto"
          }}>
            Tìm bạn cùng phòng hoặc chia sẻ không gian sống. Tiết kiệm chi phí, tạo mối quan hệ mới.
          </p>
        </div>
        <PostList posts={oGhepPosts} title="Tìm người ở ghép" />
      </div>
      <Footer />
    </div>
  );
}

export default TrangOGhep;
