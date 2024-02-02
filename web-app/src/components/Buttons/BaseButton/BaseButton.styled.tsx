import { SECONDARY_COLOR } from "@/styles/constants";
import styled from "styled-components";

export const BaseButtonStyled = styled.button<{ $primary?: boolean; }>`
    background-color: ${SECONDARY_COLOR};
    padding: 20px;
`
//add condtionnal button rendering ?