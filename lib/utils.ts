import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getExpiredTime(expiration:string){
  const expirationTime = dayjs.utc(expiration);
  const currentTime = dayjs.utc();
  const duration = expirationTime.diff(currentTime);
  return duration;
}