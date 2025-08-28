// Hàm lọc bài đăng theo khu vực
export const filterPostsByArea = (posts, province, district) => {
    if (!province || province === 'Toàn quốc') {
      return posts;
    }
  
    return posts.filter(post => {
      const postAddress = post.address || '';
      
      // Chỉ cần kiểm tra tỉnh/thành phố, không cần quận/huyện
      // Vì bài viết thường chỉ ghi tên đường + tỉnh
      if (province && !postAddress.includes(province)) {
        return false;
      }
      
      return true;
    });
  };
  
  // Hàm lọc bài đăng theo loại
  export const filterPostsByCategory = (posts, category) => {
    // Nếu không chọn loại hoặc chọn 'all' thì trả về nguyên danh sách
    
    if (!category || category === 'all') {
      return posts;
    }

    // Chuẩn hóa chuỗi: bỏ dấu tiếng Việt, viết thường, gọn khoảng trắng
    const normalize = (s = '') => String(s)
      .toLowerCase()
      .normalize('NFD').replace(/\p{Diacritic}/gu, '')
      .replace(/\s+/g, ' ')
      .trim();

    // Map giá trị filter từ UI sang nhãn tương ứng trong dữ liệu bài viết
    // 'phongtro' -> 'phong tro', 'nha' -> 'nha nguyen can', 'oghep' -> 'o ghep'
    const mapFilter = (c) => {
      const n = normalize(c);
      if (n === 'phongtro' || n === 'phong tro') return 'phong tro';
      if (n === 'nha' || n === 'nha nguyen can') return 'nha nguyen can';
      if (n === 'oghep' || n === 'o ghep' || n === 'tim nguoi o ghep') return 'o ghep';
      return n;
    };

    // Chuẩn hóa nhãn category của bài viết để so khớp mềm
    const mapPost = (pc) => {
      const n = normalize(pc);
      if (n.includes('phong tro')) return 'phong tro';
      if (n.includes('nha nguyen can')) return 'nha nguyen can';
      if (n.includes('o ghep') || n.includes('tim nguoi o ghep')) return 'o ghep';
      return n;
    };

    const target = mapFilter(category);
    return posts.filter(post => mapPost(post.category) === target);
  };
  
  // Hàm lọc bài đăng theo giá
  export const filterPostsByPrice = (posts, priceRange) => {
    if (!priceRange || !priceRange.min && !priceRange.max) {
      return posts;
    }
    
    return posts.filter(post => {
      const price = extractPriceFromString(post.price);
      if (price === null) return true;
      
      if (priceRange.min && price < priceRange.min) return false;
      if (priceRange.max && price > priceRange.max) return false;
      
      return true;
    });
  };
  
  // Hàm lọc bài đăng theo diện tích
  export const filterPostsBySize = (posts, sizeRange) => {
    if (!sizeRange || !sizeRange.min && !sizeRange.max) {
      return posts;
    }
    
    return posts.filter(post => {
      const size = extractSizeFromString(post.size);
      if (size === null) return true;
      
      if (sizeRange.min && size < sizeRange.min) return false;
      if (sizeRange.max && size > sizeRange.max) return false;
      
      return true;
    });
  };
  
  // Hàm trích xuất giá từ chuỗi (ví dụ: "3 Triệu/tháng" -> 3000000)
  export const extractPriceFromString = (priceString) => {
    if (!priceString) return null;
    
    const match = priceString.match(/(\d+(?:\.\d+)?)\s*(Triệu|Tỷ|Nghìn|K)/i);
    if (!match) return null;
    
    const value = parseFloat(match[1]);
    const unit = match[2].toLowerCase();
    
    switch (unit) {
      case 'tỷ':
        return value * 1000000000;
      case 'triệu':
        return value * 1000000;
      case 'nghìn':
      case 'k':
        return value * 1000;
      default:
        return value;
    }
  };
  
  // Hàm trích xuất diện tích từ chuỗi (ví dụ: "30 m²" -> 30)
  export const extractSizeFromString = (sizeString) => {
    if (!sizeString) return null;
    
    const match = sizeString.match(/(\d+(?:\.\d+)?)/);
    if (!match) return null;
    
    return parseFloat(match[1]);
  };
  
  // Hàm lọc tổng hợp - làm cho việc lọc ít khắc khe hơn
  export const applyAllFilters = (posts, filters) => {
    let filteredPosts = [...posts];
    
    // Lọc theo khu vực (bắt buộc nếu có chọn)
    if (filters.province && filters.province !== 'Toàn quốc') {
      filteredPosts = filterPostsByArea(filteredPosts, filters.province, filters.district);
    }
    
    // Nếu không có bài đăng nào sau khi lọc khu vực, trả về mảng rỗng
    if (filteredPosts.length === 0) {
      return [];
    }
    
    // Lọc theo các tiêu chí khác một cách linh hoạt hơn
    // Thay vì yêu cầu thỏa mãn TẤT CẢ, chỉ cần thỏa mãn một số tiêu chí
    
    // Tạo danh sách các bài đăng thỏa mãn từng tiêu chí
    const categoryMatches = filters.category && filters.category !== 'all' 
      ? filterPostsByCategory(posts, filters.category) 
      : [];
    
    const priceMatches = filters.priceRange && (filters.priceRange.min > 0 || filters.priceRange.max < 10000000)
      ? filterPostsByPrice(posts, filters.priceRange)
      : [];
    
    const sizeMatches = filters.sizeRange && (filters.sizeRange.min > 0 || filters.sizeRange.max < 200)
      ? filterPostsBySize(posts, filters.sizeRange)
      : [];
    
    // Tạo danh sách tất cả các bài đăng thỏa mãn ít nhất một tiêu chí
    const allMatches = new Set();
    
    // Thêm các bài đăng thỏa mãn từng tiêu chí
    categoryMatches.forEach(post => allMatches.add(post.id));
    priceMatches.forEach(post => allMatches.add(post.id));
    sizeMatches.forEach(post => allMatches.add(post.id));
    
    // Nếu có ít nhất một tiêu chí được chọn (không phải mặc định)
    const hasActiveFilters = (filters.category && filters.category !== 'all') ||
                            (filters.priceRange && (filters.priceRange.min > 0 || filters.priceRange.max < 10000000)) ||
                            (filters.sizeRange && (filters.sizeRange.min > 0 || filters.sizeRange.max < 200));
    
    if (hasActiveFilters && allMatches.size > 0) {
      // Lọc ra các bài đăng thỏa mãn ít nhất một tiêu chí
      filteredPosts = filteredPosts.filter(post => allMatches.has(post.id));
    }
    
    return filteredPosts;
  };
  