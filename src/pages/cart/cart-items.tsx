import { FinalPrice } from "../../components/display/final-price";
import { DisplaySelectedOptions } from "../../components/display/selected-options";
import { ListRenderer } from "../../components/list-renderer";
import { ProductPicker } from "../../components/product/picker";
import React, { FC, useState } from "react";
import { useRecoilValue } from "recoil";
import { cartState } from "../../state";
import { CartItem } from "../../types/cart";
import { Box, Text } from "zmp-ui";
import { FaBoxOpen } from "react-icons/fa";

const images = import.meta.glob(
  "../../static/page/product-list/*.{png,jpg,jpeg,svg,webp}",
  { eager: true }
) as Record<string, { default: string }>;

const getImage = (filename: string): string => {
  if (!filename) return "/fallback.svg";
  const key = Object.keys(images).find((k) => k.includes(filename));
  return key ? images[key].default : "/fallback.svg";
};

export const CartItems: FC = () => {
  const cart = useRecoilValue(cartState);
  const [editingItem, setEditingItem] = useState<CartItem | undefined>();
  const IconFa = FaBoxOpen as React.ElementType;

  return (
    <Box className="py-4 px-4 space-y-6 bg-[#f3f3f6]">
      <Box className="flex items-center gap-3">
        <div className="w-14 h-9 flex items-center justify-center rounded-md p-1.5">
          <IconFa size={32} color="#0b4f3a" />
        </div>
        <Text className="text-[#0b4f3a] font-semibold text-lg">Sản phẩm đặt mua</Text>
      </Box>

      {cart.length > 0 ? (
        <ProductPicker product={editingItem?.product} selected={editingItem}>
          {({ open }) => (
            <ListRenderer
              items={cart}
              limit={10}
              onClick={(item) => {
                setEditingItem(item);
                open();
              }}
              renderKey={({ product, options, quantity }) =>
                JSON.stringify({ product: product.id, options, quantity })
              }
              renderLeft={(item) => {
                const imageSrc = getImage(item.product.image);
                return (
                  <Box className="w-16 aspect-[4/5] bg-white rounded-md overflow-hidden flex items-center justify-center shadow-sm">
                    <img
                      className="max-w-full max-h-full object-contain"
                      src={imageSrc}
                      alt={item.product.name}
                      loading="lazy"
                    />
                  </Box>
                );
              }}
              renderRight={(item) => (
                <Box flex className="space-x-3 items-start w-full">
                  <Box className="space-y-1 flex-1">
                    <Text size="small" className="font-semibold text-base line-clamp-2">
                      {item.product.name}
                    </Text>
                    <Box className="flex grid-flow-col">
                      <Text className="text-[#0b4f3a] font-bold text-lg" size="small">
                        <FinalPrice options={item.options}>{item.product}</FinalPrice>
                      </Text>
                      <Text className="text-[#0b4f3a] font-semibold" size="small">
                        &nbsp;&nbsp;&nbsp;x{item.quantity}
                      </Text>
                    </Box>
                  </Box>
                  <button className="ml-2 text-gray-400" aria-label="remove-item">✕</button>
                </Box>
              )}
            />
          )}
        </ProductPicker>
      ) : (
        <Text
          className="bg-background rounded-xl py-8 px-4 text-center text-gray"
          size="xxSmall"
        >
          Không có sản phẩm trong giỏ hàng
        </Text>
      )}
    </Box>
  );
};
