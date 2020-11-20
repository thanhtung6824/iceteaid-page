import styled from 'styled-components';
import { device } from '../../../helpers';
import { LogoText } from '../../elements/StyledUtils';

export const Sidenav = styled.div`
    height: 100%; /* Full-height: remove this if you want "auto" height */
    width: 5em; /* Set the width of the sidebar */
    position: fixed; /* Fixed Sidebar (stay in place on scroll) */
    z-index: 1; /* Stay on top */
    top: 0; /* Stay at the top */
    left: 0;
    background-color: #ffffff; /* white */
    padding-top: 1.5em;
    @media ${device.laptop} {
        width: 15em; /* Set the width of the sidebar */
        overflow-x: hidden; /* Disable horizontal scroll */
    }
`;

export const SidebarHead = styled.div.attrs({ className: 'sidebarHead' })`
    height: 8em;
    border-bottom: 1px solid #d9defd;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    text-align: center;

    @media ${device.laptop} {
        align-items: flex-start;
        padding: 0 0 1em 2em;
    }
`;

export const LogoTextSidebar = styled(LogoText)`
    span {
        display: none;
    }
    @media ${device.laptop} {
        span {
            display: block;
        }
    }
`;
export const ChooseApp = styled.div``;

export const SidebarList = styled.div`
    margin-top: 1em;
    padding: 0 0.5em;
    a {
        display: flex;
        align-items: center;
        padding: 0.5em 1em;
        text-decoration: none;
        font-size: 1em;
        color: #878dab;
        margin-bottom: 0.5em;
    }
    .dark-mode .active {
        span {
            color: #ffffff !important;
        }
    }
    .active {
        .icon {
            filter: invert(63%) sepia(11%) saturate(744%) hue-rotate(193deg) brightness(87%) contrast(88%);
        }
    }
    .icon {
        font-size: 1.2em;
    }
    .iconText {
        display: none;
    }

    @media ${device.laptop} {
        padding: 0 1.5em;
        a {
            padding: 0.5em 0 0.5em 1em;
        }
        .icon {
            font-size: 1.2em;
            margin-right: 0.3em;
        }
        .iconText {
            display: block;
        }
    }
`;
