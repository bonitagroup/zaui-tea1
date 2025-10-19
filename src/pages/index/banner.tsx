import React, { FC } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Box } from 'zmp-ui';

const banners = import.meta.glob('../../static/page/banner/*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
}) as Record<string, { default: string }>;

const getBanner = (filename: string): string => {
  let key = Object.keys(banners).find((k) => k.endsWith(filename));
  if (key) return banners[key].default;
  return key ? banners[key].default : '/fallback.svg';
};

export const Banner: FC = () => {
  return (
    <Box
      className="bg-white w-full p-0 m-0"
      pb={0}
      style={{
        overflow: 'hidden',
      }}
    >
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        autoplay
        loop
        cssMode
        style={{ width: '100%', margin: 0, padding: 0 }}
      >
        {[1, 2, 3, 4].map((i) => (
          <SwiperSlide key={i} style={{ padding: 0, margin: 0 }}>
            <img
              src={getBanner(`banner-${i}.webp`)}
              alt={`banner-${i}`}
              style={{
                width: '100%',
                height: '180px',
                objectFit: 'cover',
                display: 'block',
                background: '#f4f5f6',
              }}
              onError={(e) => {
                const base = `banner-${i}`;
                const key = Object.keys(banners).find((k) => k.includes(base));
                if (key) (e.currentTarget as HTMLImageElement).src = banners[key].default;
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};
