import {
    TablePagination,
    InputLabel,
    MenuItem,
    SelectChangeEvent,
    FormControl,
    IconButton,
    TextField,
    InputAdornment,
} from '@mui/material'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import { usePokemonListQuery } from '../../generated/graphql'
import useDebounce from '../../hooks/useDebounce'
import PokemonCard from '../PokemonCard/PokemonCard'

import {
    HeaderWrapper,
    Spinner,
    StyledArrow,
    StyledSelect,
    CardWrapper,
    SearchField,
} from './styles'

function PokemonList() {
    const [cardsPerPage, setCardsPerPage] = useState(10)
    const [page, setPage] = useState(0)
    const [sortBy, setSortBy] = useState('id')
    const [ordering, setOrdering] = useState('asc')
    const [searchQuery, setSearchQuery] = useState({ name: '', ability: '' })
    const history = useHistory()
    const location = useLocation()
    const ascending = ordering === 'asc'
    const debouncedNameQuery = useDebounce(searchQuery.name, 500)
    const debounceAbilityQuery = useDebounce(searchQuery.ability, 500)

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery({
            ...searchQuery,
            [event.target.name]: event.target.value,
        })
    }

    const handleClearName = () => {
        setSearchQuery({ ...searchQuery, name: '' })
    }

    const handleClearAbility = () => {
        setSearchQuery({ ...searchQuery, ability: '' })
    }

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
            searchName: debouncedNameQuery,
            searchAbility: debounceAbilityQuery,
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
            <img src={`${process.env.PUBLIC_URL}pokeapi.png`} alt="poke-api" />
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
                    <SearchField
                        label="Search name"
                        name="name"
                        onChange={handleSearch}
                        onClick={handleClearAbility}
                        placeholder="e.g. charizard"
                        value={searchQuery.name}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <IconButton
                                    aria-label="clear name search"
                                    onClick={handleClearName}
                                    edge="end"
                                >
                                    <ClearIcon />
                                </IconButton>
                            ),
                        }}
                    />
                    <SearchField
                        label="Search abilities"
                        name="ability"
                        onChange={handleSearch}
                        onClick={handleClearName}
                        placeholder="e.g. overgrow"
                        value={searchQuery.ability}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <IconButton
                                    aria-label="clear ability search"
                                    onClick={handleClearAbility}
                                    edge="end"
                                >
                                    <ClearIcon />
                                </IconButton>
                            ),
                        }}
                    />
                </FormControl>
            </HeaderWrapper>
            {!isLoading && !data?.pokemon_v2_pokemon.length ? (
                <h1 style={{ textAlign: 'center' }}>No results!</h1>
            ) : (
                <>
                    {Pagination}

                    {isLoading ? (
                        <Spinner />
                    ) : (
                        <CardWrapper>
                            {data?.pokemon_v2_pokemon?.map((pokemon) => (
                                <PokemonCard pokemon={pokemon} />
                            ))}
                        </CardWrapper>
                    )}
                    {Pagination}
                </>
            )}
        </div>
    )
}

export default PokemonList
