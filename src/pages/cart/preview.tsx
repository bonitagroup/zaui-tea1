import { DisplayPrice } from '../../components/display/price';
import React, { FC } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { totalPriceState, totalQuantityState, cartState, ordersState } from '../../state/state';
import pay from '../../utils/product';
import { Box, Button, Text } from 'zmp-ui';

export const CartPreview: FC = () => {
  const quantity = useRecoilValue(totalQuantityState);
  const totalPrice = useRecoilValue(totalPriceState);
  const cart = useRecoilValue(cartState);
  const setOrders = useSetRecoilState(ordersState);
  const setCart = useSetRecoilState(cartState);

  let voucherDiscount = 0;
  try {
    const v = typeof window !== 'undefined' ? localStorage.getItem('selectedVoucher') : null;
    if (v) voucherDiscount = JSON.parse(v).amount || 0;
  } catch {}

  const finalPrice = Math.max(0, totalPrice - voucherDiscount);

  const handlePay = () => {
    pay(finalPrice, 'Thanh toán đơn hàng');
    setOrders((orders) => [
      ...orders,
      {
        id: Date.now().toString(),
        items: Array.isArray(cart)
          ? cart.map((item) => ({
              productId: item.product.id,
              name: item.product.name,
              quantity: item.quantity,
              price: item.product.price,
              options: item.options,
            }))
          : [],
        amount: typeof finalPrice === 'number' ? finalPrice : 0,
        status: 'pending',
        createdAt: new Date().toISOString(),
        voucherId:
          typeof window !== 'undefined'
            ? (() => {
                const v = localStorage.getItem('selectedVoucher');
                try {
                  return v ? JSON.parse(v).id : undefined;
                } catch {
                  return undefined;
                }
              })()
            : undefined,
      },
    ]);
    setCart([]);
    localStorage.removeItem('selectedVoucher');
  };

  return (
    <Box className="absolute bottom-12 left-0 right-0 px-4 z-50">
      <Box className="bg-white rounded-t-lg p-6 flex items-start gap-1.5 shadow-md">
        <Box className="flex-1">
          <Text className="text-gray" size="xSmall">
            {quantity} sản phẩm
          </Text>
          <Text className="text-sm text-gray">Tổng thanh toán</Text>
          <Text.Title size="large" className="text-[#0b4f3a]">
            <DisplayPrice>{finalPrice}</DisplayPrice>
          </Text.Title>
        </Box>

        <Button
          type="highlight"
          disabled={!quantity}
          className="rounded-full px-8 py-2 text-white bg-[#0b4f3a] flex items-center justify-center text-sm"
          onClick={handlePay}
        >
          <span className="mr-2">🛒</span> Đặt hàng
        </Button>
      </Box>
    </Box>
  );
};
