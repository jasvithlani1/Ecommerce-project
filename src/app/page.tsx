import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategoryGrid from '@/components/CategoryGrid';
import LatestArrivals from '@/components/LatestArrivals';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar />
      <Hero />
      <CategoryGrid />
      <LatestArrivals />
      <Footer />
    </main>
  );
}
