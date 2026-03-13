'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    price: string;
    image?: string;
}

export interface MockOrder {
    id: string;
    date: string;
    total: string;
    status: 'Processing' | 'Shipped' | 'Delivered';
    items: OrderItem[];
    shippingDetails: {
        firstName: string;
        lastName: string;
        address: string;
        city: string;
    };
}

interface OrderState {
    orders: MockOrder[];
    addOrder: (order: MockOrder) => void;
    clearOrders: () => void;
}

export const useOrderStore = create<OrderState>()(
    persist(
        (set) => ({
            orders: [],
            addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
            clearOrders: () => set({ orders: [] }),
        }),
        {
            name: 'order-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
