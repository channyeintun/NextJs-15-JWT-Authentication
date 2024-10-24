import { refresh } from "@/services/authentication/refresh";
import { JWT } from "@/lib/jwt/jwt";

export const curryRefresh = (jwt: JWT) => async (result: JWT | undefined) => {
    if (!result) {
        return await refresh({ refreshToken: jwt.refreshToken });
    }
    return result
}