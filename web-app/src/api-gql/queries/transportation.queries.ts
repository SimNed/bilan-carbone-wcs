import { gql } from "@apollo/client";

export const GET_TRANSPORTATIONS = gql`
  query GetTransportations {
    transportations {
      label
      id
      carbonEmissionsByGrPerKm
    }
  }
`;
