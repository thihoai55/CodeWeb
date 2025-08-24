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
    onTabChange,
    currentUserRole = 'host' // Thêm prop để biết role của user
}) {
    // Tùy chọn lọc theo loại tin dựa trên role
    const getPostTypeOptions = () => {
        if (currentUserRole === 'renter') {
            return [
                { value: "", label: "Tất cả loại tin" },
                { value: "timnguoioghep", label: "Tìm người ở ghép" }
            ];
        } else {
            // host và admin
            return [
                { value: "", label: "Tất cả loại tin" },
                { value: "phongtro", label: "Phòng trọ" },
                { value: "nha", label: "Nhà nguyên căn" }
            ];
        }
    };

    // Tùy chọn lọc theo loại VIP
    const getVipTypeOptions = () => {
        return [
            { value: "", label: "Tất cả loại VIP" },
            { value: "thuong", label: "Tin thường" },
            { value: "vip1", label: "Tin VIP 1" },
            { value: "vip2", label: "Tin VIP 2" },
            { value: "vip3", label: "Tin VIP 3" }
        ];
    };

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
                                {getPostTypeOptions().map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
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
                                {getVipTypeOptions().map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
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

