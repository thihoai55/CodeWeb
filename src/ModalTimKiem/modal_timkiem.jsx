import React from "react";

const Modal = ({ open, onClose, children }) => {
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
          maxWidth: "95vw",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
          // width: 400,
          display: "flex",
          flexDirection: "column"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
