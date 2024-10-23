'use client'

import { Button } from "@/components/ui/button"
import { useSession } from "@/hooks/useSession"

export const Logout = () => {
    const { loading, logout } = useSession();
    return loading || <Button onClick={logout}>Logout</Button>
}