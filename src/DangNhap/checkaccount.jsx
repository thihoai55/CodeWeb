import { accounts } from '../DaTa/account.js';

// Hàm đăng nhập sử dụng toán tử 3 ngôi - có thể đăng nhập bằng email, số điện thoại hoặc username
export const loginWithTernary = (identifier, password) => {
  // Validation đầu vào
  if (!identifier || !password) {
    return { 
      success: false, 
      message: "Vui lòng nhập đầy đủ thông tin đăng nhập!" 
    };
  }

  // Loại bỏ khoảng trắng thừa
  const cleanIdentifier = identifier.trim();
  const cleanPassword = password.trim();

  // Tìm account trong danh sách - kiểm tra username, email hoặc số điện thoại
  const account = accounts.find(acc => 
    acc.username === cleanIdentifier || 
    acc.email === cleanIdentifier || 
    acc.phone === cleanIdentifier
  );
  
  // Sử dụng toán tử 3 ngôi để kiểm tra đăng nhập
  return account 
    ? (account.password === cleanPassword 
        ? { 
            success: true, 
            account: {
              username: account.username,
              role: account.role,
              name: account.name,
              phone: account.phone,
              email: account.email,
              balance: account.balance // Thêm balance
            }, 
            message: "Đăng nhập thành công!" 
          }
        : { success: false, message: "Mật khẩu không đúng!" })
    : { success: false, message: "Tài khoản không tồn tại!" };
};

// Hàm kiểm tra role với toán tử 3 ngôi
export const checkRoleWithTernary = (identifier) => {
  // Validation đầu vào
  if (!identifier) {
    return "Vui lòng nhập thông tin tài khoản!";
  }

  const cleanIdentifier = identifier.trim();

  const account = accounts.find(acc => 
    acc.username === cleanIdentifier || 
    acc.email === cleanIdentifier || 
    acc.phone === cleanIdentifier
  );
  
  return account 
    ? (account.role === "admin" 
        ? "Quản trị viên"
        : account.role === "host" 
          ? "Chủ trọ" 
          : account.role === "renter" 
            ? "Người thuê" 
            : "Không xác định")
    : "Tài khoản không tồn tại";
};

// Hàm kiểm tra quyền truy cập với toán tử 3 ngôi
export const checkAccessWithTernary = (identifier, requiredRole) => {
  // Validation đầu vào
  if (!identifier || !requiredRole) {
    return { 
      hasAccess: false, 
      message: "Vui lòng nhập đầy đủ thông tin!" 
    };
  }

  const cleanIdentifier = identifier.trim();

  const account = accounts.find(acc => 
    acc.username === cleanIdentifier || 
    acc.email === cleanIdentifier || 
    acc.phone === cleanIdentifier
  );
  
  return account 
    ? (account.role === requiredRole || account.role === "admin"
        ? { hasAccess: true, message: "Có quyền truy cập" }
        : { hasAccess: false, message: "Không có quyền truy cập" })
    : { hasAccess: false, message: "Tài khoản không tồn tại" };
};

// Hàm kiểm tra tài khoản tồn tại
export const checkAccountExists = (identifier) => {
  if (!identifier) {
    return { exists: false, message: "Vui lòng nhập thông tin!" };
  }

  const cleanIdentifier = identifier.trim();
  
  const account = accounts.find(acc => 
    acc.username === cleanIdentifier || 
    acc.email === cleanIdentifier || 
    acc.phone === cleanIdentifier
  );

  return account 
    ? { exists: true, account: account, message: "Tài khoản tồn tại" }
    : { exists: false, message: "Tài khoản không tồn tại" };
};

// Hàm lấy thông tin tài khoản
export const getAccountInfo = (identifier) => {
  if (!identifier) {
    return null;
  }

  const cleanIdentifier = identifier.trim();
  
  return accounts.find(acc => 
    acc.username === cleanIdentifier || 
    acc.email === cleanIdentifier || 
    acc.phone === cleanIdentifier
  ) || null;
};
