'use client';

import Cookies from 'js-cookie'
import { JWT } from '@/lib/jwt/jwt'
import { AUTH_COOKIE_NAME } from './cookieName';

export function getToken() {
    const authCookie = Cookies.get(AUTH_COOKIE_NAME);
    let token = null;
    if (authCookie) {
      const jwt: JWT = JSON.parse(authCookie);
      token = jwt.accessToken;
    }
    return token;
  }