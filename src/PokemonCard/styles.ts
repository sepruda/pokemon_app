import styled from '@emotion/styled'

export const Card = styled.div`
    background-color: white;
    border-radius: 5px;
    display: flex;
    filter: drop-shadow(8px 16px 16px hsl(220deg 60% 50%));
    flex-direction: column;
    transition: transform 200ms;
    will-change: transform;
    cursor: pointer;

    &:hover {
        transform: translateY(-10px);
    }
`

export const CardTitle = styled.h3`
    text-transform: capitalize;
    &:p {
        color: lightgrey;
    }
`

export const CardImageWrapper = styled.div`
    align-self: center;
    background-color: hsl(156deg, 76%, 84%);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    width: 100%;
`

export const CardImage = styled.img`
    margin: auto;
    display: block;
`
export const CardInfo = styled.div`
    padding: 0.5rem;
    &:p {
        margin: 0;
    }
`
