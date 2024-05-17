import { GET_TRANSPORTATIONS } from "@/api-gql/queries/transportation.queries";
import { GetTransportationsQuery } from "@/gql/graphql";
import { RideFilterData } from "@/type/RideFilterData.type";
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
      <div>
        <input
          placeholder="Nom du trajet"
          onChange={(e) =>
            setFilterData({ ...filterData, label: e.target.value })
          }
        />
      </div>
      <div>
        Moyen de transport:
        <select
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
        </select>
      </div>
      <div>
        Du :
        <input
          type="date"
          required
          onChange={(event) => {
            setFilterData({
              ...filterData,
              startDate: new Date(event.target.value),
            });
          }}
        />
      </div>
      <div>
        Jusqu'au :
        <input
          type="date"
          required
          onChange={(event) => {
            setFilterData({
              ...filterData,
              endDate: new Date(event.target.value),
            });
          }}
        />
      </div>
      <div>
        Distance minimum :
        <input
          type="number"
          required
          onChange={(event) => {
            setFilterData({
              ...filterData,
              minDistance: parseInt(event.target.value),
            });
          }}
        />
      </div>
      <div>
        Distance maximum :
        <input
          type="number"
          required
          onChange={(event) => {
            setFilterData({
              ...filterData,
              maxDistance: parseInt(event.target.value),
            });
          }}
        />
      </div>
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
