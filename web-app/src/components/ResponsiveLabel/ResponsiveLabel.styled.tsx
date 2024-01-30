import styled from "styled-components";

export const MobileLabelWrapper = styled.div`
  @media screen and (min-width: 720px) {
    display: none;
  }
`;

export const DesktopLabelWrapper = styled.div`
  display: none;

  @media screen and (min-width: 720px) {
    display: initial;
  }
`;
