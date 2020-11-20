import styled from 'styled-components';

export const Backdrop = styled.div<{
    background: string;
}>`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999999;
    transition: opacity 1s;
    opacity: 0.5;
    background: ${(props) => props.background};
`;

export const Container = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
`;

export const Spinner = styled.div`
    -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    animation: sk-bouncedelay 1.4s infinite ease-in-out both;
    width: 1em;
    height: 1em;
    border-radius: 100%;
    background-color: #5825c3;
    display: inline-block;
`;
