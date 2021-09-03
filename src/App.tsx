import { QueryClient, QueryClientProvider } from 'react-query'
import PokemonList from './PokemonList'

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <PokemonList />
        </QueryClientProvider>
    )
}

export default App
