import React from "react";
import Header from "../TrangChuChuaDangNhap/Header";
import PostList from "../TrangChuChuaDangNhap/PostList";
import Footer from "../TrangChuChuaDangNhap/Footer";
import postsData from "../DaTa/danhsachbaidangg";

function TrangOGhep() {
  const readPublic = () => {
    try {
      const raw = localStorage.getItem('publicPosts');
      const arr = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(arr)) return [];
      return arr
        .filter(p => p.category === 'Ở ghép')
        .map(p => ({
          title: p.title,
          img: p.img || (Array.isArray(p.images) && p.images[0]) || '',
          price: p.price,
          size: p.size || p.area,
          address: p.address,
          id: p.id,
          postedAt: p.postedAt,
          owner: p.owner,
          category: p.category
        }));
    } catch { return []; }
  };

  const oGhepSeed = postsData
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

  const oGhepPosts = [...readPublic(), ...oGhepSeed];

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
