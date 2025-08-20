import React, { useState } from 'react';
import Header from '../TrangChuDaDangNhap/Header';
import Footer from '../TrangChuDaDangNhap/Footer';
import Sidebar from '../DangBai/sidebar';
import { useNavigate } from 'react-router-dom';

function HopDongChoThue() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState({});

  const toggle = (key) => setChecked(prev => ({ ...prev, [key]: !prev[key] }));

  const SectionTitle = ({ children }) => (
    <div style={{ fontWeight: 700, margin: '12px 0 8px', color: '#111', textTransform: 'uppercase' }}>{children}</div>
  );

  const ClauseTitle = ({ children }) => (
    <div style={{ fontWeight: 700, margin: '14px 0 8px', color: '#111' }}>{children}</div>
  );

  const SubTitle = ({ children }) => (
    <div style={{ fontWeight: 700, margin: '10px 0 10px', color: '#111' }}>{children}</div>
  );

  const LineField = ({ label, flex = 1 }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
      <div style={{ minWidth: '80px' }}>{label}</div>
      <div style={{ flex, borderBottom: '2px dotted #111', height: 15 }} />
    </div>
  );

  const TwoCols = ({ left, right }) => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px' }}>
      {left}
      {right}
    </div>
  );

  const CheckboxItem = ({ id, children }) => (
    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
      <input type="checkbox" checked={!!checked[id]} onChange={() => toggle(id)} />
      <span>{children}</span>
    </label>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />

        <div style={{ flex: 1, padding: '20px 0 0 0' }}>
          <div style={{ padding: '0 32px', marginBottom: '16px' }}>
            <span style={{ color: '#1976d2', cursor: 'pointer', fontSize: '16px' }} onClick={() => navigate('/quan-ly-bai-dang')}>Trang quản lý</span>
            <span style={{ margin: '0 8px', color: '#b0b7c3' }}>›</span>
            <span style={{ color: '#333', fontSize: '16px' }}>Hợp đồng cho thuê</span>
          </div>

          <div style={{ background: '#fff', borderRadius: '10px', padding: '24px 28px', margin: '0 40px 24px 100px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            {/* Quốc hiệu */}
            <div style={{ textAlign: 'center', color: '#111', fontWeight: 700 }}>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div>
            <div style={{ textAlign: 'center', color: '#111' }}>Độc lập - Tự do - Hạnh phúc</div>
            <div style={{ textAlign: 'center', color: '#111', margin: '4px 0 10px' }}>------**------</div>
            <h1 style={{ textAlign: 'center', fontSize: '18px', margin: 0, color: '#111', textTransform: 'uppercase' }}>Hợp đồng thuê phòng trọ</h1>

            {/* Bên A */}
            <SectionTitle>Bên A: Bên cho thuê</SectionTitle>
            <TwoCols
              left={<>
                <LineField label={'Họ và Tên:'} />
                <LineField label={'CMND:'} />
                <LineField label={'Hộ khẩu:'} />
                <LineField label={'Thường Trú:'} />
              </>}
              right={<>
                <LineField label={'Năm sinh:'} />
                <LineField label={'Ngày cấp:'} />
                <LineField label={'Địa chỉ:'} />
                <LineField label={'Điện thoại:'} />
              </>}
            />

            {/* Bên B */}
            <SectionTitle>Bên B: Bên cho thuê</SectionTitle>
            <TwoCols
              left={<>
                <LineField label={'Họ và Tên:'} />
                <LineField label={'CMND:'} />
                <LineField label={'Hộ khẩu:'} />
                <LineField label={'Thường Trú:'} />
              </>}
              right={<>
                <LineField label={'Năm sinh:'} />
                <LineField label={'Ngày cấp:'} />
                <LineField label={'Nơi cấp:'} />
                <LineField label={'Điện thoại:'} />
              </>}
            />

            <div style={{ marginTop: '12px', color: '#111' }}>Hai bên cùng thỏa thuận và đồng ý với nội dung sau:</div>

            {/* Điều 1 */}
            <ClauseTitle>Điều 1:</ClauseTitle>
            <div style={{ color: '#111', marginBottom: '8px' }}>
              Bên A đồng ý cho bên B thuê một phòng thuộc nhà số <span >...........................................</span>
            </div>
            <div style={{ color: '#111' }}>
              Thời hạn thuê nhà là <span>...........</span> tháng kể từ ngày <span>...........</span> tháng <span>...........</span> năm <span>...........</span>
            </div>

            {/* Điều 2 */}
            <ClauseTitle>Điều 2:</ClauseTitle>
            <div style={{ color: '#111', marginBottom: '8px' }}>
              Giá tiền thuê nhà là <span>...........</span> đồng/tháng (Bằng chữ: <span >.....................................................</span> ).
            </div>
            <div style={{ color: '#111', marginBottom: '8px' }}>
              Tiền thuê nhà Bên B thanh toán cho Bên A từ ngày ..... Tây hàng tháng.
            </div>
            <div style={{ color: '#111', marginBottom: '8px' }}>
              Tiền nước: Bên B thanh toán cho .......... vào ngày .......... hàng tháng với giá ..........
            </div>
            <div style={{ color: '#111', marginBottom: '8px' }}>
              Bên B đặt tiền thế chấp trước .......... đồng (Bằng chữ: ..........) cho bên A. Tiền thế chấp sẽ được trả lại đầy đủ cho bên thuê khi hết hợp đồng thuê căn hộ và thanh toán đầy đủ tiền điện, nước , phí dịch vụ và các khoản khác liên quan.
            </div>
            <div style={{ color: '#111', marginBottom: '8px' }}>
              Khoản khác (nếu có) .........................................................
            </div>
            <div style={{ color: '#111', marginBottom: '8px' }}>
              Bên B ngưng hợp đồng trước thời hạn thì phải chịu mất tiền thế chấp.
            </div>
            <div style={{ color: '#111' }}>
              Bên A ngưng hợp đồng (lấy lại nhà) trước thời hạn thì bồi thường gấp đôi số tiền bên B đã thế chấp.
            </div>

            {/* Điều 3: Quyền và nghĩa vụ bên cho thuê */}
            <ClauseTitle>Điều 3: Quyền và nghĩa vụ của bên cho thuê (Bên A)</ClauseTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <CheckboxItem id={'a1'}>Yêu cầu Bên thuê sử dụng nhà ở đúng mục đích và đúng nội quy sử dụng nhà trọ kèm hợp đồng thuê nhà trọ này; phối hợp với các đơn vị liên quan trong việc xử lý vi phạm quy định về quản lý sử dụng nhà trọ;</CheckboxItem>
              <CheckboxItem id={'a2'}>Yêu cầu Bên thuê trả tiền thuê nhà đầy đủ và đúng thời hạn ghi trong hợp đồng;</CheckboxItem>
            </div>
            <SubTitle>Quyền của Bên cho thuê:</SubTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '10px' }}>
              <CheckboxItem id={'a3'}>Yêu cầu Bên thuê có trách nhiệm trả tiền để sửa chữa phần hư hỏng, bồi thường thiệt hại do lỗi của Bên thuê gây ra;</CheckboxItem>
              <CheckboxItem id={'a4'}>Được quyền chấm dứt hợp đồng khi có một trong các trường hợp quy định tại Điều 6 của hợp đồng này;</CheckboxItem>
              <CheckboxItem id={'a5'}>Thu hồi nhà ở trong các trường hợp chấm dứt hợp đồng thuê nhà ở theo quy đinh tại Điều 6 của hợp đồng này.</CheckboxItem>
              <CheckboxItem id={'a6'}>Các quyền khác theo thỏa thuân .........................................</CheckboxItem>
            </div>

            <SubTitle>Nghĩa vụ của Bên cho thuê</SubTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '10px' }}>
              <CheckboxItem id={'a7'}>Giao nhà ở cho Bên thuê đúng thời gian quy định tại Điều 1 của hợp đồng này;</CheckboxItem>
              <CheckboxItem id={'a8'}>Xây dựng nội quy sử dụng nhà ở sinh viên và phổ biến quy định về sử dụng nhà ở sinh viên cho Bên thuê và các tổ chức, cá nhân liên quan biết;</CheckboxItem>
              <CheckboxItem id={'a9'}>Thực hiện quản lý vận hành, bảo trì nhà ở cho thuê theo quy định;</CheckboxItem>
              <CheckboxItem id={'a10'}>Thông báo cho Bên thuê những thay đổi về giá thuê ít nhất là 01 tháng trước khi áp dụng giá mới.</CheckboxItem>
              <CheckboxItem id={'a11'}>Phối hợp với Ban tự quản nhà sinh viên tuyên truyền, đôn đốc sinh viên thuê nhà ở chấp hành nội quy quản lý sử dụng nhà ở sinh viên.</CheckboxItem>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>• Các nghĩa vụ khác theo thỏa thuận</span>
                <div style={{ flex: 1, borderBottom: '2px dotted #111', height: 15 }} />
              </div>
            </div>

            {/* Điều 4: Quyền và nghĩa vụ bên thuê */}
            <ClauseTitle>Điều 4: Quyền và nghĩa vụ của Bên thuê (Bên B)</ClauseTitle>
            <SubTitle>Quyền của Bên thuê:</SubTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <CheckboxItem id={'b1'}>Nhận nhà ở theo đúng thỏa thuận nêu tại Khoản 1 Điều 3 của hợp đồng này;</CheckboxItem>
              <CheckboxItem id={'b2'}>Yêu cầu Bên cho thuê sửa chữa kịp thời những hư hỏng của nhà ở và cung cấp dịch vụ thiết yếu theo thỏa thuận;</CheckboxItem>
              <CheckboxItem id={'b3'}>Chấm dứt hợp đồng khi không còn nhu cầu thuê mua nhà ở;</CheckboxItem>
              <CheckboxItem id={'b4'}>Thành lập Ban tự quản nhà ở sinh viên;</CheckboxItem>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>• Các quyền khác theo thỏa thuận</span>
                <div style={{ flex: 1, borderBottom: '2px dotted #111', height: 15 }} />
              </div>
            </div>
            <SubTitle>Nghĩa vụ của Bên thuê:</SubTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
              <CheckboxItem id={'b5'}>Trả đủ tiền thuê nhà theo đúng thời hạn đã cam kết;</CheckboxItem>
              <CheckboxItem id={'b6'}>Sử dụng nhà đúng mục đích; giữ gìn nhà ở, có trách nhiệm sửa chữa những hư hỏng và bồi thường thiệt hại do lỗi của mình gây ra;</CheckboxItem>
              <CheckboxItem id={'b7'}>Không được tự ý sửa chữa, cải tạo nhà ở thuê; chấp hành đầy đủ những quy định về quản lý sử dụng nhà ở và các quyết định của cơ quan có thẩm quyền về quản lý nhà ở;</CheckboxItem>
              <CheckboxItem id={'b8'}>Chấp hành các quy định về nghiêm cấm trong sử dụng nhà ở và giữ gìn vệ sinh môi trường và an ninh trật tự trong khu vực cư trú;</CheckboxItem>
              <CheckboxItem id={'b9'}>Giao lại nhà cho Bên cho thuê trong các trường hợp chấm dứt hợp đồng quy định tại Điều 5 của hợp đồng này hoặc trong trường hợp nhà ở thuê thuộc diện bị thu hồi.</CheckboxItem>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>• Các quyền khác theo thỏa thuận</span>
                <div style={{ flex: 1, borderBottom: '2px dotted #111', height: 15 }} />
              </div>
            </div>

            {/* Điều 5: Chấm dứt hợp đồng */}
            <ClauseTitle>Điều 5: Chấm dứt hợp đồng</ClauseTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>• Việc chấm dứt hợp đồng thuê nhà ở sinh viên thực hiện trong các trường hợp sau:</span>
                <div style={{ flex: 1, borderBottom: '2px dotted #111', height: 15 }} />
              </div>
              <CheckboxItem id={'b1'}>Khi hai bên cùng nhất trí chấm dứt hợp đồng thuê nhà ở;</CheckboxItem>
              <CheckboxItem id={'b2'}>Khi Bên thuê không còn thuộc đối tượng được thuê nhà ở hoặc khi Bên thuê nhà mất (chết);</CheckboxItem>
              <CheckboxItem id={'b3'}>Khi Bên thuê không trả tiền thuê nhà liên tục trong ba tháng mà không có lý do chính đáng;</CheckboxItem>
              <CheckboxItem id={'b4'}>khi Bên thuê tự ý sữa chữa, đục phá kết cấu, cải tạo hoặc cơi nới nhà ở thuê;</CheckboxItem>
              <CheckboxItem id={'b4'}>Khi Bên thuê tự ý chuyển quyền thuê cho người khác hoặc cho người khác cùng sử dụng nhà ở;</CheckboxItem>
              <CheckboxItem id={'b5'}>Khi Bên thuê vi phạm các Điều cấm theo quy định;</CheckboxItem>
              <CheckboxItem id={'b6'}>Khi nhà ở cho thuê bị hư hỏng nặng có nguy cơ sập đổ hoặc nằm trong khu vực đã có quyết định thu hồi đất, giải phóng mặt bằng hoặc có quyết định phá dỡ của cơ quan nhà nước có thẩm quyền;</CheckboxItem>
              <CheckboxItem id={'b7'}>Khi một trong các bên đơn phương chấm dứt hợp đồng theo thỏa thuận (nếu có) hoặc theo quy định pháp luật.</CheckboxItem>
            </div>

            {/* Điều 6: Cam kết thực hiện và giải quyết tranh chấp */}
            <ClauseTitle>Điều 6: Cam kết thực hiện và giải quyết tranh chấp</ClauseTitle>
            <div style={{ color: '#111', marginBottom: '8px' }}>
              Các bên cam kết thực hiện đầy đủ các nội dung đã ghi trong hợp đồng này.
            </div>
            <div style={{ color: '#111' }}>
              Mọi tranh chấp liên quan hoặc phát sinh từ hợp đồng này sẽ được bàn bạc giải quyết trên tinh thần thương lượng, hoà giải giữa hai bên. Trường hợp không hòa giải được thì đưa ra Tòa án để giải quyết
            </div>

            {/* Điều 7: Điều khoản thi hành + Khoản khác */}
            <ClauseTitle>Điều 7: Điều khoản thi hành</ClauseTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '10px' }}>
              <CheckboxItem id={'d7_exec'}>
                Hợp đồng này có hiệu lực kể từ ngày ký. Hợp đồng này có .... trang, được lập thành 02 bản có giá trị như nhau, mỗi Bên giữ 01 bản.
              </CheckboxItem>
            </div>
            <div style={{ marginTop: '6px', color: '#111' }}>Khoản khác:</div>
            <div style={{ marginTop: '25px' }}>
              <div style={{ borderBottom: '2px dotted #111', height: 0, marginBottom: '30px' }} />
              <div style={{ borderBottom: '2px dotted #111', height: 0, marginBottom: '30px' }} />
              <div style={{ borderBottom: '2px dotted #111', height: 0, marginBottom: '30px' }} />
            </div>

            <div style={{ textAlign: 'right', color: '#111', margin: '20px 0 15px' }}>......, ngày ..... tháng ...... năm ...... </div>

            <div style={{ height: '1px', background: '#e1e1e1ff', margin: '20px 0' }} />

            {/* Ký tên */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '12px' }}>
              <div>
                <div style={{ fontWeight: 700, marginBottom: '8px' }}>Đại diện Bên A</div>
                <div style={{ height: '120px', border: '1px dashed #cfd8dc', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#607d8b' }}>
                  Ký, ghi rõ họ tên
                </div>
              </div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: '8px' }}>Đại diện Bên B</div>
                <div style={{ height: '120px', border: '1px dashed #cfd8dc', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#607d8b' }}>
                  Ký, ghi rõ họ tên
                </div>
              </div>
            </div>

            <div style={{ textAlign: 'right', marginTop: '16px' }}>
              <button style={{ padding: '10px 16px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
                onClick={() => alert('Đã lưu lựa chọn điều khoản (demo).')}>
                Lưu điều khoản đã chọn
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default HopDongChoThue;
