import React, { Dispatch } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { Text } from '../StyledUtils';

const useStyles = makeStyles((theme) => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: '#000000',
        backgroundColor: theme.palette.grey[200],
    },
    // dialogContent: {
    //     padding: '0.5em 4em',
    // },
}));

interface Props {
    open: boolean;
    setOpen: Dispatch<boolean>;
    title?: string;
    children?: React.ReactNode;
}

const CommonDialog: React.FC<Props> = ({ open, setOpen, title, children }: Props) => {
    const classes = useStyles();
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    {title && <Text>{title}</Text>}
                    <IconButton size="small" aria-label="close" className={classes.closeButton} onClick={handleClose}>
                        <CloseIcon fontSize={'small'} />
                    </IconButton>
                </DialogTitle>
                <DialogContent>{children}</DialogContent>
            </Dialog>
        </>
    );
};

export default CommonDialog;
