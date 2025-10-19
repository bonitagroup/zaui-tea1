import React, { FC } from "react";
import { Page, Header, Box, Text, Button } from "zmp-ui";

const TasksPage: FC = () => {
    return (
        <Page>
            <Header title="Nhiệm vụ của tôi" />
            <Box className="p-4 space-y-3">
                <Box className="bg-white rounded-xl p-3 shadow-sm">
                    <Text className="font-semibold">Hoàn thành đơn hàng đầu tiên</Text>
                    <Text size="xSmall" className="text-gray mb-2">Hoàn thành 1 đơn hàng để nhận 100 điểm.</Text>
                    <Button type="highlight" fullWidth>Thực hiện ngay</Button>
                </Box>

                <Box className="bg-white rounded-xl p-3 shadow-sm">
                    <Text className="font-semibold">Đăng ký thành viên</Text>
                    <Text size="xSmall" className="text-gray mb-2">Đăng ký để nhận ưu đãi thành viên.</Text>
                    <Button fullWidth>Đăng ký</Button>
                </Box>
            </Box>
        </Page>
    );
};

export default TasksPage;
