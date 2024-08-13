import { gql } from "@apollo/client";

export const SEARCH_RIDES = gql`
  query SearchRides(
    $label: String
    $transportationId: Int
    $minDistance: Float
    $maxDistance: Float
    $startDate: DateTimeISO
    $endDate: DateTimeISO
  ) {
    searchRides(
      label: $label
      transportationId: $transportationId
      minDistance: $minDistance
      maxDistance: $maxDistance
      startDate: $startDate
      endDate: $endDate
    ) {
      id
      label
      distance
      date
      transportation {
        id
        label
        carbonEmissionsByGrPerKm
      }
    }
  }
`;
