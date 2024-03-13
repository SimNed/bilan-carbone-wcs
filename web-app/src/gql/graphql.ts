/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  DateTimeISO: { input: any; output: any; }
};

export type Mutation = {
  __typename?: 'Mutation';
  createRide: Ride;
  createTransportation: Transportation;
  deleteRide: Ride;
  deleteTransportation: Transportation;
  updateRide: Ride;
  updateTransportation: Transportation;
};


export type MutationCreateRideArgs = {
  date: Scalars['DateTimeISO']['input'];
  distance: Scalars['Float']['input'];
  label: Scalars['String']['input'];
  transportationId: Scalars['Int']['input'];
};


export type MutationCreateTransportationArgs = {
  carboneEmission: Scalars['Float']['input'];
  label: Scalars['String']['input'];
};


export type MutationDeleteRideArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteTransportationArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateRideArgs = {
  date: Scalars['DateTimeISO']['input'];
  distance: Scalars['Float']['input'];
  id: Scalars['ID']['input'];
  label: Scalars['String']['input'];
  transportationId: Scalars['Int']['input'];
};


export type MutationUpdateTransportationArgs = {
  carboneEmission: Scalars['Float']['input'];
  id: Scalars['ID']['input'];
  label: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  ride: Ride;
  rides: Array<Ride>;
  transportation: Transportation;
  transportations: Array<Transportation>;
};


export type QueryRideArgs = {
  id: Scalars['ID']['input'];
};


export type QueryTransportationArgs = {
  id: Scalars['ID']['input'];
};

export type Ride = {
  __typename?: 'Ride';
  date: Scalars['DateTimeISO']['output'];
  distance: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  label: Scalars['String']['output'];
  transportation: Transportation;
};

export type Transportation = {
  __typename?: 'Transportation';
  carboneEmission: Scalars['Float']['output'];
  id: Scalars['Int']['output'];
  label: Scalars['String']['output'];
  rides: Array<Ride>;
};

export type CreateRideFormMutationVariables = Exact<{
  label: Scalars['String']['input'];
  distance: Scalars['Float']['input'];
  date: Scalars['DateTimeISO']['input'];
  transportationId: Scalars['Int']['input'];
}>;


export type CreateRideFormMutation = { __typename?: 'Mutation', createRide: { __typename?: 'Ride', id: string } };

export type GetRidesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRidesQuery = { __typename?: 'Query', rides: Array<{ __typename?: 'Ride', id: string, label: string, distance: number, date: any, transportation: { __typename?: 'Transportation', label: string } }> };


export const CreateRideFormDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRideForm"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"label"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"distance"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"date"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DateTimeISO"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"transportationId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRide"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"label"},"value":{"kind":"Variable","name":{"kind":"Name","value":"label"}}},{"kind":"Argument","name":{"kind":"Name","value":"distance"},"value":{"kind":"Variable","name":{"kind":"Name","value":"distance"}}},{"kind":"Argument","name":{"kind":"Name","value":"date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"date"}}},{"kind":"Argument","name":{"kind":"Name","value":"transportationId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"transportationId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateRideFormMutation, CreateRideFormMutationVariables>;
export const GetRidesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetRides"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"rides"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"distance"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"transportation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}}]}}]}}]}}]} as unknown as DocumentNode<GetRidesQuery, GetRidesQueryVariables>;