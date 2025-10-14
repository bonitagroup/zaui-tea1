import React, { useEffect, useState } from "react";
import { Box, Icon } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "zmp-sdk/apis";

export const Utilities: React.FC = () => {
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState<{ name?: string; avatar?: string }>({});

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const { userInfo } = await getUserInfo({
                    autoRequestPermission: true,
                    avatarType: "normal",
                });
                setUserInfo(userInfo);
            } catch (error) {
                console.error("Không thể lấy thông tin người dùng:", error);
            }
        };

        fetchUserInfo();
    }, []);

    const buttons = [
        { label: "Trang Chủ", icon: "zi-home", path: "/" },
        { label: "Tìm Kiếm Sản Phẩm", icon: "zi-search", path: "/search" },
        { label: "Giỏ Hàng", icon: "zi-shopping-cart", path: "/cart" },
        { label: "Hồ Sơ Của Tôi", icon: "zi-user", path: "/profile" },
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
                {/* Phần hiển thị thông tin người dùng */}
                <Box className="bg-[#055140] rounded-xl text-white mb-2 flex flex-col gap-1">
                    <div className="flex items-center gap-3 p-2">
                        {/* Avatar */}
                        {userInfo.avatar ? (
                            <img
                                src={userInfo.avatar}
                                alt="avatar"
                                className="w-12 h-12 rounded-full border-2 border-white"
                            />
                        ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-white">
                                ?
                            </div>
                        )}

                        {/* Tên và điểm */}
                        <div className="flex-1">
                            <p className="text-sm">Xin chào,</p>
                            <p className="font-semibold text-yellow-300">
                                {userInfo.name || "Quý khách hàng"}
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-between items-center px-2 text-sm">
                        <p>
                            Điểm thưởng: <span className="font-semibold">0</span>
                        </p>
                        <p className="text-yellow-300 text-sm">Chưa là hội viên</p>
                    </div>

                    <div className="h-[1.5px] w-full bg-white mt-1" />
                </Box>

                {/* Các nút tiện ích */}
                <Box className="grid grid-cols-2 gap-4">
                    {buttons.map((btn, i) => (
                        <button
                            key={i}
                            onClick={() => navigate(btn.path)}
                            className="bg-white rounded-xl p-3 flex flex-row items-center justify-between gap-2 shadow hover:scale-105 transition-transform"
                            style={{ minHeight: 60 }}
                        >
                            <span className="font-semibold text-left text-sm text-green-900 flex-1">
                                {btn.label}
                            </span>
                            {btn.icon === "zi-shopping-cart" ? (
                                <CartSvgIcon />
                            ) : (
                                <Icon
                                    icon={btn.icon as any}
                                    style={{ fontSize: "32px", color: "#0a5132" }}
                                />
                            )}
                        </button>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};
