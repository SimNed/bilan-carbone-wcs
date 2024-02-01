import styled from "styled-components";

export const ContainerBanner = styled.div<{ $isColumn?: boolean }>`
  margin: 0 0 4px;
  display: flex;
  flex-direction: ${(props) => (props.$isColumn ? "column" : "row")};
  justify-content: center;
  align-items: center;
`;
