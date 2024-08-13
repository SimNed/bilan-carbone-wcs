/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  DateTimeISO: { input: any; output: any };
};

export type Mutation = {
  __typename?: "Mutation";
  createRide: Ride;
  createTransportation: Transportation;
  deleteRide: Ride;
  deleteTransportation: Transportation;
  logout: Scalars["Boolean"]["output"];
  signIn: User;
  signUp: User;
  updateRide: Ride;
  updateTransportation: Transportation;
};

export type MutationCreateRideArgs = {
  date: Scalars["DateTimeISO"]["input"];
  distance: Scalars["Float"]["input"];
  label: Scalars["String"]["input"];
  transportationId: Scalars["Int"]["input"];
};

export type MutationCreateTransportationArgs = {
  carbonEmissionsByGrPerKm: Scalars["Float"]["input"];
  label: Scalars["String"]["input"];
};

export type MutationDeleteRideArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationDeleteTransportationArgs = {
  id: Scalars["ID"]["input"];
};

export type MutationSignInArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationSignUpArgs = {
  email: Scalars["String"]["input"];
  firstName: Scalars["String"]["input"];
  lastName: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationUpdateRideArgs = {
  date: Scalars["DateTimeISO"]["input"];
  distance: Scalars["Float"]["input"];
  id: Scalars["ID"]["input"];
  label: Scalars["String"]["input"];
  transportationId: Scalars["Int"]["input"];
};

export type MutationUpdateTransportationArgs = {
  carbonEmissionsByGrPerKm: Scalars["Float"]["input"];
  id: Scalars["ID"]["input"];
  label: Scalars["String"]["input"];
};

export type Query = {
  __typename?: "Query";
  getUserProfile: User;
  ride: Ride;
  rides: Array<Ride>;
  searchRides: Array<Ride>;
  transportation: Transportation;
  transportations: Array<Transportation>;
};

export type QueryRideArgs = {
  id: Scalars["ID"]["input"];
};

export type QuerySearchRidesArgs = {
  endDate?: InputMaybe<Scalars["DateTimeISO"]["input"]>;
  label?: InputMaybe<Scalars["String"]["input"]>;
  maxDistance?: InputMaybe<Scalars["Float"]["input"]>;
  minDistance?: InputMaybe<Scalars["Float"]["input"]>;
  startDate?: InputMaybe<Scalars["DateTimeISO"]["input"]>;
  transportationId?: InputMaybe<Scalars["Int"]["input"]>;
};

export type QueryTransportationArgs = {
  id: Scalars["ID"]["input"];
};

export type Ride = {
  __typename?: "Ride";
  date: Scalars["DateTimeISO"]["output"];
  distance: Scalars["Float"]["output"];
  id: Scalars["ID"]["output"];
  label: Scalars["String"]["output"];
  owner: User;
  transportation: Transportation;
};

export type Transportation = {
  __typename?: "Transportation";
  carbonEmissionsByGrPerKm: Scalars["Float"]["output"];
  id: Scalars["Int"]["output"];
  label: Scalars["String"]["output"];
  rides: Array<Ride>;
};

export type User = {
  __typename?: "User";
  email: Scalars["String"]["output"];
  firstName: Scalars["String"]["output"];
  id: Scalars["ID"]["output"];
  initials?: Scalars["String"]["output"];
  lastName: Scalars["String"]["output"];
};

export type CreateRideFormMutationVariables = Exact<{
  label: Scalars["String"]["input"];
  distance: Scalars["Float"]["input"];
  date: Scalars["DateTimeISO"]["input"];
  transportationId: Scalars["Int"]["input"];
}>;

export type CreateRideFormMutation = {
  __typename?: "Mutation";
  createRide: { __typename?: "Ride"; id: string };
};

export type DeleteRideMutationVariables = Exact<{
  id: Scalars["ID"]["input"];
}>;

export type DeleteRideMutation = {
  __typename?: "Mutation";
  deleteRide: { __typename?: "Ride"; id: string; label: string };
};

export type SignInFormMutationVariables = Exact<{
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}>;

export type SignInFormMutation = {
  __typename?: "Mutation";
  signIn: {
    __typename?: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
};

export type SignUpMutationVariables = Exact<{
  email: Scalars["String"]["input"];
  firstName: Scalars["String"]["input"];
  lastName: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}>;

export type SignUpMutation = {
  __typename?: "Mutation";
  signUp: {
    __typename?: "User";
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation"; logout: boolean };

export type SearchRidesQueryVariables = Exact<{
  label?: InputMaybe<Scalars["String"]["input"]>;
  transportationId?: InputMaybe<Scalars["Int"]["input"]>;
  minDistance?: InputMaybe<Scalars["Float"]["input"]>;
  maxDistance?: InputMaybe<Scalars["Float"]["input"]>;
  startDate?: InputMaybe<Scalars["DateTimeISO"]["input"]>;
  endDate?: InputMaybe<Scalars["DateTimeISO"]["input"]>;
}>;

export type SearchRidesQuery = {
  __typename?: "Query";
  searchRides: Array<{
    __typename?: "Ride";
    id: string;
    label: string;
    distance: number;
    date: any;
    transportation: {
      __typename?: "Transportation";
      id: number;
      label: string;
      carbonEmissionsByGrPerKm: number;
    };
  }>;
};

export type GetTransportationsQueryVariables = Exact<{ [key: string]: never }>;

export type GetTransportationsQuery = {
  __typename?: "Query";
  transportations: Array<{
    __typename?: "Transportation";
    label: string;
    id: number;
    carbonEmissionsByGrPerKm: number;
  }>;
};

export type GetUserProfileQueryVariables = Exact<{ [key: string]: never }>;

export type GetUserProfileQuery = {
  __typename?: "Query";
  getUserProfile: {
    __typename?: "User";
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
};

export const CreateRideFormDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateRideForm" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "label" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "distance" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "date" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "DateTimeISO" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "transportationId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createRide" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "label" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "label" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "distance" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "distance" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "date" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "date" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "transportationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "transportationId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateRideFormMutation,
  CreateRideFormMutationVariables
>;
export const DeleteRideDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteRide" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteRide" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "label" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteRideMutation, DeleteRideMutationVariables>;
export const SignInFormDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SignInForm" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "signIn" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignInFormMutation, SignInFormMutationVariables>;
export const SignUpDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SignUp" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "firstName" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "lastName" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "signUp" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "firstName" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "firstName" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "lastName" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "lastName" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
export const LogoutDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Logout" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "logout" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LogoutMutation, LogoutMutationVariables>;
export const SearchRidesDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "SearchRides" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "label" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "transportationId" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "minDistance" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "maxDistance" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "startDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateTimeISO" },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "endDate" },
          },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DateTimeISO" },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "searchRides" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "label" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "label" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "transportationId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "transportationId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "minDistance" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "minDistance" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "maxDistance" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "maxDistance" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "startDate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "startDate" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "endDate" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "endDate" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "label" } },
                { kind: "Field", name: { kind: "Name", value: "distance" } },
                { kind: "Field", name: { kind: "Name", value: "date" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "transportation" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "label" } },
                      {
                        kind: "Field",
                        name: {
                          kind: "Name",
                          value: "carbonEmissionsByGrPerKm",
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SearchRidesQuery, SearchRidesQueryVariables>;
export const GetTransportationsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetTransportations" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "transportations" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "label" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "carbonEmissionsByGrPerKm" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetTransportationsQuery,
  GetTransportationsQueryVariables
>;
export const GetUserProfileDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "GetUserProfile" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "getUserProfile" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "firstName" } },
                { kind: "Field", name: { kind: "Name", value: "lastName" } },
                { kind: "Field", name: { kind: "Name", value: "email" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUserProfileQuery, GetUserProfileQueryVariables>;
