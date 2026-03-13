'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface WishlistItem {
    id: number | string;
    name: string;
    price: string;
    image?: string;
    slug: string;
}

interface WishlistState {
    items: WishlistItem[];
    addItem: (item: WishlistItem) => void;
    removeItem: (id: number | string) => void;
    toggleItem: (item: WishlistItem) => void;
    isInWishlist: (id: number | string) => boolean;
    clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (item) => {
                if (!get().isInWishlist(item.id)) {
                    set({ items: [item, ...get().items] });
                }
            },

            removeItem: (id) => {
                set({ items: get().items.filter((i) => i.id !== id) });
            },

            toggleItem: (item) => {
                if (get().isInWishlist(item.id)) {
                    get().removeItem(item.id);
                } else {
                    get().addItem(item);
                }
            },

            isInWishlist: (id) => {
                return get().items.some((i) => i.id === id);
            },

            clearWishlist: () => {
                set({ items: [] });
            },
        }),
        {
            name: 'wishlist-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
