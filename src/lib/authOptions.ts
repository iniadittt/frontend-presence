import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { getMyProfile, login } from "./services/user";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            type: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, request) {
                if (!credentials?.email || !credentials?.password) return null;
                const responseLogin = await login({
                    email: credentials.email,
                    password: credentials.password,
                });
                if (responseLogin.code !== 200) throw new Error(responseLogin.message)
                const user = responseLogin.data
                const responseAccount = await getMyProfile(user.token);
                if (responseAccount.code !== 200) throw new Error(responseAccount.message)
                const account = responseAccount.data
                return { ...user, ...account };
            }
        }),
    ],
    callbacks: {
        async jwt({ token, user, session, trigger }) {
            if (trigger === "update") return { ...token, ...session.user };
            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user = token as any;
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
};
