import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { JWT } from "./jwt";

dayjs.extend(utc);

export const verifyJwt = (jwt:JWT)=>{
    const expirationDate = dayjs.utc(jwt.expiration);

    const now = dayjs.utc();

    const hasExpired = expirationDate.isBefore(now);

    return hasExpired ? undefined : jwt;
}