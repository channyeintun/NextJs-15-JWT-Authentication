'use client'

import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { JWT } from '@/lib/jwt/jwt'
import { useRouter } from 'next/navigation'

const AUTH_COOKIE_NAME = 'authCookie'

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

function getToken() {
  const authCookie = Cookies.get(AUTH_COOKIE_NAME);
  let token = null;
  if (authCookie) {
    const jwt: JWT = JSON.parse(authCookie);
    token = jwt.accessToken;
  }
  return token;
}