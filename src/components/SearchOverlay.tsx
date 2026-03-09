'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookOpen, ChevronRight } from 'lucide-react';
import { InstantSearch, SearchBox, Hits, useSearchBox } from 'react-instantsearch';
import { searchClient } from '@/lib/algolia-client';
import Link from 'next/link';

const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || 'books_index';

interface SearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const Hit = ({ hit }: { hit: any }) => {
    return (
        <Link
            href={`/books/${hit.slug}`}
            onClick={(e) => {
                // We'll let the overlay close naturally or via a prop if needed
            }}
            className="group flex items-center p-4 gap-4 hover:bg-white/5 transition-all duration-300 border-b border-white/5 last:border-0"
        >
            <div className="w-12 h-16 bg-zinc-800 rounded flex items-center justify-center text-zinc-600 group-hover:text-zinc-400 transition-colors shrink-0">
                <BookOpen size={20} />
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="text-white font-serif text-lg truncate group-hover:text-zinc-300 transition-colors">
                    {hit.name}
                </h4>
                <p className="text-zinc-500 text-sm font-sans tracking-wider">
                    {hit.price}
                </p>
            </div>
            <ChevronRight size={16} className="text-zinc-700 group-hover:text-zinc-400 group-hover:translate-x-1 transition-all" />
        </Link>
    );
};

const CustomSearchBox = ({ onClose }: { onClose: () => void }) => {
    const { query, refine } = useSearchBox();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <div className="flex items-center gap-4">
            <div className="relative flex-1 group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" size={20} />
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => refine(e.target.value)}
                    placeholder="Search for books, authors..."
                    className="w-full bg-white/5 border border-white/10 text-white text-lg font-sans rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:ring-1 focus:ring-white/30 focus:border-white/30 transition-all placeholder:text-zinc-600"
                />
            </div>
            <button
                onClick={onClose}
                className="p-2.5 text-zinc-500 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            >
                <X size={20} />
            </button>
        </div>
    );
};

const EmptyQueryBoundary = ({ children, fallback }: { children: React.ReactNode, fallback: React.ReactNode }) => {
    const { query } = useSearchBox();
    if (!query) return <div className="mt-6">{fallback}</div>;
    return <div className="mt-2">{children}</div>;
};

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
    // Prevent scrolling when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    // Close on escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 backdrop-blur-lg bg-zinc-950/70"
                >
                    <motion.div
                        initial={{ scale: 0.98, y: -10, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.98, y: -10, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full max-w-2xl glass-container overflow-hidden rounded-2xl"
                    >
                        <div className="p-4 md:p-6">
                            <InstantSearch searchClient={searchClient} indexName={indexName}>
                                <CustomSearchBox onClose={onClose} />

                                <EmptyQueryBoundary
                                    fallback={
                                        <div className="text-center py-12">
                                            <p className="text-zinc-600 font-sans tracking-widest uppercase text-xs opacity-60">
                                                Search the collection
                                            </p>
                                        </div>
                                    }
                                >
                                    <div className="max-h-[50vh] overflow-y-auto mt-4 custom-scrollbar">
                                        <Hits hitComponent={Hit} />
                                    </div>
                                </EmptyQueryBoundary>
                            </InstantSearch>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
