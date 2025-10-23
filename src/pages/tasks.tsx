import React, { FC } from 'react';
import { Page, Header, Box, Text } from 'zmp-ui';

const TaskItem = ({ icon, title, bonus, status, limit }: any) => (
  <Box className="bg-white rounded-2xl p-4 shadow-sm border border-gray-200 flex items-start justify-between">
    <Box className="flex items-start gap-3">
      <img src={icon} className="w-10 h-10 object-contain" />
      <Box>
        <Text className="font-semibold text-sm leading-snug">{title}</Text>
        <Text size="xSmall" className="text-green-600 font-medium mt-1">
          {bonus}
        </Text>
      </Box>
    </Box>

    <Box className="text-right">
      <Box
        className={`w-16 h-8 rounded-full text-white text-xs font-semibold shadow
        ${status === 'done' ? 'bg-gray-400 shadow-gray-200' : 'bg-green-700 shadow-green-200'}`}
      >
        {status === 'done' ? 'Đã hoàn tất' : 'Thực hiện'}
      </Box>
      <Text size="xSmall" className="text-gray-500 mt-1">
        {limit}
      </Text>
    </Box>
  </Box>
);

const TasksPage: FC = () => {
  return (
    <Page className="bg-red-800 pb-14">
      <Header title="Danh sách nhiệm vụ" />

      <Box className="text-center py-6 text-white">
        <Text className="font-semibold text-lg">Hoàn thành nhiệm vụ</Text>
        <Text size="small" className="opacity-90">
          Nhận thêm lượt quay
        </Text>
      </Box>

      <Box className="bg-gray-100 rounded-t-3xl p-4 -mt-2">
        <Box className="bg-white rounded-3xl p-4 space-y-3">
          <TaskItem
            icon="/icons/zalo.png"
            title="Quan tâm Zalo OA của Trà Dược Việt Nam"
            bonus="+2 lượt chơi"
            status="done"
            limit="1 lần/tài khoản"
          />
          <TaskItem
            icon="/icons/group.png"
            title="Tìm hiểu và tham gia chương trình cộng tác bán hàng"
            bonus="+1 lượt chơi"
            status="done"
            limit="1 lần/tài khoản"
          />
          <TaskItem
            icon="/icons/truck.png"
            title="Mua - Hoàn thành 1 đơn hàng bất kỳ"
            bonus="+5 lượt chơi"
            status="active"
            limit="Không giới hạn"
          />
          <TaskItem
            icon="/icons/star.png"
            title="Đánh giá đơn hàng sau khi mua hàng"
            bonus="+1 lượt chơi"
            status="active"
            limit="Không giới hạn"
          />
          <TaskItem
            icon="/icons/user.png"
            title="Cập nhật thông tin tài khoản"
            bonus="+1 lượt chơi"
            status="active"
            limit="1 lần/tài khoản"
          />
          <TaskItem
            icon="/icons/levelup.png"
            title="Nâng hạng thành viên Mini App thành công"
            bonus="+5 lượt chơi"
            status="active"
            limit="Không giới hạn"
          />
        </Box>
      </Box>
    </Page>
  );
};

export default TasksPage;
