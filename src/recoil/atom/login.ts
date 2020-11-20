import { atom } from 'recoil';

export const loginState = atom({
    key: 'login/email',
    default: '',
});
