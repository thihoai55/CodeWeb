import React from "react";
import Header from "./Header";
import AreaSuggestions from "./AreaSuggestions";
import PostList from "./PostList";
import Pagination from "./Pagination";
import Footer from "./Footer";

function TrangChuChuaDangNhap() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <main style={{ flex: 1 }}>
        <AreaSuggestions />
        <PostList />
        <Pagination />
      </main>
      <Footer />
    </div>
  );
}

export default TrangChuChuaDangNhap; 