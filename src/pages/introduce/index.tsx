import React from 'react';
import { Page, Header } from 'zmp-ui';
import UserInfo from './UserInfo';
import Statistics from './Statistics';
import Tools from './Tools';
import TrendingProducts from './TrendingProducts';

const IntroducePage = () => {
  return (
    <Page className="bg-gray-100 min-h-screen">
      <Header title="Giới thiệu khách hàng" backgroundColor="#064E3B" textColor="white" />
      <UserInfo />
      <Statistics />
      <Tools />
      <TrendingProducts />
    </Page>
  );
};

export default IntroducePage;
