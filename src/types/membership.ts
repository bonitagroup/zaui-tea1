export type MembershipLevel = {
  id: string;
  name: string;
  icon: string;
  target: string;
  minSpend: number;
  active?: boolean;
  points: {
    rate: number;
    description: string;
  };
  benefits: {
    title: string;
    description: string;
  }[];
  gift?: {
    name: string;
    image: string;
    description: string;
  };
};

export type CurrentMembership = {
  level: string;
  points: number;
  nextLevel: string;
  pointsNeeded: number;
  progress: number;
};

export type MembershipGift = {
  id: string;
  name: string;
  description: string;
  expiry: string;
  type: 'voucher' | 'game' | 'reward';
  status: 'active' | 'used' | 'expired';
  value?: number;
  usageCount?: number;
};
