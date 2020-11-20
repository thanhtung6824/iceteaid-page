import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button, { ButtonProps } from '@material-ui/core/Button';
import styled from 'styled-components';

const useStyles = makeStyles((theme) => ({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        borderRadius: (props: CustomProps) => props.borderRadius,
        lineHeight: (props: CustomProps) => props.lineHeight,
        color: (props: CustomProps) => (props.color ? props.color : '#ffffff'),
        backgroundColor: (props: CustomProps) => (props.backgroundColor ? props.backgroundColor : '#405BF5'),
        borderColor: (props: CustomProps) => props.borderColor,
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            backgroundColor: (props: CustomProps) => props.backgroundColorHover,
            borderColor: (props: CustomProps) => props.borderColorHover,
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: (props: CustomProps) => props.backgroundColorActive,
            borderColor: (props: CustomProps) => props.borderColorActive,
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
        '&:disabled': {
            color: (props: CustomProps) => props.disableColor,
            opacity: 0.7,
        },
    },
}));

type CustomProps = {
    backgroundColor?: string;
    borderColor?: string;
    backgroundColorHover?: string;
    borderColorHover?: string;
    backgroundColorActive?: string;
    borderColorActive?: string;
    borderRadius?: number;
    color?: string;
    lineHeight?: number;
    disableColor?: string;
};

type CustomButtonProps = ButtonProps & {
    customprops?: CustomProps;
};

export const ButtonPro: React.FC<CustomButtonProps> = ({ children, ...rest }: CustomButtonProps) => {
    const { customprops } = rest;
    const classes = useStyles(customprops);
    return (
        <Button className={classes.root} {...rest}>
            {children}
        </Button>
    );
};

export const DeepButton = styled(ButtonPro)<{ darkMode: boolean }>`
    background-color: ${(props) => (props.darkMode ? '#5825C3 !important' : '#334BD1 !important')};
    color: #ffffff !important;
    font-family: inherit !important;
    text-transform: none !important;
`;
