import React, { memo } from 'react';
import { BoxContent, Wrapper } from './styled/Layout.styled';
import Sidebar from './Sidebar';
import Header from './Header';

export interface Props {
    children?: React.ReactNode;
}
const Layout: React.FC<Props> = ({ children }: Props) => {
    return (
        <>
            <Wrapper>
                <Sidebar />
                <BoxContent id="content">
                    <Header />
                    {children}
                </BoxContent>
            </Wrapper>
        </>
    );
};

Layout.whyDidYouRender = true;
export default memo(Layout);
