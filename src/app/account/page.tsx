import { auth } from '@/auth';
import { woocommerce } from '@/lib/woocommerce';
import { formatPrice } from '@/lib/utils';
import { redirect } from 'next/navigation';
import { Package, Calendar, Clock } from 'lucide-react';

export default async function AccountPage() {
    const session = await auth();

    if (!session?.user) {
        redirect('/login?callbackUrl=/account');
    }

    const email = session.user.email as string;
    const orders = await woocommerce.getCustomerOrders(email);

    return (
        <div className="min-h-screen bg-zinc-950 pt-32 pb-24">
            <div className="container mx-auto px-6 lg:px-12 max-w-6xl">
                <div className="mb-12">
                    <h1 className="text-4xl font-serif text-white uppercase tracking-wider mb-2">My Account</h1>
                    <div className="h-px w-24 bg-white/20"></div>
                </div>

                <div className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden p-8">
                    <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                            <Package className="text-zinc-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-serif text-white">Order History</h2>
                            <p className="text-zinc-500 text-sm">View and manage your recent orders.</p>
                        </div>
                    </div>

                    {orders.length === 0 ? (
                        <div className="text-center py-16">
                            <p className="text-zinc-500 mb-6">You haven't placed any orders yet.</p>
                            <a href="/books" className="px-8 py-3 bg-white text-black rounded-xl font-sans text-xs uppercase tracking-widest font-bold hover:bg-zinc-200 transition-colors inline-block">
                                Browse Books
                            </a>
                        </div>
                    ) : (
                        <div className="overflow-x-auto custom-scrollbar pb-4">
                            <table className="w-full text-left border-collapse min-w-[600px]">
                                <thead>
                                    <tr className="border-b border-white/10 text-[10px] uppercase tracking-widest text-zinc-500">
                                        <th className="pb-4 pt-2 font-medium pl-4">Order ID</th>
                                        <th className="pb-4 pt-2 font-medium">Date</th>
                                        <th className="pb-4 pt-2 font-medium">Status</th>
                                        <th className="pb-4 pt-2 font-medium text-right pr-4">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors group">
                                            <td className="py-5 pl-4">
                                                <span className="text-white font-mono text-sm tracking-wide group-hover:text-blue-400 transition-colors">#{order.id}</span>
                                            </td>
                                            <td className="py-5">
                                                <div className="flex items-center gap-2 text-zinc-400 text-sm">
                                                    <Calendar size={14} />
                                                    {new Date(order.date_created).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="py-5">
                                                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold border ${order.status === 'completed'
                                                        ? 'border-green-500/30 text-green-400 bg-green-500/10'
                                                        : order.status === 'processing'
                                                            ? 'border-blue-500/30 text-blue-400 bg-blue-500/10'
                                                            : 'border-zinc-500/30 text-zinc-400 bg-zinc-500/10'
                                                    }`}>
                                                    {order.status === 'processing' && <Clock size={10} />}
                                                    {order.status}
                                                </div>
                                            </td>
                                            <td className="py-5 text-right pr-4">
                                                <span className="text-white font-medium">{formatPrice(order.total)}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
