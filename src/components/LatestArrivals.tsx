import { gql } from '@apollo/client';
import client from '@/lib/apollo-client';
import BookCard from '@/components/BookCard';

const GET_LATEST_PRODUCTS = gql`
  query GetLatestProducts {
    products(first: 4, where: { orderby: { field: DATE, order: DESC } }) {
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

interface LatestProductsData {
  products: {
    nodes: ProductNode[];
  };
}

export default async function LatestArrivals() {
  const { data } = await client.query<LatestProductsData>({
    query: GET_LATEST_PRODUCTS,
  });

  const products = data?.products?.nodes || [];

  return (
    <section className="py-24 bg-zinc-950 px-6 overflow-hidden border-t border-zinc-900">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-16">
          <div className="space-y-4">
            <h2 className="text-4xl font-serif text-white uppercase tracking-wider">Latest Arrivals</h2>
            <div className="h-px w-24 bg-zinc-800" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {products.map((product) => (
            <BookCard
              key={product.id}
              id={product.databaseId}
              name={product.name}
              price={product.price || ''}
              image={product.image || undefined}
              slug={product.slug}
            />

          ))}
        </div>
      </div>
    </section>
  );
}
