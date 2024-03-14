import { SECONDARY_COLOR } from "@/styles/constants";
import styled from "styled-components";

export const FormViewStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${SECONDARY_COLOR};
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 200px;
  padding-right: 200px;
  border-radius: 10px;
`;

export const FormTitle = styled.h1`
  //TODO: add styles
  display: flex;
  justify-content: center;
  align-items: center;
`;
