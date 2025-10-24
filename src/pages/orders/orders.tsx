import React, { useState } from 'react';
import { Page, Header, Box, Text } from 'zmp-ui';
import { useRecoilValue } from 'recoil';
import { ordersState } from '../../state';

const TABS = [
  { key: 'pending', label: 'Chờ xác nhận' },
  { key: 'shipping', label: 'Chờ lấy hàng' },
  { key: 'delivering', label: 'Đang giao' },
  { key: 'completed', label: 'Đã giao' },
  { key: 'cancelled', label: 'Đã hủy' },
  { key: 'returned', label: 'Trả hàng' },
];

export default function OrdersPage() {
  const [tab, setTab] = useState('pending');
  const allOrders = useRecoilValue(ordersState);
  const orders = allOrders.filter((o) => o.status === tab);

  return (
    <Page className="bg-white">
      <Header title="Đơn mua" showBackIcon backgroundColor="#0a5132" textColor="white" />

      <Box className="flex flex-nowrap gap-2 items-center px-0 pb-1 overflow-x-auto scrollbar-none">
        {TABS.map((t) => {
          const active = tab === t.key;
          return (
            <div
              key={t.key}
              className="flex-shrink-0 flex flex-col text-center px-3 py-2 cursor-pointer"
              onClick={() => setTab(t.key)}
            >
              <Text
                className={`text-sm whitespace-nowrap ${
                  active ? 'font-bold text-green-700' : 'text-gray-500'
                }`}
              >
                {t.label}
              </Text>
              {active && <div className="h-1 bg-green-700 rounded-full mt-2 mx-auto w-1/2"></div>}
            </div>
          );
        })}
      </Box>

      {orders.length === 0 ? (
        <Box className="flex items-center justify-center h-[80vh]">
          <Text className="text-gray-500">Chưa có đơn hàng</Text>
        </Box>
      ) : (
        <Box className="p-4">
          {orders.map((order) => (
            <Box key={order.id} className="bg-white rounded-xl p-4 mb-3 shadow text-left">
              <Text className="font-semibold block mb-1">Đơn #{order.id}</Text>
              <Text className="text-sm block mb-1">Tổng: {order.total} đ</Text>
              <Text size="xSmall" className="text-gray block mb-2">
                Ngày đặt: {new Date(order.createdAt).toLocaleString()}
              </Text>
            </Box>
          ))}
        </Box>
      )}
    </Page>
  );
}
