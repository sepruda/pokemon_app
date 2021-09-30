import styled from '@emotion/styled'
import {
    CircularProgress,
    FormControl,
    Select,
    TablePagination,
    TextField,
} from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

export const CardWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 1.5rem;
    grid-auto-rows: auto;
    margin: auto;
`

export const Spinner = styled(CircularProgress)`
    display: block;
    margin: auto;
`

export const Header = styled(FormControl)`
    justify-content: baseline;
    gap: 24px;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    padding: 24px 0;
    width: 100%;
`

export const StyledSelect = styled(Select)`
    width: 150px;
`

export const StyledArrow = styled(ArrowUpwardIcon)`
    transition: all 0.4s;

    &.descending {
        transform: rotate(180deg);
    }
`

export const SearchField = styled(TextField)``

export const StyledPagination = styled(TablePagination)`
    padding: 0;
    overflow-x: hidden;

    & .MuiToolbar-root {
        flex-wrap: wrap;
    }
`
