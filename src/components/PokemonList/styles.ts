import styled from '@emotion/styled'
import { CircularProgress, Select, TextField } from '@mui/material'
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

export const HeaderWrapper = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
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

export const SearchField = styled(TextField)`
    margin: 0 8px;
`
