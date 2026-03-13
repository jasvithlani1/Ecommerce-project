import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.replace('/graphql', '') || 'https://chaukhambhabooks.com';

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID || process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || process.env.AUTH_GOOGLE_SECRET,
        }),

        Credentials({
            name: "WordPress",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) return null;

                try {
                    const res = await fetch(`${WORDPRESS_URL}/wp-json/jwt-auth/v1/token`, {
                        method: "POST",
                        body: JSON.stringify({
                            username: credentials.username,
                            password: credentials.password,
                        }),
                        headers: { "Content-Type": "application/json" },
                    });

                    const data = await res.json();

                    if (res.ok && data.token) {
                        return {
                            id: data.user_email, // Using email as ID for credentials
                            name: data.user_display_name,
                            email: data.user_email,
                            accessToken: data.token,
                            nicename: data.user_nicename,
                        };
                    }
                    return null;
                } catch (error) {
                    console.error("Auth Error:", error);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user, account }) {
            // For Credentials provider, the user object returned from authorize() is available here on first call
            if (user) {
                token.accessToken = (user as any).accessToken;
                token.nicename = (user as any).nicename;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                (session.user as any).accessToken = token.accessToken;
                (session.user as any).nicename = token.nicename;
            }
            return session;
        },
    },
    pages: {
        signIn: "/login",
    },
    secret: process.env.AUTH_SECRET,
})
