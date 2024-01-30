import styled from "styled-components";

export const Container = styled.section`
  display: grid;
  gap: 24px;

  @media screen and (min-width: 720px) {
    grid-template-columns: 1fr 388px;
  }
`;

export const ImageContainer = styled.div`
  margin-inline-start: -24px;
  margin-inline-end: -24px;

  @media screen and (min-width: 720px) {
    margin-inline-start: unset;
    margin-inline-end: unset;
  }
`;

export const Image = styled.img`
  width: 100%;
`;

export const Info = styled.div`
  display: grid;
  gap: 12px;
  align-content: baseline;
`;

export const Price = styled.div`
  font-weight: bold;
`;
