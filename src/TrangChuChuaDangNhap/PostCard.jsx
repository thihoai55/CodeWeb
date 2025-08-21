import React from "react";
import { useNavigate } from "react-router-dom";

function PostCard({ post }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/xem-bai-dang/${post.id}`);
  };

  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        borderRadius: "10px",
        padding: "0",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        cursor: "pointer",
        overflow: "hidden"
      }}
      onClick={handleClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.045)";
        e.currentTarget.style.boxShadow = "0 10px 32px 0 rgba(25,118,210,0.18)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
      }}
    >
      <img 
        src={post.img} 
        alt={post.title} 
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          display: "block"
        }} 
      />
      <div style={{padding: "16px"}}>
        <h3 style={{
          fontSize: "16px",
          margin: "0 0 8px 0",
          fontWeight: "500",
          lineHeight: "1.4",
          color: "#333",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden"
        }}>
          {post.title}
        </h3>
        <div style={{
          color: "#1976d2",
          fontWeight: "bold",
          fontSize: "16px",
          marginBottom: "8px"
        }}>
          {post.price}
        </div>
        <div style={{
          fontSize: "14px",
          color: "#666",
          marginBottom: "4px"
        }}>
          {post.size}
        </div>
        <div style={{
          fontSize: "14px",
          color: "#666",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}>
          {post.address}
        </div>
      </div>
    </div>
  );
}

export default PostCard;
