import { Fragment } from "react";
import { CATEGORIES } from "../Layout/Layout";
import SearchIcon from "../Icons/SearchIcon";
import { PrimaryButton } from "../Button/PrimaryButton";

import * as styled from "./Header.styled";
import { ButtonLikeLink, Logo } from "../Link/ButtonLikeLink";
import { MainSearchField } from "../FormElements/Input/Input";
import { BaseLink } from "../Link/BaseLink";
import ResponsiveLabel from "../ResponsiveLabel/ResponsiveLabel";

export default function Header() {
  return (
    <styled.Header>
      <styled.MainMenu>
        <styled.MainTitle>
          <Logo href="/">
            <ResponsiveLabel mobileLabel="TGC" desktopLabel="THE GOOD CORNER" />
          </Logo>
        </styled.MainTitle>
        <styled.TextFieldWithButton>
          <MainSearchField type="search" />
          <PrimaryButton>
            <SearchIcon />
          </PrimaryButton>
        </styled.TextFieldWithButton>
        <ButtonLikeLink href="/publish-article">
          <ResponsiveLabel
            mobileLabel="Publier"
            desktopLabel="Publier une annonce"
          />
        </ButtonLikeLink>
      </styled.MainMenu>
      <styled.CategoriesNavigation>
        {CATEGORIES.map((category, index) => (
          <Fragment key={category.id}>
            <BaseLink href={`/categories/${category.id}`}>
              {category.name}
            </BaseLink>
            {index < CATEGORIES.length - 1 ? " • " : ""}
          </Fragment>
        ))}
      </styled.CategoriesNavigation>
    </styled.Header>
  );
}
