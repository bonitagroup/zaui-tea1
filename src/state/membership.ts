import { atom, selector } from 'recoil';
import { membershipLevels, membershipGifts } from '../../mock/membership';
import { MembershipLevel, CurrentMembership, MembershipGift } from '../types/membership';

export const membershipLevelsState = atom<MembershipLevel[]>({
  key: 'membershipLevels',
  default: membershipLevels,
});

export const currentMembershipState = atom<CurrentMembership>({
  key: 'currentMembership',
  default: {
    level: 'member',
    points: 0,
    nextLevel: 'silver',
    pointsNeeded: 10000000,
    progress: 0,
  },
});

export const membershipGiftsState = atom<MembershipGift[]>({
  key: 'membershipGifts',
  default: membershipGifts,
});

export const activeMembershipGiftsSelector = selector({
  key: 'activeMembershipGifts',
  get: ({ get }) => {
    const gifts = get(membershipGiftsState);
    return gifts.filter((gift) => gift.status === 'active');
  },
});
