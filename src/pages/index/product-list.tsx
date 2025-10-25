import React, { FC, Suspense } from 'react';
import { Section } from '../../components/section';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { productsState } from '../../state/state';
import { Box, Icon, Text } from 'zmp-ui';
import { ProductItem } from '../../components/product/item';
import { ProductItemSkeleton } from '../../components/skeletons';
import { categoriesState, selectedCategoryIdState } from '../../state/state';
import { useNavigate } from 'react-router';

export const ProductListContent: FC = () => {
  const categories = useRecoilValue(categoriesState);
  const products = useRecoilValue(productsState);
  const setSelectedCategoryId = useSetRecoilState(selectedCategoryIdState);
  const navigate = useNavigate();

  const gotoCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    navigate('/category');
  };
  return (
    <>
      <Box className="flex items-center justify-between p-2 mb-0.5">
        <Box className="flex items-center">
          <Box className="pl-px">
            <Icon icon="zi-more-diamond-solid" className="text-[#0a5132] text-4xl" />
          </Box>
          <Box className="flex-1 ml-2">
            <Text className="text-[#0a5132] font-semibold text-lg">Sản phẩm nổi bật</Text>
            <Text size="xxxSmall" className="text-[#0a5132] block">
              Danh sách sản phẩm bán chạy nhất
            </Text>
          </Box>
        </Box>

        <button
          onClick={() => gotoCategory(categories[0]?.id)}
          className="flex items-center gap-1 bg-white text-[#0a5132] text-sm font-medium px-2.5 py-1 rounded-lg border border-[#0a5132] hover:bg-[#a6d1b7] active:scale-95 transition"
        >
          <Icon icon="zi-more-grid-solid" className="text-lg bottom-1" />
          <span className="font-bold text-xs">Xem thêm</span>
        </button>
      </Box>

      <Box className="grid grid-cols-2 gap-3.5 px-4">
        {products.slice(0, 12).map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </Box>
    </>
  );
};

export const ProductListFallback: FC = () => {
  const products = [...new Array(12)];

  return (
    <Section title="Danh sách sản phẩm">
      <Box className="grid grid-cols-2 gap-4">
        {products.map((_, i) => (
          <ProductItemSkeleton key={i} />
        ))}
      </Box>
    </Section>
  );
};

export const ProductList: FC = () => {
  return (
    <Suspense fallback={<ProductListFallback />}>
      <ProductListContent />
    </Suspense>
  );
};
