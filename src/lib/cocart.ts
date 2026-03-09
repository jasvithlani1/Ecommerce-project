/**
 * CoCart API Helper
 * Documentation: https://docs.cocart.xyz/
 */

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.replace('/graphql', '') || 'https://chaukhambhabooks.com';
const COCART_URL = `${WORDPRESS_URL}/wp-json/cocart/v2`;

export interface CartItem {
    item_key: string;
    id: number;
    name: string;
    title: string;
    price: string;
    quantity: {
        value: number;
        min_purchase: number;
        max_purchase: number;
    };
    totals: {
        subtotal: string;
        total: string;
    };
    featured_image: string;
}

export interface CartTotals {
    subtotal: string;
    total: string;
}

export const cocart = {
    async getCart(cartKey?: string) {
        const url = new URL(`${COCART_URL}/cart`);
        if (cartKey) url.searchParams.append('cart_key', cartKey);

        const res = await fetch(url.toString(), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            cache: 'no-store'
        });
        return res.json();
    },

    async addToCart(productId: string | number, quantity: number = 1, cartKey?: string) {
        const url = new URL(`${COCART_URL}/cart/add-item`);
        if (cartKey) url.searchParams.append('cart_key', cartKey);

        const res = await fetch(url.toString(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: productId.toString(),
                quantity: quantity.toString()
            })
        });
        return res.json();
    },

    async updateItem(itemKey: string, quantity: number, cartKey?: string) {
        const url = new URL(`${COCART_URL}/cart/item/${itemKey}`);
        if (cartKey) url.searchParams.append('cart_key', cartKey);

        const res = await fetch(url.toString(), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity: quantity.toString() })
        });
        return res.json();
    },

    async removeItem(itemKey: string, cartKey?: string) {
        const url = new URL(`${COCART_URL}/cart/item/${itemKey}`);
        if (cartKey) url.searchParams.append('cart_key', cartKey);

        const res = await fetch(url.toString(), {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });
        return res.json();
    }
};
