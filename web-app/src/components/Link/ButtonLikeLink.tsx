import Link from "next/link";
import styled from "styled-components";
import { buttonStyle } from "../Button/buttonStyle";

export const ButtonLikeLink = styled(Link)`
  ${buttonStyle}

  text-decoration: none;
`;

export const Logo = styled(ButtonLikeLink)`
  border: none;
`;
