import React from "react";
import HeaderDa from "../TrangChuDaDangNhap/Header";
import HeaderGuest from "../TrangChuChuaDangNhap/Header";
import PostListDa from "../TrangChuDaDangNhap/PostList";
import PostListGuest from "../TrangChuChuaDangNhap/PostList";
import FooterDa from "../TrangChuDaDangNhap/Footer";
import FooterGuest from "../TrangChuChuaDangNhap/Footer";
import postsData from "../DaTa/danhsachbaidangg";

function TrangPhongTro() {
  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true';
  const Header = isLoggedIn ? HeaderDa : HeaderGuest;
  const PostList = isLoggedIn ? PostListDa : PostListGuest;
  const Footer = isLoggedIn ? FooterDa : FooterGuest;

  const readPublic = () => {
    try {
      const raw = localStorage.getItem('publicPosts');
      const arr = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(arr)) return [];
      return arr
        .filter(p => p.category === 'Phòng trọ')
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

  const phongTroSeed = postsData
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

  const phongTroPosts = [...readPublic(), ...phongTroSeed];

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