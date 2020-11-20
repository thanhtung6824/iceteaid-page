import React, { useMemo, useContext, createContext, useState, useEffect, useCallback } from 'react';
import { getMetaData } from '../services';
import { createPersistedState } from './useLocalStorage';

type ProvideAuth = {
    isAuthenticated: boolean;
    getUser: () => Promise<any>;
    logOut: () => void;
};

const authContext = createContext<ProvideAuth>({
    isAuthenticated: false,
    getUser: () => Promise.resolve(),
    logOut: () => {
        console.log('logout');
    },
});

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export const ProvideAuth = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const { isAuthenticated, getUser, logOut } = useProvideAuth();
    const memoAuth = useMemo(() => {
        return { isAuthenticated, getUser, logOut };
    }, [isAuthenticated, getUser, logOut]);
    return <authContext.Provider value={memoAuth}>{children}</authContext.Provider>;
};

ProvideAuth.whyDidYouRender = true;
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = (): ProvideAuth => {
    return useContext(authContext);
};

const useTokenState = createPersistedState('token');

function useProvideAuth(): ProvideAuth {
    const [token, setToken] = useTokenState({
        token: '',
        expires: new Date(),
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const now = Date.now();
        if (token) {
            if (isAuthenticated && now <= new Date(token.expires).getTime()) {
                return;
            }
            return setIsAuthenticated(now <= new Date(token.expires).getTime());
        }
        return setIsAuthenticated(false);
    }, [token.token]);

    const getUser = useCallback(async () => {
        return getMetaData();
    }, []);

    const logOut = useCallback(() => {
        setToken({ token: '', expires: new Date() });
        document.body.className = document.body.className.replace('dark-mode', '');
    }, []);

    return { isAuthenticated, getUser, logOut };
}
