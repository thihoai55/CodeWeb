import React from 'react';
import Header from '../TrangChuChuaDangNhap/Header';
import Footer from '../TrangChuChuaDangNhap/Footer';
import PostList from '../TrangChuChuaDangNhap/PostList';
import Pagination from '../TrangChuChuaDangNhap/Pagination';

function Trang3() {
    const postsTrang3 = [
        {
            title: 'Phòng trọ gần bệnh viện, có thang máy, giữ xe 24/7, phù hợp cho sinh viên và nhân viên văn phòng',
            img: 'anh/thiet-ke-nha-tro-dep-2020-bandon-10.jpg',
            price: '3.8 triệu / tháng',
            size: '25 m²',
            address: 'Q. Gò Vấp, TP HCM'
        },
        {
            title: 'Căn hộ mini full nội thất, có máy giặt riêng, tiện nghi đầy đủ, dọn vào ở ngay',
            img: 'anh/thiet-ke-nha-tro-dep-2020-bandon-12.jpg',
            price: '5.2 triệu / tháng',
            size: '38 m²',
            address: 'Q. Hoàng Mai, Hà Nội'
        },
        {
            title: 'Phòng trọ có ban công rộng, view thoáng mát, ánh sáng tự nhiên cả ngày',
            img: 'anh/thiet-ke-noi-that-phong-tro-19.jpg',
            price: '2.6 triệu / tháng',
            size: '22 m²',
            address: 'TP Huế'
        },
        {
            title: 'Phòng trọ cao cấp, nội thất gỗ sang trọng, gần công viên, thích hợp cho gia đình nhỏ',
            img: 'anh/thiet-ke-phong-tro-dep-7.jpg',
            price: '4.8 triệu / tháng',
            size: '32 m²',
            address: 'Q. Hải Châu, Đà Nẵng'
        },
        {
            title: 'Nhà nguyên căn 3 phòng ngủ, có sân rộng để xe, phù hợp cho gia đình hoặc nhóm bạn',
            img: 'anh/thiet-ke-nha-tro-dep-2020-bandon-12.jpg',
            price: '11 triệu / tháng',
            size: '120 m²',
            address: 'TP Biên Hòa'
        },
        {
            title: 'Phòng trọ gần trường đại học, có bếp riêng tiện lợi, phù hợp cho sinh viên và cặp đôi trẻ',
            img: 'anh/thiet-ke-phong-tro-dep-54.jpg',
            price: '2.3 triệu / tháng',
            size: '20 m²',
            address: 'TP Vinh, Nghệ An'
        },
        {
            title: 'Căn hộ 2 phòng ngủ, full nội thất sang trọng, thiết kế hiện đại, ngay trung tâm quận Nam Từ Liêm',
            img: 'anh/thiet-ke-nha-tro-dep-2020-bandon-4.jpg',
            price: '12 triệu / tháng',
            size: '70 m²',
            address: 'Q. Nam Từ Liêm, Hà Nội'
        },
        {
            title: 'Tìm người ở ghép phòng master 25m², đầy đủ nội thất, ưu tiên sinh viên và người đi làm',
            img: 'anh/thiet-ke-phong-tro-dep-28.jpg',
            price: '1.8 triệu / tháng',
            size: '25 m²',
            address: 'Q. Bình Thạnh, TP HCM'
        }
    ];


    return (
        <div style={{ minHeight: '100vh', background: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <PostList posts={postsTrang3} fixedColumns={4} />
            <Pagination />
            <Footer />
        </div>
    );
}

export default Trang3;
