import React, { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';
import { QueryClient, QueryClientProvider } from 'react-query';
import { theme } from './components/elements/Theme';
import { ProtectedRoute, PublicRoute } from './components/elements/Router';
import { GlobalLoading, FallbackLoading } from './components/elements/Loading';
import { ProvideAuth } from './hooks';

const Login = React.lazy(() => import('./components/pages/Authen'));
const Home = React.lazy(() => import('./components/pages/Home'));
const Dashboard = React.lazy(() => import('./components/pages/Dashboard'));
const Layout = React.lazy(() => import('./components/layouts/Layout'));
const Profile = React.lazy(() => import('./components/pages/Profile'));
const ListApp = React.lazy(() => import('./components/pages/ListApp'));
const Security = React.lazy(() => import('./components/pages/Security'));

const queryCache = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 0,
            refetchOnWindowFocus: true,
            notifyOnStatusChange: false,
            staleTime: 60000 * 5,
        },
    },
});

function App(): JSX.Element {
    return (
        <QueryClientProvider client={queryCache}>
            <RecoilRoot>
                <Suspense fallback={<FallbackLoading />}>
                    <ThemeProvider theme={theme}>
                        <SnackbarProvider>
                            <ProvideAuth>
                                <Router>
                                    <Switch>
                                        <PublicRoute path={'/login'} component={Login} />
                                        <ProtectedRoute layout={Layout} exact component={Profile} path="/" />
                                        <ProtectedRoute layout={Layout} component={ListApp} path="/app" />
                                        <ProtectedRoute layout={Layout} component={Security} path="/security" />
                                    </Switch>
                                </Router>
                            </ProvideAuth>
                            <GlobalLoading />
                        </SnackbarProvider>
                    </ThemeProvider>
                </Suspense>
            </RecoilRoot>
        </QueryClientProvider>
    );
}

export default App;
