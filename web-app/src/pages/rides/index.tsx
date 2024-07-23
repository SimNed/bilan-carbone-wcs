import { GetUserProfileQuery, SearchRidesQuery } from "@/gql/graphql";
import { useQuery } from "@apollo/client";
import { SEARCH_RIDES } from "@/api-gql/queries/ride.queries";
import { useEffect } from "react";
import { GET_USER_PROFIL } from "@/api-gql/queries/user.queries";
import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import RideCard from "./components/RideCard";
import RideFilters from "./components/RideFilters";
import { useModal } from "@/components/layout/Layout";
import { RideFilterData } from "@/type/RideFilterData.type";

const RidesPage = () => {
  const { loading, error, data, refetch } =
    useQuery<SearchRidesQuery>(SEARCH_RIDES);

  const { data: userData } = useQuery<GetUserProfileQuery>(GET_USER_PROFIL);
  const { handleModalComponent, handleCloseModal } = useModal();

  const handleRideFilter = (filterData: RideFilterData) => {
    refetch(filterData);
    handleCloseModal();
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (loading || typeof data === "undefined") return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Stack direction="row">
      <Stack direction="column" spacing={1}>
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            handleModalComponent(
              <RideFilters
                handleRideFilter={handleRideFilter}
                closeModal={handleCloseModal}
              />
            )
          }
        >
          Filtrer les trajets
        </Button>
        {data && data.searchRides.map((ride) => <RideCard ride={ride} />)}
      </Stack>
    </Stack>
  );
};

export default RidesPage;
