import {
    TablePagination,
    InputLabel,
    MenuItem,
    SelectChangeEvent,
    FormControl,
    IconButton,
} from '@mui/material'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import { usePokemonListQuery } from '../generated/graphql'
import PokemonCard from '../PokemonCard/PokemonCard'
import {
    HeaderWrapper,
    Spinner,
    StyledArrow,
    StyledSelect,
    Wrapper,
} from './styles'

function PokemonList() {
    const [cardsPerPage, setCardsPerPage] = useState(10)
    const [page, setPage] = useState(0)
    const [sortBy, setSortBy] = useState('id')
    const [ordering, setOrdering] = useState('asc')
    const history = useHistory()
    const location = useLocation()
    const ascending = ordering === 'asc'

    // We need to do a HTTP request, since the graphQL API doesn't deliver a total count
    const { data: paginationData } = useQuery('fetchEntries', () =>
        fetch('https://pokeapi.co/api/v2/pokemon/?limit=1').then((res) =>
            res.json(),
        ),
    )
    const { data, isLoading } = usePokemonListQuery(
        {
            order_by: { [sortBy]: ordering },
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

    const handleChangeSorting = (event: SelectChangeEvent<unknown>) => {
        setSortBy(event.target.value as string)
    }

    const handleChangeOrder = () => {
        setOrdering((prevState) => (prevState === 'asc' ? 'desc' : 'asc'))
    }
    console.log(`ordering`, ordering)

    // TODO • User should be able to search through the Pokémon list using the name and abilities
    // • User should be able to sort the result by name, height and weight.

    const Pagination = (
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
    )

    return (
        <div>
            <HeaderWrapper>
                <FormControl sx={{ flexDirection: 'row' }}>
                    <InputLabel id="sort-by-label">Sort by</InputLabel>
                    <StyledSelect
                        labelId="sort-by-label"
                        id="sort-by"
                        value={sortBy}
                        label="sortBy"
                        onChange={handleChangeSorting}
                        size="small"
                    >
                        <MenuItem value="id">ID</MenuItem>
                        <MenuItem value="name">Name</MenuItem>
                        <MenuItem value="height">Height</MenuItem>
                        <MenuItem value="weight">Weight</MenuItem>
                    </StyledSelect>
                    <IconButton
                        aria-label="sorting"
                        onClick={handleChangeOrder}
                    >
                        <StyledArrow
                            className={ascending ? 'ascending' : 'descending'}
                        />
                    </IconButton>
                </FormControl>

                {Pagination}
            </HeaderWrapper>
            {isLoading ? (
                <Spinner />
            ) : (
                <Wrapper>
                    {data?.pokemon_v2_pokemon?.map((pokemon) => (
                        <PokemonCard pokemon={pokemon} />
                    ))}
                </Wrapper>
            )}
            {Pagination}
        </div>
    )
}

export default PokemonList
