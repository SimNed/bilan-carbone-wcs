import {
  BACKGROUND_COLOR,
  PRIMARY_COLOR,
  TRANSPARENT_BACKGROUND,
} from "@/styles/constants";
import styled from "styled-components";

export const Loader = styled.div<{
  $size: "SMALL" | "REGULAR";
  $onBackground: boolean;
}>`
  width: ${({ $size: size }) => (size === "SMALL" ? 24 : 40)}px;
  height: ${({ $size: size }) => (size === "SMALL" ? 24 : 40)}px;
  border: ${({ $size: size }) => (size === "SMALL" ? 3 : 4)}px solid
    ${({ $onBackground }) => ($onBackground ? BACKGROUND_COLOR : PRIMARY_COLOR)};
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const GlobalLoaderWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
