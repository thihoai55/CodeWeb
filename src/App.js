import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TrangChuChuaDangNhap from "./TrangChuChuaDangNhap/TrangChuChuaDangNhap";
import DangNhap from "./DangNhap/dangnhap";
import DangKy from "./DangKy/dangky";
import TrangChuDaDangNhap from "./TrangChuDaDangNhap/TrangChuDaDangNhap";
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
import Trang2 from "./ChuyenTrang/Trang2";
import Trang3 from "./ChuyenTrang/Trang3";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TrangChuChuaDangNhap />} />
        <Route path="/trang-2" element={<Trang2 />} />
        <Route path="/trang-3" element={<Trang3 />} />
        <Route path="/dang-nhap" element={<DangNhap />} />
        <Route path="/dang-ky" element={<DangKy />} />
        <Route path="/trang-chu-da-dang-nhap" element={<TrangChuDaDangNhap />} />
        <Route path="/dang-bai" element={<DangBai />} />
        <Route path="/thanh-toan" element={<ThanhToan />} />
        <Route path="/xem-bai-dang/:id" element={<XemBaiDang />} />
        <Route path="/quan-ly-bai-dang/" element={<QuanLyBaiDang />} />
        <Route path="/sua-bai/" element={<SuaBai />} />
        <Route path="/lich-su-giao-dich" element={<QuanLyGiaoDich />} />
        <Route path="/lich-su-nap-tien" element={<LichSuNapTien />} />
        {/* <Route path="/bo-loc" element={<BoLoc />} /> */}

        
        <Route path="/thong-tin-ca-nhan" element={<ThongTinCaNhan />} />
        <Route path="/doi-mat-khau" element={<DoiMatKhau />} />
        <Route path="/lien-he-tro-giup" element={<LienHeTroGiup />} />
        <Route path="/nap-tien" element={<NapTien />} />
        <Route path="/hop-dong-cho-thue" element={<HopDongChoThue />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
