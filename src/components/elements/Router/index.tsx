import React, { Attributes } from 'react';
import { Route, RouteComponentProps, Redirect, RouteProps } from 'react-router-dom';
import { Props as LayoutProps } from '../../layouts/Layout';
import { useAuth } from '../../../hooks';

interface PublicRouter extends RouteProps {
    component: React.FC;
}

interface ProtectedRouter extends RouteProps {
    layout: React.FC<LayoutProps>;
    component: React.FC;
}

export const PublicRoute: React.FC<PublicRouter> = ({ component, ...rest }: PublicRouter) => {
    const { isAuthenticated } = useAuth();
    return (
        <Route
            {...rest}
            render={(props: RouteComponentProps & Attributes) => {
                const redirectPath = props.history.location.state
                    ? (props.history.location.state as any).from.pathname
                    : '/';
                return !isAuthenticated ? (
                    React.createElement(component, props)
                ) : (
                    <Redirect
                        to={{
                            pathname: redirectPath,
                            state: { from: props.location },
                        }}
                    />
                );
            }}
        />
    );
};

PublicRoute.whyDidYouRender = true;

export const ProtectedRoute: React.FC<ProtectedRouter> = ({ layout, component, ...rest }: ProtectedRouter) => {
    const { isAuthenticated } = useAuth();

    return (
        <Route
            {...rest}
            render={(props: RouteComponentProps & Attributes) => {
                return isAuthenticated ? (
                    React.createElement(layout, props, React.createElement(component, props))
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: { from: props.location },
                        }}
                    />
                );
            }}
        />
    );
};
ProtectedRoute.whyDidYouRender = true;
