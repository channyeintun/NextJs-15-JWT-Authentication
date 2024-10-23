import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { signInAction } from "./actions"

export default function SignInPage() {

    return (
        <main className="grid w-screen h-screen place-items-center">
            <form action={signInAction} className="min-w-80 flex flex-col gap-5">
                <h1 className="text-center text-2xl font-bold">Sign In</h1>
                <Input name="mobileNumber" placeholder="Phone Number" required />
                <Input name="password" placeholder="Password" type="password" required />
                <Button type='submit'>Sign In</Button>
            </form>
        </main>
    )
}