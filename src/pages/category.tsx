import { ProductItem } from "../components/product/item";
import React, { FC, Suspense } from "react";
import { useRecoilValue } from "recoil";
import {
  categoriesState,
  productsByCategoryState,
  selectedCategoryIdState,
} from "../state";
import { Box, Header, Icon, Page, Tabs, Text } from "zmp-ui";
import { useNavigate } from "react-router";

const CategoryPicker: FC = () => {
  const categories = useRecoilValue(categoriesState);
  const selectedCategory = useRecoilValue(selectedCategoryIdState);

  return (
    <>
      <Tabs
        scrollable
        defaultActiveKey={selectedCategory}
        className="category-tabs"
      >
        {categories.map((category) => (
          <Tabs.Tab key={category.id} label={category.name}>
            <Suspense>
              <CategoryProducts categoryId={category.id} />
            </Suspense>
          </Tabs.Tab>
        ))}
      </Tabs>
    </>
  );
};

const CategoryProducts: FC<{ categoryId: string }> = ({ categoryId }) => {
  const productsByCategory = useRecoilValue(
    productsByCategoryState(categoryId),
  );

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

  const gotoSearch = () => {
    navigate("/search");
  };

  return (
    <button
      onClick={gotoSearch}
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
      <Header title="Danh mục" />
      <CategoryPicker />
      <SearchButton />
    </Page>
  );
};

export default CategoryPage;
