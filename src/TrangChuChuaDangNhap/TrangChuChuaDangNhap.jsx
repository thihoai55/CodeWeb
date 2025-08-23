import React, { useState, useEffect } from "react";
import { useSearch } from "../contexts/ngucanhtimkiem";
import Header from "./Header";
import AreaSuggestions from "./AreaSuggestions";
import PostList from "./PostList";
import Footer from "./Footer";

function TrangChuChuaDangNhap() {
  const [currentPage, setCurrentPage] = useState(1);
  const { searchFilters } = useSearch();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Reset về trang 1 khi có filter mới
  useEffect(() => {
    setCurrentPage(1);
  }, [searchFilters.province, searchFilters.district, searchFilters.category]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <main style={{ flex: 1 }}>
        {/* Chỉ hiển thị AreaSuggestions ở trang đầu tiên và khi không có filter */}
        {currentPage === 1 && !searchFilters.province && <AreaSuggestions />}
        <PostList onPageChange={handlePageChange} />
      </main>
      <Footer />
    </div>
  );
}

export default TrangChuChuaDangNhap; 