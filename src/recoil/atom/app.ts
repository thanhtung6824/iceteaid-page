import { atom } from 'recoil';

export type AppState = {
    id: string;
    appName: string;
    secretKey: string;
    userId: string;
};

export type AppStateWithColor = AppState & {
    color: string;
};
export type AllAppState = AppStateWithColor[];

export const selectedAppState = atom<AppState>({
    key: 'app/selected',
    default: {} as AppState,
});

export const allAppState = atom<AllAppState>({
    key: 'app/allApp',
    default: [] as AllAppState,
});
