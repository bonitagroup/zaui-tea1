import React, { FC, useEffect, useState } from 'react';
import { Page, Header, Box, Text, Tabs, Icon } from 'zmp-ui';
import { useNavigate, useLocation } from 'react-router';
import { Order, OrderStatus } from '../../types/order';

const TABS = [
  { key: 'pending', label: 'Đơn mới', icon: 'zi-list-add' },
  { key: 'processing', label: 'Chờ xác nhận', icon: 'zi-clock-1' },
  { key: 'delivering', label: 'Đang giao', icon: 'zi-truck' },
  { key: 'completed', label: 'Hoàn thành', icon: 'zi-check-circle' },
  { key: 'canceled', label: 'Đã hủy', icon: 'zi-close' },
] as const;

const OrderStatusBadge: FC<{ status: OrderStatus }> = ({ status }) => {
  const style =
    {
      pending: 'bg-blue-100 text-blue-800',
      processing: 'bg-yellow-100 text-yellow-800',
      delivering: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      canceled: 'bg-red-100 text-red-800',
    }[status] || 'bg-gray-100 text-gray-800';

  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${style}`}>{status}</span>;
};

const OrderCard: FC<{ order: Order }> = ({ order }) => {
  const navigate = useNavigate();
  return (
    <Box
      className="bg-white rounded-xl p-4 mb-3 shadow-sm"
      onClick={() => navigate(`/orders/${order.id}`)}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <Text className="font-medium mb-1">{order.items?.length} sản phẩm</Text>
          <Text size="xxSmall" className="text-gray">
            {new Date(order.createdAt).toLocaleDateString()}
          </Text>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="border-t pt-2 mt-2 flex justify-between items-center">
        <Text size="small" className="text-gray">
          Tổng tiền
        </Text>
        <Text className="font-bold text-[#0a7a5b]">{order.amount.toLocaleString()}đ</Text>
      </div>
    </Box>
  );
};

const OrdersPage: FC = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>(() => {
    const params = new URLSearchParams(location.search);
    return params.get('status') ?? 'pending';
  });
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem('orders');
    if (raw) {
      const list = JSON.parse(raw);
      setOrders(list);
    }
  }, []);

  // Update tab when query param changes (handle navigation from profile)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get('status');
    if (status) setActiveTab(status);
  }, [location.search]);

  const filteredOrders = orders.filter((o) => {
    if (activeTab === 'completed') {
      return ['delivered', 'returned'].includes(o.status);
    }
    return o.status === activeTab;
  });

  return (
    <Page>
      <Header title="Đơn mua" showBackIcon />

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        className="border-b bg-white sticky top-0 z-10"
      >
        {TABS.map((tab) => (
          <Tabs.Tab key={tab.key} label={tab.label}>
            <div className="p-4">
              {filteredOrders.length === 0 ? (
                <Box className="text-center py-8">
                  <Icon icon={'zi-close-circle'} size={32} className="text-gray-400 mb-2" />
                  <Text size="xSmall" className="text-gray">
                    Chưa có đơn hàng nào
                  </Text>
                </Box>
              ) : (
                filteredOrders.map((order) => <OrderCard key={order.id} order={order} />)
              )}
            </div>
          </Tabs.Tab>
        ))}
      </Tabs>
    </Page>
  );
};

export default OrdersPage;
