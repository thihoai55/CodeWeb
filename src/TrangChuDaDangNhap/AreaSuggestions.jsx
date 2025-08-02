import React from "react";

function AreaSuggestions() {
  const areas = [
    { 
      name: "Nghệ An", 
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa-K2Z8tzNsWWF5VZVImVSugv9f7hzEqvJ2g&s"
    },
    { 
      name: "Thành Phố Huế", 
      img: "https://pystravel.vn/_next/image?url=https%3A%2F%2Fbooking.pystravel.vn%2Fuploads%2Fposts%2Favatar%2F1701611330.jpg&w=3840&q=75"
    },
    { 
      name: "Đà Nẵng", 
      img: "https://i2.ex-cdn.com/crystalbay.com/files/content/2025/03/28/dia-diem-chup-anh-dep-o-da-nang-1-1452.jpg"
    },
  ];
  return (
    <section style={{
      margin: "40px 0",
      padding: "0 32px",
      maxWidth: "1200px",
      marginLeft: "auto",
      marginRight: "auto"
    }}>
      <h2 style={{
        fontSize: "28px",
        fontWeight: "bold",
        marginBottom: "24px",
        color: "#333"
      }}>Gợi ý khu vực</h2>
      <div
        style={{
          display: "flex",
          gap: "24px",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {areas.map((area) => (
          <div
            key={area.name}
            style={{
              position: "relative",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              transition: "transform 0.22s cubic-bezier(.4,2,.6,1), box-shadow 0.22s cubic-bezier(.4,2,.6,1)",
              cursor: "pointer",
              flex: 1, 
              minWidth: 0, 
              height: "220px", 
              display: "flex",
              alignItems: "stretch",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "scale(1.045)";
              e.currentTarget.style.boxShadow = "0 10px 32px 0 rgba(25,118,210,0.18)";
              const img = e.currentTarget.querySelector('img');
              if (img) img.style.filter = 'brightness(1.08)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
              const img = e.currentTarget.querySelector('img');
              if (img) img.style.filter = '';
            }}
          >
            <img
              src={area.img}
              alt={area.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transition: "filter 0.22s cubic-bezier(.4,2,.6,1)"
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "12px",
                left: "12px",
                color: "white",
                fontWeight: "bold",
                fontSize: "18px",
                textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
              }}
            >
              {area.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AreaSuggestions;
