import axios, { AxiosInstance } from "axios";
import Cookies from 'js-cookie';
import { JWT } from "@/lib/jwt/jwt";
import { setToken } from "./setToken";
import { SIGN_IN_URL } from "@/services/authentication/urls";
import { refresh } from "@/services/authentication/refresh";
import { AUTH_COOKIE_NAME } from "@/lib/cookie/cookieName";

let refreshing_token: Promise<JWT> | undefined;
export function setInterceptor(httpClient: AxiosInstance) {
    httpClient.interceptors.response.use(
        (response) => response,
        async (error) => {
            const authCookie = Cookies.get(AUTH_COOKIE_NAME);
            const jwt: JWT = authCookie ? JSON.parse(authCookie) : undefined;

            const originalRequest = error.config;

            if (
                error.response &&
                error.response.status === 401 &&
                !originalRequest._retry &&
                originalRequest.url !== SIGN_IN_URL
            ) {
                originalRequest._retry = true;

                try {
                    if (jwt && jwt.refreshToken) {
                        refreshing_token = refreshing_token ?? refresh({ refreshToken: jwt.refreshToken });
                        const newJwt = await refreshing_token;
                        if (newJwt && newJwt.accessToken) {
                            Cookies.set(AUTH_COOKIE_NAME, JSON.stringify(newJwt));
                            setToken(httpClient, newJwt.accessToken);
                            const bearToken = `Bearer ${newJwt.accessToken}`;
                            axios.defaults.headers.common.Authorization = bearToken;
                            originalRequest.headers["Authorization"] = bearToken;
                        } else {
                            const err= new Error(
                                "Unknown problem occurred with current session. Try to log in again.",
                            );
                            return Promise.reject(err);
                        }
                    }

                    return httpClient(originalRequest);
                } catch (refreshError) {
                    console.error("Refresh token failed:", refreshError);
                    return Promise.reject(refreshError);
                }
            }

            return Promise.reject(error);
        },
    );
}
