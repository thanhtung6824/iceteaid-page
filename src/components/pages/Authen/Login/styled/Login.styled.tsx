import styled from 'styled-components';
import { device } from '../../../../../helpers';

export const OutBox = styled.div`
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    bottom: 0;
    @media ${device.laptop} {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: fixed;
    }
`;

export const SplitLeft = styled.div`
    display: inline-block;
    position: relative;
    width: 100%;
    min-height: 490px;

    @media ${device.laptop} {
        height: 100%;
        width: 55%;
        position: fixed;
        z-index: 1500;
        top: 0;
        overflow-x: hidden;
        padding-top: 1.5em;
        left: 0;
    }
`;

export const SplitRight = styled.div`
    background-color: #334bd1;
    display: inline-block;
    position: relative;
    width: 100%;
    min-height: 490px;

    @media ${device.laptop} {
        height: 100%;
        width: 45%;
        position: fixed;
        z-index: 1500;
        top: 0;
        overflow-x: hidden;
        padding-top: 1.5em;
        right: 0;
    }
`;

export const SplitLeftContent = styled.div`
    @media ${device.mobileS} {
        padding: 2em;
    }
    @media ${device.mobileL} {
        padding: 3em;
    }
    @media ${device.tablet} {
        padding: 5em 10em;
    }

    @media ${device.laptop} {
        padding: 3em 5em 3em 5em;
    }

    @media ${device.laptopL} {
        padding: 3em 20em 3em 10em;
    }
`;

export const SplitRightContent = styled.div`
    @media ${device.mobileS} {
        padding: 2em;
    }

    @media ${device.tablet} {
        padding: 5em 10em;
    }

    @media ${device.laptop} {
        padding: 5em;
    }
    @media ${device.laptopL} {
        padding: 10em;
    }
`;

export const Title = styled.div`
    font-size: 2em;
    margin-top: 1em;
    font-weight: 600;
    text-align: justify;

    @media ${device.laptop} {
        font-size: 2em;
        margin-top: 2.5em;
    }

    @media ${device.laptopL} {
        font-size: 3vw;
        margin-top: 2.5em;
    }
`;

export const Content = styled.div`
    display: flex;
    justify-content: space-between;
    img {
        transform: scale(0.7);
    }
`;

export const SubTitle = styled.ul`
    list-style: none;
    color: #333333;
    padding: 0.9em;
    li {
        line-height: 1.5em;
    }
    @media ${device.laptop} {
        font-size: 1em;
        padding: 1em;
        line-height: 2em;
        transform: scale(1);
    }
    li:before {
        content: '\\2022'; /* Add content: \\2022 is the CSS Code/unicode for a bullet */
        color: #000000; /* Change the color */
        font-weight: bold; /* If you want it to be bold */
        display: inline-block; /* Needed to add space between the bullet and the text */
        width: 1em; /* Also needed for space (tweak if needed) */
        margin-left: -1em; /* Also needed for space (tweak if needed) */
    }
`;

export const SignupForm = styled.div`
    margin-top: 2.5em;
    text-align: center;
    form {
        padding: 2em 3em 3em;
    }
    @media ${device.mobileS} {
        span {
            font-size: 1.5em;
        }
        input {
            font-size: 0.8em;
        }
        button {
            padding: 0.9em;
            font-size: 0.8em;
        }
    }
    @media ${device.tablet} {
        form {
            margin-top: 2em;
            padding: 1em;
        }
    }
`;

export const AgreeText = styled.div`
    color: #ffffff;
    text-align: left;
    margin: 1.5em 0;
    font-weight: 500;
    @media ${device.mobileS} {
        font-size: 0.5em;
    }
    @media ${device.laptopL} {
        font-size: 0.656vw;
    }
`;
