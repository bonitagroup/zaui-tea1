import { FinalPrice } from "../../components/display/final-price";
import { DisplayPrice } from "../../components/display/price";
import { ProductPicker } from "../../components/product/picker";
import { Section } from "../../components/section";
import { ProductSlideSkeleton } from "../../components/skeletons";
import React, { Suspense, FC } from "react";
import { useRecoilValue } from "recoil";
import { recommendProductsState } from "../../state";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Text, Icon } from "zmp-ui";

const images = import.meta.glob(
  "../../static/page/product-list/*.{png,jpg,jpeg,svg,webp}",
  { eager: true }
) as Record<string, { default: string }>;

const getImage = (filename: string): string => {
  if (!filename) return "/fallback.svg";
  const key = Object.keys(images).find((k) => k.includes(filename));
  return key ? images[key].default : "/fallback.svg";
};

export const RecommendContent: FC = () => {
  const recommendProducts = useRecoilValue(recommendProductsState);

  return (
    <Box className="mb-4">
      <Box className="flex items-start p-2.5 mb-0 ">
        <Box className="pl-px">
          <Icon icon="zi-info-circle-solid" className="text-[#0a5132] text-5xl" />
        </Box>
        <Box className="flex-1 ml-2.5 ">
          <Text className="text-[#0a5132] font-semibold text-lg">
            Gợi ý cho bạn
          </Text>
          <Text size="xxSmall" className="text-[#0a5132] block">
            Sản phẩm đặc biệt của chúng tôi
          </Text>
        </Box>
      </Box>

      <Swiper slidesPerView={1.05} spaceBetween={16} className="px-10">
        {recommendProducts.map((product) => {
          const imageSrc = getImage(product.image);

          return (
            <SwiperSlide key={product.id}>
              <ProductPicker product={product}>
                {({ open }) => (
                  <div onClick={open} className="cursor-pointer mb-1.5">
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-zinc-300">
                      <div className="w-full aspect-[4/5] bg-white relative overflow-hidden">
                        <img
                          src={imageSrc}
                          alt={product.name}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-contain bg-white"
                        />
                      </div>

                      <Box className="p-3">
                        <Text size="small" className="line-clamp-2 font-medium">
                          {product.name}
                        </Text>

                        <div className="mt-2">
                          <Text size="xxSmall" className="line-through text-gray">
                            <DisplayPrice>{product.price}</DisplayPrice>
                          </Text>
                          <Text
                            size="large"
                            className="font-semibold text-red-600 block mt-1"
                          >
                            <FinalPrice>{product}</FinalPrice>
                          </Text>
                        </div>
                      </Box>
                    </div>
                  </div>
                )}
              </ProductPicker>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
};
