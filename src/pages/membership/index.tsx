import React, { FC } from 'react';
import { Page, Header, Box, Text } from 'zmp-ui';
import MembershipLevel from './MembershipLevel';
import MemberBenefits from './MemberBenefits';
import AvailableGifts from './AvailableGifts';

const PointsPage: FC = () => {
  return (
    <Page className="bg-gray-50 pb-16">
      <Header
        title="Hội viên thân thiết"
        className="bg-[#0a5132]"
        textColor="white"
        showBackIcon={true}
      />

      <Box className="flex flex-col gap-2">
        <MembershipLevel />
        <MemberBenefits />
        <AvailableGifts />
      </Box>
    </Page>
  );
};

export default PointsPage;
