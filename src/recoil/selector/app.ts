import { selector } from 'recoil';
import { AllAppState, allAppState, AppStateWithColor } from '../atom';

export const allAppSelector = selector<AppStateWithColor | AllAppState>({
    key: 'app/allAppSelector',
    get: ({ get }) => get(allAppState),
    set: ({ get, set }, newValue) => {
        const currentApp = [...get(allAppState)];
        const app = { ...newValue } as AppStateWithColor;
        const existApp = currentApp.find((v) => v.id === app.id);
        if (!existApp) {
            currentApp.push(app);
        } else {
            currentApp.splice(currentApp.indexOf(existApp), 1, app);
        }
        set(allAppState, currentApp);
    },
});
