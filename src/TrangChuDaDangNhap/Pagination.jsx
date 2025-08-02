import React from "react";

function Pagination() {
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
  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "8px",
      margin: "40px 0",
      padding: "20px 0"
    }}>
      {/* Nút Trang trước */}
      <button style={buttonStyle}
        onMouseEnter={e => {
          e.target.style.background = "#f5f5f5";
          e.target.style.transform = "translateY(-2px)";
          e.target.style.boxShadow = "0 10px 16px -2px rgba(0,0,0,0.18)";
        }}
        onMouseLeave={e => {
          e.target.style.background = "#fff";
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "0 6px 12px -2px rgba(0,0,0,0.15)";
        }}
      >
        <span style={{fontSize: 22, fontWeight: "bold"}}>{"<"}</span>
        Trang trước
      </button>

      {/* Nút số trang */}
      <button style={activeButtonStyle}
        onMouseEnter={e => {
          e.target.style.background = "#1565c0";
          e.target.style.transform = "translateY(-2px)";
          e.target.style.boxShadow = "0 10px 16px -2px rgba(25,118,210,0.28)";
        }}
        onMouseLeave={e => {
          e.target.style.background = "#1976d2";
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "0 6px 12px -2px rgba(25,118,210,0.25)";
        }}
      >
        1
      </button>
      <button style={buttonStyle}
        onMouseEnter={e => {
          e.target.style.background = "#f5f5f5";
          e.target.style.transform = "translateY(-2px)";
          e.target.style.boxShadow = "0 10px 16px -2px rgba(0,0,0,0.18)";
        }}
        onMouseLeave={e => {
          e.target.style.background = "#fff";
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "0 6px 12px -2px rgba(0,0,0,0.15)";
        }}
      >
        2
      </button>
      <button style={buttonStyle}
        onMouseEnter={e => {
          e.target.style.background = "#f5f5f5";
          e.target.style.transform = "translateY(-2px)";
          e.target.style.boxShadow = "0 10px 16px -2px rgba(0,0,0,0.18)";
        }}
        onMouseLeave={e => {
          e.target.style.background = "#fff";
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "0 6px 12px -2px rgba(0,0,0,0.15)";
        }}
      >
        3
      </button>

      {/* Dấu ba chấm */}
      <div
        style={{
          ...buttonStyle,
          color: "#666",
          cursor: "default",
          width: "40px",
          padding: 0,
          justifyContent: "center",
          userSelect: "none",
          pointerEvents: "auto",
          transition: "all 0.2s cubic-bezier(.4,2,.6,1)"
        }}
        onMouseEnter={e => {
          e.target.style.background = "#f0f0f0";
          e.target.style.transform = "translateY(-2px)";
          e.target.style.boxShadow = "0 8px 18px -2px rgba(0,0,0,0.13)";
        }}
        onMouseLeave={e => {
          e.target.style.background = "#fff";
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "0 6px 12px -2px rgba(0,0,0,0.15)";
        }}
      >
        ...
      </div>
      
      {/* Nút Trang sau */}
      <button style={buttonStyle}
        onMouseEnter={e => {
          e.target.style.background = "#f5f5f5";
          e.target.style.transform = "translateY(-2px)";
          e.target.style.boxShadow = "0 10px 16px -2px rgba(0,0,0,0.18)";
        }}
        onMouseLeave={e => {
          e.target.style.background = "#fff";
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "0 6px 12px -2px rgba(0,0,0,0.15)";
        }}
      >
        Trang sau
        <span style={{fontSize: 22, fontWeight: "bold"}}>{">"}</span>
      </button>
    </div>
  );
}

export default Pagination;

