import { FinalPrice } from "../../components/display/final-price";
import { DisplaySelectedOptions } from "../../components/display/selected-options";
import { ListRenderer } from "../../components/list-renderer";
import { ProductPicker } from "../../components/product/picker";
import React, { FC, useState } from "react";
import { useRecoilValue } from "recoil";
import { cartState } from "../../state";
import { CartItem } from "../../types/cart";
import { Box, Text } from "zmp-ui";

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

  return (
    <Box className="py-3 px-4">
      {cart.length > 0 ? (
        <ProductPicker product={editingItem?.product} selected={editingItem}>
          {({ open }) => (
            <ListRenderer
              items={cart}
              limit={3}
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
                  <Box className="w-12 aspect-[4/5] bg-white rounded-lg overflow-hidden flex items-center justify-center">
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
                <Box flex className="space-x-1">
                  <Box className="space-y-1 flex-1">
                    <Text size="small" className="font-medium line-clamp-1">
                      {item.product.name}
                    </Text>
                    <Text className="text-gray" size="xSmall">
                      <FinalPrice options={item.options}>
                        {item.product}
                      </FinalPrice>
                    </Text>
                    <Text className="text-gray" size="xxxSmall">
                      <DisplaySelectedOptions options={item.options}>
                        {item.product}
                      </DisplaySelectedOptions>
                    </Text>
                  </Box>
                  <Text className="text-primary font-medium" size="small">
                    x{item.quantity}
                  </Text>
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
