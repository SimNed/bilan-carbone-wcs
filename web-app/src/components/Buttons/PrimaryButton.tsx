import styled, { css } from "styled-components";
import { PRIMARY_COLOR, SECONDARY_COLOR } from "../../styles/constants";

export const buttonStyle = css`
  min-width: 40px;
  height: 40px;
  padding: 8px;
  border-radius: 8px;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  font-size: 12px;
  font-weight: bold;
  color: black;
  background-color: #8baf95;
  cursor: pointer;
`;

export const PrimaryButton = styled.button<{ $isPrimary?: boolean }>`
  ${buttonStyle}

  background-color: ${(props) =>
    props.$isPrimary ? PRIMARY_COLOR : SECONDARY_COLOR};
`;
