import { FinalPrice } from '../../components/display/final-price';
import React, { FC } from 'react';
import { Product } from '../../types/product';
import { Box, Icon, Text } from 'zmp-ui';
import { useNavigate } from 'react-router-dom';
import { ProductPicker } from './picker';
import { calcFinalPrice } from '../../utils/product';

const images = import.meta.glob('../../../src/static/page/product-list/*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
}) as Record<string, { default: string }>;

const getImage = (filename: string): string => {
  if (!filename) return '/fallback.svg';
  const key = Object.keys(images).find((k) => k.includes(filename));
  if (!key) return '/fallback.svg';
  return images[key].default;
};

export const ProductItem: FC<{ product: Product }> = ({ product }) => {
  const imageSrc = getImage(product.image);
  const navigate = useNavigate();

  // tinh gia co nhieu lua chon
  let priceDisplay: React.ReactNode;
  if (product.variants && product.variants.length > 0 && product.variants[0].options?.length > 1) {
    const variantId = product.variants[0].id;
    const prices = product.variants[0].options.map((option) =>
      calcFinalPrice(product, { [variantId]: option.id } as any)
    );
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    priceDisplay = (
      <span>
        <span>{minPrice.toLocaleString()} đ</span>
        {' - '}
        <span>{maxPrice.toLocaleString()} đ</span>
      </span>
    );
  } else {
    priceDisplay = <FinalPrice>{product}</FinalPrice>;
  }

  return (
    <div className="flex flex-col justify-between h-full bg-white rounded-b-lg rounded-t-none shadow-2xl overflow-hidden">
      <div className="cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
        <Box className="w-full aspect-[4/5] bg-white rounded-lg overflow-hidden relative">
          <img
            loading="lazy"
            src={imageSrc}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-contain bg-white"
          />
        </Box>

        <Text className="font-medium text-left pl-1 text-base mt-2">{product.name}</Text>
      </div>

      <div className="mt-auto">
        <Text size="xxSmall" className="font-semibold text-base text-left pl-2 text-red-600 pb-0">
          {priceDisplay}
        </Text>

        <ProductPicker product={product}>
          {({ open }) => (
            <button
              className="w-full bg-white text-[#0a5132] rounded-md py-3 px-3"
              onClick={(e) => {
                e.stopPropagation();
                open();
              }}
            >
              <div className="flex w-full justify-between items-end">
                <span className="font-normal text-sm">Quy cách đóng gói</span>
                <Icon icon="zi-plus-circle" className="text-xl items-center" />
              </div>
            </button>
          )}
        </ProductPicker>
      </div>
    </div>
  );
};
