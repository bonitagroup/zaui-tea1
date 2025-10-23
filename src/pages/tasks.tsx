import React, { FC } from 'react';
import { Page, Header, Box, Text } from 'zmp-ui';
import zaloIcon from '../static/page/zaloIcon.png';
import groupIcon from '../static/page/glyph.png';
import truckIcon from '../static/page/truck-mission.png';
import profile1 from '../static/page/profile1.png';
import levelup from '../static/page/levelup.png';

const TaskItem = ({ icon, title, bonus, status, limit }: any) => (
  <Box className="bg-white rounded-2xl p-2 py-3 shadow-md border border-gray flex items-center justify-between">
    <Box className="flex items-center gap-2.5">
      <img src={icon} className="w-10 h-10 object-contain" />
      <Box>
        <Text size="xxxSmall" className="font-bold leading-5">
          {title}
        </Text>
        <Text size="xxxSmall" className=" font-medium mt-1.5 text-[#0e7a37]">
          {bonus}
        </Text>
      </Box>
    </Box>

    <Box className="text-left pl-[16px]">
      <Box
        className={`w-[68px] h-8 rounded-lg text-white text-[12px] text-center pt-[8px] font-semibold shadow
        ${status === 'done' ? 'bg-gray shadow-gray-200' : 'bg-[#0a5132] shadow-green-200'}`}
      >
        {status === 'done' ? 'Đã hoàn tất' : 'Thực hiện'}
      </Box>
      <Text className="w-[75px] text-gray-500 text-[10.5px] mt-1.5">{limit}</Text>
    </Box>
  </Box>
);

const TasksPage: FC = () => {
  return (
    <Page className="bg-red-900 pb-24">
      <Header title="Danh sách nhiệm vụ" backgroundColor="#0a5132" textColor="white" />

      <Box className="text-center py-4 text-white">
        <Text className="font-semibold text-lg">Hoàn thành nhiệm vụ</Text>
        <Text size="small" className="opacity-90">
          Nhận thêm lượt quay
        </Text>
      </Box>

      <Box className="bg-gray-100 rounded-t-3xl p-1.5 -mt-2">
        <Box className="bg-white rounded-3xl p-2 space-y-3">
          <TaskItem
            icon={zaloIcon}
            title="Quan tâm Zalo OA - Trà Dược Việt Nam"
            bonus="+2 lượt chơi"
            status="active"
            limit="1 lần/tài khoản"
          />
          <TaskItem
            icon={groupIcon}
            title="Tham gia chương trình TRÀ TAM - MỜI BẠN UỐNG TRÀ"
            bonus="+1 lượt chơi"
            status="active"
            limit="1 lần/tài khoản"
          />
          <TaskItem
            icon={truckIcon}
            title="Mua & hoàn thành 01 đơn hàng bất kỳ"
            bonus="+5 lượt chơi"
            status="active"
            limit="Không giới hạn"
          />
          <TaskItem
            icon={groupIcon}
            title="Đánh giá chất lượng sản phẩm & dịch vụ sau mua hàng"
            bonus="+1 lượt chơi"
            status="active"
            limit="Không giới hạn"
          />
          <TaskItem
            icon={profile1}
            title="Cập nhật thông tin của bạn"
            bonus="+1 lượt chơi"
            status="active"
            limit="1 lần/tài khoản"
          />
          <TaskItem
            icon={levelup}
            title="Nâng hạng 01 hạng thành viên thành công"
            bonus="+5 lượt chơi"
            status="active"
            limit="Không giới hạn"
          />
          <TaskItem
            icon={groupIcon}
            title="Mời thành công 01 bạn bè zalo đăng kí thành viên"
            bonus="+2 lượt chơi"
            status="active"
            limit="Không giới hạn"
          />
        </Box>
      </Box>
    </Page>
  );
};

export default TasksPage;
