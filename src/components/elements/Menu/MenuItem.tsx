import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { useDarkMode } from '../../../hooks';

const useStyles = makeStyles((theme) => ({
    root: {
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
        '&:focus': {
            backgroundColor: (props: CustomProps) => (props.darkMode ? 'rgb(62, 75, 93)' : 'rgb(225, 225, 225'),
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: (props: CustomProps) =>
                    props.darkMode ? theme.palette.common.white : theme.palette.common.black,
            },
        },
        '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
            color: (props: CustomProps) => (props.darkMode ? theme.palette.common.white : theme.palette.common.black),
        },
    },
}));

interface CustomProps {
    darkMode: boolean;
}

interface Props {
    children: React.ReactNode;
}

export const StyledMenuItem: React.FC<Props> = ({ children }: Props) => {
    const darkMode = useDarkMode();
    const props = { darkMode: darkMode.value };
    const classes = useStyles(props);
    return <MenuItem className={classes.root}>{children}</MenuItem>;
};
