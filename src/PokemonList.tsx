import { usePokemonQuery } from './generated/graphql'

function PokemonList() {
    const { data } = usePokemonQuery()

    return <div>{data}</div>
}

export default PokemonList
