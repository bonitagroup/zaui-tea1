import React, { FC } from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { getDummyImage } from "utils/product";
import { Box } from "zmp-ui";

export const Banner: FC = () => {
  return (
    <Box
      className="bg-white w-full p-0 m-0"
      pb={0}
      style={{
        overflow: "hidden",
      }}
    >
      <Swiper
        modules={[Pagination]}
        pagination={{
          clickable: true,
        }}
        autoplay
        loop
        cssMode
        style={{ width: "100%", margin: 0, padding: 0 }}
      >
        {[1, 2, 3, 4, 5]
          .map((i) => getDummyImage(`banner-${i}.webp`))
          .map((banner, i) => (
            <SwiperSlide key={i} style={{ padding: 0, margin: 0 }}>
              <img
                src={banner}
                alt={`banner-${i + 1}`}
                style={{
                  width: "100%",
                  height: "180px",
                  objectFit: "cover",
                  display: "block",
                  margin: 0,
                  background: "#f4f5f6",
                  borderRadius: 0,
                }}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
};