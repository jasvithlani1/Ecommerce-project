import { auth } from "@/auth"

export default auth((req) => {
    const isLoggedIn = !!req.auth
    const { nextUrl } = req

    const isProtectedRoute =
        nextUrl.pathname.startsWith("/profile") ||
        nextUrl.pathname.startsWith("/account") ||
        nextUrl.pathname.startsWith("/checkout")

    if (isProtectedRoute && !isLoggedIn) {
        return Response.redirect(new URL("/login", nextUrl))
    }
})

// Optionally, don't run middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
