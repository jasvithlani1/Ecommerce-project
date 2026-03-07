'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const categories = [
    { name: 'Fiction', image: '/images/category_fiction.png', count: 124 },
    { name: 'Non-Fiction', image: '/images/hero_featured.png', count: 86 },
    { name: 'Poetry', image: '/images/latest_arrival_1.png', count: 32 },
];

const CategoryGrid = () => {
    return (
        <section className="py-24 bg-zinc-950 px-6">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
                    <div className="space-y-4">
                        <h2 className="text-4xl lg:text-5xl font-serif text-white uppercase tracking-wider">Curated Collections</h2>
                        <div className="h-px w-24 bg-zinc-500" />
                        <p className="text-zinc-500 text-sm tracking-widest uppercase font-sans">Explore by genre</p>
                    </div>
                    <Link
                        href="/books"
                        className="group text-zinc-400 hover:text-white transition-colors uppercase text-sm tracking-widest font-sans font-medium flex items-center gap-2"
                    >
                        Explore All Categories
                        <span className="w-8 h-px bg-zinc-800 group-hover:bg-zinc-500 transition-colors duration-500" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {categories.map((category, index) => (
                        <motion.div
                            key={category.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.8 }}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900 border border-zinc-900 group-hover:border-zinc-800 transition-all duration-700">
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 p-10 w-full transform transition-all duration-700 group-hover:-translate-y-4">
                                    <span className="text-zinc-500 text-xs tracking-widest uppercase mb-3 block font-sans font-medium">
                                        {category.count} Titles
                                    </span>
                                    <h3 className="text-4xl font-serif text-white tracking-widest uppercase leading-none mb-4">
                                        {category.name}
                                    </h3>
                                    <div className="h-px w-0 bg-zinc-500 transition-all duration-700 group-hover:w-full opacity-0 group-hover:opacity-100" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryGrid;
