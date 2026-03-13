"use server"

import { signIn, signOut } from "@/auth"
import { AuthError } from "next-auth"

export async function loginWithCredentials(formData: FormData) {
    try {
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        await signIn("credentials", {
            username,
            password,
            redirectTo: "/profile",
        });
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials.";
                default:
                    return "Something went wrong.";
            }
        }
        throw error;
    }
}

export async function loginWithGoogle() {
    await signIn("google", { redirectTo: "/profile" });
}

export async function handleSignOut() {
    await signOut({ redirectTo: "/" });
}
