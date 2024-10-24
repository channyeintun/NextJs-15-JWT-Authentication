import { AxiosInstance } from 'axios';

export function setToken(httpClient: AxiosInstance, token: string) {
    httpClient.defaults.headers.Authorization = `Bearer ${token}`;
}
