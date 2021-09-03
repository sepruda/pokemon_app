import { usePokemonListQuery } from './generated/graphql'

function PokemonList() {
    const { data } = usePokemonListQuery({ limit: 10, offset: 0 })
    console.log(`data`, data)
    return (
        <div>
            {data?.pokemon_v2_pokemon?.map((pokemon) => (
                <p>{pokemon.name}</p>
            ))}
        </div>
    )
}

export default PokemonList
