import { httpClient } from '../helpers';
import { Response } from './typeService';

export const sendOtp = async ({ email }: { email: string }): Promise<Response> => {
    return await httpClient.post('/account/sendOtp', { emailOrPhone: email, channel: 'email' });
};

export const verifyOtp = async ({ email, verifyCode }: { email: string; verifyCode: string }): Promise<Response> => {
    return await httpClient.post('/account/verifyOtp', { emailOrPhone: email, channel: 'email', verifyCode });
};

export const getMetaData = async (): Promise<Response> => {
    return await httpClient.get('/users/metadata');
};
