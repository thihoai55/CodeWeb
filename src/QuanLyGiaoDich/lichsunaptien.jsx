import React, { useMemo } from 'react';
import Header from '../TrangChuDaDangNhap/Header';
import Footer from '../TrangChuDaDangNhap/Footer';
import Sidebar from '../DangBai/sidebar';
import HeaderTab from './HeaderTab';
import { napTienTheoTaiKhoan } from '../DaTa/lichSuNapTien';

function LichSuNapTien() {


	// Lấy username hiện tại
	const currentUser = useMemo(() => {
		try { return JSON.parse(localStorage.getItem('userInfo') || '{}'); } catch { return {}; }
	}, []);

	// Ưu tiên lấy lịch sử nạp từ localStorage theo tài khoản, nếu không có dùng seed từ data
	const storageKey = `topups_${currentUser?.username || ''}`;
	const topups = useMemo(() => {
		try {
			const stored = localStorage.getItem(storageKey);
			if (stored) return JSON.parse(stored);
		} catch {}
		return napTienTheoTaiKhoan[currentUser?.username] || [];
	}, [storageKey, currentUser?.username]);

	const formatVND = (num) => num.toLocaleString('vi-VN') + ' VND';

	// Ẩn Header/Footer khi là host
	const currentUserRole = (() => {
		try {
			const userInfo = localStorage.getItem('userInfo');
			return userInfo ? JSON.parse(userInfo).role : null;
		} catch (e) { return null; }
	})();

	return (
		<div style={{ minHeight: '100vh', background: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
			{currentUserRole !== 'host' && <Header />}
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
							{topups.map((row) => (
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
			{currentUserRole !== 'host' && <Footer />}
		</div>
	);
}

export default LichSuNapTien;