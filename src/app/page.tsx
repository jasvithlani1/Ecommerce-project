import Hero from '@/components/Hero';
import CategoryGrid from '@/components/CategoryGrid';
import LatestArrivals from '@/components/LatestArrivals';

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Hero />
      <CategoryGrid />
      <LatestArrivals />
    </main>
  );
}
