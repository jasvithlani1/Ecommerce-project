'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 px-6 py-4 transition-all duration-500 ${isScrolled ? 'bg-zinc-950/90 backdrop-blur-md border-b border-zinc-900 shadow-lg' : 'bg-transparent'
            }`}>
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-serif text-white tracking-widest uppercase group">
                    Lumina <span className="text-zinc-500 italic group-hover:text-zinc-400 transition-colors">Press</span>
                </Link>

                <div className="hidden lg:flex gap-12 text-xs uppercase tracking-widest font-sans font-medium text-zinc-400">
                    <Link href="/books" className="hover:text-white transition-colors relative group">
                        Books
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-zinc-500 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link href="/authors" className="hover:text-white transition-colors relative group">
                        Authors
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-zinc-500 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                    <Link href="/about" className="hover:text-white transition-colors relative group">
                        About
                        <span className="absolute -bottom-1 left-0 w-0 h-px bg-zinc-500 transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                </div>

                <div className="flex gap-6 items-center text-zinc-400 font-sans">
                    <button className="hover:text-zinc-200 transition-colors">
                        <Search size={20} />
                    </button>
                    <button className="hover:text-zinc-200 transition-colors relative">
                        <ShoppingBag size={20} />
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-zinc-100 text-zinc-950 text-[10px] rounded-full flex items-center justify-center font-bold">
                            0
                        </span>
                    </button>
                    <button className="lg:hidden hover:text-zinc-200 transition-colors">
                        <Menu size={20} />
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
