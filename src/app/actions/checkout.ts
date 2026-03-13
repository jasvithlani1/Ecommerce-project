'use server';

import { auth } from '@/auth';
import { woocommerce, CustomerData } from '@/lib/woocommerce';
import { CartItem } from '@/lib/cocart';

export async function processCheckout(
    customerData: CustomerData,
    cartItems: CartItem[]
) {
    try {
        const session = await auth();
        let customerId = 0;

        // If the user is authenticated via WordPress, they might have an ID.
        // For Google/Credentials, let's at least link the email.
        // The WooCommerce REST API can sometimes accept user_id = 0 for guests and use the email.
        // We'll pass 0 for now unless we know their WP user ID explicitly.

        // Ensure cart is not empty
        if (!cartItems || cartItems.length === 0) {
            return { success: false, error: 'Your cart is empty' };
        }

        // Mock checkout: Call WooCommerce API directly to create the order
        const order = await woocommerce.createOrder(customerData, cartItems, customerId);

        if (order && order.id) {
            return { success: true, orderId: order.id.toString() };
        } else {
            return { success: false, error: 'Failed to create order.' };
        }

    } catch (error: any) {
        console.error('Checkout error:', error);
        return { success: false, error: error.message || 'An unexpected error occurred during checkout.' };
    }
}
