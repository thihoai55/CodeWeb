// Dữ liệu lịch sử nạp tiền theo từng tài khoản (key là username)
export const napTienTheoTaiKhoan = {
  chutro01: [
    { id: 1, status: 'success', time: '23:32 10/07/2025', amount: 3000000, tx: 'AT03244334', method: 'MOMO', note: 'Nạp tiền thành công' },
    { id: 2, status: 'pending', time: '22:59 10/07/2025', amount: 3000000, tx: 'AT03244370', method: 'MOMO', note: 'Đang xử lý' }
  ],
  mod01: [
    { id: 1, status: 'success', time: '12:00 02/08/2025', amount: 2000000, tx: 'AT100001', method: 'Banking', note: 'Nạp tiền thành công' }
  ],
  nguoidung01: [
    { id: 1, status: 'failed', time: '09:10 03/08/2025', amount: 1500000, tx: 'AT200001', method: 'ZaloPay', note: 'Giao dịch thất bại' }
  ]
};


