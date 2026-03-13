'use client';

import { useState, useEffect } from 'react';

import QuantitySelector from './QuantitySelector';
import AddToCartButton from './AddToCartButton';
import { Heart } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';

interface ProductActionsProps {
    productId: number;
    name: string;
    price: string;
    image?: string;
    slug: string;
    stockQuantity?: number | null;
    stockStatus?: string;
}

export default function ProductActions({
    productId,
    name,
    price,
    image,
    slug,
    stockQuantity,
    stockStatus
}: ProductActionsProps) {
    const [mounted, setMounted] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const { toggleItem, isInWishlist } = useWishlistStore();

    useEffect(() => {
        setMounted(true);
    }, []);

    const isWishlisted = mounted ? isInWishlist(productId) : false;


    const isOutOfStock = stockStatus === 'OUT_OF_STOCK';

    const handleWishlistToggle = () => {
        toggleItem({
            id: productId,
            name,
            price,
            image,
            slug
        });
    };

    if (isOutOfStock) {
        return (
            <div className="space-y-6">
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl text-center">
                    <p className="text-red-400 font-sans text-xs uppercase tracking-widest font-bold">
                        Out of Stock
                    </p>
                </div>
                <button
                    onClick={handleWishlistToggle}
                    className={`w-full flex items-center justify-center gap-3 py-4 border rounded-xl font-sans text-xs uppercase tracking-[0.2em] transition-all duration-300 ${isWishlisted
                        ? 'bg-rose-500 border-rose-400 text-white'
                        : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                        }`}
                >
                    <Heart size={16} className={isWishlisted ? 'fill-current' : ''} />
                    {isWishlisted ? 'In Wishlist' : 'Add to Wishlist'}
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="w-full sm:w-1/3">
                    <QuantitySelector
                        quantity={quantity}
                        setQuantity={setQuantity}
                        max={stockQuantity}
                    />
                </div>
                <div className="w-full sm:w-2/3">
                    <AddToCartButton
                        productId={productId}
                        quantity={quantity}
                        className="w-full !py-5 !text-xs !tracking-[0.2em]"
                    />
                </div>
            </div>

            <button
                onClick={handleWishlistToggle}
                className={`w-full flex items-center justify-center gap-3 py-4 border rounded-xl font-sans text-xs uppercase tracking-[0.2em] transition-all duration-300 ${isWishlisted
                    ? 'bg-rose-500 border-rose-400 text-white shadow-lg shadow-rose-500/20'
                    : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                    }`}
            >
                <Heart size={16} className={isWishlisted ? 'fill-current' : ''} />
                {isWishlisted ? 'Added to Wishlist' : 'Add to Wishlist'}
            </button>
        </div>
    );
}

