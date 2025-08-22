import React from "react";
import { postsData } from "../DaTa/danhsachbaidangg";

function Pagination({ currentPage, onPageChange }) {
  // Tính toán số trang dựa trên dữ liệu thực tế
  const postsPerPage = 12;
  const totalPosts = postsData.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const goTo = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const buttonStyle = {
    padding: "10px 16px",
    border: "1px solid #000",
    borderRadius: "8px",
    background: "#fff",
    color: "#333",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.2s ease",
    boxShadow: "0 6px 12px -2px rgba(0,0,0,0.15)",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    minWidth: "50px",
    height: "50px",
    justifyContent: "center"
  };
  
  const activeButtonStyle = {
    ...buttonStyle,
    background: "#1976d2",
    color: "#fff",
    boxShadow: "0 6px 12px -2px rgba(25,118,210,0.25)"
  };

  // Chỉ hiển thị phân trang nếu có nhiều hơn 1 trang
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "8px",
      margin: "40px 0",
      padding: "10px 0"
    }}>
      {/* Nút Trang trước */}
      <button style={buttonStyle}
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 1}
        onMouseEnter={e => {
          if (currentPage !== 1) {
            e.target.style.background = "#f5f5f5";
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 10px 16px -2px rgba(0,0,0,0.18)";
          }
        }}
        onMouseLeave={e => {
          if (currentPage !== 1) {
            e.target.style.background = "#fff";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 6px 12px -2px rgba(0,0,0,0.15)";
          }
        }}
      >
        <span style={{fontSize: 22, fontWeight: "bold"}}>{"<"}</span>
        Trang trước
      </button>

      {/* Nút số trang */}
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNumber => (
        <button 
          key={pageNumber}
          style={currentPage === pageNumber ? activeButtonStyle : buttonStyle}
          onClick={() => goTo(pageNumber)}
          onMouseEnter={e => {
            e.target.style.background = currentPage === pageNumber ? "#1565c0" : "#f5f5f5";
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = currentPage === pageNumber ? "0 10px 16px -2px rgba(25,118,210,0.28)" : "0 10px 16px -2px rgba(0,0,0,0.18)";
          }}
          onMouseLeave={e => {
            e.target.style.background = currentPage === pageNumber ? "#1976d2" : "#fff";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = currentPage === pageNumber ? "0 6px 12px -2px rgba(25,118,210,0.25)" : "0 6px 12px -2px rgba(0,0,0,0.15)";
          }}
        >
          {pageNumber}
        </button>
      ))}
      
      {/* Nút Trang sau */}
      <button style={buttonStyle}
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage === totalPages}
        onMouseEnter={e => {
          if (currentPage !== totalPages) {
            e.target.style.background = "#f5f5f5";
            e.target.style.transform = "translateY(-2px)";
            e.target.style.boxShadow = "0 10px 16px -2px rgba(0,0,0,0.18)";
          }
        }}
        onMouseLeave={e => {
          if (currentPage !== totalPages) {
            e.target.style.background = "#fff";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 6px 12px -2px rgba(0,0,0,0.15)";
          }
        }}
      >
        Trang sau
        <span style={{fontSize: 22, fontWeight: "bold"}}>{">"}</span>
      </button>
    </div>
  );
}

export default Pagination;

