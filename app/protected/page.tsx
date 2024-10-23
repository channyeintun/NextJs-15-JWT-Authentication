import { Logout } from "./logout";

export default function ProtectedPage() {
    return (
        <main className="grid place-items-center w-screen h-screen">
            <div className="flex flex-col gap-8">
                <h1>Protected page</h1>
                <Logout />
            </div>
        </main>
    )
}