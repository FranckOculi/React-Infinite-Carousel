import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

type GraphClientProps = {
	children: JSX.Element
}

export const GraphClient = ({ children }: GraphClientProps) => {
	const client = new ApolloClient({
		uri: 'http://localhost:4000',
		cache: new InMemoryCache(),
	})

	return <ApolloProvider client={client}>{children}</ApolloProvider>
}
