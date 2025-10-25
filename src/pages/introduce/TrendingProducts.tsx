import React from 'react';
import { Box, Text } from 'zmp-ui';
import { productsState } from '../../state/state';
import { useRecoilValue } from 'recoil';
import { ProductItem } from '../../components/product/item';

const TrendingProducts = () => {
  const products = useRecoilValue(productsState);

  return (
    <Box className="bg-white mt-3 mx-2 border border-y border-zinc-300 rounded-none">
      <Text className="font-semibold p-4">Thịnh hành</Text>
      <Text size="xxxSmall" className="text-gray-500 mb-4 px-3">
        Những sản phẩm có nhiều lượt bán qua giới thiệu khách hàng
      </Text>
      <Box className="grid grid-cols-2 gap-3.5 px-3.5">
        {products.slice(0, 12).map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </Box>
    </Box>
  );
};

export default TrendingProducts;
