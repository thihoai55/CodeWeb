import React from 'react';
import Header from '../TrangChuChuaDangNhap/Header';
import Footer from '../TrangChuChuaDangNhap/Footer';
import PostList from '../TrangChuChuaDangNhap/PostList';
import Pagination from '../TrangChuChuaDangNhap/Pagination';

function Trang2() {
    const postsTrang2 = [
        {
            title: 'Phòng studio full nội thất, gần trường đại học, có thang máy và hầm để xe',
            img: 'anh/thiet-ke-nha-tro-dep-7.jpg',
            price: '3.2 triệu / tháng',
            size: '28 m²',
            address: 'Q. 7, TP HCM'
        },
        {
            title: 'Căn hộ mini 1 phòng ngủ, có ban công thoáng mát, ánh sáng tự nhiên',
            img: 'anh/thiet-ke-nha-tro-dep-28.jpg',
            price: '4.5 triệu / tháng',
            size: '35 m²',
            address: 'Q. Thanh Xuân, Hà Nội'
        },
        {
            title: 'Phòng trọ có cửa sổ lớn, bếp riêng, thuận tiện cho sinh viên và người đi làm',
            img: 'anh/thiet-ke-noi-that-phong-tro-40.jpg',
            price: '2.8 triệu / tháng',
            size: '25 m²',
            address: 'Cẩm Lệ, Đà Nẵng'
        },
        {
            title: 'Nhà nguyên căn 2 tầng, thiết kế hiện đại, thích hợp cho gia đình nhỏ',
            img: 'anh/thiet-ke-nha-tro-dep-2020-bandon-12.jpg',
            price: '7.5 triệu / tháng',
            size: '80 m²',
            address: 'Thủ Đức, TP HCM'
        },
        {
            title: 'Phòng trọ mới sơn sửa, sạch sẽ, khu vực an ninh tốt, gần chợ và trường học',
            img: 'anh/thiet-ke-nha-tro-dep-2020-bandon-4.jpg',
            price: '2.2 triệu / tháng',
            size: '20 m²',
            address: 'TP Huế'
        },
        {
            title: 'Căn hộ dịch vụ đầy đủ tiện nghi, gần trung tâm thành phố, có dọn phòng hàng tuần',
            img: 'anh/thiet-ke-nha-tro-dep-54.jpg',
            price: '6.0 triệu / tháng',
            size: '40 m²',
            address: 'Q. 3, TP HCM'
        },
        {
            title: 'Phòng trọ giá rẻ, giờ giấc tự do, có chỗ để xe máy, điện nước giá dân',
            img: 'anh/thue tro2.jpg',
            price: '1.6 triệu / tháng',
            size: '18 m²',
            address: 'Q. Ninh Kiều, Cần Thơ'
        },
        {
            title: 'Tìm người ở ghép phòng rộng 30m², đầy đủ nội thất, gần trường đại học',
            img: 'anh/thiet-ke-phong-tro-dep-28.jpg',
            price: '1.2 triệu / tháng',
            size: '30 m²',
            address: 'TP Vinh, Nghệ An'
        },

        {
            title: 'Căn hộ cao cấp 2 phòng ngủ, full nội thất sang trọng, hồ bơi và phòng gym miễn phí',
            img: 'anh/thiet-ke-nha-tro-dep-2020-bandon-10.jpg',
            price: '14 triệu / tháng',
            size: '75 m²',
            address: 'Q. Bình Thạnh, TP HCM'
        },

        {
            title: 'Phòng trọ mini có gác, máy lạnh, gần bến xe và siêu thị, thích hợp cho sinh viên',
            img: 'anh/thiet-ke-phong-tro-dep-54.jpg',
            price: '2.5 triệu / tháng',
            size: '22 m²',
            address: 'Q. Liên Chiểu, Đà Nẵng'
        }
    ];


    return (
        <div style={{ minHeight: '100vh', background: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <PostList posts={postsTrang2} fixedColumns={4} />
            <Pagination />
            <Footer />
        </div>
    );
}

export default Trang2;
