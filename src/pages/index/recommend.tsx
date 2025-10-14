import { FinalPrice } from "../../components/display/final-price";
import { DisplayPrice } from "../../components/display/price";
import { ProductPicker } from "../../components/product/picker";
import { Section } from "../../components/section";
import { ProductSlideSkeleton } from "../../components/skeletons";
import React, { Suspense } from "react";
import { FC } from "react";
import { useRecoilValue } from "recoil";
import { recommendProductsState } from "../../state";
import { Swiper, SwiperSlide } from "swiper/react";
import { Box, Text } from "zmp-ui";
import { Icon } from "zmp-ui";

export const RecommendContent: FC = () => {
  const recommendProducts = useRecoilValue(recommendProductsState);

  return (
    <Box className="mb-4">
      <Box className="flex items-start p-2.5 mb-1.5 ">
        <Box className="pl-px">
          <Icon icon="zi-info-circle-solid" className="text-[#0a5132] text-5xl" />
        </Box>
        <Box className="flex-1 ml-2.5 ">
          <Text className="text-[#0a5132] font-semibold text-xl">
            Gợi ý cho bạn
          </Text>
          <Text className="text-[#0a5132] text-xs block">
            Sản phẩm đặc biệt của chúng tôi
          </Text>
        </Box>
      </Box>

      <Swiper slidesPerView={1.05} spaceBetween={16} className="px-8">
        {recommendProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductPicker product={product}>
              {({ open }) => (
                <div onClick={open} className="cursor-pointer mb-1.5">
                  <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="w-full h-56 md:h-48 bg-skeleton">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover block"
                      />
                      {product.sale && (
                        <Text
                          size="xxxxSmall"
                          className="absolute right-3 top-3 uppercase bg-green text-white h-6 px-2 rounded-full"
                          style={{ transform: "translateZ(0)" }}
                        >
                          {product.sale.type === "percent"
                            ? `Giảm ${product.sale.percent * 100}%`
                            : `Giảm ${product.sale.amount}`}
                        </Text>
                      )}
                    </div>

                    <Box className="p-3">
                      <Text size="small" className="line-clamp-2">
                        {product.name}
                      </Text>

                      <div className="mt-2">
                        <Text size="xxSmall" className="line-through text-gray">
                          <DisplayPrice>{product.price}</DisplayPrice>
                        </Text>
                        <Text size="large" className="font-medium text-primary block mt-1 text-red-600">
                          <FinalPrice>{product}</FinalPrice>
                        </Text>
                      </div>
                    </Box>
                  </div>
                </div>
              )}
            </ProductPicker>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export const RecommendFallback: FC = () => {
  const recommendProducts = [...new Array(6)];

  return (
    <Section title="Gợi ý cho bạn" padding="title-only" className="">
      <Swiper slidesPerView={1.25} spaceBetween={16} className="px-4">
        {recommendProducts.map((_, i) => (
          <SwiperSlide key={i}>
            <ProductSlideSkeleton />
          </SwiperSlide>
        ))}
      </Swiper>
    </Section>
  );
};

export const Recommend: FC = () => {
  return (
    <Suspense fallback={<RecommendFallback />}>
      <RecommendContent />
    </Suspense>
  );
};
