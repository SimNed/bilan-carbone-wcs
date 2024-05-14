import {
  FormLabelWithField,
  FormSelect,
  FormTextField,
} from "@/components/FormElements/Inputs/FormInputs";
import { GetTransportationsQuery } from "@/gql/graphql";
import { capitalizeFirstLetter } from "@/utils";
import { gql, useQuery } from "@apollo/client";
import { useState } from "react";

const RideFilters = () => {
  const GET_TRANSPORTATIONS = gql`
    query GetTransportations {
      transportations {
        label
        id
        carboneEmission
      }
    }
  `;

  const [filterData, setFilterData] = useState({
    label: "",
    transportation: "",
    startDate: "",
    endDate: "",
    minEmission: 0,
    maxEmission: 0,
    minDistance: 0,
    maxDistance: 0,
  });

  const { data } = useQuery<GetTransportationsQuery>(GET_TRANSPORTATIONS);

  return (
    <>
      <FormLabelWithField>
        <FormTextField
          placeholder="Nom du trajet"
          onChange={(e) =>
            setFilterData({ ...filterData, label: e.target.value })
          }
        />
      </FormLabelWithField>
      <FormLabelWithField>
        Moyen de transport:
        <FormSelect
          onChange={(e) =>
            setFilterData({ ...filterData, transportation: e.target.value })
          }
        >
          {data?.transportations.map((transportation) => (
            <option value={transportation.id}>
              {capitalizeFirstLetter(transportation.label)}
            </option>
          ))}
        </FormSelect>
      </FormLabelWithField>
      <FormLabelWithField>
        Du :
        <FormTextField
          type="date"
          required
          onChange={(event) => {
            setFilterData({
              ...filterData,
              startDate: new Date(event.target.value).toISOString(),
            });
          }}
        />
      </FormLabelWithField>
      <FormLabelWithField>
        Jusqu'au :
        <FormTextField
          type="date"
          required
          onChange={(event) => {
            setFilterData({
              ...filterData,
              endDate: new Date(event.target.value).toISOString(),
            });
          }}
        />
      </FormLabelWithField>
      <FormLabelWithField>
        Emission minimum :
        <FormTextField
          type="number"
          required
          onChange={(event) => {
            setFilterData({
              ...filterData,
              minEmission: parseInt(event.target.value),
            });
          }}
        />
      </FormLabelWithField>
      <FormLabelWithField>
        Emission maximum :
        <FormTextField
          type="number"
          required
          onChange={(event) => {
            setFilterData({
              ...filterData,
              maxEmission: parseInt(event.target.value),
            });
          }}
        />
      </FormLabelWithField>
      <FormLabelWithField>
        Distance minimum :
        <FormTextField
          type="number"
          required
          onChange={(event) => {
            setFilterData({
              ...filterData,
              minDistance: parseInt(event.target.value),
            });
          }}
        />
      </FormLabelWithField>
      <FormLabelWithField>
        Distance maximum :
        <FormTextField
          type="number"
          required
          onChange={(event) => {
            setFilterData({
              ...filterData,
              maxDistance: parseInt(event.target.value),
            });
          }}
        />
      </FormLabelWithField>
    </>
  );
};

export default RideFilters;
