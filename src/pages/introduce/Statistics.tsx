import React from 'react';
import { Box, Text } from 'zmp-ui';
import { FaLeaf, FaMoneyBillWave, FaShoppingBag, FaReceipt, FaArrowRight } from 'react-icons/fa';

export default function Statistics() {
  return (
    <div className="max-w-xl mx-auto bg-white">
      <Box className="p-2 grid grid-cols-2 gap-2.5">
        <StatBox
          icon={<FaLeaf className="w-10 h-10" />}
          title="Tổng hoa hồng"
          value="0"
          unit="điểm thưởng"
        />
        <StatBox
          icon={<FaMoneyBillWave className="w-10 h-10" />}
          title="Tổng doanh thu"
          value="0"
          unit="đ"
        />
        <StatBox icon={<FaShoppingBag className="w-10 h-10" />} title="Sản phẩm đã bán" value="0" />
        <StatBox icon={<FaReceipt className="w-10 h-10" />} title="Đơn thành công" value="0" />
      </Box>

      <Box className="bg-white p-3 mt-3.5 mx-2 border border-y border-zinc-300 rounded-none shadow-sm">
        <Box className="flex items-center justify-between">
          <Text className="font-semibold text-sm">Dữ liệu tháng này</Text>
          <FaArrowRight className="opacity-70 text-gray-400" />
        </Box>

        <Box className="flex justify-between text-center mt-3">
          <MonthlyStatItem value="0" label="Điểm thưởng tạm tính" />
          <MonthlyStatItem value="0" label="Số lượt click" />
          <MonthlyStatItem value="0" label="Đơn hàng" />
        </Box>
      </Box>
    </div>
  );
}

const StatBox = ({ icon, title, value, unit = '' }) => (
  <Box className="bg-white rounded-none p-2.5 border border-zinc-400 flex items-center gap-2">
    <div className="w-10 h-10 flex items-center justify-center rounded-lg">
      <div className="text-[#0a5132]">{icon}</div>
    </div>

    <div className="flex-1">
      <Text className="text-xs font-bold text-gray-700">{title}</Text>
      <div className="mt-1 flex items-baseline gap-2">
        <Text className="text-base font-normal text-gray-900">{value}</Text>
        {unit ? <Text className="text-xs text-gray-500">{unit}</Text> : null}
      </div>
    </div>
  </Box>
);

const MonthlyStatItem = ({ value, label }) => (
  <Box className="flex-auto">
    <Text className="text-lg font-semibold text-zinc-800">{value}</Text>
    <Text size="xxSmall" className="text-zinc-800 inline">
      {label}
    </Text>
  </Box>
);
