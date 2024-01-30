import styled from "styled-components";
import { BaseLink } from "./BaseLink";

export const InlineLink = styled(BaseLink)`
  font-weight: bold;
  color: #ffa41b;

  &:hover {
    text-decoration: underline;
  }
`;
