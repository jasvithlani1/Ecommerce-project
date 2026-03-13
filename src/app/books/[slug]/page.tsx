import { gql } from '@apollo/client';
import client from '@/lib/apollo-client';
import ProductActions from '@/components/ProductActions';
import Image from 'next/image';
import sanitizeHtml from 'sanitize-html';
import { cleanDescription as cleanHtml, formatPrice } from '@/lib/utils';
import { notFound } from 'next/navigation';

const GET_PRODUCT_BY_SLUG = gql`
  query GetProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      databaseId
      name
      description
      shortDescription
      image {
        sourceUrl
        altText
      }
      ... on SimpleProduct {
        price
        regularPrice
        stockStatus
        stockQuantity
      }
      ... on VariableProduct {
        price
        regularPrice
        stockStatus
        stockQuantity
      }
    }
  }
`;

interface PageProps {
    params: Promise<{ slug: string }>;
}

interface ProductQueryResult {
    product: {
        id: string;
        databaseId: number;
        name: string;
        description: string;
        shortDescription: string;
        image: {
            sourceUrl: string;
            altText: string;
        } | null;
        stockStatus?: string;
        stockQuantity?: number;
        price?: string;
        regularPrice?: string;
    } | null;
}

export default async function BookDetailPage({ params }: PageProps) {
    const { slug } = await params;

    const { data } = await client.query<ProductQueryResult>({
        query: GET_PRODUCT_BY_SLUG,
        variables: { slug },
    });

    const product = data?.product;

    if (!product) {
        notFound();
    }

    // UPDATED: Sanitize with stricter rules to block those PDF iframes
    const rawDescription = product.description
        ? sanitizeHtml(product.description, {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
            disallowedTagsMode: 'discard', // This removes unwanted tags entirely
        })
        : '';

    const finalDescription = cleanHtml(rawDescription);

    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-300 selection:bg-zinc-500/30">

            <div className="pt-32 pb-24 px-6 md:px-12">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

                        {/* Main Product Image Section */}

                        <div className="relative aspect-[3/4.5] bg-zinc-900 border border-zinc-900 shadow-2xl overflow-hidden group">
                            {product.image?.sourceUrl ? (
                                <Image
                                    src={product.image.sourceUrl}
                                    alt={product.image.altText || product.name}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-zinc-700 font-serif italic">
                                    No Image Available
                                </div>
                            )}
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-black/40" />
                        </div>

                        {/* Product Info Section */}
                        <div className="space-y-10 py-4">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-none tracking-tight">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-6 pt-2">
                                <p className="text-2xl md:text-3xl font-sans text-zinc-100 font-light tracking-wider">
                                    {formatPrice(product.price || null)}
                                </p>
                            </div>

                            <div className="h-px w-full bg-zinc-900" />

                            <ProductActions
                                productId={product.databaseId}
                                name={product.name}
                                price={product.price || ''}
                                image={product.image?.sourceUrl}
                                slug={slug}
                                stockQuantity={product.stockQuantity}
                                stockStatus={product.stockStatus}
                            />


                            <div className="space-y-6">
                                <h2 className="text-xs uppercase tracking-[0.4em] text-zinc-500 font-sans font-semibold">Synopsis</h2>
                                <div
                                    className="prose prose-invert prose-zinc max-w-none text-zinc-400 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: finalDescription }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}