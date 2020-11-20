import { atom } from 'recoil';
import { memoize } from '../../helpers';

export const dialogAtom = memoize((id) =>
    atom({
        key: id,
        default: false,
    }),
);
