import React from 'react';
import { Box, Text, Button } from 'zmp-ui';
import giftIcon from '../../static/iconsvg/gift.png';
import voucherIcon from '../../static/iconsvg/voucher.png';
import luckySpinIcon from '../../static/iconsvg/fortune.png';

const AvailableGifts = () => {
  return (
    <Box className="px-2 py-3">
      <Box className="flex items-center gap-2 mb-3">
        <img src={giftIcon} className="w-12 h-12" alt="Gift" />
        <Box className="flex flex-col">
          <Text className="font-semibold text-lg">Quà của bạn</Text>
          <Text className="text-xs font-normal">(*) Mua hàng để sử dụng quà</Text>
        </Box>
      </Box>
      <Box className="space-y-3">
        <Box className="bg-white p-4 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center">
            <img src={voucherIcon} className="w-10 h-10 mr-3" alt="Voucher" />
            <div>
              <Text className="font-medium">Giảm 50k giá trị đơn hàng</Text>
              <Text size="xSmall" className="text-gray-500">
                Áp dụng với khách hàng hoàn thành nhiệm vụ
              </Text>
              <Text size="xxSmall" className="text-gray-400 mt-1">
                HSD: 26-10-2025
              </Text>
            </div>
            <button className="text-sm w-36 h-9 bg-red-700 border rounded-lg text-white py-0 px-2">
              Dùng ngay
            </button>
          </div>
        </Box>

        <Box className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center">
            <img src={luckySpinIcon} className="w-10 h-10 mr-3" alt="Lucky Spin" />
            <div>
              <Text className="font-medium">8 lượt quay may mắn trúng quà</Text>
              <Text size="xSmall" className="text-gray-500">
                Lượt quay nhận từ mua sản phẩm, đánh giá sản phẩm, quan tâm ZaloOA...
              </Text>
            </div>
            <button className="text-sm w-52 h-9 bg-red-700 border rounded-lg text-white py-0 px-2">
              Quay ngay
            </button>
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default AvailableGifts;
