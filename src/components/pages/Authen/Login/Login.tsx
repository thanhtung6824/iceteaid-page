import React from 'react';
import { InputAdornment } from '@material-ui/core';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useMutation } from 'react-query';
import { useSnackbar } from 'notistack';
import logo from '../../../../assets/img/logo.svg';
import password from '../../../../assets/img/password.svg';
import { Text, LogoText } from '../../../elements/StyledUtils';
import { TextInput } from '../../../elements/TextField';
import { ButtonPro } from '../../../elements/Button';
import { VerifyOtpDialog } from '../../../elements/Dialog';
import { dialogAtom, loginState, globalLoadingState } from '../../../../recoil/atom';
import { sendOtp } from '../../../../services';
import { Response } from '../../../../services/typeService';
import {
    OutBox,
    SplitLeft,
    SplitRight,
    SplitLeftContent,
    Title,
    SubTitle,
    Content,
    SplitRightContent,
    SignupForm,
    AgreeText,
} from './styled/Login.styled';

const schema = yup.object().shape({
    email: yup.string().required('Email is required').email('Invalid email address'),
});

const Login: React.FC = () => {
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
    });
    const { enqueueSnackbar } = useSnackbar();
    const openModal = useSetRecoilState(dialogAtom('dialog/verifyOtp'));
    const setLoading = useSetRecoilState(globalLoadingState);
    const [email, setEmail] = useRecoilState(loginState);
    const { mutate } = useMutation(sendOtp, {
        onSuccess: ({ data }: Response) => {
            openModal(true);
            enqueueSnackbar(data.message, { variant: 'success' });
        },
        onError: (err: any) => {
            const msg = err.data.message || err.message;
            enqueueSnackbar(msg, { variant: 'error' });
            setLoading(false);
        },
    });

    const onSubmit = async () => {
        await mutate({ email });
    };

    return (
        <>
            <OutBox>
                <SplitLeft>
                    <SplitLeftContent>
                        <LogoText>
                            <img src={logo} alt="logo" />
                            <Text color={'#2d1949'} fontSize={'1.6em'}>
                                IceteaID
                            </Text>
                        </LogoText>
                        <Title>
                            <Text color={'#405BF5'}>Security</Text>&nbsp;
                            <Text>that</Text> <br />
                            <Text>scales with your</Text> <br />
                            <Text>company.</Text>
                        </Title>
                        <Content>
                            <SubTitle>
                                <li>Unlimited signups</li>
                                <li>Max 100 active users</li>
                                <li>Estimated saving of $100/month</li>
                            </SubTitle>
                            <img src={password} alt="password" />
                        </Content>
                    </SplitLeftContent>
                </SplitLeft>
                <SplitRight>
                    <SplitRightContent>
                        <SignupForm>
                            <Text fontSize={'2vw'} color={'#FFFFFF'}>
                                Sign up For Free
                            </Text>
                            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                <TextInput
                                    fullWidth
                                    name={'email'}
                                    variant={'outlined'}
                                    placeholder={'Your email'}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position={'start'}>
                                                <MailOutlineIcon aria-label={'email'} />
                                            </InputAdornment>
                                        ),
                                    }}
                                    inputRef={register}
                                    InputLabelProps={{ shrink: true }}
                                    customprops={{
                                        border: '1px solid #000',
                                        borderRadius: 4,
                                        backgroundColor: '#fff',
                                        labelFocusColor: '#000',
                                        errorColor: '#DC7171',
                                    }}
                                    error={!!errors.email}
                                />
                                <AgreeText>
                                    <Text color={'#ffffff'}>By proceeding, you are agreeing to</Text>&nbsp;
                                    <Text color={'#ffffff'} fontWeight={600} textDecoration={'underline'}>
                                        IceteaID’s Terms
                                    </Text>
                                    &nbsp;
                                    <Text color={'#ffffff'}>and</Text>&nbsp;
                                    <Text color={'#ffffff'} fontWeight={600} textDecoration={'underline'}>
                                        Conditions, Privacy Policy
                                    </Text>
                                    &nbsp;
                                    <Text color={'#ffffff'}>and</Text>&nbsp;
                                    <Text color={'#ffffff'} fontWeight={600} textDecoration={'underline'}>
                                        API & SDK License Agreement.
                                    </Text>
                                    &nbsp;
                                </AgreeText>
                                <ButtonPro
                                    type={'submit'}
                                    fullWidth
                                    customprops={{
                                        backgroundColor: '#000',
                                        borderColor: '#000',
                                        backgroundColorHover: '#000',
                                        borderColorHover: '#000',
                                        color: '#fff',
                                        borderRadius: 4,
                                        lineHeight: 2.5,
                                    }}
                                >
                                    Create account
                                </ButtonPro>
                            </form>
                        </SignupForm>
                    </SplitRightContent>
                </SplitRight>
            </OutBox>
            <VerifyOtpDialog />
        </>
    );
};

export default Login;
