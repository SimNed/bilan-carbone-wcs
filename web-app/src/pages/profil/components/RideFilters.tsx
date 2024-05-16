import { GET_TRANSPORTATIONS } from "@/api-gql/queries/transportation.queries";
import {
  FormLabelWithField,
  FormSelect,
  FormTextField,
} from "@/components/FormElements/Inputs/FormInputs";
import { GetTransportationsQuery } from "@/gql/graphql";
import { RideFilterData } from "@/types/RideFilterData.type";
import { capitalizeFirstLetter } from "@/utils";
import { useQuery } from "@apollo/client";
import { useState } from "react";

const RideFilters = ({
  handleRideFilter,
}: {
  handleRideFilter: (filterData: RideFilterData) => void;
}) => {
  const [filterData, setFilterData] = useState<RideFilterData>({});

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
            setFilterData({
              ...filterData,
              transportationId: parseInt(e.target.value),
            })
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
              startDate: new Date(event.target.value),
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
              endDate: new Date(event.target.value),
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
      <div>
        <button
          onClick={() => {
            handleRideFilter(filterData);
            setFilterData({});
          }}
        >
          Rechercher
        </button>
      </div>
    </>
  );
};

export default RideFilters;
