'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCartStore } from '@/store/cartStore';
import { processCheckout } from '@/app/actions/checkout';
import { useRouter } from 'next/navigation';
import { formatPrice, formatINR, parsePrice } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Loader2, ArrowRight } from 'lucide-react';

const checkoutSchema = z.object({
    first_name: z.string().min(2, 'First name is required'),
    last_name: z.string().min(2, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().min(10, 'Valid phone number is required'),
    address_1: z.string().min(5, 'Address is required'),
    city: z.string().min(2, 'City is required'),
    state: z.string().min(2, 'State is required'),
    postcode: z.string().min(4, 'Postal code is required'),
    country: z.string().min(2, 'Country is required'),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
    const { cartItems, subtotal, clearCart } = useCartStore();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: { country: 'US' } // Default Country
    });

    const onSubmit = async (data: CheckoutFormValues) => {
        setIsSubmitting(true);
        setError('');

        const result = await processCheckout(data, cartItems);

        if (result.success) {
            await clearCart();
            router.push(`/thank-you?orderId=${result.orderId}`);
        } else {
            setError(result.error || 'Checkout failed.');
        }

        setIsSubmitting(false);
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center pt-32 pb-24 text-center px-6">
                <h1 className="text-3xl font-serif text-white mb-4">Your Cart is Empty</h1>
                <p className="text-zinc-500 mb-8 max-w-md">You need items in your cart to proceed to checkout. Discover our curated catalog.</p>
                <button
                    onClick={() => router.push('/books')}
                    className="flex justify-center items-center gap-2 w-full max-w-sm py-4 bg-white text-black rounded-xl font-sans text-xs uppercase tracking-widest font-bold hover:bg-zinc-200 transition-colors"
                >
                    Browse Books <ArrowRight size={14} />
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 pt-32 pb-24">
            <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
                <div className="mb-12">
                    <h1 className="text-4xl font-serif text-white uppercase tracking-wider mb-2">Checkout</h1>
                    <div className="h-px w-24 bg-white/20"></div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-7 xl:col-span-8">
                        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 p-8 rounded-3xl">
                            <h2 className="text-2xl font-serif text-white mb-6">Shipping Details</h2>

                            {error && (
                                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">First Name</label>
                                        <input
                                            {...register('first_name')}
                                            className={`w-full bg-black/20 border ${errors.first_name ? 'border-red-500/50' : 'border-white/10'} rounded-xl p-4 text-sm text-white focus:outline-none focus:border-white/30 transition-colors placeholder:text-zinc-700`}
                                            placeholder="Jane"
                                        />
                                        {errors.first_name && <p className="text-red-400 text-xs mt-1">{errors.first_name.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Last Name</label>
                                        <input
                                            {...register('last_name')}
                                            className={`w-full bg-black/20 border ${errors.last_name ? 'border-red-500/50' : 'border-white/10'} rounded-xl p-4 text-sm text-white focus:outline-none focus:border-white/30 transition-colors placeholder:text-zinc-700`}
                                            placeholder="Doe"
                                        />
                                        {errors.last_name && <p className="text-red-400 text-xs mt-1">{errors.last_name.message}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Email Address</label>
                                        <input
                                            {...register('email')}
                                            type="email"
                                            className={`w-full bg-black/20 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-xl p-4 text-sm text-white focus:outline-none focus:border-white/30 transition-colors placeholder:text-zinc-700`}
                                            placeholder="jane@example.com"
                                        />
                                        {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Phone</label>
                                        <input
                                            {...register('phone')}
                                            className={`w-full bg-black/20 border ${errors.phone ? 'border-red-500/50' : 'border-white/10'} rounded-xl p-4 text-sm text-white focus:outline-none focus:border-white/30 transition-colors placeholder:text-zinc-700`}
                                            placeholder="+1 (555) 000-0000"
                                        />
                                        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Street Address</label>
                                    <input
                                        {...register('address_1')}
                                        className={`w-full bg-black/20 border ${errors.address_1 ? 'border-red-500/50' : 'border-white/10'} rounded-xl p-4 text-sm text-white focus:outline-none focus:border-white/30 transition-colors placeholder:text-zinc-700`}
                                        placeholder="123 Example Street"
                                    />
                                    {errors.address_1 && <p className="text-red-400 text-xs mt-1">{errors.address_1.message}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">City</label>
                                        <input
                                            {...register('city')}
                                            className={`w-full bg-black/20 border ${errors.city ? 'border-red-500/50' : 'border-white/10'} rounded-xl p-4 text-sm text-white focus:outline-none focus:border-white/30 transition-colors placeholder:text-zinc-700`}
                                            placeholder="New York"
                                        />
                                        {errors.city && <p className="text-red-400 text-xs mt-1">{errors.city.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">State / Province</label>
                                        <input
                                            {...register('state')}
                                            className={`w-full bg-black/20 border ${errors.state ? 'border-red-500/50' : 'border-white/10'} rounded-xl p-4 text-sm text-white focus:outline-none focus:border-white/30 transition-colors placeholder:text-zinc-700`}
                                            placeholder="NY"
                                        />
                                        {errors.state && <p className="text-red-400 text-xs mt-1">{errors.state.message}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Postal Code</label>
                                        <input
                                            {...register('postcode')}
                                            className={`w-full bg-black/20 border ${errors.postcode ? 'border-red-500/50' : 'border-white/10'} rounded-xl p-4 text-sm text-white focus:outline-none focus:border-white/30 transition-colors placeholder:text-zinc-700`}
                                            placeholder="10001"
                                        />
                                        {errors.postcode && <p className="text-red-400 text-xs mt-1">{errors.postcode.message}</p>}
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">Country</label>
                                        <input
                                            {...register('country')}
                                            className={`w-full bg-black/20 border ${errors.country ? 'border-red-500/50' : 'border-white/10'} rounded-xl p-4 text-sm text-white focus:outline-none focus:border-white/30 transition-colors placeholder:text-zinc-700`}
                                            placeholder="US"
                                        />
                                        {errors.country && <p className="text-red-400 text-xs mt-1">{errors.country.message}</p>}
                                    </div>
                                </div>

                                <div className="pt-6">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-5 bg-white text-black rounded-xl font-sans text-xs uppercase tracking-[0.2em] font-bold hover:bg-zinc-200 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 relative overflow-hidden group"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 size={16} className="animate-spin" />
                                                Processing Order...
                                            </>
                                        ) : (
                                            <>
                                                Place Mock Order
                                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="lg:col-span-5 xl:col-span-4">
                        <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 p-8 rounded-3xl sticky top-32">
                            <h2 className="text-xl font-serif text-white mb-6">Order Summary</h2>

                            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                                {cartItems.map((item) => (
                                    <div key={item.item_key} className="flex gap-4">
                                        {item.featured_image ? (
                                            <div className="relative w-16 h-20 flex-shrink-0 bg-black/20 rounded-md overflow-hidden">
                                                <img src={item.featured_image} alt={item.name} className="object-cover w-full h-full" />
                                            </div>
                                        ) : (
                                            <div className="w-16 h-20 bg-white/5 rounded-md flex-shrink-0" />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-medium text-white line-clamp-2 leading-snug mb-1">{item.name}</h4>
                                            <p className="text-zinc-500 text-xs mb-2">Qty: {item.quantity.value}</p>
                                            <p className="text-white text-sm">{formatINR(parsePrice(item.totals.subtotal))}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 pt-6 border-t border-white/10 text-sm">
                                <div className="flex justify-between text-zinc-400">
                                    <span>Subtotal</span>
                                    <span className="text-white">{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-zinc-400">
                                    <span>Shipping</span>
                                    <span className="text-green-400">Free</span>
                                </div>
                                <div className="flex justify-between font-serif text-xl text-white pt-4 mt-4 border-t border-white/10">
                                    <span>Total</span>
                                    <span>{formatPrice(subtotal)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
