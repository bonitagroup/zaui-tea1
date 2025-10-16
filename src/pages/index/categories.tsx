import React, { FC } from "react";
import { Box, Icon, Text } from "zmp-ui";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoriesState, selectedCategoryIdState } from "../../state";
import { useNavigate } from "react-router";

const images = import.meta.glob("../../static/page/*.svg", { eager: true }) as Record<
  string,
  { default: string }
>;

export const Categories: FC = () => {
  const categories = useRecoilValue(categoriesState);
  const navigate = useNavigate();
  const setSelectedCategoryId = useSetRecoilState(selectedCategoryIdState);

  const gotoCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    navigate("/category");
  };

  const getImage = (filename: string): string => {
    const key = `../../static/page/${filename}`;
    return images[key]?.default ?? "/fallback.svg";
  };

  return (
    <>
      <Box className="flex items-start p-2.5 mb-1.5">
        <Box className="pl-px">
          <Icon icon="zi-more-diamond-solid" className="text-[#0a5132] text-5xl" />
        </Box>
        <Box className="flex-1 ml-2.5">
          <Text className="text-[#0a5132] font-semibold text-xl">
            Danh mục sản phẩm
          </Text>
          <Text className="text-[#0a5132] text-xs block">
            Tổng hợp các loại trà chất lượng, đa dạng hóa lựa chọn
          </Text>
        </Box>
      </Box>

      <Box className="bg-white grid grid-cols-4 gap-4 p-4">
        {categories.map((category, i) => (
          <div
            key={i}
            onClick={() => gotoCategory(category.id)}
            className="flex flex-col space-y-2 items-center cursor-pointer"
          >
            <img
              className="w-12 h-12 object-contain"
              src={getImage(category.icon)}
              alt={category.name}
            />
            <Text size="xxSmall" className="text-gray">
              {category.name}
            </Text>
          </div>
        ))}
      </Box>
    </>
  );
};
