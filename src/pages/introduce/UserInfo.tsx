import React from 'react';
import { Box, Text } from 'zmp-ui';
import { useRecoilValueLoadable } from 'recoil';
import { userState } from '../../state/state';
import { UserInfo as UserInfoType } from '../../types/user';

const UserInfo = () => {
  const userInfoLoadable = useRecoilValueLoadable(userState);
  const defaultUser: UserInfoType = {
    id: '',
    idByOA: '',
    name: 'Quý khách hàng',
    avatar: '',
    followedOA: false,
    isSensitive: false,
  };

  const userInfo = userInfoLoadable.state === 'hasValue' ? userInfoLoadable.contents : defaultUser;

  return (
    <Box className="bg-white flex items-center gap-4 p-4">
      <div className="relative w-14 h-14">
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
      <Box>
        <Text className="font-semibold text-base">{userInfo.name}</Text>
        <Text className="text-red-500 text-sm mt-1">Hoa hồng cho mỗi đơn hàng là 10%</Text>
      </Box>
    </Box>
  );
};

export default UserInfo;
