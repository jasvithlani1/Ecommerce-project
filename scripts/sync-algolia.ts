// scripts/sync-algolia.ts
import { algoliasearch } from 'algoliasearch';
import client from '../src/lib/apollo-client.ts'; // Import your existing Apollo client
import { gql } from '@apollo/client';
import 'dotenv/config'; // This loads your .env.local file


// 1. Initialize Algolia
const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '1MVEKVJSZS';
const adminKey = process.env.ALGOLIA_ADMIN_API_KEY || '39e9f691159ae28b8eccc0e2b881ed38'; // Use server-side admin key for syncing
const indexName = process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || 'books_index';

if (!appId || !adminKey) {
    console.error("Missing Algolia credentials. Please set NEXT_PUBLIC_ALGOLIA_APP_ID and ALGOLIA_ADMIN_API_KEY in .env.local");
    process.exit(1);
}

const algoliaClient = algoliasearch(appId, adminKey);

const GET_ALL_BOOKS = gql`
  query GetAllBooks {
    products(first: 100) {
      nodes {
        databaseId
        name
        slug
        ... on SimpleProduct { price }
      }
    }
  }
`;

async function runSync() {
    console.log("Fetching books from WordPress...");
    const { data }: any = await client.query({ query: GET_ALL_BOOKS });

    // 2. Format the data for Algolia
    const records = data.products.nodes.map((book: any) => ({
        objectID: book.databaseId.toString(), // Algolia needs a unique ID
        name: book.name,
        slug: book.slug,
        price: book.price || "Contact for price",
    }));

    // 3. Push to Algolia
    console.log(`Pushing ${records.length} books to Algolia...`);
    await algoliaClient.saveObjects({
        indexName: indexName, // This name will be created automatically in Algolia
        objects: records,
    });

    console.log("Sync complete!");
}

runSync().catch(console.error);