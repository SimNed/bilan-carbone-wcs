import styled, { css } from "styled-components";

export const CenteredContainerStyled = styled.div<{ $width?: string; }>`
    margin: auto;
    padding: 2rem
    display: flex;
    width: ${props => props.$width};
` 