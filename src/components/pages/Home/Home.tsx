import React from 'react';
import { Grid } from '@material-ui/core';
import { useRecoilState, useSetRecoilState } from 'recoil';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { Redirect } from 'react-router-dom';
import { useMutation, useQueries } from 'react-query';
import { useSnackbar } from 'notistack';
import DescriptionIcon from '@material-ui/icons/Description';
import MovieIcon from '@material-ui/icons/Movie';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import { Rectangle, Text, LabelField, ColorfulIcon, Space } from '../../elements/StyledUtils';
import { TextInput } from '../../elements/TextField';
import { dialogAtom, selectedAppState } from '../../../recoil/atom';
import { useDarkMode, useRouter } from '../../../hooks';
import { getInfo, getUsers, regenerateKey } from '../../../services/appService';
import { ButtonPro } from '../../elements/Button';
import { TablePro } from '../../elements/Table';
import { Response } from '../../../services/typeService';
import { timeSince } from '../../../helpers';
import ConfirmDialog from '../../elements/Dialog/ConfirmDialog';
import { HomeSkeleton } from '../../elements/Loading/SkeletonLoading';
import {
    Wrapper,
    KeyContent,
    InputField,
    HelpContent,
    HowToHelp,
    UserContent,
    SearchInput,
} from './styled/Home.styled';

const Home: React.FC = () => {
    const darkMode = useDarkMode();
    const [selectedApp, setSelectedApp] = useRecoilState(selectedAppState);
    const showConfirm = useSetRecoilState(dialogAtom('dialog/confirm'));

    const { query, location } = useRouter() as any;
    const { enqueueSnackbar } = useSnackbar();
    const results = useQueries([
        { queryKey: ['getInfo', { id: query.id }], queryFn: getInfo },
        { queryKey: ['getUsers', { id: query.id }], queryFn: getUsers },
    ]);
    const appInfo = results[0];
    const listUsers = results[1];
    const { mutate } = useMutation(regenerateKey, {
        onSuccess: () => {
            appInfo.refetch();
            showConfirm(false);
            enqueueSnackbar('Regenerate key successfully', { variant: 'success' });
        },
        onError: (err: any) => {
            const msg = err.data.message || err.message;
            enqueueSnackbar(msg, { variant: 'error' });
        },
    });

    const dataTab: {
        col1: string;
        col2: string;
        // col3: JSX.Element;
    }[] = React.useMemo(() => {
        if (listUsers.data) {
            const users = (listUsers.data as Response).data.payload;
            const dataTable = [] as {
                col1: string;
                col2: string;
                // col3: JSX.Element;
            }[];
            users.map((user: any) => {
                dataTable.push({
                    col1: user.user.username,
                    col2: timeSince(new Date(user.createdAt)) + ' ago',
                });
            });
            return dataTable;
        }
        return [] as {
            col1: string;
            col2: string;
            // col3: JSX.Element;
        }[];
    }, [listUsers.data]);
    const columns = React.useMemo(
        () => [
            {
                Header: 'Email',
                accessor: 'col1', // accessor is the "key" in the data
            },
            {
                Header: 'Signed up',
                accessor: 'col2',
            },
        ],
        [],
    ) as any;

    if (!query.id) {
        return (
            <Redirect
                to={{
                    pathname: '/',
                    state: { from: location },
                }}
            />
        );
    }

    if (appInfo.isLoading || listUsers.isLoading) {
        return <HomeSkeleton />;
    }

    if (appInfo.error) {
        const msg = (appInfo.error as any).data.message || (appInfo.error as any).message;
        enqueueSnackbar(msg, { variant: 'error' });
    }

    if (appInfo.data) {
        const { data } = appInfo.data as any;
        if (!data.payload) {
            return (
                <Redirect
                    to={{
                        pathname: '/',
                        state: { from: location },
                    }}
                />
            );
        }
        setSelectedApp(data.payload);
    }

    if (listUsers.error) {
        const msg = (listUsers.error as any).data.message || (listUsers.error as any).message;
        enqueueSnackbar(msg, { variant: 'error' });
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <Rectangle className="rectangle" height={'100%'} backgroundColor={'#ffffff'} borderRadius={'0.5em'}>
                        <Wrapper container>
                            <KeyContent item xs={12} sm={12} md={12} lg={6}>
                                <Text fontSize={'1.2em'} fontWeight={600} lineHeight={'2em'}>
                                    Install IceteaID
                                </Text>
                                <br />
                                <Text fontSize={'0.9em'} lineHeight={'2em'}>
                                    Grab your key & follow the Get Started docs to add Icetea ID to your app:{' '}
                                </Text>
                                <InputField>
                                    <LabelField color={'#ffffff'}>
                                        <label>App name</label>
                                    </LabelField>
                                    <TextInput
                                        onClick={() => navigator.clipboard.writeText(selectedApp.secretKey)}
                                        value={selectedApp.secretKey}
                                        disabled
                                        name={'apiKey'}
                                        customprops={{
                                            backgroundColor: '#ffffff',
                                            borderRadius: 4,
                                        }}
                                        fullWidth
                                        variant={'outlined'}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position={'end'}>
                                                    <IconButton>
                                                        <FileCopyIcon className={'icon'} />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </InputField>
                                <ButtonPro
                                    fullWidth
                                    customprops={{
                                        lineHeight: 2.5,
                                    }}
                                    onClick={() => showConfirm(true)}
                                >
                                    Regenerate
                                </ButtonPro>
                            </KeyContent>
                            <HelpContent item xs={12} sm={12} md={12} lg={6}>
                                <Text fontSize={'1.2em'} fontWeight={600} lineHeight={'2em'}>
                                    Need Help?
                                </Text>
                                <HowToHelp>
                                    <ColorfulIcon color={'#878dab'} darkMode={darkMode.value} darkModeColor={'#405BF5'}>
                                        <DescriptionIcon />
                                        <Space display={'inline-block'} width={'0.5em'} />
                                        <Text>Read docs</Text>
                                    </ColorfulIcon>
                                    <ColorfulIcon color={'#878dab'} darkMode={darkMode.value} darkModeColor={'#405BF5'}>
                                        <MovieIcon />
                                        <Space display={'inline-block'} width={'0.5em'} />
                                        <Text>Watch demos</Text>
                                    </ColorfulIcon>
                                </HowToHelp>
                                <HowToHelp>
                                    <ColorfulIcon color={'#878dab'} darkMode={darkMode.value} darkModeColor={'#405BF5'}>
                                        <QuestionAnswerIcon />
                                        <Space display={'inline-block'} width={'0.5em'} />
                                        <Text>Go to Support</Text>
                                    </ColorfulIcon>
                                </HowToHelp>
                            </HelpContent>
                        </Wrapper>
                    </Rectangle>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={6}>
                    <Rectangle className="rectangle" height={'100%'} backgroundColor={'#ffffff'} borderRadius={'0.5em'}>
                        <Wrapper container>
                            <UserContent>
                                {(listUsers.data as Response).data.payload.length > 0 ? (
                                    <>
                                        <Text fontSize={'1.2em'} fontWeight={600} lineHeight={'2em'}>
                                            List users
                                        </Text>
                                        <SearchInput item lg={9}>
                                            <TextInput
                                                fullWidth
                                                name={'apiKey'}
                                                placeholder={'Search user...'}
                                                customprops={{
                                                    backgroundColor: '#FFFFFF',
                                                    errorColor: '#DC7171',
                                                    borderRadius: 20,
                                                }}
                                                variant={'outlined'}
                                            />
                                        </SearchInput>

                                        <TablePro columns={columns} data={dataTab} />
                                    </>
                                ) : (
                                    <>
                                        <Text fontSize={'1.2em'} fontWeight={600} lineHeight={'2em'}>
                                            Signup
                                        </Text>
                                        <br />
                                        <Text fontSize={'0.9em'} lineHeight={'2em'}>
                                            No one signed up on <Text fontWeight={600}>{selectedApp.appName}</Text> yet!
                                        </Text>
                                        <br />
                                        <Text fontSize={'0.9em'} lineHeight={'2em'}>
                                            Click <Text fontWeight={600}>Go to Docs</Text> and try the signup flow.
                                        </Text>
                                    </>
                                )}
                            </UserContent>
                        </Wrapper>
                    </Rectangle>
                </Grid>
            </Grid>
            <ConfirmDialog
                cancel={() => showConfirm(false)}
                confirm={() => mutate(query.id)}
                confirmText={'Regenerate'}
                title={'Regenerate your key?'}
                subTitle={'You will no longer be use your previous key and cannot undo this'}
            />
        </>
    );
};

export default Home;
