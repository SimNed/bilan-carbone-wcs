import styled, { css } from "styled-components";

export const FlexCenteredContainerStyled = styled.div<{ $isColumn?: boolean; }>`
    display: flex;
    flex-direction: ${props => props.$isColumn ? "column" : "row"};
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
` 