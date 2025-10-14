import { FinalPrice } from "../../components/display/final-price";
import React, { FC } from "react";
import { Product } from "../../types/product";
import { Box, Icon, Text } from "zmp-ui";
import { ProductPicker } from "./picker";

export const ProductItem: FC<{ product: Product }> = ({ product }) => {
  return (
    <ProductPicker product={product}>
      {({ open }) => (
        <div
          className="flex flex-col justify-between h-full bg-white rounded-b-lg rounded-t-none shadow-2xl overflow-hidden"
          onClick={open}
        >
          <div>
            <Box className="w-full aspect-square relative">
              <img
                loading="lazy"
                src={product.image}
                className="absolute left-0 right-0 top-0 bottom-0 w-full h-full object-cover object-center bg-skeleton"
              />
            </Box>
            <Text className="font-semibold text-left pl-1 text-lg">{product.name}</Text>
          </div>

          <div className="mt-auto">
            <Text size="xxSmall" className="font-semibold text-base text-left pl-2 text-red-600 pb-0">
              <FinalPrice>{product}</FinalPrice>
            </Text>
            <button className="w-full bg-white text-[#0a5132] rounded-md py-3 px-3">
              <div className="flex w-full justify-between items-end">
                <span className="font-normal text-sm">Quy cách đóng gói</span>
                <Icon icon="zi-plus-circle" className="text-xl items-center" />
              </div>
            </button>
          </div>
        </div>

      )}
    </ProductPicker>
  );
};
