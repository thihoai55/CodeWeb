// src/data/selectors.js
import { postsData } from './danhsachbaidangg';

// Chuẩn hóa đường dẫn ảnh:
// - Nếu là đường dẫn tương đối (ảnh trong public) thì thêm '/'
// - Nếu là http/https hoặc data URL (khi người dùng upload) thì giữ nguyên
const toAbsolute = (url) => {
  if (!url) return '';
  const s = String(url);
  if (s.startsWith('/') || s.startsWith('http://') || s.startsWith('https://') || s.startsWith('data:')) return s;
  return `/${s}`;
};

// Đọc danh sách bài CÔNG KHAI từ localStorage để merge thêm vào nguồn dữ liệu seed
const fromLocalPublic = () => {
  try {
    const raw = localStorage.getItem('publicPosts');
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
};

// Hợp nhất: ưu tiên publicPosts (bài mới) nằm trước seed để hiển thị “trên đầu”
const mergedPostsSource = (() => {
  const publicPosts = fromLocalPublic();
  // Ưu tiên publicPosts trước để bài mới lên đầu
  return [...publicPosts, ...postsData];
})();

export const normalizedPosts = mergedPostsSource.map(p => ({
  id: p.id,
  title: p.title,
  address: p.address,
  price: p.price,
  area: p.area || p.size || '',
  postedDate: p.postedDate,
  category: p.category,
  images: (p.images && p.images.length ? p.images : (p.img ? [p.img] : []))
    .map(toAbsolute),
  description: p.description || p.describe || '',
  owner: p.owner
    ? {
        ...p.owner,
        avatar: toAbsolute(p.owner.avatar),
      }
    : { name: '', phone: '', avatar: '', totalPosts: 0 },
  rating: p.rating || { average: 0, total: 0, breakdown: {} },
  reviews: p.reviews || [],
  map: {
    address: (p.location && p.location.address) || p.address || '',
    lat: p.location?.lat ?? null,
    lng: p.location?.lng ?? null,
  },
}));

export const getPostById = (id) =>
  normalizedPosts.find(p => p.id === String(id));

