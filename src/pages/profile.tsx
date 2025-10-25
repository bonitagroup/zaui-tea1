import React, { FC } from 'react';
import { Box, Header, Icon, Page, Text, Button } from 'zmp-ui';
import subscriptionDecor from '../static/subscription-decor.svg';
import { useNavigate } from 'react-router';
import { useRecoilCallback } from 'recoil';
import { userState } from '../state/state';
import zaloicon from '@/static/page/zaloIcon.png';
import { openChat } from 'zmp-sdk/apis';
import purchaseOder from '@/static/iconsvg/profile-purchaseOrder-New.png';
import delivery from '@/static/iconsvg/profile-purchaseOrder-delivery.png';
import waitforconfirmation from '@/static/iconsvg/profile-purchaseOrder-waitforconfirmation.png';
import starIcon from '@/static/iconsvg/profile-purchaseOrder-star.png';

const ZALO_OA_ID = 'xxxx';

const ProfilePage: FC = () => {
  const navigate = useNavigate();
  const requestUserInfo = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        const userInfo = await snapshot.getPromise(userState);
        console.warn('User info:', userInfo);
      },
    []
  );

  // Hàm mở chat Zalo OA (prefill message). Nếu lỗi thì fallback mở zalo.me
  const handleOpenZalo = async (prefill?: string) => {
    try {
      await openChat({
        type: 'oa',
        id: ZALO_OA_ID,
        message: prefill ?? `Xin chào, tôi muốn biết thêm về chương trình giới thiệu.`,
      });
      // openChat sẽ mở cửa sổ chat;
    } catch (err: any) {
      console.error('openChat error:', err);
      // fallback: mở zalo.me để người dùng vẫn có cách liên hệ
      try {
        window.open('https://zalo.me', '_blank');
      } catch (e) {
        alert('Không thể mở Zalo. Vui lòng thử lại sau.');
      }
    }
  };

  return (
    <Page className="flex flex-col pb-14 bg-gray-50 relative">
      <Header
        title="Cá nhân"
        textColor="white"
        backgroundColor="#0a5132"
        className="pt-8 px-2.5 text-base"
        style={{ height: 72 }}
      />

      <Box className="p-4 space-y-4">
        <Box className="m-0" onClick={requestUserInfo}>
          <Box
            className="bg-[#0a5132] text-white rounded-xl p-4 space-y-2"
            style={{
              backgroundImage: `url(${subscriptionDecor})`,
              backgroundPosition: 'right 8px center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <Text.Title className="font-bold">Đăng ký thành viên</Text.Title>
            <Text size="xxSmall">Tích điểm đổi thưởng, mở rộng tiện ích</Text>
          </Box>
        </Box>

        <Box
          className="bg-yellow-400 rounded-xl p-3 flex items-center justify-between"
          onClick={requestUserInfo}
        >
          <Box className="flex items-center gap-2">
            <Icon icon="zi-user" />
            <Box>
              <Text className="font-semibold text-sm">Thông tin cá nhân</Text>
              <Text size="xxSmall">Tặng 1 lượt quay khi cập nhật đầy đủ thông tin</Text>
            </Box>
          </Box>
          <Icon icon="zi-chevron-right" />
        </Box>

        <Box className="bg-white rounded-xl p-4 shadow-sm">
          <Text.Title size="small" className="mb-3">
            Đơn mua
          </Text.Title>
          <Box className="grid grid-cols-4 gap-2 text-center">
            <Box onClick={() => navigate('/orders?tab=new')}>
              <img
                src={purchaseOder}
                alt="Đơn hàng mới"
                className="w-8 h-8 mx-auto mb-1 text-[#0a5132]"
              />
              <Text size="xSmall">Đơn hàng mới</Text>
            </Box>
            <Box onClick={() => navigate('/orders?tab=pending')}>
              <img
                src={waitforconfirmation}
                alt="Chờ xác nhận"
                className="w-9 h-8 mx-auto mb-1 text-[#0a5132]"
              />
              <Text size="xSmall">Chờ xác nhận</Text>
            </Box>
            <Box onClick={() => navigate('/orders?tab=shipping')}>
              <img
                src={delivery}
                alt="Đang giao hàng"
                className="w-9 h-8 mx-auto mb-1 text-[#0a5132]"
              />
              <Text size="xSmall">Đang giao hàng</Text>
            </Box>
            <Box onClick={() => navigate('/orders?tab=review')}>
              <img
                src={starIcon}
                alt="Chờ xác nhận"
                className="w-9 h-8 mx-auto mb-1 text-[#0a5132]"
              />
              <Text size="xSmall">Đánh giá</Text>
            </Box>
          </Box>
        </Box>

        <Box className="bg-white rounded-xl p-4 shadow-sm">
          <Text.Title size="small" className="mb-1 text-left font-semibold">
            Giới thiệu ứng dụng
          </Text.Title>

          <Text size="xSmall" className="mb-3 text-left text-gray-700 leading-snug">
            (*) Chia sẻ ứng dụng cùng bạn bè: nhận 10K voucher khi có người mới quan tâm OA và thêm
            10% điểm thưởng từ mỗi đơn hàng thành công của bạn bè.
          </Text>

          <Box className="flex gap-3">
            <button
              onClick={() => navigator.clipboard.writeText(window.location.href)}
              className="flex-1 bg-white border border-gray-200 rounded-xl py-3 px-3 min-h-[78px] shadow-sm flex items-center justify-center"
              style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.04)' }}
            >
              <span className="flex flex-col items-center">
                <span className="mb-2 flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 border border-gray-100">
                  <Icon icon="zi-copy" className="text-[20px] text-gray-700" />
                </span>
                <span className="text-sm font-medium text-gray-800">Sao chép đường dẫn</span>
              </span>
            </button>

            <button
              onClick={() =>
                handleOpenZalo(`Xin chào, tôi muốn chia sẻ link này: ${window.location.href}`)
              }
              className="flex-1 rounded-xl py-3 px-3 min-h-[78px] flex items-center justify-center"
              style={{
                backgroundColor: '#0a5132',
                boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
                border: 'none',
              }}
            >
              <span className="flex flex-col items-center">
                <span className="mb-2 flex items-center justify-center w-16 h-10 rounded-full">
                  <img src={zaloicon} alt="Zalo" className="w-12 h-12" />
                </span>
                <span className="text-sm font-medium text-white">Chia sẻ qua Zalo</span>
              </span>
            </button>
          </Box>
        </Box>

        <Box className="bg-white rounded-xl p-4 shadow-sm">
          <Text.Title size="small" className="mb-3">
            Tiện ích của tôi
          </Text.Title>
          <Box className="flex gap-3 text-center">
            <Box className="flex-1 flex flex-col items-center justify-center">
              <Icon icon="zi-user" className="text-[#0a5132] text-3xl mb-1" />
              <Text size="xSmall" className="font-medium text-gray-800">
                Hội viên thân thiết
              </Text>
            </Box>
            <Box className="flex-1 flex flex-col items-center justify-center">
              <Icon icon="zi-user" className="text-[#0a5132] text-3xl mb-1" />
              <Text size="xSmall" className="font-medium text-gray-800">
                Giới thiệu khách hàng
              </Text>
            </Box>
          </Box>
        </Box>

        <Box className="bg-white rounded-xl p-4 shadow-sm space-y-3">
          <Text.Title size="small">Khác</Text.Title>
          {[
            `Chính sách bảo mật`,
            `Chính sách vận chuyển`,
            `Chính sách thanh toán`,
            `Chính sách hoàn trả`,
            `Chính sách bán hàng`,
            `Liên hệ và hỗ trợ qua Zalo OA`,
          ].map((text, i) => {
            const isZaloContact = text.includes('Zalo OA');
            return (
              <Box
                key={i}
                className="flex items-center justify-between pb-5 py-2 border-zinc-200 border-b last:border-none"
                onClick={() => {
                  if (isZaloContact) {
                    handleOpenZalo('Xin chào, tôi cần hỗ trợ từ Zalo OA');
                  } else {
                    console.log('clicked', text);
                  }
                }}
              >
                <Box className="flex items-center">
                  <Icon icon="zi-link" className="text-xl mr-2" />
                  <Text size="xSmall">{text}</Text>
                </Box>
                <Icon icon="zi-chevron-right" />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Page>
  );
};

export default ProfilePage;
