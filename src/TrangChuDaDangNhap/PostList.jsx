import React from "react";
import PostCard from "./PostCard";
import Pagination from "./Pagination";
import { postsData } from "../DaTa/danhsachbaidangg";

function PostList({ posts: customPosts, fixedColumns, onPageChange: parentPageChange, isSearchActive, searchFilters }) {
  // State để quản lý trang hiện tại
  const [currentPage, setCurrentPage] = React.useState(1);
  const postsPerPage = 12;

  // Lấy thêm bài công khai từ localStorage (được thêm khi người dùng đăng/Thanh toán)
  // Đọc publicPosts để hợp nhất vào danh sách hiển thị khi đã đăng nhập
  // Lý do: sau khi thanh toán, bài mới được lưu ở localStorage['publicPosts']
  // nên cần đưa vào đây để hiện ngay trên trang chủ mà không cần backend
  const [publicPosts, setPublicPosts] = React.useState([]);

  React.useEffect(() => {
    const loadPublicPosts = () => {
      try {
        const raw = localStorage.getItem('publicPosts');
        const arr = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(arr)) return [];
        const mappedPosts = arr.map(p => ({
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

  // Ưu tiên danh sách truyền vào; nếu không có, hợp nhất publicPosts + dữ liệu seed
  // Hợp nhất: publicPosts lên đầu, tiếp theo là seed
  const defaultPosts = [...publicPosts, ...postsData.map(p => ({
    title: p.title,
    img: p.img,
    price: p.price,
    size: p.size,
    address: p.address,
    id: p.id,
    postedAt: p.postedAt,
    owner: p.owner,
    category: p.category
  }))];

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

  // Hiển thị thông báo không có bài đăng nếu đang tìm kiếm
  if (isSearchActive && allPosts.length === 0) {
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
        }}>
          Kết quả tìm kiếm
        </h2>
        <p style={{
          textAlign: "center",
          padding: "40px",
          color: "#666",
          fontSize: "18px",
          marginBottom: "20px"
        }}>
          {isSearchActive
            ? `Không có bài đăng nào phù hợp với tiêu chí tìm kiếm: ${searchFilters.province}`
            : "Không có bài đăng nào phù hợp với tiêu chí tìm kiếm."
          }
        </p>
        {isSearchActive && (
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "12px 24px",
              border: "none",
              borderRadius: "12px",
              background: "#1976d2",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              transition: "all 0.2s ease"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#1565c0";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "#1976d2";
            }}
          >
            Xóa bộ lọc
          </button>
        )}
      </section>
    );
  }

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
      }}>
        {isSearchActive ? "Kết quả tìm kiếm" : "Tin mới đăng"}
      </h2>
      
      {/* Hiển thị thông tin filter nếu đang tìm kiếm */}
      {/* {isSearchActive && (
        <div style={{
          background: "#e3f2fd",
          padding: "16px",
          borderRadius: "12px",
          marginBottom: "24px",
          border: "1px solid #bbdefb"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "12px"
          }}>
            <div style={{ 
              display: "flex", 
              flexDirection: "column", 
              gap: "8px",
              flex: 1 
            }}>
              <div style={{ 
                fontSize: "16px", 
                color: "#1976d2", 
                fontWeight: "600" 
              }}>
                Bộ lọc đang áp dụng:
              </div>
              <div style={{ 
                display: "flex", 
                flexWrap: "wrap", 
                gap: "8px" 
              }}>
                {searchFilters.province && searchFilters.province !== 'Toàn quốc' && (
                  <span style={{
                    background: "#1976d2",
                    color: "#fff",
                    padding: "4px 12px",
                    borderRadius: "16px",
                    fontSize: "12px",
                    fontWeight: "500"
                  }}>
                    📍 {searchFilters.province}
                  </span>
                )}
                {searchFilters.category && searchFilters.category !== 'all' && (
                  <span style={{
                    background: "#4caf50",
                    color: "#fff",
                    padding: "4px 12px",
                    borderRadius: "16px",
                    fontSize: "12px",
                    fontWeight: "500"
                  }}>
                    🏠 {searchFilters.category === 'phongtro' ? 'Phòng trọ' : 
                         searchFilters.category === 'nha' ? 'Nhà nguyên căn' : 
                         searchFilters.category === 'oghep' ? 'Ở ghép' : searchFilters.category}
                  </span>
                )}
                {searchFilters.priceRange && (searchFilters.priceRange.min > 0 || searchFilters.priceRange.max < 10000000) && (
                  <span style={{
                    background: "#ff9800",
                    color: "#fff",
                    padding: "4px 12px",
                    borderRadius: "16px",
                    fontSize: "12px",
                    fontWeight: "500"
                  }}>
                    💰 {searchFilters.priceRange.min > 0 ? `${(searchFilters.priceRange.min / 1000000).toFixed(1)}M` : '0'} - 
                    {searchFilters.priceRange.max < 10000000 ? `${(searchFilters.priceRange.max / 1000000).toFixed(1)}M` : '∞'}
                  </span>
                )}
                {searchFilters.sizeRange && (searchFilters.sizeRange.min > 0 || searchFilters.sizeRange.max < 200) && (
                  <span style={{
                    background: "#9c27b0",
                    color: "#fff",
                    padding: "4px 12px",
                    borderRadius: "16px",
                    fontSize: "12px",
                    fontWeight: "500"
                  }}>
                    📏 {searchFilters.sizeRange.min > 0 ? `${searchFilters.sizeRange.min}m²` : '0m²'} - 
                    {searchFilters.sizeRange.max < 200 ? `${searchFilters.sizeRange.max}m²` : '∞'}
                  </span>
                )}
              </div>
              <div style={{ 
                fontSize: "12px", 
                color: "#1976d2", 
                fontStyle: "italic" 
              }}>
                💡 Hiển thị bài đăng thỏa mãn ít nhất một tiêu chí trên
              </div>
            </div>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: "8px 16px",
                border: "none",
                borderRadius: "8px",
                background: "#1976d2",
                color: "#fff",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s ease",
                whiteSpace: "nowrap"
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#1565c0";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#1976d2";
              }}
            >
              Xóa bộ lọc
            </button>
          </div>
        </div>
      )} */}
      
      {currentPosts.length === 0 ? (
        <div style={{
          textAlign: "center",
          padding: "40px",
          color: "#666",
          fontSize: "18px"
        }}>
          Không có bài đăng nào phù hợp với tiêu chí tìm kiếm.
        </div>
      ) : (
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
      )}

      {/* Sử dụng component Pagination với state */}
      <Pagination 
        currentPage={currentPage} 
        onPageChange={handlePageChange} 
        data={allPosts}
      />
    </section>
  );
}

export default PostList;
