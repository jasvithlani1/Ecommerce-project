import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
    link: new HttpLink({
        // Replace with your URL or use process.env.NEXT_PUBLIC_WORDPRESS_API_URL
        uri: "https://chaukhambhabooks.com/graphql",
    }),
    cache: new InMemoryCache(),
});

export default client;