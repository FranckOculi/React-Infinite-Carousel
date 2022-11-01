import { GraphClient } from './ApolloClient'

interface ProvidersProps {
	children: JSX.Element
}

const Providers = ({ children }: ProvidersProps) => {
	return <GraphClient>{children}</GraphClient>
}

export default Providers
