import React, { useEffect, useState } from 'react';
import { Grid } from '@material-ui/core';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useMutation } from 'react-query';
import { useSnackbar } from 'notistack';
import receiveMailImg from '../../../assets/img/receive-mail.svg';
import { Text } from '../StyledUtils';
import { TextInput } from '../TextField';
import { ButtonPro } from '../Button';
import { loginState } from '../../../recoil/atom/login';
import { dialogAtom } from '../../../recoil/atom';
import { verifyOtp } from '../../../services';
import { globalLoadingState } from '../../../recoil/atom/loading';
import { createPersistedState, useRouter } from '../../../hooks';
import { Response } from '../../../services/typeService';
import CommonDialog from './CommonDialog';
import { VerifyDialogContent, ButtonField } from './styled/VerifyOtpDialog.styled';
import { Title, Subtitle, InputField } from './styled/CommonDialog.styled';

const regexp = /^[0-9\b]+$/;
const useTokenState = createPersistedState('token');

export const VerifyOtpDialog = () => {
    const [focusNow, setFocusNow] = useState(1);
    const [verifyCode, setVerifyCode] = useState('');
    const [input, setInput] = useState<Record<string, number | string>>({});
    const email = useRecoilValue(loginState);
    const [open, setOpen] = useRecoilState(dialogAtom('dialog/verifyOtp'));
    const { history } = useRouter();
    const setLoading = useSetRecoilState(globalLoadingState);
    const { enqueueSnackbar } = useSnackbar();
    const [token, setToken] = useTokenState({});

    const { mutate } = useMutation(verifyOtp, {
        onSuccess: ({ data }: Response) => {
            setOpen(false);
            setLoading(false);
            setInput({});
            setToken({ token: data.payload.accessToken, expires: data.payload.expires });
            history.push('/');
        },
        onError: (err: any) => {
            console.log('err', err);
            const msg = err.data.message || err.message;
            enqueueSnackbar(msg, { variant: 'error' });
            setLoading(false);
        },
    });

    useEffect(() => {
        const verifyCode = Object.values(input).join('');
        setVerifyCode(verifyCode);
    }, [input]);

    const submit = async () => {
        await mutate({ email, verifyCode });
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Backspace') {
            const id = +(e.target as any).id.split('-')[1];
            const newInput = { ...input, [`input-${id}`]: '' };
            setInput(newInput);
            if (focusNow > 1) {
                setFocusNow(id - 1);
            }
        }
    };

    const onFocus = (e: React.FocusEvent) => {
        const id = +(e.target as any).id.split('-')[1];
        setFocusNow(id);
    };

    const onKeyPress = (e: React.KeyboardEvent) => {
        if (!regexp.test(e.key)) {
            return e.preventDefault();
        }
    };

    const onChange = (e: React.ChangeEvent) => {
        const value = (e.target as any).value;
        const currentValue = input[(e.target as any).name];
        if (!currentValue && value && regexp.test(value)) {
            setInput((prevState) => ({
                ...prevState,
                [(e.target as any).name]: value,
            }));
            const id = +(e.target as any).id.split('-')[1];
            if (focusNow < 6) {
                setFocusNow(id + 1);
            }
        }
    };

    const onPaste = (e: any) => {
        const pasteValue = e.clipboardData.getData('Text');
        if (!regexp.test(pasteValue)) {
            return e.preventDefault();
        }
        if (pasteValue.length > 6) {
            return e.preventDefault();
        }
        const newInput = {} as any;
        const splitValue = pasteValue.split('');
        splitValue.forEach((val: string, i: number) => {
            newInput[`input-${i + 1}`] = val;
        });
        setInput(newInput);
        setFocusNow(pasteValue.length);
    };

    return (
        <CommonDialog open={open} setOpen={setOpen}>
            <VerifyDialogContent>
                <div>
                    <img src={receiveMailImg} alt="receivedMail" />
                </div>
                <Title>
                    <Text>Check your email</Text>
                </Title>
                <Subtitle>
                    <Text>We sent a verification code to</Text>&nbsp;
                    <Text color={'#334BD1'}>{email}</Text>
                </Subtitle>
                <form noValidate>
                    <InputField>
                        <Grid container justify="center" spacing={2}>
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <Grid key={i} item xs={2}>
                                    <TextInput
                                        name={`input-${i}`}
                                        id={`Input-${i}`}
                                        value={input[`input-${i}`]}
                                        inputRef={(input) => i === focusNow && input && input.focus()}
                                        onKeyDown={onKeyDown}
                                        onFocus={onFocus}
                                        onChange={onChange}
                                        onKeyPress={onKeyPress}
                                        onPaste={onPaste}
                                        inputProps={{ style: { textAlign: 'center' } }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </InputField>
                    <ButtonField>
                        <ButtonPro
                            onClick={submit}
                            disabled={Object.values(input).join('').length < 6}
                            fullWidth
                            customprops={{
                                backgroundColor: '#000',
                                borderColor: '#000',
                                backgroundColorHover: '#000',
                                borderColorHover: '#000',
                                color: '#ffffff',
                                borderRadius: 4,
                                lineHeight: 2.5,
                                disableColor: '#ffffff',
                            }}
                        >
                            Submit OTP
                        </ButtonPro>
                    </ButtonField>
                </form>
            </VerifyDialogContent>
        </CommonDialog>
    );
};
