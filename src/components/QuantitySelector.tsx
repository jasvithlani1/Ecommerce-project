'use client';

import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
    quantity: number;
    setQuantity: (val: number) => void;
    max?: number | null;
}

export default function QuantitySelector({ quantity, setQuantity, max }: QuantitySelectorProps) {
    const handleDecrement = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const handleIncrement = () => {
        if (!max || quantity < max) setQuantity(quantity + 1);
    };

    return (
        <div className="flex flex-col gap-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-bold">Quantity</span>
            <div className="flex items-center w-fit border border-white/10 rounded-xl overflow-hidden bg-white/5">
                <button
                    onClick={handleDecrement}
                    disabled={quantity <= 1}
                    className="p-3 hover:bg-white/5 text-zinc-400 hover:text-white transition-colors disabled:opacity-30"
                >
                    <Minus size={16} />
                </button>
                <div className="w-12 text-center text-white font-sans font-medium text-sm">
                    {quantity}
                </div>
                <button
                    onClick={handleIncrement}
                    disabled={!!max && quantity >= max}
                    className="p-3 hover:bg-white/5 text-zinc-400 hover:text-white transition-colors disabled:opacity-30"
                >
                    <Plus size={16} />
                </button>
            </div>
            {max && (
                <span className="text-[10px] text-zinc-600 font-sans italic">
                    {max} available in stock
                </span>
            )}
        </div>
    );
}
