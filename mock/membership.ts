import { MembershipLevel, MembershipGift } from '../src/types/membership';

export const membershipLevels: MembershipLevel[] = [
  {
    id: 'member',
    name: 'Thành Viên',
    target: 'Hội viên',
    minSpend: 0,
    icon: '/static/membership/bronze.svg',
    points: {
      rate: 2,
      description: 'Tích 2% điểm thưởng trên mỗi đơn hàng',
    },
    benefits: [
      {
        title: 'Ưu đãi sinh nhật',
        description: 'Tặng voucher 20.000đ vào ngày sinh nhật',
      },
      {
        title: 'Tích điểm đổi quà',
        description: 'Đổi điểm thưởng lấy voucher hoặc sản phẩm',
      },
      {
        title: 'Quà chào mừng',
        description: 'Voucher giảm giá 20.000đ cho đơn hàng đầu tiên',
      },
    ],
    gift: {
      name: 'Voucher 20.000đ',
      image: '/static/membership/bronze-gift.png',
      description: 'Áp dụng cho đơn từ 100.000đ',
    },
  },
  {
    id: 'silver',
    name: 'Hạng Bạc',
    target: '10 triệu',
    minSpend: 10000000,
    icon: '/static/membership/silver.svg',
    points: {
      rate: 5,
      description: 'Tích 5% điểm thưởng trên mỗi đơn hàng',
    },
    benefits: [
      {
        title: 'Ưu đãi sinh nhật',
        description: 'Tặng voucher 50.000đ vào ngày sinh nhật',
      },
      {
        title: 'Tích điểm đổi quà',
        description: 'Đổi điểm thưởng với ưu đãi đặc biệt',
      },
      {
        title: 'Quà tặng hạng',
        description: 'Cốc giữ nhiệt cao cấp trị giá 200.000đ',
      },
    ],
    gift: {
      name: 'Cốc giữ nhiệt',
      image: '/static/membership/silver-gift.png',
      description: 'Cốc inox 2 lớp giữ nhiệt 12h',
    },
  },
  {
    id: 'gold',
    name: 'Hạng Vàng',
    target: '50 triệu',
    minSpend: 50000000,
    icon: '/static/membership/gold.svg',
    points: {
      rate: 7,
      description: 'Tích 7% điểm thưởng trên mỗi đơn hàng',
    },
    benefits: [
      {
        title: 'Ưu đãi sinh nhật',
        description: 'Tặng voucher 100.000đ vào ngày sinh nhật',
      },
      {
        title: 'Tích điểm đặc biệt',
        description: 'Nhận thêm 20% điểm thưởng vào cuối tuần',
      },
      {
        title: 'Quà tặng hạng',
        description: 'Bộ ấm chén sứ cao cấp trị giá 500.000đ',
      },
    ],
    gift: {
      name: 'Bộ ấm chén',
      image: '/static/membership/gold-gift.png',
      description: 'Bộ ấm chén Bát Tràng cao cấp',
    },
  },
  {
    id: 'platinum',
    name: 'Bạch Kim',
    target: '100 triệu',
    minSpend: 100000000,
    icon: '/static/membership/platinum.svg',
    points: {
      rate: 10,
      description: 'Tích 10% điểm thưởng trên mỗi đơn hàng',
    },
    benefits: [
      {
        title: 'Ưu đãi sinh nhật VIP',
        description: 'Tặng voucher 200.000đ vào ngày sinh nhật',
      },
      {
        title: 'Đặc quyền platinum',
        description: 'Ưu tiên phục vụ và hỗ trợ 24/7',
      },
      {
        title: 'Quà tặng hạng',
        description: 'Bàn trà điện thông minh trị giá 1.000.000đ',
      },
    ],
    gift: {
      name: 'Bàn trà thông minh',
      image: '/static/membership/platinum-gift.png',
      description: 'Bàn trà điện đa năng cao cấp',
    },
  },
];

export const membershipGifts: MembershipGift[] = [
  {
    id: 'voucher-50k',
    name: 'Giảm 50k giá trị đơn hàng',
    description: 'Áp dụng với khách hàng hoàn thành nhiệm vụ',
    expiry: '26-10-2025',
    type: 'voucher',
    status: 'active',
    value: 50000,
  },
  {
    id: 'wheel-spin',
    name: '8 lượt quay may mắn trúng quà',
    description: 'Lượt quay nhận từ mua sản phẩm, đánh giá sản phẩm, quan tâm ZaloOA...',
    expiry: '31-12-2024',
    type: 'game',
    status: 'active',
    usageCount: 8,
  },
];
