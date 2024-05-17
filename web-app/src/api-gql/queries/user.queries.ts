import { gql } from "@apollo/client";

export const GET_USER_PROFIL = gql`
  query GetUserProfile {
    getUserProfile {
      id
      firstName
      lastName
      email
    }
  }
`;
