import { atom } from 'recoil';

export const globalLoadingState = atom({
    key: 'loading/global',
    default: false,
});
