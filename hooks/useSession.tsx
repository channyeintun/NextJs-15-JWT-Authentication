'use client'

import { useState } from 'react'
import Cookies from 'js-cookie'

import { useRouter } from 'next/navigation'
import { getToken } from '@/lib/cookie/getToken'
import { AUTH_COOKIE_NAME } from '@/lib/cookie/cookieName'
import { httpClient } from '@/lib/http/browser/client'

type SessionState = {
  token: string | null;
}

type LogoutParams = {
  redirect?: boolean; path?: string;
}

type Logout = (params?: LogoutParams) => void

export function useSession(): SessionState & { logout: Logout } {

  const router = useRouter();

  const [sessionState, setSessionState] = useState<SessionState>({
    token: getToken(),
  })

  const logout = (params: LogoutParams = { redirect: true, path: '/' }) => {
    Cookies.remove(AUTH_COOKIE_NAME);
    setSessionState({ token: null });
    httpClient.removeToken();
    params.redirect && router.push(params.path!);
  }

  return { ...sessionState, logout }
}