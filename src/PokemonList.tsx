import styled from '@emotion/styled/macro'
import { usePokemonListQuery } from './generated/graphql'

const Wrapper = styled.ul`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 16px;
`

const Card = styled.li`
    max-width: 300px;
    border-radius: 5px;
    background-color: lightgrey;
    list-style-type: none;
    padding: 8px;
    display: flex;
    flex-direction: column;
`

const CardTitle = styled.h3`
    text-align: center;
    text-transform: capitalize;
`

const CardImage = styled.img`
    align-self: center;
`

function PokemonList() {
    const { data } = usePokemonListQuery({ limit: 25, offset: 0 })
    console.log(`data`, data)
    return (
        <Wrapper>
            {data?.pokemon_v2_pokemon?.map((pokemon) => {
                const { id, name, weight, height } = pokemon
                return (
                    <Card key={id}>
                        <CardTitle>{name}</CardTitle>
                        <CardImage
                            src={`${process.env.PUBLIC_URL}/pokemons/${id}.png`}
                            alt={name}
                        />
                        <div>
                            <p>{`Weight - ${weight}`}</p>
                            <p>{`Height - ${height}`}</p>
                        </div>
                    </Card>
                )
            })}
        </Wrapper>
    )
}

export default PokemonList
