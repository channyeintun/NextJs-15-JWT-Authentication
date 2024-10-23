'use client'

import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { JWT } from '@/lib/auth/jwt'
import { useRouter } from 'next/navigation'

const AUTH_COOKIE_NAME = 'authCookie'

type SessionState = {
  loading: boolean;
  token: string | null;
}

type Logout = () => void

export function useSession(): SessionState & { logout: Logout } {

  const router = useRouter();

  const [sessionState, setSessionState] = useState<SessionState>({
    loading: true,
    token: null,
  })

  useEffect(() => {
    const authCookie = Cookies.get(AUTH_COOKIE_NAME);
    let token;
    if (authCookie) {
      const jwt: JWT = JSON.parse(authCookie);
      token = jwt.accessToken;
    }
    setSessionState({ loading: false, token: token || null })
  }, [])

  const logout = () => {
    Cookies.remove(AUTH_COOKIE_NAME);
    router.push('/');
  }

  return { ...sessionState, logout }
}