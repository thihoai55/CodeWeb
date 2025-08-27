import React, { useMemo, useState, useEffect } from 'react';
import AdHeader from './ad_header';
import AdSidebar from './ad_sidebar';

// Simple responsive container without external deps
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

// Simple SVG BarChart component
const BarChart = ({ data, width = 800, height = 400, color = '#f4a261' }) => {
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  // Round Y max to nearest 50 for clean ticks (50, 100, 150, ...)
  const rawMax = Math.max(...data, 1);
  const yMax = Math.max(50, Math.ceil(rawMax / 50) * 50);
  const barWidth = innerWidth / data.length - 10;

  return (
    <svg width={width} height={height} style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      {/* Axes */}
      <g transform={`translate(${padding.left},${padding.top})`}>
        {/* Y grid lines at steps of 50 */}
        {Array.from({ length: Math.floor(yMax / 50) + 1 }).map((_, idx) => {
          const val = idx * 50;
          const t = val / yMax;
          const y = innerHeight * (1 - t);
          return (
            <g key={val}>
              <line x1={0} x2={innerWidth} y1={y} y2={y} stroke="#eee" />
              {idx > 0 && (
                <text x={-10} y={y} textAnchor="end" dominantBaseline="middle" fill="#666" fontSize={12}>
                  {val}
                </text>
              )}
            </g>
          );
        })}

        {/* Bars */}
        {data.map((v, i) => {
          const x = i * (innerWidth / data.length) + 5;
          const h = (v / yMax) * innerHeight;
          const y = innerHeight - h;
          return (
            <g key={i}>
              <rect x={x} y={y} width={barWidth} height={h} fill={color} rx={4} />
              <text x={x + barWidth / 2} y={innerHeight + 14} textAnchor="middle" fill="#666" fontSize={12}>
                {`T${i + 1}`}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
};

// Simple SVG PieChart component
const PieChart = ({ data, width = 360, height = 360, colors, legend }) => {
  const radius = Math.min(width, height) / 2;
  const centerX = width / 2;
  const centerY = height / 2;
  const sum = data.reduce((a, b) => a + b.value, 0) || 1;

  let startAngle = -Math.PI / 2; // start at top

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
    <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>
      <svg width={width} height={height} style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        {arcs.map((a, i) => (
          <path key={i} d={a.path} fill={a.color} />
        ))}
        {arcs.map((a, i) => (
          <text key={`t-${i}`} x={a.labelX} y={a.labelY} textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize={14} fontWeight={600}>
            {arcs[i].percent}%
          </text>
        ))}
      </svg>

      {/* Legend */}
      <div style={{ padding: 16, background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        {legend.map((l, idx) => (
          <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ width: 12, height: 12, borderRadius: 3, background: colors[idx % colors.length] }} />
            <span style={{ color: '#333', fontSize: 14 }}>{l}</span>
          </div>
        ))}
      </div>
    </div>
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

  // Simulated fetch functions (replace with real API calls later)
  const fetchMonthlyPosts = async (year) => {
    // Mùa: Xuân (2-4) ít, Hè/Thu (5-11) cao, Đông (12,1) bình thường
    const seasonFactor = [
      1.0,  // 1 - Đông
      0.8,  // 2 - Xuân (thấp)
      0.8,  // 3 - Xuân (thấp)
      0.85, // 4 - Xuân (thấp)
      1.3,  // 5 - Hè (cao)
      1.4,  // 6 - Hè (cao)
      1.55, // 7 - Hè (cao)
      1.45, // 8 - Hè (cao)
      1.35, // 9 - Thu (cao)
      1.25, // 10 - Thu (cao)
      1.2,  // 11 - Thu (cao)
      1.0   // 12 - Đông (bth)
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
    // Lượt xem: xu hướng mùa tương tự nhưng biên độ lớn hơn
    const seasonFactor = [
      1.0,  // 1 - Đông
      0.85, // 2 - Xuân (thấp)
      0.85, // 3 - Xuân (thấp)
      0.9,  // 4 - Xuân (thấp)
      1.35, // 5 - Hè (cao)
      1.5,  // 6 - Hè (cao)
      1.7,  // 7 - Hè (cao)
      1.6,  // 8 - Hè (cao)
      1.4,  // 9 - Thu (cao)
      1.3,  // 10 - Thu (cao)
      1.2,  // 11 - Thu (cao)
      1.0   // 12 - Đông (bth)
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
    // Trả về tỉ lệ để lát chia theo tổng bài của tháng đã tính ở trên
    const approvedRatio = 0.6 + ((month % 3) - 1) * 0.05 + (year === 2025 ? 0.03 : year === 2023 ? -0.03 : 0);
    const pendingRatio = 0.25 + ((year % 2) ? 0.02 : -0.02);
    const rejectedRatio = Math.max(0.05, 1 - approvedRatio - pendingRatio);
    return new Promise((resolve) => setTimeout(() => resolve({ approvedRatio, pendingRatio, rejectedRatio }), 200));
  };

  const fetchTypeData = async (month, year) => {
    // vary by month/year
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMonth, selectedYear]);

  return (
    <div className="admin-layout">
      <AdHeader />
      <div className="admin-content">
        <AdSidebar />
        <main className="admin-main">
          <div style={{ padding: 20 }}>
            <h2 style={{ margin: '10px 0 20px', color: '#2a73cc', fontWeight: 700 }}>Báo cáo - Thống kê</h2>

            {/* KPI Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginBottom: 16 }}>
              <div style={{ background: '#fff', borderRadius: 10, padding: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <div style={{ color: '#6b7280', fontSize: 12 }}>Tổng lượt xem năm {selectedYear}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#111827' }}>{kpis.totalViews.toLocaleString('vi-VN')}</div>
              </div>
              <div style={{ background: '#fff', borderRadius: 10, padding: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <div style={{ color: '#6b7280', fontSize: 12 }}>Tổng bài ({selectedMonth}/{selectedYear})</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#111827' }}>{kpis.totalPosts.toLocaleString('vi-VN')}</div>
              </div>
              <div style={{ background: '#fff', borderRadius: 10, padding: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <div style={{ color: '#10b981', fontSize: 12 }}>Đã duyệt</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#10b981' }}>{kpis.approved.toLocaleString('vi-VN')}</div>
              </div>
              <div style={{ background: '#fff', borderRadius: 10, padding: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <div style={{ color: '#f59e0b', fontSize: 12 }}>Chờ duyệt</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#f59e0b' }}>{kpis.pending.toLocaleString('vi-VN')}</div>
              </div>
              <div style={{ background: '#fff', borderRadius: 10, padding: 14, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <div style={{ color: '#ef4444', fontSize: 12 }}>Từ chối</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#ef4444' }}>{kpis.rejected.toLocaleString('vi-VN')}</div>
              </div>
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#fff', padding: '12px 16px', borderRadius: 8, boxShadow: '0 2px 6px rgba(0,0,0,0.06)', marginBottom: 16, width: 'fit-content' }}>
              <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))} style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ddd' }}>
                {Array.from({ length: 12 }).map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
              <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))} style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #ddd' }}>
                {[2023, 2024, 2025].map(y => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
              <button onClick={refetch} style={{ background: '#2a73cc', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', cursor: 'pointer' }}>
                {loading ? 'Đang tải...' : 'Xem'}
              </button>
            </div>

            {/* Bar chart */}
            <div style={{ marginBottom: 24 }}>
              <ResponsiveContainer aspect={16/9} minHeight={260} maxHeight={460}>
                {(w, h) => (
                  <BarChart data={dataBar} width={w} height={h} color="#ee9b00" />
                )}
              </ResponsiveContainer>
            </div>

            {/* Pie charts */}
            {/* <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
              <ResponsiveContainer aspect={1} minHeight={300} maxHeight={420}>
                {(w, h) => (
                  <PieChart
                    data={dataStatus}
                    width={Math.min(w, 420)}
                    height={Math.min(h, 420)}
                    colors={["#e63946", "#f4a261", "#e9c46a"]}
                    legend={["Đã duyệt", "Chờ duyệt", "Từ chối"]}
                  />
                )}
              </ResponsiveContainer>
              <ResponsiveContainer aspect={1} minHeight={300} maxHeight={420}>
                {(w, h) => (
                  <PieChart
                    data={dataLoaiPhong}
                    width={Math.min(w, 420)}
                    height={Math.min(h, 420)}
                    colors={["#2a73cc", "#49a078"]}
                    legend={["Phòng trọ", "Ở ghép"]}
                  />
                )}
              </ResponsiveContainer>
            </div> */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdBaoCaoThongKe;
