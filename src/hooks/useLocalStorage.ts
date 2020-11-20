import { useState, Dispatch, useEffect, useRef } from 'react';
import { useEventListener } from './useEventListener';

const globalState = {} as Record<any, any>;

const createGlobalState = (key: string | number, thisCallback: any, initialValue: any) => {
    if (!globalState[key]) {
        globalState[key] = { callbacks: [], value: initialValue };
    }
    globalState[key].callbacks.push(thisCallback);
    return {
        deregister() {
            const arr = globalState[key].callbacks;
            const index = arr.indexOf(thisCallback);
            if (index > -1) {
                arr.splice(index, 1);
            }
        },
        emit(value: any) {
            if (globalState[key].value !== value) {
                globalState[key].value = value;
                globalState[key].callbacks.forEach((callback: (arg0: any) => void) => {
                    if (thisCallback !== callback) {
                        callback(value);
                    }
                });
            }
        },
    };
};
const createStorage = (provider: { getItem: (arg0: any) => any; setItem: (arg0: any, arg1: string) => void }) => ({
    get(key: any, defaultValue: () => any) {
        const json = provider.getItem(key);
        return json === null ? (typeof defaultValue === 'function' ? defaultValue() : defaultValue) : JSON.parse(json);
    },
    set(key: any, value: any) {
        provider.setItem(key, JSON.stringify(value));
    },
});

const usePersistedState = (initialState: any, key: string | number, { get, set }: any) => {
    const globalState = useRef(null);
    const [state, setState] = useState(() => get(key, initialState));

    // subscribe to `storage` change events
    useEventListener('storage', ({ key: k, newValue }) => {
        if (k === key) {
            const newState = JSON.parse(newValue);
            if (state !== newState) {
                setState(newState);
            }
        }
    });

    // only called on mount
    useEffect(() => {
        // register a listener that calls `setState` when another instance emits
        globalState.current = createGlobalState(key, setState, initialState) as any;

        return () => {
            (globalState.current as any).deregister();
        };
    }, []);

    // Only persist to storage if state changes.
    useEffect(() => {
        // persist to localStorage
        set(key, state);

        // inform all of the other instances in this tab
        (globalState.current as any).emit(state);
    }, [state]);

    return [state, setState];
};

export const createPersistedState = (key: string, provider = global.localStorage) => {
    if (provider) {
        const storage = createStorage(provider);
        return (initialState: any) => usePersistedState(initialState, key, storage);
    }
    return useState;
};
