import styled from 'styled-components';
import { device } from '../../../helpers';

export const Wrapper = styled.div`
    background-color: #ffffff;
`;
export const BoxContent = styled.div`
    position: absolute;
    top: 2em;
    left: 5em;
    background-color: #f2f4fc;
    border-radius: 1em;
    padding: 0.5em 2em 2em;
    @media ${device.tablet} {
        bottom: 2em;
        right: 2em;
    }
    @media ${device.laptop} {
        left: 15em;
        bottom: 2em;
        right: 2em;
    }
`;
