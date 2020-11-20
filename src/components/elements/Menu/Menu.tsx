import React, { Dispatch } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useDarkMode } from '../../../hooks';
import { StyledMenuItem } from './MenuItem';

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
        '& .MuiPaper-root': {
            backgroundColor: (props: CustomProps) => (props.darkMode ? '#1E2745' : '#ffffff'),
        },
    },
}));

interface CustomProps {
    darkMode: boolean;
}

interface Props {
    anchorEl: (EventTarget & HTMLElement) | null;
    setAnchorEl: Dispatch<(EventTarget & HTMLElement) | null>;
    dropdownBtn: React.ReactNode;
    data: [{ element: string; icon: React.ReactNode; func: () => void }];
}

export const MenuPro: React.FC<Props> = ({ anchorEl, setAnchorEl, dropdownBtn, data }: Props) => {
    const darkMode = useDarkMode();
    const props = { darkMode: darkMode.value };
    const classes = useStyles(props);

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            {dropdownBtn}
            <Menu
                className={classes.root}
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {data.map((value, index) => (
                    <div key={index} onClick={value.func}>
                        <StyledMenuItem>
                            <ListItemIcon>{value.icon}</ListItemIcon>
                            <ListItemText primary={value.element} />
                        </StyledMenuItem>
                    </div>
                ))}
            </Menu>
        </>
    );
};
