'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import Link from 'next/link';
import { formatINR, parsePrice } from '@/lib/utils';

export default function CartDrawer() {
    const { isCartOpen, setCartOpen, cartItems, subtotal, removeItem, updateQuantity, isLoading, fetchCart } = useCartStore();
    const drawerRef = useRef<HTMLDivElement>(null);

    // Fetch cart on mount if key exists
    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    // Close on escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setCartOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [setCartOpen]);

    // Prevent scrolling when open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isCartOpen]);

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setCartOpen(false)}
                        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        ref={drawerRef}
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md z-[101] glass-container rounded-none border-l border-white/10 flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="text-zinc-400" size={20} />
                                <h2 className="text-xl font-serif text-white uppercase tracking-widest">Your Bag</h2>
                            </div>
                            <button
                                onClick={() => setCartOpen(false)}
                                className="p-2 text-zinc-500 hover:text-white hover:bg-white/10 rounded-full transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Items List */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-600">
                                        <ShoppingBag size={32} />
                                    </div>
                                    <p className="text-zinc-500 font-sans tracking-widest uppercase text-xs">
                                        Your bag is currently empty
                                    </p>
                                </div>
                            ) : (
                                cartItems.map((item) => (
                                    <div key={item.item_key} className="flex gap-4 group">
                                        <div className="relative w-24 h-32 bg-zinc-900 rounded-lg overflow-hidden border border-white/5 shrink-0">
                                            {item.featured_image ? (
                                                <Image
                                                    src={item.featured_image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-zinc-700">
                                                    <ShoppingBag size={24} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 flex flex-col py-1">
                                            <div className="flex justify-between items-start">
                                                <h3 className="text-white font-serif text-lg leading-tight line-clamp-2">
                                                    {item.name}
                                                </h3>
                                                <button
                                                    onClick={() => removeItem(item.item_key)}
                                                    className="text-zinc-600 hover:text-red-400 p-1 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>

                                            <div className="mt-auto flex items-center justify-between">
                                                <div className="flex items-center border border-white/10 rounded-lg overflow-hidden">
                                                    <button
                                                        onClick={() => updateQuantity(item.item_key, Math.max(1, item.quantity.value - 1))}
                                                        className="p-1 px-2 hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
                                                    >
                                                        <Minus size={14} />
                                                    </button>
                                                    <span className="px-3 text-sm text-white font-sans font-medium min-w-[32px] text-center">
                                                        {item.quantity.value}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.item_key, item.quantity.value + 1)}
                                                        className="p-1 px-2 hover:bg-white/5 text-zinc-400 hover:text-white transition-colors"
                                                    >
                                                        <Plus size={14} />
                                                    </button>
                                                </div>
                                                <p className="text-zinc-300 font-sans font-semibold">
                                                    {formatINR(item.totals.total)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {cartItems.length > 0 && (() => {
                            // Sum up line item totals directly to guarantee UI consistency
                            const calculatedSubtotal = cartItems.reduce((acc, item) => {
                                // Some CoCart versions return totals.total as cents too
                                const lineTotal = parsePrice(item.totals.total);
                                const unitPrice = parsePrice(item.price);
                                const expectedLineTotal = unitPrice * item.quantity.value;

                                // If lineTotal is 100x expected, it's in minor units
                                if (Math.abs(lineTotal / 100 - expectedLineTotal) < 0.1) {
                                    return acc + expectedLineTotal;
                                }
                                return acc + lineTotal;
                            }, 0);

                            return (
                                <div className="p-6 border-t border-white/10 space-y-6 bg-white/5">
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-zinc-400 uppercase tracking-widest text-[10px] font-bold">
                                            <span>Estimated Total</span>
                                            <span className="text-white text-base font-sans leading-none">
                                                {formatINR(calculatedSubtotal)}
                                            </span>
                                        </div>
                                        <p className="text-zinc-500 text-[10px] italic">
                                            Shipping and taxes calculated at checkout
                                        </p>
                                    </div>

                                    <Link
                                        href="/checkout"
                                        onClick={() => setCartOpen(false)}
                                        className="w-full group relative py-4 bg-white text-black font-sans font-bold uppercase tracking-[0.2em] text-xs overflow-hidden rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors"
                                    >
                                        Proceed to Checkout
                                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            );
                        })()}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
