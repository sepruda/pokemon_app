import styled from '@emotion/styled'
import { CircularProgress, Select } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'

export const Wrapper = styled.div`
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
    padding-bottom: 24px;
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
