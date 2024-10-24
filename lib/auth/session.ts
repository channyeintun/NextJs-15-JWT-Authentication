import { cookies } from 'next/headers'

import { JWT } from '../jwt/jwt';
import { getExpiredTime } from '../utils';

const AUTH_COOKIE_NAME = 'authCookie'

export const getSession = async () => {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get(AUTH_COOKIE_NAME);
    if (authCookie && authCookie.value) {
        const jwt: JWT = JSON.parse(authCookie.value);
        return {
            token: jwt.accessToken
        };
    }
    return undefined;
}

export const setSession = async (jwt: JWT) => {
    const duration = getExpiredTime(jwt.expiration);
    (await cookies()).set(AUTH_COOKIE_NAME, JSON.stringify(jwt), {
        expires: duration,
        httpOnly:false,
        maxAge:duration,
    });
}