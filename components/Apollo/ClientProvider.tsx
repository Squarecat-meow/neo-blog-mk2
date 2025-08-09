'use client';

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const httpLink = createHttpLink({
    uri: 'https://api.github.com/graphql',
    headers: {
      authorization: `Bearer ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
    },
  });
  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    devtools: {
      enabled: true,
    },
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
