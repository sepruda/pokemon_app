import styled from '@emotion/styled'

const Card = styled.div`
    background-color: white;
    border-radius: 5px;
    display: flex;
    filter: drop-shadow(2px 4px 8px hsl(220deg 60% 50%));
    flex-direction: column;
`

const CardTitle = styled.h3`
    text-transform: capitalize;
    &:p {
        color: lightgrey;
    }
`

const CardImageWrapper = styled.div`
    align-self: center;
    background-color: hsl(156deg, 76%, 84%);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    width: 100%;
`

const CardImage = styled.img`
    margin: auto;
    display: block;
`
const CardInfo = styled.div`
    padding: 0.5rem;
`

type Props = {
    pokemon: any
}

function PokemonCard({ pokemon }: Props) {
    const { id, name, weight, height } = pokemon

    return (
        <Card key={id}>
            <CardImageWrapper>
                <CardImage
                    src={`${process.env.PUBLIC_URL}/pokemons/${id}.png`}
                    alt={name}
                />
            </CardImageWrapper>
            <CardInfo>
                <CardTitle>{`${name}`}</CardTitle>
                {`#${id}`}
                <p>{`Weight - ${weight}`}</p>
                <p>{`Height - ${height}`}</p>
            </CardInfo>
        </Card>
    )
}

export default PokemonCard
