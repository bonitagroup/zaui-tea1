import React, { FC } from "react";
import { Page, Header, Box, Text, Button } from "zmp-ui";

const PointsPage: FC = () => {
    return (
        <Page>
            <Header title="Tích điểm" />
            <Box className="p-4">
                <Box className="bg-green text-white rounded-xl p-4 mb-4">
                    <Text className="text-sm">Tổng điểm</Text>
                    <Text className="font-bold text-2xl mt-1">0</Text>
                </Box>

                <Box className="bg-white rounded-xl p-4 shadow-sm">
                    <Text className="font-semibold mb-2">Lịch sử tích điểm</Text>
                    <Text size="xSmall" className="text-gray">
                        Bạn chưa có giao dịch tích điểm nào.
                    </Text>
                </Box>

                <Box className="mt-4">
                    <Button fullWidth type="highlight">
                        Xem chi tiết chương trình
                    </Button>
                </Box>
            </Box>
        </Page>
    );
};

export default PointsPage;