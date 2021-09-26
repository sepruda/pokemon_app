import { QueryClient, QueryClientProvider } from 'react-query'
import { Global, css } from '@emotion/react'
import { BrowserRouter, Route } from 'react-router-dom'
import PokemonList from './PokemonList/PokemonList'

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Global
                styles={css`
                    body {
                        background-color: hsl(220deg 100% 80%);
                        padding: 2rem;
                        font-family: 'Poppins', sans-serif;
                        scroll-behavior: smooth;
                    }
                `}
            />
            <BrowserRouter>
                <Route path="/">
                    <PokemonList />
                </Route>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App
