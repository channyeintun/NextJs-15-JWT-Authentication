'use server'

import { z } from 'zod'
import { redirect } from 'next/navigation';
import { setSession } from '@/lib/auth/session';
import { login } from '@/services/authentication/login';

const loginSchema = z.object({
    mobileNumber: z.string().min(1),
    password: z.string().min(1)
})

export async function signInAction(formData: FormData) {
    const validatedFields = loginSchema.safeParse({
        mobileNumber: formData.get('mobileNumber'),
        password: formData.get('password')
    })

    if (!validatedFields.success) {
        return;
    }

    const jwt = await login<z.infer<typeof loginSchema>>(validatedFields.data).catch(err => (console.error(err), null));
    if (jwt && jwt.accessToken) {
        await setSession(jwt);
        redirect('/')
    }
}