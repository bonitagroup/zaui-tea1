import React, { FC } from 'react';
import { Page, Header, Box, Text } from 'zmp-ui';

const ReferralPage: FC = () => {
  return (
    <Page className="bg-gray-100">
      <Header title="Giới thiệu khách hàng" />

      <Box className="bg-white flex items-center gap-3 p-4 border-b">
        <div className="w-12 h-12 rounded-full bg-gray-200" />
        <Box>
          <Text className="font-semibold text-base">Lương Tú</Text>
          <Text className="text-red-500 text-sm">Hoa hồng cho mỗi đơn hàng là 10%</Text>
        </Box>
      </Box>

      <Box className="grid grid-cols-2 gap-3 p-4">
        <Box className="bg-white rounded-xl p-4 shadow-sm">
          <Text className="text-sm font-semibold">Tổng hoa hồng</Text>
          <Text className="text-lg mt-1">0 điểm thưởng</Text>
        </Box>
        <Box className="bg-white rounded-xl p-4 shadow-sm">
          <Text className="text-sm font-semibold">Tổng doanh thu</Text>
          <Text className="text-lg mt-1">0 đ</Text>
        </Box>
        <Box className="bg-white rounded-xl p-4 shadow-sm">
          <Text className="text-sm font-semibold">Sản phẩm đã bán</Text>
          <Text className="text-lg mt-1">0</Text>
        </Box>
        <Box className="bg-white rounded-xl p-4 shadow-sm">
          <Text className="text-sm font-semibold">Đơn thành công</Text>
          <Text className="text-lg mt-1">0</Text>
        </Box>
      </Box>

      <Box className="bg-white p-4 mt-2">
        <Text className="font-semibold mb-2">Dữ liệu tháng này</Text>
        <Box className="flex justify-between text-center">
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
          <Box>
            <div className="w-8 h-8 mx-auto bg-gray-200 rounded" />
            <Text size="small">Cẩm nang</Text>
          </Box>
          <Box>
            <div className="w-8 h-8 mx-auto bg-gray-200 rounded" />
            <Text size="small">Hỗ trợ</Text>
          </Box>
          <Box>
            <div className="w-8 h-8 mx-auto bg-gray-200 rounded" />
            <Text size="small">Thành viên</Text>
          </Box>
          <Box>
            <div className="w-8 h-8 mx-auto bg-gray-200 rounded" />
            <Text size="small">Đường dẫn</Text>
          </Box>
          <Box>
            <div className="w-8 h-8 mx-auto bg-gray-200 rounded" />
            <Text size="small">Chia sẻ</Text>
          </Box>
          <Box>
            <div className="w-8 h-8 mx-auto bg-gray-200 rounded" />
            <Text size="small">Lịch sử</Text>
          </Box>
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

export default ReferralPage;
