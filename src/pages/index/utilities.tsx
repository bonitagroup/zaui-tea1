import React from "react";
import { Box, Icon } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { CartIcon } from "components/cart-icon";

export const Utilities: React.FC = () => {
    const navigate = useNavigate();

    const buttons = [
        {
            label: "Trang Chủ",
            icon: "zi-home",
            path: "/",
        },
        {
            label: "Tìm Kiếm Sản Phẩm",
            icon: "zi-search",
            path: "/search",
        },
        {
            label: "Giỏ Hàng",
            icon: "zi-shopping-cart",
            path: "/cart",
        },
        {
            label: "Hồ Sơ Của Tôi",
            icon: "zi-user",
            path: "/profile",
        },
    ];

    const CartSvgIcon = () => (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path d="M6 6h15l-2 9H7z" stroke="#0a5132" strokeWidth="1" />
            <circle cx="9" cy="20" r="1.5" stroke="#0a5132" strokeWidth="1" />
            <circle cx="17" cy="20" r="1.5" stroke="#0a5132" strokeWidth="1" />
            <path d="M6 6V4a2 2 0 0 1 2-2h2" stroke="#0a5132" strokeWidth="1" />
        </svg>
    );

    return (
        <Box className="w-full px-1.5 mt-3.5 pb-4">
            <Box className="bg-[#0a5132] rounded-2xl p-3.5 space-y-4 shadow">
                <Box className="bg-[#055140] rounded-xl text-white mb-2 flex flex-col gap-1">
                    <div className=" text-white w-full rounded-xl p-1 text-sm">
                        <div className="flex justify-between items-center">
                            <p>Xin chào,</p>
                            <p>
                                Điểm thưởng: <span className="font-semibold">0</span>
                            </p>
                        </div>

                        <div className="flex justify-between items-center mt-1">
                            <p className="font-semibold text-yellow-300">Quý khách hàng</p>
                            <p className="text-yellow-300 text-sm">Chưa là hội viên</p>
                        </div>
                    </div>
                    <div className="h-[1.5px] w-full bg-white" />
                </Box>
                <Box className="grid grid-cols-2 gap-4">
                    {buttons.map((btn, i) => (
                        <button
                            key={i}
                            onClick={() => navigate(btn.path)}
                            className="bg-white rounded-xl p-3 flex flex-row items-center justify-between gap-2 shadow hover:scale-105 transition-transform"
                            style={{ minHeight: 60 }}
                        >
                            <span className="font-semibold text-left text-sm text-green-900 flex-1">{btn.label}</span>
                            {btn.icon === "zi-shopping-cart"
                                ? <CartSvgIcon />
                                : <Icon icon={btn.icon as any} style={{ fontSize: "32px", color: "#0a5132" }} />
                            }
                        </button>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};