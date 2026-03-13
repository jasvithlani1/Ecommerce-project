'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, User, ArrowRight, Loader2, Chrome } from 'lucide-react';
import { loginWithCredentials, loginWithGoogle } from '@/app/actions/auth';
import Link from 'next/link';

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const result = await loginWithCredentials(formData);

        if (result) {
            setError(result);
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-6 py-20 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[120px] -mr-64 -mt-64 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/[0.01] rounded-full blur-[100px] -ml-64 -mb-64 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-md"
            >
                <div className="bg-zinc-900/40 backdrop-blur-2xl border border-white/5 rounded-[40px] p-10 lg:p-12 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

                    <div className="text-center mb-10">
                        <Link href="/" className="inline-block text-2xl font-serif text-white tracking-widest uppercase mb-6">
                            Lumina <span className="text-zinc-500 italic">Press</span>
                        </Link>
                        <h1 className="text-2xl font-serif text-white mb-2">Welcome Back</h1>
                        <p className="text-zinc-500 text-xs uppercase tracking-widest font-medium font-sans">Enter your credentials to continue</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold ml-1">Username</label>
                                <div className="relative group">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-white transition-colors">
                                        <User size={18} />
                                    </span>
                                    <input
                                        type="text"
                                        name="username"
                                        required
                                        placeholder="Username or Email"
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-sans text-sm focus:outline-none focus:border-white/20 transition-all placeholder:text-zinc-700"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="block text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold ml-1">Password</label>
                                <div className="relative group">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-white transition-colors">
                                        <Lock size={18} />
                                    </span>
                                    <input
                                        type="password"
                                        name="password"
                                        required
                                        placeholder="••••••••"
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-sans text-sm focus:outline-none focus:border-white/20 transition-all placeholder:text-zinc-700"
                                    />
                                </div>
                            </div>
                        </div>

                        {error && (
                            <motion.p
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-red-400 text-xs font-sans italic text-center"
                            >
                                {error}
                            </motion.p>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full group relative py-4 bg-white text-black font-sans font-bold uppercase tracking-[0.2em] text-xs overflow-hidden rounded-2xl disabled:opacity-50 transition-transform active:scale-[0.98]"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {isLoading ? (
                                    <Loader2 size={16} className="animate-spin" />
                                ) : (
                                    <>
                                        Sign In
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </span>
                        </button>
                    </form>

                    <div className="mt-10 space-y-8">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/5"></div>
                            </div>
                            <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-bold bg-transparent px-4">
                                Or continue with
                            </div>
                        </div>

                        <button
                            onClick={() => loginWithGoogle()}
                            className="w-full flex items-center justify-center gap-3 py-4 bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 rounded-2xl text-xs text-white transition-all uppercase tracking-widest font-medium"
                        >
                            <Chrome size={18} className="text-zinc-400" />
                            Sign in with Google
                        </button>
                    </div>

                    <div className="mt-12 text-center">
                        <p className="text-zinc-500 text-xs font-sans">
                            Don't have an account?
                            <Link href="/signup" className="ml-2 text-white font-bold hover:underline transition-all">Sign up</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
