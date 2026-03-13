'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { cocart, CartItem } from '@/lib/cocart';
import { parsePrice } from '@/lib/utils';

interface CartState {
    cartItems: CartItem[];
    subtotal: string; // We'll keep this as a string but ensure it's parseable
    isCartOpen: boolean;
    cartKey: string | null;
    isLoading: boolean;

    // Actions
    setCartOpen: (open: boolean) => void;
    fetchCart: () => Promise<void>;
    addItem: (productId: number, quantity?: number) => Promise<void>;
    updateQuantity: (itemKey: string, quantity: number) => Promise<void>;
    removeItem: (itemKey: string) => Promise<void>;
    clearCart: () => Promise<void>;
}


export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            cartItems: [],
            subtotal: '0',
            isCartOpen: false,
            cartKey: null,
            isLoading: false,

            setCartOpen: (open) => set({ isCartOpen: open }),

            fetchCart: async () => {
                set({ isLoading: true });
                try {
                    const data = await cocart.getCart(get().cartKey || undefined);
                    if (data.cart_key && !get().cartKey) {
                        set({ cartKey: data.cart_key });
                    }

                    const items = Array.isArray(data.items) ? data.items : Object.values(data.items || {});

                    // Calculate subtotal from line items to verify API total
                    const itemsSum = (items as CartItem[]).reduce((acc, item) => {
                        return acc + (parsePrice(item.price) * item.quantity.value);
                    }, 0);

                    // API Totals can be in minor units (e.g., 190500 instead of 1905.00)
                    const rawApiTotal = data.totals?.total || data.totals?.subtotal || '0';
                    const parsedApiTotal = parsePrice(rawApiTotal);

                    let finalSubtotal = itemsSum;

                    // If API total is exactly 100x itemsSum (or very close), trust the itemsSum or divide API total
                    // This handles cases where API returns 190500 and itemsSum is 1905
                    if (parsedApiTotal > 0 && itemsSum > 0 && Math.abs(parsedApiTotal / 100 - itemsSum) < 0.1) {
                        finalSubtotal = itemsSum;
                    } else if (parsedApiTotal > 0 && itemsSum === 0) {
                        // Fallback: if we have an API total but no items (unlikely here but safe), 
                        // we still might need to guess if it's minor units. 
                        // But usually, trust itemsSum if items exist.
                        finalSubtotal = parsedApiTotal;
                    }

                    set({
                        cartItems: items as CartItem[],
                        subtotal: finalSubtotal.toFixed(2)
                    });
                } catch (error) {
                    console.error('Failed to fetch cart:', error);
                } finally {
                    set({ isLoading: false });
                }
            },

            addItem: async (productId: number, quantity: number = 1) => {
                set({ isLoading: true });
                try {
                    const data = await cocart.addToCart(productId, quantity, get().cartKey || undefined);
                    if (data.cart_key && !get().cartKey) {
                        set({ cartKey: data.cart_key });
                    }
                    await get().fetchCart();
                    set({ isCartOpen: true });
                } catch (error) {
                    console.error('Failed to add item:', error);
                } finally {
                    set({ isLoading: false });
                }
            },

            updateQuantity: async (itemKey: string, quantity: number) => {
                const previousItems = get().cartItems;
                const previousSubtotal = get().subtotal;

                // Optimistically update the UI
                const newItems = previousItems.map(item => {
                    if (item.item_key === itemKey) {
                        const unitPrice = parsePrice(item.price);
                        const newLineTotal = unitPrice * quantity;
                        return {
                            ...item,
                            quantity: { ...item.quantity, value: quantity },
                            totals: {
                                ...item.totals,
                                total: newLineTotal.toFixed(2),
                                subtotal: newLineTotal.toFixed(2)
                            }
                        };
                    }
                    return item;
                });

                // Calculate new subtotal accurately
                const totalAmount = newItems.reduce((acc, item) => {
                    const price = parsePrice(item.price);
                    return acc + (price * item.quantity.value);
                }, 0);

                set({
                    cartItems: newItems,
                    subtotal: totalAmount.toFixed(2)
                });

                try {
                    await cocart.updateItem(itemKey, quantity, get().cartKey || undefined);
                    await get().fetchCart();
                } catch (error) {
                    console.error('Failed to update quantity:', error);
                    set({ cartItems: previousItems, subtotal: previousSubtotal });
                }
            },

            removeItem: async (itemKey: string) => {
                const previousItems = get().cartItems;
                const previousSubtotal = get().subtotal;

                const newItems = previousItems.filter(item => item.item_key !== itemKey);
                const totalAmount = newItems.reduce((acc, item) => {
                    const price = parsePrice(item.price);
                    return acc + (price * item.quantity.value);
                }, 0);

                set({
                    cartItems: newItems,
                    subtotal: totalAmount.toFixed(2)
                });

                try {
                    await cocart.removeItem(itemKey, get().cartKey || undefined);
                    await get().fetchCart();
                } catch (error) {
                    console.error('Failed to remove item:', error);
                    set({ cartItems: previousItems, subtotal: previousSubtotal });
                }
            },

            clearCart: async () => {
                set({ isLoading: true });
                try {
                    // Assuming we might have an API endpoint to clear cart in cocart,
                    // but since the objective says "clear the Zustand cart", 
                    // we might just clear local state and cartKey.
                    if (get().cartKey) {
                        try {
                            await cocart.clearCart(get().cartKey!);
                        } catch (e) {
                            // Ignore clearCart API errors if endpoint doesn't exist
                        }
                    }
                    set({
                        cartItems: [],
                        subtotal: '0',
                        cartKey: null,
                    });
                } catch (error) {
                    console.error('Failed to clear cart:', error);
                } finally {
                    set({ isLoading: false });
                }
            }
        }),
        {
            name: 'cart-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ cartKey: state.cartKey }), // Only persist the cartKey
        }
    )
);
