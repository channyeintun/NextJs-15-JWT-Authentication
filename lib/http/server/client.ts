'use server';

import { BACKEND_URL } from "@/lib/backendUrl";
import { JWT } from "@/lib/jwt/jwt";
import axios from "axios";
import { cookies } from "next/headers";

const AUTH_COOKIE_NAME = 'authCookie';

export async function httpClient(customHeaders?: Record<string, string>) {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get(AUTH_COOKIE_NAME);

    const jwt: JWT | undefined = authCookie ? JSON.parse(authCookie.value) : undefined;

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Authorization': jwt ? `Bearer ${jwt.accessToken}` : '',
        ...customHeaders,
    };

    return axios({
        baseURL: BACKEND_URL,
        headers
    });
}