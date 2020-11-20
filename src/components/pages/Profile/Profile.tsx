import React, { useState, useRef, useEffect } from 'react';
import { Grid, Divider } from '@material-ui/core';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSnackbar } from 'notistack';
import { Space, Text, ColorfulIcon, FormControl } from '../../elements/StyledUtils';
import { useAuth, useDarkMode, useDrop } from '../../../hooks';
import { TextInput } from '../../elements/TextField';
import { ButtonPro } from '../../elements/Button';
import { resizeFile } from '../../../helpers';
import { updateProfile } from '../../../services/profileService';
import useDrag from '../../../hooks/useDrag';
import { ImgField, FormContainer, Circle, ButtonField } from './styled/Profile.styled';

const schema = yup.object().shape({
    displayName: yup.string().required('Display name is required'),
});

const Profile = () => {
    const darkMode = useDarkMode();
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(schema),
    });
    const [avatar, setAvatar] = useState<any>('');
    const [previewImg, setPreviewImg] = useState<any>('');
    const { getUser } = useAuth();
    const inputRef = useRef(null);
    const { onDrop } = useDrop(inputRef);
    const [displayName, setDisplayName] = useState('');
    const { enqueueSnackbar } = useSnackbar();
    const queryClient = useQueryClient();
    const { data } = useQuery('getUser', getUser);
    const { mutate } = useMutation(updateProfile, {
        onSuccess: async (data) => {
            await queryClient.invalidateQueries('getUser');
            enqueueSnackbar(data.data.message, { variant: 'success' });
        },
        onError: (err: any) => {
            console.log('err', err);
            const msg = err.data.message || err.message;
            enqueueSnackbar(msg, { variant: 'error' });
        },
    });

    useEffect(() => {
        if (data) {
            setDisplayName(data.data.payload.displayName);
            if (data.data.payload.avatar) {
                setPreviewImg(`${process.env.REACT_APP_BACKEND}${data.data.payload.avatar}`);
            }
        }
    }, [data]);

    onDrop(async (event: any) => {
        event.preventDefault();
        const nextData = event.dataTransfer.files[0];
        if (nextData) {
            const reader = new FileReader() as any;
            reader.addEventListener('load', async () => {
                setPreviewImg(reader.result);
            });
            const compressed = (await resizeFile(nextData, 195, 259)) as any;
            compressed.lastModifiedDate = new Date();
            compressed.name = nextData.name;
            setAvatar(compressed);
            reader.readAsDataURL(compressed);
        }
    });

    const onChangeImg = async (e: React.ChangeEvent) => {
        if ((e.target as HTMLInputElement).files && (e.target as any).files.length) {
            const reader = new FileReader() as any;
            reader.addEventListener('load', () => {
                setPreviewImg(reader.result);
            });
            const compressed = (await resizeFile((e.target as any).files[0], 195, 259)) as any;
            compressed.lastModifiedDate = new Date();
            compressed.name = Date.now();
            setAvatar(compressed);
            reader.readAsDataURL(compressed);
        }
    };

    const onSubmit = async () => {
        console.log('submit');
        const formData = new FormData();
        if (avatar) {
            formData.append('avatar', avatar);
        }

        formData.append('displayName', displayName);
        await mutate({ formData });
    };

    return (
        <>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <FormContainer className="rectangle" height={'auto'} backgroundColor={'#ffffff'} borderRadius={'0.5em'}>
                    <Text fontSize={'1.5em'} fontWeight={600} lineHeight={'1em'}>
                        Your profile
                    </Text>
                    <Space display={'block'} height={'2em'} />
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <ImgField>
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="raised-button-file"
                                multiple
                                type="file"
                                onChange={onChangeImg}
                            />
                            <label htmlFor="raised-button-file" ref={inputRef}>
                                {!previewImg && (
                                    <Circle
                                        backgroundColor={'#EEEEEE'}
                                        height={'5em'}
                                        width={'5em'}
                                        borderRadius={'50%'}
                                    >
                                        <ColorfulIcon
                                            color={'#405BF5'}
                                            darkModeColor={'#111728'}
                                            darkMode={darkMode.value}
                                        >
                                            <PhotoCamera />
                                        </ColorfulIcon>
                                    </Circle>
                                )}
                                {previewImg && <img src={previewImg} alt="" />}

                                <Space display={'block'} height={'1em'} />

                                <Text>Change your profile</Text>
                            </label>
                        </ImgField>
                        <FormControl>
                            <label htmlFor="name">
                                <Text>Your name</Text>
                            </label>
                            <Space display={'block'} height={'1em'} />
                            <TextInput
                                customprops={{
                                    backgroundColor: '#EEEEEE',
                                    borderRadius: 5,
                                }}
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                variant={'outlined'}
                                fullWidth
                                name={'displayName'}
                                inputRef={register}
                                error={!!errors.displayName}
                            />
                        </FormControl>
                        <Space display={'block'} height={'1em'} />
                        <Divider light />
                        <ButtonField>
                            <ButtonPro
                                customprops={{
                                    backgroundColor: '#ffffff',
                                    color: '#405BF5',
                                    border: '1px solid #405BF5',
                                    width: '8em',
                                    borderRadius: 10,
                                }}
                            >
                                Cancel
                            </ButtonPro>
                            <ButtonPro
                                type={'submit'}
                                customprops={{
                                    width: '8em',
                                    borderRadius: 10,
                                }}
                            >
                                Save
                            </ButtonPro>
                        </ButtonField>
                    </form>
                </FormContainer>
            </Grid>
        </>
    );
};

export default Profile;
