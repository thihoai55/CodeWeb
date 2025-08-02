import React from "react";

const Modal = ({ open, onClose, children }) => {


    // console.log("Modal open:", open);

  if (!open) return null;
  
  return (
    <div 
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.25)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px"
      }}
      onClick={onClose}
    >
      <div 
        style={{
          background: "#fff",
          borderRadius: 18,
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
          padding: "15px 0 15px 15px",
          maxWidth: "95vw",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            background: "none",
            border: "none",
            fontSize: 24,
            cursor: "pointer",
            color: "#666"
          }}
        >
          ✕
        </button> */}
        {children}
      </div>
    </div>
  );
};

export default Modal;