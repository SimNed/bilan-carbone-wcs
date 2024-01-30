import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100%;
  display: grid;
  gap: 12px;
`;

export const NarrowPageContainer = styled(PageContainer)`
  max-width: 400px;
`;
