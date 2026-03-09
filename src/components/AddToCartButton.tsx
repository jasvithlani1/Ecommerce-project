'use client';

import { useState } from 'react';
import { ShoppingBag, Loader2, Check } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { motion, AnimatePresence } from 'framer-motion';

interface AddToCartButtonProps {
    productId: number;
    quantity?: number;
    className?: string;
}

export default function AddToCartButton({ productId, quantity = 1, className = "" }: AddToCartButtonProps) {
    const { addItem, isLoading } = useCartStore();
    const [isAdded, setIsAdded] = useState(false);
    const [localLoading, setLocalLoading] = useState(false);

    const handleAdd = async () => {
        setLocalLoading(true);
        try {
            await addItem(productId, quantity);
            setIsAdded(true);
            setTimeout(() => setIsAdded(false), 2000);
        } catch (error) {
            console.error('Add to cart failed:', error);
        } finally {
            setLocalLoading(false);
        }
    };

    return (
        <button
            onClick={handleAdd}
            disabled={localLoading || isLoading}
            className={`group relative flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-sans font-bold uppercase tracking-[0.15em] text-[10px] sm:text-xs rounded-xl transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden ${className}`}
        >
            <AnimatePresence mode="wait">
                {localLoading ? (
                    <motion.div
                        key="loading"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                    >
                        <Loader2 size={16} className="animate-spin" />
                        <span>Adding...</span>
                    </motion.div>
                ) : isAdded ? (
                    <motion.div
                        key="added"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                    >
                        <Check size={16} className="text-green-600" />
                        <span>Added to Bag</span>
                    </motion.div>
                ) : (
                    <motion.div
                        key="normal"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                    >
                        <ShoppingBag size={16} />
                        <span>Add to Bag</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Glossy overlay effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite] pointer-events-none"></div>
        </button>
    );
}
