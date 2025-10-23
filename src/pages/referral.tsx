import React, { FC, useEffect, useState } from 'react';
import { Page, Header, Box, Text } from 'zmp-ui';

const IconPlant: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 3C10 5 8 6 6 6s-2 2 0 4c2 2 4 2 6 0s4-2 6 0c2 2 2 4 0 4s-4-1-6-3"
      stroke="#0b6b49"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="12" r="2" fill="#0b6b49" />
  </svg>
);

const IconMoneyBag: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16 6s1 1 1 3-1 3-4 3-6 2-6 6h10"
      stroke="#0b6b49"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 6c.5-1 1.5-2 4-2s3.5 1 4 2"
      stroke="#0b6b49"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconBag: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6 8h12l-1 12H7L6 8z"
      stroke="#0b6b49"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 8V6a3 3 0 016 0v2"
      stroke="#0b6b49"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconReceipt: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="3" width="16" height="18" rx="2" stroke="#0b6b49" strokeWidth="1.6" />
    <path d="M8 7h8M8 11h8" stroke="#0b6b49" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IconTool: FC<{ className?: string }> = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="8" r="3" stroke="#0b6b49" strokeWidth="1.6" />
    <path d="M5 20c1-4 4-6 7-6s6 2 7 6" stroke="#0b6b49" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const ArrowRight: FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 12h14M13 6l6 6-6 6"
      stroke="#a3a3a3"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ReferralPageClone: FC = () => {
  const [userInfo, setUserInfo] = useState<{ avatar?: string; name?: string }>({});

  useEffect(() => {
    if ((window as any).userInfo) {
      setUserInfo((window as any).userInfo);
    } else {
      try {
        const raw = localStorage.getItem('userInfo');
        if (raw) setUserInfo(JSON.parse(raw));
      } catch {}
    }
  }, []);

  return (
    <Page className="bg-gray-100 min-h-screen">
      <Header title="Giới thiệu khách hàng" />
      <Box className="bg-white flex items-center gap-4 p-4 border-b">
        <div className="relative w-14 h-14">
          <div
            className="absolute inset-0 rounded-full p-0.5"
            style={{ background: 'conic-gradient(#6ed3b3, #0b6b49)' }}
          />
          <div className="absolute inset-1 rounded-full bg-white" />
          <div className="absolute inset-1.5 rounded-full bg-gray-200 flex items-center justify-center">
            {userInfo.avatar ? (
              <img
                src={userInfo.avatar}
                alt="avatar"
                className="w-10 h-10 rounded-full bg-gray-100 object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-lg">
                ?
              </div>
            )}
          </div>
          <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
        </div>
        <Box>
          <Text className="font-semibold text-base">{userInfo.name || 'Quý khách hàng'}</Text>
          <Text className="text-red-500 text-sm mt-1">Hoa hồng cho mỗi đơn hàng là 10%</Text>
        </Box>
      </Box>

      <Box className="p-4 grid grid-cols-2 gap-3">
        <Box className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-start gap-3">
          <div className="w-12 h-12 flex items-center justify-center bg-green-50 rounded-lg">
            <IconPlant className="w-6 h-6" />
          </div>
          <div>
            <Text className="text-sm font-semibold">Tổng hoa hồng</Text>
            <Text className="text-lg mt-1">0 điểm thưởng</Text>
          </div>
        </Box>

        <Box className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-start gap-3">
          <div className="w-12 h-12 flex items-center justify-center bg-green-50 rounded-lg">
            <IconMoneyBag className="w-6 h-6" />
          </div>
          <div>
            <Text className="text-sm font-semibold">Tổng doanh thu</Text>
            <Text className="text-lg mt-1">0 đ</Text>
          </div>
        </Box>

        <Box className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-start gap-3">
          <div className="w-12 h-12 flex items-center justify-center bg-green-50 rounded-lg">
            <IconBag className="w-6 h-6" />
          </div>
          <div>
            <Text className="text-sm font-semibold">Sản phẩm đã bán</Text>
            <Text className="text-lg mt-1">0</Text>
          </div>
        </Box>

        <Box className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-start gap-3">
          <div className="w-12 h-12 flex items-center justify-center bg-green-50 rounded-lg">
            <IconReceipt className="w-6 h-6" />
          </div>
          <div>
            <Text className="text-sm font-semibold">Đơn thành công</Text>
            <Text className="text-lg mt-1">0</Text>
          </div>
        </Box>
      </Box>

      <Box className="bg-white p-4 mt-2 border-t border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <Text className="font-semibold">Dữ liệu tháng này</Text>
          </div>
          <div className="opacity-70">
            <ArrowRight />
          </div>
        </div>

        <Box className="flex justify-between text-center mt-4">
          <Box>
            <Text className="text-lg font-semibold">0</Text>
            <Text size="xSmall">Điểm thưởng tạm tính</Text>
          </Box>
          <Box>
            <Text className="text-lg font-semibold">0</Text>
            <Text size="xSmall">Số lượt click</Text>
          </Box>
          <Box>
            <Text className="text-lg font-semibold">0</Text>
            <Text size="xSmall">Đơn hàng</Text>
          </Box>
        </Box>
      </Box>

      <Box className="bg-white p-4 mt-2">
        <Text className="font-semibold mb-1">Công cụ</Text>
        <Text size="xSmall" className="text-gray-500 mb-4">
          Chúng tôi sẽ luôn đồng hành và hỗ trợ bạn
        </Text>

        <Box className="grid grid-cols-4 gap-y-6 text-center">
          {Object.entries({
            'Cẩm nang': IconTool,
            'Hỗ trợ': IconTool,
            'Thành viên': IconTool,
            'Đường dẫn': IconTool,
            'Chia sẻ quà tặng': IconTool,
            'Lịch sử điểm thưởng': IconTool,
          }).map(([label, Icon], idx) => (
            <Box key={idx} className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-md bg-green-50 flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </div>
              <Text size="small" className="text-sm">
                {label as string}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>

      <Box className="bg-white p-4 mt-2">
        <Text className="font-semibold mb-1">Thịnh hành</Text>
        <Text size="xSmall" className="text-gray-500 mb-4">
          Những sản phẩm có nhiều lượt bán qua giới thiệu khách hàng
        </Text>
        <div className="w-full h-24 bg-gray-200 rounded" />
      </Box>
    </Page>
  );
};

export default ReferralPageClone;
