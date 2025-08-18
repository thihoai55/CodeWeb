import React, { useMemo } from 'react';
import Header from '../TrangChuDaDangNhap/Header';
import Footer from '../TrangChuDaDangNhap/Footer';
import Sidebar from '../DangBai/sidebar';
import HeaderTab from './HeaderTab';

function LichSuNapTien() {

	const topups = useMemo(() => ([
		{ id: 1, status: 'success', time: '23:32 10/07/2025', amount: 3000000, tx: 'AT03244334', method: 'MOMO', note: 'Nạp tiền thành công' },
		{ id: 2, status: 'success', time: '23:20 10/07/2025', amount: 1500000, tx: 'AT03244335', method: 'ZaloPay', note: 'Nạp tiền thành công' },
		{ id: 3, status: 'success', time: '23:10 10/07/2025', amount: 5000000, tx: 'AT03244344', method: 'Banking', note: 'Nạp tiền thành công' },
		{ id: 4, status: 'success', time: '23:05 10/07/2025', amount: 2000000, tx: 'AT03244350', method: 'MOMO', note: 'Nạp tiền thành công' },
		{ id: 5, status: 'success', time: '23:02 10/07/2025', amount: 1000000, tx: 'AT03244360', method: 'ViettelPay', note: 'Nạp tiền thành công' },
		{ id: 6, status: 'pending', time: '22:59 10/07/2025', amount: 3000000, tx: 'AT03244370', method: 'MOMO', note: 'Đang xử lý' },
		{ id: 7, status: 'failed', time: '22:45 10/07/2025', amount: 2500000, tx: 'AT03244380', method: 'Banking', note: 'Giao dịch thất bại' },
		{ id: 8, status: 'success', time: '22:30 10/07/2025', amount: 3500000, tx: 'AT03244390', method: 'MOMO', note: 'Nạp tiền thành công' },
		{ id: 9, status: 'success', time: '22:20 10/07/2025', amount: 4000000, tx: 'AT03244400', method: 'ZaloPay', note: 'Nạp tiền thành công' },
		{ id: 10, status: 'pending', time: '22:10 10/07/2025', amount: 2000000, tx: 'AT03244410', method: 'Banking', note: 'Đang xử lý' }
	]), []);


	const formatVND = (num) => num.toLocaleString('vi-VN') + ' VND';

	return (
		<div style={{ minHeight: '100vh', background: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
			<Header />
			<div style={{ display: 'flex', flex: 1 }}>
				<Sidebar />
				<div style={{ flex: 1, paddingBottom: 24 }}>
					<HeaderTab
						activeId={'lichsunaptien'}
						tabs={[
							{ id: 'lichsuthanhtoan', label: 'Lịch sử giao dịch', to: '/lich-su-giao-dich' },
							{ id: 'lichsunaptien', label: 'Lịch sử nạp tiền' }
						]}
					/>

					{/* Table: Lịch sử nạp tiền */}
					<div style={{ padding: '0 24px' }}>
						<div style={{ background: '#fff', border: '1px solid #e0e0e0', borderRadius: 10, overflow: 'hidden' }}>
							<div style={{
								display: 'grid', gridTemplateColumns: '120px 220px 180px 200px 140px 1fr', padding: '12px 15px', background: '#f7f7f7',
								fontWeight: 600, color: '#333', fontSize: 14, borderBottom: '1px solid #e0e0e0'
							}}>
								<div>Trạng thái</div>
								<div>Thời gian</div>
								<div>Số tiền nạp</div>
								<div>Mã giao dịch</div>
								<div>Phương thức</div>
								<div>Ghi chú</div>
							</div>
							{topups.map((row, idx) => (
								<div key={row.id} style={{
									display: 'grid', gridTemplateColumns: '120px 220px 180px 200px 140px 1fr',
									padding: '12px 15px', alignItems: 'center', borderBottom: '1px solid #e7e4e4ff', background: '#fff'
								}}>
									<div>
										<span style={{
											display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18,
											borderRadius: '50%', background: row.status === 'success' ? '#2ecc71' : row.status === 'pending' ? '#f1c40f' : '#e74c3c', color: '#fff', fontSize: 12
										}}>!</span>
									</div>
									<div style={{ color: '#444' }}>{row.time}</div>
									<div style={{ color: '#444' }}>{formatVND(row.amount)}</div>
									<div style={{ color: '#444' }}>{row.tx}</div>
									<div style={{ color: '#444' }}>{row.method}</div>
									<div style={{ color: '#444' }}>{row.note}</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default LichSuNapTien;
