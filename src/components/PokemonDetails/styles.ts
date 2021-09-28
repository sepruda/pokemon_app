import styled from '@emotion/styled'
import { CircularProgress } from '@mui/material'

export const ModalWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 300px;
    background-color: white;
`

export const Spinner = styled(CircularProgress)`
    display: block;
    margin: auto;
    padding: 200px 0;
`

export const FlavorText = styled.span`
    color: rgb(104, 104, 104);
`

export const CardFooter = styled.div`
    background-color: rgb(245, 245, 245);
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`
