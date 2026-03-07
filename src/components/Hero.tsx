'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-zinc-950 flex items-center justify-center">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-zinc-500/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 text-center lg:text-left"
        >
          <div className="space-y-4">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-zinc-500 font-sans font-medium tracking-widest uppercase text-sm"
            >
              Featured Release
            </motion.span>
            <h1 className="text-5xl lg:text-8xl font-serif text-white leading-tight">
              The Art of <br />
              <span className="italic text-zinc-500">Typography</span>
            </h1>
            <p className="text-zinc-500 text-lg max-w-md mx-auto lg:mx-0 leading-relaxed font-sans">
              Explore the evolution of the printed word in this limited edition masterpiece. A journey through form, craft, and history.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start font-sans"
          >
            <Link
              href="/books"
              className="px-10 py-4 bg-zinc-100 text-zinc-950 font-medium hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 duration-300 text-center"
            >
              View Collections
            </Link>
            <Link
              href="/about"
              className="px-10 py-4 border border-zinc-800 text-zinc-400 font-medium hover:bg-zinc-900 transition-all hover:border-zinc-700 duration-300 text-center"
            >
              Explore History
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative flex justify-center lg:justify-end"
          style={{ perspective: "1000px" }}
        >
          <div className="relative w-[280px] h-[420px] lg:w-[450px] lg:h-[650px] shadow-2xl shadow-black/80 group">
            <Image
              src="/images/hero_featured.png"
              alt="Featured Book"
              fill
              className="object-cover rounded-sm transition-transform duration-1000 group-hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {/* Shelf shadow effect */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[80%] h-4 bg-black/40 blur-xl rounded-full" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
