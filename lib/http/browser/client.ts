'use client';

import axios from "axios";
import Cookies from "js-cookie";
import { BACKEND_URL } from "@/lib/backendUrl";
import { setToken } from "./setToken";
import { setInterceptor } from "./setInterceptor";
import { JWT } from "@/lib/jwt/jwt";

const AUTH_COOKIE_NAME = 'authCookie'

const httpClient = axios.create({
    baseURL: BACKEND_URL,
});

httpClient.defaults.headers["Cache-Control"] = "no-cache";
httpClient.defaults.headers["Pragma"] = "no-cache";
httpClient.defaults.headers["Expires"] = "0";

const authCookie = Cookies.get(AUTH_COOKIE_NAME);

if (authCookie) {
    const jwt: JWT = JSON.parse(authCookie);
    setToken(httpClient, jwt.accessToken);
    setInterceptor(httpClient);
}

export { httpClient };