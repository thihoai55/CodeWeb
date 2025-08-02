import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TrangChuChuaDangNhap from "./TrangChuChuaDangNhap/TrangChuChuaDangNhap";
import DangNhap from "./DangNhap/dangnhap";
import DangKy from "./DangKy/dangky";
import TrangChuDaDangNhap from "./TrangChuDaDangNhap/TrangChuDaDangNhap";
import DangBai from "./DangBai/dangbai";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TrangChuChuaDangNhap />} />
        <Route path="/dang-nhap" element={<DangNhap />} />
        <Route path="/dang-ky" element={<DangKy />} />
        <Route path="/trang-chu-da-dang-nhap" element={<TrangChuDaDangNhap />} />
        <Route path="/dang-bai" element={<DangBai />} />
        {/* <Route path="/bo-loc" element={<BoLoc />} /> */}

  
      </Routes>
    </BrowserRouter>
  );
}

export default App;
