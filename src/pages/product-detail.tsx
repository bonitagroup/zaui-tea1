import React, { useState } from "react";
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";
import { productsState } from "../state";
import { Box, Page, Header, Text, Button, Icon } from "zmp-ui";
import { ProductPicker } from "../components/product/picker";
import { FinalPrice } from "../components/display/final-price";
import { ProductItem } from "../components/product/item";

const images = import.meta.glob(
    "../static/page/product-list/*.{png,jpg,jpeg,svg,webp}",
    { eager: true }
) as Record<string, { default: string }>;

const getImage = (filename: string): string => {
    if (!filename) return "/fallback.svg";
    const key = Object.keys(images).find((k) => k.includes(filename));
    return key ? images[key].default : "/fallback.svg";
};

const ProductDetailPage: React.FC = () => {
    const { id } = useParams();
    const products = useRecoilValue(productsState);
    const product = products.find((p) => String(p.id) === String(id));
    const [pickerOpen, setPickerOpen] = useState(false);

    if (!product) {
        return (
            <Page>
                <Header title="Chi tiết sản phẩm" showBackIcon />
                <Box className="p-8 text-center text-gray">
                    Không tìm thấy sản phẩm
                </Box>
            </Page>
        );
    }

    const imageSrc = getImage(product.image);
    const reviews: any[] = [];

    return (
        <Page className="bg-gray-50">
            <Header title="Chi tiết sản phẩm" className="bg-[#055140] text-white" showBackIcon />

            <Box className="relative w-full aspect-[4/5] bg-white overflow-hidden">
                <img
                    src={imageSrc}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-contain bg-white"
                />
                {true && (
                    <div className="absolute top-4 left-2/3 flex items-center bg-[#055140] text-white text-[11px] font-semibold pl-4 pr-3 py-1 rounded-r-md shadow-md z-10 before:content-[''] before:absolute before:left-0 before:top-0 before:w-0 before:h-0 before:border-t-[12px] before:border-b-[12px] before:border-l-[10px] before:border-t-transparent before:border-b-transparent before:border-l-transparent before:border-r-[#055140] before:-translate-x-full">
                        Sản phẩm yêu thích
                    </div>
                )}


            </Box>

            <Box className="bg-white p-4 rounded-t-xl -mt-4 shadow-lg">
                <Text.Title size="large" className="font-bold mb-1">
                    {product.name}
                </Text.Title>
                <Text className="text-red-600 font-bold text-2xl mb-2">
                    <FinalPrice>{product}</FinalPrice>
                </Text>
            </Box>

            <Box className="bg-white p-4 mt-3 rounded-xl shadow-sm">
                <Text.Title size="small" className="font-semibold mb-2">
                    Mô tả sản phẩm
                </Text.Title>
                <Text className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {product.description || "Chưa có mô tả cho sản phẩm này."}
                </Text>
            </Box>

            <Box className="bg-white p-4 mt-3 rounded-xl shadow-sm pb-20">
                <Text.Title size="small" className="font-semibold mb-3">
                    Đánh giá sản phẩm
                </Text.Title>

                {reviews.length === 0 ? (
                    <Box className="text-gray-500 text-center py-3">
                        Chưa có đánh giá hay bình luận nào.
                    </Box>
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
                                        className={`text-sm ${i < r.rating ? "text-yellow-400" : "text-gray-300"}`}
                                    />
                                ))}
                            </Box>
                            <Text className="text-gray-700 text-sm">{r.comment}</Text>
                        </Box>
                    ))
                )}
            </Box>

            <Box className="bg-white p-1 mt-3 rounded-xl shadow-sm">
                <Box className="flex items-center">
                    <Box className="pl-px">
                        <Icon
                            icon="zi-more-diamond-solid"
                            className="text-[#0a5132] text-4xl"
                        />
                    </Box>
                    <Box className="flex-1 ml-2">
                        <Text className="text-[#0a5132] font-semibold text-lg">
                            Sản phẩm nổi bật
                        </Text>
                        <Text size="xxxSmall" className="text-[#0a5132] block">
                            Danh sách sản phẩm bán chạy nhất
                        </Text>
                    </Box>
                </Box>
                <Box className="grid grid-cols-2 gap-3.5 px-1">
                    {products.slice(0, 12).map((product) => (
                        <ProductItem key={product.id} product={product} />
                    ))}
                </Box>
            </Box>

            <Box className="fixed bottom-0 left-0 right-0 h-14 bg-white shadow-lg flex justify-end px-4 py-2 z-50">
                <ProductPicker product={product}>
                    {({ open }) => (
                        <Button
                            type="highlight"
                            style={{ minWidth: 160, borderRadius: 8 }}
                            className="bg-gradient-to-r from-[#055140] to-[#0a7a5b] text-white font-semibold hover:from-[#0a7a5b] hover:to-[#055140] transition-all duration-300 shadow-md"
                            onClick={open}
                        >
                            Thêm vào giỏ hàng
                        </Button>
                    )}
                </ProductPicker>
            </Box>
        </Page>
    );
};

export default ProductDetailPage;
