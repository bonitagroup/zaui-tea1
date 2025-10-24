import React from 'react';
import { Box, Text } from 'zmp-ui';
import handbookIcon from '../../static/page/handbook.png';
import supportIcon from '../../static/page/support.png';
import memberIcon from '../../static/page/glyph.png';
import linkIcon from '../../static/page/link.png';
import sharegiftIcon from '../../static/page/sharegift.png';
import historyIcon from '../../static/page/history.png';

const Tools = () => {
  const tools = [
    { label: 'Cẩm nang', icon: handbookIcon },
    { label: 'Hỗ trợ', icon: supportIcon },
    { label: 'Thành viên', icon: memberIcon },
    { label: 'Đường dẫn của bạn', icon: linkIcon },
    { label: 'Chia sẻ quà tặng', icon: sharegiftIcon },
    { label: 'Lịch sử điểm thưởng', icon: historyIcon },
  ];

  return (
    <Box className="bg-white p-3 mt-3 mx-2 border border-y border-zinc-300 rounded-none">
      <Text className="text-zinc-800 font-semibold mb-1">Công cụ</Text>
      <Text size="xxxSmall" className="text-gray-500 mb-4">
        Chúng tôi sẽ luôn đồng hành và hỗ trợ bạn
      </Text>

      <Box className="grid grid-cols-4 gap-y-2.5 gap-4 text-center">
        {tools.map((tool, idx) => (
          <Box key={idx} className="flex flex-col items-center gap-1.5">
            <div className="w-10 h-10 rounded-md bg-green-50 flex items-center justify-center">
              <img src={tool.icon} alt={tool.label} className="w-14 h-12 text-[#0a5132]" />
            </div>
            <Text size="xxxSmall" className="font-medium">
              {tool.label}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Tools;
