import { httpClient } from '../helpers';
import { Response } from './typeService';

export const listApp = async (): Promise<Response> => {
    return await httpClient.get('/app/list');
};

export const createApp = async ({ appName }: { appName: string }): Promise<Response> => {
    return await httpClient.post('/app/create', { appName });
};

export const getInfo = async (key: string, { id }: { id: string }): Promise<Response> => {
    return await httpClient.get(`app/info?id=${id}`);
};

export const getUsers = async (key: string, { id }: { id: string }): Promise<Response> => {
    return await httpClient.get(`app/getUsers?id=${id}`);
};

export const regenerateKey = async (id: string): Promise<Response> => {
    return await httpClient.post(`app/regenerate`, { id });
};
