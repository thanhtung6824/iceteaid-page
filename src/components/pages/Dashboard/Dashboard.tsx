import React from 'react';
import { Grid, IconButton } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { useSnackbar } from 'notistack';
import { Rectangle, Text } from '../../elements/StyledUtils';
import { ButtonPro } from '../../elements/Button';
import { listApp } from '../../../services/appService';
import { dialogAtom, selectedAppState, AppState } from '../../../recoil/atom';
import { AddAppDialog } from '../../elements/Dialog';
import { useRouter } from '../../../hooks';
import { DashboardSkeleton } from '../../elements/Loading/SkeletonLoading';
import { allAppSelector } from '../../../recoil/selector';
import { ButtonField, TextField, RectangleContent } from './styled/Dashboard.styled';

const colors = ['#7ACFFF', '#979797', '#FC9433', '#00AF46', '#F54040', '#878DAB'];

const Dashboard: React.FC = () => {
    const setSelectedApp = useSetRecoilState(selectedAppState);
    const setApp = useSetRecoilState(allAppSelector);
    const { enqueueSnackbar } = useSnackbar();
    const setOpen = useSetRecoilState(dialogAtom('dialog/addApp'));
    const { history } = useRouter();
    const { isLoading, error, data, refetch } = useQuery('listApp', listApp) as any;
    if (isLoading) {
        return <DashboardSkeleton />;
    }

    if (error) {
        const msg = (error as any).data.message || (error as any).message;
        enqueueSnackbar(msg, { variant: 'error' });
    }

    const computeColor = (app: AppState) => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        setApp({ ...app, color });
        return color;
    };

    const getStarted = (selectedApp: AppState) => {
        setSelectedApp(selectedApp);
        history.push(`/home/${selectedApp.id}`);
    };
    return (
        <>
            <Grid container spacing={2}>
                {data &&
                    data.data.payload.map((val: AppState) => {
                        return (
                            <Grid key={val.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
                                <Rectangle
                                    className="rectangle"
                                    height={'15em'}
                                    backgroundColor={'#ffffff'}
                                    borderRadius={'0.5em'}
                                >
                                    <RectangleContent>
                                        <Rectangle
                                            width={'3em'}
                                            height={'3em'}
                                            backgroundColor={computeColor(val)}
                                            borderRadius={'0.3em'}
                                        >
                                            <Text fontSize={'1.4em'} fontWeight={600} lineHeight={'2em'}>
                                                {val.appName.substring(0, 2).toUpperCase()}
                                            </Text>
                                        </Rectangle>
                                        <TextField>
                                            <Text fontWeight={600} lineHeight={'2em'}>
                                                {val.appName}
                                            </Text>
                                        </TextField>
                                    </RectangleContent>
                                    <ButtonField>
                                        <ButtonPro
                                            onClick={() => getStarted(val)}
                                            fullWidth
                                            customprops={{
                                                backgroundColor: '#405BF5',
                                                backgroundColorHover: '#405BF5',
                                                color: '#ffffff',
                                                borderRadius: 4,
                                            }}
                                        >
                                            Get start
                                        </ButtonPro>
                                    </ButtonField>
                                </Rectangle>
                            </Grid>
                        );
                    })}
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Rectangle
                        className="rectangle"
                        height={'15em'}
                        borderRadius={'0.3em'}
                        border={'1px dotted #405bf5;'}
                    >
                        <IconButton onClick={() => setOpen(true)} size={'small'}>
                            <AddCircleOutlineIcon style={{ fontSize: 40, color: '#405BF5' }} />
                        </IconButton>
                        <Text color={'#405BF5'} fontWeight={600} lineHeight={'5em'}>
                            Add New App
                        </Text>
                    </Rectangle>
                </Grid>
            </Grid>
            <AddAppDialog refetch={refetch} />
        </>
    );
};

export default Dashboard;
