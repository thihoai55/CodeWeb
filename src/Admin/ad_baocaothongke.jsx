import React, { useMemo, useState, useEffect } from 'react';
import AdHeader from './ad_header';
import AdSidebar from './ad_sidebar';

//co giãn kích thước cho biểu đồđồ
const ResponsiveContainer = ({ aspect = 16 / 9, minHeight = 260, maxHeight = 520, children }) => {
  const [size, setSize] = useState({ width: 0, height: minHeight });
  const containerRef = React.useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => {
      const width = el.clientWidth || 0;
      const height = Math.min(Math.max(Math.round(width / aspect), minHeight), maxHeight);
      setSize({ width, height });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      {size.width > 0 && children(size.width, size.height)}
    </div>
  );
};

// Thành phần biểu đồ thanh động 
const BarChart = ({ data, width = 800, height = 400, color = '#f4a261', key }) => {
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  // Các thanh cách 50
  const rawMax = Math.max(...data, 1);
  const yMax = Math.max(50, Math.ceil(rawMax / 50) * 50);
  const barWidth = innerWidth / data.length - 10;

  // hiệu ứng
  const barAnimationStyle = {
    animation: key ? 'barUpdate 0.8s ease-out forwards' : 'barGrow 1.2s ease-out forwards',
    transformOrigin: 'bottom',
    opacity: 0,
  };

  const textAnimationStyle = {
    animation: 'fadeInUp 0.8s ease-out forwards',
    animationDelay: '0.6s',
    opacity: 0,
  };

  return (
    <>
      <style>
        {`
                     @keyframes barGrow {
             0% {
               transform: scaleY(0);
               opacity: 0;
             }
             50% {
               opacity: 1;
             }
             100% {
               transform: scaleY(1);
               opacity: 1;
             }
           }
           
           @keyframes barUpdate {
             0% {
               transform: scaleY(0.8);
               opacity: 0.7;
             }
             50% {
               transform: scaleY(1.1);
               opacity: 1;
             }
             100% {
               transform: scaleY(1);
               opacity: 1;
             }
           }
          
          @keyframes fadeInUp {
            0% {
              transform: translateY(10px);
              opacity: 0;
            }
            100% {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }
          
          .bar-hover {
            transition: all 0.3s ease;
          }
          
          .bar-hover:hover {
            transform: scaleY(1.1);
            filter: brightness(1.2);
            cursor: pointer;
          }
          
          .grid-line {
            animation: fadeIn 0.8s ease-out forwards;
          }
          
          @keyframes fadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
        `}
      </style>
      <svg width={width} height={height} style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        {/* Trục */}
        <g transform={`translate(${padding.left},${padding.top})`}>
          {/* Lưới theo 50*/}
          {Array.from({ length: Math.floor(yMax / 50) + 1 }).map((_, idx) => {
            const val = idx * 50;
            const t = val / yMax;
            const y = innerHeight * (1 - t);
            return (
              <g key={val}>
                <line 
                  x1={0} 
                  x2={innerWidth} 
                  y1={y} 
                  y2={y} 
                  stroke="#eee" 
                  className="grid-line"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                />
                {idx > 0 && (
                  <text 
                    x={-10} 
                    y={y} 
                    textAnchor="end" 
                    dominantBaseline="middle" 
                    fill="#666" 
                    fontSize={12}
                    className="grid-line"
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    {val}
                  </text>
                )}
              </g>
            );
          })}

          {/* Các thanh có hiệu ứng */}
          {data.map((v, i) => {
            const x = i * (innerWidth / data.length) + 5;
            const h = (v / yMax) * innerHeight;
            const y = innerHeight - h;
            return (
              <g key={i}>
                <rect 
                  x={x} 
                  y={y} 
                  width={barWidth} 
                  height={h} 
                  fill={color} 
                  rx={4} 
                  className="bar-hover"
                  style={{
                    ...barAnimationStyle,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
                <text 
                  x={x + barWidth / 2} 
                  y={innerHeight + 14} 
                  textAnchor="middle" 
                  fill="#666" 
                  fontSize={12}
                  style={{
                    ...textAnimationStyle,
                    animationDelay: `${0.6 + i * 0.05}s`,
                  }}
                >
                  {`T${i + 1}`}
                </text>
              </g>
            );
          })}
        </g>
      </svg>
    </>
  );
};

// Thành phần biểu đồ tròn động
const PieChart = ({ data, width = 280, height = 280, colors, legend, key }) => {
  const radius = Math.min(width, height) / 2;
  const centerX = width / 2;
  const centerY = height / 2;
  const sum = data.reduce((a, b) => a + b.value, 0) || 1;

  let startAngle = -Math.PI / 2; // bắt đầu từ trên

  const arcs = data.map((d, idx) => {
    const angle = (d.value / sum) * Math.PI * 2;
    const endAngle = startAngle + angle;

    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);
    const largeArc = angle > Math.PI ? 1 : 0;

    const path = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;

    const midAngle = startAngle + angle / 2;
    const labelX = centerX + (radius * 0.6) * Math.cos(midAngle);
    const labelY = centerY + (radius * 0.6) * Math.sin(midAngle);

    const arc = { path, color: colors[idx % colors.length], labelX, labelY, percent: ((d.value / sum) * 100).toFixed(1) };
    startAngle = endAngle;
    return arc;
  });

  return (
    <>
      <style>
        {`
                     @keyframes pieGrow {
             0% {
               transform: scale(0) rotate(0deg);
               opacity: 0;
             }
             50% {
               transform: scale(0.8) rotate(180deg);
               opacity: 0.8;
             }
             100% {
               transform: scale(1) rotate(360deg);
               opacity: 1;
             }
           }
          
          @keyframes labelFadeIn {
            0% {
              opacity: 0;
              transform: scale(0.8);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          @keyframes legendSlideIn {
            0% {
              transform: translateX(-20px);
              opacity: 0;
            }
            100% {
              transform: translateX(0);
              opacity: 1;
            }
          }
          
                     .pie-slice {
             animation: pieGrow 1.5s ease-out forwards;
             transform-origin: center;
           }
          
          .pie-label {
            animation: labelFadeIn 0.6s ease-out forwards;
            animation-delay: 0.8s;
            opacity: 0;
          }
          
                     .legend-item {
             animation: legendSlideIn 0.5s ease-out forwards;
             opacity: 0;
           }
           
           .legend-item:hover {
             transform: translateX(5px);
             transition: transform 0.2s ease;
           }
           
           .legend-item:hover span:first-child {
             transform: scale(1.2);
             transition: transform 0.2s ease;
           }
        `}
      </style>
             <div style={{ display: 'flex', gap: 24, alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
        <svg width={width} height={height} style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          {arcs.map((a, i) => (
            <path 
              key={i} 
              d={a.path} 
              fill={a.color} 
              className="pie-slice"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
          {arcs.map((a, i) => (
            <text 
              key={`t-${i}`} 
              x={a.labelX} 
              y={a.labelY} 
              textAnchor="middle" 
              dominantBaseline="middle" 
              fill="#fff" 
              fontSize={14} 
              fontWeight={600}
              className="pie-label"
              style={{ animationDelay: `${0.8 + i * 0.1}s` }}
            >
              {arcs[i].percent}%
            </text>
          ))}
        </svg>

        {/* Legend */}
        <div style={{ padding: 16, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          {legend.map((l, idx) => (
                         <div 
               key={l} 
               style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, animationDelay: `${0.5 + idx * 0.1}s` }}
               className="legend-item"
             >
              <span style={{ width: 12, height: 12, borderRadius: 3, background: colors[idx % colors.length] }} />
              <span style={{ color: '#333', fontSize: 14 }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const AdBaoCaoThongKe = () => {
  const [selectedMonth, setSelectedMonth] = useState(3);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [loading, setLoading] = useState(false);
  const [dataBar, setDataBar] = useState([]);
  const [dataStatus, setDataStatus] = useState([]);
  const [dataLoaiPhong, setDataLoaiPhong] = useState([]);
  const [kpis, setKpis] = useState({ totalViews: 0, totalPosts: 0, approved: 0, pending: 0, rejected: 0 });
  const [chartKey, setChartKey] = useState(0); // Key để force re-render biểu đồ, hiển thị lại 

  // Simulated fetch functions (thay thế bằng API sau, dữ liệu giả lập)
  const fetchMonthlyPosts = async (year) => {

    const seasonFactor = [
      1.0,  
      0.8,  
      0.8,  
      0.85, 
      1.3,  
      1.4,  
      1.55, 
      1.45, 
      1.35, 
      1.25, 
      1.2,  
      1.0   
    ];
    const yearFactor = year === 2023 ? 0.9 : year === 2025 ? 1.1 : 1.0;
    const base = 100;
    const rand = (i) => 0.95 + ((i * 733 + year * 97) % 31) / 200; // dao động nhẹ

    const data = Array.from({ length: 12 }).map((_, idx) => {
      const month = idx + 1;
      const total = Math.round(base * seasonFactor[idx] * yearFactor * rand(idx));
      return Math.max(0, total);
    });
    return new Promise((resolve) => setTimeout(() => resolve(data), 220));
  };

  const fetchMonthlyViews = async (year) => {
    const seasonFactor = [
      1.0,  
      0.85, 
      0.85, 
      0.9,  
      1.35, 
      1.5,  
      1.7,  
      1.6,  
      1.4,  
      1.3,  
      1.2,  
      1.0   
    ];
    const yearFactor = year === 2023 ? 0.9 : year === 2025 ? 1.12 : 1.0;
    const base = 1500;
    const rand = (i) => 0.93 + ((i * 997 + year * 123) % 47) / 200; // dao động nhẹ
    const data = Array.from({ length: 12 }).map((_, idx) => {
      return Math.max(0, Math.round(base * seasonFactor[idx] * yearFactor * rand(idx)));
    });
    return new Promise((resolve) => setTimeout(() => resolve(data), 240));
  };

  const fetchStatusData = async (month, year) => {
    // Trả về tỉ lệ để  chia theo tổng bài của tháng đã tính ở trên
    const approvedRatio = 0.6 + ((month % 3) - 1) * 0.05 + (year === 2025 ? 0.03 : year === 2023 ? -0.03 : 0);
    const pendingRatio = 0.25 + ((year % 2) ? 0.02 : -0.02);
    const rejectedRatio = Math.max(0.05, 1 - approvedRatio - pendingRatio);
    return new Promise((resolve) => setTimeout(() => resolve({ approvedRatio, pendingRatio, rejectedRatio }), 200));
  };

  const fetchTypeData = async (month, year) => {
    // thay đổi theo tháng/năm
    const roomPercent = 52 + (month % 6) * 2 + (year === 2025 ? 2 : year === 2023 ? -2 : 0);
    const a = Math.min(85, Math.max(30, roomPercent));
    const b = 100 - a;
    const data = [
      { label: 'Phòng trọ', value: a },
      { label: 'Ở ghép', value: b }
    ];
    return new Promise((resolve) => setTimeout(() => resolve(data), 200));
  };

  const refetch = async () => {
    setLoading(true);
    // Tăng key để force re-render biểu đồ với animation mới
    setChartKey(prev => prev + 1);
    try {
      const [monthlyPosts, monthlyViews, statusRatios, types] = await Promise.all([
        fetchMonthlyPosts(selectedYear),
        fetchMonthlyViews(selectedYear),
        fetchStatusData(selectedMonth, selectedYear),
        fetchTypeData(selectedMonth, selectedYear)
      ]);
      setDataBar(monthlyPosts);
      const totalPosts = monthlyPosts[selectedMonth - 1] || 0;
      const newStatus = [
        { label: 'Đã duyệt', value: Math.round(totalPosts * statusRatios.approvedRatio) },
        { label: 'Chờ duyệt', value: Math.round(totalPosts * statusRatios.pendingRatio) },
        { label: 'Từ chối', value: Math.max(0, totalPosts - Math.round(totalPosts * statusRatios.approvedRatio) - Math.round(totalPosts * statusRatios.pendingRatio)) }
      ];
      setDataStatus(newStatus);
      setDataLoaiPhong(types);
      const approved = newStatus.find(x => x.label === 'Đã duyệt')?.value || 0;
      const pending = newStatus.find(x => x.label === 'Chờ duyệt')?.value || 0;
      const rejected = newStatus.find(x => x.label === 'Từ chối')?.value || 0;
      const totalViews = monthlyViews.reduce((s, v) => s + v, 0);
      setKpis({ totalViews, totalPosts, approved, pending, rejected });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
    
  }, [selectedMonth, selectedYear]);

  return (
    <div className="admin-layout">
      <AdHeader />
      <div className="admin-content">
        <AdSidebar />
        <main className="admin-main">
          <div style={{ padding: 20 }}>
            <style>
              {`
                @keyframes fadeInDown {
                  0% {
                    transform: translateY(-20px);
                    opacity: 0;
                  }
                  100% {
                    transform: translateY(0);
                    opacity: 1;
                  }
                }
                
                .page-title {
                  animation: fadeInDown 0.8s ease-out forwards;
                }
                
                   .chart-container {
                   animation: fadeInDown 1s ease-out forwards;
                   animation-delay: 0.3s;
                   opacity: 0;
                 }
                 
                 .pie-chart-container {
                   animation: fadeInDown 1.2s ease-out forwards;
                   animation-delay: 0.5s;
                   opacity: 0;
                 }
              `}
            </style>
            <h2 
              className="page-title"
              style={{ margin: '10px 0 20px', color: '#2a73cc', fontWeight: 700 }}
            >
              Báo cáo - Thống kê
            </h2>

            {/* KPI Cards với hiệu ứng */}
            <style>
              {`
                @keyframes slideInUp {
                  0% {
                    transform: translateY(30px);
                    opacity: 0;
                  }
                  100% {
                    transform: translateY(0);
                    opacity: 1;
                  }
                }
                
                @keyframes numberCount {
                  0% {
                    opacity: 0;
                    transform: scale(0.8);
                  }
                  100% {
                    opacity: 1;
                    transform: scale(1);
                  }
                }
                
                .kpi-card {
                  animation: slideInUp 0.6s ease-out forwards;
                  transition: all 0.3s ease;
                  cursor: pointer;
                }
                
                .kpi-card:hover {
                  transform: translateY(-5px);
                  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
                }
                
                .kpi-number {
                  animation: numberCount 0.8s ease-out forwards;
                  animation-delay: 0.3s;
                  opacity: 0;
                }
                
                .loading-pulse {
                  animation: pulse 1.5s ease-in-out infinite;
                }
              `}
            </style>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 16 }}>
              <div 
                className="kpi-card"
                style={{ 
                  background: '#fff', 
                  borderRadius: 10, 
                  padding: 14, 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  animationDelay: '0.1s'
                }}
              >
                <div style={{ color: '#6b7280', fontSize: 12 }}>Tổng lượt xem năm {selectedYear}</div>
                <div className="kpi-number" style={{ fontSize: 22, fontWeight: 700, color: '#111827' }}>
                  {loading ? <span className="loading-pulse">...</span> : kpis.totalViews.toLocaleString('vi-VN')}
                </div>
              </div>
              <div 
                className="kpi-card"
                style={{ 
                  background: '#fff', 
                  borderRadius: 10, 
                  padding: 14, 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  animationDelay: '0.2s'
                }}
              >
                <div style={{ color: '#6b7280', fontSize: 12 }}>Tổng bài ({selectedMonth}/{selectedYear})</div>
                <div className="kpi-number" style={{ fontSize: 22, fontWeight: 700, color: '#111827' }}>
                  {loading ? <span className="loading-pulse">...</span> : kpis.totalPosts.toLocaleString('vi-VN')}
                </div>
              </div>
              <div 
                className="kpi-card"
                style={{ 
                  background: '#fff', 
                  borderRadius: 10, 
                  padding: 14, 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  animationDelay: '0.3s'
                }}
              >
                <div style={{ color: '#10b981', fontSize: 12 }}>Đã duyệt</div>
                <div className="kpi-number" style={{ fontSize: 22, fontWeight: 700, color: '#10b981' }}>
                  {loading ? <span className="loading-pulse">...</span> : kpis.approved.toLocaleString('vi-VN')}
                </div>
              </div>
              <div 
                className="kpi-card"
                style={{ 
                  background: '#fff', 
                  borderRadius: 10, 
                  padding: 14, 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  animationDelay: '0.4s'
                }}
              >
                <div style={{ color: '#f59e0b', fontSize: 12 }}>Chờ duyệt</div>
                <div className="kpi-number" style={{ fontSize: 22, fontWeight: 700, color: '#f59e0b' }}>
                  {loading ? <span className="loading-pulse">...</span> : kpis.pending.toLocaleString('vi-VN')}
                </div>
              </div>
              <div 
                className="kpi-card"
                style={{ 
                  background: '#fff', 
                  borderRadius: 10, 
                  padding: 14, 
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  animationDelay: '0.5s'
                }}
              >
                <div style={{ color: '#ef4444', fontSize: 12 }}>Từ chối</div>
                <div className="kpi-number" style={{ fontSize: 22, fontWeight: 700, color: '#ef4444' }}>
                  {loading ? <span className="loading-pulse">...</span> : kpis.rejected.toLocaleString('vi-VN')}
                </div>
              </div>
            </div>

            {/* Lọc với hiệu ứng */}
            <style>
              {`
                @keyframes slideInRight {
                  0% {
                    transform: translateX(-30px);
                    opacity: 0;
                  }
                  100% {
                    transform: translateX(0);
                    opacity: 1;
                  }
                }
                
                .filter-container {
                  animation: slideInRight 0.8s ease-out forwards;
                  animation-delay: 0.6s;
                  opacity: 0;
                }
                
                .filter-select {
                  transition: all 0.3s ease;
                  border: 1px solid #ddd;
                }
                
                .filter-select:focus {
                  border-color: #2a73cc;
                  box-shadow: 0 0 0 3px rgba(42, 115, 204, 0.1);
                  outline: none;
                }
                
                .filter-button {
                  transition: all 0.3s ease;
                  position: relative;
                  overflow: hidden;
                }
                
                .filter-button:hover {
                  transform: translateY(-2px);
                  box-shadow: 0 4px 12px rgba(42, 115, 204, 0.3);
                }
                
                .filter-button:active {
                  transform: translateY(0);
                }
                
                .filter-button::before {
                  content: '';
                  position: absolute;
                  top: 0;
                  left: -100%;
                  width: 100%;
                  height: 100%;
                  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                  transition: left 0.5s;
                }
                
                .filter-button:hover::before {
                  left: 100%;
                }
              `}
            </style>
            <div 
              className="filter-container"
              style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#fff', padding: '12px 16px', borderRadius: 8, boxShadow: '0 2px 6px rgba(0,0,0,0.06)', marginBottom: 16, width: 'fit-content' }}
            >
              <select 
                value={selectedMonth} 
                onChange={(e) => setSelectedMonth(Number(e.target.value))} 
                className="filter-select"
                style={{ padding: '8px 12px', borderRadius: 6 }}
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <select 
                value={selectedYear} 
                onChange={(e) => setSelectedYear(Number(e.target.value))} 
                className="filter-select"
                style={{ padding: '8px 12px', borderRadius: 6 }}
              >
                {[2023, 2024, 2025].map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <button 
                onClick={refetch} 
                className="filter-button"
                style={{ background: '#2a73cc', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', cursor: 'pointer' }}
              >
                {loading ? 'Đang tải...' : 'Xem'}
              </button>
            </div>

            {/* Biểu đồ thanh */}
            <div className="chart-container" style={{ marginBottom: 24 }}>
              <ResponsiveContainer aspect={16/9} minHeight={260} maxHeight={460}>
                {(w, h) => (
                  <BarChart 
                    key={`bar-${chartKey}`}
                    data={dataBar} 
                    width={w} 
                    height={h} 
                    color="#ee9b00" 
                  />
                )}
              </ResponsiveContainer>
            </div>

            {/* Biểu đồ tròn */}
            <div 
              className="pie-chart-container"
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                gap: 24, 
                alignItems: 'start',
                marginTop: 16
              }}
            >
              <div style={{ 
                background: '#fff', 
                borderRadius: 12, 
                padding: 20, 
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                textAlign: 'center'
              }}>
                <h3 style={{ margin: '0 0 16px 0', color: '#2a73cc', fontSize: 16, fontWeight: 600 }}>
                  Trạng thái bài đăng
                </h3>
                <ResponsiveContainer aspect={1} minHeight={280} maxHeight={320}>
                  {(w, h) => (
                    <PieChart
                      key={`pie-status-${chartKey}`}
                      data={dataStatus}
                      width={Math.min(w, 280)}
                      height={Math.min(h, 280)}
                      colors={["#e63946", "#f4a261", "#e9c46a"]}
                      legend={["Đã duyệt", "Chờ duyệt", "Từ chối"]}
                    />
                  )}
                </ResponsiveContainer>
              </div>
              
              <div style={{ 
                background: '#fff', 
                borderRadius: 12, 
                padding: 20, 
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                textAlign: 'center'
              }}>
                <h3 style={{ margin: '0 0 16px 0', color: '#2a73cc', fontSize: 16, fontWeight: 600 }}>
                  Loại phòng
                </h3>
                <ResponsiveContainer aspect={1} minHeight={280} maxHeight={320}>
                  {(w, h) => (
                    <PieChart
                      key={`pie-type-${chartKey}`}
                      data={dataLoaiPhong}
                      width={Math.min(w, 280)}
                      height={Math.min(h, 280)}
                      colors={["#2a73cc", "#49a078"]}
                      legend={["Phòng trọ", "Ở ghép"]}
                    />
                  )}
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdBaoCaoThongKe;
