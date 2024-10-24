
import { JWT } from "@/lib/jwt/jwt";
import { REFRESH_URL } from "@/services/authentication/urls";

export type RefreshParams = {
    refreshToken: string;
}

export const refresh = async (params: RefreshParams): Promise<JWT> => {
    const headers = new Headers();
    headers.delete('content-length');
    headers.set('Content-Type', 'application/json');

    return fetch(REFRESH_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(params)
    }).then(res => res.json());
}