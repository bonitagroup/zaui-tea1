import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Icon } from 'zmp-ui';
import { ActionSheet } from './fullscreen-sheet';
import { useVirtualKeyboardVisible } from '../hooks';
import { CartIcon } from './cart-icon';

type Tab = {
  path?: string;
  label: string;
  icon: React.ReactNode;
  action?: () => void;
};

const TABS: Tab[] = [
  { path: '/', label: 'Trang chủ', icon: 'zi-home' },
  { path: '/points', label: 'Tích điểm', icon: 'zi-star' },
  { label: 'Thêm', icon: 'zi-plus-circle' },
  { path: '/cart', label: 'Giỏ hàng', icon: 'zi-cart' },
  { path: '/profile', label: 'Tài khoản', icon: 'zi-user' },
];

const MORE_ACTIONS = [
  { text: 'Thông báo', path: '/notification' },
  { text: 'Ưu đãi', path: '/endow' },
  { text: 'Hỗ trợ', path: '/support' },
];

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const keyboardVisible = useVirtualKeyboardVisible();
  const [showMore, setShowMore] = useState(false);
  const [voucherSheetOpen, setVoucherSheetOpen] = useState(false);

  useEffect(() => {
    const onVoucher = (e: any) => {
      const val = e?.detail ?? (e?.detail === undefined ? false : e);
      setVoucherSheetOpen(!!val);
    };
    window.addEventListener('voucher-sheet-open', onVoucher as EventListener);
    return () => window.removeEventListener('voucher-sheet-open', onVoucher as EventListener);
  }, []);

  const go = (path?: string) => {
    if (path && location.pathname !== path) navigate(path);
  };

  const safeBottom = 'env(safe-area-inset-bottom, 0px)';

  if (keyboardVisible || voucherSheetOpen) return null;

  return (
    <>
      <div
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          paddingBottom: `calc(${safeBottom})`,
          zIndex: 60,
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'auto',
        }}
        aria-hidden={false}
      >
        <div
          style={{
            width: '100%',
            maxWidth: 900,
            margin: '0 auto',
            padding: '0 0px',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: 6,
            }}
          >
            <div
              style={{
                width: 80,
                height: 6,
                background: 'rgba(255,255,255,0.12)',
                borderRadius: 9999,
                transform: 'translateY(2px)',
              }}
            />
          </div>

          <div
            style={{
              background: '#0a5132',
              borderTopLeftRadius: 48,
              borderTopRightRadius: 48,
              boxShadow: '0 -6px 20px rgba(0,0,0,0.12)',
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
              alignItems: 'center',
              height: 70,
              padding: '0 10px',
              gap: 0,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                onClick={() => go('/')}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  background: 'transparent',
                  color: location.pathname === '/' ? '#FBB801' : 'rgba(255,255,255,0.85)',
                  cursor: 'pointer',
                  padding: 6,
                  width: '100%',
                }}
              >
                <Icon icon="zi-home" />
                <div style={{ fontSize: 11, marginTop: 2 }}>Trang chủ</div>
              </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                onClick={() => go('/points')}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  background: 'transparent',
                  color: location.pathname === '/search' ? '#FBB801' : 'rgba(255,255,255,0.85)',
                  cursor: 'pointer',
                  padding: 6,
                  width: '100%',
                }}
              >
                <Icon icon="zi-star" />
                <div style={{ fontSize: 11, marginTop: 2 }}>Tích điểm</div>
              </button>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  position: 'absolute',
                  left: '50%',
                  top: '-28px',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 70,
                }}
              >
                <div
                  className="outer-circle"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background: 'conic-gradient(#05A143 0deg 180deg, #FBB801 180deg 360deg)',
                    animation: 'spin 3s linear infinite',
                  }}
                />
                <div
                  onClick={() => setShowMore(true)}
                  style={{
                    width: 39,
                    height: 39,
                    borderRadius: '50%',
                    background: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    cursor: 'pointer',
                    boxShadow: '0 6px 18px rgba(0,0,0,0.18)',
                  }}
                >
                  <Icon icon="zi-plus" style={{ fontSize: 32, color: '#055140' }} />
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                onClick={() => go('/cart')}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  background: 'transparent',
                  color: location.pathname === '/cart' ? '#FBB801' : 'rgba(255,255,255,0.85)',
                  cursor: 'pointer',
                  padding: 6,
                  width: '100%',
                }}
              >
                <CartIcon active={location.pathname === '/cart'} />
                <div style={{ fontSize: 11, marginTop: 2 }}>Giỏ hàng</div>
              </button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                onClick={() => go('/profile')}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                  background: 'transparent',
                  color: location.pathname === '/profile' ? '#FBB801' : 'rgba(255,255,255,0.85)',
                  cursor: 'pointer',
                  padding: 6,
                  width: '100%',
                }}
              >
                <Icon icon="zi-user" />
                <div style={{ fontSize: 11, marginTop: 2 }}>Tài khoản</div>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ActionSheet
        visible={showMore}
        title="Chức năng khác"
        actions={[
          ...MORE_ACTIONS.map((item) => ({
            text: item.text,
            onClick: () => {
              setShowMore(false);
              navigate(item.path);
            },
          })),
          { text: 'Đóng', close: true, danger: true },
        ]}
        onClose={() => setShowMore(false)}
      />
    </>
  );
};

export { Navigation };
export default Navigation;
