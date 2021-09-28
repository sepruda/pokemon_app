import { Modal } from '@mui/material'
import { useState } from 'react'
import { PokemonListQuery } from '../../generated/graphql'
import PokemonDetails from '../PokemonDetails/PokemonDetails'
import {
    Card,
    CardImage,
    CardImageWrapper,
    CardInfo,
    CardTitle,
} from './styles'

type Props = {
    pokemon: PokemonListQuery['pokemon_v2_pokemon'][0]
}

function PokemonCard({ pokemon }: Props) {
    const {
        id,
        name,
        weight,
        height,
        pokemon_v2_pokemonabilities: abilities,
    } = pokemon
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <>
            <Card key={id} onClick={handleOpen}>
                <CardImageWrapper>
                    <CardImage
                        src={`${process.env.PUBLIC_URL}/pokemons/${id}.png`}
                        alt={name}
                    />
                </CardImageWrapper>
                <CardInfo>
                    <CardTitle id="modal-title">{`${name}`}</CardTitle>
                    <div>{`Weight - ${weight}`}</div>
                    <div>{`Height - ${height}`}</div>
                    <h4>Abilities</h4>
                    <ul>
                        {abilities?.map((el) => (
                            <li>{el?.pokemon_v2_ability?.name}</li>
                        ))}
                    </ul>
                </CardInfo>
            </Card>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
            >
                <PokemonDetails id={id} onClose={handleClose} />
            </Modal>
        </>
    )
}

export default PokemonCard
