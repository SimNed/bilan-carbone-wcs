import Link from "next/link";
import styled from "styled-components";

export const MainTitle = styled.h1`
  margin: 0;
`;

export const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid lightgray;
  padding: 10px;
  background-color: white;
  z-index: 2;
`;

export const MainMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  color: #ffa41b;
`;

export const TextFieldWithButton = styled.form`
  display: flex;
  flex-grow: 1;
  justify-content: center;
  gap: 4px;
`;

export const CategoriesNavigation = styled.nav`
  font-size: 12px;
  font-weight: bold;
  color: #666;
  padding: 16px 10px 6px;
  white-space: nowrap;
  overflow-x: scroll;

  @media screen and (min-width: 720px) {
    padding-top: 14px;
    display: flex;
    justify-content: space-between;
  }
`;
