import { httpClient } from '../helpers';
import { Response } from './typeService';

export const updateProfile = async ({ formData }: { formData: FormData }): Promise<Response> => {
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
        },
    };
    return await httpClient.post('/users/updateInfo', formData, config);
};
