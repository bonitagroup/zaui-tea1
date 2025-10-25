import React, { useState } from 'react';
import { Box, Text, Icon } from 'zmp-ui';
import rankBronze from '../../static/iconsvg/rankbrone.png';
import rankSilver from '../../static/iconsvg/ranksilver.png';
import rankGold from '../../static/iconsvg/rankgold.png';
import rankPlatinum from '../../static/iconsvg/rankplatium.png';
import rankDiamond from '../../static/iconsvg/rankdaimond.png';

type Reward = { bullets: string[]; image?: string };
type Props = {
  initialLevel?: string;
  rewards?: Record<string, Reward>;
  onChange?: (levelId: string) => void;
};

const LEVELS = [
  { id: 'dong', icon: rankBronze, title: 'Thành Viên', sub: '(Hội viên)' },
  { id: 'bac', icon: rankSilver, title: 'Hạng Bạc', sub: '(10 triệu)' },
  { id: 'vang', icon: rankGold, title: 'Hạng Vàng', sub: '(50 triệu)' },
  { id: 'bach-kim', icon: rankPlatinum, title: 'Bạch Kim', sub: '(100 triệu)' },
  { id: 'kim-cuong', icon: rankDiamond, title: 'Kim Cương', sub: '(200 triệu)' },
];

const DEFAULT_REWARDS: Record<string, Reward> = {
  dong: {
    bullets: [
      'Nhận 2% tích lũy điểm thưởng trên giá trị đơn hàng.',
      'Voucher giảm giá trị giá 20.000 đồng',
    ],
    image: undefined,
  },
  bac: {
    bullets: ['Nhận 5% tích lũy điểm thưởng trên giá trị đơn hàng.', 'Quà tặng: Cốc giữ nhiệt'],
    image: undefined,
  },
  vang: {
    bullets: [
      'Nhận 5% tích lũy điểm thưởng trên giá trị đơn hàng.',
      'Quà tặng: Bộ ấm chén bát tràng cao cấp',
    ],
    image: undefined,
  },
  'bach-kim': {
    bullets: [
      'Nhận 5% tích lũy điểm thưởng trên giá trị đơn hàng.',
      'Quà tặng: Bàn trà điện thông minh',
    ],
    image: undefined,
  },
  'kim-cuong': {
    bullets: ['Nhận 5% tích lũy điểm thưởng trên giá trị đơn hàng.', 'Quà tặng: Xe đạp thể thao'],
    image: undefined,
  },
};

const MemberBenefits: React.FC<Props> = ({ initialLevel = 'dong', rewards = {}, onChange }) => {
  const [active, setActive] = useState<string>(initialLevel);

  const rewardMap = { ...DEFAULT_REWARDS, ...rewards };

  const handleSelect = (id: string) => {
    setActive(id);
    onChange?.(id);
  };

  const activeReward = rewardMap[active] || { bullets: [], image: undefined };

  return (
    <Box className="px-2 pt-5">
      <Box className="bg-white border shadow-sm overflow-hidden">
        <Box className="flex items-stretch">
          {LEVELS.map((lv) => {
            const isActive = lv.id === active;
            return (
              <button
                key={lv.id}
                onClick={() => handleSelect(lv.id)}
                className={`flex-1 flex flex-col items-center gap-1 py-2 px-1 text-center transition-all duration-150
                  ${isActive ? 'bg-[#064E3B] text-white' : 'bg-white text-gray-700'}
                  ${isActive ? 'shadow-inner' : ''}`}
                aria-pressed={isActive}
              >
                <div className="relative">
                  <img
                    src={lv.icon}
                    alt={lv.title}
                    className={`w-10 h-10 mx-auto ${isActive ? '' : 'opacity-80'}`}
                  />
                </div>

                <Text
                  className={`text-sm font-medium leading-tight ${
                    isActive ? 'text-white' : 'text-gray-800'
                  }`}
                >
                  {lv.title}
                </Text>
                <Text size="xxxSmall" className={`${isActive ? 'text-white/90' : 'text-gray-400'}`}>
                  {lv.sub}
                </Text>
              </button>
            );
          })}
        </Box>
      </Box>

      <Box className="bg-white border shadow-md p-4">
        <Text className="text-lg font-semibold mb-3">
          Ưu đãi hạng {LEVELS.find((l) => l.id === active)?.title}
        </Text>

        <Box className="mb-3">
          {activeReward.bullets.map((b, idx) => (
            <Text key={idx} className="text-sm text-gray-700 mb-1">
              - {b}
            </Text>
          ))}
        </Box>

        {activeReward.image ? (
          <Box className="flex justify-center mt-2">
            <img
              src={activeReward.image}
              alt="Quà tặng"
              className="max-w-full h-auto rounded-md shadow-sm"
            />
          </Box>
        ) : null}
      </Box>
    </Box>
  );
};

export default MemberBenefits;
