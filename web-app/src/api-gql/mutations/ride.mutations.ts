import { gql } from "@apollo/client";

export const CREATE_RIDE = gql`
  mutation CreateRide(
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

export const UPDATE_RIDE = gql`
  mutation UpdateRide(
    $id: ID!
    $label: String!
    $distance: Float!
    $date: DateTimeISO!
    $transportationId: Int!
  ) {
    updateRide(
      id: $id
      label: $label
      distance: $distance
      date: $date
      transportationId: $transportationId
    ) {
      id
      label
      distance
      date
      transportation {
        id
        label
      }
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
