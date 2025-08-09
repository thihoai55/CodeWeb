import React from 'react';

function HeaderLuaChon({
    headerTitle = 'Quản lý bài đăng',
    headerBreadcrumb = (
        <>Trang quản lý {'>'} Quản lý bài đăng</>
    ),
    postTypeFilter,
    onPostTypeFilterChange,
    vipTypeFilter,
    onVipTypeFilterChange,
    tabs = [],
    selectedTab,
    onTabChange
}) {
    return (
        <div>
            {/* Title & Breadcrumbs */}
            <div style={{
                marginBottom: '20px',
                background: '#fff',
                padding: '10px 0 5px 32px',
                boxShadow: '0 2px 0px rgba(199, 193, 193, 0.4)'
            }}>
                <h1 style={{ fontSize: '25px', fontWeight: '700', color: '#333', margin: '0 0 10px 0' }}>
                    {headerTitle}
                </h1>
                <div style={{ fontSize: '16px', color: '#666', marginBottom: '10px' }}>
                    {headerBreadcrumb}
                </div>
            </div>

            {/* Filters + Tabs container */}
            <div style={{ padding: '0 24px', marginBottom: '24px'}}>
                <div style={{ padding: '5px 0 0 10p' }}>
                    {/* Filter Dropdowns */}
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                                Lọc theo loại tin
                            </label>
                            <select
                                value={postTypeFilter}
                                onChange={(e) => onPostTypeFilterChange?.(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    fontWeight: '200',
                                    background: '#fff'
                                }}
                            >
                                <option value="">Tất cả loại tin</option>
                                <option value="phongtro">Phòng trọ</option>
                                <option value="chungcu">Chung cư</option>
                                <option value="nha">Nhà nguyên căn</option>
                            </select>
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontSize: '16px', fontWeight: '600', color: '#333', marginBottom: '8px' }}>
                                Lọc theo loại VIP
                            </label>
                            <select
                                value={vipTypeFilter}
                                onChange={(e) => onVipTypeFilterChange?.(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    background: '#fff'
                                }}
                            >
                                <option value="">Tất cả loại VIP</option>
                                <option value="thuong">Tin thường</option>
                                <option value="vip1">Tin VIP 1</option>
                                <option value="vip2">Tin VIP 2</option>
                            </select>
                        </div>
                    </div>
                    {/* Tabs */}
                    <div style={{ display: 'flex', gap: '15px', paddingBottom: '15px', boxShadow: '0 2px 0px rgba(199, 193, 193, 0.3)'}}>
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => onTabChange?.(tab.id)}
                                style={{
                                    padding: '10px 10px',
                                    background: selectedTab === tab.id ? '#3181d0ff' : 'transparent',
                                    color: selectedTab === tab.id ? '#fff' : '#333',
                                    border: '1px solid rgb(222, 212, 212)',
                                    borderRadius: '10px',
                                    fontSize: '16px',
                                    fontWeight: '500',
                                    cursor: 'pointer',  
                                    transition: 'all 0.2s',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '5px'
                                }}
                            >
                                {tab.label}
                                <span style={{
                                    background: selectedTab === tab.id ? 'rgba(212, 206, 206, 0.3)' : '#ECEBEB',
                                    color: selectedTab === tab.id ? '#fff' : '#222',
                                    padding: '2px 5px',
                                    borderRadius: '12px',
                                    fontSize: '15px',
                                    fontWeight: '500'
                                }}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HeaderLuaChon;


