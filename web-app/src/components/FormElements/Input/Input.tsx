import styled, { css } from "styled-components";

export const FormLabelWithField = styled.label`
  display: grid;
  width: 100%;
  gap: 6px;
`;

const textFieldStyle = css`
  height: 40px;
  background-color: white;
  padding: 8px;
  border: 2px solid #ffa41b;
  border-radius: 8px;
  font-size: 12px;
  font-family: inherit;
`;

export const TextField = styled.input`
  ${textFieldStyle}
`;

export const MainSearchField = styled(TextField)`
  width: 100%;
  min-width: 120px;
  max-width: 360px;
  flex-grow: 1;
`;

export const TextArea = styled.textarea`
  ${textFieldStyle}

  resize: vertical;
`;
