import axios, { AxiosResponse } from 'axios';
import humps from 'humps';

const httpClient = axios.create({ baseURL: process.env.REACT_APP_BACKEND });

httpClient.interceptors.request.use(async (config) => {
    const stringToken = window.localStorage.getItem('token');
    config.headers['x-iceteaid-apikey'] = 'xxx';
    if (stringToken) {
        const token = JSON.parse(stringToken);
        if (token) {
            config.headers.authorization = 'Bearer ' + token.token;
        }
    }
    return config;
});

httpClient.interceptors.response.use(
    (response) => {
        if (response.data.err) {
            if (response.data.status === 401) {
                window.location.href = '/';
            }
            return Promise.reject(response);
        }
        const camelizeKeys = humps.camelizeKeys({ ...response }) as AxiosResponse;
        return Promise.resolve(camelizeKeys);
    },
    async (error) => {
        return Promise.reject(error.response);
    },
);
export default httpClient;
