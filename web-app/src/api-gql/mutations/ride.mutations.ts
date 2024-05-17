import { gql } from "@apollo/client";

export const CREATE_RIDE = gql`
  mutation CreateRideForm(
    $label: String!
    $distance: Float!
    $date: DateTimeISO!
    $transportationId: Int!
  ) {
    createRide(
      label: $label
      distance: $distance
      date: $date
      transportationId: $transportationId
    ) {
      id
    }
  }
`;

export const DELETE_RIDE = gql`
  mutation DeleteRide($id: ID!) {
    deleteRide(id: $id) {
      id
      label
    }
  }
`;
