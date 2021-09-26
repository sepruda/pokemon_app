import styled from '@emotion/styled/macro'
import { TablePagination, CircularProgress } from '@mui/material'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { usePokemonListQuery } from '../generated/graphql'
import PokemonCard from '../PokemonCard/PokemonCard'

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 1.5rem;
    grid-auto-rows: auto;
    margin: auto;
`

const Spinner = styled(CircularProgress)`
    display: block;
    margin: auto;
`

function PokemonList() {
    const [cardsPerPage, setCardsPerPage] = useState(10)
    const [page, setPage] = useState(0)
    const history = useHistory()
    const location = useLocation()

    // We need to do a HTTP request, since the graphQL API doesn't deliver a total count
    const { data: paginationData } = useQuery('fetchEntries', () =>
        fetch('https://pokeapi.co/api/v2/pokemon/?limit=1').then((res) =>
            res.json(),
        ),
    )
    const { data, isLoading } = usePokemonListQuery(
        {
            limit: cardsPerPage,
            offset: page * cardsPerPage,
        },
        { keepPreviousData: true },
    )

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setCardsPerPage(parseInt(event.target.value, 10))
        setPage(0)
        const limit = new URLSearchParams({ limit: event.target.value })
        history.replace({
            pathname: location?.pathname,
            search: limit.toString(),
        })
    }

    return (
        <div>
            <TablePagination
                component="div"
                count={paginationData?.count || -1}
                labelRowsPerPage="Cards per page"
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={cardsPerPage}
                rowsPerPageOptions={[10, 20, 50]}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            {isLoading ? (
                <Spinner />
            ) : (
                <Wrapper>
                    {data?.pokemon_v2_pokemon?.map((pokemon) => (
                        <PokemonCard pokemon={pokemon} />
                    ))}
                </Wrapper>
            )}
        </div>
    )
}

export default PokemonList
