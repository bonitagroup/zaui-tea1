import { ProductItem } from '../components/product/item';
import React, { FC, Suspense, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { categoriesState, productsByCategoryState } from '../state';
import { Box, Header, Icon, Page, Text } from 'zmp-ui';
import { useNavigate } from 'react-router';
import { BiColor } from 'react-icons/bi';

const images = import.meta.glob('../static/page/*.{png,svg}', { eager: true }) as Record<
  string,
  { default: string }
>;
const getIcon = (filename: string) =>
  filename
    ? Object.keys(images).find((k) => k.toLowerCase().includes(filename.toLowerCase()))
      ? images[Object.keys(images).find((k) => k.toLowerCase().includes(filename.toLowerCase()))!]
          .default
      : '/fallback.svg'
    : '/fallback.svg';

const HEADER_H = 72;

const CategoryPicker: FC = () => {
  const categories = useRecoilValue(categoriesState);
  const [activeKey, setActiveKey] = useState(categories[0].id);
  const [subIdx, setSubIdx] = useState(0);

  const activeCategory = categories.find((c) => c.id === activeKey);
  const subcategories = activeCategory?.subcategories || [];

  return (
    <>
      <div style={{ position: 'sticky', top: HEADER_H, zIndex: 40 }} className="bg-white">
        <Box className="flex items-center px-0 pt-3">
          <div className="flex w-full">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => {
                  setActiveKey(cat.id);
                  setSubIdx(0);
                }}
                className={`flex-1 flex flex-col items-center px-2 cursor-pointer transition-all duration-150 ${
                  activeKey === cat.id ? 'text-[#055140] font-bold' : 'text-gray-500'
                }`}
              >
                <img className="w-10 h-10 mb-1" src={getIcon(cat.icon)} alt={cat.name} />
                <Text size="small" className="w-full text-center truncate">
                  {cat.name}
                </Text>

                {activeKey === cat.id ? (
                  <div className="w-10 h-0.5 rounded-full bg-[#055140] mt-1" />
                ) : (
                  <div className="w-10 h-0.5 rounded-full bg-transparent mt-1" />
                )}
              </div>
            ))}
          </div>
        </Box>
      </div>

      {subcategories.length > 0 && (
        <div className="bg-white">
          <Box className="flex items-center px-0 pb-2 pt-2 overflow-x-auto">
            <div className="flex gap-7 px-3 py-1">
              {subcategories.map((sub, i) => (
                <div
                  key={sub.id}
                  onClick={() => setSubIdx(i)}
                  className={`flex-shrink-0 flex flex-col items-center cursor-pointer min-w-[56px] ${
                    subIdx === i ? 'text-[#288F4E] font-semibold' : 'text-gray-400'
                  }`}
                >
                  <img className="w-9 h-9 mb-1" src={getIcon(sub.icon)} alt={sub.name} />
                  <Text size="small">{sub.name}</Text>
                  {subIdx === i ? (
                    <div className="w-10 h-0.5 rounded-full bg-[#288F4E] mt-1" />
                  ) : (
                    <div className="w-5 h-0.5 bg-transparent mt-1" />
                  )}
                </div>
              ))}
            </div>
          </Box>
        </div>
      )}

      <Suspense>
        <CategoryProducts categoryId={activeKey} />
      </Suspense>
    </>
  );
};

const CategoryProducts: FC<{ categoryId: string }> = ({ categoryId }) => {
  const productsByCategory = useRecoilValue(productsByCategoryState(categoryId));

  if (productsByCategory.length === 0) {
    return (
      <Box className="flex-1 bg-background p-4 flex justify-center items-center">
        <Text size="xSmall" className="text-gray">
          Không có sản phẩm trong danh mục
        </Text>
      </Box>
    );
  }

  return (
    <Box className="bg-background grid grid-cols-2 gap-3 p-3">
      {productsByCategory.map((product) => (
        <ProductItem key={product.id} product={product} />
      ))}
    </Box>
  );
};

const SearchButton: FC = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate('/search')}
      className="
        fixed bottom-16 right-7 z-50
        bg-[#0a5132] text-white
        rounded-full shadow-lg
        w-14 h-14 flex items-center justify-around
        hover:bg-[#0d6843] active:scale-95 transition
      "
    >
      <Icon icon="zi-search" className="text-2xl bottom-1" />
    </button>
  );
};

const CategoryPage: FC = () => {
  return (
    <Page className="flex flex-col pb-0 bg-gray-50 relative">
      <div style={{ position: 'sticky', top: 0, zIndex: 50 }}>
        <Header
          title="Danh mục"
          textColor="white"
          backgroundColor="#0a5132"
          className="pt-8 px-2.5 text-base"
          style={{ height: HEADER_H }}
        />
      </div>
      <CategoryPicker />
      <SearchButton />
    </Page>
  );
};

export default CategoryPage;
