import React, { FC } from 'react';
import { Page, Header, Box, Text, Button } from 'zmp-ui';

const ReferralPage: FC = () => {
  const inviteCode = 'ZAUICOFFEE';

  return (
    <Page>
      <Header title="Giới thiệu khách hàng" />
      <Box className="p-4 space-y-4">
        <Box className="bg-white rounded-xl p-4 shadow-sm text-center">
          <Text className="text-sm">Mời bạn bè, nhận ưu đãi</Text>
          <Text className="font-bold text-xl mt-2">{inviteCode}</Text>
        </Box>

        <Button fullWidth type="highlight">
          Chia sẻ mã mời
        </Button>

        <Box className="bg-white rounded-xl p-3 shadow-sm">
          <Text size="xSmall" className="text-gray">
            Khi bạn bè đăng ký và đặt hàng, bạn sẽ nhận thưởng theo chương trình.
          </Text>
        </Box>
      </Box>
    </Page>
  );
};

export default ReferralPage;
