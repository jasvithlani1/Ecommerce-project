import { auth } from "@/auth";
import { cocart } from "@/lib/cocart";

/**
 * Example of fetching the cart for an authenticated user
 * This should be called in a Server Component or Server Action
 */
export async function getAuthenticatedCart() {
    const session = await auth();

    // session.user.accessToken comes from our jwt/session callbacks in auth.ts
    const token = (session?.user as any)?.accessToken;

    if (!token) {
        // Fallback to guest cart or redirect
        return await cocart.getCart();
    }

    // Authenticated request
    return await cocart.getCart(undefined, token);
}

/**
 * Example of adding to cart as an authenticated user
 */
export async function addToAuthenticatedCart(productId: number, quantity: number) {
    const session = await auth();
    const token = (session?.user as any)?.accessToken;

    return await cocart.addToCart(productId, quantity, undefined, token);
}
