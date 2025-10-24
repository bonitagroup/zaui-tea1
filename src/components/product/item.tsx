import { FinalPrice } from '../../components/display/final-price';
import React, { FC } from 'react';
import { Product } from '../../types/product';
import { Box, Icon, Text } from 'zmp-ui';
import { useNavigate } from 'react-router-dom';
import { ProductPicker } from './picker';
import { calcFinalPrice } from '../../utils/product';
import lightning from '../../static/page/lightning.png';
import { SelectedOptions } from '../../types/cart';

const images = import.meta.glob('../../../src/static/page/product-list/*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
}) as Record<string, { default: string }>;

const getImage = (filename: string): string => {
  if (!filename) return '/fallback.svg';
  const key = Object.keys(images).find((k) => k.includes(filename));
  if (!key) return '/fallback.svg';
  return images[key].default;
};

function getDiscountPercent(product: Product) {
  if (!product.sale) return null;
  if (product.sale.type === 'fixed') {
    const percent = Math.round((product.sale.amount / product.price) * 100);
    return percent > 0 ? percent : null;
  }
  if (product.sale.type === 'percent') {
    return Math.round(product.sale.percent * 100);
  }
  return null;
}

export const ProductItem: FC<{ product: Product }> = ({ product }) => {
  const imageSrc = getImage(product.image);
  const navigate = useNavigate();

  let priceDisplay: React.ReactNode;
  let originalPriceDisplay: React.ReactNode = null;
  if (product.variants && product.variants.length > 0) {
    const variant = product.variants[0];
    if (variant.options && variant.options.length > 1) {
      const variantOptions: SelectedOptions = {};
      const prices = variant.options.map((option) => {
        if (variant.id) {
          variantOptions[variant.id] = option.id;
          return calcFinalPrice(product, variantOptions);
        }
        return product.price;
      });

      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      priceDisplay = (
        <span>
          <span>{minPrice.toLocaleString()} đ</span>
          {' - '}
          <span>{maxPrice.toLocaleString()} đ</span>
        </span>
      );
    }
  } else {
    priceDisplay = <FinalPrice>{product}</FinalPrice>;
    if (product.sale) {
      originalPriceDisplay = (
        <span className="line-through text-gray-400 ml-2 text-base">
          {product.price.toLocaleString()} đ
        </span>
      );
    }
  }

  const discountPercent = getDiscountPercent(product);

  return (
    <div className="relative flex flex-col justify-between h-full bg-white rounded-b-lg rounded-t-none shadow-2xl overflow-hidden">
      {product.sale && (
        <div className="absolute top-0 left-0 z-10">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="100" height="48" viewBox="0 0 180 48">
              <title>Nhãn khuyến mãi</title>
              <rect x="0" y="0" width="180" height="48" rx="10" ry="10" fill="#e53935" />
              <rect
                x="48"
                y="8"
                width="126"
                height="32"
                rx="8"
                ry="8"
                fill="#ffffff"
                stroke="#d32f2f"
                strokeWidth="2"
              />
              <rect x="8" y="8" width="36" height="32" rx="6" ry="6" fill="#d32f2f" />
              <path
                d="m23.89,12.25l-8.54,14l9.82,0l-5.13,10.25l17.71,-15.75l-9.13,-0.25l5.28,-8.25l-10.01,0z"
                fill="#ffffff"
              />
              <text
                x="58.25"
                y="30.56"
                fontFamily="Arial, Helvetica, sans-serif"
                fontSize="18.76"
                fontWeight="700"
                fill="#d32f2f"
              >
                Khuyến mãi
              </text>
            </svg>
            {discountPercent && (
              <div className="bg-[#d32f2f] text-white px-1 py-1 rounded-full ml-3 font-semibold text-xs">
                -{discountPercent}%
              </div>
            )}
          </div>
        </div>
      )}

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
        <div className="flex items-end pl-2">
          <Text size="xxSmall" className="font-semibold text-base text-red-600 pb-0">
            {priceDisplay}
          </Text>
          {originalPriceDisplay}
        </div>
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
                <span className="font-normal text-sm text-[#0a5132]">Quy cách đóng gói</span>
                <Icon icon="zi-plus-circle" className="text-xl items-center" />
              </div>
            </button>
          )}
        </ProductPicker>
      </div>
    </div>
  );
};
