'use server';

import { BACKEND_URL } from "@/lib/backendUrl";
import { AUTH_COOKIE_NAME } from "@/lib/cookie/cookieName";
import { JWT } from "@/lib/jwt/jwt";
import axios from "axios";
import { cookies } from "next/headers";

export async function httpClient(customHeaders?: Record<string, string>) {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get(AUTH_COOKIE_NAME);

    const jwt: JWT | undefined = authCookie ? JSON.parse(authCookie.value) : undefined;

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        'Authorization': jwt ? `Bearer ${jwt.accessToken}` : '',
        ...customHeaders,
    };

    const client = axios.create({
        baseURL: BACKEND_URL,
        headers
    });
    
    client.defaults.headers["Cache-Control"] = "no-cache";
    client.defaults.headers["Pragma"] = "no-cache";
    client.defaults.headers["Expires"] = "0";
    return client;
}