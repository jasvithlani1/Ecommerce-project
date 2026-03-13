import { CartItem } from './cocart';

const WORDPRESS_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.replace('/graphql', '') || 'https://chaukhambhabooks.com';
const WC_CONSUMER_KEY = process.env.WC_CONSUMER_KEY;
const WC_CONSUMER_SECRET = process.env.WC_CONSUMER_SECRET;

export interface CustomerData {
    first_name: string;
    last_name: string;
    address_1: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
}

export interface WCOrder {
    id: number;
    status: string;
    currency: string;
    date_created: string;
    total: string;
    line_items: Array<{
        name: string;
        product_id: number;
        quantity: number;
        subtotal: string;
        total: string;
    }>;
}

const getAuthHeader = () => {
    if (!WC_CONSUMER_KEY || !WC_CONSUMER_SECRET) {
        throw new Error('WooCommerce Consumer Key or Secret is missing in environment variables.');
    }
    return 'Basic ' + Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString('base64');
};

export const woocommerce = {
    async createOrder(customerData: CustomerData, cartItems: CartItem[], customerId?: number) {
        const url = `${WORDPRESS_URL}/wp-json/wc/v3/orders`;

        const lineItems = cartItems.map(item => ({
            product_id: item.id,
            quantity: item.quantity.value
        }));

        const orderData = {
            payment_method: 'bacs', // Mock payment method
            payment_method_title: 'Direct Bank Transfer',
            set_paid: true, // We are mocking checkout, so we treat it as paid
            billing: { ...customerData },
            shipping: { ...customerData },
            line_items: lineItems,
            customer_id: customerId || 0, // 0 for guest
        };

        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getAuthHeader()
            },
            body: JSON.stringify(orderData),
        });

        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Failed to create WooCommerce order');
        }

        return res.json();
    },

    async getCustomerOrders(customerEmail: string): Promise<WCOrder[]> {
        // Fetch orders by email if customer ID isn't directly matching WC customer base perfectly,
        // or we could use customer_id if we synced them exactly. 
        // For headless, filtering by email is often more robust for guests vs registered.
        const url = `${WORDPRESS_URL}/wp-json/wc/v3/orders?search=${encodeURIComponent(customerEmail)}`;

        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getAuthHeader()
            },
            cache: 'no-store'
        });

        if (!res.ok) {
            console.error('Failed to fetch orders:', await res.text());
            return [];
        }

        return res.json();
    }
};
