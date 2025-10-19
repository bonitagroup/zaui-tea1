import { DisplayPrice } from '../../components/display/price';
import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { totalPriceState, totalQuantityState } from '../../state';
import pay from '../../utils/product';
import { Box, Button, Text } from 'zmp-ui';

export const CartPreview: FC = () => {
  const quantity = useRecoilValue(totalQuantityState);
  const totalPrice = useRecoilValue(totalPriceState);

  return (
    <Box className="absolute bottom-12 left-0 right-0 px-4 z-50">
      <Box className="bg-white rounded-t-lg p-6 flex items-start gap-1.5 shadow-md">
        <Box className="flex-1">
          <Text className="text-gray" size="xSmall">
            {quantity} sản phẩm
          </Text>
          <Text className="text-sm text-gray">Tổng thanh toán</Text>
          <Text.Title size="large" className="text-[#0b4f3a]">
            <DisplayPrice>{totalPrice}</DisplayPrice>
          </Text.Title>
        </Box>

        <Button
          type="highlight"
          disabled={!quantity}
          className="rounded-full px-8 py-2 text-white bg-[#0b4f3a] flex items-center justify-center text-sm"
          onClick={() => pay(totalPrice)}
        >
          <span className="mr-2">🛒</span> Đặt hàng
        </Button>
      </Box>
    </Box>
  );
};
