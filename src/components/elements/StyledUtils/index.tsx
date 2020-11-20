import styled from 'styled-components';
import { device } from '../../../helpers';

export const rem = (px: number): string => `${px / 16}rem`;

export const LayoutAuthen = styled.div`
    position: relative;
    height: 100%;
    display: flex;
    padding-bottom: 50px;
    justify-content: center;
`;
export const BoxAuthen = styled.div`
    position: absolute;
    top: 80px;
    left: 50%;
    transform: translateX(-50%);
    @media (min-width: 1900px) {
        top: 190px;
    }
    @media (max-width: 768px) {
        width: 100%;
        top: 0;
        /* max-height: inherit; */
    }
    .btRegister {
        padding-top: 20px;
        text-align: center;
        @media (min-width: 320px) and (max-width: 623px) {
            margin: 20px 0;
        }
    }
`;
export const ShadowBoxAuthen = styled.div`
    /* width: 100%; */
    background: #fff;
    border: 1px solid #dee2e6 !important;
    border-radius: 10px;
    box-shadow: 0 0 10px #e4e4e4;
    padding: ${rem(40)} ${rem(54)};
    @media (min-width: 320px) and (max-width: 623px) {
        box-shadow: none;
        padding: 10px 20px;
        box-sizing: border-box;
        height: 815px;
        border-radius: 0;
    }
    @media (min-width: 624px) {
        min-width: ${rem(400)};
    }
`;

export const Title = styled.div`
    font-size: ${rem(20)};
    margin-top: ${rem(15)};
    @media (max-width: 768px) {
        text-align: center;
        margin-bottom: ${rem(15)};
    }
`;

export const Text = styled.span<{
    fontSize?: string;
    color?: string;
    lineHeight?: string;
    fontWeight?: number;
    textDecoration?: string;
}>`
    @media ${device.laptopL} {
        font-size: ${(props) => props.fontSize} !important;
        line-height: ${(props) => props.lineHeight} !important;
        font-weight: ${(props) => props.fontWeight} !important;
    }
    color: ${(props) => (props.color ? props.color : '#000000')};
    text-decoration: ${(props) => props.textDecoration};
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
        'Droid Sans', 'Helvetica Neue', sans-serif;
`;

export const VerticalLine = styled.div<{
    border: string;
    height: string;
    margin: string;
}>`
    border-left: ${(props) => props.border};
    height: ${(props) => props.height};
    margin: ${(props) => props.margin};
`;

export const Rectangle = styled.div<{
    height: string;
    width?: string;
    backgroundColor?: string;
    border?: string;
    borderRadius: string;
}>`
    height: ${(props) => props.height};
    width: ${(props) => props.width};
    background-color: ${(props) => props.backgroundColor};
    border-radius: ${(props) => props.borderRadius};
    border: ${(props) => props.border};
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const LogoText = styled.div`
    display: flex;
    align-items: center;
    span {
        margin-left: 0.4em;
        letter-spacing: 0.15em;
    }
`;

export const ColorfulIcon = styled.div<{ color: string; darkMode?: boolean; darkModeColor?: string }>`
    color: ${(props) => (props.darkMode ? props.color : props.darkModeColor)};
    display: flex;
    align-items: center;
`;

export const OneLineButton = styled.div`
    display: flex;
    button:first-child {
        margin-right: 0.6em;
    }
    margin-top: 1em;
`;

export const LabelField = styled.div<{ color: string }>`
    text-align: left;
    margin-bottom: 0.8em;
    color: ${(props) => props.color};
`;

export const Space = styled.span<{ width?: string; height?: string; display?: string }>`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    display: ${(props) => props.display};
`;

export const TextAlignCenter = styled.div`
    text-align: center;
`;
