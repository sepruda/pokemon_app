import styled from '@emotion/styled/macro'
import { usePokemonListQuery } from '../generated/graphql'
import PokemonCard from '../PokemonCard/PokemonCard'

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 1.5rem;
    grid-auto-rows: auto;
`

function PokemonList() {
    const { data } = usePokemonListQuery({ limit: 25, offset: 0 })
    console.log(`data`, data)
    return (
        <Wrapper>
            {data?.pokemon_v2_pokemon?.map((pokemon) => (
                <PokemonCard pokemon={pokemon} />
            ))}
        </Wrapper>
    )
}

export default PokemonList
