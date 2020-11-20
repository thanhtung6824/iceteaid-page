import React, { useState } from 'react';
import { withStyles, Theme, createStyles } from '@material-ui/core/styles';
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';

interface Styles extends Partial<Record<SwitchClassKey, string>> {
    focusVisible?: string;
}

interface Props extends SwitchProps {
    classes: Styles;
}

const IOSSwitch = withStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 42,
            height: 26,
            padding: 0,
            margin: theme.spacing(1),
            overflow: 'inherit',
        },
        switchBase: {
            padding: 1,
            '&$checked': {
                transform: 'translateX(16px)',
                color: theme.palette.common.white,
                '& + $track': {
                    backgroundColor: '#52d869',
                    opacity: 1,
                    border: 'none',
                },
            },
            '&$focusVisible $thumb': {
                color: '#52d869',
                border: '6px solid #fff',
            },
        },
        thumb: {
            width: 24,
            height: 24,
        },
        track: {
            borderRadius: 26 / 2,
            border: `1px solid ${theme.palette.grey[400]}`,
            backgroundColor: theme.palette.grey[50],
            opacity: 1,
            transition: theme.transitions.create(['background-color', 'border']),
        },
        checked: {},
        focusVisible: {},
    }),
)(({ classes, ...props }: Props) => {
    return (
        <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
                root: classes.root,
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
            }}
            {...props}
        />
    );
});

interface CustomSwitchProps {
    offText: string;
    onText: string;
    checked: boolean;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CustomSwitch: React.FC<CustomSwitchProps> = ({
    offText,
    onText,
    checked,
    handleChange,
}: CustomSwitchProps) => {
    const [state, setState] = useState(checked);

    return (
        <>
            <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>{offText}</Grid>
                <Grid item>
                    <IOSSwitch checked={checked} onChange={handleChange} />
                </Grid>
                <Grid item>{onText}</Grid>
            </Grid>
        </>
    );
};
