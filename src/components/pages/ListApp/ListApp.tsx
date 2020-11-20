import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { useSnackbar } from 'notistack';
import { Rectangle } from '../../elements/StyledUtils';
import { getAppByUser, updateStatusApp } from '../../../services/appService';
import { Response } from '../../../services/typeService';
import { timeSince } from '../../../helpers';
import { TablePro } from '../../elements/Table';
import { CustomSwitch } from '../../elements/Switch';
import ConfirmDialog from '../../elements/Dialog/ConfirmDialog';
import { dialogAtom } from '../../../recoil/atom';
import { SimpleLoading } from '../../elements/Loading';
import { ToggleGroup } from './styled/ListApp.styled';

const ListApp = () => {
    const { isLoading, data, updatedAt } = useQuery('getAppByUser', getAppByUser);
    const [selectedApp, setSelectedApp] = useState<any>({});
    const { enqueueSnackbar } = useSnackbar();

    const { mutate } = useMutation(updateStatusApp, {
        onSuccess: async (data) => {
            await queryClient.invalidateQueries('getAppByUser');
            showConfirm(false);
            enqueueSnackbar(data.data.message, { variant: 'success' });
        },
        onError: (err: any) => {
            const msg = err.data.message || err.message;
            enqueueSnackbar(msg, { variant: 'error' });
        },
    });
    const showConfirm = useSetRecoilState(dialogAtom('dialog/confirm'));
    const queryClient = useQueryClient();

    const columns = React.useMemo(
        () => [
            {
                Header: 'App name',
                accessor: 'col1', // accessor is the "key" in the data
            },
            {
                Header: 'Join at',
                accessor: 'col2',
            },
            {
                Header: '',
                accessor: 'col3',
            },
        ],
        [],
    ) as any;

    const dataTab: {
        col1: string;
        col2: string;
        col3: JSX.Element;
    }[] = React.useMemo(() => {
        if (data) {
            console.log('re render');

            const listApps = (data as Response).data.payload;
            const dataTable = [] as {
                col1: string;
                col2: string;
                col3: JSX.Element;
            }[];
            listApps.map((app: any) => {
                dataTable.push({
                    col1: app.appName,
                    col2: timeSince(new Date(app.createdAt)) + ' ago',
                    col3: (
                        <>
                            <ToggleGroup>
                                <CustomSwitch
                                    checked={app.status}
                                    offText={'Disable'}
                                    onText={'Active'}
                                    handleChange={(e) => handleChange(e, app)}
                                />
                            </ToggleGroup>
                        </>
                    ),
                });
            });

            return dataTable;
        }
        return [] as {
            col1: string;
            col2: string;
            col3: JSX.Element;
        }[];
    }, [updatedAt]);

    if (isLoading) {
        return <SimpleLoading />;
    }

    // const offSwitch = (app: any) => {
    //     setSelectedApp(app);
    //     showConfirm(true);
    // };
    //
    // const onSwitch = (app: any) => {
    //     setSelectedApp(app);
    // };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>, app: any) => {
        if (!event.target.checked) {
            setSelectedApp(app);
            showConfirm(true);
        } else {
            mutate({ id: app.appUserId, status: true });
            setSelectedApp(app);
        }
    };

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Rectangle className="rectangle" height={'100%'} backgroundColor={'#ffffff'} borderRadius={'0.5em'}>
                        <TablePro columns={columns} data={dataTab} />
                    </Rectangle>
                </Grid>
            </Grid>
            <ConfirmDialog
                title={'Disable this app?'}
                subTitle={`${selectedApp.appName} will no longer use your information`}
                cancel={() => showConfirm(false)}
                confirm={() => mutate({ id: selectedApp.appUserId, status: false })}
                cancelText={'Cancel'}
                confirmText={'Disable'}
            />
        </>
    );
};

export default ListApp;
