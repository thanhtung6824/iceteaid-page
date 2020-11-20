import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: (props: CustomProps) => props.borderRadius,
        backgroundColor: (props: CustomProps) => props.backgroundColor,
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
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
        '& label.Mui-focused': {
            color: (props: CustomProps) => props.labelFocusColor,
        },
        '& .MuiFilledInput-root': {
            '&.Mui-focused': {
                borderColor: (props: CustomProps) => props.borderColor,
                border: (props: CustomProps) => props.border,
            },
        },
        '& .MuiOutlinedInput-root': {
            '&.Mui-focused': {
                borderColor: (props: CustomProps) => props.borderColor,
                border: (props: CustomProps) => props.border,
            },
        },
        '& .Mui-error': {
            color: (props: CustomProps) => props.errorColor,
        },
        '& .MuiOutlinedInput-notchedOutline': {
            top: -7,
        },
    },
    focused: {},
    notchedOutline: {},
    helperText: {
        backgroundColor: (props: CustomProps) => props.errorBackgroundColor,
    },
}));

type CustomProps = {
    focused?: string;
    borderColor?: string;
    fieldSet?: string;
    fieldSetFocus?: string;
    border?: string;
    borderRadius?: number;
    backgroundColor?: string;
    labelFocusColor?: string;
    errorColor?: string;
    errorBackgroundColor?: string;
    disableColor?: string;
};

type CustomTextFieldProps = TextFieldProps & {
    customprops?: CustomProps; // typo for disable react-error
};

export const TextInput: React.FC<CustomTextFieldProps> = ({
    variant,
    color,
    label,
    value,
    onChange,
    InputProps,
    ...rest
}: CustomTextFieldProps) => {
    const { customprops } = rest;
    const classes = useStyles(customprops);
    return (
        <TextField
            className={classes.root}
            variant={variant}
            onChange={onChange}
            color={color}
            value={value}
            label={label}
            InputProps={InputProps}
            FormHelperTextProps={{ classes: { root: classes.helperText } }}
            {...rest}
        />
    );
};
