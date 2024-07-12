

import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            name: string;
            email: string;
            token: string;
            role: string;
            iat: number;
            exp: number;
            jti: string;
        };
    }
}