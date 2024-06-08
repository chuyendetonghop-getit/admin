import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SignJWT, jwtVerify, type JWTPayload } from "jose";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ------------------------------

// ------------------------------
