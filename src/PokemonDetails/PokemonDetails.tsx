import { Button } from '@mui/material'
import { usePokemonDetailsQuery } from '../generated/graphql'
import {
    CardImage,
    CardImageWrapper,
    CardInfo,
    CardTitle,
} from '../PokemonCard/styles'
import { CardFooter, FlavorText, ModalWrapper, Spinner } from './styles'

type Props = {
    id: number
    onClose: () => void
}

function PokemonDetails({ id, onClose }: Props) {
    const { data, isLoading } = usePokemonDetailsQuery({
        id,
    })
    const p = data?.pokemon_v2_pokemon?.[0]

    return (
        <ModalWrapper>
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <CardImageWrapper>
                        <CardImage
                            src={`${process.env.PUBLIC_URL}/pokemons/${id}.png`}
                            alt={p?.name}
                        />
                    </CardImageWrapper>
                    <CardInfo>
                        <CardTitle>{`${p?.name} #${id}`}</CardTitle>
                        <div>{`Weight - ${p?.weight}`}</div>
                        <div>{`Height - ${p?.height}`}</div>
                        <div>{`Base experience - ${p?.base_experience}`}</div>
                        <h4>Abilities</h4>
                        <ul>
                            {p?.pokemon_v2_pokemonabilities?.map((el) => {
                                const ability = el?.pokemon_v2_ability
                                return (
                                    <>
                                        <li>{ability?.name}</li>
                                        <FlavorText>
                                            {
                                                ability
                                                    ?.pokemon_v2_abilityflavortexts?.[0]
                                                    ?.flavor_text
                                            }
                                        </FlavorText>
                                    </>
                                )
                            })}
                        </ul>
                        <h4>Stats</h4>
                        <ul>
                            {p?.pokemon_v2_pokemonstats?.map((el) => {
                                return (
                                    <li>{`${el.pokemon_v2_stat?.name} - ${el.base_stat}`}</li>
                                )
                            })}
                        </ul>
                    </CardInfo>
                    <CardFooter>
                        <Button onClick={onClose}>Go back</Button>
                    </CardFooter>
                </>
            )}
        </ModalWrapper>
    )
}

export default PokemonDetails
