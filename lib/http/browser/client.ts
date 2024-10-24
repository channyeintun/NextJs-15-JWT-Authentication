'use client';

import axios from "axios";
import Cookies from "js-cookie";
import { BACKEND_URL } from "@/lib/backendUrl";
import { setToken } from "./setToken";
import { setInterceptor } from "./setInterceptor";
import { JWT } from "@/lib/jwt/jwt";
import { AUTH_COOKIE_NAME } from "@/lib/cookie/cookieName";
import { removeToken } from "./removeToken";

const axiosInstance = axios.create({
    baseURL: BACKEND_URL,
});

axiosInstance.defaults.headers["Cache-Control"] = "no-cache";
axiosInstance.defaults.headers["Pragma"] = "no-cache";
axiosInstance.defaults.headers["Expires"] = "0";

const authCookie = Cookies.get(AUTH_COOKIE_NAME);

if (authCookie) {
    const jwt: JWT = JSON.parse(authCookie);
    setToken(axiosInstance, jwt.accessToken);
    setInterceptor(axiosInstance);
}

const httpClient = Object.assign(axiosInstance, { removeToken }, {});

export { httpClient };