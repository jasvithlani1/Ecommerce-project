'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Store, BookOpen, History } from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    }),
};

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate async submission
        await new Promise(res => setTimeout(res, 1400));
        setLoading(false);
        setSubmitted(true);
    };

    return (
        <main className="bg-zinc-950 text-white min-h-screen">

            {/* ── Hero ── */}
            <section className="relative overflow-hidden pt-36 pb-28 px-6">
                {/* ambient glow */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-zinc-700/10 rounded-full blur-[120px]" />
                </div>

                <div className="relative container mx-auto max-w-4xl text-center space-y-6">
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-sans font-medium"
                    >
                        Lumina Press · Varanasi, India
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="font-serif text-5xl md:text-7xl font-bold tracking-tight leading-tight"
                    >
                        Visit Our <span className="text-zinc-400 italic">Story</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="text-zinc-500 font-sans text-base md:text-lg max-w-xl mx-auto leading-relaxed"
                    >
                        Nestled in the heart of the holy city of Varanasi, our store is where ancient culture meets the timeless love of literature.
                    </motion.p>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="w-24 h-px bg-zinc-700 mx-auto origin-left"
                    />
                </div>
            </section>

            {/* ── Store & History Aesthetics ── */}
            <section className="px-6 pb-24">
                <div className="container mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Store Card */}
                    <motion.div
                        custom={0}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        variants={fadeUp}
                        className="md:col-span-2 relative rounded-3xl overflow-hidden border border-zinc-800/60 group"
                        style={{ minHeight: '360px' }}
                    >
                        {/* Gradient background mimicking a bookstore atmosphere */}
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900" />
                        <div className="absolute inset-0 opacity-20"
                            style={{
                                backgroundImage: `radial-gradient(circle at 20% 50%, #a78bfa22 0%, transparent 60%),
                                                  radial-gradient(circle at 80% 20%, #f59e0b22 0%, transparent 60%)`
                            }}
                        />
                        {/* Decorative bookshelf lines */}
                        <div className="absolute bottom-0 left-0 right-0 h-48 opacity-5"
                            style={{
                                backgroundImage: 'repeating-linear-gradient(to right, white 0px, white 2px, transparent 2px, transparent 18px)',
                            }}
                        />

                        <div className="absolute inset-0 p-10 flex flex-col justify-end">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
                                <Store size={22} className="text-zinc-300" />
                            </div>
                            <h2 className="font-serif text-3xl font-bold mb-2">Our Flagship Store</h2>
                            <p className="text-zinc-400 font-sans text-sm leading-relaxed max-w-md">
                                Set in the vibrant lanes near Assi Ghat, Varanasi, our flagship store is a sanctuary for book lovers — a place where every shelf tells a story and every corner whispers wisdom from across centuries.
                            </p>
                        </div>
                    </motion.div>

                    {/* History Card */}
                    <motion.div
                        custom={1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        variants={fadeUp}
                        className="relative rounded-3xl overflow-hidden border border-zinc-800/60 group"
                        style={{ minHeight: '360px' }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-zinc-950" />
                        <div className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: `radial-gradient(circle at 50% 0%, #f59e0b44 0%, transparent 70%)`
                            }}
                        />

                        <div className="absolute inset-0 p-8 flex flex-col justify-end">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
                                <History size={22} className="text-zinc-300" />
                            </div>
                            <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-600 font-sans mb-2">Est. 2008</p>
                            <h2 className="font-serif text-2xl font-bold mb-2">Our History</h2>
                            <p className="text-zinc-400 font-sans text-sm leading-relaxed">
                                Founded on the banks of the Ganges, Lumina Press began as a small reading room in 2008 and has grown into Varanasi's most beloved independent bookstore, celebrating over 16 years of literary tradition.
                            </p>
                        </div>
                    </motion.div>

                    {/* Reading Room Card */}
                    <motion.div
                        custom={2}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        variants={fadeUp}
                        className="relative rounded-3xl overflow-hidden border border-zinc-800/60 group"
                        style={{ minHeight: '240px' }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-950" />
                        <div className="absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: `radial-gradient(circle at 80% 100%, #8b5cf644 0%, transparent 60%)`
                            }}
                        />
                        <div className="absolute inset-0 p-8 flex flex-col justify-end">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
                                <BookOpen size={22} className="text-zinc-300" />
                            </div>
                            <h2 className="font-serif text-xl font-bold mb-2">Reading Room</h2>
                            <p className="text-zinc-400 font-sans text-sm leading-relaxed">
                                Relax in our curated reading room — open to all. Enjoy chai, silence, and the company of great books every day.
                            </p>
                        </div>
                    </motion.div>

                    {/* Stats Cards */}
                    {[
                        { value: '10,000+', label: 'Titles in Stock' },
                        { value: '16 yrs', label: 'In Varanasi' },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            custom={3 + i}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                            variants={fadeUp}
                            className="relative rounded-3xl border border-zinc-800/60 bg-zinc-900/40 p-8 flex flex-col justify-center items-center text-center group hover:border-zinc-700/60 transition-colors"
                            style={{ minHeight: '240px' }}
                        >
                            <p className="font-serif text-5xl font-bold text-white mb-3">{stat.value}</p>
                            <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-sans">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ── Contact Info + Form ── */}
            <section className="px-6 pb-24">
                <div className="container mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-5 gap-12">

                    {/* Info Column */}
                    <div className="lg:col-span-2 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -24 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-sans mb-3">Get in Touch</p>
                            <h2 className="font-serif text-4xl font-bold leading-tight mb-4">We'd love to <span className="text-zinc-400 italic">hear you</span></h2>
                            <p className="text-zinc-500 font-sans text-sm leading-relaxed">
                                Whether you have a question about our collection, events, or just want to say hello — our team is always happy to connect.
                            </p>
                        </motion.div>

                        {/* Contact Detail Cards */}
                        {[
                            {
                                icon: MapPin,
                                label: 'Our Location',
                                lines: ['Assi Ghat Road, Lanka,', 'Varanasi, Uttar Pradesh 221005', 'India'],
                            },
                            {
                                icon: Phone,
                                label: 'Call Us',
                                lines: ['+91 98765 43210', '+91 98765 43211'],
                            },
                            {
                                icon: Mail,
                                label: 'Email Us',
                                lines: ['hello@luminapress.in', 'orders@luminapress.in'],
                            },
                            {
                                icon: Clock,
                                label: 'Store Hours',
                                lines: ['Mon – Sat: 9:00 AM – 8:00 PM', 'Sunday: 10:00 AM – 6:00 PM'],
                            },
                        ].map((item, i) => (
                            <motion.div
                                key={item.label}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-40px' }}
                                variants={fadeUp}
                                className="flex items-start gap-4 p-5 rounded-2xl border border-zinc-800/60 bg-zinc-900/30 hover:border-zinc-700/60 hover:bg-zinc-900/50 transition-all duration-300 group"
                            >
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                                    <item.icon size={18} className="text-zinc-400" />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-sans mb-1">{item.label}</p>
                                    {item.lines.map(line => (
                                        <p key={line} className="text-sm text-zinc-300 font-sans">{line}</p>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Form Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="lg:col-span-3"
                    >
                        <div className="rounded-3xl border border-zinc-800/60 bg-zinc-900/30 backdrop-blur-sm p-8 md:p-10">
                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.92 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                    className="flex flex-col items-center justify-center h-full py-16 text-center space-y-4"
                                >
                                    <div className="w-16 h-16 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center mb-2">
                                        <Send size={28} className="text-zinc-200" />
                                    </div>
                                    <h3 className="font-serif text-3xl font-bold">Message Sent!</h3>
                                    <p className="text-zinc-500 font-sans text-sm max-w-xs leading-relaxed">
                                        Thank you for reaching out. We'll get back to you within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                                        className="mt-4 text-xs text-zinc-500 underline underline-offset-2 hover:text-zinc-300 transition-colors font-sans"
                                    >
                                        Send another message
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600 font-sans mb-1">Contact Form</p>
                                        <h3 className="font-serif text-2xl font-bold">Send a Message</h3>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-sans">Full Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                value={form.name}
                                                onChange={handleChange}
                                                placeholder="John Doe"
                                                className="w-full bg-zinc-950/60 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-700 font-sans focus:outline-none focus:border-zinc-600 transition-colors"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-sans">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                value={form.email}
                                                onChange={handleChange}
                                                placeholder="john@example.com"
                                                className="w-full bg-zinc-950/60 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-700 font-sans focus:outline-none focus:border-zinc-600 transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-sans">Subject</label>
                                        <select
                                            name="subject"
                                            value={form.subject}
                                            onChange={handleChange}
                                            className="w-full bg-zinc-950/60 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white font-sans focus:outline-none focus:border-zinc-600 transition-colors appearance-none"
                                        >
                                            <option value="" className="bg-zinc-950">Select a topic…</option>
                                            <option value="order" className="bg-zinc-950">Order Enquiry</option>
                                            <option value="book" className="bg-zinc-950">Book Availability</option>
                                            <option value="event" className="bg-zinc-950">Store Event</option>
                                            <option value="other" className="bg-zinc-950">Other</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-sans">Message</label>
                                        <textarea
                                            name="message"
                                            required
                                            rows={5}
                                            value={form.message}
                                            onChange={handleChange}
                                            placeholder="Tell us how we can help…"
                                            className="w-full bg-zinc-950/60 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-700 font-sans focus:outline-none focus:border-zinc-600 transition-colors resize-none"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full flex items-center justify-center gap-3 bg-white text-black text-xs uppercase tracking-[0.2em] font-sans font-semibold py-4 rounded-xl hover:bg-zinc-100 active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <>
                                                <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                                                Sending…
                                            </>
                                        ) : (
                                            <>
                                                <Send size={15} />
                                                Send Message
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ── Map ── */}
            <section className="px-6 pb-24">
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        initial={{ opacity: 0, y: 32 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.7 }}
                        className="rounded-3xl overflow-hidden border border-zinc-800/60 relative"
                        style={{ height: '460px' }}
                    >
                        {/* Map Label Chip */}
                        <div className="absolute top-5 left-5 z-10 flex items-center gap-2 bg-zinc-950/90 backdrop-blur-md border border-zinc-800 rounded-full px-4 py-2 shadow-lg">
                            <MapPin size={14} className="text-zinc-400" />
                            <span className="text-[11px] uppercase tracking-widest text-zinc-300 font-sans font-medium">Varanasi, India</span>
                        </div>

                        <iframe
                            title="Lumina Press Store Location — Varanasi"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3604.869539867!2d82.99790!3d25.28459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2db76febcf4d%3A0x68d96e2a282f9a9a!2sAssi%20Ghat%2C%20Varanasi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) saturate(0.8) brightness(0.9)' }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </motion.div>
                </div>
            </section>

        </main>
    );
}
