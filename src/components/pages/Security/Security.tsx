import React, { useState, useEffect } from 'react';
import {
    Grid,
    Typography,
    Accordion,
    AccordionSummary,
    makeStyles,
    AccordionDetails,
    Box,
    Icon,
    Button,
    FormControl,
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import { useMutation, useQuery } from 'react-query';
import { useSnackbar } from 'notistack';
import { useDarkMode } from '../../../hooks';
import lockIcon from '../../../assets/img/lock.svg';
import { TextInput } from '../../elements/TextField';
import { getQrCode, enableVerifyQrCode, getStatusVerifyQrCode, disableVerifyQrCode } from '../../../services';
import { AuthenBox, ButtonEnabled, FormContainer, QrBox } from './styled/Security.styled';

const useStyles = makeStyles(() => ({
    bold: {
        fontWeight: 'bold',
    },
}));

const steps = {
    setup: 'setup',
    scanqr: 'scanqr',
    enabled: 'enabled',
};

const Security = () => {
    const darkMode = useDarkMode();
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [expanded, setExpanded] = useState<string>('');
    const [step, setStep] = useState<string>(steps.setup);
    const [qrcode, setQrcode] = useState<string>('');
    const [verifyCode, setVerifyCode] = useState<string>('');

    const handleChange = (panel: any) => (event: any, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : '');
    };

    const { data: statusVerifyQrCode } = useQuery('getStatusVerifyQrCode', getStatusVerifyQrCode);
    useEffect(() => {
        if (statusVerifyQrCode?.data.payload.enabled) {
            setStep(steps.enabled);
        }
    }, [statusVerifyQrCode]);

    const { mutate: getQrcode } = useMutation(getQrCode, {
        onSuccess: async (data) => {
            setStep(steps.scanqr);
            setQrcode(data.data.payload);
        },
        onError: (err: any) => {
            const msg = err.data.message || err.message;
            enqueueSnackbar(msg, { variant: 'error' });
        },
    });

    const { mutate: turnOnVerifyQrCode } = useMutation(enableVerifyQrCode, {
        onSuccess: async (data) => {
            if (data.data.payload.enabled) {
                enqueueSnackbar('Enable success', { variant: 'success' });
                setStep(steps.enabled);
            } else {
                enqueueSnackbar('Enable failed', { variant: 'error' });
            }
        },
        onError: (err: any) => {
            console.log('err', err);
            const msg = err.data.message || err.message;
            enqueueSnackbar(msg, { variant: 'error' });
        },
    });

    const { mutate: turnOffVerifyQrCode } = useMutation(disableVerifyQrCode, {
        onSuccess: async (data) => {
            if (data.data.payload.disabled) {
                enqueueSnackbar('Disable success', { variant: 'success' });
                setStep(steps.setup);
            } else {
                enqueueSnackbar('Disable failed', { variant: 'error' });
            }
        },
        onError: (err: any) => {
            const msg = err.data.message || err.message;
            enqueueSnackbar(msg, { variant: 'error' });
        },
    });

    const nextStep = () => {
        getQrcode({ email: 'hrdnipro14@gmail.com' });
    };

    const enable = () => {
        turnOnVerifyQrCode({
            verifyCode: verifyCode,
        });
    };

    const disableQrCode = () => {
        turnOffVerifyQrCode();
    };

    return (
        <>
            <Grid xs={12} sm={12}>
                <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={'panel3bh-content'}
                        id={'panel3bh-header'}
                    >
                        <Typography variant="h5"> Sign in options </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <AuthenBox>
                            {step === steps.setup && (
                                <Box component="span" m={1} textAlign="center">
                                    <Icon className={'icon'}>
                                        <img src={lockIcon} alt="" width="50" height="50" />
                                    </Icon>
                                    <Typography className={`bold`} variant="h5">
                                        Verify code via qrcode is not enabled yet.
                                    </Typography>
                                    <p>
                                        {`Verify code via qrcode adds an additional option of sign in to your account.`}
                                    </p>
                                    <Button variant="contained" color="primary" onClick={nextStep}>
                                        Set up using an app
                                    </Button>
                                </Box>
                            )}
                            {step === steps.scanqr && (
                                <Box component="span" m={1} textAlign="center">
                                    <form action="">
                                        <Typography className={classes.bold} variant="h5">
                                            Scan this barcode with your app.
                                        </Typography>
                                        <p>
                                            {`Scan the image above with the two-factor authentication app on your phone.`}
                                        </p>
                                        <QrBox>
                                            <div>
                                                <img src={qrcode} alt="" width="150" height="150" />
                                            </div>
                                        </QrBox>

                                        <FormContainer
                                            className="rectangle"
                                            height={'auto'}
                                            backgroundColor={'#ffffff'}
                                            borderRadius={'0.5em'}
                                        >
                                            <FormControl>
                                                <label className={classes.bold} htmlFor="">
                                                    Enter the six-digit code from the application
                                                </label>
                                                <p>
                                                    {`After scanning the barcode image, the app will display a six-digit code that you can enter below.`}
                                                </p>
                                                <TextInput
                                                    customprops={{
                                                        backgroundColor: '#EEEEEE',
                                                        borderRadius: 5,
                                                    }}
                                                    value={verifyCode}
                                                    onChange={(event) => setVerifyCode(event.target.value)}
                                                    variant={'outlined'}
                                                    fullWidth
                                                    name={'displayName'}
                                                />
                                            </FormControl>
                                        </FormContainer>
                                        <div>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                style={{ marginRight: '5px' }}
                                                onClick={enable}
                                            >
                                                Enable
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="default"
                                                onClick={() => setStep('setup')}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </form>
                                </Box>
                            )}
                            {step === steps.enabled && (
                                <Box component="span" m={1} textAlign="center">
                                    <Typography className={classes.bold} variant="h5">
                                        Verify code via qrcode is enabled.
                                    </Typography>
                                    <p>{`Verify code via qrcode adds an additional option of sign in to your account.`}</p>
                                    <ButtonEnabled>
                                        <Button variant="contained" onClick={disableQrCode}>
                                            Enabled
                                        </Button>
                                    </ButtonEnabled>
                                </Box>
                            )}
                        </AuthenBox>
                    </AccordionDetails>
                </Accordion>
            </Grid>
        </>
    );
};

export default Security;
