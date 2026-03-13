'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { formatPrice } from '@/lib/utils';
import { Heart } from 'lucide-react';
import { useWishlistStore } from '@/store/wishlistStore';
import { useState, useEffect } from 'react';



interface BookCardProps {
    id: number | string;
    name: string;
    price: string;
    // Changed to match the WordPress GraphQL object structure
    image?: {
        sourceUrl: string;
    };
    slug: string;
}

const BookCard = ({ id, name, price, image, slug }: BookCardProps) => {
    const [mounted, setMounted] = useState(false);
    const { toggleItem, isInWishlist } = useWishlistStore();

    useEffect(() => {
        setMounted(true);
    }, []);

    const isWishlisted = mounted ? isInWishlist(id) : false;


    // Fallback image if WordPress has no featured image set
    const imageUrl = image?.sourceUrl || '/placeholder-book.jpg';

    const handleWishlistClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleItem({
            id,
            name,
            price,
            image: imageUrl,
            slug
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
        >
            <div className="relative">
                <Link href={`/books/${slug}`}>
                    <div className="relative bg-zinc-900 mb-6 overflow-hidden shadow-2xl transition-transform duration-500 group-hover:-translate-y-2 border border-zinc-900 group-hover:border-zinc-800 flex items-center justify-center aspect-[3/4]">
                        <Image
                            src={imageUrl}
                            alt={name}
                            fill // Using fill for better layout stability in grids
                            className="object-cover rounded-sm transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />
                        {/* Book Spine Detail */}
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-black/20 z-10" />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-6 text-center z-20">
                            <span className="px-6 py-2 bg-white text-black font-sans text-xs uppercase tracking-widest font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                View Details
                            </span>
                        </div>
                    </div>
                </Link>

                {/* Wishlist Toggle Button */}
                <button
                    onClick={handleWishlistClick}
                    className={`absolute top-4 right-4 z-30 p-2.5 rounded-full backdrop-blur-md border transition-all duration-300 ${isWishlisted
                        ? 'bg-rose-500 border-rose-400 text-white'
                        : 'bg-black/20 border-white/10 text-white/70 hover:bg-black/40 hover:text-white hover:scale-110'
                        }`}
                >
                    <Heart
                        size={16}
                        className={isWishlisted ? 'fill-current' : ''}
                    />
                </button>
            </div>

            <Link href={`/books/${slug}`}>
                <div className="space-y-2 text-center">
                    <h3 className="text-xl font-serif text-white tracking-wide leading-tight transition-colors group-hover:text-zinc-400 line-clamp-2">
                        {name}
                    </h3>
                    <p className="text-zinc-400 font-sans font-medium tracking-widest text-sm italic">
                        {formatPrice(price)}
                    </p>
                </div>
            </Link>
        </motion.div>
    );
};


export default BookCard;