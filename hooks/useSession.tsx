'use client'

import { useState } from 'react'
import Cookies from 'js-cookie'

import { useRouter } from 'next/navigation'
import { getToken } from '@/lib/cookie/getToken'
import { AUTH_COOKIE_NAME } from '@/lib/cookie/cookieName'

type SessionState = {
  token: string | null;
}

type Logout = ({ redirect, path }: { redirect: boolean; path: string; }) => void

export function useSession(): SessionState & { logout: Logout } {

  const router = useRouter();

  const [sessionState, setSessionState] = useState<SessionState>({
    token: getToken(),
  })

  const logout = ({ redirect = true, path = '/' }) => {
    Cookies.remove(AUTH_COOKIE_NAME);
    setSessionState({ token: null });
    redirect && router.push(path);
  }

  return { ...sessionState, logout }
}