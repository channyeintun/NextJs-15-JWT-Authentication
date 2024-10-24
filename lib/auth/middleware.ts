import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { JWT } from '../jwt/jwt';
import { verifyJwt } from './verifyJwt';
import { protectedRoutes } from './protectedRoutes';
import { getExpiredTime } from '../utils';
import { AUTH_COOKIE_NAME } from '../cookie/cookieName';
import { curryRefresh } from './curryRefresh';

export async function authMiddleware(request: NextRequest) {
    let res = NextResponse.next();
    const { pathname } = request.nextUrl;
    const cookieStore = await cookies();
    const authCookie = cookieStore.get(AUTH_COOKIE_NAME);
    const isProtectedRoute = protectedRoutes.some(route => pathname.includes(route))

    if (authCookie && authCookie.value) {
        const jwt: JWT = JSON.parse(authCookie.value);
        const verifiedJwt = await verifyJwt(jwt).then(curryRefresh(jwt));

        if (verifiedJwt) {
            const duration = getExpiredTime(jwt.expiration);

            res.cookies.set({
                name: AUTH_COOKIE_NAME,
                value: JSON.stringify(verifiedJwt),
                expires: duration,
                httpOnly: false,
                maxAge: duration,
            });

            const isSignInPage = pathname.startsWith('/sign-in');
            if (isSignInPage) {
                return NextResponse.redirect(new URL('/', request.url));
            }
        } else {
            res.cookies.delete(AUTH_COOKIE_NAME);
            if (isProtectedRoute) {
                return NextResponse.redirect(new URL('/sign-in', request.url));
            }
        }
    } else if (isProtectedRoute) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }
    return res;
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};