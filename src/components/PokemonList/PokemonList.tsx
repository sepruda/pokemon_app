import {
    InputLabel,
    MenuItem,
    SelectChangeEvent,
    FormControl,
    IconButton,
    InputAdornment,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { useHistory, useLocation } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import ClearIcon from '@mui/icons-material/Clear'
import { usePokemonListQuery } from '../../generated/graphql'
import useDebounce from '../../hooks/useDebounce'
import PokemonCard from '../PokemonCard/PokemonCard'

import {
    Header,
    Spinner,
    StyledArrow,
    StyledSelect,
    CardWrapper,
    SearchField,
    StyledPagination,
} from './styles'

function PokemonList() {
    const [cardsPerPage, setCardsPerPage] = useState(10)
    const [page, setPage] = useState(0)
    const query = new URLSearchParams(useLocation().search)

    const [sortBy, setSortBy] = useState(query?.get('sort') || 'id')
    const [ordering, setOrdering] = useState(query?.get('direction') || 'asc')
    const [searchQuery, setSearchQuery] = useState({
        name: query?.get('name') || '',
        ability: query?.get('ability') || '',
    })
    const history = useHistory()
    const ascending = ordering === 'asc'
    const debouncedNameQuery = useDebounce(searchQuery.name, 500)
    const debounceAbilityQuery = useDebounce(searchQuery.ability, 500)

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

    useEffect(() => {
        const params = new URLSearchParams()
        if (searchQuery.name) {
            params.append('name', searchQuery.name)
        } else {
            params.delete('name')
        }

        if (searchQuery.ability) {
            params.append('ability', searchQuery.ability)
        } else {
            params.delete('ability')
        }

        if (sortBy !== 'id') {
            params.append('sort', sortBy)
            params.append('direction', ordering)
        } else {
            params.delete('sort')
            params.delete('direction')
        }

        history.push({ search: params.toString() })
    }, [searchQuery, history, sortBy, ordering])

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery({
            ...searchQuery,
            [event.target.name]: event.target.value,
        })
    }

    const handleClearSearch = () => {
        setSearchQuery({ name: '', ability: '' })
    }

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
    }

    const handleChangeSorting = (event: SelectChangeEvent<unknown>) => {
        setSortBy(event.target.value as string)
    }

    const handleChangeOrder = () => {
        setOrdering((prevState) => (prevState === 'asc' ? 'desc' : 'asc'))
    }

    const searchInputProps = {
        startAdornment: (
            <InputAdornment position="start">
                <SearchIcon />
            </InputAdornment>
        ),
        endAdornment: (
            <IconButton
                aria-label="clear name search"
                onClick={handleClearSearch}
                edge="end"
            >
                <ClearIcon />
            </IconButton>
        ),
    }

    const Pagination = (
        <StyledPagination
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
            <Header>
                <FormControl sx={{ flexDirection: 'row' }}>
                    <InputLabel id="sort-by-label">Sort by</InputLabel>
                    <StyledSelect
                        labelId="sort-by-label"
                        id="sort-by"
                        value={sortBy}
                        label="sortBy"
                        onChange={handleChangeSorting}
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
                <SearchField
                    label="Search name"
                    name="name"
                    onChange={handleSearch}
                    placeholder="e.g. charizard"
                    value={searchQuery.name}
                    InputProps={searchInputProps}
                />
                <SearchField
                    label="Search abilities"
                    name="ability"
                    onChange={handleSearch}
                    placeholder="e.g. overgrow"
                    value={searchQuery.ability}
                    InputProps={searchInputProps}
                />
            </Header>
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
                                <PokemonCard
                                    key={pokemon.id}
                                    pokemon={pokemon}
                                />
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
