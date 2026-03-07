import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthorCard from '@/components/AuthorCard';

const mockAuthors = [
    {
        id: 1,
        name: 'Elizabeth Wright',
        specialization: 'Typography & Design',
        image: '/images/hero_featured.png',
        bio: 'Elizabeth Wright is a master typographer whose work explores the intricate relationship between the printed word and visual perception. With over two decades of experience, her books are considered definitive guides in the field.'
    },
    {
        id: 2,
        name: 'Clara Vance',
        specialization: 'Contemporary Poetry',
        image: '/images/latest_arrival_1.png',
        bio: 'Clara Vance is a celebrated poet whose verses capture the ephemeral nature of time and memory. Her latest collection, "The Geography of Lost Hours," has received widespread critical acclaim.'
    },
    {
        id: 3,
        name: 'Eliza Reed',
        specialization: 'Modern Fiction',
        image: '/images/category_fiction.png',
        bio: 'Eliza Reed is an award-winning novelist known for her complex narratives and profound character development. Her work often delves into the hidden depths of human emotion.'
    },
];

export default function AuthorsPage() {
    return (
        <main className="min-h-screen bg-zinc-950">
            <Navbar />

            <div className="pt-32 pb-24 px-6">
                <div className="container mx-auto">
                    <div className="mb-16 space-y-4">
                        <h1 className="text-5xl lg:text-7xl font-serif text-white tracking-wider uppercase">Authors</h1>
                        <div className="h-px w-32 bg-zinc-500" />
                        <p className="text-zinc-500 font-sans tracking-widest uppercase text-sm text-[10px]">The visionaries behind our most celebrated works</p>
                    </div>

                    <div className="grid grid-cols-1 gap-12">
                        {mockAuthors.map((author) => (
                            <AuthorCard
                                key={author.id}
                                name={author.name}
                                specialization={author.specialization}
                                image={author.image}
                                bio={author.bio}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
