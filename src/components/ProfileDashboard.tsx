'use client';

import { motion } from 'framer-motion';
import { User, Mail, Package, Settings, LogOut, ChevronRight, BookOpen, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { signOut } from 'next-auth/react';
import { useWishlistStore } from '@/store/wishlistStore';
import { useOrderStore } from '@/store/orderStore';
import { formatPrice } from '@/lib/utils';
import BookCard from './BookCard';

interface ProfileDashboardProps {
    user: any;
}

const ProfileDashboard = ({ user }: ProfileDashboardProps) => {
    const [mounted, setMounted] = useState(false);
    const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'settings' | 'wishlist'>('overview');
    const { items: wishlistItems } = useWishlistStore();
    const { orders } = useOrderStore();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!user) return null;


    const handleLogout = () => {
        signOut({ callbackUrl: '/' });
    };

    const stats = [
        { label: 'Orders', value: mounted ? orders.length.toString() : '0', icon: Package, color: 'text-blue-400' },
        { label: 'Wishlist', value: mounted ? wishlistItems.length.toString() : '0', icon: Heart, color: 'text-rose-400' },
        { label: 'Read List', value: '0', icon: BookOpen, color: 'text-emerald-400' },
    ];


    const menuItems = [
        { id: 'orders', label: 'My Orders', icon: Package, description: 'View and track your purchases' },
        { id: 'settings', label: 'Account Settings', icon: Settings, description: 'Update your profile and security' },
        { id: 'wishlist', label: 'Your Wishlist', icon: Heart, description: 'Books you plan to read' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 min-h-screen">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid lg:grid-cols-4 gap-8"
            >
                {/* Sidebar / Profile Info */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-3xl p-8 text-center relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

                        <div className="relative mb-6 mx-auto w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-500">
                            {user.image ? (
                                <img
                                    src={user.image}
                                    alt={user.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center">
                                    <User size={40} className="text-zinc-500" />
                                </div>
                            )}
                        </div>

                        <h1 className="text-xl font-serif text-white mb-1 line-clamp-1">{user.name || user.email}</h1>
                        <div className="flex items-center justify-center gap-2 text-zinc-500 text-xs mb-8">
                            <Mail size={12} />
                            <span className="truncate">{user.email}</span>
                        </div>

                        <div className="space-y-2">
                            <button
                                onClick={() => setActiveTab('overview')}
                                className={`w-full text-left px-4 py-2 rounded-lg text-xs uppercase tracking-widest transition-colors ${activeTab === 'overview' ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
                            >
                                Overview
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-xs font-bold uppercase tracking-widest transition-all mt-4"
                            >
                                <LogOut size={14} />
                                Log Out
                            </button>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-2xl p-4 text-center">
                                <stat.icon size={18} className={`${stat.color} mx-auto mb-2`} />
                                <div className="text-lg font-bold text-white leading-tight">{stat.value}</div>
                                <div className="text-[10px] text-zinc-500 uppercase tracking-tighter">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3 space-y-8">
                    {activeTab === 'overview' ? (
                        <>
                            <div className="bg-zinc-950/40 backdrop-blur-sm border border-white/5 rounded-3xl p-8 lg:p-10">
                                <div className="mb-10">
                                    <h2 className="text-2xl font-serif text-white mb-2">Account Dashboard</h2>
                                    <p className="text-zinc-500 text-sm">Welcome to your personal space at Lumina Press. Manage your reading journey here.</p>
                                </div>

                                <div className="grid gap-4">
                                    {menuItems.map((item) => (
                                        <motion.button
                                            key={item.id}
                                            onClick={() => setActiveTab(item.id as any)}
                                            whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.03)' }}
                                            className="w-full flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-2xl transition-all text-left group"
                                        >
                                            <div className="flex items-center gap-6">
                                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors border border-white/5">
                                                    <item.icon size={22} />
                                                </div>
                                                <div>
                                                    <h3 className="text-white font-medium mb-1">{item.label}</h3>
                                                    <p className="text-zinc-500 text-xs">{item.description}</p>
                                                </div>
                                            </div>
                                            <ChevronRight size={20} className="text-zinc-700 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Activity / Recommendation */}
                            <div className="p-8 rounded-3xl bg-gradient-to-br from-zinc-900/60 to-black/20 border border-white/5 relative overflow-hidden">
                                <div className="relative z-10">
                                    <h4 className="text-white font-serif text-lg mb-2">Continue Reading</h4>
                                    <p className="text-zinc-500 text-xs mb-6 max-w-sm">Pick up where you left off with your favorite titles and discover new authors.</p>
                                    <button className="px-6 py-3 bg-white text-black rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors">
                                        Browse Library
                                    </button>
                                </div>
                                <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 pointer-events-none">
                                    <div className="w-full h-full bg-gradient-to-l from-white to-transparent"></div>
                                </div>
                            </div>
                        </>
                    ) : activeTab === 'wishlist' ? (
                        <div className="bg-zinc-950/40 backdrop-blur-sm border border-white/5 rounded-3xl p-8 lg:p-10 min-h-[500px]">
                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h2 className="text-2xl font-serif text-white mb-2">Your Wishlist</h2>
                                    <p className="text-zinc-500 text-sm">The books you've saved for later.</p>
                                </div>
                                <button
                                    onClick={() => setActiveTab('overview')}
                                    className="text-xs uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
                                >
                                    Back to Dashboard
                                </button>
                            </div>

                            {wishlistItems.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {wishlistItems.map((item) => (
                                        <BookCard
                                            key={item.id}
                                            id={item.id}
                                            name={item.name}
                                            price={item.price}
                                            image={item.image ? { sourceUrl: item.image } : undefined}
                                            slug={item.slug}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-20 text-center">
                                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                                        <Heart size={32} className="text-zinc-700" />
                                    </div>
                                    <h3 className="text-white font-medium mb-2">Your wishlist is empty</h3>
                                    <p className="text-zinc-500 text-sm mb-8">Start exploring and save books you're interested in.</p>
                                    <button
                                        onClick={() => { window.location.href = '/books' }}
                                        className="px-8 py-3 bg-white text-black rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors"
                                    >
                                        Browse Catalog
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : activeTab === 'orders' ? (
                        <div className="bg-zinc-950/40 backdrop-blur-sm border border-white/5 rounded-3xl p-8 lg:p-10 min-h-[500px]">
                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h2 className="text-2xl font-serif text-white mb-2">My Orders</h2>
                                    <p className="text-zinc-500 text-sm">View and track your previous purchases.</p>
                                </div>
                                <button
                                    onClick={() => setActiveTab('overview')}
                                    className="text-xs uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
                                >
                                    Back to Dashboard
                                </button>
                            </div>

                            {orders.length > 0 ? (
                                <div className="space-y-6">
                                    {orders.map((order) => (
                                        <div key={order.id} className="bg-zinc-900/40 rounded-2xl border border-white/5 overflow-hidden">
                                            {/* Order Header */}
                                            <div className="p-6 border-b border-white/5 flex flex-wrap gap-6 justify-between items-center bg-white/[0.02]">
                                                <div>
                                                    <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Order #{order.id}</p>
                                                    <p className="text-sm text-white">Placed on {new Date(order.date).toLocaleDateString()}</p>
                                                </div>
                                                <div className="flex items-center gap-6 text-sm">
                                                    <div>
                                                        <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Total</p>
                                                        <p className="text-white font-medium">{formatPrice(order.total)}</p>
                                                    </div>
                                                    <div>
                                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-300 border border-white/10">
                                                            {order.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Order Items */}
                                            <div className="p-6">
                                                <div className="space-y-4">
                                                    {order.items.map((item: any) => (
                                                        <div key={item.id} className="flex gap-4 items-center">
                                                            {item.image ? (
                                                                <div className="w-12 h-16 bg-zinc-800 rounded flex-shrink-0 overflow-hidden relative">
                                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                                </div>
                                                            ) : (
                                                                <div className="w-12 h-16 bg-white/5 rounded flex-shrink-0" />
                                                            )}
                                                            <div className="flex-1 min-w-0">
                                                                <h4 className="text-sm text-white font-medium line-clamp-1">{item.name}</h4>
                                                                <p className="text-xs text-zinc-500 mt-1">Qty: {item.quantity} × {formatPrice(item.price)}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-20 text-center">
                                    <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                                        <Package size={32} className="text-zinc-700" />
                                    </div>
                                    <h3 className="text-white font-medium mb-2">No orders yet</h3>
                                    <p className="text-zinc-500 text-sm mb-8">When you place an order, it will appear here.</p>
                                    <button
                                        onClick={() => { window.location.href = '/books' }}
                                        className="px-8 py-3 bg-white text-black rounded-full text-xs font-bold uppercase tracking-widest hover:bg-zinc-200 transition-colors"
                                    >
                                        Start Shopping
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="bg-zinc-950/40 backdrop-blur-sm border border-white/5 rounded-3xl p-8 lg:p-10 flex flex-col items-center justify-center py-40 text-center">
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 text-zinc-500">
                                <Settings size={32} />
                            </div>
                            <h2 className="text-xl font-serif text-white mb-2">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Coming Soon</h2>
                            <p className="text-zinc-500 text-sm mb-8">We're working on making this section available. Check back soon!</p>
                            <button
                                onClick={() => setActiveTab('overview')}
                                className="text-xs uppercase tracking-widest text-white border-b border-white pb-1"
                            >
                                Back to Overview
                            </button>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};


export default ProfileDashboard;
