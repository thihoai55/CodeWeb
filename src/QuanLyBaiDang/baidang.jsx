import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../DangBai/sidebar';
import Header from '../TrangChuDaDangNhap/Header';
import Footer from '../TrangChuDaDangNhap/Footer';
import ModalAnTin from '../ModalAnTin/antin';
import ModalXoaTin from '../ModalXoaTin/xoatin';
import HeaderLuaChon from './header_luachon';
import LichHen from '../NhanVaXuLyLichHen/lichhen';
import YeuCauThue from '../NhanVaXuLyYeuCauThue/yeucauthue';

function QuanLyBaiDang() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('all');
  const [postTypeFilter, setPostTypeFilter] = useState('');
  const [vipTypeFilter, setVipTypeFilter] = useState('');
  const [openHideModal, setOpenHideModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const [posts, setPosts] = useState([
    {
      id: 'BD001',
      type: 'Phòng trọ',
      vipType: 'Tin thường',
      title: 'Phòng trọ mới đã trang trí đầy đủ tiện nghi, full nội thất',
      price: '800.000',
      area: '30 m²',
      description: 'Phòng sạch sẽ, thoáng mát, có cửa Có nhà vệ sinh riêng, máy nước nóng/lạCó chỗ để xe rộng rãi, wifi miễn  Giờ giấc tự do, không chung chủ',
      image: 'https://bandon.vn/uploads/thiet-ke-nha-tro-dep-2020-bandon-28.jpg',
      status: 'Đang hiển thị',
      startDate: '06/07/2025',
      endDate: '09/07/2025'
    },
    {
      id: 'BD002',
      type: 'Chung cư',
      vipType: 'Tin VIP 1',
      title: 'Chung cư vừa mới xây đã có đầy đủ tiện nghi, có thể ở được cả hộ gia đình',
      price: '4.5 triệu',
      area: '50 m²',
      description: 'Cho hộ gia đình thuê căn chung cư vừa mới xây xong có đầy đủ các tiện nghi chỉ cần dọn vào ở.',
      image: 'https://kientructrangkim.com/wp-content/uploads/2022/11/thiet-ke-noi-that-phong-tro-41.jpg',
      status: 'Đã hết hạn',
      startDate: '12/07/2024',
      endDate: '18/07/2024'
    },
    {
      id: 'BD003',
      type: 'Phòng trọ',
      vipType: 'Tin VIP 1',
      title: 'Phòng trọ có gác lửng, tủ lạnh, gần các trường đại học ở trung tâm thành phố',
      price: '1.5 triệu',
      area: '45 m²',
      description: 'Cho các bạn sinh viên thuê trọ ở trung tâm thành phố gần các trường đại học có gác lửng và tủ lạnh',
      image: 'https://spacet-release.s3.ap-southeast-1.amazonaws.com/img/blog/2023-10-04/thiet-ke-phong-tro-co-khu-vuc-bep-651cda6dc9649b0ef5c6f6d0.webp',
      status: 'Đã cho thuê',
      startDate: '09/07/2025',
      endDate: '15/07/2025'
    }
  ]);

  // Đếm số lượng theo trạng thái
  const statusCounts = useMemo(() => {
    const counts = { all: 0, displaying: 0, rented: 0, expired: 0, hidden: 0 };
    for (const p of posts) {
      if (p.status === 'Đang hiển thị') counts.displaying += 1;
      else if (p.status === 'Đã cho thuê') counts.rented += 1;
      else if (p.status === 'Đã hết hạn') counts.expired += 1;
      else if (p.status === 'Đã ẩn') counts.hidden += 1;
    }
    // "Tất cả" loại trừ các tin đã ẩn
    counts.all = posts.filter(p => p.status !== 'Đã ẩn').length;
    return counts;
  }, [posts]);

  const tabs = [
    { id: 'all', label: 'Tất cả', count: statusCounts.all },
    { id: 'displaying', label: 'Đang hiển thị', count: statusCounts.displaying },
    { id: 'rented', label: 'Đã cho thuê', count: statusCounts.rented },
    { id: 'expired', label: 'Hết hạn', count: statusCounts.expired },
    { id: 'appointments', label: 'Lịch hẹn', count: 4 },
    { id: 'requests', label: 'Yêu cầu thuê', count: 4 },
    { id: 'hidden', label: 'Đã ẩn', count: statusCounts.hidden }
  ];

  // Lọc bài đăng theo tab
  const displayPosts = useMemo(() => {
    switch (selectedTab) {
      case 'displaying':
        return posts.filter(p => p.status === 'Đang hiển thị');
      case 'rented':
        return posts.filter(p => p.status === 'Đã cho thuê');
      case 'expired':
        return posts.filter(p => p.status === 'Đã hết hạn');
      case 'hidden':
        return posts.filter(p => p.status === 'Đã ẩn');
      case 'all':
      default:
        // Tất cả trừ đã ẩn
        return posts.filter(p => p.status !== 'Đã ẩn');
    }
  }, [selectedTab, posts]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Đang hiển thị':
        return '#28a745';
      case 'Đã hết hạn':
        return '#dc3545';
      case 'Đã cho thuê':
        return '#ffc107';
      case 'Đã ẩn':
        return '#6c757d';
      default:
        return '#6c757d';
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#f5f5f5',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Header */}
      <Header />

      {/* Main Content with Sidebar */}
      <div style={{
        display: 'flex',
        flex: 1
      }}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '0 0 0 0' }}>
          {/* Header + Filters + Tabs */}
          <HeaderLuaChon
            postTypeFilter={postTypeFilter}
            onPostTypeFilterChange={setPostTypeFilter}
            vipTypeFilter={vipTypeFilter}
            onVipTypeFilterChange={setVipTypeFilter}
            tabs={tabs}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
          />

          {/* Main Content */}
          <div style={{ padding: '0 32px', flex: 1 }}>

            {/* Conditional Content based on selected tab */}
            {selectedTab === 'appointments' ? (
              <LichHen />
            ) : selectedTab === 'requests' ? (
              <YeuCauThue />
            ) : (
              /* Posts List */
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}>
                {displayPosts.map((post) => (
                <div key={post.id} style={{
                  background: '#fff',
                  borderRadius: '10px',
                  padding: '16px 16px 12px 16px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                  display: 'flex',
                  gap: '22px',
                  border: '1px solid #ECEBEB'
                }}>
                  {/* Post Image */}
                  <div style={{
                    width: '260px',
                    height: '200px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    // borderRadius: '4px'
                  }}>
                    <img
                      src={post.image}
                      alt={post.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                      onError={(e) => {
                        e.target.style.background = '#f8f9fa';
                        e.target.style.display = 'flex';
                        e.target.style.alignItems = 'center';
                        e.target.style.justifyContent = 'center';
                        e.target.style.fontSize = '24px';
                        e.target.style.color = '#6c757d';
                        e.target.src = '';
                        e.target.textContent = '📷';
                      }}
                    />
                  </div>

                  {/* Post Content */}
                  <div style={{ flex: 1 }}>
                    {/* Post Header */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      // marginBottom: '5px'
                    }}>
                      <div>
                        <div style={{
                          display: 'flex',
                          gap: '12px',
                          alignItems: 'center',
                          marginBottom: '8px',

                        }}>
                          <span style={{
                            background: '#ECEBEB',
                            color: '#666',
                            padding: '5px 12px',
                            borderRadius: '16px',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}>
                            {post.type}
                          </span>
                          <span style={{
                            background: '#ECEBEB',
                            color: '#666',
                            padding: '5px 12px',
                            borderRadius: '16px',
                            fontSize: '12px',
                            fontWeight: '600'
                          }}>
                            {post.vipType}
                          </span>
                        </div>
                        <h3 style={{
                          fontSize: '18px',
                          fontWeight: '600',
                          color: '#1a73e8',
                          margin: '0 0 5px 0',
                          lineHeight: '1.5'
                        }}>
                          {post.title}
                        </h3>
                      </div>
                      {/* Empty right area in header on purpose */}
                    </div>

                    {/* Post Details */}
                    <div style={{
                      display: 'flex',
                      gap: '24px',
                      marginBottom: '5px',
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <span style={{
                          fontSize: '15px',
                          fontWeight: '500',
                          color: '#222'
                        }}>
                          {post.price} đồng/tháng
                        </span>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <span style={{
                          fontSize: '15px',
                          fontWeight: '500',
                          color: '#222'
                        }}>
                          {post.area}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p style={{
                      fontSize: '15px',
                      fontWeight: '500',
                      color: '#222',
                      margin: '0 0 8px 0',
                      lineHeight: '1.5'
                    }}>
                      {post.description}
                    </p>

                    {/* Post Info - 3 column grid like preview */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '150px 150px 150px',
                      gap: '10px',
                      alignItems: 'start'
                    }}>
                      <div>
                        <div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>Mã tin</div>
                        <div style={{ fontSize: '14px', color: '#333' }}>{post.id}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>Ngày bắt đầu</div>
                        <div style={{ fontSize: '14px', color: '#333' }}>{post.startDate}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', color: '#666', marginBottom: '6px' }}>Ngày hết hạn</div>
                        <div style={{ fontSize: '14px', color: '#333' }}>{post.endDate}</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    flexShrink: 0,
                    alignItems: 'center',
                    marginRight: '15px',
                    // minWidth: '160px'
                  }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: getStatusColor(post.status),
                      marginBottom: '4px'
                    }}>{post.status}</div>

                    {(post.status === 'Đã ẩn' 
                        ? ['Đăng lại', 'Sửa bài', 'Xóa bài', 'Lịch hẹn', 'Yêu cầu thuê']
                        : ['Ẩn bài', 'Sửa bài', 'Xóa bài', 'Lịch hẹn', 'Yêu cầu thuê']
                      ).map((label) => (
                      <button key={label} style={{
                        padding: '5px 12px',
                        background: '#f5f5f5',
                        color: '#333',
                        border: '1px solid #d9d9d9',
                        borderRadius: '18px',
                        fontSize: '14px',
                        cursor: 'pointer',
                        width: '100%',
                        transition: 'background 0.2s, border-color 0.2s'
                      }}
                        onClick={() => {
                          if (label === 'Ẩn bài') { setSelectedPost(post); setOpenHideModal(true); }
                          else if (label === 'Đăng lại') {
                            setPosts(prev => prev.map(p => p.id === post.id ? { ...p, status: 'Đang hiển thị' } : p));
                            setSelectedTab('displaying');
                          }
                          else if (label === 'Xóa bài') { setSelectedPost(post); setOpenDeleteModal(true); }
                          else if (label === 'Sửa bài') { navigate('/sua-bai', { state: { post } }); }
                          else if (label === 'Lịch hẹn') { setSelectedTab('appointments'); }
                          else if (label === 'Yêu cầu thuê') { setSelectedTab('requests'); }
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#efefef'; e.currentTarget.style.borderColor = '#cfcfcf'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = '#f5f5f5'; e.currentTarget.style.borderColor = '#d9d9d9'; }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Modals */}
      <ModalAnTin
        open={openHideModal}
        onCancel={() => { setOpenHideModal(false); setSelectedPost(null); }}
        onConfirm={() => {
          // Cập nhật trạng thái bài viết thành "Đã ẩn"
          if (selectedPost?.id) {
            setPosts(prev => prev.map(p => p.id === selectedPost.id ? { ...p, status: 'Đã ẩn' } : p));
          }
          setOpenHideModal(false);
          setSelectedPost(null);
          // Chuyển sang tab Đã ẩn
          setSelectedTab('hidden');
        }}
      />
      <ModalXoaTin
        open={openDeleteModal}
        onCancel={() => { setOpenDeleteModal(false); setSelectedPost(null); }}
        onConfirm={() => {
          // TODO: gọi API xóa bài với selectedPost?.id
          setOpenDeleteModal(false);
          setSelectedPost(null);
        }}
      />
    </div>
  );
}

export default QuanLyBaiDang;
