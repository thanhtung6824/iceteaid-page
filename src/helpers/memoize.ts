import { RecoilState } from 'recoil';

export const memoize = <T>(fn: (n: string) => RecoilState<T>) => {
    const cache: Record<string, RecoilState<T>> = {};
    return (...args: string[]): RecoilState<T> => {
        const n = args[0];
        if (n in cache) {
            return cache[n];
        } else {
            const result = fn(n);
            cache[n] = result;
            return result;
        }
    };
};
