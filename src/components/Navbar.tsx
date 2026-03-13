'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, User, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { motion } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { useSession, signOut } from 'next-auth/react';
import SearchOverlay from './SearchOverlay';

import AuthOverlay from './AuthOverlay';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const { data: session, status } = useSession();
    const { setCartOpen, cartItems } = useCartStore();

    const isAuthenticated = status === 'authenticated';
    const itemCount = cartItems.reduce((acc, item) => acc + item.quantity.value, 0);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
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
                        <Link href="/contact" className="hover:text-white transition-colors relative group">
                            Contact
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-zinc-500 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                    </div>

                    <div className="flex gap-6 items-center text-zinc-400 font-sans">
                        <motion.button
                            whileHover={{ scale: 1.15, rotate: 10 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsSearchOpen(true)}
                            className="hover:text-white transition-colors cursor-pointer"
                        >
                            <Search size={22} />
                        </motion.button>

                        <div className="relative group/user">
                            <motion.button
                                whileHover={{ scale: 1.15 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => !isAuthenticated && setIsAuthOpen(true)}
                                className="hover:text-white transition-colors cursor-pointer"
                            >
                                <User size={22} className={isAuthenticated ? 'text-zinc-100' : 'text-zinc-400'} />
                            </motion.button>


                            {session?.user && (
                                <div className="absolute right-0 top-full mt-4 w-56 bg-zinc-950/80 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden opacity-0 invisible group-hover/user:opacity-100 group-hover/user:visible group-hover/user:translate-y-0 translate-y-2 transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                                    <div className="p-5 border-b border-white/5 bg-white/[0.02]">
                                        <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">Authenticated as</p>
                                        <p className="text-sm text-white font-medium truncate">{session.user.name || session.user.email}</p>
                                        <p className="text-[10px] text-zinc-600 truncate">{session.user.email}</p>
                                    </div>
                                    <div className="p-2">
                                        <Link href="/profile" className="flex items-center gap-3 px-4 py-3 text-xs text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-all group/item">
                                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover/item:bg-white/10 transition-colors">
                                                <User size={14} />
                                            </div>
                                            <span className="font-medium">Account Dashboard</span>
                                        </Link>
                                        <button
                                            onClick={() => signOut({ callbackUrl: '/' })}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-xs text-zinc-400 hover:text-red-400 hover:bg-red-400/5 rounded-xl transition-all group/item"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-red-400/5 flex items-center justify-center group-hover/item:bg-red-400/10 transition-colors">
                                                <LogOut size={14} />
                                            </div>
                                            <span className="font-medium">Sign Out</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => setCartOpen(true)}
                            className="hover:text-zinc-200 transition-colors relative group/cart"
                        >
                            <ShoppingBag size={20} className="group-hover/cart:-translate-y-0.5 transition-transform" />
                            {itemCount > 0 && (
                                <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 w-4 h-4 bg-white text-black text-[10px] rounded-full flex items-center justify-center font-bold"
                                >
                                    {itemCount}
                                </motion.span>
                            )}
                        </button>
                        <button className="lg:hidden hover:text-zinc-200 transition-colors">
                            <Menu size={20} />
                        </button>
                    </div>
                </div>
            </nav>

            <SearchOverlay
                isOpen={isSearchOpen}
                onClose={() => setIsSearchOpen(false)}
            />

            <AuthOverlay
                isOpen={isAuthOpen}
                onClose={() => setIsAuthOpen(false)}
            />
        </>
    );
};

export default Navbar;
