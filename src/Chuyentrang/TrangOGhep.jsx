import React from "react";
import HeaderDa from "../TrangChuDaDangNhap/Header";
import HeaderGuest from "../TrangChuChuaDangNhap/Header";
import PostListDa from "../TrangChuDaDangNhap/PostList";
import PostListGuest from "../TrangChuChuaDangNhap/PostList";
import FooterDa from "../TrangChuDaDangNhap/Footer";
import FooterGuest from "../TrangChuChuaDangNhap/Footer";
import postsData from "../DaTa/danhsachbaidangg";

function TrangOGhep() {
  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true';
  const Header = isLoggedIn ? HeaderDa : HeaderGuest;
  const PostList = isLoggedIn ? PostListDa : PostListGuest;
  const Footer = isLoggedIn ? FooterDa : FooterGuest;

  const [publicPosts, setPublicPosts] = React.useState([]);

  React.useEffect(() => {
    const loadPublicPosts = () => {
      try {
        const raw = localStorage.getItem('publicPosts');
        const arr = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(arr)) return [];
        const mappedPosts = arr
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
        setPublicPosts(mappedPosts);
      } catch { 
        setPublicPosts([]); 
      }
    };

    // Load lần đầu
    loadPublicPosts();

    // Lắng nghe sự thay đổi của publicPosts
    const handlePublicPostsUpdate = () => {
      loadPublicPosts();
    };

    window.addEventListener('publicPostsUpdated', handlePublicPostsUpdate);
    window.addEventListener('storage', (e) => {
      if (e.key === 'publicPosts') {
        loadPublicPosts();
      }
    });

    return () => {
      window.removeEventListener('publicPostsUpdated', handlePublicPostsUpdate);
    };
  }, []);

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

  const oGhepPosts = [...publicPosts, ...oGhepSeed];

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