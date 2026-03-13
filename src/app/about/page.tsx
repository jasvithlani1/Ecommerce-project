'use client';

import { motion } from 'framer-motion';
import { BookOpen, PenTool, Coffee, Library } from 'lucide-react';
import Image from 'next/image';

const fadeUp = {
    hidden: { opacity: 0, y: 32 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    }),
};

export default function AboutPage() {
    return (
        <main className="bg-zinc-950 text-white min-h-screen">

            {/* ── Hero Section ── */}
            <section className="relative overflow-hidden pt-40 pb-32 px-6">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-zinc-700/10 rounded-full blur-[120px]" />
                </div>

                <div className="relative container mx-auto max-w-4xl text-center space-y-8">
                    <motion.p
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-sans font-medium"
                    >
                        Our Story · Lumina Press
                    </motion.p>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1]"
                    >
                        Curating the <span className="text-zinc-400 italic font-light">Extraordinary</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-zinc-400 font-sans text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light"
                    >
                        We are more than a publisher; we are custodians of thought. Lumina Press is dedicated to bringing visionary voices to the discerning reader, one meticulously crafted volume at a time.
                    </motion.p>

                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="w-32 h-px bg-zinc-700 mx-auto origin-left mt-12"
                    />
                </div>
            </section>

            {/* ── The Vision ── */}
            <section className="px-6 py-24 relative">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <h2 className="font-serif text-4xl md:text-5xl font-bold leading-tight">
                                A Sanctuary for <br />
                                <span className="text-zinc-500 italic">Literary Art</span>
                            </h2>
                            <div className="space-y-6 text-zinc-400 font-sans leading-relaxed text-lg font-light">
                                <p>
                                    Founded on the banks of the Ganges in Varanasi, Lumina Press began as a humble reading room—a quiet refuge for seekers of knowledge. Over the years, it evolved into a premier independent publishing house.
                                </p>
                                <p>
                                    Our mission is simple yet profound: to discover and elevate narratives that challenge the mind and nourish the soul. We believe that a book is not just a vessel for words, but an artifact of human connection.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ duration: 1 }}
                            className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden border border-zinc-800/80 group"
                        >
                            <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
                                {/* Fallback if no image is present - styled beautifully */}
                                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950 opacity-50" />
                                <Library size={64} className="text-zinc-700/50 relative z-10 group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-zinc-950 to-transparent" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ── Core Values ── */}
            <section className="px-6 py-32 bg-zinc-900/20 border-y border-zinc-900">
                <div className="container mx-auto max-w-6xl">
                    <div className="text-center mb-20 space-y-4">
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-sans font-medium"
                        >
                            Our Ethos
                        </motion.p>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="font-serif text-4xl md:text-5xl font-bold"
                        >
                            What Drives Us
                        </motion.h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: PenTool,
                                title: "Editorial Excellence",
                                desc: "We work intimately with our authors, refining every sentence to ensure the truest expression of their vision."
                            },
                            {
                                icon: BookOpen,
                                title: "Exceptional Design",
                                desc: "Every Lumina book is a tactile masterpiece, featuring bespoke typography and premium, sustainable materials."
                            },
                            {
                                icon: Coffee,
                                title: "Community Focus",
                                desc: "Our Varanasi flagship store remains a hub for literary discourse, poetry readings, and silent contemplation."
                            }
                        ].map((value, i) => (
                            <motion.div
                                key={value.title}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: '-50px' }}
                                variants={fadeUp}
                                className="p-8 rounded-3xl border border-zinc-800/60 bg-zinc-950/50 hover:bg-zinc-900 hover:border-zinc-700/60 transition-all duration-500 group"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-white/10 transition-colors">
                                    <value.icon size={24} className="text-zinc-400 group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="font-serif text-2xl font-bold mb-4">{value.title}</h3>
                                <p className="text-zinc-500 font-sans leading-relaxed text-sm">
                                    {value.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
