import React, { useState } from "react";
import Header from "./Header";
import AreaSuggestions from "./AreaSuggestions";
import PostList from "./PostList";
import Footer from "./Footer";

function TrangChuDaDangNhap() {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <main style={{ flex: 1 }}>
        {/* Chỉ hiển thị AreaSuggestions ở trang đầu tiên */}
        {currentPage === 1 && <AreaSuggestions />}
        <PostList onPageChange={handlePageChange} />
      </main>
      <Footer />
    </div>
  );
}

export default TrangChuDaDangNhap; 