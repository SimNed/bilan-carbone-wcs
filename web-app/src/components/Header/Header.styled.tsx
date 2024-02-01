import styled from "styled-components";

export const HeaderStyled = styled.header`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 0 .5rem;
  background-color: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.secondary};
  img{
    height: 72px;
  }
  .header-title-section{
    display: flex;
    gap: 2rem;
    align-items: center;
  }
`;
