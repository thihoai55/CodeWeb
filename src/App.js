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
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TrangChuChuaDangNhap />} />
        <Route path="/dang-nhap" element={<DangNhap />} />
        <Route path="/dang-ky" element={<DangKy />} />
        <Route path="/trang-chu-da-dang-nhap" element={<TrangChuDaDangNhap />} />
        <Route path="/dang-bai" element={<DangBai />} />
        <Route path="/thanh-toan" element={<ThanhToan />} />
        <Route path="/xem-bai-dang/:id" element={<XemBaiDang />} />
        <Route path="/quan-ly-bai-dang/" element={<QuanLyBaiDang />} />
        <Route path="/sua-bai/" element={<SuaBai />} />
        {/* <Route path="/bo-loc" element={<BoLoc />} /> */}

  
      </Routes>
    </BrowserRouter>
  );
}

export default App;
