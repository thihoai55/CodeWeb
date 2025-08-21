import React from "react";
import PostCard from "./PostCard";
import postsData from "../data/danhsachbaidang";


function PostList({ posts: customPosts, fixedColumns }) {
  // Ưu tiên danh sách truyền vào; nếu không có, lấy từ file dữ liệu chung
  const defaultPosts = postsData.map(p => ({
    title: p.title,
    img: p.img,
    price: p.price,
    size: p.size,
    address: p.address,
    id: p.id,
    postedAt: p.postedAt,
    owner: p.owner
  }));

  const posts = customPosts && customPosts.length > 0 ? customPosts : defaultPosts;
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
        {posts.map((post, idx) => (
          <PostCard post={post} key={idx} />
        ))}
      </div>
    </section>
  );
}

export default PostList;
