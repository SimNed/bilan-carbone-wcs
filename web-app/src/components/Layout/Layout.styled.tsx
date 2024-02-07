import styled from 'styled-components';

export const LayoutContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const MainContentContainerStyled = styled.main`
  padding: 2rem;
  flex: 12;
`;

export const PageLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const PageContentLayout = styled.div`
  // TODO: background-color: ?;
  height: 300px; //TODO: Make it dynamic ?;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;
