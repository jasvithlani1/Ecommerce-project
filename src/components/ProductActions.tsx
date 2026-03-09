'use client';

import { useState } from 'react';
import QuantitySelector from './QuantitySelector';
import AddToCartButton from './AddToCartButton';

interface ProductActionsProps {
    productId: number;
    stockQuantity?: number | null;
    stockStatus?: string;
}

export default function ProductActions({ productId, stockQuantity, stockStatus }: ProductActionsProps) {
    const [quantity, setQuantity] = useState(1);
    const isOutOfStock = stockStatus === 'OUT_OF_STOCK';

    if (isOutOfStock) {
        return (
            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                <p className="text-red-400 font-sans text-xs uppercase tracking-widest font-bold text-center">
                    Out of Stock
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-8">
            <QuantitySelector
                quantity={quantity}
                setQuantity={setQuantity}
                max={stockQuantity}
            />

            <AddToCartButton
                productId={productId}
                quantity={quantity}
                className="w-full sm:w-fit !py-5 !text-xs !tracking-[0.2em]"
            />
        </div>
    );
}
