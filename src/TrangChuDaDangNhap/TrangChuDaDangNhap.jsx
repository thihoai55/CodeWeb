import React, { useState, useEffect } from "react";
import { useSearch } from "../contexts/ngucanhtimkiem";
import { applyAllFilters } from "../ModalTimKiem/checkDuLieu";
import Header from "./Header";
import AreaSuggestions from "./AreaSuggestions";
import PostList from "./PostList";
import Footer from "./Footer";
import { postsData } from "../DaTa/danhsachbaidangg";

function TrangChuDaDangNhap() {
  const [currentPage, setCurrentPage] = useState(1);
  const { searchFilters, isSearchActive } = useSearch();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Reset về trang 1 khi có filter mới
  useEffect(() => {
    setCurrentPage(1);
  }, [searchFilters.province, searchFilters.district, searchFilters.category, searchFilters.priceRange, searchFilters.sizeRange]);

  // Đọc publicPosts từ localStorage và map về định dạng PostList/PostCard đang dùng
  // Lý do: để bài vừa đăng (được lưu ở 'publicPosts') xuất hiện trên trang chủ ngay lập tức,
  // kể cả khi không truyền props 'posts' từ bên ngoài.
  const publicPosts = React.useMemo(() => {
    try {
      const raw = localStorage.getItem('publicPosts');
      const arr = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(arr)) return [];
      return arr.map(p => ({
        id: p.id,
        title: p.title,
        img: p.img || (Array.isArray(p.images) && p.images[0]) || '',
        price: p.price,
        size: p.size || p.area,
        area: p.area,
        address: p.address,
        postedDate: p.postedDate,
        category: p.category,
        owner: p.owner
      }));
    } catch { return []; }
  }, []);

  // Áp dụng filter vào danh sách bài đăng seed (danh sách tĩnh ban đầu)
  const filteredSeed = isSearchActive ? applyAllFilters(postsData, searchFilters) : postsData;

  // Lọc public theo category nếu người dùng đang chọn danh mục cụ thể
  // Map giá trị filter ('phongtro'|'nha'|'oghep') sang nhãn hiển thị ('Phòng trọ'|...)
  const filteredPublic = React.useMemo(() => {
    const cat = (searchFilters?.category || '').toLowerCase();
    if (!cat || cat === 'all') return publicPosts;
    const label = cat === 'phongtro' ? 'Phòng trọ' : cat === 'nha' ? 'Nhà nguyên căn' : cat === 'oghep' ? 'Ở ghép' : '';
    if (!label) return publicPosts;
    return publicPosts.filter(p => p.category === label);
  }, [publicPosts, searchFilters?.category]);

  // Hợp nhất: luôn đặt public lên đầu, đồng thời loại bỏ trùng id với seed để không nhân đôi bài
  const filteredPosts = React.useMemo(() => {
    const pubIds = new Set(filteredPublic.map(p => p.id));
    const rest = filteredSeed.filter(p => !pubIds.has(p.id));
    return [...filteredPublic, ...rest];
  }, [filteredPublic, filteredSeed]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <main style={{ flex: 1 }}>
        {/* Chỉ hiển thị AreaSuggestions ở trang đầu tiên và khi không có filter */}
        {currentPage === 1 && !searchFilters.province && <AreaSuggestions />}
        <PostList 
          posts={filteredPosts} 
          onPageChange={handlePageChange}
          isSearchActive={isSearchActive}
          searchFilters={searchFilters}
        />
      </main>
      <Footer />
    </div>
  );
}

export default TrangChuDaDangNhap; 