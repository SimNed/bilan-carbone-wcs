import styled from "styled-components";
import { buttonStyle } from "./buttonStyle";
import { DISABLED_COLOR, PRIMARY_COLOR } from "@/styles/constants";

export const PrimaryButton = styled.button`
  ${buttonStyle}

  background-color: ${PRIMARY_COLOR};
  color: white;

  &:disabled {
    background-color: ${DISABLED_COLOR};
    cursor: not-allowed;
    border-color: ${DISABLED_COLOR};
  }
`;
