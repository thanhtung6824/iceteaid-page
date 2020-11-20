import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Grid } from '@material-ui/core';
import { useDarkMode } from '../../../hooks';

const SkeletonRoot = ({ children }: { children: React.ReactNode }) => {
    const darkMode = useDarkMode();
    return (
        <SkeletonTheme
            color={darkMode.value ? '#1E2747' : '#ffffff'}
            highlightColor={darkMode.value ? 'rgb(62, 75, 93)' : '#F2F2F2'}
        >
            {children}
        </SkeletonTheme>
    );
};

export const DashboardSkeleton = () => {
    return (
        <SkeletonRoot>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Skeleton height={'15em'} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Skeleton height={'15em'} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Skeleton height={'15em'} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Skeleton height={'15em'} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Skeleton height={'15em'} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Skeleton height={'15em'} />
                </Grid>
            </Grid>
        </SkeletonRoot>
    );
};

export const HomeSkeleton = () => {
    return (
        <SkeletonRoot>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <Skeleton height={'15em'} />
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <Skeleton height={'15em'} />
                </Grid>
            </Grid>
        </SkeletonRoot>
    );
};
