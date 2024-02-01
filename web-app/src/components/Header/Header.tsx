import { Fragment } from "react";

import * as styled from "./Header.styled";

import { gql, useQuery } from "@apollo/client";
import { GetMyProfileHeaderQuery } from "@/gql/graphql";

const GET_MY_PROFILE_HEADER = gql`
  query GetMyProfileHeader {
    myProfile {
      id
      initials
    }
  }
`;

export default function Header() {
  const { data, loading } = useQuery<GetMyProfileHeaderQuery>(
    GET_MY_PROFILE_HEADER
  );

  return <div>Header</div>

  // return (
    // <styled.Header>
    //   <styled.MainMenu>
    //     <styled.MainTitle>
    //       <Logo href="/">
    //         <ResponsiveLabel mobileLabel="TGC" desktopLabel="THE GOOD CORNER" />
    //       </Logo>
    //     </styled.MainTitle>
    //     <styled.TextFieldWithButton>
    //       <MainSearchField type="search" />
    //       <PrimaryButton>
    //         <SearchIcon />
    //       </PrimaryButton>
    //     </styled.TextFieldWithButton>
    //     {!loading && (
    //       <ButtonLikeLink href={data?.myProfile ? "/my-profile" : "/sign-in"}>
    //         {data?.myProfile ? data.myProfile.initials : "Me connecter"}
    //       </ButtonLikeLink>
    //     )}
    //     <ButtonLikeLink href="/publish-article">
    //       <ResponsiveLabel
    //         mobileLabel="Publier"
    //         desktopLabel="Publier une annonce"
    //       />
    //     </ButtonLikeLink>
    //   </styled.MainMenu>
    //   <styled.CategoriesNavigation>
    //     {CATEGORIES.map((category, index) => (
    //       <Fragment key={category.id}>
    //         <BaseLink href={`/categories/${category.id}`}>
    //           {category.name}
    //         </BaseLink>
    //         {index < CATEGORIES.length - 1 ? " • " : ""}
    //       </Fragment>
    //     ))}
    //   </styled.CategoriesNavigation>
    // </styled.Header>
  // );
}
