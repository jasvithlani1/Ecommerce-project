import { gql } from '@apollo/client';
import client from '@/lib/apollo-client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookCard from '@/components/BookCard';

const GET_PRODUCTS = gql`
  query GetProducts {
    products(first: 24) {
      nodes {
        id
        databaseId
        name
        slug
        image {
          sourceUrl
        }
        ... on SimpleProduct {
          price
        }
        ... on VariableProduct {
          price
        }
      }
    }
  }
`;

interface ProductNode {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  image: {
    sourceUrl: string;
  } | null;
  price?: string;
}

interface ProductsData {
  products: {
    nodes: ProductNode[];
  };
}

export default async function BooksPage() {
  const { data } = await client.query<ProductsData>({
    query: GET_PRODUCTS,
  });

  const products = data?.products?.nodes || [];

  return (
    <main className="min-h-screen bg-zinc-950">
      <Navbar />

      <div className="pt-32 pb-24 px-6 md:px-12">
        <div className="container mx-auto">
          <div className="mb-16 space-y-4 text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-serif text-white tracking-wider uppercase">Catalog</h1>
            <div className="h-px w-32 bg-zinc-800 mx-auto lg:mx-0" />
            <p className="text-zinc-500 font-sans tracking-[0.3em] uppercase text-xs">Curated architectural and cultural publications</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
            {products.map((product) => (
              <BookCard
                key={product.id}
                name={product.name}
                price={product.price || ''}
                image={product.image || undefined}
                slug={product.slug}
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}