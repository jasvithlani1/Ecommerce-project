'use client';

import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

function ThankYouContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');

    return (
        <div className="container mx-auto px-6 max-w-2xl text-center">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/20"
            >
                <CheckCircle2 size={48} className="text-green-500" />
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl font-serif text-white mb-6 uppercase tracking-wider"
            >
                Thank You!
            </motion.h1>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 mb-10"
            >
                <h2 className="text-xl text-white font-medium mb-2">Order Confirmed</h2>
                <p className="text-zinc-400 mb-6">
                    Your mock order has been successfully placed. This is a demonstration flow, so no actual payment was processed.
                </p>

                {orderId && (
                    <div className="bg-black/30 rounded-xl p-4 inline-block border border-white/10">
                        <span className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-1">Order Reference</span>
                        <span className="text-2xl font-mono text-white tracking-widest">#{orderId}</span>
                    </div>
                )}
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
            >
                <Link
                    href="/account"
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-zinc-800 text-white hover:bg-zinc-700 rounded-xl font-sans text-xs uppercase tracking-widest font-bold border border-white/10 transition-colors"
                >
                    <ShoppingBag size={16} /> Order History
                </Link>
                <Link
                    href="/books"
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-black hover:bg-zinc-200 rounded-xl font-sans text-xs uppercase tracking-widest font-bold transition-colors"
                >
                    Continue Shopping <ArrowRight size={16} />
                </Link>
            </motion.div>
        </div>
    );
}

export default function ThankYouPage() {
    return (
        <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center pt-32 pb-24">
            <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
                <ThankYouContent />
            </Suspense>
        </div>
    );
}
