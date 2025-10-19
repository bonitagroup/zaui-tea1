import React, { useEffect, useState } from 'react';
import { Box, Icon } from 'zmp-ui';
import { useNavigate } from 'react-router-dom';
import { getUserInfo } from 'zmp-sdk/apis';
import { UtilitiesButton } from '../../types/utilities';

export const Utilities: React.FC = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<{ avatar?: string }>({});

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { userInfo } = await getUserInfo({
          autoRequestPermission: true,
          avatarType: 'normal',
        });
        setUserInfo({ avatar: userInfo.avatar });
      } catch (error) {
        console.error('Không thể lấy thông tin người dùng:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const buttons: UtilitiesButton[] = [
    { label: 'Nhiệm Vụ Của Tôi', icon: 'zi-note', side: 'right', path: '/tasks' },
    {
      label: 'Giới Thiệu Khách Hàng',
      icon: 'zi-add-member-solid',
      side: 'left',
      path: '/referral',
    },
    { label: 'Chơi Game Nhận Quà', icon: 'zi-favorite-list', side: 'right', path: '/game' },
    { label: 'Tích điểm', icon: 'zi-star', side: 'left', path: '/points' },
  ];

  return (
    <Box className="w-full px-2 mt-4 pb-4">
      <Box className="bg-[#055140] rounded-2xl p-3 shadow space-y-3">
        <Box className="bg-[#055140] rounded-xl text-white p-2.5">
          <div className="grid grid-cols-2 items-center justify-between mb-1 ">
            <div className="flex items-center gap-2">
              {userInfo.avatar ? (
                <img
                  src={userInfo.avatar}
                  alt="avatar"
                  className="w-8 h-8 rounded-full border border-white"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center text-white">
                  ?
                </div>
              )}
              <p className="text-xs">
                Xin chào,{' '}
                <span className="font-semibold text-yellow-300">
                  {' '}
                  <br />
                  Quý khách hàng
                </span>
              </p>
            </div>
            <p className="text-xs text-end">
              Điểm thưởng: <span className="font-semibold">0</span>
              <br />
              <span className="text-right text-yellow-300 text-sm">Chưa là hội viên</span>
            </p>
          </div>

          <div className="h-[1px] bg-white mt-2" />
        </Box>

        <Box className="grid grid-cols-2 gap-3">
          {buttons.map((btn, i) => (
            <button
              key={i}
              onClick={() => navigate(btn.path)}
              className="bg-white rounded-xl p-1.5 flex items-center justify-center gap-6 shadow text-[#055140] font-semibold text-sm hover:scale-105 transition-transform"
              style={{ minHeight: 62 }}
            >
              {btn.side === 'left' && (
                <Icon icon={btn.icon as any} style={{ fontSize: '32px', color: '#0a5132' }} />
              )}
              <span>{btn.label}</span>
              {btn.side === 'right' && (
                <Icon icon={btn.icon as any} style={{ fontSize: '32px', color: '#0a5132' }} />
              )}
            </button>
          ))}
        </Box>
      </Box>
    </Box>
  );
};
