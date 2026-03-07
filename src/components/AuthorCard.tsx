'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface AuthorCardProps {
    name: string;
    bio: string;
    image: string;
    specialization: string;
}

const AuthorCard = ({ name, bio, image, specialization }: AuthorCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group flex flex-col md:flex-row gap-10 p-8 bg-zinc-950 border border-zinc-900 hover:border-zinc-800 transition-all duration-500"
        >
            <div className="relative w-full md:w-1/3 aspect-square overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 shadow-2xl shadow-black/50">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transform transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Border Detail */}
                <div className="absolute inset-4 border border-white/10 pointer-events-none group-hover:border-white/20 transition-colors" />
            </div>

            <div className="flex-1 space-y-4">
                <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-sans block">
                    {specialization}
                </span>
                <h3 className="text-3xl lg:text-4xl font-serif text-white tracking-widest uppercase">
                    {name}
                </h3>
                <p className="text-zinc-400 font-sans text-sm leading-relaxed max-w-xl">
                    {bio}
                </p>
                <div className="pt-4">
                    <button className="text-[10px] uppercase font-sans tracking-[0.25em] text-zinc-500 hover:text-white transition-colors flex items-center gap-4 group">
                        Explore Works
                        <span className="w-12 h-px bg-zinc-800 group-hover:bg-zinc-500 transition-all duration-500" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default AuthorCard;
