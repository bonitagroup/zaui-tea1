import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoriesState, productsState, selectedCategoryIdState } from '../state';
import { Box, Page, Header, Text, Button, Icon, useNavigate } from 'zmp-ui';
import { ProductPicker } from '../components/product/picker';
import { FinalPrice } from '../components/display/final-price';
import { ProductItem } from '../components/product/item';
import { CartIcon } from '../../src/components/cart-icon';
import zaloicon from '@/static/page/zaloIcon.png';
import { CiShoppingCart } from 'react-icons/ci';

const images = import.meta.glob('../static/page/product-list/*.{png,jpg,jpeg,svg,webp}', {
  eager: true,
}) as Record<string, { default: string }>;

const getImage = (filename: string): string => {
  if (!filename) return '/fallback.svg';
  const key = Object.keys(images).find((k) => k.includes(filename));
  return key ? images[key].default : '/fallback.svg';
};

const ProductDetailPage: React.FC = () => {
  const { id } = useParams();
  const products = useRecoilValue(productsState);
  const product = products.find((p) => String(p.id) === String(id));
  const [pickerOpen, setPickerOpen] = useState(false);
  const setSelectedCategoryId = useSetRecoilState(selectedCategoryIdState);
  const navigate = useNavigate();

  if (!product) {
    return (
      <Page>
        <Header title="Chi tiết sản phẩm" showBackIcon />
        <Box className="p-8 text-center text-gray">Không tìm thấy sản phẩm</Box>
      </Page>
    );
  }

  const categories = useRecoilValue(categoriesState);
  const imageSrc = getImage(product.image);
  const reviews: any[] = [];
  const gotoCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    navigate('/category');
  };
  const CiShoppingCartIcon = CiShoppingCart as React.ElementType;

  return (
    <Page className="bg-gray-50 pb-14">
      <Header title="Chi tiết sản phẩm" className="bg-[#055140] text-white" showBackIcon />

      <Box className="relative w-full aspect-[4/5] bg-white overflow-hidden">
        <img
          src={imageSrc}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-contain bg-white"
        />
        {true && (
          <div className="absolute top-4 left-[77%] -translate-x-1/2 z-10">
            <svg width="200" height="32" xmlns="http://www.w3.org/2000/svg">
              <polygon points="0,0 180,0 200,16 180,32 0,32 20,16" fill="#0f4d3c" />
              <text
                x="40"
                y="21"
                fontSize="14"
                fontWeight="bold"
                fill="white"
                fontFamily="sans-serif"
              >
                Sản phẩm yêu thích
              </text>
            </svg>
          </div>
        )}
      </Box>

      <Box className="bg-white p-4 rounded-t-xl -mt-4 shadow-lg">
        <Text.Title size="large" className="font-bold mb-1">
          {product.name}
        </Text.Title>
        <Text className="text-red-700 font-bold text-sm mb-2">
          <FinalPrice>{product}</FinalPrice>
        </Text>
      </Box>

      <Box className="bg-white p-4 mt-3 rounded-xl shadow-sm">
        <Text.Title size="small" className="font-semibold mb-2">
          Mô tả sản phẩm
        </Text.Title>
        <Text className="text-gray-700 leading-relaxed whitespace-pre-line">
          {product.description || 'Chưa có mô tả cho sản phẩm này.'}
        </Text>
      </Box>

      <Box className="bg-white p-4 mt-3 rounded-xl shadow-sm pb-20">
        <Text.Title size="small" className="font-semibold mb-3">
          Đánh giá sản phẩm
        </Text.Title>

        {reviews.length === 0 ? (
          <Box className="text-gray-500 text-center py-3">Chưa có đánh giá hay bình luận nào.</Box>
        ) : (
          reviews.map((r, idx) => (
            <Box key={idx} className="border-b border-gray-100 pb-3 mb-3">
              <Box className="flex items-center mb-1">
                <Text className="font-medium">{r.user}</Text>
                <Text size="xSmall" className="ml-auto text-gray-400">
                  {r.date}
                </Text>
              </Box>
              <Box className="flex items-center mb-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon
                    key={i}
                    icon="zi-star"
                    className={`text-sm ${i < r.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </Box>
              <Text className="text-gray-700 text-sm">{r.comment}</Text>
            </Box>
          ))
        )}
      </Box>

      <Box className="bg-white p-1 mt-3 rounded-xl shadow-sm">
        <Box className="flex items-center justify-between p-1 mb-0.5">
          <Box className="pl-px">
            <Icon icon="zi-more-diamond-solid" className="text-[#0a5132] text-4xl" />
          </Box>
          <Box className="flex-1 ml-2">
            <Text className="text-[#0a5132] font-semibold text-lg">Sản phẩm nổi bật</Text>
            <Text size="xxxSmall" className="text-[#0a5132] block">
              Danh sách sản phẩm bán chạy nhất
            </Text>
          </Box>
          <button
            onClick={() => gotoCategory(categories[0]?.id)}
            className="flex items-center gap-1 bg-white text-[#0a5132] text-sm font-medium px-2.5 py-1 rounded-lg border border-[#0a5132] hover:bg-[#a6d1b7] active:scale-95 transition"
          >
            <Icon icon="zi-more-grid-solid" className="text-lg bottom-1" />
            <span className="font-bold text-xs">Xem thêm</span>
          </button>
        </Box>

        <Box className="grid grid-cols-2 gap-3.5 px-1">
          {products.slice(0, 12).map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </Box>
      </Box>

      <Box className="fixed bottom-0 left-0 right-0 h-16 bg-white shadow-lg flex justify-between items-center px-1 z-50 border-e">
        <div className="flex flex-col items-center justify-center text-center w-1/5">
          <button
            onClick={() => window.open('https://zalo.me/your-zalo-id', '_blank')}
            className="flex flex-col items-center text-[#0084ff] hover:text-[#006ddc] transition-all duration-300"
          >
            <img src={zaloicon} alt="Zalo" className="w-8 h-8" />
            <span className="text-sm font-semibold text-[#055140]">Chat ngay</span>
          </button>
        </div>

        <div className="flex flex-col items-center justify-center text-center w-24">
          <button
            onClick={() => navigate('/cart')}
            className="flex flex-row items-center text-[#055140] hover:text-[#0a7a5b] transition-all duration-300"
          >
            <CiShoppingCartIcon
              className={`w-8 h-8 ${location.pathname === '/cart' ? 'text-[#0a7a5b]' : ''}`}
            />
            <span className="text-sm mt-1 font-semibold pl-1.5">Giỏ hàng</span>
          </button>
        </div>

        <div className="flex flex-none justify-end">
          <ProductPicker product={product}>
            {({ open }) => (
              <Button
                type="highlight"
                style={{ minWidth: 160, borderRadius: 8 }}
                className="bg-gradient-to-tl w-40 from-[#055140] to-[#0a7a5b] text-white font-semibold hover:from-[#0a7a5b] hover:to-[#055140] transition-all duration-300 pl-4 shadow-md"
                onClick={open}
              >
                Thêm vào giỏ hàng
              </Button>
            )}
          </ProductPicker>
        </div>
      </Box>
    </Page>
  );
};

export default ProductDetailPage;
