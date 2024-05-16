import { gql } from "@apollo/client";

export const SEARCH_RIDES = gql`
  query SearchRides(
    $label: String
    $transportationId: Int
    $minDistance: Float
    $maxDistance: Float
  ) {
    searchRides(
      label: $label
      transportationId: $transportationId
      minDistance: $minDistance
      maxDistance: $maxDistance
    ) {
      id
      label
      distance
      date
      transportation {
        id
        label
        carboneEmission
      }
    }
  }
`;
