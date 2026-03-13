'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Lock, Mail, ArrowRight, Loader2, Chrome } from 'lucide-react';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface AuthOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

const AuthOverlay = ({ isOpen, onClose }: AuthOverlayProps) => {
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            if (mode === 'login') {
                const result = await signIn('credentials', {
                    username: formData.username,
                    password: formData.password,
                    redirect: false,
                });

                if (result?.error) {
                    setError('Invalid username or password');
                    setIsLoading(false);
                } else {
                    onClose();
                    router.push('/profile');
                }
            } else {
                // SignUp logic remains custom for now
                // await signUp(formData.username, formData.email, formData.password);
                onClose();
            }
        } catch (err) {
            setError('An unexpected error occurred');
            setIsLoading(false);
        }
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
        if (error) setError(null);
    };


    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-zinc-950/80 backdrop-blur-xl border-l border-white/10 z-[70] shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-8 flex justify-between items-center">
                            <h2 className="text-2xl font-serif text-white tracking-wider">
                                {mode === 'login' ? 'Welcome Back' : 'Create Account'}
                            </h2>
                            <button
                                onClick={onClose}
                                className="text-zinc-500 hover:text-white transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="px-8 mb-8 flex gap-8 border-b border-white/5">
                            <button
                                onClick={() => { setMode('login'); setError(null); }}
                                className={`pb-4 text-xs uppercase tracking-[0.2em] font-medium transition-colors relative ${mode === 'login' ? 'text-white' : 'text-zinc-500 hover:text-white'
                                    }`}
                            >
                                Login
                                {mode === 'login' && (
                                    <motion.div
                                        layoutId="auth-tab"
                                        className="absolute bottom-0 left-0 right-0 h-px bg-white"
                                    />
                                )}
                            </button>
                            <button
                                onClick={() => { setMode('signup'); setError(null); }}
                                className={`pb-4 text-xs uppercase tracking-[0.2em] font-medium transition-colors relative ${mode === 'signup' ? 'text-white' : 'text-zinc-500 hover:text-white'
                                    }`}
                            >
                                Sign Up
                                {mode === 'signup' && (
                                    <motion.div
                                        layoutId="auth-tab"
                                        className="absolute bottom-0 left-0 right-0 h-px bg-white"
                                    />
                                )}
                            </button>

                        </div>

                        {/* Form */}
                        <div className="flex-1 overflow-y-auto px-8 pb-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="relative group">
                                        <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2 font-bold ml-1">
                                            Username
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-white transition-colors">
                                                <User size={18} />
                                            </span>
                                            <input
                                                type="text"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleChange}
                                                required
                                                placeholder="Enter your username"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white font-sans text-sm focus:outline-none focus:border-white/30 transition-all placeholder:text-zinc-600"
                                            />
                                        </div>
                                    </div>

                                    {mode === 'signup' && (
                                        <div className="relative group">
                                            <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2 font-bold ml-1">
                                                Email Address
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-white transition-colors">
                                                    <Mail size={18} />
                                                </span>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    placeholder="your@email.com"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white font-sans text-sm focus:outline-none focus:border-white/30 transition-all placeholder:text-zinc-600"
                                                />
                                            </div>
                                        </div>
                                    )}

                                    <div className="relative group">
                                        <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2 font-bold ml-1">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-white transition-colors">
                                                <Lock size={18} />
                                            </span>
                                            <input
                                                type="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                                placeholder="••••••••"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white font-sans text-sm focus:outline-none focus:border-white/30 transition-all placeholder:text-zinc-600"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {error && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-red-400 text-xs font-sans italic"
                                    >
                                        {error}
                                    </motion.p>
                                )}

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full group relative py-4 bg-white text-black font-sans font-bold uppercase tracking-[0.2em] text-xs overflow-hidden rounded-xl disabled:opacity-50"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        {isLoading ? (
                                            <Loader2 size={16} className="animate-spin" />
                                        ) : (
                                            <>
                                                {mode === 'login' ? 'Sign In' : 'Create Account'}
                                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </span>
                                    <div className="absolute inset-0 bg-zinc-200 translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                                </button>
                            </form>

                            <div className="mt-12 space-y-8">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-white/5"></div>
                                    </div>
                                    <div className="relative flex justify-center text-[10px] uppercase tracking-widest text-zinc-500 font-bold bg-zinc-950 px-4">
                                        Or Continue With
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => signIn('google')}
                                        className="relative group/btn flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-xs text-zinc-400 hover:text-white hover:border-white/20 transition-all uppercase tracking-widest overflow-hidden"
                                    >
                                        <Chrome size={16} />
                                        <span>Google</span>
                                    </button>

                                    <button
                                        disabled
                                        className="relative group/btn flex items-center justify-center gap-2 py-3 bg-white/5 border border-white/10 rounded-xl text-xs text-white/50 cursor-not-allowed transition-colors uppercase tracking-widest overflow-hidden"
                                    >
                                        <span className="group-hover/btn:opacity-0 transition-opacity">Apple</span>
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/btn:opacity-100 transition-opacity bg-white/5 text-[8px] font-bold">
                                            Coming Soon
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-8 border-t border-white/5 text-center">
                            <p className="text-zinc-400 text-xs font-sans">
                                {mode === 'login' ? "Don't have an account?" : "Already have an account?"}
                                <button
                                    onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                                    className="ml-2 text-white font-bold hover:underline"
                                >
                                    {mode === 'login' ? 'Sign up' : 'Sign in'}
                                </button>
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AuthOverlay;
