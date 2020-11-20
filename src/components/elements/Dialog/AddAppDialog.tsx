import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from 'react-query';
import { useSnackbar } from 'notistack';
import { TextInput } from '../TextField';
import { OneLineButton, LabelField } from '../StyledUtils';
import { ButtonPro } from '../Button';
import { createApp } from '../../../services/appService';
import { dialogAtom } from '../../../recoil/atom';
import CommonDialog from './CommonDialog';
import { AddAppDialogContent, InputFieldEx } from './styled/AddAppDialog.styled';
import { Title } from './styled/CommonDialog.styled';

const schema = yup.object().shape({
    appName: yup.string().required('App name is required'),
});
interface Props {
    refetch: () => void;
}
export const AddAppDialog: React.FC<Props> = ({ refetch }: Props) => {
    const [open, setOpen] = useRecoilState(dialogAtom('dialog/addApp'));
    const [appName, setAppName] = useState('');
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
    });
    const { enqueueSnackbar } = useSnackbar();
    const { mutate } = useMutation(createApp, {
        onSuccess: ({ data }) => {
            setOpen(false);
            setAppName('');
            refetch();
            enqueueSnackbar(data.message, { variant: 'success' });
        },
        onError: (err: any) => {
            const msg = err.data.message || err.message;
            enqueueSnackbar(msg, { variant: 'error' });
        },
    });

    const onSubmit = async () => {
        await mutate({ appName });
    };

    return (
        <CommonDialog open={open} setOpen={setOpen}>
            <AddAppDialogContent>
                <Title>Add New App</Title>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <InputFieldEx>
                        <LabelField color={'#000000'}>
                            <label>App name</label>
                        </LabelField>
                        <TextInput
                            value={appName}
                            onChange={(e) => setAppName(e.target.value)}
                            placeholder={errors.appName?.message}
                            name={'appName'}
                            inputRef={register}
                            error={!!errors.appName}
                            customprops={{ backgroundColor: '#EEEEEE', errorColor: '#DC7171' }}
                            fullWidth
                            variant={'outlined'}
                        />
                    </InputFieldEx>
                    <OneLineButton>
                        <ButtonPro customprops={{ borderRadius: 4 }} onClick={() => setOpen(false)} fullWidth>
                            Cancel
                        </ButtonPro>
                        <ButtonPro type={'submit'} customprops={{ borderRadius: 4 }} fullWidth>
                            Save
                        </ButtonPro>
                    </OneLineButton>
                </form>
            </AddAppDialogContent>
        </CommonDialog>
    );
};
