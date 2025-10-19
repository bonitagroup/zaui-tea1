import React, { FC } from "react";
import { Page, Header, Box, Text, Button } from "zmp-ui";

const GamePage: FC = () => {
  return (
    <Page>
      <Header title="Chơi game nhận quà" />
      <Box className="p-4 space-y-4">
        <Box className="bg-white rounded-xl p-4 shadow-sm text-center">
          <Text className="font-semibold">Vòng quay may mắn</Text>
          <Text size="xSmall" className="text-gray mt-2">Chơi ngay để nhận voucher, điểm, hoặc quà tặng.</Text>
        </Box>
        <Button fullWidth type="highlight">Chơi ngay</Button>
        <Box className="bg-white rounded-xl p-3 shadow-sm">
          <Text size="xSmall" className="text-gray">Quy định: mỗi tài khoản được chơi 1 lần/ngày.</Text>
        </Box>
      </Box>
    </Page>
  );
};

export default GamePage;
