import { Twitter, Instagram, Facebook } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-zinc-950 border-t border-zinc-900 py-20 px-6 text-zinc-500 font-sans">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
                <div className="space-y-4 text-center md:text-left">
                    <Link href="/" className="text-xl font-serif text-white tracking-widest uppercase block">
                        Lumina <span className="text-zinc-500 italic">Press</span>
                    </Link>
                    <p className="text-xs tracking-widest uppercase">
                        &copy; 2026 Lumina Press. All rights reserved.
                    </p>
                </div>

                <div className="flex gap-8 items-center">
                    <a href="#" className="hover:text-zinc-300 transition-colors duration-300">
                        <Twitter size={18} />
                    </a>
                    <a href="#" className="hover:text-zinc-300 transition-colors duration-300">
                        <Instagram size={18} />
                    </a>
                    <a href="#" className="hover:text-zinc-300 transition-colors duration-300">
                        <Facebook size={18} />
                    </a>
                </div>

                <div className="flex gap-10 text-[10px] uppercase tracking-[0.2em] font-medium transition-colors">
                    <Link href="/privacy" className="hover:text-white">Privacy</Link>
                    <Link href="/terms" className="hover:text-white">Terms</Link>
                    <Link href="/contact" className="hover:text-white">Contact</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
