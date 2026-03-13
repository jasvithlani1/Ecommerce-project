/**
 * Auth API Client for WordPress JWT Authentication
 */

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.replace('/graphql', '') || 'https://chaukhambhabooks.com';
const AUTH_API_URL = `${WORDPRESS_URL}/wp-json/jwt-auth/v1`;
const WP_API_URL = `${WORDPRESS_URL}/wp-json/wp/v2`;

export interface AuthUser {
    id: number;
    username: string;
    email: string;
    nicename: string;
    display_name: string;
}

export interface AuthTokenResponse {
    token: string;
    user_email: string;
    user_nicename: string;
    user_display_name: string;
}

export const authApi = {
    /**
     * Authenticate user and return JWT token
     */
    async login(username: string, password: string): Promise<AuthTokenResponse> {
        const response = await fetch(`${AUTH_API_URL}/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed');
        }

        return data;
    },

    /**
     * Validate current token
     */
    async validateToken(token: string): Promise<boolean> {
        const response = await fetch(`${AUTH_API_URL}/token/validate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        return response.ok;
    },

    /**
     * Fetch user profile details
     */
    async getMe(token: string): Promise<AuthUser> {
        const response = await fetch(`${WP_API_URL}/users/me`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch user profile');
        }

        return data;
    },

    /**
     * Register a new user
     */
    async signUp(username: string, email: string, password: string): Promise<any> {
        const response = await fetch(`${WP_API_URL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            // WordPress error messages are often in data.message
            throw new Error(data.message || 'Signup failed. Please check your details.');
        }

        return data;
    }
};
