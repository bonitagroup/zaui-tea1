import React, { FC } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { Box } from 'zmp-ui';
import { Navigation } from './navigation';
import HomePage from '../pages/index';
import CategoryPage from '../pages/category';
import CartPage from '../pages/cart';
import NotificationPage from '../pages/endow';
import ProfilePage from '../pages/profile';
import SearchPage from '../pages/search';
import CheckoutResultPage from '../pages/result';
import ProductDetailPage from '../pages/product-detail';
import PointsPage from '../pages/points';
import TasksPage from '../pages/tasks';
import ReferralPage from '../pages/introduce/index';
import GamePage from '../pages/game';
import AddressPage from '../pages/cart/address';
import AddressesPage from '../pages/cart/addresses';
import OrdersPage from '../pages/orders/orders';
import { getSystemInfo } from 'zmp-sdk';
import { ScrollRestoration } from './scroll-restoration';
import { useHandlePayment } from '../hooks';

if (import.meta.env.DEV) {
  document.body.style.setProperty('--zaui-safe-area-inset-top', '24px');
} else if (getSystemInfo().platform === 'android') {
  const statusBarHeight = window.ZaloJavaScriptInterface?.getStatusBarHeight() ?? 0;
  const androidSafeTop = Math.round(statusBarHeight / window.devicePixelRatio);
  document.body.style.setProperty('--zaui-safe-area-inset-top', `${androidSafeTop}px`);
}

export const Layout: FC = () => {
  useHandlePayment();
  const location = useLocation();
  const hideNavigation =
    /^\/product(\/|$)/.test(location.pathname) || /^\/category(\/|$)/.test(location.pathname);

  return (
    <Box flex flexDirection="column" className="h-screen">
      <ScrollRestoration />
      <Box className="flex-1 flex flex-col overflow-hidden">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/search" element={<SearchPage />}></Route>
          <Route path="/points" element={<PointsPage />}></Route>
          <Route path="/tasks" element={<TasksPage />}></Route>
          <Route path="/referral" element={<ReferralPage />}></Route>
          <Route path="/game" element={<GamePage />}></Route>
          <Route path="/cart/address" element={<AddressPage />}></Route>
          <Route path="/cart/addresses" element={<AddressesPage />}></Route>
          <Route path="/category" element={<CategoryPage />}></Route>
          <Route path="/notification" element={<NotificationPage />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
          <Route path="/orders" element={<OrdersPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>
          <Route path="/result" element={<CheckoutResultPage />}></Route>
          <Route path="/product/:id" element={<ProductDetailPage />}></Route>
        </Routes>
      </Box>
      {!hideNavigation && <Navigation />}
    </Box>
  );
};
