import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchProvider } from "./contexts/ngucanhtimkiem";
import DangNhap from "./DangNhap/dangnhap";
import DangKy from "./DangKy/dangky";
import ProtectedRoute from "./routes/ProtectedRoute";

// Trang chưa đăng nhập
import TrangChuChuaDangNhap from "./TrangChuChuaDangNhap/TrangChuChuaDangNhap";

// Trang đã đăng nhập  
import TrangChuDaDangNhap from "./TrangChuDaDangNhap/TrangChuDaDangNhap";

// 3 trang chung cho cả hai nhóm
import TrangPhongTro from "./Chuyentrang/TrangPhongTro";
import TrangNhaNguyenCan from "./Chuyentrang/TrangNhaNguyenCan";
import TrangOGhep from "./Chuyentrang/TrangOGhep";

import DangBai from "./DangBai/dangbai";
import ThanhToan from "./ThanhToan/thanhtoan";
import XemBaiDang from "./XemChiTietBaiDang/Xembaidang";
import QuanLyBaiDang from "./QuanLyBaiDang/baidang";
import SuaBai from "./SuaBai/suabai";
import QuanLyGiaoDich from "./QuanLyGiaoDich/lichsugiaodich";
import LichSuNapTien from "./QuanLyGiaoDich/lichsunaptien";
import ThongTinCaNhan from "./ThongTinCaNhan/thongtincanhan";
import DoiMatKhau from "./ThongTinCaNhan/doimatkhau";
import LienHeTroGiup from "./LienHeTroGiup/lienhetrogiup";
import NapTien from "./NapTien/naptien";
import HopDongChoThue from "./HopDongChoThue/hopdongchothue";
import ThongBaoSideBar from "./ThongBao/ThongBaoSiderBar";

// Admin pages
import XemThongTinNguoiDung from "./Admin/xemthongtinnguoidung";
import SuaThongTinNguoiDung from "./Admin/suathongtinnguoidung";
import AdThongTinCaNhan from "./Admin/ad_thongtincanhan";
import AdDoiMatKhau from "./Admin/ad_doimatkhau";
import AdTrangChu from "./Admin/ad_trangchu";
import AdDuyetKiemDuyet from "./Admin/ad_duyetkiemduyet";
import AdBaiDang from "./Admin/ad_baidang";
import AdChiTietBaiDang from "./Admin/ad_chitietbaidang";
import AdThongBaoSidebar from "./Admin/ad_thongbaosidebar";
import AdBaoCaoThongKe from "./Admin/ad_baocaothongke";
import { NotificationsProvider } from "./Admin/ad_du_lieu_thong_bao";


function App() {
  return (
    <SearchProvider>
      <NotificationsProvider>
      <BrowserRouter>
        <Routes>
          {/* Chưa đăng nhập */}
          <Route path="/" element={<TrangChuChuaDangNhap />} />
          <Route path="/phong-tro" element={<TrangPhongTro />} />
          <Route path="/nha-nguyen-can" element={<TrangNhaNguyenCan />} />
          <Route path="/o-ghep" element={<TrangOGhep />} />
          <Route path="/dang-nhap" element={<DangNhap />} />
          <Route path="/dang-ky" element={<DangKy />} />

          {/* Đã đăng nhập */}
          <Route path="/trang-chu-da-dang-nhap" element={<TrangChuDaDangNhap />} />
          <Route path="/phong-tro-da-dang-nhap" element={<TrangPhongTro />} />
          <Route path="/nha-nguyen-can-da-dang-nhap" element={<TrangNhaNguyenCan />} />
          <Route path="/o-ghep-da-dang-nhap" element={<TrangOGhep />} />

          {/* Khác */}
          <Route path="/dang-bai" element={<DangBai />} />
          <Route path="/thanh-toan" element={<ThanhToan />} />
          <Route path="/xem-bai-dang/:id" element={<XemBaiDang />} />
          <Route path="/quan-ly-bai-dang" element={<QuanLyBaiDang />} />
          <Route path="/sua-bai/" element={<SuaBai />} />
          <Route path="/lich-su-giao-dich" element={<QuanLyGiaoDich />} />
          <Route path="/lich-su-nap-tien" element={<LichSuNapTien />} />
          <Route path="/thong-tin-ca-nhan" element={<ThongTinCaNhan />} />
          <Route path="/doi-mat-khau" element={<DoiMatKhau />} />
          <Route path="/lien-he-tro-giup" element={<LienHeTroGiup />} />
          <Route path="/nap-tien" element={<NapTien />} />
          <Route path="/hop-dong-cho-thue" element={<HopDongChoThue />} />
          <Route path="/thong-bao" element={<ThongBaoSideBar />} />

          {/* Admin Routes */}

          <Route
            path="/admin/quan-ly-nguoi-dung"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <XemThongTinNguoiDung />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/sua-thong-tin-nguoi-dung"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <SuaThongTinNguoiDung />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/thong-tin-ca-nhan"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdThongTinCaNhan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/doi-mat-khau"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdDoiMatKhau />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdTrangChu />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/duyet-kiem-duyet"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdDuyetKiemDuyet />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/bao-cao-thong-ke"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdBaoCaoThongKe />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/quan-ly-bai-dang"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdBaiDang />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/chi-tiet-bai-dang/:postId"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdChiTietBaiDang />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/thong-bao"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdThongBaoSidebar />
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
      </NotificationsProvider>
    </SearchProvider>
  );
}

export default App;