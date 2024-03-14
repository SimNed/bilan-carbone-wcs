import { PRIMARY_COLOR } from "@/styles/constants";
import styled from "styled-components";

export const LinkStyled = styled.a`
  cursor: pointer;
  color: ${PRIMARY_COLOR};
  text-decoration: none;
  font-weight: bold;

  &:hover {
    text-decoration: underline ${PRIMARY_COLOR};
  }
`;
