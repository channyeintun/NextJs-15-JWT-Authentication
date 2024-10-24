'use client'

import { Button } from "@/components/ui/button"
import { useSession } from "@/hooks/useSession"

export const Logout = () => {
    const { logout } = useSession();
    return <Button onClick={() => logout()}>Logout</Button>
}