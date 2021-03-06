import { QueryClient, QueryClientProvider } from 'react-query'
import { Global, css } from '@emotion/react'
import { BrowserRouter, Route } from 'react-router-dom'
import PokemonList from './components/PokemonList/PokemonList'

const queryClient = new QueryClient()

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Global
                styles={css`
                    html {
                        overflow-x: hidden;
                    }
                    body {
                        background-color: hsl(220deg 100% 80%);
                        margin: 2rem;
                        font-family: 'Poppins', sans-serif;
                        scroll-behavior: smooth;
                        overflow-x: hidden;
                    }
                `}
            />
            <BrowserRouter>
                <Route>
                    <PokemonList />
                </Route>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App
