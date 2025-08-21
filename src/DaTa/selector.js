// src/data/selectors.js
import { postsData } from './danhsachbaidangg';

const toAbsolute = (url) => {
  if (!url) return '';
  return url.startsWith('/') ? url : `/${url}`;
};

export const normalizedPosts = postsData.map(p => ({
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

