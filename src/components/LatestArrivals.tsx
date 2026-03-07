'use client';

import { motion } from 'framer-motion';

const LatestArrivalsSkeleton = () => {
    return (
        <section className="py-24 bg-zinc-950 px-6 overflow-hidden border-t border-zinc-900">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-16">
                    <div className="space-y-4">
                        <h2 className="text-4xl font-serif text-white uppercase tracking-wider">Latest Arrivals</h2>
                        <div className="h-px w-24 bg-zinc-500" />
                    </div>
                    <div className="text-zinc-500 text-xs tracking-widest uppercase animate-pulse font-sans">
                        Connecting to WooCommerce...
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="space-y-6">
                            {/* Product Card Skeleton */}
                            <div className="relative aspect-[3/4.5] bg-zinc-900 overflow-hidden group border border-zinc-900/50">
                                {/* Shimmer Effect */}
                                <motion.div
                                    initial={{ x: '-100%' }}
                                    animate={{ x: '100%' }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800 to-transparent skew-x-12"
                                />
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-zinc-800" />
                            </div>

                            <div className="space-y-3">
                                <div className="h-4 bg-zinc-900 w-3/4 rounded-sm relative overflow-hidden">
                                    <motion.div
                                        initial={{ x: '-100%' }}
                                        animate={{ x: '100%' }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 0.1 }}
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800 to-transparent"
                                    />
                                </div>
                                <div className="h-3 bg-zinc-900 w-1/2 rounded-sm relative overflow-hidden">
                                    <motion.div
                                        initial={{ x: '-100%' }}
                                        animate={{ x: '100%' }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 0.2 }}
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800 to-transparent"
                                    />
                                </div>
                                <div className="h-4 bg-zinc-900 w-1/4 pt-2 rounded-sm relative overflow-hidden">
                                    <motion.div
                                        initial={{ x: '-100%' }}
                                        animate={{ x: '100%' }}
                                        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 0.3 }}
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-800 to-transparent"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestArrivalsSkeleton;
