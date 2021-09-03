import { usePokemonListQuery } from './generated/graphql'

function PokemonList() {
    const { data } = usePokemonListQuery({ limit: 25, offset: 0 })
    console.log(`data`, data)
    return (
        <ul>
            {data?.pokemon_v2_pokemon?.map((pokemon) => {
                const { id, name } = pokemon
                return (
                    <li key={id}>
                        {name}
                        <img
                            src={`${process.env.PUBLIC_URL}/pokemons/${id}.png`}
                            alt={name}
                        />
                    </li>
                )
            })}
        </ul>
    )
}

export default PokemonList
