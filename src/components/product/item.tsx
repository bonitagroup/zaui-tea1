import { FinalPrice } from "../../components/display/final-price";
import React, { FC } from "react";
import { Product } from "../../types/product";
import { Box, Icon, Text } from "zmp-ui";
import { ProductPicker } from "./picker";

export const ProductItem: FC<{ product: Product }> = ({ product }) => {
  return (
    <ProductPicker product={product}>
      {({ open }) => (
        <div className="space-y-2 bg-white rounded-b-lg rounded-t-none shadow-2xl overflow-hidden" onClick={open}>
          <Box className="w-full aspect-square relative">
            <img
              loading="lazy"
              src={product.image}
              className="absolute left-0 right-0 top-0 bottom-0 w-full h-full object-cover object-center rounded-none bg-skeleton"
            />
          </Box>
          <Text className="font-semibold text-left pl-1 text-lg">{product.name}</Text>
          <Text size="xxSmall" className="font-semibold text-base text-left pl-2 text-red-600 pb-0">
            <FinalPrice>{product}</FinalPrice>
          </Text>
          <button className="w-full bg-white text-[#0a5132] rounded-md py-3.5 px-3">
            <div className="flex w-full justify-between items-center">
              <span className="font-normal">Quy cách đóng gói</span>
              <Icon icon="zi-plus-circle" className="text-xl" />
            </div>
          </button>

        </div>
      )}
    </ProductPicker>
  );
};
