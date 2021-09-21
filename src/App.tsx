import { QueryClient, QueryClientProvider } from 'react-query'
import { Global, css } from '@emotion/react'
import PokemonList from './PokemonList'

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Global
                styles={css`
                    body {
                        background-color: hsl(220deg 100% 80%);
                        padding: 2rem;
                    }
                `}
            />
            <PokemonList />
        </QueryClientProvider>
    )
}

export default App
