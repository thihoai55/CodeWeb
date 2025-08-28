import React from "react";
import HeaderDa from "../TrangChuDaDangNhap/Header";
import HeaderGuest from "../TrangChuChuaDangNhap/Header";
import PostListDa from "../TrangChuDaDangNhap/PostList";
import PostListGuest from "../TrangChuChuaDangNhap/PostList";
import FooterDa from "../TrangChuDaDangNhap/Footer";
import FooterGuest from "../TrangChuChuaDangNhap/Footer";
import postsData from "../DaTa/danhsachbaidangg";

function TrangNhaNguyenCan() {
  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true';
  const Header = isLoggedIn ? HeaderDa : HeaderGuest;
  const PostList = isLoggedIn ? PostListDa : PostListGuest;
  const Footer = isLoggedIn ? FooterDa : FooterGuest;

  // Lọc chỉ bài đăng nhà nguyên căn
  const nhaNguyenCanPosts = postsData
    .filter(post => post.category === "Nhà nguyên căn")
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
            Nhà nguyên căn cho thuê
          </h1>
          <p style={{
            fontSize: "16px",
            color: "#666",
            maxWidth: "600px",
            margin: "0 auto"
          }}>
            Khám phá các căn nhà nguyên căn đầy đủ tiện nghi, phù hợp cho gia đình và nhóm bạn.
          </p>
        </div>
        <PostList posts={nhaNguyenCanPosts} title="Nhà nguyên căn cho thuê" />
      </div>
      <Footer />
    </div>
  );
}

export default TrangNhaNguyenCan;