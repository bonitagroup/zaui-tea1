import React from "react";
import { useRecoilValue } from "recoil";
import { endowListState } from "../../state";
import { Box, Text } from "zmp-ui";

const GiftIcon: React.FC = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="8" width="18" height="13" rx="2" stroke="#F9B61C" strokeWidth="2" />
        <path d="M3 12h18" stroke="#F9B61C" strokeWidth="2" />
        <path d="M12 8V21" stroke="#F9B61C" strokeWidth="2" />
        <circle cx="8.5" cy="5.5" r="2.5" stroke="#F9B61C" strokeWidth="2" />
        <circle cx="15.5" cy="5.5" r="2.5" stroke="#F9B61C" strokeWidth="2" />
    </svg>
);

const ChevronRightIcon: React.FC = () => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className="ml-2"
    >
        <path
            d="M9 6l6 6-6 6"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export const Endow: React.FC = () => {
    const endows = useRecoilValue(endowListState);

    if (endows.length === 0) return null;

    return (
        <Box className="w-full px-1 mt-2.5">
            <Box className="bg-[#B02020] rounded-full flex items-center p-2.5 mb-2">
                <Box className="pl-6">
                    <GiftIcon />
                </Box>
                <Box className="flex-1 ml-7 ">
                    <Text className="text-white font-semibold text-sm">
                        Bạn đang có {endows.length} ưu đãi
                    </Text>
                    <Text className="text-white text-xs block">
                        Mua hàng để tận hưởng ưu đãi ngay bạn nhé!
                    </Text>
                </Box>
                <ChevronRightIcon />
            </Box>
        </Box>
    );
};

export default Endow;
