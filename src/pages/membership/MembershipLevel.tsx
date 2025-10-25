import React from 'react';
import { Box, Text, Button } from 'zmp-ui';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { currentMembershipState } from '../../state/membership';
import { userState } from '../../state/state';
import rankbronze from '../../static/iconsvg/rankbrone.png';
import rankSilver from '../../static/iconsvg/ranksilver.png';
import rankGold from '../../static/iconsvg/rankgold.png';
import rankPlatinum from '../../static/iconsvg/rankplatinum.png';
import rankDiamond from '../../static/iconsvg/rankdiamond.png';
import { Icon } from 'zmp-ui';

const MembershipInfo = () => {
  const currentMembership = useRecoilValue(currentMembershipState);
  const userInfoLoadable = useRecoilValueLoadable(userState);

  const defaultUser = {
    name: 'Quý khách hàng',
    avatar: '',
    id: '',
    idByOA: '',
    followedOA: false,
    isSensitive: false,
  };

  const userInfo = userInfoLoadable.state === 'hasValue' ? userInfoLoadable.contents : defaultUser;

  return (
    <Box className="bg-[#0a5132] text-white rounded-2xl p-3 mx-2 mt-3 shadow-md">
      <Box className="flex items-center mb-4">
        <div className="relative w-12 h-12">
          <div
            className="absolute inset-0 rounded-full p-0.5"
            style={{ background: 'conic-gradient(#6ed3b3, #0b6b49)' }}
          />
          <div className="absolute inset-1 rounded-full bg-white" />
          <div className="absolute inset-1.5 rounded-full bg-gray-200 flex items-center justify-center">
            {userInfo.avatar ? (
              <img
                src={userInfo.avatar}
                alt={userInfo.name}
                className="w-10 h-10 rounded-full bg-gray-100 object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-lg">
                {userInfo.name[0]?.toUpperCase() || '?'}
              </div>
            )}
          </div>
          <span className="absolute bottom-0.5 right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
        </div>
        <Box className="ml-3">
          <Text className="font-semibold text-base leading-none">{userInfo.name}</Text>
          <Text className="text-sm opacity-90">{currentMembership.points || 0} điểm thưởng</Text>
        </Box>
      </Box>

      <Box className="flex items-center justify-between mb-2">
        <img src={rankbronze} alt="Membership Badge" className="h-11 w-12" />
        <img src={rankSilver} alt="Membership Badge" className="h-11 w-12" />
      </Box>

      <Box className="bg-white/20 h-3 rounded-full overflow-hidden mb-2">
        <Box
          className="bg-yellow-400 h-3 rounded-full transition-all duration-500"
          style={{ width: `${currentMembership.progress || 1}%` }}
        ></Box>
      </Box>

      <Box className="flex justify-between items-center mb-3">
        <Text className="text-sm font-semibold text-yellow-400">
          Hạng hiện tại: <span className="font-semibold">Đồng</span>
        </Text>
        <Text className="text-sm font-semibold text-yellow-400">0 / 10.000.000</Text>
      </Box>

      <Box className="flex justify-between items-center mb-3">
        <Text className="text-sm font-semibold">Cần thêm 10.000.000đ tích lũy để lên hạng</Text>
        <button className="bg-yellow-600 w-28 text-white text-sm font-semibold px-1 py-2 rounded-full shadow hover:brightness-110">
          Mua ngay
        </button>
      </Box>

      <Box className="flex flex-col justify-between items-start text-yellow-400">
        <Text className="flex items-center gap-2 mb-3 text-base font-medium">
          Lịch sử điểm thưởng{' '}
          <span>
            {' '}
            <Icon icon="zi-share" className="text-3xl" />
          </span>
        </Text>
        <Text className="flex items-center gap-2 text-base font-medium">
          Hướng dẫn tích điểm{' '}
          <span>
            {' '}
            <Icon icon="zi-share" className="text-3xl" />
          </span>
        </Text>
      </Box>
    </Box>
  );
};

export default MembershipInfo;
