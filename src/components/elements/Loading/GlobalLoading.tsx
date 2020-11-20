import React, { memo } from 'react';
import { useRecoilValue } from 'recoil';
import { globalLoadingState } from '../../../recoil/atom';
import { Backdrop, Container, Spinner } from './styled/GlobalLoading.styled';

export const GlobalLoading: React.FC = () => {
    const isLoading = useRecoilValue(globalLoadingState);
    return (
        <>
            {isLoading && (
                <Backdrop background={'rgba(0, 0, 0, 0.5)'}>
                    <Container>
                        <Spinner className={'bounce1'} />
                        <Spinner className={'bounce2'} />
                        <Spinner />
                    </Container>
                </Backdrop>
            )}
        </>
    );
};

export const SimpleLoading: React.FC = memo(function SimpleLoading() {
    return (
        <Backdrop background={'rgba(0, 0, 0, 0.5)'}>
            <Container>
                <Spinner className={'bounce1'} />
                <Spinner className={'bounce2'} />
                <Spinner />
            </Container>
        </Backdrop>
    );
});

export const FallbackLoading: React.FC = () => {
    return (
        <Backdrop background={'#ffffff'}>
            <Container>
                <Spinner className={'bounce1'} />
                <Spinner className={'bounce2'} />
                <Spinner />
            </Container>
        </Backdrop>
    );
};
