
import { JWT } from "@/lib/jwt/jwt";
import { SIGN_IN_URL } from "./urls";

export const login = async <T>(params: T): Promise<JWT> => {
    const headers = new Headers();
    headers.delete('content-length');
    headers.set('Content-Type','application/json');
    
    return fetch(SIGN_IN_URL, {
        method: 'POST',
        headers,
        body: JSON.stringify(params)
    }).then(res => res.json());
}