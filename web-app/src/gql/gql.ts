/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation CreateRideForm(\n    $label: String!\n    $distance: Float!\n    $date: DateTimeISO!\n    $transportationId: Int!\n  ) {\n    createRide(\n      label: $label\n      distance: $distance\n      date: $date\n      transportationId: $transportationId\n    ) {\n      id\n    }\n  }\n": types.CreateRideFormDocument,
    "\n  mutation DeleteRide($id: ID!) {\n    deleteRide(id: $id) {\n      id\n      label\n    }\n  }\n": types.DeleteRideDocument,
    "\n  mutation SignInForm($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n": types.SignInFormDocument,
    "\n  mutation SignUp(\n    $email: String!\n    $firstName: String!\n    $lastName: String!\n    $password: String!\n  ) {\n    signUp(\n      email: $email\n      firstName: $firstName\n      lastName: $lastName\n      password: $password\n    ) {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n": types.SignUpDocument,
    "\n  mutation Logout {\n    logout\n  }\n": types.LogoutDocument,
    "\n  query SearchRides(\n    $label: String\n    $transportationId: Int\n    $minDistance: Float\n    $maxDistance: Float\n    $startDate: DateTimeISO\n    $endDate: DateTimeISO\n  ) {\n    searchRides(\n      label: $label\n      transportationId: $transportationId\n      minDistance: $minDistance\n      maxDistance: $maxDistance\n      startDate: $startDate\n      endDate: $endDate\n    ) {\n      id\n      label\n      distance\n      date\n      transportation {\n        id\n        label\n        carboneEmission\n      }\n    }\n  }\n": types.SearchRidesDocument,
    "\n  query GetTransportations {\n    transportations {\n      label\n      id\n      carboneEmission\n    }\n  }\n": types.GetTransportationsDocument,
    "\n  query GetUserProfile {\n    getUserProfile {\n      id\n      firstName\n      lastName\n      email\n    }\n  }\n": types.GetUserProfileDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateRideForm(\n    $label: String!\n    $distance: Float!\n    $date: DateTimeISO!\n    $transportationId: Int!\n  ) {\n    createRide(\n      label: $label\n      distance: $distance\n      date: $date\n      transportationId: $transportationId\n    ) {\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation CreateRideForm(\n    $label: String!\n    $distance: Float!\n    $date: DateTimeISO!\n    $transportationId: Int!\n  ) {\n    createRide(\n      label: $label\n      distance: $distance\n      date: $date\n      transportationId: $transportationId\n    ) {\n      id\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation DeleteRide($id: ID!) {\n    deleteRide(id: $id) {\n      id\n      label\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteRide($id: ID!) {\n    deleteRide(id: $id) {\n      id\n      label\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignInForm($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n"): (typeof documents)["\n  mutation SignInForm($email: String!, $password: String!) {\n    signIn(email: $email, password: $password) {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignUp(\n    $email: String!\n    $firstName: String!\n    $lastName: String!\n    $password: String!\n  ) {\n    signUp(\n      email: $email\n      firstName: $firstName\n      lastName: $lastName\n      password: $password\n    ) {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n"): (typeof documents)["\n  mutation SignUp(\n    $email: String!\n    $firstName: String!\n    $lastName: String!\n    $password: String!\n  ) {\n    signUp(\n      email: $email\n      firstName: $firstName\n      lastName: $lastName\n      password: $password\n    ) {\n      id\n      email\n      firstName\n      lastName\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation Logout {\n    logout\n  }\n"): (typeof documents)["\n  mutation Logout {\n    logout\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchRides(\n    $label: String\n    $transportationId: Int\n    $minDistance: Float\n    $maxDistance: Float\n    $startDate: DateTimeISO\n    $endDate: DateTimeISO\n  ) {\n    searchRides(\n      label: $label\n      transportationId: $transportationId\n      minDistance: $minDistance\n      maxDistance: $maxDistance\n      startDate: $startDate\n      endDate: $endDate\n    ) {\n      id\n      label\n      distance\n      date\n      transportation {\n        id\n        label\n        carboneEmission\n      }\n    }\n  }\n"): (typeof documents)["\n  query SearchRides(\n    $label: String\n    $transportationId: Int\n    $minDistance: Float\n    $maxDistance: Float\n    $startDate: DateTimeISO\n    $endDate: DateTimeISO\n  ) {\n    searchRides(\n      label: $label\n      transportationId: $transportationId\n      minDistance: $minDistance\n      maxDistance: $maxDistance\n      startDate: $startDate\n      endDate: $endDate\n    ) {\n      id\n      label\n      distance\n      date\n      transportation {\n        id\n        label\n        carboneEmission\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetTransportations {\n    transportations {\n      label\n      id\n      carboneEmission\n    }\n  }\n"): (typeof documents)["\n  query GetTransportations {\n    transportations {\n      label\n      id\n      carboneEmission\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetUserProfile {\n    getUserProfile {\n      id\n      firstName\n      lastName\n      email\n    }\n  }\n"): (typeof documents)["\n  query GetUserProfile {\n    getUserProfile {\n      id\n      firstName\n      lastName\n      email\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;