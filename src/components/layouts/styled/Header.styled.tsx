import styled from 'styled-components';

export const Navbar = styled.div`
    height: 4em;
    display: flex;
    justify-content: space-between;
    margin-bottom: 2em;
`;

export const MenuList = styled.div`
    display: flex;
    align-items: center;
`;

export const Avatar = styled.div`
    img {
        vertical-align: middle;
        width: 2em;
        height: 2em;
        border-radius: 50%;
    }
    margin-right: 0.7em;
`;
export const DarkModeGroup = styled.div`
    align-self: center;
    input {
        cursor: pointer;
        opacity: 0;
        position: absolute;
        height: 3em;
        width: 4em;
        z-index: 99999;
    }
    input:checked + .label .ball {
        transform: translateX(1.5em);
    }
    .label {
        background-color: #111;
        border-radius: 2em;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px;
        position: relative;
        height: 1.5em;
        width: 3em;
    }
`;

export const Ball = styled.div.attrs({ className: 'ball' })`
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    height: 1.5em;
    width: 1.5em;
    transform: translateX(0);
    transition: transform 0.2s linear;
`;
