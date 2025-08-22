import React from "react";
import PostCard from "./PostCard";
import Pagination from "./Pagination";
import postsData from "../DaTa/danhsachbaidangg";

function PostList({ posts: customPosts, fixedColumns, onPageChange: parentPageChange }) {
  // State để quản lý trang hiện tại
  const [currentPage, setCurrentPage] = React.useState(1);
  const postsPerPage = 12;

  // Ưu tiên danh sách truyền vào; nếu không có, lấy từ file dữ liệu chung
  const defaultPosts = postsData.map(p => ({
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

  const allPosts = customPosts && customPosts.length > 0 ? customPosts : defaultPosts;

  // Tính toán bài đăng cho trang hiện tại
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Hàm chuyển trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Gọi callback từ component cha nếu có
    if (parentPageChange) {
      parentPageChange(pageNumber);
    }
    // Cuộn lên đầu trang
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const gridTemplate = fixedColumns ? `repeat(${fixedColumns}, 1fr)` : "repeat(auto-fill, minmax(280px, 1fr))";

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
        gridTemplateColumns: gridTemplate,
        gap: "24px",
        justifyContent: "center"
      }}>
        {currentPosts.map((post, idx) => (
          <PostCard post={post} key={idx} />
        ))}
      </div>

      {/* Sử dụng component Pagination với state */}
      <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
    </section>
  );
}

export default PostList;
